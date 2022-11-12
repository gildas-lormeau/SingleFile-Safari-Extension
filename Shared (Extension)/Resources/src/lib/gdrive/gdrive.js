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

/* global browser, fetch, setInterval, URLSearchParams, URL */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const REVOKE_ACCESS_URL = "https://accounts.google.com/o/oauth2/revoke";
const GDRIVE_URL = "https://www.googleapis.com/drive/v3/files";
const GDRIVE_UPLOAD_URL = "https://www.googleapis.com/upload/drive/v3/files";

class GDrive {
	constructor(clientId, clientKey, scopes) {
		this.clientId = clientId;
		this.clientKey = clientKey;
		this.scopes = scopes;
		this.folderIds = new Map();
		setInterval(() => this.folderIds.clear(), 60 * 1000);
	}
	async auth(options = { interactive: true }) {
		if (nativeAuth(options)) {
			this.accessToken = await browser.identity.getAuthToken({ interactive: options.interactive });
			return { revokableAccessToken: this.accessToken };
		} else {
			this.authURL = AUTH_URL +
				"?client_id=" + this.clientId +
				"&response_type=code" +
				"&access_type=offline" +
				"&redirect_uri=" + browser.identity.getRedirectURL() +
				"&scope=" + this.scopes.join(" ");
			return options.code ? authFromCode(this, options) : initAuth(this, options);
		}
	}
	setAuthInfo(authInfo, options) {
		if (!nativeAuth(options)) {
			if (authInfo) {
				this.accessToken = authInfo.accessToken;
				this.refreshToken = authInfo.refreshToken;
				this.expirationDate = authInfo.expirationDate;
			} else {
				delete this.accessToken;
				delete this.refreshToken;
				delete this.expirationDate;
			}
		}
	}
	async refreshAuthToken() {
		if (this.refreshToken) {
			const httpResponse = await fetch(TOKEN_URL, {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: "client_id=" + this.clientId +
					"&refresh_token=" + this.refreshToken +
					"&grant_type=refresh_token" +
					"&client_secret=" + this.clientKey
			});
			if (httpResponse.status == 400) {
				throw new Error("unknown_token");
			}
			const response = await getJSON(httpResponse);
			this.accessToken = response.access_token;
			if (response.refresh_token) {
				this.refreshToken = response.refresh_token;
			}
			if (response.expires_in) {
				this.expirationDate = Date.now() + (response.expires_in * 1000);
			}
			return { accessToken: this.accessToken, refreshToken: this.refreshToken, expirationDate: this.expirationDate };
		} else {
			try {
				if (browser.identity && browser.identity.removeCachedAuthToken && this.accessToken) {
					await browser.identity.removeCachedAuthToken({ token: this.accessToken });
				}
				this.accessToken = await browser.identity.getAuthToken({ interactive: false });
				return { revokableAccessToken: this.accessToken };
			} catch (error) {
				delete this.accessToken;
			}
		}
	}
	async revokeAuthToken(accessToken) {
		if (accessToken) {
			if (browser.identity && browser.identity.removeCachedAuthToken) {
				try {
					await browser.identity.removeCachedAuthToken({ token: accessToken });
				} catch (error) {
					// ignored
				}
			}
			const httpResponse = await fetch(REVOKE_ACCESS_URL, {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: "token=" + accessToken
			});
			try {
				await getJSON(httpResponse);
			}
			catch (error) {
				if (error.message != "invalid_token") {
					throw error;
				}
			}
			finally {
				delete this.accessToken;
				delete this.refreshToken;
				delete this.expirationDate;
			}
		}
	}
	async upload(fullFilename, blob, options, setCancelCallback, retry = true) {
		const parentFolderId = await getParentFolderId(this, fullFilename);
		const fileParts = fullFilename.split("/");
		const filename = fileParts.pop();
		const uploader = new MediaUploader({
			token: this.accessToken,
			file: blob,
			parents: [parentFolderId],
			filename,
			onProgress: options.onProgress
		});
		try {
			if (setCancelCallback) {
				setCancelCallback(() => uploader.cancelled = true);
			}
			await uploader.upload();
		}
		catch (error) {
			if (error.message == "path_not_found" && retry) {
				this.folderIds.clear();
				return this.upload(fullFilename, blob, options, setCancelCallback);
			} else {
				throw error;
			}
		}
	}
}

class MediaUploader {
	constructor(options) {
		this.file = options.file;
		this.onProgress = options.onProgress;
		this.contentType = this.file.type || "application/octet-stream";
		this.metadata = {
			name: options.filename,
			mimeType: this.contentType,
			parents: options.parents || ["root"]
		};
		this.token = options.token;
		this.offset = 0;
		this.chunkSize = options.chunkSize || 512 * 1024;
	}
	async upload() {
		const httpResponse = getResponse(await fetch(GDRIVE_UPLOAD_URL + "?uploadType=resumable", {
			method: "POST",
			headers: {
				"Authorization": "Bearer " + this.token,
				"Content-Type": "application/json",
				"X-Upload-Content-Length": this.file.size,
				"X-Upload-Content-Type": this.contentType
			},
			body: JSON.stringify(this.metadata)
		}));
		const location = httpResponse.headers.get("Location");
		this.url = location;
		if (!this.cancelled) {
			if (this.onProgress) {
				this.onProgress(0, this.file.size);
			}
			return sendFile(this);
		}
	}
}

export { GDrive };

async function authFromCode(gdrive, options) {
	const httpResponse = await fetch(TOKEN_URL, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: "client_id=" + gdrive.clientId +
			"&client_secret=" + gdrive.clientKey +
			"&grant_type=authorization_code" +
			"&code=" + options.code +
			"&redirect_uri=" + browser.identity.getRedirectURL()
	});
	const response = await getJSON(httpResponse);
	gdrive.accessToken = response.access_token;
	gdrive.refreshToken = response.refresh_token;
	gdrive.expirationDate = Date.now() + (response.expires_in * 1000);
	return { accessToken: gdrive.accessToken, refreshToken: gdrive.refreshToken, expirationDate: gdrive.expirationDate };
}

async function initAuth(gdrive, options) {
	let code;
	try {
		if (browser.identity && browser.identity.launchWebAuthFlow && !options.forceWebAuthFlow) {
			const authURL = await browser.identity.launchWebAuthFlow({
				interactive: options.interactive,
				url: gdrive.authURL
			});
			options.code = new URLSearchParams(new URL(authURL).search).get("code");
			return await authFromCode(gdrive, options);
		} else if (options.launchWebAuthFlow) {
			options.extractAuthCode(browser.identity.getRedirectURL())
				.then(authCode => code = authCode)
				.catch(() => { /* ignored */ });
			return await options.launchWebAuthFlow({ url: gdrive.authURL });
		} else {
			throw new Error("auth_not_supported");
		}
	}
	catch (error) {
		if (error.message && (error.message == "code_required" || error.message.includes("access"))) {
			if (code) {
				options.code = code;
				return await authFromCode(gdrive, options);
			} else {
				throw new Error("code_required");
			}
		} else {
			throw error;
		}
	}
}

function nativeAuth(options = {}) {
	return Boolean(browser.identity && browser.identity.getAuthToken) && !options.forceWebAuthFlow;
}

async function getParentFolderId(gdrive, filename, retry = true) {
	const fileParts = filename.split("/");
	fileParts.pop();
	const folderId = gdrive.folderIds.get(fileParts.join("/"));
	if (folderId) {
		return folderId;
	}
	let parentFolderId = "root";
	if (fileParts.length) {
		let fullFolderName = "";
		for (const folderName of fileParts) {
			if (fullFolderName) {
				fullFolderName += "/";
			}
			fullFolderName += folderName;
			const folderId = gdrive.folderIds.get(fullFolderName);
			if (folderId) {
				parentFolderId = folderId;
			} else {
				try {
					parentFolderId = await getOrCreateFolder(gdrive, folderName, parentFolderId);
					gdrive.folderIds.set(fullFolderName, parentFolderId);
				} catch (error) {
					if (error.message == "path_not_found" && retry) {
						gdrive.folderIds.clear();
						return getParentFolderId(gdrive, filename, false);
					} else {
						throw error;
					}
				}
			}
		}
	}
	return parentFolderId;
}

async function getOrCreateFolder(gdrive, folderName, parentFolderId) {
	const response = await getFolder(gdrive, folderName, parentFolderId);
	if (response.files.length) {
		return response.files[0].id;
	} else {
		const response = await createFolder(gdrive, folderName, parentFolderId);
		return response.id;
	}
}

async function getFolder(gdrive, folderName, parentFolderId) {
	const httpResponse = await fetch(GDRIVE_URL + "?q=mimeType = 'application/vnd.google-apps.folder' and name = '" + folderName + "' and trashed != true and '" + parentFolderId + "' in parents", {
		headers: {
			"Authorization": "Bearer " + gdrive.accessToken
		}
	});
	return getJSON(httpResponse);
}

async function createFolder(gdrive, folderName, parentFolderId) {
	const httpResponse = await fetch(GDRIVE_URL, {
		method: "POST",
		headers: {
			"Authorization": "Bearer " + gdrive.accessToken,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: folderName,
			parents: [parentFolderId],
			mimeType: "application/vnd.google-apps.folder"
		})
	});
	return getJSON(httpResponse);
}

async function sendFile(mediaUploader) {
	let content = mediaUploader.file, end = mediaUploader.file.size;
	if (mediaUploader.offset || mediaUploader.chunkSize) {
		if (mediaUploader.chunkSize) {
			end = Math.min(mediaUploader.offset + mediaUploader.chunkSize, mediaUploader.file.size);
		}
		content = content.slice(mediaUploader.offset, end);
	}
	const httpResponse = await fetch(mediaUploader.url, {
		method: "PUT",
		headers: {
			"Authorization": "Bearer " + mediaUploader.token,
			"Content-Type": mediaUploader.contentType,
			"Content-Range": "bytes " + mediaUploader.offset + "-" + (end - 1) + "/" + mediaUploader.file.size,
			"X-Upload-Content-Type": mediaUploader.contentType
		},
		body: content
	});
	if (mediaUploader.onProgress && !mediaUploader.cancelled) {
		mediaUploader.onProgress(mediaUploader.offset + mediaUploader.chunkSize, mediaUploader.file.size);
	}
	if (httpResponse.status == 200 || httpResponse.status == 201) {
		return httpResponse.json();
	} else if (httpResponse.status == 308) {
		const range = httpResponse.headers.get("Range");
		if (range) {
			mediaUploader.offset = parseInt(range.match(/\d+/g).pop(), 10) + 1;
		}
		if (mediaUploader.cancelled) {
			throw new Error("upload_cancelled");
		} else {
			return sendFile(mediaUploader);
		}
	} else {
		getResponse(httpResponse);
	}
}

async function getJSON(httpResponse) {
	httpResponse = getResponse(httpResponse);
	const response = await httpResponse.json();
	if (response.error) {
		throw new Error(response.error);
	} else {
		return response;
	}
}

function getResponse(httpResponse) {
	if (httpResponse.status == 200) {
		return httpResponse;
	} else if (httpResponse.status == 404) {
		throw new Error("path_not_found");
	} else if (httpResponse.status == 401) {
		throw new Error("invalid_token");
	} else {
		throw new Error("unknown_error (" + httpResponse.status + ")");
	}
}