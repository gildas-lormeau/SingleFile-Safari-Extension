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

/* global browser, document, globalThis, location, setTimeout */

import * as download from "./../common/download.js";
import { fetch, frameFetch } from "./../../lib/single-file/fetch/content/content-fetch.js";
import * as ui from "./../../ui/content/content-ui.js";
import { onError } from "./../../ui/common/content-error.js";

const singlefile = globalThis.singlefile;
const bootstrap = globalThis.singlefileBootstrap;

const MOZ_EXTENSION_PROTOCOL = "moz-extension:";

let processor, processing;

singlefile.init({ fetch, frameFetch });
browser.runtime.onMessage.addListener(message => {
	if (message.method == "content.save" || message.method == "content.cancelSave" || message.method == "content.getSelectedLinks" || message.method == "content.error") {
		return onMessage(message);
	}
});

async function onMessage(message) {
	if (!location.href.startsWith(MOZ_EXTENSION_PROTOCOL)) {
		if (message.method == "content.save") {
			await savePage(message);
			return {};
		}
		if (message.method == "content.cancelSave") {
			if (processor) {
				processor.cancel();
				ui.onEndPage();
				browser.runtime.sendMessage({ method: "ui.processCancelled" });
			}
			if (message.options.loadDeferredImages) {
				singlefile.processors.lazy.resetZoomLevel(message.options);
			}
			return {};
		}
		if (message.method == "content.getSelectedLinks") {
			return {
				urls: ui.getSelectedLinks()
			};
		}
		if (message.method == "content.error") {
			onError(message.error, message.link);
		}
	}
}

async function savePage(message) {
	const options = message.options;
	let selectionFound;
	if (options.selected || options.optionallySelected) {
		selectionFound = await ui.markSelection(options.optionallySelected);
	}
	if (!processing && (!bootstrap || !bootstrap.pageInfo.processing)) {
		options.updatedResources = bootstrap ? bootstrap.pageInfo.updatedResources : {};
		options.visitDate = bootstrap ? bootstrap.pageInfo.visitDate : new Date();
		Object.keys(options.updatedResources).forEach(url => options.updatedResources[url].retrieved = false);
		if (options.optionallySelected && selectionFound) {
			options.selected = true;
		}
		if (!options.selected || selectionFound) {
			if (bootstrap) {
				bootstrap.pageInfo.processing = true;
			}
			processing = true;
			try {
				const pageData = await processPage(options);
				if (pageData) {
					if (((!options.backgroundSave && !options.saveToClipboard) || options.saveToGDrive || options.saveToGitHub || options.saveWithCompanion || options.saveWithWebDAV) && options.confirmFilename) {
						pageData.filename = ui.prompt("Save as", pageData.filename) || pageData.filename;
					}
					await download.downloadPage(pageData, options);
				}
			} catch (error) {
				if (!processor.cancelled) {
					console.error(error); // eslint-disable-line no-console
					browser.runtime.sendMessage({ method: "ui.processError", error });
				}
			}
		} else {
			browser.runtime.sendMessage({ method: "ui.processCancelled" });
		}
		processing = false;
		if (bootstrap) {
			bootstrap.pageInfo.processing = false;
		}
	}
}

async function processPage(options) {
	const frames = singlefile.processors.frameTree;
	let framesSessionId;
	options.keepFilename = options.saveToGDrive || options.saveToGitHub || options.saveWithWebDAV;
	singlefile.helper.initDoc(document);
	ui.onStartPage(options);
	processor = new singlefile.SingleFile(options);
	const preInitializationPromises = [];
	options.insertCanonicalLink = true;
	if (!options.saveRawPage) {
		if (!options.removeFrames && frames && globalThis.frames && globalThis.frames.length) {
			let frameTreePromise;
			if (options.loadDeferredImages) {
				frameTreePromise = new Promise(resolve => setTimeout(() => resolve(frames.getAsync(options)), options.loadDeferredImagesMaxIdleTime - frames.TIMEOUT_INIT_REQUEST_MESSAGE));
			} else {
				frameTreePromise = frames.getAsync(options);
			}
			ui.onLoadingFrames(options);
			frameTreePromise.then(() => {
				if (!processor.cancelled) {
					ui.onLoadFrames(options);
				}
			});
			preInitializationPromises.push(frameTreePromise);
		}
		if (options.loadDeferredImages) {
			const lazyLoadPromise = singlefile.processors.lazy.process(options);
			ui.onLoadingDeferResources(options);
			lazyLoadPromise.then(() => {
				if (!processor.cancelled) {
					ui.onLoadDeferResources(options);
				}
			});
			preInitializationPromises.push(lazyLoadPromise);
		}
	}
	let index = 0, maxIndex = 0;
	options.onprogress = event => {
		if (!processor.cancelled) {
			if (event.type == event.RESOURCES_INITIALIZED) {
				maxIndex = event.detail.max;
				if (options.loadDeferredImages) {
					singlefile.processors.lazy.resetZoomLevel(options);
				}
			}
			if (event.type == event.RESOURCES_INITIALIZED || event.type == event.RESOURCE_LOADED) {
				if (event.type == event.RESOURCE_LOADED) {
					index++;
				}
				browser.runtime.sendMessage({ method: "ui.processProgress", index, maxIndex });
				ui.onLoadResource(index, maxIndex, options);
			} else if (!event.detail.frame) {
				if (event.type == event.PAGE_LOADING) {
					ui.onPageLoading();
				} else if (event.type == event.PAGE_LOADED) {
					ui.onLoadPage();
				} else if (event.type == event.STAGE_STARTED) {
					if (event.detail.step < 3) {
						ui.onStartStage(event.detail.step, options);
					}
				} else if (event.type == event.STAGE_ENDED) {
					if (event.detail.step < 3) {
						ui.onEndStage(event.detail.step, options);
					}
				} else if (event.type == event.STAGE_TASK_STARTED) {
					ui.onStartStageTask(event.detail.step, event.detail.task);
				} else if (event.type == event.STAGE_TASK_ENDED) {
					ui.onEndStageTask(event.detail.step, event.detail.task);
				}
			}
		}
	};
	[options.frames] = await new Promise(resolve => {
		const preInitializationAllPromises = Promise.all(preInitializationPromises);
		const cancelProcessor = processor.cancel.bind(processor);
		processor.cancel = function () {
			cancelProcessor();
			resolve([[]]);
		};
		preInitializationAllPromises.then(() => resolve(preInitializationAllPromises));
	});
	framesSessionId = options.frames && options.frames.sessionId;
	const selectedFrame = options.frames && options.frames.find(frameData => frameData.requestedFrame);
	options.win = globalThis;
	if (selectedFrame) {
		options.content = selectedFrame.content;
		options.url = selectedFrame.baseURI;
		options.canvases = selectedFrame.canvases;
		options.fonts = selectedFrame.fonts;
		options.stylesheets = selectedFrame.stylesheets;
		options.images = selectedFrame.images;
		options.posters = selectedFrame.posters;
		options.videos = selectedFrame.videos;
		options.usedFonts = selectedFrame.usedFonts;
		options.shadowRoots = selectedFrame.shadowRoots;
	} else {
		options.doc = document;
	}
	if (!processor.cancelled) {
		await processor.run();
	}
	if (framesSessionId) {
		frames.cleanup(framesSessionId);
	}
	let page;
	if (!processor.cancelled) {
		if (options.confirmInfobarContent) {
			options.infobarContent = ui.prompt("Infobar content", options.infobarContent) || "";
		}
		page = await processor.getPageData();
		if (options.selected || options.optionallySelected) {
			ui.unmarkSelection();
		}
		ui.onEndPage();
		if (options.displayStats) {
			console.log("SingleFile stats"); // eslint-disable-line no-console
			console.table(page.stats); // eslint-disable-line no-console
		}
	}
	return page;
}