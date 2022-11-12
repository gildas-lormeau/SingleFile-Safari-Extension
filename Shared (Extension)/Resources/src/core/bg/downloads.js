/*
 * Copyright 2010-2020 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile.
 *
 *   The code in this file is free software: you can redistribute it and/or 
 *   modify it under the terms of the GNU Affero General Public License 
 *   (GNU AGPL) as published by the Free Software Foundation, either version 3
 *   of the License, or (at your option) any later version.
 * 
 *   The code in this file is distributed in the hope that it will be useful, 
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of 
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero 
 *   General Public License for more details.
 *
 *   As additional permission under GNU AGPL version 3 section 7, you may 
 *   distribute UNMODIFIED VERSIONS OF THIS file without the copy of the GNU 
 *   AGPL normally required by section 4, provided you include this license 
 *   notice and a URL through which recipients can access the Corresponding 
 *   Source.
 */

/* global browser, Blob, URL, document, fetch, btoa, AbortController */

import * as config from "./config.js";
import * as bookmarks from "./bookmarks.js";
import * as companion from "./companion.js";
import * as business from "./business.js";
import * as editor from "./editor.js";
import { launchWebAuthFlow, extractAuthCode } from "./tabs-util.js";
import * as ui from "./../../ui/bg/index.js";
import * as woleet from "./../../lib/woleet/woleet.js";
import { GDrive } from "./../../lib/gdrive/gdrive.js";
import { pushGitHub } from "./../../lib/github/github.js";
import { download } from "./download-util.js";

const partialContents = new Map();
const MIMETYPE_HTML = "text/html";
const GDRIVE_CLIENT_ID = "207618107333-h1220p1oasj3050kr5r416661adm091a.apps.googleusercontent.com"; // 3pj2pmelhnl4sf3rpctghs9cean3q8nj
const GDRIVE_CLIENT_KEY = "VQJ8Gq8Vxx72QyxPyeLtWvUt"; // "000000000000000000000000";
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const CONFLICT_ACTION_SKIP = "skip";
const CONFLICT_ACTION_UNIQUIFY = "uniquify";
const REGEXP_ESCAPE = /([{}()^$&.*?/+|[\\\\]|\]|-)/g;

const gDrive = new GDrive(GDRIVE_CLIENT_ID, GDRIVE_CLIENT_KEY, SCOPES);
export {
	onMessage,
	downloadPage,
	saveToGDrive,
	saveToGitHub,
	saveWithWebDAV,
	encodeSharpCharacter
};

async function onMessage(message, sender) {
	if (message.method.endsWith(".download")) {
		return downloadTabPage(message, sender.tab);
	}
	if (message.method.endsWith(".disableGDrive")) {
		const authInfo = await config.getAuthInfo();
		config.removeAuthInfo();
		await gDrive.revokeAuthToken(authInfo && (authInfo.accessToken || authInfo.revokableAccessToken));
		return {};
	}
	if (message.method.endsWith(".end")) {
		if (message.hash) {
			try {
				await woleet.anchor(message.hash, message.woleetKey);
			} catch (error) {
				ui.onError(sender.tab.id, error.message, error.link);
			}
		}
		business.onSaveEnd(message.taskId);
		return {};
	}
	if (message.method.endsWith(".getInfo")) {
		return business.getTasksInfo();
	}
	if (message.method.endsWith(".cancel")) {
		business.cancelTask(message.taskId);
		return {};
	}
	if (message.method.endsWith(".cancelAll")) {
		business.cancelAllTasks();
		return {};
	}
	if (message.method.endsWith(".saveUrls")) {
		business.saveUrls(message.urls);
		return {};
	}
}

async function downloadTabPage(message, tab) {
	let contents;
	if (message.truncated) {
		contents = partialContents.get(tab.id);
		if (!contents) {
			contents = [];
			partialContents.set(tab.id, contents);
		}
		contents.push(message.content);
		if (message.finished) {
			partialContents.delete(tab.id);
		}
	} else if (message.content) {
		contents = [message.content];
	}
	if (!message.truncated || message.finished) {
		if (message.openEditor) {
			ui.onEdit(tab.id);
			await editor.open({ tabIndex: tab.index + 1, filename: message.filename, content: contents.join("") });
		} else {
			if (message.saveToClipboard) {
				message.content = contents.join("");
				saveToClipboard(message);
				ui.onEnd(tab.id);
			} else {
				await downloadContent(contents, tab, tab.incognito, message);
			}
		}
	}
	return {};
}

async function downloadContent(contents, tab, incognito, message) {
	try {
		if (message.saveWithWebDAV) {
			await saveWithWebDAV(message.taskId, encodeSharpCharacter(message.filename), contents.join(""), message.webDAVURL, message.webDAVUser, message.webDAVPassword);
		} else if (message.saveToGDrive) {
			await saveToGDrive(message.taskId, encodeSharpCharacter(message.filename), new Blob(contents, { type: MIMETYPE_HTML }), {
				forceWebAuthFlow: message.forceWebAuthFlow
			}, {
				onProgress: (offset, size) => ui.onUploadProgress(tab.id, offset, size)
			});
		} else if (message.saveToGitHub) {
			await (await saveToGitHub(message.taskId, encodeSharpCharacter(message.filename), contents.join(""), message.githubToken, message.githubUser, message.githubRepository, message.githubBranch)).pushPromise;
		} else if (message.saveWithCompanion) {
			await companion.save({
				filename: message.filename,
				content: message.content,
				filenameConflictAction: message.filenameConflictAction
			});
		} else {
			message.url = URL.createObjectURL(new Blob(contents, { type: MIMETYPE_HTML }));
			await downloadPage(message, {
				confirmFilename: message.confirmFilename,
				incognito,
				filenameConflictAction: message.filenameConflictAction,
				filenameReplacementCharacter: message.filenameReplacementCharacter,
				includeInfobar: message.includeInfobar
			});
		}
		ui.onEnd(tab.id);
		if (message.openSavedPage) {
			const createTabProperties = { active: true, url: URL.createObjectURL(new Blob(contents, { type: MIMETYPE_HTML })) };
			if (tab.index != null) {
				createTabProperties.index = tab.index + 1;
			}
			browser.tabs.create(createTabProperties);
		}
	} catch (error) {
		if (!error.message || error.message != "upload_cancelled") {
			console.error(error); // eslint-disable-line no-console
			ui.onError(tab.id, error.message, error.link);
		}
	} finally {
		if (message.url) {
			URL.revokeObjectURL(message.url);
		}
	}
}

function encodeSharpCharacter(path) {
	return path.replace(/#/g, "%23");
}

function getRegExp(string) {
	return string.replace(REGEXP_ESCAPE, "\\$1");
}

async function getAuthInfo(authOptions, force) {
	let authInfo = await config.getAuthInfo();
	const options = {
		interactive: true,
		forceWebAuthFlow: authOptions.forceWebAuthFlow,
		launchWebAuthFlow: options => launchWebAuthFlow(options),
		extractAuthCode: authURL => extractAuthCode(authURL)
	};
	gDrive.setAuthInfo(authInfo, options);
	if (!authInfo || !authInfo.accessToken || force) {
		authInfo = await gDrive.auth(options);
		if (authInfo) {
			await config.setAuthInfo(authInfo);
		} else {
			await config.removeAuthInfo();
		}
	}
	return authInfo;
}

async function saveToGitHub(taskId, filename, content, githubToken, githubUser, githubRepository, githubBranch) {
	const taskInfo = business.getTaskInfo(taskId);
	if (!taskInfo || !taskInfo.cancelled) {
		const pushInfo = pushGitHub(githubToken, githubUser, githubRepository, githubBranch, filename, content);
		business.setCancelCallback(taskId, pushInfo.cancelPush);
		try {
			await (await pushInfo).pushPromise;
			return pushInfo;
		} catch (error) {
			throw new Error(error.message + " (GitHub)");
		}
	}
}

async function saveWithWebDAV(taskId, filename, content, url, username, password) {
	const taskInfo = business.getTaskInfo(taskId);
	const controller = new AbortController();
	const { signal } = controller;
	const authorization = "Basic " + btoa(username + ":" + password);
	if (!url.endsWith("/")) {
		url += "/";
	}
	if (!taskInfo || !taskInfo.cancelled) {
		business.setCancelCallback(taskId, () => controller.abort());
		try {
			const response = await sendRequest(url + filename, "PUT", content);
			if (response.status == 404 && filename.includes("/")) {
				const filenameParts = filename.split(/\/+/);
				filenameParts.pop();
				let path = "";
				for (const filenamePart of filenameParts) {
					if (filenamePart) {
						path += filenamePart;
						const response = await sendRequest(url + path, "PROPFIND");
						if (response.status == 404) {
							const response = await sendRequest(url + path, "MKCOL");
							if (response.status >= 400) {
								throw new Error("Error " + response.status + " (WebDAV)");
							}
						}
						path += "/";
					}
				}
				return saveWithWebDAV(taskId, filename, content, url, username, password);
			} else if (response.status >= 400) {
				throw new Error("Error " + response.status + " (WebDAV)");
			} else {
				return response;
			}
		} catch (error) {
			if (error.name != "AbortError") {
				throw new Error(error.message + " (WebDAV)");
			}
		}
	}

	function sendRequest(url, method, body) {
		const headers = {
			"Authorization": authorization
		};
		if (body) {
			headers["Content-Type"] = "text/html";
		}
		return fetch(url, { method, headers, signal, body, credentials: "omit" });
	}
}

async function saveToGDrive(taskId, filename, blob, authOptions, uploadOptions) {
	try {
		await getAuthInfo(authOptions);
		const taskInfo = business.getTaskInfo(taskId);
		if (!taskInfo || !taskInfo.cancelled) {
			return gDrive.upload(filename, blob, uploadOptions, callback => business.setCancelCallback(taskId, callback));
		}
	}
	catch (error) {
		if (error.message == "invalid_token") {
			let authInfo;
			try {
				authInfo = await gDrive.refreshAuthToken();
			} catch (error) {
				if (error.message == "unknown_token") {
					authInfo = await getAuthInfo(authOptions, true);
				} else {
					throw new Error(error.message + " (Google Drive)");
				}
			}
			if (authInfo) {
				await config.setAuthInfo(authInfo);
			} else {
				await config.removeAuthInfo();
			}
			return await saveToGDrive(taskId, filename, blob, authOptions, uploadOptions);
		} else {
			throw new Error(error.message + " (Google Drive)");
		}
	}
}

async function downloadPage(pageData, options) {
	const filenameConflictAction = options.filenameConflictAction;
	let skipped;
	if (filenameConflictAction == CONFLICT_ACTION_SKIP) {
		const downloadItems = await browser.downloads.search({
			filenameRegex: "(\\\\|/)" + getRegExp(pageData.filename) + "$",
			exists: true
		});
		if (downloadItems.length) {
			skipped = true;
		} else {
			options.filenameConflictAction = CONFLICT_ACTION_UNIQUIFY;
		}
	}
	if (!skipped) {
		const downloadInfo = {
			url: pageData.url,
			saveAs: options.confirmFilename,
			filename: pageData.filename,
			conflictAction: options.filenameConflictAction
		};
		if (options.incognito) {
			downloadInfo.incognito = true;
		}
		const downloadData = await download(downloadInfo, options.filenameReplacementCharacter);
		if (downloadData.filename && pageData.bookmarkId && pageData.replaceBookmarkURL) {
			if (!downloadData.filename.startsWith("file:")) {
				if (downloadData.filename.startsWith("/")) {
					downloadData.filename = downloadData.filename.substring(1);
				}
				downloadData.filename = "file:///" + encodeSharpCharacter(downloadData.filename);
			}
			await bookmarks.update(pageData.bookmarkId, { url: downloadData.filename });
		}
	}
}

function saveToClipboard(pageData) {
	const command = "copy";
	document.addEventListener(command, listener);
	document.execCommand(command);
	document.removeEventListener(command, listener);

	function listener(event) {
		event.clipboardData.setData(MIMETYPE_HTML, pageData.content);
		event.clipboardData.setData("text/plain", pageData.content);
		event.preventDefault();
	}
}