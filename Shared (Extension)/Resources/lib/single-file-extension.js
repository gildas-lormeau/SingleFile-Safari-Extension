(function () {
	'use strict';

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

	/* global browser, infobar, document, URL, Blob, MouseEvent, setTimeout, open */

	const MAX_CONTENT_SIZE = 32 * (1024 * 1024);

	async function downloadPage(pageData, options) {
		if (options.includeBOM) {
			pageData.content = "\ufeff" + pageData.content;
		}
		if (options.includeInfobar) {
			pageData.content += await infobar.getScript();
		}
		if (options.backgroundSave || options.openEditor || options.saveToGDrive || options.saveToGitHub || options.saveWithCompanion || options.saveWithWebDAV) {
			for (let blockIndex = 0; blockIndex * MAX_CONTENT_SIZE < pageData.content.length; blockIndex++) {
				const message = {
					method: "downloads.download",
					taskId: options.taskId,
					confirmFilename: options.confirmFilename,
					filenameConflictAction: options.filenameConflictAction,
					filename: pageData.filename,
					saveToClipboard: options.saveToClipboard,
					saveToGDrive: options.saveToGDrive,
					saveWithWebDAV: options.saveWithWebDAV,
					webDAVURL: options.webDAVURL,
					webDAVUser: options.webDAVUser,
					webDAVPassword: options.webDAVPassword,
					saveToGitHub: options.saveToGitHub,
					githubToken: options.githubToken,
					githubUser: options.githubUser,
					githubRepository: options.githubRepository,
					githubBranch: options.githubBranch,
					saveWithCompanion: options.saveWithCompanion,
					forceWebAuthFlow: options.forceWebAuthFlow,
					filenameReplacementCharacter: options.filenameReplacementCharacter,
					openEditor: options.openEditor,
					openSavedPage: options.openSavedPage,
					compressHTML: options.compressHTML,
					backgroundSave: options.backgroundSave,
					bookmarkId: options.bookmarkId,
					replaceBookmarkURL: options.replaceBookmarkURL,
					applySystemTheme: options.applySystemTheme,
					defaultEditorMode: options.defaultEditorMode,
					includeInfobar: options.includeInfobar,
					warnUnsavedPage: options.warnUnsavedPage
				};
				message.truncated = pageData.content.length > MAX_CONTENT_SIZE;
				if (message.truncated) {
					message.finished = (blockIndex + 1) * MAX_CONTENT_SIZE > pageData.content.length;
					message.content = pageData.content.substring(blockIndex * MAX_CONTENT_SIZE, (blockIndex + 1) * MAX_CONTENT_SIZE);
				} else {
					message.content = pageData.content;
				}
				await browser.runtime.sendMessage(message);
			}
		} else {
			if (options.saveToClipboard) {
				saveToClipboard(pageData);
			} else {
				await downloadPageForeground(pageData);
			}
			if (options.openSavedPage) {
				open(URL.createObjectURL(new Blob([pageData.content], { type: "text/html" })));
			}
			browser.runtime.sendMessage({ method: "ui.processEnd" });
		}
		await browser.runtime.sendMessage({ method: "downloads.end", taskId: options.taskId, hash: pageData.hash, woleetKey: options.woleetKey });
	}

	async function downloadPageForeground(pageData) {
		if (pageData.filename && pageData.filename.length) {
			const link = document.createElement("a");
			link.download = pageData.filename;
			link.href = URL.createObjectURL(new Blob([pageData.content], { type: "text/html" }));
			link.dispatchEvent(new MouseEvent("click"));
			setTimeout(() => URL.revokeObjectURL(link.href), 1000);
		}
		return new Promise(resolve => setTimeout(resolve, 1));
	}

	function saveToClipboard(page) {
		const command = "copy";
		document.addEventListener(command, listener);
		document.execCommand(command);
		document.removeEventListener(command, listener);

		function listener(event) {
			event.clipboardData.setData("text/html", page.content);
			event.clipboardData.setData("text/plain", page.content);
			event.preventDefault();
		}
	}

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

	/* global browser, window, CustomEvent, setTimeout, clearTimeout */

	const FETCH_REQUEST_EVENT = "single-file-request-fetch";
	const FETCH_ACK_EVENT = "single-file-ack-fetch";
	const FETCH_RESPONSE_EVENT = "single-file-response-fetch";
	const ERR_HOST_FETCH = "Host fetch error (SingleFile)";
	const HOST_FETCH_MAX_DELAY = 2500;
	const USE_HOST_FETCH = Boolean(window.wrappedJSObject);

	const addEventListener$1 = (type, listener, options) => window.addEventListener(type, listener, options);
	const dispatchEvent = event => window.dispatchEvent(event);
	const removeEventListener$1 = (type, listener, options) => window.removeEventListener(type, listener, options);

	const fetch = (url, options) => window.fetch(url, options);

	let requestId = 0, pendingResponses = new Map();

	browser.runtime.onMessage.addListener(message => {
		if (message.method == "singlefile.fetchFrame" && window.frameId && window.frameId == message.frameId) {
			return onFetchFrame(message);
		}
		if (message.method == "singlefile.fetchResponse") {
			return onFetchResponse(message);
		}
	});

	async function onFetchFrame(message) {
		try {
			const response = await fetch(message.url, { cache: "force-cache", headers: message.headers });
			return {
				status: response.status,
				headers: [...response.headers],
				array: Array.from(new Uint8Array(await response.arrayBuffer()))
			};
		} catch (error) {
			return {
				error: error && error.toString()
			};
		}
	}

	async function onFetchResponse(message) {
		const pendingResponse = pendingResponses.get(message.requestId);
		if (pendingResponse) {
			if (message.error) {
				pendingResponse.reject(new Error(message.error));
				pendingResponses.delete(message.requestId);
			} else {
				if (message.truncated) {
					if (pendingResponse.array) {
						pendingResponse.array = pendingResponse.array.concat(message.array);
					} else {
						pendingResponse.array = message.array;
						pendingResponses.set(message.requestId, pendingResponse);
					}
					if (message.finished) {
						message.array = pendingResponse.array;
					}
				}
				if (!message.truncated || message.finished) {
					pendingResponse.resolve({
						status: message.status,
						headers: { get: headerName => message.headers && message.headers[headerName] },
						arrayBuffer: async () => new Uint8Array(message.array).buffer
					});
					pendingResponses.delete(message.requestId);
				}
			}
		}
		return {};
	}

	async function hostFetch(url, options) {
		const result = new Promise((resolve, reject) => {
			dispatchEvent(new CustomEvent(FETCH_REQUEST_EVENT, { detail: JSON.stringify({ url, options }) }));
			addEventListener$1(FETCH_ACK_EVENT, onAckFetch, false);
			addEventListener$1(FETCH_RESPONSE_EVENT, onResponseFetch, false);
			const timeout = setTimeout(() => {
				removeListeners();
				reject(new Error(ERR_HOST_FETCH));
			}, HOST_FETCH_MAX_DELAY);

			function onResponseFetch(event) {
				if (event.detail) {
					if (event.detail.url == url) {
						removeListeners();
						if (event.detail.response) {
							resolve({
								status: event.detail.status,
								headers: new Map(event.detail.headers),
								arrayBuffer: async () => event.detail.response
							});
						} else {
							reject(event.detail.error);
						}
					}
				} else {
					reject();
				}
			}

			function onAckFetch() {
				clearTimeout(timeout);
			}

			function removeListeners() {
				removeEventListener$1(FETCH_RESPONSE_EVENT, onResponseFetch, false);
				removeEventListener$1(FETCH_ACK_EVENT, onAckFetch, false);
			}
		});
		try {
			return await result;
		} catch (error) {
			if (error && error.message == ERR_HOST_FETCH) {
				return fetch(url, options);
			} else {
				throw error;
			}
		}
	}

	async function fetchResource(url, options = {}) {
		try {
			const fetchOptions = { cache: "force-cache", headers: options.headers };
			return await (options.referrer && USE_HOST_FETCH ? hostFetch(url, fetchOptions) : fetch(url, fetchOptions));
		}
		catch (error) {
			requestId++;
			const promise = new Promise((resolve, reject) => pendingResponses.set(requestId, { resolve, reject }));
			await sendMessage({ method: "singlefile.fetch", url, requestId, referrer: options.referrer, headers: options.headers });
			return promise;
		}
	}

	async function frameFetch(url, options) {
		const response = await sendMessage({ method: "singlefile.fetchFrame", url, frameId: options.frameId, referrer: options.referrer, headers: options.headers });
		return {
			status: response.status,
			headers: new Map(response.headers),
			arrayBuffer: async () => new Uint8Array(response.array).buffer
		};
	}

	async function sendMessage(message) {
		const response = await browser.runtime.sendMessage(message);
		if (!response || response.error) {
			throw new Error(response && response.error && response.error.toString());
		} else {
			return response;
		}
	}

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

	/* global browser, document, globalThis, prompt, getComputedStyle, addEventListener, removeEventListener, requestAnimationFrame, setTimeout, getSelection, Node */

	const singlefile$2 = globalThis.singlefile;

	const SELECTED_CONTENT_ATTRIBUTE_NAME = singlefile$2.helper.SELECTED_CONTENT_ATTRIBUTE_NAME;

	const MASK_TAGNAME = "singlefile-mask";
	const MASK_CONTENT_CLASSNAME = "singlefile-mask-content";
	const PROGRESSBAR_CLASSNAME = "singlefile-progress-bar";
	const PROGRESSBAR_CONTENT_CLASSNAME = "singlefile-progress-bar-content";
	const SELECTION_ZONE_TAGNAME = "single-file-selection-zone";
	const LOGS_WINDOW_TAGNAME = "singlefile-logs-window";
	const LOGS_CLASSNAME = "singlefile-logs";
	const LOGS_LINE_CLASSNAME = "singlefile-logs-line";
	const LOGS_LINE_TEXT_ELEMENT_CLASSNAME = "singlefile-logs-line-text";
	const LOGS_LINE_STATUS_ELEMENT_CLASSNAME = "singlefile-logs-line-icon";
	const SINGLE_FILE_UI_ELEMENT_CLASS$1 = singlefile$2.helper.SINGLE_FILE_UI_ELEMENT_CLASS;
	const SELECT_PX_THRESHOLD = 8;
	const LOG_PANEL_DEFERRED_IMAGES_MESSAGE = browser.i18n.getMessage("logPanelDeferredImages");
	const LOG_PANEL_FRAME_CONTENTS_MESSAGE = browser.i18n.getMessage("logPanelFrameContents");
	const LOG_PANEL_STEP_MESSAGE = browser.i18n.getMessage("logPanelStep");
	const LOG_PANEL_WIDTH = browser.i18n.getMessage("logPanelWidth");
	const CSS_PROPERTIES$1 = new Set(Array.from(getComputedStyle(document.documentElement)));

	let selectedAreaElement, logsWindowElement;
	createLogsWindowElement();

	function promptMessage(message, defaultValue) {
		return prompt(message, defaultValue);
	}

	function onStartPage(options) {
		let maskElement = document.querySelector(MASK_TAGNAME);
		if (!maskElement) {
			if (options.logsEnabled) {
				document.documentElement.appendChild(logsWindowElement);
			}
			if (options.shadowEnabled) {
				const maskElement = createMaskElement();
				if (options.progressBarEnabled) {
					createProgressBarElement(maskElement);
				}
			}
		}
	}

	function onEndPage() {
		const maskElement = document.querySelector(MASK_TAGNAME);
		if (maskElement) {
			maskElement.remove();
		}
		logsWindowElement.remove();
		clearLogs();
	}

	function onLoadResource(index, maxIndex, options) {
		if (options.shadowEnabled && options.progressBarEnabled) {
			updateProgressBar(index, maxIndex);
		}
	}

	function onLoadingDeferResources(options) {
		updateLog("load-deferred-images", LOG_PANEL_DEFERRED_IMAGES_MESSAGE, "…", options);
	}

	function onLoadDeferResources(options) {
		updateLog("load-deferred-images", LOG_PANEL_DEFERRED_IMAGES_MESSAGE, "✓", options);
	}

	function onLoadingFrames(options) {
		updateLog("load-frames", LOG_PANEL_FRAME_CONTENTS_MESSAGE, "…", options);
	}

	function onLoadFrames(options) {
		updateLog("load-frames", LOG_PANEL_FRAME_CONTENTS_MESSAGE, "✓", options);
	}

	function onStartStage(step, options) {
		updateLog("step-" + step, `${LOG_PANEL_STEP_MESSAGE} ${step + 1} / 3`, "…", options);
	}

	function onEndStage(step, options) {
		updateLog("step-" + step, `${LOG_PANEL_STEP_MESSAGE} ${step + 1} / 3`, "✓", options);
	}

	function onStartStageTask() { }

	function onEndStageTask() { }

	function getSelectedLinks() {
		let selectionFound;
		const links = [];
		const selection = getSelection();
		for (let indexRange = 0; indexRange < selection.rangeCount; indexRange++) {
			let range = selection.getRangeAt(indexRange);
			if (range && range.commonAncestorContainer) {
				const treeWalker = document.createTreeWalker(range.commonAncestorContainer);
				let rangeSelectionFound = false;
				let finished = false;
				while (!finished) {
					if (rangeSelectionFound || treeWalker.currentNode == range.startContainer || treeWalker.currentNode == range.endContainer) {
						rangeSelectionFound = true;
						if (range.startContainer != range.endContainer || range.startOffset != range.endOffset) {
							selectionFound = true;
							if (treeWalker.currentNode.tagName == "A" && treeWalker.currentNode.href) {
								links.push(treeWalker.currentNode.href);
							}
						}
					}
					if (treeWalker.currentNode == range.endContainer) {
						finished = true;
					} else {
						treeWalker.nextNode();
					}
				}
				if (selectionFound && treeWalker.currentNode == range.endContainer && treeWalker.currentNode.querySelectorAll) {
					treeWalker.currentNode.querySelectorAll("*").forEach(descendantElement => {
						if (descendantElement.tagName == "A" && descendantElement.href) {
							links.push(treeWalker.currentNode.href);
						}
					});
				}
			}
		}
		return Array.from(new Set(links));
	}

	async function markSelection(optionallySelected) {
		let selectionFound = markSelectedContent();
		if (selectionFound || optionallySelected) {
			return selectionFound;
		} else {
			selectionFound = await selectArea();
			if (selectionFound) {
				return markSelectedContent();
			}
		}
	}

	function markSelectedContent() {
		const selection = getSelection();
		let selectionFound;
		for (let indexRange = 0; indexRange < selection.rangeCount; indexRange++) {
			let range = selection.getRangeAt(indexRange);
			if (range && range.commonAncestorContainer) {
				const treeWalker = document.createTreeWalker(range.commonAncestorContainer);
				let rangeSelectionFound = false;
				let finished = false;
				while (!finished) {
					if (rangeSelectionFound || treeWalker.currentNode == range.startContainer || treeWalker.currentNode == range.endContainer) {
						rangeSelectionFound = true;
						if (range.startContainer != range.endContainer || range.startOffset != range.endOffset) {
							selectionFound = true;
							markSelectedNode(treeWalker.currentNode);
						}
					}
					if (selectionFound && treeWalker.currentNode == range.startContainer) {
						markSelectedParents(treeWalker.currentNode);
					}
					if (treeWalker.currentNode == range.endContainer) {
						finished = true;
					} else {
						treeWalker.nextNode();
					}
				}
				if (selectionFound && treeWalker.currentNode == range.endContainer && treeWalker.currentNode.querySelectorAll) {
					treeWalker.currentNode.querySelectorAll("*").forEach(descendantElement => markSelectedNode(descendantElement));
				}
			}
		}
		return selectionFound;
	}

	function markSelectedNode(node) {
		const element = node.nodeType == Node.ELEMENT_NODE ? node : node.parentElement;
		element.setAttribute(SELECTED_CONTENT_ATTRIBUTE_NAME, "");
	}

	function markSelectedParents(node) {
		if (node.parentElement) {
			markSelectedNode(node);
			markSelectedParents(node.parentElement);
		}
	}

	function unmarkSelection() {
		document.querySelectorAll("[" + SELECTED_CONTENT_ATTRIBUTE_NAME + "]").forEach(selectedContent => selectedContent.removeAttribute(SELECTED_CONTENT_ATTRIBUTE_NAME));
	}

	function selectArea() {
		return new Promise(resolve => {
			let selectedRanges = [];
			addEventListener("mousemove", mousemoveListener, true);
			addEventListener("click", clickListener, true);
			addEventListener("keyup", keypressListener, true);
			document.addEventListener("contextmenu", contextmenuListener, true);
			getSelection().removeAllRanges();

			function contextmenuListener(event) {
				selectedRanges = [];
				select();
				event.preventDefault();
			}

			function mousemoveListener(event) {
				const targetElement = getTarget(event);
				if (targetElement) {
					selectedAreaElement = targetElement;
					moveAreaSelector(targetElement);
				}
			}

			function clickListener(event) {
				event.preventDefault();
				event.stopPropagation();
				if (event.button == 0) {
					select(selectedAreaElement, event.ctrlKey);
				} else {
					cancel();
				}
			}

			function keypressListener(event) {
				if (event.key == "Escape") {
					cancel();
				}
			}

			function cancel() {
				if (selectedRanges.length) {
					getSelection().removeAllRanges();
				}
				selectedRanges = [];
				cleanupAndResolve();
			}

			function select(selectedElement, multiSelect) {
				if (selectedElement) {
					if (!multiSelect) {
						restoreSelectedRanges();
					}
					const range = document.createRange();
					range.selectNodeContents(selectedElement);
					cleanupSelectionRanges();
					getSelection().addRange(range);
					saveSelectedRanges();
					if (!multiSelect) {
						cleanupAndResolve();
					}
				} else {
					cleanupAndResolve();
				}
			}

			function cleanupSelectionRanges() {
				const selection = getSelection();
				for (let indexRange = selection.rangeCount - 1; indexRange >= 0; indexRange--) {
					const range = selection.getRangeAt(indexRange);
					if (range.startOffset == range.endOffset) {
						selection.removeRange(range);
						indexRange--;
					}
				}
			}

			function cleanupAndResolve() {
				getAreaSelector().remove();
				removeEventListener("mousemove", mousemoveListener, true);
				removeEventListener("click", clickListener, true);
				removeEventListener("keyup", keypressListener, true);
				selectedAreaElement = null;
				resolve(Boolean(selectedRanges.length));
				setTimeout(() => document.removeEventListener("contextmenu", contextmenuListener, true), 0);
			}

			function restoreSelectedRanges() {
				getSelection().removeAllRanges();
				selectedRanges.forEach(range => getSelection().addRange(range));
			}

			function saveSelectedRanges() {
				selectedRanges = [];
				for (let indexRange = 0; indexRange < getSelection().rangeCount; indexRange++) {
					const range = getSelection().getRangeAt(indexRange);
					selectedRanges.push(range);
				}
			}
		});
	}

	function getTarget(event) {
		let newTarget, target = event.target, boundingRect = target.getBoundingClientRect();
		newTarget = determineTargetElement("floor", target, event.clientX - boundingRect.left, getMatchedParents(target, "left"));
		if (newTarget == target) {
			newTarget = determineTargetElement("ceil", target, boundingRect.left + boundingRect.width - event.clientX, getMatchedParents(target, "right"));
		}
		if (newTarget == target) {
			newTarget = determineTargetElement("floor", target, event.clientY - boundingRect.top, getMatchedParents(target, "top"));
		}
		if (newTarget == target) {
			newTarget = determineTargetElement("ceil", target, boundingRect.top + boundingRect.height - event.clientY, getMatchedParents(target, "bottom"));
		}
		target = newTarget;
		while (target && target.clientWidth <= SELECT_PX_THRESHOLD && target.clientHeight <= SELECT_PX_THRESHOLD) {
			target = target.parentElement;
		}
		return target;
	}

	function moveAreaSelector(target) {
		requestAnimationFrame(() => {
			const selectorElement = getAreaSelector();
			const boundingRect = target.getBoundingClientRect();
			const scrollingElement = document.scrollingElement || document.documentElement;
			selectorElement.style.setProperty("top", (scrollingElement.scrollTop + boundingRect.top - 10) + "px");
			selectorElement.style.setProperty("left", (scrollingElement.scrollLeft + boundingRect.left - 10) + "px");
			selectorElement.style.setProperty("width", (boundingRect.width + 20) + "px");
			selectorElement.style.setProperty("height", (boundingRect.height + 20) + "px");
		});
	}

	function getAreaSelector() {
		let selectorElement = document.querySelector(SELECTION_ZONE_TAGNAME);
		if (!selectorElement) {
			selectorElement = createElement$1(SELECTION_ZONE_TAGNAME, document.body);
			selectorElement.style.setProperty("box-sizing", "border-box", "important");
			selectorElement.style.setProperty("background-color", "#3ea9d7", "important");
			selectorElement.style.setProperty("border", "10px solid #0b4892", "important");
			selectorElement.style.setProperty("border-radius", "2px", "important");
			selectorElement.style.setProperty("opacity", ".25", "important");
			selectorElement.style.setProperty("pointer-events", "none", "important");
			selectorElement.style.setProperty("position", "absolute", "important");
			selectorElement.style.setProperty("transition", "all 100ms", "important");
			selectorElement.style.setProperty("cursor", "pointer", "important");
			selectorElement.style.setProperty("z-index", "2147483647", "important");
			selectorElement.style.removeProperty("border-inline-end");
			selectorElement.style.removeProperty("border-inline-start");
			selectorElement.style.removeProperty("inline-size");
			selectorElement.style.removeProperty("block-size");
			selectorElement.style.removeProperty("inset-block-start");
			selectorElement.style.removeProperty("inset-inline-end");
			selectorElement.style.removeProperty("inset-block-end");
			selectorElement.style.removeProperty("inset-inline-start");
		}
		return selectorElement;
	}

	function createMaskElement() {
		try {
			let maskElement = document.querySelector(MASK_TAGNAME);
			if (!maskElement) {
				maskElement = createElement$1(MASK_TAGNAME, document.documentElement);
				const shadowRoot = maskElement.attachShadow({ mode: "open" });
				const styleElement = document.createElement("style");
				styleElement.textContent = `
				@keyframes single-file-progress { 
					0% { 
						left: -50px;
					} 
					100% { 
						left: 0;
					}
				}
				.${PROGRESSBAR_CLASSNAME} {
					position: fixed;
					top: 0;
					left: 0;
					width: 0;
					height: 8px;
					z-index: 2147483646;
					opacity: .5;
					overflow: hidden;					
					transition: width 200ms ease-in-out;
				}
				.${PROGRESSBAR_CONTENT_CLASSNAME} {
					position: absolute;
					left: 0;
					animation: single-file-progress 3s linear infinite reverse;
					background: 
						white 
						linear-gradient(-45deg, rgba(0, 0, 0, 0.075) 25%, 
							transparent 25%, 
							transparent 50%, 
							rgba(0, 0, 0, 0.075) 50%, 
							rgba(0, 0, 0, 0.075) 75%, 
							transparent 75%, transparent)
						repeat scroll 0% 0% / 50px 50px padding-box border-box;
					width: calc(100% + 50px);
					height: 100%;					
				}
				.${MASK_CONTENT_CLASSNAME} {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: 2147483646;
					opacity: 0;
					background-color: black;
					transition: opacity 250ms;
				}
			`;
				shadowRoot.appendChild(styleElement);
				let maskElementContent = document.createElement("div");
				maskElementContent.classList.add(MASK_CONTENT_CLASSNAME);
				shadowRoot.appendChild(maskElementContent);
				maskElement.offsetWidth;
				maskElementContent.style.setProperty("opacity", .3);
				maskElement.offsetWidth;
			}
			return maskElement;
		} catch (error) {
			// ignored
		}
	}

	function createProgressBarElement(maskElement) {
		try {
			let progressBarElement = maskElement.shadowRoot.querySelector("." + PROGRESSBAR_CLASSNAME);
			if (!progressBarElement) {
				let progressBarContent = document.createElement("div");
				progressBarContent.classList.add(PROGRESSBAR_CLASSNAME);
				maskElement.shadowRoot.appendChild(progressBarContent);
				const progressBarContentElement = document.createElement("div");
				progressBarContentElement.classList.add(PROGRESSBAR_CONTENT_CLASSNAME);
				progressBarContent.appendChild(progressBarContentElement);
			}
		} catch (error) {
			// ignored
		}
	}

	function createLogsWindowElement() {
		try {
			logsWindowElement = document.querySelector(LOGS_WINDOW_TAGNAME);
			if (!logsWindowElement) {
				logsWindowElement = createElement$1(LOGS_WINDOW_TAGNAME);
				const shadowRoot = logsWindowElement.attachShadow({ mode: "open" });
				const styleElement = document.createElement("style");
				styleElement.textContent = `
				@keyframes single-file-pulse { 
					0% { 
						opacity: .25;
					} 
					100% { 
						opacity: 1;
					} 
				}
				.${LOGS_CLASSNAME} {
					position: fixed;
					bottom: 24px;
					left: 8px;
					z-index: 2147483647;
					opacity: 0.9;
					padding: 4px;
					background-color: white;
					min-width: ${LOG_PANEL_WIDTH}px;
					min-height: 16px;
					transition: height 100ms;
				}
				.${LOGS_LINE_CLASSNAME} {
					display: flex;
					justify-content: space-between;
					padding: 2px;
					font-family: arial, sans-serif;
					color: black;
					background-color: white;
				}
				.${LOGS_LINE_TEXT_ELEMENT_CLASSNAME} {
					font-size: 13px;
					opacity: 1;
					transition: opacity 200ms;
				}
				.${LOGS_LINE_STATUS_ELEMENT_CLASSNAME} {
					font-size: 11px;
					min-width: 15px;
					text-align: center;
					position: relative;
					top: 1px;
				}
			`;
				shadowRoot.appendChild(styleElement);
				const logsContentElement = document.createElement("div");
				logsContentElement.classList.add(LOGS_CLASSNAME);
				shadowRoot.appendChild(logsContentElement);
			}
		} catch (error) {
			// ignored
		}
	}

	function updateLog(id, textContent, textStatus, options) {
		try {
			if (options.logsEnabled) {
				const logsContentElement = logsWindowElement.shadowRoot.querySelector("." + LOGS_CLASSNAME);
				let lineElement = logsContentElement.querySelector("[data-id='" + id + "']");
				if (!lineElement) {
					lineElement = document.createElement("div");
					lineElement.classList.add(LOGS_LINE_CLASSNAME);
					logsContentElement.appendChild(lineElement);
					lineElement.setAttribute("data-id", id);
					const textElement = document.createElement("div");
					textElement.classList.add(LOGS_LINE_TEXT_ELEMENT_CLASSNAME);
					lineElement.appendChild(textElement);
					textElement.textContent = textContent;
					const statusElement = document.createElement("div");
					statusElement.classList.add(LOGS_LINE_STATUS_ELEMENT_CLASSNAME);
					lineElement.appendChild(statusElement);
				}
				updateLogLine(lineElement, textContent, textStatus);
			}
		} catch (error) {
			// ignored
		}
	}

	function updateLogLine(lineElement, textContent, textStatus) {
		const textElement = lineElement.childNodes[0];
		const statusElement = lineElement.childNodes[1];
		textElement.textContent = textContent;
		statusElement.style.setProperty("color", textStatus == "✓" ? "#055000" : "black");
		if (textStatus == "✓") {
			textElement.style.setProperty("opacity", ".5");
			statusElement.style.setProperty("opacity", ".5");
			statusElement.style.setProperty("animation", "none");
		} else {
			statusElement.style.setProperty("animation", "1s ease-in-out 0s infinite alternate none running single-file-pulse");
		}
		statusElement.textContent = textStatus;
	}

	function updateProgressBar(index, maxIndex) {
		try {
			const maskElement = document.querySelector(MASK_TAGNAME);
			if (maskElement) {
				const progressBarElement = maskElement.shadowRoot.querySelector("." + PROGRESSBAR_CLASSNAME);
				if (progressBarElement && maxIndex) {
					const width = Math.floor((index / maxIndex) * 100) + "%";
					if (progressBarElement.style.getPropertyValue("width") != width) {
						progressBarElement.style.setProperty("width", width);
						progressBarElement.offsetWidth;
					}
				}
			}
		} catch (error) {
			// ignored
		}
	}

	function clearLogs() {
		createLogsWindowElement();
	}

	function getMatchedParents(target, property) {
		let element = target, matchedParent, parents = [];
		do {
			const boundingRect = element.getBoundingClientRect();
			if (element.parentElement) {
				const parentBoundingRect = element.parentElement.getBoundingClientRect();
				matchedParent = Math.abs(parentBoundingRect[property] - boundingRect[property]) <= SELECT_PX_THRESHOLD;
				if (matchedParent) {
					if (element.parentElement.clientWidth > SELECT_PX_THRESHOLD && element.parentElement.clientHeight > SELECT_PX_THRESHOLD &&
						((element.parentElement.clientWidth - element.clientWidth > SELECT_PX_THRESHOLD) || (element.parentElement.clientHeight - element.clientHeight > SELECT_PX_THRESHOLD))) {
						parents.push(element.parentElement);
					}
					element = element.parentElement;
				}
			} else {
				matchedParent = false;
			}
		} while (matchedParent && element);
		return parents;
	}

	function determineTargetElement(roundingMethod, target, widthDistance, parents) {
		if (Math[roundingMethod](widthDistance / SELECT_PX_THRESHOLD) <= parents.length) {
			target = parents[parents.length - Math[roundingMethod](widthDistance / SELECT_PX_THRESHOLD) - 1];
		}
		return target;
	}

	function createElement$1(tagName, parentElement) {
		const element = document.createElement(tagName);
		element.className = SINGLE_FILE_UI_ELEMENT_CLASS$1;
		if (parentElement) {
			parentElement.appendChild(element);
		}
		CSS_PROPERTIES$1.forEach(property => element.style.setProperty(property, "initial", "important"));
		return element;
	}

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

	/* global document, globalThis, getComputedStyle */

	const singlefile$1 = globalThis.singlefile;

	const CLOSE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABhmlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mSlUqHewg4hChOogFURFHqWIRLJS2QqsOJpf+CE0akhQXR8G14ODPYtXBxVlXB1dBEPwBcXNzUnSREr9LCi1ivOO4h/e+9+XuO0Col5lqdowDqmYZqXhMzOZWxMAruhGiOYohiZl6Ir2Qgef4uoeP73dRnuVd9+foVfImA3wi8SzTDYt4nXh609I57xOHWUlSiM+Jxwy6IPEj12WX3zgXHRZ4ZtjIpOaIw8RisY3lNmYlQyWeIo4oqkb5QtZlhfMWZ7VcZc178hcG89pymuu0BhHHIhJIQoSMKjZQhoUo7RopJlJ0HvPwDzj+JLlkcm2AkWMeFaiQHD/4H/zurVmYnHCTgjGg88W2P4aBwC7QqNn297FtN04A/zNwpbX8lTow80l6raVFjoDQNnBx3dLkPeByB+h/0iVDciQ/LaFQAN7P6JtyQN8t0LPq9q15jtMHIEO9WroBDg6BkSJlr3m8u6u9b//WNPv3A6mTcr3f/E/sAAAABmJLR0QAigCKAIrj2uckAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5QkPDysvCdPVuwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAELSURBVHja7ZpLFsIwDAPj3v/OsGHDe1BIa8tKO7Mnlkw+dpoxAAAAAGCfx4ur6Yx/B337UUS4mp/VuWUEcjSfOgO+BXCZCWe0hSqQo/npBLglIUNLdAV2MH84Ad1JyIwdLkK6YoabIHWscBWmihHuAqvHtv+XqmdXOK9TxdKy3axUm2vZkXXGgPJksTuz1bVFeeU2Y6ijsLIpXbtKa1kDs2ews69o7+A+ihJ2lvI+/lcS1G21zUVG18XKNm4OS4BNkGOQQohSmGaIdpgLESvzyiRwKepsXjE2H0ZWMF8Zi4+jK5mviM0DiRXNZ2rhkdTK5jO0xermz2o8dCnq+FS2XNNVH0sDAAAA3JYnre9cH8BZmhEAAAAASUVORK5CYII=";

	const SINGLE_FILE_UI_ELEMENT_CLASS = singlefile$1.helper.SINGLE_FILE_UI_ELEMENT_CLASS;
	const ERROR_BAR_TAGNAME = "singlefile-error-bar";

	const CSS_PROPERTIES = new Set(Array.from(getComputedStyle(document.documentElement)));

	let errorBarElement;

	function onError(message, link) {
		try {
			console.error("SingleFile", message, link); // eslint-disable-line no-console
			errorBarElement = document.querySelector(ERROR_BAR_TAGNAME);
			if (!errorBarElement) {
				errorBarElement = createElement(ERROR_BAR_TAGNAME);
				const shadowRoot = errorBarElement.attachShadow({ mode: "open" });
				const styleElement = document.createElement("style");
				styleElement.textContent = `
				.container {
					background-color: #ff6c00;
					color: white;
					display: flex;
					position: fixed;
					top: 0px;
					left: 0px;
					right: 0px;
					height: auto;
					width: auto;
					min-height: 24px;
					min-width: 24px;					
					z-index: 2147483647;
					margin: 0;
					padding: 2px;
					font-family: Arial;
				}
				.text {
					flex: 1;
					padding-top: 4px;
					padding-bottom: 4px;
					padding-left: 8px;					
				}
				.close-button {
					opacity: .7;
					padding-top: 4px;
					padding-left: 8px;
					padding-right: 8px;
					cursor: pointer;
					transition: opacity 250ms;
					height: 16px;
				}
				a {
					color: #303036;
				}
				.close-button:hover {
					opacity: 1;
				}
			`;
				shadowRoot.appendChild(styleElement);
				const containerElement = document.createElement("div");
				containerElement.className = "container";
				const errorTextElement = document.createElement("span");
				errorTextElement.classList.add("text");
				const content = message.split("__DOC_LINK__");
				errorTextElement.textContent = "SingleFile error: " + content[0];
				if (link && content.length == 2) {
					const linkElement = document.createElement("a");
					linkElement.textContent = link;
					linkElement.href = link;
					linkElement.target = "_blank";
					errorTextElement.appendChild(linkElement);
					errorTextElement.appendChild(document.createTextNode(content[1]));
				}
				containerElement.appendChild(errorTextElement);
				const closeElement = document.createElement("img");
				closeElement.classList.add("close-button");
				containerElement.appendChild(closeElement);
				shadowRoot.appendChild(containerElement);
				closeElement.src = CLOSE_ICON;
				closeElement.onclick = event => {
					if (event.button === 0) {
						errorBarElement.remove();
					}
				};
				document.body.appendChild(errorBarElement);
			}
		} catch (error) {
			// iignored
		}
	}

	function createElement(tagName, parentElement) {
		const element = document.createElement(tagName);
		element.className = SINGLE_FILE_UI_ELEMENT_CLASS;
		if (parentElement) {
			parentElement.appendChild(element);
		}
		CSS_PROPERTIES.forEach(property => element.style.setProperty(property, "initial", "important"));
		return element;
	}

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

	const singlefile = globalThis.singlefile;
	const bootstrap = globalThis.singlefileBootstrap;

	const MOZ_EXTENSION_PROTOCOL = "moz-extension:";

	let processor, processing;

	singlefile.init({ fetch: fetchResource, frameFetch });
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
					onEndPage();
					browser.runtime.sendMessage({ method: "ui.processCancelled" });
				}
				if (message.options.loadDeferredImages) {
					singlefile.processors.lazy.resetZoomLevel(message.options);
				}
				return {};
			}
			if (message.method == "content.getSelectedLinks") {
				return {
					urls: getSelectedLinks()
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
			selectionFound = await markSelection(options.optionallySelected);
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
							pageData.filename = promptMessage("Save as", pageData.filename) || pageData.filename;
						}
						await downloadPage(pageData, options);
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
		onStartPage(options);
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
				onLoadingFrames(options);
				frameTreePromise.then(() => {
					if (!processor.cancelled) {
						onLoadFrames(options);
					}
				});
				preInitializationPromises.push(frameTreePromise);
			}
			if (options.loadDeferredImages) {
				const lazyLoadPromise = singlefile.processors.lazy.process(options);
				onLoadingDeferResources(options);
				lazyLoadPromise.then(() => {
					if (!processor.cancelled) {
						onLoadDeferResources(options);
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
					onLoadResource(index, maxIndex, options);
				} else if (!event.detail.frame) {
					if (event.type == event.PAGE_LOADING) ; else if (event.type == event.PAGE_LOADED) ; else if (event.type == event.STAGE_STARTED) {
						if (event.detail.step < 3) {
							onStartStage(event.detail.step, options);
						}
					} else if (event.type == event.STAGE_ENDED) {
						if (event.detail.step < 3) {
							onEndStage(event.detail.step, options);
						}
					} else if (event.type == event.STAGE_TASK_STARTED) {
						onStartStageTask(event.detail.step, event.detail.task);
					} else if (event.type == event.STAGE_TASK_ENDED) {
						onEndStageTask(event.detail.step, event.detail.task);
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
				options.infobarContent = promptMessage("Infobar content", options.infobarContent) || "";
			}
			page = await processor.getPageData();
			if (options.selected || options.optionallySelected) {
				unmarkSelection();
			}
			onEndPage();
			if (options.displayStats) {
				console.log("SingleFile stats"); // eslint-disable-line no-console
				console.table(page.stats); // eslint-disable-line no-console
			}
		}
		return page;
	}

})();
