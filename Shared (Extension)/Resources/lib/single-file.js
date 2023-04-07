(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.singlefile = {}));
})(this, (function (exports) { 'use strict';

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	/* global globalThis, window */

	const LOAD_DEFERRED_IMAGES_START_EVENT = "single-file-load-deferred-images-start";
	const LOAD_DEFERRED_IMAGES_END_EVENT = "single-file-load-deferred-images-end";
	const LOAD_DEFERRED_IMAGES_KEEP_ZOOM_LEVEL_START_EVENT = "single-file-load-deferred-images-keep-zoom-level-start";
	const LOAD_DEFERRED_IMAGES_KEEP_ZOOM_LEVEL_END_EVENT = "single-file-load-deferred-images-keep-zoom-level-end";
	const LOAD_DEFERRED_IMAGES_RESET_ZOOM_LEVEL_EVENT = "single-file-load-deferred-images-keep-zoom-level-reset";
	const LOAD_DEFERRED_IMAGES_RESET_EVENT = "single-file-load-deferred-images-reset";
	const BLOCK_COOKIES_START_EVENT = "single-file-block-cookies-start";
	const BLOCK_COOKIES_END_EVENT = "single-file-block-cookies-end";
	const DISPATCH_SCROLL_START_EVENT = "single-file-dispatch-scroll-event-start";
	const DISPATCH_SCROLL_END_EVENT = "single-file-dispatch-scroll-event-end";
	const BLOCK_STORAGE_START_EVENT = "single-file-block-storage-start";
	const BLOCK_STORAGE_END_EVENT = "single-file-block-storage-end";
	const LOAD_IMAGE_EVENT = "single-file-load-image";
	const IMAGE_LOADED_EVENT = "single-file-image-loaded";
	const NEW_FONT_FACE_EVENT = "single-file-new-font-face";
	const DELETE_FONT_EVENT = "single-file-delete-font";
	const CLEAR_FONTS_EVENT = "single-file-clear-fonts";

	const addEventListener$3 = (type, listener, options) => globalThis.addEventListener(type, listener, options);
	const dispatchEvent$1 = event => { try { globalThis.dispatchEvent(event); } catch (error) {  /* ignored */ } };
	const CustomEvent$1 = globalThis.CustomEvent;
	const document$2 = globalThis.document;
	const Document = globalThis.Document;
	const JSON$5 = globalThis.JSON;

	let fontFaces;
	if (window._singleFile_fontFaces) {
		fontFaces = window._singleFile_fontFaces;
	} else {
		fontFaces = window._singleFile_fontFaces = new Map();
	}

	if (document$2 instanceof Document) {
		addEventListener$3(NEW_FONT_FACE_EVENT, event => {
			const detail = event.detail;
			const key = Object.assign({}, detail);
			delete key.src;
			fontFaces.set(JSON$5.stringify(key), detail);
		});
		addEventListener$3(DELETE_FONT_EVENT, event => {
			const detail = event.detail;
			const key = Object.assign({}, detail);
			delete key.src;
			fontFaces.delete(JSON$5.stringify(key));
		});
		addEventListener$3(CLEAR_FONTS_EVENT, () => fontFaces = new Map());
	}

	function getFontsData$1() {
		return Array.from(fontFaces.values());
	}

	function loadDeferredImagesStart(options) {
		if (options.loadDeferredImagesBlockCookies) {
			dispatchEvent$1(new CustomEvent$1(BLOCK_COOKIES_START_EVENT));
		}
		if (options.loadDeferredImagesBlockStorage) {
			dispatchEvent$1(new CustomEvent$1(BLOCK_STORAGE_START_EVENT));
		}
		if (options.loadDeferredImagesDispatchScrollEvent) {
			dispatchEvent$1(new CustomEvent$1(DISPATCH_SCROLL_START_EVENT));
		}
		if (options.loadDeferredImagesKeepZoomLevel) {
			dispatchEvent$1(new CustomEvent$1(LOAD_DEFERRED_IMAGES_KEEP_ZOOM_LEVEL_START_EVENT));
		} else {
			dispatchEvent$1(new CustomEvent$1(LOAD_DEFERRED_IMAGES_START_EVENT));
		}
	}

	function loadDeferredImagesEnd(options) {
		if (options.loadDeferredImagesBlockCookies) {
			dispatchEvent$1(new CustomEvent$1(BLOCK_COOKIES_END_EVENT));
		}
		if (options.loadDeferredImagesBlockStorage) {
			dispatchEvent$1(new CustomEvent$1(BLOCK_STORAGE_END_EVENT));
		}
		if (options.loadDeferredImagesDispatchScrollEvent) {
			dispatchEvent$1(new CustomEvent$1(DISPATCH_SCROLL_END_EVENT));
		}
		if (options.loadDeferredImagesKeepZoomLevel) {
			dispatchEvent$1(new CustomEvent$1(LOAD_DEFERRED_IMAGES_KEEP_ZOOM_LEVEL_END_EVENT));
		} else {
			dispatchEvent$1(new CustomEvent$1(LOAD_DEFERRED_IMAGES_END_EVENT));
		}
	}

	function loadDeferredImagesResetZoomLevel(options) {
		if (options.loadDeferredImagesKeepZoomLevel) {
			dispatchEvent$1(new CustomEvent$1(LOAD_DEFERRED_IMAGES_RESET_ZOOM_LEVEL_EVENT));
		} else {
			dispatchEvent$1(new CustomEvent$1(LOAD_DEFERRED_IMAGES_RESET_EVENT));
		}
	}

	var contentHooksFrames = /*#__PURE__*/Object.freeze({
		__proto__: null,
		getFontsData: getFontsData$1,
		loadDeferredImagesStart: loadDeferredImagesStart,
		loadDeferredImagesEnd: loadDeferredImagesEnd,
		loadDeferredImagesResetZoomLevel: loadDeferredImagesResetZoomLevel,
		LOAD_IMAGE_EVENT: LOAD_IMAGE_EVENT,
		IMAGE_LOADED_EVENT: IMAGE_LOADED_EVENT
	});

	/*
	 * The MIT License (MIT)
	 *
	 * Author: Gildas Lormeau
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:

	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.

	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	// derived from https://github.com/postcss/postcss-selector-parser/blob/master/src/util/unesc.js

	/*
	 * The MIT License (MIT)
	 * Copyright (c) Ben Briggs <beneb.info@gmail.com> (http://beneb.info)
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */

	const whitespace = "[\\x20\\t\\r\\n\\f]";
	const unescapeRegExp = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig");

	function process$9(str) {
		return str.replace(unescapeRegExp, (_, escaped, escapedWhitespace) => {
			const high = "0x" + escaped - 0x10000;

			// NaN means non-codepoint
			// Workaround erroneous numeric interpretation of +"0x"
			// eslint-disable-next-line no-self-compare
			return high !== high || escapedWhitespace
				? escaped
				: high < 0
					? // BMP codepoint
					String.fromCharCode(high + 0x10000)
					: // Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode((high >> 10) | 0xd800, (high & 0x3ff) | 0xdc00);
		});
	}

	var cssUnescape = /*#__PURE__*/Object.freeze({
		__proto__: null,
		process: process$9
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	const ON_BEFORE_CAPTURE_EVENT_NAME = "single-file-on-before-capture";
	const ON_AFTER_CAPTURE_EVENT_NAME = "single-file-on-after-capture";
	const REMOVED_CONTENT_ATTRIBUTE_NAME = "data-single-file-removed-content";
	const HIDDEN_CONTENT_ATTRIBUTE_NAME = "data-single-file-hidden-content";
	const KEPT_CONTENT_ATTRIBUTE_NAME = "data-single-file-kept-content";
	const HIDDEN_FRAME_ATTRIBUTE_NAME = "data-single-file-hidden-frame";
	const PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME = "data-single-file-preserved-space-element";
	const SHADOW_ROOT_ATTRIBUTE_NAME = "data-single-file-shadow-root-element";
	const WIN_ID_ATTRIBUTE_NAME = "data-single-file-win-id";
	const IMAGE_ATTRIBUTE_NAME = "data-single-file-image";
	const POSTER_ATTRIBUTE_NAME = "data-single-file-poster";
	const VIDEO_ATTRIBUTE_NAME = "data-single-file-video";
	const CANVAS_ATTRIBUTE_NAME = "data-single-file-canvas";
	const STYLE_ATTRIBUTE_NAME = "data-single-file-movable-style";
	const INPUT_VALUE_ATTRIBUTE_NAME = "data-single-file-input-value";
	const LAZY_SRC_ATTRIBUTE_NAME = "data-single-file-lazy-loaded-src";
	const STYLESHEET_ATTRIBUTE_NAME = "data-single-file-stylesheet";
	const DISABLED_NOSCRIPT_ATTRIBUTE_NAME = "data-single-file-disabled-noscript";
	const SELECTED_CONTENT_ATTRIBUTE_NAME = "data-single-file-selected-content";
	const INVALID_ELEMENT_ATTRIBUTE_NAME = "data-single-file-invalid-element";
	const ASYNC_SCRIPT_ATTRIBUTE_NAME = "data-single-file-async-script";
	const FLOW_ELEMENTS_SELECTOR = "*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)";
	const KEPT_TAG_NAMES = ["NOSCRIPT", "DISABLED-NOSCRIPT", "META", "LINK", "STYLE", "TITLE", "TEMPLATE", "SOURCE", "OBJECT", "SCRIPT", "HEAD", "BODY"];
	const REGEXP_SIMPLE_QUOTES_STRING$2 = /^'(.*?)'$/;
	const REGEXP_DOUBLE_QUOTES_STRING$2 = /^"(.*?)"$/;
	const FONT_WEIGHTS = {
		regular: "400",
		normal: "400",
		bold: "700",
		bolder: "700",
		lighter: "100"
	};
	const COMMENT_HEADER = "Page saved with SingleFile";
	const COMMENT_HEADER_LEGACY = "Archive processed by SingleFile";
	const SINGLE_FILE_UI_ELEMENT_CLASS = "single-file-ui-element";
	const EMPTY_RESOURCE$1 = "data:,";
	const addEventListener$2 = (type, listener, options) => globalThis.addEventListener(type, listener, options);
	const dispatchEvent = event => { try { globalThis.dispatchEvent(event); } catch (error) {  /* ignored */ } };
	const JSON$4 = globalThis.JSON;

	function initUserScriptHandler() {
		addEventListener$2("single-file-user-script-init", () => globalThis._singleFile_waitForUserScript = async eventPrefixName => {
			const event = new CustomEvent(eventPrefixName + "-request", { cancelable: true });
			const promiseResponse = new Promise(resolve => addEventListener$2(eventPrefixName + "-response", resolve));
			dispatchEvent(event);
			if (event.defaultPrevented) {
				await promiseResponse;
			}
		});
	}

	function initDoc(doc) {
		doc.querySelectorAll("meta[http-equiv=refresh]").forEach(element => {
			element.removeAttribute("http-equiv");
			element.setAttribute("disabled-http-equiv", "refresh");
		});
	}

	function preProcessDoc(doc, win, options) {
		doc.querySelectorAll("noscript:not([" + DISABLED_NOSCRIPT_ATTRIBUTE_NAME + "])").forEach(element => {
			element.setAttribute(DISABLED_NOSCRIPT_ATTRIBUTE_NAME, element.textContent);
			element.textContent = "";
		});
		initDoc(doc);
		if (doc.head) {
			doc.head.querySelectorAll(FLOW_ELEMENTS_SELECTOR).forEach(element => element.hidden = true);
		}
		doc.querySelectorAll("svg foreignObject").forEach(element => {
			const flowElements = element.querySelectorAll("html > head > " + FLOW_ELEMENTS_SELECTOR + ", html > body > " + FLOW_ELEMENTS_SELECTOR);
			if (flowElements.length) {
				Array.from(element.childNodes).forEach(node => node.remove());
				flowElements.forEach(flowElement => element.appendChild(flowElement));
			}
		});
		const invalidElements = new Map();
		let elementsInfo;
		if (win && doc.documentElement) {
			doc.querySelectorAll("button button, a a").forEach(element => {
				const placeHolderElement = doc.createElement("template");
				placeHolderElement.setAttribute(INVALID_ELEMENT_ATTRIBUTE_NAME, "");
				placeHolderElement.content.appendChild(element.cloneNode(true));
				invalidElements.set(element, placeHolderElement);
				element.replaceWith(placeHolderElement);
			});
			elementsInfo = getElementsInfo(win, doc, doc.documentElement, options);
			if (options.moveStylesInHead) {
				doc.querySelectorAll("body style, body ~ style").forEach(element => {
					const computedStyle = getComputedStyle(win, element);
					if (computedStyle && testHiddenElement(element, computedStyle)) {
						element.setAttribute(STYLE_ATTRIBUTE_NAME, "");
						elementsInfo.markedElements.push(element);
					}
				});
			}
		} else {
			elementsInfo = {
				canvases: [],
				images: [],
				posters: [],
				videos: [],
				usedFonts: [],
				shadowRoots: [],
				markedElements: []
			};
		}
		return {
			canvases: elementsInfo.canvases,
			fonts: getFontsData(),
			stylesheets: getStylesheetsData(doc),
			images: elementsInfo.images,
			posters: elementsInfo.posters,
			videos: elementsInfo.videos,
			usedFonts: Array.from(elementsInfo.usedFonts.values()),
			shadowRoots: elementsInfo.shadowRoots,
			referrer: doc.referrer,
			markedElements: elementsInfo.markedElements,
			invalidElements
		};
	}

	function getElementsInfo(win, doc, element, options, data = { usedFonts: new Map(), canvases: [], images: [], posters: [], videos: [], shadowRoots: [], markedElements: [] }, ascendantHidden) {
		const elements = Array.from(element.childNodes).filter(node => (node instanceof win.HTMLElement) || (node instanceof win.SVGElement));
		elements.forEach(element => {
			let elementHidden, elementKept, computedStyle;
			if (!options.autoSaveExternalSave && (options.removeHiddenElements || options.removeUnusedFonts || options.compressHTML)) {
				computedStyle = getComputedStyle(win, element);
				if (element instanceof win.HTMLElement) {
					if (options.removeHiddenElements) {
						elementKept = ((ascendantHidden || element.closest("html > head")) && KEPT_TAG_NAMES.includes(element.tagName)) || element.closest("details");
						if (!elementKept) {
							elementHidden = ascendantHidden || testHiddenElement(element, computedStyle);
							if (elementHidden) {
								element.setAttribute(HIDDEN_CONTENT_ATTRIBUTE_NAME, "");
								data.markedElements.push(element);
							}
						}
					}
				}
				if (!elementHidden) {
					if (options.compressHTML && computedStyle) {
						const whiteSpace = computedStyle.getPropertyValue("white-space");
						if (whiteSpace && whiteSpace.startsWith("pre")) {
							element.setAttribute(PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME, "");
							data.markedElements.push(element);
						}
					}
					if (options.removeUnusedFonts) {
						getUsedFont(computedStyle, options, data.usedFonts);
						getUsedFont(getComputedStyle(win, element, ":first-letter"), options, data.usedFonts);
						getUsedFont(getComputedStyle(win, element, ":before"), options, data.usedFonts);
						getUsedFont(getComputedStyle(win, element, ":after"), options, data.usedFonts);
					}
				}
			}
			getResourcesInfo(win, doc, element, options, data, elementHidden, computedStyle);
			const shadowRoot = !(element instanceof win.SVGElement) && getShadowRoot(element);
			if (shadowRoot && !element.classList.contains(SINGLE_FILE_UI_ELEMENT_CLASS)) {
				const shadowRootInfo = {};
				element.setAttribute(SHADOW_ROOT_ATTRIBUTE_NAME, data.shadowRoots.length);
				data.markedElements.push(element);
				data.shadowRoots.push(shadowRootInfo);
				getElementsInfo(win, doc, shadowRoot, options, data, elementHidden);
				shadowRootInfo.content = shadowRoot.innerHTML;
				shadowRootInfo.mode = shadowRoot.mode;
				try {
					if (shadowRoot.adoptedStyleSheets && shadowRoot.adoptedStyleSheets.length) {
						shadowRootInfo.adoptedStyleSheets = Array.from(shadowRoot.adoptedStyleSheets).map(stylesheet => Array.from(stylesheet.cssRules).map(cssRule => cssRule.cssText).join("\n"));
					}
				} catch (error) {
					// ignored
				}
			}
			getElementsInfo(win, doc, element, options, data, elementHidden);
			if (!options.autoSaveExternalSave && options.removeHiddenElements && ascendantHidden) {
				if (elementKept || element.getAttribute(KEPT_CONTENT_ATTRIBUTE_NAME) == "") {
					if (element.parentElement) {
						element.parentElement.setAttribute(KEPT_CONTENT_ATTRIBUTE_NAME, "");
						data.markedElements.push(element.parentElement);
					}
				} else if (elementHidden) {
					element.setAttribute(REMOVED_CONTENT_ATTRIBUTE_NAME, "");
					data.markedElements.push(element);
				}
			}
		});
		return data;
	}

	function getResourcesInfo(win, doc, element, options, data, elementHidden, computedStyle) {
		if (element.tagName == "CANVAS") {
			try {
				data.canvases.push({ dataURI: element.toDataURL("image/png", "") });
				element.setAttribute(CANVAS_ATTRIBUTE_NAME, data.canvases.length - 1);
				data.markedElements.push(element);
			} catch (error) {
				// ignored
			}
		}
		if (element.tagName == "IMG") {
			const imageData = {
				currentSrc: elementHidden ?
					EMPTY_RESOURCE$1 :
					(options.loadDeferredImages && element.getAttribute(LAZY_SRC_ATTRIBUTE_NAME)) || element.currentSrc
			};
			data.images.push(imageData);
			element.setAttribute(IMAGE_ATTRIBUTE_NAME, data.images.length - 1);
			data.markedElements.push(element);
			element.removeAttribute(LAZY_SRC_ATTRIBUTE_NAME);
			computedStyle = computedStyle || getComputedStyle(win, element);
			if (computedStyle) {
				imageData.size = getSize(win, element, computedStyle);
				const boxShadow = computedStyle.getPropertyValue("box-shadow");
				const backgroundImage = computedStyle.getPropertyValue("background-image");
				if ((!boxShadow || boxShadow == "none") &&
					(!backgroundImage || backgroundImage == "none") &&
					(imageData.size.pxWidth > 1 || imageData.size.pxHeight > 1)) {
					imageData.replaceable = true;
					imageData.backgroundColor = computedStyle.getPropertyValue("background-color");
					imageData.objectFit = computedStyle.getPropertyValue("object-fit");
					imageData.boxSizing = computedStyle.getPropertyValue("box-sizing");
					imageData.objectPosition = computedStyle.getPropertyValue("object-position");
				}
			}
		}
		if (element.tagName == "VIDEO") {
			const src = element.currentSrc;
			if (src && !src.startsWith("blob:") && !src.startsWith("data:")) {
				const computedStyle = getComputedStyle(win, element.parentNode);
				data.videos.push({
					positionParent: computedStyle && computedStyle.getPropertyValue("position"),
					src,
					size: {
						pxWidth: element.clientWidth,
						pxHeight: element.clientHeight
					},
					currentTime: element.currentTime
				});
				element.setAttribute(VIDEO_ATTRIBUTE_NAME, data.videos.length - 1);
			}
			if (!element.getAttribute("poster")) {
				const canvasElement = doc.createElement("canvas");
				const context = canvasElement.getContext("2d");
				canvasElement.width = element.clientWidth;
				canvasElement.height = element.clientHeight;
				try {
					context.drawImage(element, 0, 0, canvasElement.width, canvasElement.height);
					data.posters.push(canvasElement.toDataURL("image/png", ""));
					element.setAttribute(POSTER_ATTRIBUTE_NAME, data.posters.length - 1);
					data.markedElements.push(element);
				} catch (error) {
					// ignored
				}
			}
		}
		if (element.tagName == "IFRAME") {
			if (elementHidden && options.removeHiddenElements) {
				element.setAttribute(HIDDEN_FRAME_ATTRIBUTE_NAME, "");
				data.markedElements.push(element);
			}
		}
		if (element.tagName == "INPUT") {
			if (element.type != "password") {
				element.setAttribute(INPUT_VALUE_ATTRIBUTE_NAME, element.value);
				data.markedElements.push(element);
			}
			if (element.type == "radio" || element.type == "checkbox") {
				element.setAttribute(INPUT_VALUE_ATTRIBUTE_NAME, element.checked);
				data.markedElements.push(element);
			}
		}
		if (element.tagName == "TEXTAREA") {
			element.setAttribute(INPUT_VALUE_ATTRIBUTE_NAME, element.value);
			data.markedElements.push(element);
		}
		if (element.tagName == "SELECT") {
			element.querySelectorAll("option").forEach(option => {
				if (option.selected) {
					option.setAttribute(INPUT_VALUE_ATTRIBUTE_NAME, "");
					data.markedElements.push(option);
				}
			});
		}
		if (element.tagName == "SCRIPT") {
			if (element.async && element.getAttribute("async") != "" && element.getAttribute("async") != "async") {
				element.setAttribute(ASYNC_SCRIPT_ATTRIBUTE_NAME, "");
				data.markedElements.push(element);
			}
			element.textContent = element.textContent.replace(/<\/script>/gi, "<\\/script>");
		}
	}

	function getUsedFont(computedStyle, options, usedFonts) {
		if (computedStyle) {
			const fontStyle = computedStyle.getPropertyValue("font-style") || "normal";
			computedStyle.getPropertyValue("font-family").split(",").forEach(fontFamilyName => {
				fontFamilyName = normalizeFontFamily(fontFamilyName);
				if (!options.loadedFonts || options.loadedFonts.find(font => normalizeFontFamily(font.family) == fontFamilyName && font.style == fontStyle)) {
					const fontWeight = getFontWeight(computedStyle.getPropertyValue("font-weight"));
					const fontVariant = computedStyle.getPropertyValue("font-variant") || "normal";
					const value = [fontFamilyName, fontWeight, fontStyle, fontVariant];
					usedFonts.set(JSON$4.stringify(value), [fontFamilyName, fontWeight, fontStyle, fontVariant]);
				}
			});
		}
	}

	function getShadowRoot(element) {
		const chrome = globalThis.chrome;
		if (element.openOrClosedShadowRoot) {
			return element.openOrClosedShadowRoot;
		} else if (chrome && chrome.dom && chrome.dom.openOrClosedShadowRoot) {
			try {
				return chrome.dom.openOrClosedShadowRoot(element);
			} catch (error) {
				return element.shadowRoot;
			}
		} else {
			return element.shadowRoot;
		}
	}

	function normalizeFontFamily(fontFamilyName = "") {
		return removeQuotes$1(process$9(fontFamilyName.trim())).toLowerCase();
	}

	function testHiddenElement(element, computedStyle) {
		let hidden = false;
		if (computedStyle) {
			const display = computedStyle.getPropertyValue("display");
			const opacity = computedStyle.getPropertyValue("opacity");
			const visibility = computedStyle.getPropertyValue("visibility");
			hidden = display == "none";
			if (!hidden && (opacity == "0" || visibility == "hidden") && element.getBoundingClientRect) {
				const boundingRect = element.getBoundingClientRect();
				hidden = !boundingRect.width && !boundingRect.height;
			}
		}
		return Boolean(hidden);
	}

	function postProcessDoc(doc, markedElements, invalidElements) {
		doc.querySelectorAll("[" + DISABLED_NOSCRIPT_ATTRIBUTE_NAME + "]").forEach(element => {
			element.textContent = element.getAttribute(DISABLED_NOSCRIPT_ATTRIBUTE_NAME);
			element.removeAttribute(DISABLED_NOSCRIPT_ATTRIBUTE_NAME);
		});
		doc.querySelectorAll("meta[disabled-http-equiv]").forEach(element => {
			element.setAttribute("http-equiv", element.getAttribute("disabled-http-equiv"));
			element.removeAttribute("disabled-http-equiv");
		});
		if (doc.head) {
			doc.head.querySelectorAll("*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)").forEach(element => element.removeAttribute("hidden"));
		}
		if (!markedElements) {
			const singleFileAttributes = [REMOVED_CONTENT_ATTRIBUTE_NAME, HIDDEN_FRAME_ATTRIBUTE_NAME, HIDDEN_CONTENT_ATTRIBUTE_NAME, PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME, IMAGE_ATTRIBUTE_NAME, POSTER_ATTRIBUTE_NAME, VIDEO_ATTRIBUTE_NAME, CANVAS_ATTRIBUTE_NAME, INPUT_VALUE_ATTRIBUTE_NAME, SHADOW_ROOT_ATTRIBUTE_NAME, STYLESHEET_ATTRIBUTE_NAME, ASYNC_SCRIPT_ATTRIBUTE_NAME];
			markedElements = doc.querySelectorAll(singleFileAttributes.map(name => "[" + name + "]").join(","));
		}
		markedElements.forEach(element => {
			element.removeAttribute(REMOVED_CONTENT_ATTRIBUTE_NAME);
			element.removeAttribute(HIDDEN_CONTENT_ATTRIBUTE_NAME);
			element.removeAttribute(KEPT_CONTENT_ATTRIBUTE_NAME);
			element.removeAttribute(HIDDEN_FRAME_ATTRIBUTE_NAME);
			element.removeAttribute(PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME);
			element.removeAttribute(IMAGE_ATTRIBUTE_NAME);
			element.removeAttribute(POSTER_ATTRIBUTE_NAME);
			element.removeAttribute(VIDEO_ATTRIBUTE_NAME);
			element.removeAttribute(CANVAS_ATTRIBUTE_NAME);
			element.removeAttribute(INPUT_VALUE_ATTRIBUTE_NAME);
			element.removeAttribute(SHADOW_ROOT_ATTRIBUTE_NAME);
			element.removeAttribute(STYLESHEET_ATTRIBUTE_NAME);
			element.removeAttribute(ASYNC_SCRIPT_ATTRIBUTE_NAME);
			element.removeAttribute(STYLE_ATTRIBUTE_NAME);
		});
		if (invalidElements) {
			Array.from(invalidElements.entries()).forEach(([element, placeholderElement]) => placeholderElement.replaceWith(element));
		}
	}

	function getStylesheetsData(doc) {
		if (doc) {
			const contents = [];
			doc.querySelectorAll("style").forEach((styleElement, styleIndex) => {
				try {
					const tempStyleElement = doc.createElement("style");
					tempStyleElement.textContent = styleElement.textContent;
					doc.body.appendChild(tempStyleElement);
					const stylesheet = tempStyleElement.sheet;
					tempStyleElement.remove();
					if (!stylesheet || stylesheet.cssRules.length != styleElement.sheet.cssRules.length) {
						styleElement.setAttribute(STYLESHEET_ATTRIBUTE_NAME, styleIndex);
						contents[styleIndex] = Array.from(styleElement.sheet.cssRules).map(cssRule => cssRule.cssText).join("\n");
					}
				} catch (error) {
					// ignored
				}
			});
			return contents;
		}
	}

	function getSize(win, imageElement, computedStyle) {
		let pxWidth = imageElement.naturalWidth;
		let pxHeight = imageElement.naturalHeight;
		if (!pxWidth && !pxHeight) {
			const noStyleAttribute = imageElement.getAttribute("style") == null;
			computedStyle = computedStyle || getComputedStyle(win, imageElement);
			if (computedStyle) {
				let removeBorderWidth = false;
				if (computedStyle.getPropertyValue("box-sizing") == "content-box") {
					const boxSizingValue = imageElement.style.getPropertyValue("box-sizing");
					const boxSizingPriority = imageElement.style.getPropertyPriority("box-sizing");
					const clientWidth = imageElement.clientWidth;
					imageElement.style.setProperty("box-sizing", "border-box", "important");
					removeBorderWidth = imageElement.clientWidth != clientWidth;
					if (boxSizingValue) {
						imageElement.style.setProperty("box-sizing", boxSizingValue, boxSizingPriority);
					} else {
						imageElement.style.removeProperty("box-sizing");
					}
				}
				let paddingLeft, paddingRight, paddingTop, paddingBottom, borderLeft, borderRight, borderTop, borderBottom;
				paddingLeft = getWidth("padding-left", computedStyle);
				paddingRight = getWidth("padding-right", computedStyle);
				paddingTop = getWidth("padding-top", computedStyle);
				paddingBottom = getWidth("padding-bottom", computedStyle);
				if (removeBorderWidth) {
					borderLeft = getWidth("border-left-width", computedStyle);
					borderRight = getWidth("border-right-width", computedStyle);
					borderTop = getWidth("border-top-width", computedStyle);
					borderBottom = getWidth("border-bottom-width", computedStyle);
				} else {
					borderLeft = borderRight = borderTop = borderBottom = 0;
				}
				pxWidth = Math.max(0, imageElement.clientWidth - paddingLeft - paddingRight - borderLeft - borderRight);
				pxHeight = Math.max(0, imageElement.clientHeight - paddingTop - paddingBottom - borderTop - borderBottom);
				if (noStyleAttribute) {
					imageElement.removeAttribute("style");
				}
			}
		}
		return { pxWidth, pxHeight };
	}

	function getWidth(styleName, computedStyle) {
		if (computedStyle.getPropertyValue(styleName).endsWith("px")) {
			return parseFloat(computedStyle.getPropertyValue(styleName));
		}
	}

	function getFontsData() {
		return getFontsData$1();
	}

	function serialize$1(doc) {
		const docType = doc.doctype;
		let docTypeString = "";
		if (docType) {
			docTypeString = "<!DOCTYPE " + docType.nodeName;
			if (docType.publicId) {
				docTypeString += " PUBLIC \"" + docType.publicId + "\"";
				if (docType.systemId) {
					docTypeString += " \"" + docType.systemId + "\"";
				}
			} else if (docType.systemId) {
				docTypeString += " SYSTEM \"" + docType.systemId + "\"";
			} if (docType.internalSubset) {
				docTypeString += " [" + docType.internalSubset + "]";
			}
			docTypeString += "> ";
		}
		return docTypeString + doc.documentElement.outerHTML;
	}

	function removeQuotes$1(string) {
		if (string.match(REGEXP_SIMPLE_QUOTES_STRING$2)) {
			string = string.replace(REGEXP_SIMPLE_QUOTES_STRING$2, "$1");
		} else {
			string = string.replace(REGEXP_DOUBLE_QUOTES_STRING$2, "$1");
		}
		return string.trim();
	}

	function getFontWeight(weight) {
		return FONT_WEIGHTS[weight.toLowerCase().trim()] || weight;
	}

	function flatten(array) {
		return array.flat ? array.flat() : array.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
	}

	function getComputedStyle(win, element, pseudoElement) {
		try {
			return win.getComputedStyle(element, pseudoElement);
		} catch (error) {
			// ignored
		}
	}

	var singleFileHelper = /*#__PURE__*/Object.freeze({
		__proto__: null,
		initUserScriptHandler: initUserScriptHandler,
		initDoc: initDoc,
		preProcessDoc: preProcessDoc,
		postProcessDoc: postProcessDoc,
		serialize: serialize$1,
		removeQuotes: removeQuotes$1,
		flatten: flatten,
		getFontWeight: getFontWeight,
		normalizeFontFamily: normalizeFontFamily,
		getShadowRoot: getShadowRoot,
		ON_BEFORE_CAPTURE_EVENT_NAME: ON_BEFORE_CAPTURE_EVENT_NAME,
		ON_AFTER_CAPTURE_EVENT_NAME: ON_AFTER_CAPTURE_EVENT_NAME,
		WIN_ID_ATTRIBUTE_NAME: WIN_ID_ATTRIBUTE_NAME,
		PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME: PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME,
		REMOVED_CONTENT_ATTRIBUTE_NAME: REMOVED_CONTENT_ATTRIBUTE_NAME,
		HIDDEN_CONTENT_ATTRIBUTE_NAME: HIDDEN_CONTENT_ATTRIBUTE_NAME,
		HIDDEN_FRAME_ATTRIBUTE_NAME: HIDDEN_FRAME_ATTRIBUTE_NAME,
		IMAGE_ATTRIBUTE_NAME: IMAGE_ATTRIBUTE_NAME,
		POSTER_ATTRIBUTE_NAME: POSTER_ATTRIBUTE_NAME,
		VIDEO_ATTRIBUTE_NAME: VIDEO_ATTRIBUTE_NAME,
		CANVAS_ATTRIBUTE_NAME: CANVAS_ATTRIBUTE_NAME,
		INPUT_VALUE_ATTRIBUTE_NAME: INPUT_VALUE_ATTRIBUTE_NAME,
		SHADOW_ROOT_ATTRIBUTE_NAME: SHADOW_ROOT_ATTRIBUTE_NAME,
		STYLE_ATTRIBUTE_NAME: STYLE_ATTRIBUTE_NAME,
		LAZY_SRC_ATTRIBUTE_NAME: LAZY_SRC_ATTRIBUTE_NAME,
		STYLESHEET_ATTRIBUTE_NAME: STYLESHEET_ATTRIBUTE_NAME,
		SELECTED_CONTENT_ATTRIBUTE_NAME: SELECTED_CONTENT_ATTRIBUTE_NAME,
		INVALID_ELEMENT_ATTRIBUTE_NAME: INVALID_ELEMENT_ATTRIBUTE_NAME,
		ASYNC_SCRIPT_ATTRIBUTE_NAME: ASYNC_SCRIPT_ATTRIBUTE_NAME,
		COMMENT_HEADER: COMMENT_HEADER,
		COMMENT_HEADER_LEGACY: COMMENT_HEADER_LEGACY,
		SINGLE_FILE_UI_ELEMENT_CLASS: SINGLE_FILE_UI_ELEMENT_CLASS,
		EMPTY_RESOURCE: EMPTY_RESOURCE$1
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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
	const helper$4 = {
		LAZY_SRC_ATTRIBUTE_NAME,
		SINGLE_FILE_UI_ELEMENT_CLASS
	};

	const MAX_IDLE_TIMEOUT_CALLS = 10;
	const ATTRIBUTES_MUTATION_TYPE = "attributes";

	const browser$1 = globalThis.browser;
	const document$1 = globalThis.document;
	const MutationObserver = globalThis.MutationObserver;
	const addEventListener$1 = (type, listener, options) => globalThis.addEventListener(type, listener, options);
	const removeEventListener = (type, listener, options) => globalThis.removeEventListener(type, listener, options);
	const timeouts = new Map();

	let idleTimeoutCalls;

	if (browser$1 && browser$1.runtime && browser$1.runtime.onMessage && browser$1.runtime.onMessage.addListener) {
		browser$1.runtime.onMessage.addListener(message => {
			if (message.method == "singlefile.lazyTimeout.onTimeout") {
				const timeoutData = timeouts.get(message.type);
				if (timeoutData) {
					timeouts.delete(message.type);
					try {
						timeoutData.callback();
					} catch (error) {
						clearRegularTimeout(message.type);
					}
				}
			}
		});
	}

	async function process$8(options) {
		if (document$1.documentElement) {
			timeouts.clear();
			const bodyHeight = (document$1.body && document$1.body.scrollHeight) || document$1.documentElement.scrollHeight;
			const bodyWidth = (document$1.body && document$1.body.scrollWidth) || document$1.documentElement.scrollWidth;
			if (bodyHeight > globalThis.innerHeight || bodyWidth > globalThis.innerWidth) {
				const maxScrollY = Math.max(bodyHeight - (globalThis.innerHeight * 1.5), 0);
				const maxScrollX = Math.max(bodyWidth - (globalThis.innerWidth * 1.5), 0);
				if (globalThis.scrollY < maxScrollY || globalThis.scrollX < maxScrollX) {
					return triggerLazyLoading(options);
				}
			}
		}
	}

	function resetZoomLevel(options) {
		loadDeferredImagesResetZoomLevel(options);
	}

	function triggerLazyLoading(options) {
		idleTimeoutCalls = 0;
		return new Promise(async resolve => { // eslint-disable-line  no-async-promise-executor
			let loadingImages;
			const pendingImages = new Set();
			const observer = new MutationObserver(async mutations => {
				mutations = mutations.filter(mutation => mutation.type == ATTRIBUTES_MUTATION_TYPE);
				if (mutations.length) {
					const updated = mutations.filter(mutation => {
						if (mutation.attributeName == "src") {
							mutation.target.setAttribute(helper$4.LAZY_SRC_ATTRIBUTE_NAME, mutation.target.src);
							mutation.target.addEventListener("load", onResourceLoad);
						}
						if (mutation.attributeName == "src" || mutation.attributeName == "srcset" || mutation.target.tagName == "SOURCE") {
							return !mutation.target.classList || !mutation.target.classList.contains(helper$4.SINGLE_FILE_UI_ELEMENT_CLASS);
						}
					});
					if (updated.length) {
						loadingImages = true;
						await deferForceLazyLoadEnd(observer, options, cleanupAndResolve);
						if (!pendingImages.size) {
							await deferLazyLoadEnd(observer, options, cleanupAndResolve);
						}
					}
				}
			});
			await setIdleTimeout(options.loadDeferredImagesMaxIdleTime * 2);
			await deferForceLazyLoadEnd(observer, options, cleanupAndResolve);
			observer.observe(document$1, { subtree: true, childList: true, attributes: true });
			addEventListener$1(LOAD_IMAGE_EVENT, onImageLoadEvent);
			addEventListener$1(IMAGE_LOADED_EVENT, onImageLoadedEvent);
			loadDeferredImagesStart(options);

			async function setIdleTimeout(delay) {
				await setAsyncTimeout("idleTimeout", async () => {
					if (!loadingImages) {
						clearAsyncTimeout("loadTimeout");
						clearAsyncTimeout("maxTimeout");
						lazyLoadEnd(observer, options, cleanupAndResolve);
					} else if (idleTimeoutCalls < MAX_IDLE_TIMEOUT_CALLS) {
						idleTimeoutCalls++;
						clearAsyncTimeout("idleTimeout");
						await setIdleTimeout(Math.max(500, delay / 2));
					}
				}, delay, options.loadDeferredImagesNativeTimeout);
			}

			function onResourceLoad(event) {
				const element = event.target;
				element.removeAttribute(helper$4.LAZY_SRC_ATTRIBUTE_NAME);
				element.removeEventListener("load", onResourceLoad);
			}

			async function onImageLoadEvent(event) {
				loadingImages = true;
				await deferForceLazyLoadEnd(observer, options, cleanupAndResolve);
				await deferLazyLoadEnd(observer, options, cleanupAndResolve);
				if (event.detail) {
					pendingImages.add(event.detail);
				}
			}

			async function onImageLoadedEvent(event) {
				await deferForceLazyLoadEnd(observer, options, cleanupAndResolve);
				await deferLazyLoadEnd(observer, options, cleanupAndResolve);
				pendingImages.delete(event.detail);
				if (!pendingImages.size) {
					await deferLazyLoadEnd(observer, options, cleanupAndResolve);
				}
			}

			function cleanupAndResolve(value) {
				observer.disconnect();
				removeEventListener(LOAD_IMAGE_EVENT, onImageLoadEvent);
				removeEventListener(IMAGE_LOADED_EVENT, onImageLoadedEvent);
				resolve(value);
			}
		});
	}

	async function deferLazyLoadEnd(observer, options, resolve) {
		await setAsyncTimeout("loadTimeout", () => lazyLoadEnd(observer, options, resolve), options.loadDeferredImagesMaxIdleTime, options.loadDeferredImagesNativeTimeout);
	}

	async function deferForceLazyLoadEnd(observer, options, resolve) {
		await setAsyncTimeout("maxTimeout", async () => {
			await clearAsyncTimeout("loadTimeout");
			await lazyLoadEnd(observer, options, resolve);
		}, options.loadDeferredImagesMaxIdleTime * 10, options.loadDeferredImagesNativeTimeout);
	}

	async function lazyLoadEnd(observer, options, resolve) {
		await clearAsyncTimeout("idleTimeout");
		loadDeferredImagesEnd(options);
		await setAsyncTimeout("endTimeout", async () => {
			await clearAsyncTimeout("maxTimeout");
			resolve();
		}, options.loadDeferredImagesMaxIdleTime / 2, options.loadDeferredImagesNativeTimeout);
		observer.disconnect();
	}

	async function setAsyncTimeout(type, callback, delay, forceNativeTimeout) {
		if (browser$1 && browser$1.runtime && browser$1.runtime.sendMessage && !forceNativeTimeout) {
			if (!timeouts.get(type) || !timeouts.get(type).pending) {
				const timeoutData = { callback, pending: true };
				timeouts.set(type, timeoutData);
				try {
					await browser$1.runtime.sendMessage({ method: "singlefile.lazyTimeout.setTimeout", type, delay });
				} catch (error) {
					setRegularTimeout(type, callback, delay);
				}
				timeoutData.pending = false;
			}
		} else {
			setRegularTimeout(type, callback, delay);
		}
	}

	function setRegularTimeout(type, callback, delay) {
		const timeoutId = timeouts.get(type);
		if (timeoutId) {
			globalThis.clearTimeout(timeoutId);
		}
		timeouts.set(type, callback);
		globalThis.setTimeout(callback, delay);
	}

	async function clearAsyncTimeout(type) {
		if (browser$1 && browser$1.runtime && browser$1.runtime.sendMessage) {
			try {
				await browser$1.runtime.sendMessage({ method: "singlefile.lazyTimeout.clearTimeout", type });
			} catch (error) {
				clearRegularTimeout(type);
			}
		} else {
			clearRegularTimeout(type);
		}
	}

	function clearRegularTimeout(type) {
		const previousTimeoutId = timeouts.get(type);
		timeouts.delete(type);
		if (previousTimeoutId) {
			globalThis.clearTimeout(previousTimeoutId);
		}
	}

	var contentLazyLoader = /*#__PURE__*/Object.freeze({
		__proto__: null,
		process: process$8,
		resetZoomLevel: resetZoomLevel
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	const helper$3 = {
		ON_BEFORE_CAPTURE_EVENT_NAME,
		ON_AFTER_CAPTURE_EVENT_NAME,
		WIN_ID_ATTRIBUTE_NAME,
		preProcessDoc,
		serialize: serialize$1,
		postProcessDoc,
		getShadowRoot
	};

	const MESSAGE_PREFIX = "__frameTree__::";
	const FRAMES_CSS_SELECTOR = "iframe, frame, object[type=\"text/html\"][data]";
	const ALL_ELEMENTS_CSS_SELECTOR = "*";
	const INIT_REQUEST_MESSAGE = "singlefile.frameTree.initRequest";
	const ACK_INIT_REQUEST_MESSAGE = "singlefile.frameTree.ackInitRequest";
	const CLEANUP_REQUEST_MESSAGE = "singlefile.frameTree.cleanupRequest";
	const INIT_RESPONSE_MESSAGE = "singlefile.frameTree.initResponse";
	const TARGET_ORIGIN = "*";
	const TIMEOUT_INIT_REQUEST_MESSAGE = 5000;
	const TIMEOUT_INIT_RESPONSE_MESSAGE = 10000;
	const TOP_WINDOW_ID = "0";
	const WINDOW_ID_SEPARATOR = ".";
	const TOP_WINDOW = globalThis.window == globalThis.top;

	const browser = globalThis.browser;
	const addEventListener = (type, listener, options) => globalThis.addEventListener(type, listener, options);
	const top = globalThis.top;
	const MessageChannel = globalThis.MessageChannel;
	const document = globalThis.document;
	const JSON$3 = globalThis.JSON;

	let sessions = globalThis.sessions;
	if (!sessions) {
		sessions = globalThis.sessions = new Map();
	}
	let windowId;
	if (TOP_WINDOW) {
		windowId = TOP_WINDOW_ID;
		if (browser && browser.runtime && browser.runtime.onMessage && browser.runtime.onMessage.addListener) {
			browser.runtime.onMessage.addListener(message => {
				if (message.method == INIT_RESPONSE_MESSAGE) {
					initResponse(message);
					return Promise.resolve({});
				} else if (message.method == ACK_INIT_REQUEST_MESSAGE) {
					clearFrameTimeout("requestTimeouts", message.sessionId, message.windowId);
					createFrameResponseTimeout(message.sessionId, message.windowId);
					return Promise.resolve({});
				}
			});
		}
	}
	addEventListener("message", async event => {
		if (typeof event.data == "string" && event.data.startsWith(MESSAGE_PREFIX)) {
			event.preventDefault();
			event.stopPropagation();
			const message = JSON$3.parse(event.data.substring(MESSAGE_PREFIX.length));
			if (message.method == INIT_REQUEST_MESSAGE) {
				if (event.source) {
					sendMessage(event.source, { method: ACK_INIT_REQUEST_MESSAGE, windowId: message.windowId, sessionId: message.sessionId });
				}
				if (!TOP_WINDOW) {
					globalThis.stop();
					if (message.options.loadDeferredImages) {
						process$8(message.options);
					}
					await initRequestAsync(message);
				}
			} else if (message.method == ACK_INIT_REQUEST_MESSAGE) {
				clearFrameTimeout("requestTimeouts", message.sessionId, message.windowId);
				createFrameResponseTimeout(message.sessionId, message.windowId);
			} else if (message.method == CLEANUP_REQUEST_MESSAGE) {
				cleanupRequest(message);
			} else if (message.method == INIT_RESPONSE_MESSAGE && sessions.get(message.sessionId)) {
				const port = event.ports[0];
				port.onmessage = event => initResponse(event.data);
			}
		}
	}, true);

	function getAsync(options) {
		const sessionId = getNewSessionId();
		options = JSON$3.parse(JSON$3.stringify(options));
		return new Promise(resolve => {
			sessions.set(sessionId, {
				frames: [],
				requestTimeouts: {},
				responseTimeouts: {},
				resolve: frames => {
					frames.sessionId = sessionId;
					resolve(frames);
				}
			});
			initRequestAsync({ windowId, sessionId, options });
		});
	}

	function getSync(options) {
		const sessionId = getNewSessionId();
		options = JSON$3.parse(JSON$3.stringify(options));
		sessions.set(sessionId, {
			frames: [],
			requestTimeouts: {},
			responseTimeouts: {}
		});
		initRequestSync({ windowId, sessionId, options });
		const frames = sessions.get(sessionId).frames;
		frames.sessionId = sessionId;
		return frames;
	}

	function cleanup(sessionId) {
		sessions.delete(sessionId);
		cleanupRequest({ windowId, sessionId, options: { sessionId } });
	}

	function getNewSessionId() {
		return globalThis.crypto.getRandomValues(new Uint32Array(32)).join("");
	}

	function initRequestSync(message) {
		const sessionId = message.sessionId;
		const waitForUserScript = globalThis._singleFile_waitForUserScript;
		delete globalThis._singleFile_cleaningUp;
		if (!TOP_WINDOW) {
			windowId = globalThis.frameId = message.windowId;
		}
		processFrames(document, message.options, windowId, sessionId);
		if (!TOP_WINDOW) {
			if (message.options.userScriptEnabled && waitForUserScript) {
				waitForUserScript(helper$3.ON_BEFORE_CAPTURE_EVENT_NAME);
			}
			sendInitResponse({ frames: [getFrameData(document, globalThis, windowId, message.options)], sessionId, requestedFrameId: document.documentElement.dataset.requestedFrameId && windowId });
			if (message.options.userScriptEnabled && waitForUserScript) {
				waitForUserScript(helper$3.ON_AFTER_CAPTURE_EVENT_NAME);
			}
			delete document.documentElement.dataset.requestedFrameId;
		}
	}

	async function initRequestAsync(message) {
		const sessionId = message.sessionId;
		const waitForUserScript = globalThis._singleFile_waitForUserScript;
		delete globalThis._singleFile_cleaningUp;
		if (!TOP_WINDOW) {
			windowId = globalThis.frameId = message.windowId;
		}
		processFrames(document, message.options, windowId, sessionId);
		if (!TOP_WINDOW) {
			if (message.options.userScriptEnabled && waitForUserScript) {
				await waitForUserScript(helper$3.ON_BEFORE_CAPTURE_EVENT_NAME);
			}
			sendInitResponse({ frames: [getFrameData(document, globalThis, windowId, message.options)], sessionId, requestedFrameId: document.documentElement.dataset.requestedFrameId && windowId });
			if (message.options.userScriptEnabled && waitForUserScript) {
				await waitForUserScript(helper$3.ON_AFTER_CAPTURE_EVENT_NAME);
			}
			delete document.documentElement.dataset.requestedFrameId;
		}
	}

	function cleanupRequest(message) {
		if (!globalThis._singleFile_cleaningUp) {
			globalThis._singleFile_cleaningUp = true;
			const sessionId = message.sessionId;
			cleanupFrames(getFrames(document), message.windowId, sessionId);
		}
	}

	function initResponse(message) {
		message.frames.forEach(frameData => clearFrameTimeout("responseTimeouts", message.sessionId, frameData.windowId));
		const windowData = sessions.get(message.sessionId);
		if (windowData) {
			if (message.requestedFrameId) {
				windowData.requestedFrameId = message.requestedFrameId;
			}
			message.frames.forEach(messageFrameData => {
				let frameData = windowData.frames.find(frameData => messageFrameData.windowId == frameData.windowId);
				if (!frameData) {
					frameData = { windowId: messageFrameData.windowId };
					windowData.frames.push(frameData);
				}
				if (!frameData.processed) {
					frameData.content = messageFrameData.content;
					frameData.baseURI = messageFrameData.baseURI;
					frameData.title = messageFrameData.title;
					frameData.canvases = messageFrameData.canvases;
					frameData.fonts = messageFrameData.fonts;
					frameData.stylesheets = messageFrameData.stylesheets;
					frameData.images = messageFrameData.images;
					frameData.posters = messageFrameData.posters;
					frameData.videos = messageFrameData.videos;
					frameData.usedFonts = messageFrameData.usedFonts;
					frameData.shadowRoots = messageFrameData.shadowRoots;
					frameData.processed = messageFrameData.processed;
				}
			});
			const remainingFrames = windowData.frames.filter(frameData => !frameData.processed).length;
			if (!remainingFrames) {
				windowData.frames = windowData.frames.sort((frame1, frame2) => frame2.windowId.split(WINDOW_ID_SEPARATOR).length - frame1.windowId.split(WINDOW_ID_SEPARATOR).length);
				if (windowData.resolve) {
					if (windowData.requestedFrameId) {
						windowData.frames.forEach(frameData => {
							if (frameData.windowId == windowData.requestedFrameId) {
								frameData.requestedFrame = true;
							}
						});
					}
					windowData.resolve(windowData.frames);
				}
			}
		}
	}
	function processFrames(doc, options, parentWindowId, sessionId) {
		const frameElements = getFrames(doc);
		processFramesAsync(doc, frameElements, options, parentWindowId, sessionId);
		if (frameElements.length) {
			processFramesSync(doc, frameElements, options, parentWindowId, sessionId);
		}
	}

	function processFramesAsync(doc, frameElements, options, parentWindowId, sessionId) {
		const frames = [];
		let requestTimeouts;
		if (sessions.get(sessionId)) {
			requestTimeouts = sessions.get(sessionId).requestTimeouts;
		} else {
			requestTimeouts = {};
			sessions.set(sessionId, { requestTimeouts });
		}
		frameElements.forEach((frameElement, frameIndex) => {
			const windowId = parentWindowId + WINDOW_ID_SEPARATOR + frameIndex;
			frameElement.setAttribute(helper$3.WIN_ID_ATTRIBUTE_NAME, windowId);
			frames.push({ windowId });
		});
		sendInitResponse({ frames, sessionId, requestedFrameId: doc.documentElement.dataset.requestedFrameId && parentWindowId });
		frameElements.forEach((frameElement, frameIndex) => {
			const windowId = parentWindowId + WINDOW_ID_SEPARATOR + frameIndex;
			try {
				sendMessage(frameElement.contentWindow, { method: INIT_REQUEST_MESSAGE, windowId, sessionId, options });
			} catch (error) {
				// ignored
			}
			requestTimeouts[windowId] = globalThis.setTimeout(() => sendInitResponse({ frames: [{ windowId, processed: true }], sessionId }), TIMEOUT_INIT_REQUEST_MESSAGE);
		});
		delete doc.documentElement.dataset.requestedFrameId;
	}

	function processFramesSync(doc, frameElements, options, parentWindowId, sessionId) {
		const frames = [];
		frameElements.forEach((frameElement, frameIndex) => {
			const windowId = parentWindowId + WINDOW_ID_SEPARATOR + frameIndex;
			let frameDoc;
			try {
				frameDoc = frameElement.contentDocument;
			} catch (error) {
				// ignored
			}
			if (frameDoc) {
				try {
					const frameWindow = frameElement.contentWindow;
					frameWindow.stop();
					clearFrameTimeout("requestTimeouts", sessionId, windowId);
					processFrames(frameDoc, options, windowId, sessionId);
					frames.push(getFrameData(frameDoc, frameWindow, windowId, options));
				} catch (error) {
					frames.push({ windowId, processed: true });
				}
			}
		});
		sendInitResponse({ frames, sessionId, requestedFrameId: doc.documentElement.dataset.requestedFrameId && parentWindowId });
		delete doc.documentElement.dataset.requestedFrameId;
	}

	function clearFrameTimeout(type, sessionId, windowId) {
		const session = sessions.get(sessionId);
		if (session && session[type]) {
			const timeout = session[type][windowId];
			if (timeout) {
				globalThis.clearTimeout(timeout);
				delete session[type][windowId];
			}
		}
	}

	function createFrameResponseTimeout(sessionId, windowId) {
		const session = sessions.get(sessionId);
		if (session && session.responseTimeouts) {
			session.responseTimeouts[windowId] = globalThis.setTimeout(() => sendInitResponse({ frames: [{ windowId: windowId, processed: true }], sessionId: sessionId }), TIMEOUT_INIT_RESPONSE_MESSAGE);
		}
	}

	function cleanupFrames(frameElements, parentWindowId, sessionId) {
		frameElements.forEach((frameElement, frameIndex) => {
			const windowId = parentWindowId + WINDOW_ID_SEPARATOR + frameIndex;
			frameElement.removeAttribute(helper$3.WIN_ID_ATTRIBUTE_NAME);
			try {
				sendMessage(frameElement.contentWindow, { method: CLEANUP_REQUEST_MESSAGE, windowId, sessionId });
			} catch (error) {
				// ignored
			}
		});
		frameElements.forEach((frameElement, frameIndex) => {
			const windowId = parentWindowId + WINDOW_ID_SEPARATOR + frameIndex;
			let frameDoc;
			try {
				frameDoc = frameElement.contentDocument;
			} catch (error) {
				// ignored
			}
			if (frameDoc) {
				try {
					cleanupFrames(getFrames(frameDoc), windowId, sessionId);
				} catch (error) {
					// ignored
				}
			}
		});
	}

	function sendInitResponse(message) {
		message.method = INIT_RESPONSE_MESSAGE;
		try {
			top.singlefile.processors.frameTree.initResponse(message);
		} catch (error) {
			sendMessage(top, message, true);
		}
	}

	function sendMessage(targetWindow, message, useChannel) {
		if (targetWindow == top && browser && browser.runtime && browser.runtime.sendMessage) {
			browser.runtime.sendMessage(message);
		} else {
			if (useChannel) {
				const channel = new MessageChannel();
				targetWindow.postMessage(MESSAGE_PREFIX + JSON$3.stringify({ method: message.method, sessionId: message.sessionId }), TARGET_ORIGIN, [channel.port2]);
				channel.port1.postMessage(message);
			} else {
				targetWindow.postMessage(MESSAGE_PREFIX + JSON$3.stringify(message), TARGET_ORIGIN);
			}
		}
	}

	function getFrameData(document, globalThis, windowId, options) {
		const docData = helper$3.preProcessDoc(document, globalThis, options);
		const content = helper$3.serialize(document);
		helper$3.postProcessDoc(document, docData.markedElements, docData.invalidElements);
		const baseURI = document.baseURI.split("#")[0];
		return {
			windowId,
			content,
			baseURI,
			title: document.title,
			canvases: docData.canvases,
			fonts: docData.fonts,
			stylesheets: docData.stylesheets,
			images: docData.images,
			posters: docData.posters,
			videos: docData.videos,
			usedFonts: docData.usedFonts,
			shadowRoots: docData.shadowRoots,
			processed: true
		};
	}

	function getFrames(document) {
		let frames = Array.from(document.querySelectorAll(FRAMES_CSS_SELECTOR));
		document.querySelectorAll(ALL_ELEMENTS_CSS_SELECTOR).forEach(element => {
			const shadowRoot = helper$3.getShadowRoot(element);
			if (shadowRoot) {
				frames = frames.concat(...shadowRoot.querySelectorAll(FRAMES_CSS_SELECTOR));
			}
		});
		return frames;
	}

	var contentFrameTree = /*#__PURE__*/Object.freeze({
		__proto__: null,
		getAsync: getAsync,
		getSync: getSync,
		cleanup: cleanup,
		initResponse: initResponse,
		TIMEOUT_INIT_REQUEST_MESSAGE: TIMEOUT_INIT_REQUEST_MESSAGE
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	var index$2 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		frameTree: contentFrameTree,
		hooksFrames: contentHooksFrames,
		lazy: contentLazyLoader
	});

	// dist/csstree.esm.js from https://github.com/csstree/csstree/tree/debb7c5c16eafc3acfe88e6a1e4208fc75c4984b

	/*
	 * Copyright (C) 2016-2022 by Roman Dvornov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */

	var is=Object.create;var yt=Object.defineProperty,as=Object.defineProperties,ss=Object.getOwnPropertyDescriptor,ls=Object.getOwnPropertyDescriptors,cs=Object.getOwnPropertyNames,qo=Object.getOwnPropertySymbols,us=Object.getPrototypeOf,Ho=Object.prototype.hasOwnProperty,ps=Object.prototype.propertyIsEnumerable;var Wo=(e,t,r)=>t in e?yt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,C=(e,t)=>{for(var r in t||(t={}))Ho.call(t,r)&&Wo(e,r,t[r]);if(qo)for(var r of qo(t))ps.call(t,r)&&Wo(e,r,t[r]);return e},kt=(e,t)=>as(e,ls(t));var Ne=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),b=(e,t)=>{for(var r in t)yt(e,r,{get:t[r],enumerable:!0});},hs=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of cs(t))!Ho.call(e,o)&&o!==r&&yt(e,o,{get:()=>t[o],enumerable:!(n=ss(t,o))||n.enumerable});return e};var ms=(e,t,r)=>(r=e!=null?is(us(e)):{},hs(t||!e||!e.__esModule?yt(r,"default",{value:e,enumerable:!0}):r,e));var oi=Ne(tn=>{var ni="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");tn.encode=function(e){if(0<=e&&e<ni.length)return ni[e];throw new TypeError("Must be between 0 and 63: "+e)};tn.decode=function(e){var t=65,r=90,n=97,o=122,i=48,s=57,u=43,c=47,a=26,l=52;return t<=e&&e<=r?e-t:n<=e&&e<=o?e-n+a:i<=e&&e<=s?e-i+l:e==u?62:e==c?63:-1};});var ci=Ne(nn=>{var ii=oi(),rn=5,ai=1<<rn,si=ai-1,li=ai;function As(e){return e<0?(-e<<1)+1:(e<<1)+0}function Ts(e){var t=(e&1)===1,r=e>>1;return t?-r:r}nn.encode=function(t){var r="",n,o=As(t);do n=o&si,o>>>=rn,o>0&&(n|=li),r+=ii.encode(n);while(o>0);return r};nn.decode=function(t,r,n){var o=t.length,i=0,s=0,u,c;do{if(r>=o)throw new Error("Expected more digits in base 64 VLQ value.");if(c=ii.decode(t.charCodeAt(r++)),c===-1)throw new Error("Invalid base64 digit: "+t.charAt(r-1));u=!!(c&li),c&=si,i=i+(c<<s),s+=rn;}while(u);n.value=Ts(i),n.rest=r;};});var It=Ne(Q=>{function Es(e,t,r){if(t in e)return e[t];if(arguments.length===3)return r;throw new Error('"'+t+'" is a required argument.')}Q.getArg=Es;var ui=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,Ls=/^data:.+\,.+$/;function ot(e){var t=e.match(ui);return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}Q.urlParse=ot;function qe(e){var t="";return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}Q.urlGenerate=qe;var Ps=32;function Is(e){var t=[];return function(r){for(var n=0;n<t.length;n++)if(t[n].input===r){var o=t[0];return t[0]=t[n],t[n]=o,t[0].result}var i=e(r);return t.unshift({input:r,result:i}),t.length>Ps&&t.pop(),i}}var on=Is(function(t){var r=t,n=ot(t);if(n){if(!n.path)return t;r=n.path;}for(var o=Q.isAbsolute(r),i=[],s=0,u=0;;)if(s=u,u=r.indexOf("/",s),u===-1){i.push(r.slice(s));break}else for(i.push(r.slice(s,u));u<r.length&&r[u]==="/";)u++;for(var c,a=0,u=i.length-1;u>=0;u--)c=i[u],c==="."?i.splice(u,1):c===".."?a++:a>0&&(c===""?(i.splice(u+1,a),a=0):(i.splice(u,2),a--));return r=i.join("/"),r===""&&(r=o?"/":"."),n?(n.path=r,qe(n)):r});Q.normalize=on;function pi(e,t){e===""&&(e="."),t===""&&(t=".");var r=ot(t),n=ot(e);if(n&&(e=n.path||"/"),r&&!r.scheme)return n&&(r.scheme=n.scheme),qe(r);if(r||t.match(Ls))return t;if(n&&!n.host&&!n.path)return n.host=t,qe(n);var o=t.charAt(0)==="/"?t:on(e.replace(/\/+$/,"")+"/"+t);return n?(n.path=o,qe(n)):o}Q.join=pi;Q.isAbsolute=function(e){return e.charAt(0)==="/"||ui.test(e)};function Ds(e,t){e===""&&(e="."),e=e.replace(/\/$/,"");for(var r=0;t.indexOf(e+"/")!==0;){var n=e.lastIndexOf("/");if(n<0||(e=e.slice(0,n),e.match(/^([^\/]+:\/)?\/*$/)))return t;++r;}return Array(r+1).join("../")+t.substr(e.length+1)}Q.relative=Ds;var hi=function(){var e=Object.create(null);return !("__proto__"in e)}();function mi(e){return e}function Os(e){return fi(e)?"$"+e:e}Q.toSetString=hi?mi:Os;function Ns(e){return fi(e)?e.slice(1):e}Q.fromSetString=hi?mi:Ns;function fi(e){if(!e)return !1;var t=e.length;if(t<9||e.charCodeAt(t-1)!==95||e.charCodeAt(t-2)!==95||e.charCodeAt(t-3)!==111||e.charCodeAt(t-4)!==116||e.charCodeAt(t-5)!==111||e.charCodeAt(t-6)!==114||e.charCodeAt(t-7)!==112||e.charCodeAt(t-8)!==95||e.charCodeAt(t-9)!==95)return !1;for(var r=t-10;r>=0;r--)if(e.charCodeAt(r)!==36)return !1;return !0}function zs(e,t,r){var n=xe(e.source,t.source);return n!==0||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0||r)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:xe(e.name,t.name)}Q.compareByOriginalPositions=zs;function Ms(e,t,r){var n;return n=e.originalLine-t.originalLine,n!==0||(n=e.originalColumn-t.originalColumn,n!==0||r)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:xe(e.name,t.name)}Q.compareByOriginalPositionsNoSource=Ms;function Rs(e,t,r){var n=e.generatedLine-t.generatedLine;return n!==0||(n=e.generatedColumn-t.generatedColumn,n!==0||r)||(n=xe(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:xe(e.name,t.name)}Q.compareByGeneratedPositionsDeflated=Rs;function Fs(e,t,r){var n=e.generatedColumn-t.generatedColumn;return n!==0||r||(n=xe(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:xe(e.name,t.name)}Q.compareByGeneratedPositionsDeflatedNoLine=Fs;function xe(e,t){return e===t?0:e===null?1:t===null?-1:e>t?1:-1}function Bs(e,t){var r=e.generatedLine-t.generatedLine;return r!==0||(r=e.generatedColumn-t.generatedColumn,r!==0)||(r=xe(e.source,t.source),r!==0)||(r=e.originalLine-t.originalLine,r!==0)||(r=e.originalColumn-t.originalColumn,r!==0)?r:xe(e.name,t.name)}Q.compareByGeneratedPositionsInflated=Bs;function _s(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))}Q.parseSourceMapInput=_s;function Us(e,t,r){if(t=t||"",e&&(e[e.length-1]!=="/"&&t[0]!=="/"&&(e+="/"),t=e+t),r){var n=ot(r);if(!n)throw new Error("sourceMapURL could not be parsed");if(n.path){var o=n.path.lastIndexOf("/");o>=0&&(n.path=n.path.substring(0,o+1));}t=pi(qe(n),t);}return on(t)}Q.computeSourceURL=Us;});var gi=Ne(di=>{var an=It(),sn=Object.prototype.hasOwnProperty,Pe=typeof Map<"u";function ye(){this._array=[],this._set=Pe?new Map:Object.create(null);}ye.fromArray=function(t,r){for(var n=new ye,o=0,i=t.length;o<i;o++)n.add(t[o],r);return n};ye.prototype.size=function(){return Pe?this._set.size:Object.getOwnPropertyNames(this._set).length};ye.prototype.add=function(t,r){var n=Pe?t:an.toSetString(t),o=Pe?this.has(t):sn.call(this._set,n),i=this._array.length;(!o||r)&&this._array.push(t),o||(Pe?this._set.set(t,i):this._set[n]=i);};ye.prototype.has=function(t){if(Pe)return this._set.has(t);var r=an.toSetString(t);return sn.call(this._set,r)};ye.prototype.indexOf=function(t){if(Pe){var r=this._set.get(t);if(r>=0)return r}else {var n=an.toSetString(t);if(sn.call(this._set,n))return this._set[n]}throw new Error('"'+t+'" is not in the set.')};ye.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)};ye.prototype.toArray=function(){return this._array.slice()};di.ArraySet=ye;});var yi=Ne(xi=>{var bi=It();function js(e,t){var r=e.generatedLine,n=t.generatedLine,o=e.generatedColumn,i=t.generatedColumn;return n>r||n==r&&i>=o||bi.compareByGeneratedPositionsInflated(e,t)<=0}function Dt(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0};}Dt.prototype.unsortedForEach=function(t,r){this._array.forEach(t,r);};Dt.prototype.add=function(t){js(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t));};Dt.prototype.toArray=function(){return this._sorted||(this._array.sort(bi.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};xi.MappingList=Dt;});var wi=Ne(ki=>{var it=ci(),W=It(),Ot=gi().ArraySet,qs=yi().MappingList;function ie(e){e||(e={}),this._file=W.getArg(e,"file",null),this._sourceRoot=W.getArg(e,"sourceRoot",null),this._skipValidation=W.getArg(e,"skipValidation",!1),this._sources=new Ot,this._names=new Ot,this._mappings=new qs,this._sourcesContents=null;}ie.prototype._version=3;ie.fromSourceMap=function(t){var r=t.sourceRoot,n=new ie({file:t.file,sourceRoot:r});return t.eachMapping(function(o){var i={generated:{line:o.generatedLine,column:o.generatedColumn}};o.source!=null&&(i.source=o.source,r!=null&&(i.source=W.relative(r,i.source)),i.original={line:o.originalLine,column:o.originalColumn},o.name!=null&&(i.name=o.name)),n.addMapping(i);}),t.sources.forEach(function(o){var i=o;r!==null&&(i=W.relative(r,o)),n._sources.has(i)||n._sources.add(i);var s=t.sourceContentFor(o);s!=null&&n.setSourceContent(o,s);}),n};ie.prototype.addMapping=function(t){var r=W.getArg(t,"generated"),n=W.getArg(t,"original",null),o=W.getArg(t,"source",null),i=W.getArg(t,"name",null);this._skipValidation||this._validateMapping(r,n,o,i),o!=null&&(o=String(o),this._sources.has(o)||this._sources.add(o)),i!=null&&(i=String(i),this._names.has(i)||this._names.add(i)),this._mappings.add({generatedLine:r.line,generatedColumn:r.column,originalLine:n!=null&&n.line,originalColumn:n!=null&&n.column,source:o,name:i});};ie.prototype.setSourceContent=function(t,r){var n=t;this._sourceRoot!=null&&(n=W.relative(this._sourceRoot,n)),r!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[W.toSetString(n)]=r):this._sourcesContents&&(delete this._sourcesContents[W.toSetString(n)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null));};ie.prototype.applySourceMap=function(t,r,n){var o=r;if(r==null){if(t.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);o=t.file;}var i=this._sourceRoot;i!=null&&(o=W.relative(i,o));var s=new Ot,u=new Ot;this._mappings.unsortedForEach(function(c){if(c.source===o&&c.originalLine!=null){var a=t.originalPositionFor({line:c.originalLine,column:c.originalColumn});a.source!=null&&(c.source=a.source,n!=null&&(c.source=W.join(n,c.source)),i!=null&&(c.source=W.relative(i,c.source)),c.originalLine=a.line,c.originalColumn=a.column,a.name!=null&&(c.name=a.name));}var l=c.source;l!=null&&!s.has(l)&&s.add(l);var p=c.name;p!=null&&!u.has(p)&&u.add(p);},this),this._sources=s,this._names=u,t.sources.forEach(function(c){var a=t.sourceContentFor(c);a!=null&&(n!=null&&(c=W.join(n,c)),i!=null&&(c=W.relative(i,c)),this.setSourceContent(c,a));},this);};ie.prototype._validateMapping=function(t,r,n,o){if(r&&typeof r.line!="number"&&typeof r.column!="number")throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");if(!(t&&"line"in t&&"column"in t&&t.line>0&&t.column>=0&&!r&&!n&&!o)){if(t&&"line"in t&&"column"in t&&r&&"line"in r&&"column"in r&&t.line>0&&t.column>=0&&r.line>0&&r.column>=0&&n)return;throw new Error("Invalid mapping: "+JSON.stringify({generated:t,source:n,original:r,name:o}))}};ie.prototype._serializeMappings=function(){for(var t=0,r=1,n=0,o=0,i=0,s=0,u="",c,a,l,p,m=this._mappings.toArray(),f=0,I=m.length;f<I;f++){if(a=m[f],c="",a.generatedLine!==r)for(t=0;a.generatedLine!==r;)c+=";",r++;else if(f>0){if(!W.compareByGeneratedPositionsInflated(a,m[f-1]))continue;c+=",";}c+=it.encode(a.generatedColumn-t),t=a.generatedColumn,a.source!=null&&(p=this._sources.indexOf(a.source),c+=it.encode(p-s),s=p,c+=it.encode(a.originalLine-1-o),o=a.originalLine-1,c+=it.encode(a.originalColumn-n),n=a.originalColumn,a.name!=null&&(l=this._names.indexOf(a.name),c+=it.encode(l-i),i=l)),u+=c;}return u};ie.prototype._generateSourcesContent=function(t,r){return t.map(function(n){if(!this._sourcesContents)return null;r!=null&&(n=W.relative(r,n));var o=W.toSetString(n);return Object.prototype.hasOwnProperty.call(this._sourcesContents,o)?this._sourcesContents[o]:null},this)};ie.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(t.file=this._file),this._sourceRoot!=null&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t};ie.prototype.toString=function(){return JSON.stringify(this.toJSON())};ki.SourceMapGenerator=ie;});var ze={};b(ze,{AtKeyword:()=>D,BadString:()=>Te,BadUrl:()=>G,CDC:()=>q,CDO:()=>pe,Colon:()=>N,Comma:()=>V,Comment:()=>L,Delim:()=>g,Dimension:()=>y,EOF:()=>Ze,Function:()=>x,Hash:()=>v,Ident:()=>h,LeftCurlyBracket:()=>R,LeftParenthesis:()=>E,LeftSquareBracket:()=>j,Number:()=>d,Percentage:()=>T,RightCurlyBracket:()=>Y,RightParenthesis:()=>w,RightSquareBracket:()=>K,Semicolon:()=>U,String:()=>H,Url:()=>B,WhiteSpace:()=>k});var Ze=0,h=1,x=2,D=3,v=4,H=5,Te=6,B=7,G=8,g=9,d=10,T=11,y=12,k=13,pe=14,q=15,N=16,U=17,V=18,j=19,K=20,E=21,w=22,R=23,Y=24,L=25;function _(e){return e>=48&&e<=57}function te(e){return _(e)||e>=65&&e<=70||e>=97&&e<=102}function vt(e){return e>=65&&e<=90}function fs(e){return e>=97&&e<=122}function ds(e){return vt(e)||fs(e)}function gs(e){return e>=128}function wt(e){return ds(e)||gs(e)||e===95}function Me(e){return wt(e)||_(e)||e===45}function bs(e){return e>=0&&e<=8||e===11||e>=14&&e<=31||e===127}function Je(e){return e===10||e===13||e===12}function he(e){return Je(e)||e===32||e===9}function Z(e,t){return !(e!==92||Je(t)||t===0)}function Re(e,t,r){return e===45?wt(t)||t===45||Z(t,r):wt(e)?!0:e===92?Z(e,t):!1}function St(e,t,r){return e===43||e===45?_(t)?2:t===46&&_(r)?3:0:e===46?_(t)?2:0:_(e)?1:0}function Ct(e){return e===65279||e===65534?1:0}var Vr=new Array(128),xs=128,et=130,Kr=131,At=132,Qr=133;for(let e=0;e<Vr.length;e++)Vr[e]=he(e)&&et||_(e)&&Kr||wt(e)&&At||bs(e)&&Qr||e||xs;function Tt(e){return e<128?Vr[e]:At}function Fe(e,t){return t<e.length?e.charCodeAt(t):0}function Et(e,t,r){return r===13&&Fe(e,t+1)===10?2:1}function ge(e,t,r){let n=e.charCodeAt(t);return vt(n)&&(n=n|32),n===r}function be(e,t,r,n){if(r-t!==n.length||t<0||r>e.length)return !1;for(let o=t;o<r;o++){let i=n.charCodeAt(o-t),s=e.charCodeAt(o);if(vt(s)&&(s=s|32),s!==i)return !1}return !0}function Yo(e,t){for(;t>=0&&he(e.charCodeAt(t));t--);return t+1}function tt(e,t){for(;t<e.length&&he(e.charCodeAt(t));t++);return t}function Xr(e,t){for(;t<e.length&&_(e.charCodeAt(t));t++);return t}function le(e,t){if(t+=2,te(Fe(e,t-1))){for(let n=Math.min(e.length,t+5);t<n&&te(Fe(e,t));t++);let r=Fe(e,t);he(r)&&(t+=Et(e,t,r));}return t}function rt(e,t){for(;t<e.length;t++){let r=e.charCodeAt(t);if(!Me(r)){if(Z(r,Fe(e,t+1))){t=le(e,t)-1;continue}break}}return t}function Ee(e,t){let r=e.charCodeAt(t);if((r===43||r===45)&&(r=e.charCodeAt(t+=1)),_(r)&&(t=Xr(e,t+1),r=e.charCodeAt(t)),r===46&&_(e.charCodeAt(t+1))&&(t+=2,t=Xr(e,t)),ge(e,t,101)){let n=0;r=e.charCodeAt(t+1),(r===45||r===43)&&(n=1,r=e.charCodeAt(t+2)),_(r)&&(t=Xr(e,t+1+n+1));}return t}function Lt(e,t){for(;t<e.length;t++){let r=e.charCodeAt(t);if(r===41){t++;break}Z(r,Fe(e,t+1))&&(t=le(e,t));}return t}function Be(e){if(e.length===1&&!te(e.charCodeAt(0)))return e[0];let t=parseInt(e,16);return (t===0||t>=55296&&t<=57343||t>1114111)&&(t=65533),String.fromCodePoint(t)}var _e=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token"];function Ue(e=null,t){return e===null||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}var Go=10,ys=12,Vo=13;function Ko(e){let t=e.source,r=t.length,n=t.length>0?Ct(t.charCodeAt(0)):0,o=Ue(e.lines,r),i=Ue(e.columns,r),s=e.startLine,u=e.startColumn;for(let c=n;c<r;c++){let a=t.charCodeAt(c);o[c]=s,i[c]=u++,(a===Go||a===Vo||a===ys)&&(a===Vo&&c+1<r&&t.charCodeAt(c+1)===Go&&(c++,o[c]=s,i[c]=u),s++,u=1);}o[r]=s,i[r]=u,e.lines=o,e.columns=i,e.computed=!0;}var Pt=class{constructor(){this.lines=null,this.columns=null,this.computed=!1;}setSource(t,r=0,n=1,o=1){this.source=t,this.startOffset=r,this.startLine=n,this.startColumn=o,this.computed=!1;}getLocation(t,r){return this.computed||Ko(this),{source:r,offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}getLocationRange(t,r,n){return this.computed||Ko(this),{source:n,start:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]},end:{offset:this.startOffset+r,line:this.lines[r],column:this.columns[r]}}}};var oe=16777215,ve=24,ks=new Map([[2,22],[21,22],[19,20],[23,24]]),nt=class{constructor(t,r){this.setSource(t,r);}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset;}setSource(t="",r=()=>{}){t=String(t||"");let n=t.length,o=Ue(this.offsetAndType,t.length+1),i=Ue(this.balance,t.length+1),s=0,u=0,c=0,a=-1;for(this.offsetAndType=null,this.balance=null,r(t,(l,p,m)=>{switch(l){default:i[s]=n;break;case u:{let f=c&oe;for(c=i[f],u=c>>ve,i[s]=f,i[f++]=s;f<s;f++)i[f]===n&&(i[f]=s);break}case 21:case 2:case 19:case 23:i[s]=c,u=ks.get(l),c=u<<ve|s;break}o[s++]=l<<ve|m,a===-1&&(a=p);}),o[s]=0<<ve|n,i[s]=n,i[n]=n;c!==0;){let l=c&oe;c=i[l],i[l]=n;}this.source=t,this.firstCharOffset=a===-1?0:a,this.tokenCount=s,this.offsetAndType=o,this.balance=i,this.reset(),this.next();}lookupType(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t]>>ve:0}lookupOffset(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t-1]&oe:this.source.length}lookupValue(t,r){return t+=this.tokenIndex,t<this.tokenCount?be(this.source,this.offsetAndType[t-1]&oe,this.offsetAndType[t]&oe,r):!1}getTokenStart(t){return t===this.tokenIndex?this.tokenStart:t>0?t<this.tokenCount?this.offsetAndType[t-1]&oe:this.offsetAndType[this.tokenCount]&oe:this.firstCharOffset}substrToCursor(t){return this.source.substring(t,this.tokenStart)}isBalanceEdge(t){return this.balance[this.tokenIndex]<t}isDelim(t,r){return r?this.lookupType(r)===9&&this.source.charCodeAt(this.lookupOffset(r))===t:this.tokenType===9&&this.source.charCodeAt(this.tokenStart)===t}skip(t){let r=this.tokenIndex+t;r<this.tokenCount?(this.tokenIndex=r,this.tokenStart=this.offsetAndType[r-1]&oe,r=this.offsetAndType[r],this.tokenType=r>>ve,this.tokenEnd=r&oe):(this.tokenIndex=this.tokenCount,this.next());}next(){let t=this.tokenIndex+1;t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.tokenEnd,t=this.offsetAndType[t],this.tokenType=t>>ve,this.tokenEnd=t&oe):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length);}skipSC(){for(;this.tokenType===13||this.tokenType===25;)this.next();}skipUntilBalanced(t,r){let n=t,o,i;e:for(;n<this.tokenCount;n++){if(o=this.balance[n],o<t)break e;switch(i=n>0?this.offsetAndType[n-1]&oe:this.firstCharOffset,r(this.source.charCodeAt(i))){case 1:break e;case 2:n++;break e;default:this.balance[o]===n&&(n=o);}}this.skip(n-this.tokenIndex);}forEachToken(t){for(let r=0,n=this.firstCharOffset;r<this.tokenCount;r++){let o=n,i=this.offsetAndType[r],s=i&oe,u=i>>ve;n=s,t(u,o,s,r);}}dump(){let t=new Array(this.tokenCount);return this.forEachToken((r,n,o,i)=>{t[i]={idx:i,type:_e[r],chunk:this.source.substring(n,o),balance:this.balance[i]};}),t}};function Se(e,t){function r(p){return p<u?e.charCodeAt(p):0}function n(){if(a=Ee(e,a),Re(r(a),r(a+1),r(a+2))){l=12,a=rt(e,a);return}if(r(a)===37){l=11,a++;return}l=10;}function o(){let p=a;if(a=rt(e,a),be(e,p,a,"url")&&r(a)===40){if(a=tt(e,a+1),r(a)===34||r(a)===39){l=2,a=p+4;return}s();return}if(r(a)===40){l=2,a++;return}l=1;}function i(p){for(p||(p=r(a++)),l=5;a<e.length;a++){let m=e.charCodeAt(a);switch(Tt(m)){case p:a++;return;case et:if(Je(m)){a+=Et(e,a,m),l=6;return}break;case 92:if(a===e.length-1)break;let f=r(a+1);Je(f)?a+=Et(e,a+1,f):Z(m,f)&&(a=le(e,a)-1);break}}}function s(){for(l=7,a=tt(e,a);a<e.length;a++){let p=e.charCodeAt(a);switch(Tt(p)){case 41:a++;return;case et:if(a=tt(e,a),r(a)===41||a>=e.length){a<e.length&&a++;return}a=Lt(e,a),l=8;return;case 34:case 39:case 40:case Qr:a=Lt(e,a),l=8;return;case 92:if(Z(p,r(a+1))){a=le(e,a)-1;break}a=Lt(e,a),l=8;return}}}e=String(e||"");let u=e.length,c=Ct(r(0)),a=c,l;for(;a<u;){let p=e.charCodeAt(a);switch(Tt(p)){case et:l=13,a=tt(e,a+1);break;case 34:i();break;case 35:Me(r(a+1))||Z(r(a+1),r(a+2))?(l=4,a=rt(e,a+1)):(l=9,a++);break;case 39:i();break;case 40:l=21,a++;break;case 41:l=22,a++;break;case 43:St(p,r(a+1),r(a+2))?n():(l=9,a++);break;case 44:l=18,a++;break;case 45:St(p,r(a+1),r(a+2))?n():r(a+1)===45&&r(a+2)===62?(l=15,a=a+3):Re(p,r(a+1),r(a+2))?o():(l=9,a++);break;case 46:St(p,r(a+1),r(a+2))?n():(l=9,a++);break;case 47:r(a+1)===42?(l=25,a=e.indexOf("*/",a+2),a=a===-1?e.length:a+2):(l=9,a++);break;case 58:l=16,a++;break;case 59:l=17,a++;break;case 60:r(a+1)===33&&r(a+2)===45&&r(a+3)===45?(l=14,a=a+4):(l=9,a++);break;case 64:Re(r(a+1),r(a+2),r(a+3))?(l=3,a=rt(e,a+1)):(l=9,a++);break;case 91:l=19,a++;break;case 92:Z(p,r(a+1))?o():(l=9,a++);break;case 93:l=20,a++;break;case 123:l=23,a++;break;case 125:l=24,a++;break;case Kr:n();break;case At:o();break;default:l=9,a++;}t(l,c,c=a);}}var je=null,O=class{static createItem(t){return {prev:null,next:null,data:t}}constructor(){this.head=null,this.tail=null,this.cursor=null;}createItem(t){return O.createItem(t)}allocateCursor(t,r){let n;return je!==null?(n=je,je=je.cursor,n.prev=t,n.next=r,n.cursor=this.cursor):n={prev:t,next:r,cursor:this.cursor},this.cursor=n,n}releaseCursor(){let{cursor:t}=this;this.cursor=t.cursor,t.prev=null,t.next=null,t.cursor=je,je=t;}updateCursors(t,r,n,o){let{cursor:i}=this;for(;i!==null;)i.prev===t&&(i.prev=r),i.next===n&&(i.next=o),i=i.cursor;}*[Symbol.iterator](){for(let t=this.head;t!==null;t=t.next)yield t.data;}get size(){let t=0;for(let r=this.head;r!==null;r=r.next)t++;return t}get isEmpty(){return this.head===null}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let r=null;this.head=null;for(let n of t){let o=O.createItem(n);r!==null?r.next=o:this.head=o,o.prev=r,r=o;}return this.tail=r,this}toArray(){return [...this]}toJSON(){return [...this]}forEach(t,r=this){let n=this.allocateCursor(null,this.head);for(;n.next!==null;){let o=n.next;n.next=o.next,t.call(r,o.data,o,this);}this.releaseCursor();}forEachRight(t,r=this){let n=this.allocateCursor(this.tail,null);for(;n.prev!==null;){let o=n.prev;n.prev=o.prev,t.call(r,o.data,o,this);}this.releaseCursor();}reduce(t,r,n=this){let o=this.allocateCursor(null,this.head),i=r,s;for(;o.next!==null;)s=o.next,o.next=s.next,i=t.call(n,i,s.data,s,this);return this.releaseCursor(),i}reduceRight(t,r,n=this){let o=this.allocateCursor(this.tail,null),i=r,s;for(;o.prev!==null;)s=o.prev,o.prev=s.prev,i=t.call(n,i,s.data,s,this);return this.releaseCursor(),i}some(t,r=this){for(let n=this.head;n!==null;n=n.next)if(t.call(r,n.data,n,this))return !0;return !1}map(t,r=this){let n=new O;for(let o=this.head;o!==null;o=o.next)n.appendData(t.call(r,o.data,o,this));return n}filter(t,r=this){let n=new O;for(let o=this.head;o!==null;o=o.next)t.call(r,o.data,o,this)&&n.appendData(o.data);return n}nextUntil(t,r,n=this){if(t===null)return;let o=this.allocateCursor(null,t);for(;o.next!==null;){let i=o.next;if(o.next=i.next,r.call(n,i.data,i,this))break}this.releaseCursor();}prevUntil(t,r,n=this){if(t===null)return;let o=this.allocateCursor(t,null);for(;o.prev!==null;){let i=o.prev;if(o.prev=i.prev,r.call(n,i.data,i,this))break}this.releaseCursor();}clear(){this.head=null,this.tail=null;}copy(){let t=new O;for(let r of this)t.appendData(r);return t}prepend(t){return this.updateCursors(null,t,this.head,t),this.head!==null?(this.head.prev=t,t.next=this.head):this.tail=t,this.head=t,this}prependData(t){return this.prepend(O.createItem(t))}append(t){return this.insert(t)}appendData(t){return this.insert(O.createItem(t))}insert(t,r=null){if(r!==null)if(this.updateCursors(r.prev,t,r,t),r.prev===null){if(this.head!==r)throw new Error("before doesn't belong to list");this.head=t,r.prev=t,t.next=r,this.updateCursors(null,t);}else r.prev.next=t,t.prev=r.prev,r.prev=t,t.next=r;else this.updateCursors(this.tail,t,null,t),this.tail!==null?(this.tail.next=t,t.prev=this.tail):this.head=t,this.tail=t;return this}insertData(t,r){return this.insert(O.createItem(t),r)}remove(t){if(this.updateCursors(t,t.prev,t,t.next),t.prev!==null)t.prev.next=t.next;else {if(this.head!==t)throw new Error("item doesn't belong to list");this.head=t.next;}if(t.next!==null)t.next.prev=t.prev;else {if(this.tail!==t)throw new Error("item doesn't belong to list");this.tail=t.prev;}return t.prev=null,t.next=null,t}push(t){this.insert(O.createItem(t));}pop(){return this.tail!==null?this.remove(this.tail):null}unshift(t){this.prepend(O.createItem(t));}shift(){return this.head!==null?this.remove(this.head):null}prependList(t){return this.insertList(t,this.head)}appendList(t){return this.insertList(t)}insertList(t,r){return t.head===null?this:(r!=null?(this.updateCursors(r.prev,t.tail,r,t.head),r.prev!==null?(r.prev.next=t.head,t.head.prev=r.prev):this.head=t.head,r.prev=t.tail,t.tail.next=r):(this.updateCursors(this.tail,t.tail,null,t.head),this.tail!==null?(this.tail.next=t.head,t.head.prev=this.tail):this.head=t.head,this.tail=t.tail),t.head=null,t.tail=null,this)}replace(t,r){"head"in r?this.insertList(r,t):this.insert(r,t),this.remove(t);}};function Le(e,t){let r=Object.create(SyntaxError.prototype),n=new Error;return Object.assign(r,{name:e,message:t,get stack(){return (n.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}
`)}})}var $r=100,Qo=60,Xo="    ";function $o({source:e,line:t,column:r},n){function o(l,p){return i.slice(l,p).map((m,f)=>String(l+f+1).padStart(c)+" |"+m).join(`
`)}let i=e.split(/\r\n?|\n|\f/),s=Math.max(1,t-n)-1,u=Math.min(t+n,i.length+1),c=Math.max(4,String(u).length)+1,a=0;r+=(Xo.length-1)*(i[t-1].substr(0,r-1).match(/\t/g)||[]).length,r>$r&&(a=r-Qo+3,r=Qo-2);for(let l=s;l<=u;l++)l>=0&&l<i.length&&(i[l]=i[l].replace(/\t/g,Xo),i[l]=(a>0&&i[l].length>a?"\u2026":"")+i[l].substr(a,$r-2)+(i[l].length>a+$r-1?"\u2026":""));return [o(s,t),new Array(r+c+2).join("-")+"^",o(t,u)].filter(Boolean).join(`
`)}function Zr(e,t,r,n,o){return Object.assign(Le("SyntaxError",e),{source:t,offset:r,line:n,column:o,sourceFragment(s){return $o({source:t,line:n,column:o},isNaN(s)?0:s)},get formattedMessage(){return `Parse error: ${e}
`+$o({source:t,line:n,column:o},2)}})}function Zo(e){let t=this.createList(),r=!1,n={recognizer:e};for(;!this.eof;){switch(this.tokenType){case 25:this.next();continue;case 13:r=!0,this.next();continue}let o=e.getNode.call(this,n);if(o===void 0)break;r&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,o,t,n),r=!1),t.push(o);}return r&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,n),t}var Jo=()=>{},ws=33,vs=35,Jr=59,ei=123,ti=0;function Ss(e){return function(){return this[e]()}}function en(e){let t=Object.create(null);for(let r in e){let n=e[r],o=n.parse||n;o&&(t[r]=o);}return t}function Cs(e){let t={context:Object.create(null),scope:Object.assign(Object.create(null),e.scope),atrule:en(e.atrule),pseudo:en(e.pseudo),node:en(e.node)};for(let r in e.parseContext)switch(typeof e.parseContext[r]){case"function":t.context[r]=e.parseContext[r];break;case"string":t.context[r]=Ss(e.parseContext[r]);break}return C(C({config:t},t),t.node)}function ri(e){let t="",r="<unknown>",n=!1,o=Jo,i=!1,s=new Pt,u=Object.assign(new nt,Cs(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:Zo,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket(a){return a===ei?1:0},consumeUntilLeftCurlyBracketOrSemicolon(a){return a===ei||a===Jr?1:0},consumeUntilExclamationMarkOrSemicolon(a){return a===ws||a===Jr?1:0},consumeUntilSemicolonIncluded(a){return a===Jr?2:0},createList(){return new O},createSingleNodeList(a){return new O().appendData(a)},getFirstListNode(a){return a&&a.first},getLastListNode(a){return a&&a.last},parseWithFallback(a,l){let p=this.tokenIndex;try{return a.call(this)}catch(m){if(i)throw m;let f=l.call(this,p);return i=!0,o(m,f),i=!1,f}},lookupNonWSType(a){let l;do if(l=this.lookupType(a++),l!==13)return l;while(l!==ti);return ti},charCodeAt(a){return a>=0&&a<t.length?t.charCodeAt(a):0},substring(a,l){return t.substring(a,l)},substrToCursor(a){return this.source.substring(a,this.tokenStart)},cmpChar(a,l){return ge(t,a,l)},cmpStr(a,l,p){return be(t,a,l,p)},consume(a){let l=this.tokenStart;return this.eat(a),this.substrToCursor(l)},consumeFunctionName(){let a=t.substring(this.tokenStart,this.tokenEnd-1);return this.eat(2),a},consumeNumber(a){let l=t.substring(this.tokenStart,Ee(t,this.tokenStart));return this.eat(a),l},eat(a){if(this.tokenType!==a){let l=_e[a].slice(0,-6).replace(/-/g," ").replace(/^./,f=>f.toUpperCase()),p=`${/[[\](){}]/.test(l)?`"${l}"`:l} is expected`,m=this.tokenStart;switch(a){case 1:this.tokenType===2||this.tokenType===7?(m=this.tokenEnd-1,p="Identifier is expected but function found"):p="Identifier is expected";break;case 4:this.isDelim(vs)&&(this.next(),m++,p="Name is expected");break;case 11:this.tokenType===10&&(m=this.tokenEnd,p="Percent sign is expected");break}this.error(p,m);}this.next();},eatIdent(a){(this.tokenType!==1||this.lookupValue(0,a)===!1)&&this.error(`Identifier "${a}" is expected`),this.next();},eatDelim(a){this.isDelim(a)||this.error(`Delim "${String.fromCharCode(a)}" is expected`),this.next();},getLocation(a,l){return n?s.getLocationRange(a,l,r):null},getLocationFromList(a){if(n){let l=this.getFirstListNode(a),p=this.getLastListNode(a);return s.getLocationRange(l!==null?l.loc.start.offset-s.startOffset:this.tokenStart,p!==null?p.loc.end.offset-s.startOffset:this.tokenStart,r)}return null},error(a,l){let p=typeof l!="undefined"&&l<t.length?s.getLocation(l):this.eof?s.getLocation(Yo(t,t.length-1)):s.getLocation(this.tokenStart);throw new Zr(a||"Unexpected input",t,p.offset,p.line,p.column)}});return Object.assign(function(a,l){t=a,l=l||{},u.setSource(t,Se),s.setSource(t,l.offset,l.line,l.column),r=l.filename||"<unknown>",n=Boolean(l.positions),o=typeof l.onParseError=="function"?l.onParseError:Jo,i=!1,u.parseAtrulePrelude="parseAtrulePrelude"in l?Boolean(l.parseAtrulePrelude):!0,u.parseRulePrelude="parseRulePrelude"in l?Boolean(l.parseRulePrelude):!0,u.parseValue="parseValue"in l?Boolean(l.parseValue):!0,u.parseCustomProperty="parseCustomProperty"in l?Boolean(l.parseCustomProperty):!1;let{context:p="default",onComment:m}=l;if(!(p in u.context))throw new Error("Unknown context `"+p+"`");typeof m=="function"&&u.forEachToken((I,re,$)=>{if(I===25){let S=u.getLocation(re,$),F=be(t,$-2,$,"*/")?t.slice(re+2,$-2):t.slice(re+2,$);m(F,S);}});let f=u.context[p].call(u,l);return u.eof||u.error(),f},{SyntaxError:Zr,config:u.config})}var Si=ms(wi(),1),vi=new Set(["Atrule","Selector","Declaration"]);function Ci(e){let t=new Si.SourceMapGenerator,r={line:1,column:0},n={line:0,column:0},o={line:1,column:0},i={generated:o},s=1,u=0,c=!1,a=e.node;e.node=function(m){if(m.loc&&m.loc.start&&vi.has(m.type)){let f=m.loc.start.line,I=m.loc.start.column-1;(n.line!==f||n.column!==I)&&(n.line=f,n.column=I,r.line=s,r.column=u,c&&(c=!1,(r.line!==o.line||r.column!==o.column)&&t.addMapping(i)),c=!0,t.addMapping({source:m.loc.source,original:n,generated:r}));}a.call(this,m),c&&vi.has(m.type)&&(o.line=s,o.column=u);};let l=e.emit;e.emit=function(m,f,I){for(let re=0;re<m.length;re++)m.charCodeAt(re)===10?(s++,u=0):u++;l(m,f,I);};let p=e.result;return e.result=function(){return c&&t.addMapping(i),{css:p(),map:t}},e}var Nt={};b(Nt,{safe:()=>cn,spec:()=>Gs});var Ws=43,Hs=45,ln=(e,t)=>{if(e===9&&(e=t),typeof e=="string"){let r=e.charCodeAt(0);return r>127?32768:r<<8}return e},Ai=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,10],[1,11],[1,12],[1,15],[1,21],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,10],[3,11],[3,12],[3,15],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,10],[4,11],[4,12],[4,15],[12,1],[12,2],[12,7],[12,8],[12,"-"],[12,10],[12,11],[12,12],[12,15],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",10],["#",11],["#",12],["#",15],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",10],["-",11],["-",12],["-",15],[10,1],[10,2],[10,7],[10,8],[10,10],[10,11],[10,12],[10,"%"],[10,15],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",15],[".",10],[".",11],[".",12],["+",10],["+",11],["+",12],["/","*"]],Ys=Ai.concat([[1,4],[12,4],[4,4],[3,21],[3,5],[3,16],[11,11],[11,12],[11,2],[11,"-"],[22,1],[22,2],[22,11],[22,12],[22,4],[22,"-"]]);function Ti(e){let t=new Set(e.map(([r,n])=>ln(r)<<16|ln(n)));return function(r,n,o){let i=ln(n,o),s=o.charCodeAt(0);return (s===Hs&&n!==1&&n!==2&&n!==15||s===Ws?t.has(r<<16|s<<8):t.has(r<<16|i))&&this.emit(" ",13,!0),i}}var Gs=Ti(Ai),cn=Ti(Ys);var Vs=92;function Ks(e,t){if(typeof t=="function"){let r=null;e.children.forEach(n=>{r!==null&&t.call(this,r),this.node(n),r=n;});return}e.children.forEach(this.node,this);}function Qs(e){Se(e,(t,r,n)=>{this.token(t,e.slice(r,n));});}function Ei(e){let t=new Map;for(let r in e.node){let n=e.node[r];typeof(n.generate||n)=="function"&&t.set(r,n.generate||n);}return function(r,n){let o="",i=0,s={node(c){if(t.has(c.type))t.get(c.type).call(u,c);else throw new Error("Unknown node type: "+c.type)},tokenBefore:cn,token(c,a){i=this.tokenBefore(i,c,a),this.emit(a,c,!1),c===9&&a.charCodeAt(0)===Vs&&this.emit(`
`,13,!0);},emit(c){o+=c;},result(){return o}};n&&(typeof n.decorator=="function"&&(s=n.decorator(s)),n.sourceMap&&(s=Ci(s)),n.mode in Nt&&(s.tokenBefore=Nt[n.mode]));let u={node:c=>s.node(c),children:Ks,token:(c,a)=>s.token(c,a),tokenize:Qs};return s.node(r),s.result()}}function Li(e){return {fromPlainObject(t){return e(t,{enter(r){r.children&&!(r.children instanceof O)&&(r.children=new O().fromArray(r.children));}}),t},toPlainObject(t){return e(t,{leave(r){r.children&&r.children instanceof O&&(r.children=r.children.toArray());}}),t}}}var{hasOwnProperty:un}=Object.prototype,at=function(){};function Pi(e){return typeof e=="function"?e:at}function Ii(e,t){return function(r,n,o){r.type===t&&e.call(this,r,n,o);}}function Xs(e,t){let r=t.structure,n=[];for(let o in r){if(un.call(r,o)===!1)continue;let i=r[o],s={name:o,type:!1,nullable:!1};Array.isArray(i)||(i=[i]);for(let u of i)u===null?s.nullable=!0:typeof u=="string"?s.type="node":Array.isArray(u)&&(s.type="list");s.type&&n.push(s);}return n.length?{context:t.walkContext,fields:n}:null}function $s(e){let t={};for(let r in e.node)if(un.call(e.node,r)){let n=e.node[r];if(!n.structure)throw new Error("Missed `structure` field in `"+r+"` node type definition");t[r]=Xs(r,n);}return t}function Di(e,t){let r=e.fields.slice(),n=e.context,o=typeof n=="string";return t&&r.reverse(),function(i,s,u,c){let a;o&&(a=s[n],s[n]=i);for(let l of r){let p=i[l.name];if(!l.nullable||p){if(l.type==="list"){if(t?p.reduceRight(c,!1):p.reduce(c,!1))return !0}else if(u(p))return !0}}o&&(s[n]=a);}}function Oi({StyleSheet:e,Atrule:t,Rule:r,Block:n,DeclarationList:o}){return {Atrule:{StyleSheet:e,Atrule:t,Rule:r,Block:n},Rule:{StyleSheet:e,Atrule:t,Rule:r,Block:n},Declaration:{StyleSheet:e,Atrule:t,Rule:r,Block:n,DeclarationList:o}}}function Ni(e){let t=$s(e),r={},n={},o=Symbol("break-walk"),i=Symbol("skip-node");for(let a in t)un.call(t,a)&&t[a]!==null&&(r[a]=Di(t[a],!1),n[a]=Di(t[a],!0));let s=Oi(r),u=Oi(n),c=function(a,l){function p(S,F,we){let M=m.call($,S,F,we);return M===o?!0:M===i?!1:!!(I.hasOwnProperty(S.type)&&I[S.type](S,$,p,re)||f.call($,S,F,we)===o)}let m=at,f=at,I=r,re=(S,F,we,M)=>S||p(F,we,M),$={break:o,skip:i,root:a,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null};if(typeof l=="function")m=l;else if(l&&(m=Pi(l.enter),f=Pi(l.leave),l.reverse&&(I=n),l.visit)){if(s.hasOwnProperty(l.visit))I=l.reverse?u[l.visit]:s[l.visit];else if(!t.hasOwnProperty(l.visit))throw new Error("Bad value `"+l.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")");m=Ii(m,l.visit),f=Ii(f,l.visit);}if(m===at&&f===at)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");p(a);};return c.break=o,c.skip=i,c.find=function(a,l){let p=null;return c(a,function(m,f,I){if(l.call(this,m,f,I))return p=m,o}),p},c.findLast=function(a,l){let p=null;return c(a,{reverse:!0,enter(m,f,I){if(l.call(this,m,f,I))return p=m,o}}),p},c.findAll=function(a,l){let p=[];return c(a,function(m,f,I){l.call(this,m,f,I)&&p.push(m);}),p},c}function Zs(e){return e}function Js(e){let{min:t,max:r,comma:n}=e;return t===0&&r===0?n?"#?":"*":t===0&&r===1?"?":t===1&&r===0?n?"#":"+":t===1&&r===1?"":(n?"#":"")+(t===r?"{"+t+"}":"{"+t+","+(r!==0?r:"")+"}")}function el(e){switch(e.type){case"Range":return " ["+(e.min===null?"-\u221E":e.min)+","+(e.max===null?"\u221E":e.max)+"]";default:throw new Error("Unknown node type `"+e.type+"`")}}function tl(e,t,r,n){let o=e.combinator===" "||n?e.combinator:" "+e.combinator+" ",i=e.terms.map(s=>pn(s,t,r,n)).join(o);return e.explicit||r?(n||i[0]===","?"[":"[ ")+i+(n?"]":" ]"):i}function pn(e,t,r,n){let o;switch(e.type){case"Group":o=tl(e,t,r,n)+(e.disallowEmpty?"!":"");break;case"Multiplier":return pn(e.term,t,r,n)+t(Js(e),e);case"Type":o="<"+e.name+(e.opts?t(el(e.opts),e.opts):"")+">";break;case"Property":o="<'"+e.name+"'>";break;case"Keyword":o=e.name;break;case"AtKeyword":o="@"+e.name;break;case"Function":o=e.name+"(";break;case"String":case"Token":o=e.value;break;case"Comma":o=",";break;default:throw new Error("Unknown node type `"+e.type+"`")}return t(o,e)}function Ie(e,t){let r=Zs,n=!1,o=!1;return typeof t=="function"?r=t:t&&(n=Boolean(t.forceBraces),o=Boolean(t.compact),typeof t.decorate=="function"&&(r=t.decorate)),pn(e,r,n,o)}var zi={offset:0,line:1,column:1};function rl(e,t){let r=e.tokens,n=e.longestMatch,o=n<r.length&&r[n].node||null,i=o!==t?o:null,s=0,u=0,c=0,a="",l,p;for(let m=0;m<r.length;m++){let f=r[m].value;m===n&&(u=f.length,s=a.length),i!==null&&r[m].node===i&&(m<=n?c++:c=0),a+=f;}return n===r.length||c>1?(l=zt(i||t,"end")||st(zi,a),p=st(l)):(l=zt(i,"start")||st(zt(t,"start")||zi,a.slice(0,s)),p=zt(i,"end")||st(l,a.substr(s,u))),{css:a,mismatchOffset:s,mismatchLength:u,start:l,end:p}}function zt(e,t){let r=e&&e.loc&&e.loc[t];return r?"line"in r?st(r):r:null}function st({offset:e,line:t,column:r},n){let o={offset:e,line:t,column:r};if(n){let i=n.split(/\n|\r\n?|\f/);o.offset+=n.length,o.line+=i.length-1,o.column=i.length===1?o.column+n.length:i.pop().length+1;}return o}var We=function(e,t){let r=Le("SyntaxReferenceError",e+(t?" `"+t+"`":""));return r.reference=t,r},Mi=function(e,t,r,n){let o=Le("SyntaxMatchError",e),{css:i,mismatchOffset:s,mismatchLength:u,start:c,end:a}=rl(n,r);return o.rawMessage=e,o.syntax=t?Ie(t):"<generic>",o.css=i,o.mismatchOffset=s,o.mismatchLength=u,o.message=e+`
  syntax: `+o.syntax+`
   value: `+(i||"<empty string>")+`
  --------`+new Array(o.mismatchOffset+1).join("-")+"^",Object.assign(o,c),o.loc={source:r&&r.loc&&r.loc.source||"<unknown>",start:c,end:a},o};var Mt=new Map,He=new Map,Rt=45,Ft=nl,hn=ol,Zm=mn;function Bt(e,t){return t=t||0,e.length-t>=2&&e.charCodeAt(t)===Rt&&e.charCodeAt(t+1)===Rt}function mn(e,t){if(t=t||0,e.length-t>=3&&e.charCodeAt(t)===Rt&&e.charCodeAt(t+1)!==Rt){let r=e.indexOf("-",t+2);if(r!==-1)return e.substring(t,r+1)}return ""}function nl(e){if(Mt.has(e))return Mt.get(e);let t=e.toLowerCase(),r=Mt.get(t);if(r===void 0){let n=Bt(t,0),o=n?"":mn(t,0);r=Object.freeze({basename:t.substr(o.length),name:t,prefix:o,vendor:o,custom:n});}return Mt.set(e,r),r}function ol(e){if(He.has(e))return He.get(e);let t=e,r=e[0];r==="/"?r=e[1]==="/"?"//":"/":r!=="_"&&r!=="*"&&r!=="$"&&r!=="#"&&r!=="+"&&r!=="&"&&(r="");let n=Bt(t,r.length);if(!n&&(t=t.toLowerCase(),He.has(t))){let u=He.get(t);return He.set(e,u),u}let o=n?"":mn(t,r.length),i=t.substr(0,r.length+o.length),s=Object.freeze({basename:t.substr(i.length),name:t.substr(r.length),hack:r,vendor:o,prefix:i,custom:n});return He.set(e,s),s}var _t=["initial","inherit","unset","revert","revert-layer"];var ct=43,me=45,fn=110,Ye=!0,al=!1;function gn(e,t){return e!==null&&e.type===9&&e.value.charCodeAt(0)===t}function lt(e,t,r){for(;e!==null&&(e.type===13||e.type===25);)e=r(++t);return t}function Ce(e,t,r,n){if(!e)return 0;let o=e.value.charCodeAt(t);if(o===ct||o===me){if(r)return 0;t++;}for(;t<e.value.length;t++)if(!_(e.value.charCodeAt(t)))return 0;return n+1}function dn(e,t,r){let n=!1,o=lt(e,t,r);if(e=r(o),e===null)return t;if(e.type!==10)if(gn(e,ct)||gn(e,me)){if(n=!0,o=lt(r(++o),o,r),e=r(o),e===null||e.type!==10)return 0}else return t;if(!n){let i=e.value.charCodeAt(0);if(i!==ct&&i!==me)return 0}return Ce(e,n?0:1,n,o)}function bn(e,t){let r=0;if(!e)return 0;if(e.type===10)return Ce(e,0,al,r);if(e.type===1&&e.value.charCodeAt(0)===me){if(!ge(e.value,1,fn))return 0;switch(e.value.length){case 2:return dn(t(++r),r,t);case 3:return e.value.charCodeAt(2)!==me?0:(r=lt(t(++r),r,t),e=t(r),Ce(e,0,Ye,r));default:return e.value.charCodeAt(2)!==me?0:Ce(e,3,Ye,r)}}else if(e.type===1||gn(e,ct)&&t(r+1).type===1){if(e.type!==1&&(e=t(++r)),e===null||!ge(e.value,0,fn))return 0;switch(e.value.length){case 1:return dn(t(++r),r,t);case 2:return e.value.charCodeAt(1)!==me?0:(r=lt(t(++r),r,t),e=t(r),Ce(e,0,Ye,r));default:return e.value.charCodeAt(1)!==me?0:Ce(e,2,Ye,r)}}else if(e.type===12){let n=e.value.charCodeAt(0),o=n===ct||n===me?1:0,i=o;for(;i<e.value.length&&_(e.value.charCodeAt(i));i++);return i===o||!ge(e.value,i,fn)?0:i+1===e.value.length?dn(t(++r),r,t):e.value.charCodeAt(i+1)!==me?0:i+2===e.value.length?(r=lt(t(++r),r,t),e=t(r),Ce(e,0,Ye,r)):Ce(e,i+2,Ye,r)}return 0}var sl=43,Ri=45,Fi=63,ll=117;function xn(e,t){return e!==null&&e.type===9&&e.value.charCodeAt(0)===t}function cl(e,t){return e.value.charCodeAt(0)===t}function ut(e,t,r){let n=0;for(let o=t;o<e.value.length;o++){let i=e.value.charCodeAt(o);if(i===Ri&&r&&n!==0)return ut(e,t+n+1,!1),6;if(!te(i)||++n>6)return 0}return n}function Ut(e,t,r){if(!e)return 0;for(;xn(r(t),Fi);){if(++e>6)return 0;t++;}return t}function yn(e,t){let r=0;if(e===null||e.type!==1||!ge(e.value,0,ll)||(e=t(++r),e===null))return 0;if(xn(e,sl))return e=t(++r),e===null?0:e.type===1?Ut(ut(e,0,!0),++r,t):xn(e,Fi)?Ut(1,++r,t):0;if(e.type===10){let n=ut(e,1,!0);return n===0?0:(e=t(++r),e===null?r:e.type===12||e.type===10?!cl(e,Ri)||!ut(e,1,!1)?0:r+1:Ut(n,r,t))}return e.type===12?Ut(ut(e,1,!0),++r,t):0}var ul=["calc(","-moz-calc(","-webkit-calc("],kn=new Map([[2,22],[21,22],[19,20],[23,24]]);function ce(e,t){return t<e.length?e.charCodeAt(t):0}function Bi(e,t){return be(e,0,e.length,t)}function _i(e,t){for(let r=0;r<t.length;r++)if(Bi(e,t[r]))return !0;return !1}function Ui(e,t){return t!==e.length-2?!1:ce(e,t)===92&&_(ce(e,t+1))}function jt(e,t,r){if(e&&e.type==="Range"){let n=Number(r!==void 0&&r!==t.length?t.substr(0,r):t);if(isNaN(n)||e.min!==null&&n<e.min&&typeof e.min!="string"||e.max!==null&&n>e.max&&typeof e.max!="string")return !0}return !1}function pl(e,t){let r=0,n=[],o=0;e:do{switch(e.type){case 24:case 22:case 20:if(e.type!==r)break e;if(r=n.pop(),n.length===0){o++;break e}break;case 2:case 21:case 19:case 23:n.push(r),r=kn.get(e.type);break}o++;}while(e=t(o));return o}function ae(e){return function(t,r,n){return t===null?0:t.type===2&&_i(t.value,ul)?pl(t,r):e(t,r,n)}}function z(e){return function(t){return t===null||t.type!==e?0:1}}function hl(e){if(e===null||e.type!==1)return 0;let t=e.value.toLowerCase();return _i(t,_t)||Bi(t,"default")?0:1}function ml(e){return e===null||e.type!==1||ce(e.value,0)!==45||ce(e.value,1)!==45?0:1}function fl(e){if(e===null||e.type!==4)return 0;let t=e.value.length;if(t!==4&&t!==5&&t!==7&&t!==9)return 0;for(let r=1;r<t;r++)if(!te(ce(e.value,r)))return 0;return 1}function dl(e){return e===null||e.type!==4||!Re(ce(e.value,1),ce(e.value,2),ce(e.value,3))?0:1}function gl(e,t){if(!e)return 0;let r=0,n=[],o=0;e:do{switch(e.type){case 6:case 8:break e;case 24:case 22:case 20:if(e.type!==r)break e;r=n.pop();break;case 17:if(r===0)break e;break;case 9:if(r===0&&e.value==="!")break e;break;case 2:case 21:case 19:case 23:n.push(r),r=kn.get(e.type);break}o++;}while(e=t(o));return o}function bl(e,t){if(!e)return 0;let r=0,n=[],o=0;e:do{switch(e.type){case 6:case 8:break e;case 24:case 22:case 20:if(e.type!==r)break e;r=n.pop();break;case 2:case 21:case 19:case 23:n.push(r),r=kn.get(e.type);break}o++;}while(e=t(o));return o}function ke(e){return e&&(e=new Set(e)),function(t,r,n){if(t===null||t.type!==12)return 0;let o=Ee(t.value,0);if(e!==null){let i=t.value.indexOf("\\",o),s=i===-1||!Ui(t.value,i)?t.value.substr(o):t.value.substring(o,i);if(e.has(s.toLowerCase())===!1)return 0}return jt(n,t.value,o)?0:1}}function xl(e,t,r){return e===null||e.type!==11||jt(r,e.value,e.value.length-1)?0:1}function ji(e){return typeof e!="function"&&(e=function(){return 0}),function(t,r,n){return t!==null&&t.type===10&&Number(t.value)===0?1:e(t,r,n)}}function yl(e,t,r){if(e===null)return 0;let n=Ee(e.value,0);return !(n===e.value.length)&&!Ui(e.value,n)||jt(r,e.value,n)?0:1}function kl(e,t,r){if(e===null||e.type!==10)return 0;let n=ce(e.value,0)===43||ce(e.value,0)===45?1:0;for(;n<e.value.length;n++)if(!_(ce(e.value,n)))return 0;return jt(r,e.value,n)?0:1}var wl={"ident-token":z(1),"function-token":z(2),"at-keyword-token":z(3),"hash-token":z(4),"string-token":z(5),"bad-string-token":z(6),"url-token":z(7),"bad-url-token":z(8),"delim-token":z(9),"number-token":z(10),"percentage-token":z(11),"dimension-token":z(12),"whitespace-token":z(13),"CDO-token":z(14),"CDC-token":z(15),"colon-token":z(16),"semicolon-token":z(17),"comma-token":z(18),"[-token":z(19),"]-token":z(20),"(-token":z(21),")-token":z(22),"{-token":z(23),"}-token":z(24)},vl={string:z(5),ident:z(1),percentage:ae(xl),zero:ji(),number:ae(yl),integer:ae(kl),"custom-ident":hl,"custom-property-name":ml,"hex-color":fl,"id-selector":dl,"an-plus-b":bn,urange:yn,"declaration-value":gl,"any-value":bl};function Sl(e){let{angle:t,decibel:r,frequency:n,flex:o,length:i,resolution:s,semitones:u,time:c}=e||{};return {dimension:ae(ke(null)),angle:ae(ke(t)),decibel:ae(ke(r)),frequency:ae(ke(n)),flex:ae(ke(o)),length:ae(ji(ke(i))),resolution:ae(ke(s)),semitones:ae(ke(u)),time:ae(ke(c))}}function qi(e){return C(C(C({},wl),vl),Sl(e))}var qt={};b(qt,{angle:()=>Al,decibel:()=>Il,flex:()=>Pl,frequency:()=>El,length:()=>Cl,resolution:()=>Ll,semitones:()=>Dl,time:()=>Tl});var Cl=["cm","mm","q","in","pt","pc","px","em","rem","ex","rex","cap","rcap","ch","rch","ic","ric","lh","rlh","vw","svw","lvw","dvw","vh","svh","lvh","dvh","vi","svi","lvi","dvi","vb","svb","lvb","dvb","vmin","svmin","lvmin","dvmin","vmax","svmax","lvmax","dvmax","cqw","cqh","cqi","cqb","cqmin","cqmax"],Al=["deg","grad","rad","turn"],Tl=["s","ms"],El=["hz","khz"],Ll=["dpi","dpcm","dppx","x"],Pl=["fr"],Il=["db"],Dl=["st"];var Ln={};b(Ln,{SyntaxError:()=>Wt,generate:()=>Ie,parse:()=>Ke,walk:()=>Xt});function Wt(e,t,r){return Object.assign(Le("SyntaxError",e),{input:t,offset:r,rawMessage:e,message:e+`
  `+t+`
--`+new Array((r||t.length)+1).join("-")+"^"})}var Ol=9,Nl=10,zl=12,Ml=13,Rl=32,Ht=class{constructor(t){this.str=t,this.pos=0;}charCodeAt(t){return t<this.str.length?this.str.charCodeAt(t):0}charCode(){return this.charCodeAt(this.pos)}nextCharCode(){return this.charCodeAt(this.pos+1)}nextNonWsCode(t){return this.charCodeAt(this.findWsEnd(t))}findWsEnd(t){for(;t<this.str.length;t++){let r=this.str.charCodeAt(t);if(r!==Ml&&r!==Nl&&r!==zl&&r!==Rl&&r!==Ol)break}return t}substringToPos(t){return this.str.substring(this.pos,this.pos=t)}eat(t){this.charCode()!==t&&this.error("Expect `"+String.fromCharCode(t)+"`"),this.pos++;}peek(){return this.pos<this.str.length?this.str.charAt(this.pos++):""}error(t){throw new Wt(t,this.str,this.pos)}};var Fl=9,Bl=10,_l=12,Ul=13,jl=32,Xi=33,Sn=35,Wi=38,Yt=39,$i=40,ql=41,Zi=42,Cn=43,An=44,Hi=45,Tn=60,Ji=62,vn=63,Wl=64,Qt=91,En=93,Gt=123,Yi=124,Gi=125,Vi=8734,pt=new Uint8Array(128).map((e,t)=>/[a-zA-Z0-9\-]/.test(String.fromCharCode(t))?1:0),Ki={" ":1,"&&":2,"||":3,"|":4};function Vt(e){return e.substringToPos(e.findWsEnd(e.pos))}function Ge(e){let t=e.pos;for(;t<e.str.length;t++){let r=e.str.charCodeAt(t);if(r>=128||pt[r]===0)break}return e.pos===t&&e.error("Expect a keyword"),e.substringToPos(t)}function Kt(e){let t=e.pos;for(;t<e.str.length;t++){let r=e.str.charCodeAt(t);if(r<48||r>57)break}return e.pos===t&&e.error("Expect a number"),e.substringToPos(t)}function Hl(e){let t=e.str.indexOf("'",e.pos+1);return t===-1&&(e.pos=e.str.length,e.error("Expect an apostrophe")),e.substringToPos(t+1)}function Qi(e){let t=null,r=null;return e.eat(Gt),t=Kt(e),e.charCode()===An?(e.pos++,e.charCode()!==Gi&&(r=Kt(e))):r=t,e.eat(Gi),{min:Number(t),max:r?Number(r):0}}function Yl(e){let t=null,r=!1;switch(e.charCode()){case Zi:e.pos++,t={min:0,max:0};break;case Cn:e.pos++,t={min:1,max:0};break;case vn:e.pos++,t={min:0,max:1};break;case Sn:e.pos++,r=!0,e.charCode()===Gt?t=Qi(e):e.charCode()===vn?(e.pos++,t={min:0,max:0}):t={min:1,max:0};break;case Gt:t=Qi(e);break;default:return null}return {type:"Multiplier",comma:r,min:t.min,max:t.max,term:null}}function Ve(e,t){let r=Yl(e);return r!==null?(r.term=t,e.charCode()===Sn&&e.charCodeAt(e.pos-1)===Cn?Ve(e,r):r):t}function wn(e){let t=e.peek();return t===""?null:{type:"Token",value:t}}function Gl(e){let t;return e.eat(Tn),e.eat(Yt),t=Ge(e),e.eat(Yt),e.eat(Ji),Ve(e,{type:"Property",name:t})}function Vl(e){let t=null,r=null,n=1;return e.eat(Qt),e.charCode()===Hi&&(e.peek(),n=-1),n==-1&&e.charCode()===Vi?e.peek():(t=n*Number(Kt(e)),pt[e.charCode()]!==0&&(t+=Ge(e))),Vt(e),e.eat(An),Vt(e),e.charCode()===Vi?e.peek():(n=1,e.charCode()===Hi&&(e.peek(),n=-1),r=n*Number(Kt(e)),pt[e.charCode()]!==0&&(r+=Ge(e))),e.eat(En),{type:"Range",min:t,max:r}}function Kl(e){let t,r=null;return e.eat(Tn),t=Ge(e),e.charCode()===$i&&e.nextCharCode()===ql&&(e.pos+=2,t+="()"),e.charCodeAt(e.findWsEnd(e.pos))===Qt&&(Vt(e),r=Vl(e)),e.eat(Ji),Ve(e,{type:"Type",name:t,opts:r})}function Ql(e){let t=Ge(e);return e.charCode()===$i?(e.pos++,{type:"Function",name:t}):Ve(e,{type:"Keyword",name:t})}function Xl(e,t){function r(o,i){return {type:"Group",terms:o,combinator:i,disallowEmpty:!1,explicit:!1}}let n;for(t=Object.keys(t).sort((o,i)=>Ki[o]-Ki[i]);t.length>0;){n=t.shift();let o=0,i=0;for(;o<e.length;o++){let s=e[o];s.type==="Combinator"&&(s.value===n?(i===-1&&(i=o-1),e.splice(o,1),o--):(i!==-1&&o-i>1&&(e.splice(i,o-i,r(e.slice(i,o),n)),o=i+1),i=-1));}i!==-1&&t.length&&e.splice(i,o-i,r(e.slice(i,o),n));}return n}function ea(e){let t=[],r={},n,o=null,i=e.pos;for(;n=Zl(e);)n.type!=="Spaces"&&(n.type==="Combinator"?((o===null||o.type==="Combinator")&&(e.pos=i,e.error("Unexpected combinator")),r[n.value]=!0):o!==null&&o.type!=="Combinator"&&(r[" "]=!0,t.push({type:"Combinator",value:" "})),t.push(n),o=n,i=e.pos);return o!==null&&o.type==="Combinator"&&(e.pos-=i,e.error("Unexpected combinator")),{type:"Group",terms:t,combinator:Xl(t,r)||" ",disallowEmpty:!1,explicit:!1}}function $l(e){let t;return e.eat(Qt),t=ea(e),e.eat(En),t.explicit=!0,e.charCode()===Xi&&(e.pos++,t.disallowEmpty=!0),t}function Zl(e){let t=e.charCode();if(t<128&&pt[t]===1)return Ql(e);switch(t){case En:break;case Qt:return Ve(e,$l(e));case Tn:return e.nextCharCode()===Yt?Gl(e):Kl(e);case Yi:return {type:"Combinator",value:e.substringToPos(e.pos+(e.nextCharCode()===Yi?2:1))};case Wi:return e.pos++,e.eat(Wi),{type:"Combinator",value:"&&"};case An:return e.pos++,{type:"Comma"};case Yt:return Ve(e,{type:"String",value:Hl(e)});case jl:case Fl:case Bl:case Ul:case _l:return {type:"Spaces",value:Vt(e)};case Wl:return t=e.nextCharCode(),t<128&&pt[t]===1?(e.pos++,{type:"AtKeyword",name:Ge(e)}):wn(e);case Zi:case Cn:case vn:case Sn:case Xi:break;case Gt:if(t=e.nextCharCode(),t<48||t>57)return wn(e);break;default:return wn(e)}}function Ke(e){let t=new Ht(e),r=ea(t);return t.pos!==e.length&&t.error("Unexpected input"),r.terms.length===1&&r.terms[0].type==="Group"?r.terms[0]:r}var ht=function(){};function ta(e){return typeof e=="function"?e:ht}function Xt(e,t,r){function n(s){switch(o.call(r,s),s.type){case"Group":s.terms.forEach(n);break;case"Multiplier":n(s.term);break;case"Type":case"Property":case"Keyword":case"AtKeyword":case"Function":case"String":case"Token":case"Comma":break;default:throw new Error("Unknown type: "+s.type)}i.call(r,s);}let o=ht,i=ht;if(typeof t=="function"?o=t:t&&(o=ta(t.enter),i=ta(t.leave)),o===ht&&i===ht)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");n(e);}var Jl={decorator(e){let t=[],r=null;return kt(C({},e),{node(n){let o=r;r=n,e.node.call(this,n),r=o;},emit(n,o,i){t.push({type:o,value:n,node:i?null:r});},result(){return t}})}};function ec(e){let t=[];return Se(e,(r,n,o)=>t.push({type:r,value:e.slice(n,o),node:null})),t}function ra(e,t){return typeof e=="string"?ec(e):t.generate(e,Jl)}var A={type:"Match"},P={type:"Mismatch"},$t={type:"DisallowEmpty"},tc=40,rc=41;function J(e,t,r){return t===A&&r===P||e===A&&t===A&&r===A?e:(e.type==="If"&&e.else===P&&t===A&&(t=e.then,e=e.match),{type:"If",match:e,then:t,else:r})}function oa(e){return e.length>2&&e.charCodeAt(e.length-2)===tc&&e.charCodeAt(e.length-1)===rc}function na(e){return e.type==="Keyword"||e.type==="AtKeyword"||e.type==="Function"||e.type==="Type"&&oa(e.name)}function Pn(e,t,r){switch(e){case" ":{let n=A;for(let o=t.length-1;o>=0;o--){let i=t[o];n=J(i,n,P);}return n}case"|":{let n=P,o=null;for(let i=t.length-1;i>=0;i--){let s=t[i];if(na(s)&&(o===null&&i>0&&na(t[i-1])&&(o=Object.create(null),n=J({type:"Enum",map:o},A,n)),o!==null)){let u=(oa(s.name)?s.name.slice(0,-1):s.name).toLowerCase();if(!(u in o)){o[u]=s;continue}}o=null,n=J(s,A,n);}return n}case"&&":{if(t.length>5)return {type:"MatchOnce",terms:t,all:!0};let n=P;for(let o=t.length-1;o>=0;o--){let i=t[o],s;t.length>1?s=Pn(e,t.filter(function(u){return u!==i}),!1):s=A,n=J(i,s,n);}return n}case"||":{if(t.length>5)return {type:"MatchOnce",terms:t,all:!1};let n=r?A:P;for(let o=t.length-1;o>=0;o--){let i=t[o],s;t.length>1?s=Pn(e,t.filter(function(u){return u!==i}),!0):s=A,n=J(i,s,n);}return n}}}function nc(e){let t=A,r=In(e.term);if(e.max===0)r=J(r,$t,P),t=J(r,null,P),t.then=J(A,A,t),e.comma&&(t.then.else=J({type:"Comma",syntax:e},t,P));else for(let n=e.min||1;n<=e.max;n++)e.comma&&t!==A&&(t=J({type:"Comma",syntax:e},t,P)),t=J(r,J(A,A,t),P);if(e.min===0)t=J(A,A,t);else for(let n=0;n<e.min-1;n++)e.comma&&t!==A&&(t=J({type:"Comma",syntax:e},t,P)),t=J(r,t,P);return t}function In(e){if(typeof e=="function")return {type:"Generic",fn:e};switch(e.type){case"Group":{let t=Pn(e.combinator,e.terms.map(In),!1);return e.disallowEmpty&&(t=J(t,$t,P)),t}case"Multiplier":return nc(e);case"Type":case"Property":return {type:e.type,name:e.name,syntax:e};case"Keyword":return {type:e.type,name:e.name.toLowerCase(),syntax:e};case"AtKeyword":return {type:e.type,name:"@"+e.name.toLowerCase(),syntax:e};case"Function":return {type:e.type,name:e.name.toLowerCase()+"(",syntax:e};case"String":return e.value.length===3?{type:"Token",value:e.value.charAt(1),syntax:e}:{type:e.type,value:e.value.substr(1,e.value.length-2).replace(/\\'/g,"'"),syntax:e};case"Token":return {type:e.type,value:e.value,syntax:e};case"Comma":return {type:e.type,syntax:e};default:throw new Error("Unknown node type:",e.type)}}function Zt(e,t){return typeof e=="string"&&(e=Ke(e)),{type:"MatchGraph",match:In(e),syntax:t||null,source:e}}var {hasOwnProperty:ia}=Object.prototype,oc=0,ic=1,On=2,ua=3,aa="Match",ac="Mismatch",sc="Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)",sa=15e3;function cc(e){let t=null,r=null,n=e;for(;n!==null;)r=n.prev,n.prev=t,t=n,n=r;return t}function Dn(e,t){if(e.length!==t.length)return !1;for(let r=0;r<e.length;r++){let n=t.charCodeAt(r),o=e.charCodeAt(r);if(o>=65&&o<=90&&(o=o|32),o!==n)return !1}return !0}function uc(e){return e.type!==9?!1:e.value!=="?"}function la(e){return e===null?!0:e.type===18||e.type===2||e.type===21||e.type===19||e.type===23||uc(e)}function ca(e){return e===null?!0:e.type===22||e.type===20||e.type===24||e.type===9&&e.value==="/"}function pc(e,t,r){function n(){do F++,S=F<e.length?e[F]:null;while(S!==null&&(S.type===13||S.type===25))}function o(se){let de=F+se;return de<e.length?e[de]:null}function i(se,de){return {nextState:se,matchStack:M,syntaxStack:p,thenStack:m,tokenIndex:F,prev:de}}function s(se){m={nextState:se,matchStack:M,syntaxStack:p,prev:m};}function u(se){f=i(se,f);}function c(){M={type:ic,syntax:t.syntax,token:S,prev:M},n(),I=null,F>we&&(we=F);}function a(){p={syntax:t.syntax,opts:t.syntax.opts||p!==null&&p.opts||null,prev:p},M={type:On,syntax:t.syntax,token:M.token,prev:M};}function l(){M.type===On?M=M.prev:M={type:ua,syntax:p.syntax,token:M.token,prev:M},p=p.prev;}let p=null,m=null,f=null,I=null,re=0,$=null,S=null,F=-1,we=0,M={type:oc,syntax:null,token:null,prev:null};for(n();$===null&&++re<sa;)switch(t.type){case"Match":if(m===null){if(S!==null&&(F!==e.length-1||S.value!=="\\0"&&S.value!=="\\9")){t=P;break}$=aa;break}if(t=m.nextState,t===$t)if(m.matchStack===M){t=P;break}else t=A;for(;m.syntaxStack!==p;)l();m=m.prev;break;case"Mismatch":if(I!==null&&I!==!1)(f===null||F>f.tokenIndex)&&(f=I,I=!1);else if(f===null){$=ac;break}t=f.nextState,m=f.thenStack,p=f.syntaxStack,M=f.matchStack,F=f.tokenIndex,S=F<e.length?e[F]:null,f=f.prev;break;case"MatchGraph":t=t.match;break;case"If":t.else!==P&&u(t.else),t.then!==A&&s(t.then),t=t.match;break;case"MatchOnce":t={type:"MatchOnceBuffer",syntax:t,index:0,mask:0};break;case"MatchOnceBuffer":{let X=t.syntax.terms;if(t.index===X.length){if(t.mask===0||t.syntax.all){t=P;break}t=A;break}if(t.mask===(1<<X.length)-1){t=A;break}for(;t.index<X.length;t.index++){let ee=1<<t.index;if((t.mask&ee)===0){u(t),s({type:"AddMatchOnce",syntax:t.syntax,mask:t.mask|ee}),t=X[t.index++];break}}break}case"AddMatchOnce":t={type:"MatchOnceBuffer",syntax:t.syntax,index:0,mask:t.mask};break;case"Enum":if(S!==null){let X=S.value.toLowerCase();if(X.indexOf("\\")!==-1&&(X=X.replace(/\\[09].*$/,"")),ia.call(t.map,X)){t=t.map[X];break}}t=P;break;case"Generic":{let X=p!==null?p.opts:null,ee=F+Math.floor(t.fn(S,o,X));if(!isNaN(ee)&&ee>F){for(;F<ee;)c();t=A;}else t=P;break}case"Type":case"Property":{let X=t.type==="Type"?"types":"properties",ee=ia.call(r,X)?r[X][t.name]:null;if(!ee||!ee.match)throw new Error("Bad syntax reference: "+(t.type==="Type"?"<"+t.name+">":"<'"+t.name+"'>"));if(I!==!1&&S!==null&&t.type==="Type"&&(t.name==="custom-ident"&&S.type===1||t.name==="length"&&S.value==="0")){I===null&&(I=i(t,f)),t=P;break}a(),t=ee.match;break}case"Keyword":{let X=t.name;if(S!==null){let ee=S.value;if(ee.indexOf("\\")!==-1&&(ee=ee.replace(/\\[09].*$/,"")),Dn(ee,X)){c(),t=A;break}}t=P;break}case"AtKeyword":case"Function":if(S!==null&&Dn(S.value,t.name)){c(),t=A;break}t=P;break;case"Token":if(S!==null&&S.value===t.value){c(),t=A;break}t=P;break;case"Comma":S!==null&&S.type===18?la(M.token)?t=P:(c(),t=ca(S)?P:A):t=la(M.token)||ca(S)?A:P;break;case"String":let se="",de=F;for(;de<e.length&&se.length<t.value.length;de++)se+=e[de].value;if(Dn(se,t.value)){for(;F<de;)c();t=A;}else t=P;break;default:throw new Error("Unknown node type: "+t.type)}switch($){case null:console.warn("[csstree-match] BREAK after "+sa+" iterations"),$=sc,M=null;break;case aa:for(;p!==null;)l();break;default:M=null;}return {tokens:e,reason:$,iterations:re,match:M,longestMatch:we}}function Nn(e,t,r){let n=pc(e,t,r||{});if(n.match===null)return n;let o=n.match,i=n.match={syntax:t.syntax||null,match:[]},s=[i];for(o=cc(o).prev;o!==null;){switch(o.type){case On:i.match.push(i={syntax:o.syntax,match:[]}),s.push(i);break;case ua:s.pop(),i=s[s.length-1];break;default:i.match.push({syntax:o.syntax||null,token:o.token.value,node:o.token.node});}o=o.prev;}return n}var Mn={};b(Mn,{getTrace:()=>pa,isKeyword:()=>fc,isProperty:()=>mc,isType:()=>hc});function pa(e){function t(o){return o===null?!1:o.type==="Type"||o.type==="Property"||o.type==="Keyword"}function r(o){if(Array.isArray(o.match)){for(let i=0;i<o.match.length;i++)if(r(o.match[i]))return t(o.syntax)&&n.unshift(o.syntax),!0}else if(o.node===e)return n=t(o.syntax)?[o.syntax]:[],!0;return !1}let n=null;return this.matched!==null&&r(this.matched),n}function hc(e,t){return zn(this,e,r=>r.type==="Type"&&r.name===t)}function mc(e,t){return zn(this,e,r=>r.type==="Property"&&r.name===t)}function fc(e){return zn(this,e,t=>t.type==="Keyword")}function zn(e,t,r){let n=pa.call(e,t);return n===null?!1:n.some(r)}function ha(e){return "node"in e?e.node:ha(e.match[0])}function ma(e){return "node"in e?e.node:ma(e.match[e.match.length-1])}function Rn(e,t,r,n,o){function i(u){if(u.syntax!==null&&u.syntax.type===n&&u.syntax.name===o){let c=ha(u),a=ma(u);e.syntax.walk(t,function(l,p,m){if(l===c){let f=new O;do{if(f.appendData(p.data),p.data===a)break;p=p.next;}while(p!==null);s.push({parent:m,nodes:f});}});}Array.isArray(u.match)&&u.match.forEach(i);}let s=[];return r.matched!==null&&i(r.matched),s}var{hasOwnProperty:mt}=Object.prototype;function Fn(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e&&e>=0}function fa(e){return Boolean(e)&&Fn(e.offset)&&Fn(e.line)&&Fn(e.column)}function dc(e,t){return function(n,o){if(!n||n.constructor!==Object)return o(n,"Type of node should be an Object");for(let i in n){let s=!0;if(mt.call(n,i)!==!1){if(i==="type")n.type!==e&&o(n,"Wrong node type `"+n.type+"`, expected `"+e+"`");else if(i==="loc"){if(n.loc===null)continue;if(n.loc&&n.loc.constructor===Object)if(typeof n.loc.source!="string")i+=".source";else if(!fa(n.loc.start))i+=".start";else if(!fa(n.loc.end))i+=".end";else continue;s=!1;}else if(t.hasOwnProperty(i)){s=!1;for(let u=0;!s&&u<t[i].length;u++){let c=t[i][u];switch(c){case String:s=typeof n[i]=="string";break;case Boolean:s=typeof n[i]=="boolean";break;case null:s=n[i]===null;break;default:typeof c=="string"?s=n[i]&&n[i].type===c:Array.isArray(c)&&(s=n[i]instanceof O);}}}else o(n,"Unknown field `"+i+"` for "+e+" node type");s||o(n,"Bad value for `"+e+"."+i+"`");}}for(let i in t)mt.call(t,i)&&mt.call(n,i)===!1&&o(n,"Field `"+e+"."+i+"` is missed");}}function gc(e,t){let r=t.structure,n={type:String,loc:!0},o={type:'"'+e+'"'};for(let i in r){if(mt.call(r,i)===!1)continue;let s=[],u=n[i]=Array.isArray(r[i])?r[i].slice():[r[i]];for(let c=0;c<u.length;c++){let a=u[c];if(a===String||a===Boolean)s.push(a.name);else if(a===null)s.push("null");else if(typeof a=="string")s.push("<"+a+">");else if(Array.isArray(a))s.push("List");else throw new Error("Wrong value `"+a+"` in `"+e+"."+i+"` structure definition")}o[i]=s.join(" | ");}return {docs:o,check:dc(e,n)}}function da(e){let t={};if(e.node){for(let r in e.node)if(mt.call(e.node,r)){let n=e.node[r];if(n.structure)t[r]=gc(r,n);else throw new Error("Missed `structure` field in `"+r+"` node type definition")}}return t}var bc=Zt(_t.join(" | "));function Bn(e,t,r){let n={};for(let o in e)e[o].syntax&&(n[o]=r?e[o].syntax:Ie(e[o].syntax,{compact:t}));return n}function xc(e,t,r){let n={};for(let[o,i]of Object.entries(e))n[o]={prelude:i.prelude&&(r?i.prelude.syntax:Ie(i.prelude.syntax,{compact:t})),descriptors:i.descriptors&&Bn(i.descriptors,t,r)};return n}function yc(e){for(let t=0;t<e.length;t++)if(e[t].value.toLowerCase()==="var(")return !0;return !1}function ue(e,t,r){return C({matched:e,iterations:r,error:t},Mn)}function Qe(e,t,r,n){let o=ra(r,e.syntax),i;return yc(o)?ue(null,new Error("Matching for a tree with var() is not supported")):(n&&(i=Nn(o,e.cssWideKeywordsSyntax,e)),(!n||!i.match)&&(i=Nn(o,t.match,e),!i.match)?ue(null,new Mi(i.reason,t.syntax,r,i),i.iterations):ue(i.match,null,i.iterations))}var Xe=class{constructor(t,r,n){if(this.cssWideKeywordsSyntax=bc,this.syntax=r,this.generic=!1,this.units=C({},qt),this.atrules=Object.create(null),this.properties=Object.create(null),this.types=Object.create(null),this.structure=n||da(t),t){if(t.units)for(let o of Object.keys(qt))Array.isArray(t.units[o])&&(this.units[o]=t.units[o]);if(t.types)for(let o in t.types)this.addType_(o,t.types[o]);if(t.generic){this.generic=!0;for(let[o,i]of Object.entries(qi(this.units)))this.addType_(o,i);}if(t.atrules)for(let o in t.atrules)this.addAtrule_(o,t.atrules[o]);if(t.properties)for(let o in t.properties)this.addProperty_(o,t.properties[o]);}}checkStructure(t){function r(i,s){o.push({node:i,message:s});}let n=this.structure,o=[];return this.syntax.walk(t,function(i){n.hasOwnProperty(i.type)?n[i.type].check(i,r):r(i,"Unknown node type `"+i.type+"`");}),o.length?o:!1}createDescriptor(t,r,n,o=null){let i={type:r,name:n},s={type:r,name:n,parent:o,serializable:typeof t=="string"||t&&typeof t.type=="string",syntax:null,match:null};return typeof t=="function"?s.match=Zt(t,i):(typeof t=="string"?Object.defineProperty(s,"syntax",{get(){return Object.defineProperty(s,"syntax",{value:Ke(t)}),s.syntax}}):s.syntax=t,Object.defineProperty(s,"match",{get(){return Object.defineProperty(s,"match",{value:Zt(s.syntax,i)}),s.match}})),s}addAtrule_(t,r){!r||(this.atrules[t]={type:"Atrule",name:t,prelude:r.prelude?this.createDescriptor(r.prelude,"AtrulePrelude",t):null,descriptors:r.descriptors?Object.keys(r.descriptors).reduce((n,o)=>(n[o]=this.createDescriptor(r.descriptors[o],"AtruleDescriptor",o,t),n),Object.create(null)):null});}addProperty_(t,r){!r||(this.properties[t]=this.createDescriptor(r,"Property",t));}addType_(t,r){!r||(this.types[t]=this.createDescriptor(r,"Type",t));}checkAtruleName(t){if(!this.getAtrule(t))return new We("Unknown at-rule","@"+t)}checkAtrulePrelude(t,r){let n=this.checkAtruleName(t);if(n)return n;let o=this.getAtrule(t);if(!o.prelude&&r)return new SyntaxError("At-rule `@"+t+"` should not contain a prelude");if(o.prelude&&!r&&!Qe(this,o.prelude,"",!1).matched)return new SyntaxError("At-rule `@"+t+"` should contain a prelude")}checkAtruleDescriptorName(t,r){let n=this.checkAtruleName(t);if(n)return n;let o=this.getAtrule(t),i=Ft(r);if(!o.descriptors)return new SyntaxError("At-rule `@"+t+"` has no known descriptors");if(!o.descriptors[i.name]&&!o.descriptors[i.basename])return new We("Unknown at-rule descriptor",r)}checkPropertyName(t){if(!this.getProperty(t))return new We("Unknown property",t)}matchAtrulePrelude(t,r){let n=this.checkAtrulePrelude(t,r);if(n)return ue(null,n);let o=this.getAtrule(t);return o.prelude?Qe(this,o.prelude,r||"",!1):ue(null,null)}matchAtruleDescriptor(t,r,n){let o=this.checkAtruleDescriptorName(t,r);if(o)return ue(null,o);let i=this.getAtrule(t),s=Ft(r);return Qe(this,i.descriptors[s.name]||i.descriptors[s.basename],n,!1)}matchDeclaration(t){return t.type!=="Declaration"?ue(null,new Error("Not a Declaration node")):this.matchProperty(t.property,t.value)}matchProperty(t,r){if(hn(t).custom)return ue(null,new Error("Lexer matching doesn't applicable for custom properties"));let n=this.checkPropertyName(t);return n?ue(null,n):Qe(this,this.getProperty(t),r,!0)}matchType(t,r){let n=this.getType(t);return n?Qe(this,n,r,!1):ue(null,new We("Unknown type",t))}match(t,r){return typeof t!="string"&&(!t||!t.type)?ue(null,new We("Bad syntax")):((typeof t=="string"||!t.match)&&(t=this.createDescriptor(t,"Type","anonymous")),Qe(this,t,r,!1))}findValueFragments(t,r,n,o){return Rn(this,r,this.matchProperty(t,r),n,o)}findDeclarationValueFragments(t,r,n){return Rn(this,t.value,this.matchDeclaration(t),r,n)}findAllFragments(t,r,n){let o=[];return this.syntax.walk(t,{visit:"Declaration",enter:i=>{o.push.apply(o,this.findDeclarationValueFragments(i,r,n));}}),o}getAtrule(t,r=!0){let n=Ft(t);return (n.vendor&&r?this.atrules[n.name]||this.atrules[n.basename]:this.atrules[n.name])||null}getAtrulePrelude(t,r=!0){let n=this.getAtrule(t,r);return n&&n.prelude||null}getAtruleDescriptor(t,r){return this.atrules.hasOwnProperty(t)&&this.atrules.declarators&&this.atrules[t].declarators[r]||null}getProperty(t,r=!0){let n=hn(t);return (n.vendor&&r?this.properties[n.name]||this.properties[n.basename]:this.properties[n.name])||null}getType(t){return hasOwnProperty.call(this.types,t)?this.types[t]:null}validate(){function t(o,i,s,u){if(s.has(i))return s.get(i);s.set(i,!1),u.syntax!==null&&Xt(u.syntax,function(c){if(c.type!=="Type"&&c.type!=="Property")return;let a=c.type==="Type"?o.types:o.properties,l=c.type==="Type"?r:n;(!hasOwnProperty.call(a,c.name)||t(o,c.name,l,a[c.name]))&&s.set(i,!0);},this);}let r=new Map,n=new Map;for(let o in this.types)t(this,o,r,this.types[o]);for(let o in this.properties)t(this,o,n,this.properties[o]);return r=[...r.keys()].filter(o=>r.get(o)),n=[...n.keys()].filter(o=>n.get(o)),r.length||n.length?{types:r,properties:n}:null}dump(t,r){return {generic:this.generic,units:this.units,types:Bn(this.types,!r,t),properties:Bn(this.properties,!r,t),atrules:xc(this.atrules,!r,t)}}toString(){return JSON.stringify(this.dump())}};function _n(e,t){return typeof t=="string"&&/^\s*\|/.test(t)?typeof e=="string"?e+t:t.replace(/^\s*\|\s*/,""):t||null}function ga(e,t){let r=Object.create(null);for(let[n,o]of Object.entries(e))if(o){r[n]={};for(let i of Object.keys(o))t.includes(i)&&(r[n][i]=o[i]);}return r}function ft(e,t){let r=C({},e);for(let[n,o]of Object.entries(t))switch(n){case"generic":r[n]=Boolean(o);break;case"units":r[n]=C({},e[n]);for(let[i,s]of Object.entries(o))r[n][i]=Array.isArray(s)?s:[];break;case"atrules":r[n]=C({},e[n]);for(let[i,s]of Object.entries(o)){let u=r[n][i]||{},c=r[n][i]={prelude:u.prelude||null,descriptors:C({},u.descriptors)};if(!!s){c.prelude=s.prelude?_n(c.prelude,s.prelude):c.prelude||null;for(let[a,l]of Object.entries(s.descriptors||{}))c.descriptors[a]=l?_n(c.descriptors[a],l):null;Object.keys(c.descriptors).length||(c.descriptors=null);}}break;case"types":case"properties":r[n]=C({},e[n]);for(let[i,s]of Object.entries(o))r[n][i]=_n(r[n][i],s);break;case"scope":r[n]=C({},e[n]);for(let[i,s]of Object.entries(o))r[n][i]=C(C({},r[n][i]),s);break;case"parseContext":r[n]=C(C({},e[n]),o);break;case"atrule":case"pseudo":r[n]=C(C({},e[n]),ga(o,["parse"]));break;case"node":r[n]=C(C({},e[n]),ga(o,["name","structure","parse","generate","walkContext"]));break}return r}function ba(e){let t=ri(e),r=Ni(e),n=Ei(e),{fromPlainObject:o,toPlainObject:i}=Li(r),s={lexer:null,createLexer:u=>new Xe(u,s,s.lexer.structure),tokenize:Se,parse:t,generate:n,walk:r,find:r.find,findLast:r.findLast,findAll:r.findAll,fromPlainObject:o,toPlainObject:i,fork(u){let c=ft({},e);return ba(typeof u=="function"?u(c,Object.assign):ft(c,u))}};return s.lexer=new Xe({generic:!0,units:e.units,types:e.types,atrules:e.atrules,properties:e.properties,node:e.node},s),s}var Un=e=>ba(ft({},e));var xa={generic:!0,units:{angle:["deg","grad","rad","turn"],decibel:["db"],flex:["fr"],frequency:["hz","khz"],length:["cm","mm","q","in","pt","pc","px","em","rem","ex","rex","cap","rcap","ch","rch","ic","ric","lh","rlh","vw","svw","lvw","dvw","vh","svh","lvh","dvh","vi","svi","lvi","dvi","vb","svb","lvb","dvb","vmin","svmin","lvmin","dvmin","vmax","svmax","lvmax","dvmax","cqw","cqh","cqi","cqb","cqmin","cqmax"],resolution:["dpi","dpcm","dppx","x"],semitones:["st"],time:["s","ms"]},types:{"abs()":"abs( <calc-sum> )","absolute-size":"xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large","acos()":"acos( <calc-sum> )","alpha-value":"<number>|<percentage>","angle-percentage":"<angle>|<percentage>","angular-color-hint":"<angle-percentage>","angular-color-stop":"<color>&&<color-stop-angle>?","angular-color-stop-list":"[<angular-color-stop> [, <angular-color-hint>]?]# , <angular-color-stop>","animateable-feature":"scroll-position|contents|<custom-ident>","asin()":"asin( <calc-sum> )","atan()":"atan( <calc-sum> )","atan2()":"atan2( <calc-sum> , <calc-sum> )",attachment:"scroll|fixed|local","attr()":"attr( <attr-name> <type-or-unit>? [, <attr-fallback>]? )","attr-matcher":"['~'|'|'|'^'|'$'|'*']? '='","attr-modifier":"i|s","attribute-selector":"'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'","auto-repeat":"repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )","auto-track-list":"[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?",axis:"block|inline|vertical|horizontal","baseline-position":"[first|last]? baseline","basic-shape":"<inset()>|<circle()>|<ellipse()>|<polygon()>|<path()>","bg-image":"none|<image>","bg-layer":"<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>","bg-position":"[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]","bg-size":"[<length-percentage>|auto]{1,2}|cover|contain","blur()":"blur( <length> )","blend-mode":"normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity",box:"border-box|padding-box|content-box","brightness()":"brightness( <number-percentage> )","calc()":"calc( <calc-sum> )","calc-sum":"<calc-product> [['+'|'-'] <calc-product>]*","calc-product":"<calc-value> ['*' <calc-value>|'/' <number>]*","calc-value":"<number>|<dimension>|<percentage>|<calc-constant>|( <calc-sum> )","calc-constant":"e|pi|infinity|-infinity|NaN","cf-final-image":"<image>|<color>","cf-mixing-image":"<percentage>?&&<image>","circle()":"circle( [<shape-radius>]? [at <position>]? )","clamp()":"clamp( <calc-sum>#{3} )","class-selector":"'.' <ident-token>","clip-source":"<url>",color:"<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<hex-color>|<named-color>|currentcolor|<deprecated-system-color>","color-stop":"<color-stop-length>|<color-stop-angle>","color-stop-angle":"<angle-percentage>{1,2}","color-stop-length":"<length-percentage>{1,2}","color-stop-list":"[<linear-color-stop> [, <linear-color-hint>]?]# , <linear-color-stop>",combinator:"'>'|'+'|'~'|['||']","common-lig-values":"[common-ligatures|no-common-ligatures]","compat-auto":"searchfield|textarea|push-button|slider-horizontal|checkbox|radio|square-button|menulist|listbox|meter|progress-bar|button","composite-style":"clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor","compositing-operator":"add|subtract|intersect|exclude","compound-selector":"[<type-selector>? <subclass-selector>* [<pseudo-element-selector> <pseudo-class-selector>*]*]!","compound-selector-list":"<compound-selector>#","complex-selector":"<compound-selector> [<combinator>? <compound-selector>]*","complex-selector-list":"<complex-selector>#","conic-gradient()":"conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )","contextual-alt-values":"[contextual|no-contextual]","content-distribution":"space-between|space-around|space-evenly|stretch","content-list":"[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+","content-position":"center|start|end|flex-start|flex-end","content-replacement":"<image>","contrast()":"contrast( [<number-percentage>] )","cos()":"cos( <calc-sum> )",counter:"<counter()>|<counters()>","counter()":"counter( <counter-name> , <counter-style>? )","counter-name":"<custom-ident>","counter-style":"<counter-style-name>|symbols( )","counter-style-name":"<custom-ident>","counters()":"counters( <counter-name> , <string> , <counter-style>? )","cross-fade()":"cross-fade( <cf-mixing-image> , <cf-final-image>? )","cubic-bezier-timing-function":"ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )","deprecated-system-color":"ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText","discretionary-lig-values":"[discretionary-ligatures|no-discretionary-ligatures]","display-box":"contents|none","display-inside":"flow|flow-root|table|flex|grid|ruby","display-internal":"table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container","display-legacy":"inline-block|inline-list-item|inline-table|inline-flex|inline-grid","display-listitem":"<display-outside>?&&[flow|flow-root]?&&list-item","display-outside":"block|inline|run-in","drop-shadow()":"drop-shadow( <length>{2,3} <color>? )","east-asian-variant-values":"[jis78|jis83|jis90|jis04|simplified|traditional]","east-asian-width-values":"[full-width|proportional-width]","element()":"element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )","ellipse()":"ellipse( [<shape-radius>{2}]? [at <position>]? )","ending-shape":"circle|ellipse","env()":"env( <custom-ident> , <declaration-value>? )","exp()":"exp( <calc-sum> )","explicit-track-list":"[<line-names>? <track-size>]+ <line-names>?","family-name":"<string>|<custom-ident>+","feature-tag-value":"<string> [<integer>|on|off]?","feature-type":"@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation","feature-value-block":"<feature-type> '{' <feature-value-declaration-list> '}'","feature-value-block-list":"<feature-value-block>+","feature-value-declaration":"<custom-ident> : <integer>+ ;","feature-value-declaration-list":"<feature-value-declaration>","feature-value-name":"<custom-ident>","fill-rule":"nonzero|evenodd","filter-function":"<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>","filter-function-list":"[<filter-function>|<url>]+","final-bg-layer":"<'background-color'>||<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>","fixed-breadth":"<length-percentage>","fixed-repeat":"repeat( [<integer [1,\u221E]>] , [<line-names>? <fixed-size>]+ <line-names>? )","fixed-size":"<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )","font-stretch-absolute":"normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>","font-variant-css21":"[normal|small-caps]","font-weight-absolute":"normal|bold|<number [1,1000]>","frequency-percentage":"<frequency>|<percentage>","general-enclosed":"[<function-token> <any-value> )]|( <ident> <any-value> )","generic-family":"serif|sans-serif|cursive|fantasy|monospace|-apple-system","generic-name":"serif|sans-serif|cursive|fantasy|monospace","geometry-box":"<shape-box>|fill-box|stroke-box|view-box",gradient:"<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>","grayscale()":"grayscale( <number-percentage> )","grid-line":"auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]","historical-lig-values":"[historical-ligatures|no-historical-ligatures]","hsl()":"hsl( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )","hsla()":"hsla( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )",hue:"<number>|<angle>","hue-rotate()":"hue-rotate( <angle> )","hwb()":"hwb( [<hue>|none] [<percentage>|none] [<percentage>|none] [/ [<alpha-value>|none]]? )","hypot()":"hypot( <calc-sum># )",image:"<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>","image()":"image( <image-tags>? [<image-src>? , <color>?]! )","image-set()":"image-set( <image-set-option># )","image-set-option":"[<image>|<string>] [<resolution>||type( <string> )]","image-src":"<url>|<string>","image-tags":"ltr|rtl","inflexible-breadth":"<length-percentage>|min-content|max-content|auto","inset()":"inset( <length-percentage>{1,4} [round <'border-radius'>]? )","invert()":"invert( <number-percentage> )","keyframes-name":"<custom-ident>|<string>","keyframe-block":"<keyframe-selector># { <declaration-list> }","keyframe-block-list":"<keyframe-block>+","keyframe-selector":"from|to|<percentage>","lab()":"lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )","layer()":"layer( <layer-name> )","layer-name":"<ident> ['.' <ident>]*","lch()":"lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )","leader()":"leader( <leader-type> )","leader-type":"dotted|solid|space|<string>","length-percentage":"<length>|<percentage>","line-names":"'[' <custom-ident>* ']'","line-name-list":"[<line-names>|<name-repeat>]+","line-style":"none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset","line-width":"<length>|thin|medium|thick","linear-color-hint":"<length-percentage>","linear-color-stop":"<color> <color-stop-length>?","linear-gradient()":"linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )","log()":"log( <calc-sum> , <calc-sum>? )","mask-layer":"<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>","mask-position":"[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?","mask-reference":"none|<image>|<mask-source>","mask-source":"<url>","masking-mode":"alpha|luminance|match-source","matrix()":"matrix( <number>#{6} )","matrix3d()":"matrix3d( <number>#{16} )","max()":"max( <calc-sum># )","media-and":"<media-in-parens> [and <media-in-parens>]+","media-condition":"<media-not>|<media-and>|<media-or>|<media-in-parens>","media-condition-without-or":"<media-not>|<media-and>|<media-in-parens>","media-feature":"( [<mf-plain>|<mf-boolean>|<mf-range>] )","media-in-parens":"( <media-condition> )|<media-feature>|<general-enclosed>","media-not":"not <media-in-parens>","media-or":"<media-in-parens> [or <media-in-parens>]+","media-query":"<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?","media-query-list":"<media-query>#","media-type":"<ident>","mf-boolean":"<mf-name>","mf-name":"<ident>","mf-plain":"<mf-name> : <mf-value>","mf-range":"<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>","mf-value":"<number>|<dimension>|<ident>|<ratio>","min()":"min( <calc-sum># )","minmax()":"minmax( [<length-percentage>|min-content|max-content|auto] , [<length-percentage>|<flex>|min-content|max-content|auto] )","mod()":"mod( <calc-sum> , <calc-sum> )","name-repeat":"repeat( [<integer [1,\u221E]>|auto-fill] , <line-names>+ )","named-color":"transparent|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen|<-non-standard-color>","namespace-prefix":"<ident>","ns-prefix":"[<ident-token>|'*']? '|'","number-percentage":"<number>|<percentage>","numeric-figure-values":"[lining-nums|oldstyle-nums]","numeric-fraction-values":"[diagonal-fractions|stacked-fractions]","numeric-spacing-values":"[proportional-nums|tabular-nums]",nth:"<an-plus-b>|even|odd","opacity()":"opacity( [<number-percentage>] )","overflow-position":"unsafe|safe","outline-radius":"<length>|<percentage>","page-body":"<declaration>? [; <page-body>]?|<page-margin-box> <page-body>","page-margin-box":"<page-margin-box-type> '{' <declaration-list> '}'","page-margin-box-type":"@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom","page-selector-list":"[<page-selector>#]?","page-selector":"<pseudo-page>+|<ident> <pseudo-page>*","page-size":"A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger","path()":"path( [<fill-rule> ,]? <string> )","paint()":"paint( <ident> , <declaration-value>? )","perspective()":"perspective( [<length [0,\u221E]>|none] )","polygon()":"polygon( <fill-rule>? , [<length-percentage> <length-percentage>]# )",position:"[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]","pow()":"pow( <calc-sum> , <calc-sum> )","pseudo-class-selector":"':' <ident-token>|':' <function-token> <any-value> ')'","pseudo-element-selector":"':' <pseudo-class-selector>","pseudo-page":": [left|right|first|blank]",quote:"open-quote|close-quote|no-open-quote|no-close-quote","radial-gradient()":"radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",ratio:"<number [0,\u221E]> [/ <number [0,\u221E]>]?","relative-selector":"<combinator>? <complex-selector>","relative-selector-list":"<relative-selector>#","relative-size":"larger|smaller","rem()":"rem( <calc-sum> , <calc-sum> )","repeat-style":"repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}","repeating-conic-gradient()":"repeating-conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )","repeating-linear-gradient()":"repeating-linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )","repeating-radial-gradient()":"repeating-radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )","reversed-counter-name":"reversed( <counter-name> )","rgb()":"rgb( <percentage>{3} [/ <alpha-value>]? )|rgb( <number>{3} [/ <alpha-value>]? )|rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )","rgba()":"rgba( <percentage>{3} [/ <alpha-value>]? )|rgba( <number>{3} [/ <alpha-value>]? )|rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )","rotate()":"rotate( [<angle>|<zero>] )","rotate3d()":"rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )","rotateX()":"rotateX( [<angle>|<zero>] )","rotateY()":"rotateY( [<angle>|<zero>] )","rotateZ()":"rotateZ( [<angle>|<zero>] )","round()":"round( <rounding-strategy>? , <calc-sum> , <calc-sum> )","rounding-strategy":"nearest|up|down|to-zero","saturate()":"saturate( <number-percentage> )","scale()":"scale( [<number>|<percentage>]#{1,2} )","scale3d()":"scale3d( [<number>|<percentage>]#{3} )","scaleX()":"scaleX( [<number>|<percentage>] )","scaleY()":"scaleY( [<number>|<percentage>] )","scaleZ()":"scaleZ( [<number>|<percentage>] )",scroller:"root|nearest","self-position":"center|start|end|self-start|self-end|flex-start|flex-end","shape-radius":"<length-percentage>|closest-side|farthest-side","sign()":"sign( <calc-sum> )","skew()":"skew( [<angle>|<zero>] , [<angle>|<zero>]? )","skewX()":"skewX( [<angle>|<zero>] )","skewY()":"skewY( [<angle>|<zero>] )","sepia()":"sepia( <number-percentage> )",shadow:"inset?&&<length>{2,4}&&<color>?","shadow-t":"[<length>{2,3}&&<color>?]",shape:"rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )","shape-box":"<box>|margin-box","side-or-corner":"[left|right]||[top|bottom]","sin()":"sin( <calc-sum> )","single-animation":"<time>||<easing-function>||<time>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]","single-animation-direction":"normal|reverse|alternate|alternate-reverse","single-animation-fill-mode":"none|forwards|backwards|both","single-animation-iteration-count":"infinite|<number>","single-animation-play-state":"running|paused","single-animation-timeline":"auto|none|<timeline-name>|scroll( <axis>? <scroller>? )","single-transition":"[none|<single-transition-property>]||<time>||<easing-function>||<time>","single-transition-property":"all|<custom-ident>",size:"closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}","sqrt()":"sqrt( <calc-sum> )","step-position":"jump-start|jump-end|jump-none|jump-both|start|end","step-timing-function":"step-start|step-end|steps( <integer> [, <step-position>]? )","subclass-selector":"<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>","supports-condition":"not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*","supports-in-parens":"( <supports-condition> )|<supports-feature>|<general-enclosed>","supports-feature":"<supports-decl>|<supports-selector-fn>","supports-decl":"( <declaration> )","supports-selector-fn":"selector( <complex-selector> )",symbol:"<string>|<image>|<custom-ident>","tan()":"tan( <calc-sum> )",target:"<target-counter()>|<target-counters()>|<target-text()>","target-counter()":"target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )","target-counters()":"target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )","target-text()":"target-text( [<string>|<url>] , [content|before|after|first-letter]? )","time-percentage":"<time>|<percentage>","timeline-name":"<custom-ident>|<string>","easing-function":"linear|<cubic-bezier-timing-function>|<step-timing-function>","track-breadth":"<length-percentage>|<flex>|min-content|max-content|auto","track-list":"[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?","track-repeat":"repeat( [<integer [1,\u221E]>] , [<line-names>? <track-size>]+ <line-names>? )","track-size":"<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( <length-percentage> )","transform-function":"<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>","transform-list":"<transform-function>+","translate()":"translate( <length-percentage> , <length-percentage>? )","translate3d()":"translate3d( <length-percentage> , <length-percentage> , <length> )","translateX()":"translateX( <length-percentage> )","translateY()":"translateY( <length-percentage> )","translateZ()":"translateZ( <length> )","type-or-unit":"string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%","type-selector":"<wq-name>|<ns-prefix>? '*'","var()":"var( <custom-property-name> , <declaration-value>? )","viewport-length":"auto|<length-percentage>","visual-box":"content-box|padding-box|border-box","wq-name":"<ns-prefix>? <ident-token>","-legacy-gradient":"<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>","-legacy-linear-gradient":"-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )","-legacy-repeating-linear-gradient":"-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )","-legacy-linear-gradient-arguments":"[<angle>|<side-or-corner>]? , <color-stop-list>","-legacy-radial-gradient":"-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )","-legacy-repeating-radial-gradient":"-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )","-legacy-radial-gradient-arguments":"[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>","-legacy-radial-gradient-size":"closest-side|closest-corner|farthest-side|farthest-corner|contain|cover","-legacy-radial-gradient-shape":"circle|ellipse","-non-standard-font":"-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body","-non-standard-color":"-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text","-non-standard-image-rendering":"optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast","-non-standard-overflow":"-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable","-non-standard-width":"fill-available|min-intrinsic|intrinsic|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content|-webkit-min-content|-webkit-max-content","-webkit-gradient()":"-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )","-webkit-gradient-color-stop":"from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )","-webkit-gradient-point":"[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]","-webkit-gradient-radius":"<length>|<percentage>","-webkit-gradient-type":"linear|radial","-webkit-mask-box-repeat":"repeat|stretch|round","-webkit-mask-clip-style":"border|border-box|padding|padding-box|content|content-box|text","-ms-filter-function-list":"<-ms-filter-function>+","-ms-filter-function":"<-ms-filter-function-progid>|<-ms-filter-function-legacy>","-ms-filter-function-progid":"'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]","-ms-filter-function-legacy":"<ident-token>|<function-token> <any-value>? )","-ms-filter":"<string>",age:"child|young|old","attr-name":"<wq-name>","attr-fallback":"<any-value>","bg-clip":"<box>|border|text",bottom:"<length>|auto","generic-voice":"[<age>? <gender> <integer>?]",gender:"male|female|neutral",left:"<length>|auto","mask-image":"<mask-reference>#",paint:"none|<color>|<url> [none|<color>]?|context-fill|context-stroke",right:"<length>|auto","scroll-timeline-axis":"block|inline|vertical|horizontal","scroll-timeline-name":"none|<custom-ident>","single-animation-composition":"replace|add|accumulate","svg-length":"<percentage>|<length>|<number>","svg-writing-mode":"lr-tb|rl-tb|tb-rl|lr|rl|tb",top:"<length>|auto",x:"<number>",y:"<number>",declaration:"<ident-token> : <declaration-value>? ['!' important]?","declaration-list":"[<declaration>? ';']* <declaration>?",url:"url( <string> <url-modifier>* )|<url-token>","url-modifier":"<ident>|<function-token> <any-value> )","number-zero-one":"<number [0,1]>","number-one-or-greater":"<number [1,\u221E]>","-non-standard-display":"-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box"},properties:{"--*":"<declaration-value>","-ms-accelerator":"false|true","-ms-block-progression":"tb|rl|bt|lr","-ms-content-zoom-chaining":"none|chained","-ms-content-zooming":"none|zoom","-ms-content-zoom-limit":"<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>","-ms-content-zoom-limit-max":"<percentage>","-ms-content-zoom-limit-min":"<percentage>","-ms-content-zoom-snap":"<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>","-ms-content-zoom-snap-points":"snapInterval( <percentage> , <percentage> )|snapList( <percentage># )","-ms-content-zoom-snap-type":"none|proximity|mandatory","-ms-filter":"<string>","-ms-flow-from":"[none|<custom-ident>]#","-ms-flow-into":"[none|<custom-ident>]#","-ms-grid-columns":"none|<track-list>|<auto-track-list>","-ms-grid-rows":"none|<track-list>|<auto-track-list>","-ms-high-contrast-adjust":"auto|none","-ms-hyphenate-limit-chars":"auto|<integer>{1,3}","-ms-hyphenate-limit-lines":"no-limit|<integer>","-ms-hyphenate-limit-zone":"<percentage>|<length>","-ms-ime-align":"auto|after","-ms-overflow-style":"auto|none|scrollbar|-ms-autohiding-scrollbar","-ms-scrollbar-3dlight-color":"<color>","-ms-scrollbar-arrow-color":"<color>","-ms-scrollbar-base-color":"<color>","-ms-scrollbar-darkshadow-color":"<color>","-ms-scrollbar-face-color":"<color>","-ms-scrollbar-highlight-color":"<color>","-ms-scrollbar-shadow-color":"<color>","-ms-scrollbar-track-color":"<color>","-ms-scroll-chaining":"chained|none","-ms-scroll-limit":"<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>","-ms-scroll-limit-x-max":"auto|<length>","-ms-scroll-limit-x-min":"<length>","-ms-scroll-limit-y-max":"auto|<length>","-ms-scroll-limit-y-min":"<length>","-ms-scroll-rails":"none|railed","-ms-scroll-snap-points-x":"snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )","-ms-scroll-snap-points-y":"snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )","-ms-scroll-snap-type":"none|proximity|mandatory","-ms-scroll-snap-x":"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>","-ms-scroll-snap-y":"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>","-ms-scroll-translation":"none|vertical-to-horizontal","-ms-text-autospace":"none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space","-ms-touch-select":"grippers|none","-ms-user-select":"none|element|text","-ms-wrap-flow":"auto|both|start|end|maximum|clear","-ms-wrap-margin":"<length>","-ms-wrap-through":"wrap|none","-moz-appearance":"none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized","-moz-binding":"<url>|none","-moz-border-bottom-colors":"<color>+|none","-moz-border-left-colors":"<color>+|none","-moz-border-right-colors":"<color>+|none","-moz-border-top-colors":"<color>+|none","-moz-context-properties":"none|[fill|fill-opacity|stroke|stroke-opacity]#","-moz-float-edge":"border-box|content-box|margin-box|padding-box","-moz-force-broken-image-icon":"0|1","-moz-image-region":"<shape>|auto","-moz-orient":"inline|block|horizontal|vertical","-moz-outline-radius":"<outline-radius>{1,4} [/ <outline-radius>{1,4}]?","-moz-outline-radius-bottomleft":"<outline-radius>","-moz-outline-radius-bottomright":"<outline-radius>","-moz-outline-radius-topleft":"<outline-radius>","-moz-outline-radius-topright":"<outline-radius>","-moz-stack-sizing":"ignore|stretch-to-fit","-moz-text-blink":"none|blink","-moz-user-focus":"ignore|normal|select-after|select-before|select-menu|select-same|select-all|none","-moz-user-input":"auto|none|enabled|disabled","-moz-user-modify":"read-only|read-write|write-only","-moz-window-dragging":"drag|no-drag","-moz-window-shadow":"default|menu|tooltip|sheet|none","-webkit-appearance":"none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button","-webkit-border-before":"<'border-width'>||<'border-style'>||<color>","-webkit-border-before-color":"<color>","-webkit-border-before-style":"<'border-style'>","-webkit-border-before-width":"<'border-width'>","-webkit-box-reflect":"[above|below|right|left]? <length>? <image>?","-webkit-line-clamp":"none|<integer>","-webkit-mask":"[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<box>|border|padding|content|text]||[<box>|border|padding|content]]#","-webkit-mask-attachment":"<attachment>#","-webkit-mask-clip":"[<box>|border|padding|content|text]#","-webkit-mask-composite":"<composite-style>#","-webkit-mask-image":"<mask-reference>#","-webkit-mask-origin":"[<box>|border|padding|content]#","-webkit-mask-position":"<position>#","-webkit-mask-position-x":"[<length-percentage>|left|center|right]#","-webkit-mask-position-y":"[<length-percentage>|top|center|bottom]#","-webkit-mask-repeat":"<repeat-style>#","-webkit-mask-repeat-x":"repeat|no-repeat|space|round","-webkit-mask-repeat-y":"repeat|no-repeat|space|round","-webkit-mask-size":"<bg-size>#","-webkit-overflow-scrolling":"auto|touch","-webkit-tap-highlight-color":"<color>","-webkit-text-fill-color":"<color>","-webkit-text-stroke":"<length>||<color>","-webkit-text-stroke-color":"<color>","-webkit-text-stroke-width":"<length>","-webkit-touch-callout":"default|none","-webkit-user-modify":"read-only|read-write|read-write-plaintext-only","accent-color":"auto|<color>","align-content":"normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>","align-items":"normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]","align-self":"auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>","align-tracks":"[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#",all:"initial|inherit|unset|revert|revert-layer",animation:"<single-animation>#","animation-composition":"<single-animation-composition>#","animation-delay":"<time>#","animation-direction":"<single-animation-direction>#","animation-duration":"<time>#","animation-fill-mode":"<single-animation-fill-mode>#","animation-iteration-count":"<single-animation-iteration-count>#","animation-name":"[none|<keyframes-name>]#","animation-play-state":"<single-animation-play-state>#","animation-timing-function":"<easing-function>#","animation-timeline":"<single-animation-timeline>#",appearance:"none|auto|textfield|menulist-button|<compat-auto>","aspect-ratio":"auto|<ratio>",azimuth:"<angle>|[[left-side|far-left|left|center-left|center|center-right|right|far-right|right-side]||behind]|leftwards|rightwards","backdrop-filter":"none|<filter-function-list>","backface-visibility":"visible|hidden",background:"[<bg-layer> ,]* <final-bg-layer>","background-attachment":"<attachment>#","background-blend-mode":"<blend-mode>#","background-clip":"<bg-clip>#","background-color":"<color>","background-image":"<bg-image>#","background-origin":"<box>#","background-position":"<bg-position>#","background-position-x":"[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#","background-position-y":"[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#","background-repeat":"<repeat-style>#","background-size":"<bg-size>#","block-overflow":"clip|ellipsis|<string>","block-size":"<'width'>",border:"<line-width>||<line-style>||<color>","border-block":"<'border-top-width'>||<'border-top-style'>||<color>","border-block-color":"<'border-top-color'>{1,2}","border-block-style":"<'border-top-style'>","border-block-width":"<'border-top-width'>","border-block-end":"<'border-top-width'>||<'border-top-style'>||<color>","border-block-end-color":"<'border-top-color'>","border-block-end-style":"<'border-top-style'>","border-block-end-width":"<'border-top-width'>","border-block-start":"<'border-top-width'>||<'border-top-style'>||<color>","border-block-start-color":"<'border-top-color'>","border-block-start-style":"<'border-top-style'>","border-block-start-width":"<'border-top-width'>","border-bottom":"<line-width>||<line-style>||<color>","border-bottom-color":"<'border-top-color'>","border-bottom-left-radius":"<length-percentage>{1,2}","border-bottom-right-radius":"<length-percentage>{1,2}","border-bottom-style":"<line-style>","border-bottom-width":"<line-width>","border-collapse":"collapse|separate","border-color":"<color>{1,4}","border-end-end-radius":"<length-percentage>{1,2}","border-end-start-radius":"<length-percentage>{1,2}","border-image":"<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>","border-image-outset":"[<length>|<number>]{1,4}","border-image-repeat":"[stretch|repeat|round|space]{1,2}","border-image-slice":"<number-percentage>{1,4}&&fill?","border-image-source":"none|<image>","border-image-width":"[<length-percentage>|<number>|auto]{1,4}","border-inline":"<'border-top-width'>||<'border-top-style'>||<color>","border-inline-end":"<'border-top-width'>||<'border-top-style'>||<color>","border-inline-color":"<'border-top-color'>{1,2}","border-inline-style":"<'border-top-style'>","border-inline-width":"<'border-top-width'>","border-inline-end-color":"<'border-top-color'>","border-inline-end-style":"<'border-top-style'>","border-inline-end-width":"<'border-top-width'>","border-inline-start":"<'border-top-width'>||<'border-top-style'>||<color>","border-inline-start-color":"<'border-top-color'>","border-inline-start-style":"<'border-top-style'>","border-inline-start-width":"<'border-top-width'>","border-left":"<line-width>||<line-style>||<color>","border-left-color":"<color>","border-left-style":"<line-style>","border-left-width":"<line-width>","border-radius":"<length-percentage>{1,4} [/ <length-percentage>{1,4}]?","border-right":"<line-width>||<line-style>||<color>","border-right-color":"<color>","border-right-style":"<line-style>","border-right-width":"<line-width>","border-spacing":"<length> <length>?","border-start-end-radius":"<length-percentage>{1,2}","border-start-start-radius":"<length-percentage>{1,2}","border-style":"<line-style>{1,4}","border-top":"<line-width>||<line-style>||<color>","border-top-color":"<color>","border-top-left-radius":"<length-percentage>{1,2}","border-top-right-radius":"<length-percentage>{1,2}","border-top-style":"<line-style>","border-top-width":"<line-width>","border-width":"<line-width>{1,4}",bottom:"<length>|<percentage>|auto","box-align":"start|center|end|baseline|stretch","box-decoration-break":"slice|clone","box-direction":"normal|reverse|inherit","box-flex":"<number>","box-flex-group":"<integer>","box-lines":"single|multiple","box-ordinal-group":"<integer>","box-orient":"horizontal|vertical|inline-axis|block-axis|inherit","box-pack":"start|center|end|justify","box-shadow":"none|<shadow>#","box-sizing":"content-box|border-box","break-after":"auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region","break-before":"auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region","break-inside":"auto|avoid|avoid-page|avoid-column|avoid-region","caption-side":"top|bottom|block-start|block-end|inline-start|inline-end",caret:"<'caret-color'>||<'caret-shape'>","caret-color":"auto|<color>","caret-shape":"auto|bar|block|underscore",clear:"none|left|right|both|inline-start|inline-end",clip:"<shape>|auto","clip-path":"<clip-source>|[<basic-shape>||<geometry-box>]|none",color:"<color>","print-color-adjust":"economy|exact","color-scheme":"normal|[light|dark|<custom-ident>]+&&only?","column-count":"<integer>|auto","column-fill":"auto|balance|balance-all","column-gap":"normal|<length-percentage>","column-rule":"<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>","column-rule-color":"<color>","column-rule-style":"<'border-style'>","column-rule-width":"<'border-width'>","column-span":"none|all","column-width":"<length>|auto",columns:"<'column-width'>||<'column-count'>",contain:"none|strict|content|[[size||inline-size]||layout||style||paint]","contain-intrinsic-size":"[none|<length>|auto <length>]{1,2}","contain-intrinsic-block-size":"none|<length>|auto <length>","contain-intrinsic-height":"none|<length>|auto <length>","contain-intrinsic-inline-size":"none|<length>|auto <length>","contain-intrinsic-width":"none|<length>|auto <length>",content:"normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>]+]?","content-visibility":"visible|auto|hidden","counter-increment":"[<counter-name> <integer>?]+|none","counter-reset":"[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none","counter-set":"[<counter-name> <integer>?]+|none",cursor:"[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]",direction:"ltr|rtl",display:"[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>","empty-cells":"show|hide",filter:"none|<filter-function-list>|<-ms-filter-function-list>",flex:"none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]","flex-basis":"content|<'width'>","flex-direction":"row|row-reverse|column|column-reverse","flex-flow":"<'flex-direction'>||<'flex-wrap'>","flex-grow":"<number>","flex-shrink":"<number>","flex-wrap":"nowrap|wrap|wrap-reverse",float:"left|right|none|inline-start|inline-end",font:"[[<'font-style'>||<font-variant-css21>||<'font-weight'>||<'font-stretch'>]? <'font-size'> [/ <'line-height'>]? <'font-family'>]|caption|icon|menu|message-box|small-caption|status-bar","font-family":"[<family-name>|<generic-family>]#","font-feature-settings":"normal|<feature-tag-value>#","font-kerning":"auto|normal|none","font-language-override":"normal|<string>","font-optical-sizing":"auto|none","font-variation-settings":"normal|[<string> <number>]#","font-size":"<absolute-size>|<relative-size>|<length-percentage>","font-size-adjust":"none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]","font-smooth":"auto|never|always|<absolute-size>|<length>","font-stretch":"<font-stretch-absolute>","font-style":"normal|italic|oblique <angle>?","font-synthesis":"none|[weight||style||small-caps]","font-variant":"normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]","font-variant-alternates":"normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]","font-variant-caps":"normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps","font-variant-east-asian":"normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]","font-variant-ligatures":"normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]","font-variant-numeric":"normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]","font-variant-position":"normal|sub|super","font-weight":"<font-weight-absolute>|bolder|lighter","forced-color-adjust":"auto|none",gap:"<'row-gap'> <'column-gap'>?",grid:"<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>","grid-area":"<grid-line> [/ <grid-line>]{0,3}","grid-auto-columns":"<track-size>+","grid-auto-flow":"[row|column]||dense","grid-auto-rows":"<track-size>+","grid-column":"<grid-line> [/ <grid-line>]?","grid-column-end":"<grid-line>","grid-column-gap":"<length-percentage>","grid-column-start":"<grid-line>","grid-gap":"<'grid-row-gap'> <'grid-column-gap'>?","grid-row":"<grid-line> [/ <grid-line>]?","grid-row-end":"<grid-line>","grid-row-gap":"<length-percentage>","grid-row-start":"<grid-line>","grid-template":"none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?","grid-template-areas":"none|<string>+","grid-template-columns":"none|<track-list>|<auto-track-list>|subgrid <line-name-list>?","grid-template-rows":"none|<track-list>|<auto-track-list>|subgrid <line-name-list>?","hanging-punctuation":"none|[first||[force-end|allow-end]||last]",height:"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )","hyphenate-character":"auto|<string>",hyphens:"none|manual|auto","image-orientation":"from-image|<angle>|[<angle>? flip]","image-rendering":"auto|crisp-edges|pixelated|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>","image-resolution":"[from-image||<resolution>]&&snap?","ime-mode":"auto|normal|active|inactive|disabled","initial-letter":"normal|[<number> <integer>?]","initial-letter-align":"[auto|alphabetic|hanging|ideographic]","inline-size":"<'width'>","input-security":"auto|none",inset:"<'top'>{1,4}","inset-block":"<'top'>{1,2}","inset-block-end":"<'top'>","inset-block-start":"<'top'>","inset-inline":"<'top'>{1,2}","inset-inline-end":"<'top'>","inset-inline-start":"<'top'>",isolation:"auto|isolate","justify-content":"normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]","justify-items":"normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]","justify-self":"auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]","justify-tracks":"[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#",left:"<length>|<percentage>|auto","letter-spacing":"normal|<length-percentage>","line-break":"auto|loose|normal|strict|anywhere","line-clamp":"none|<integer>","line-height":"normal|<number>|<length>|<percentage>","line-height-step":"<length>","list-style":"<'list-style-type'>||<'list-style-position'>||<'list-style-image'>","list-style-image":"<image>|none","list-style-position":"inside|outside","list-style-type":"<counter-style>|<string>|none",margin:"[<length>|<percentage>|auto]{1,4}","margin-block":"<'margin-left'>{1,2}","margin-block-end":"<'margin-left'>","margin-block-start":"<'margin-left'>","margin-bottom":"<length>|<percentage>|auto","margin-inline":"<'margin-left'>{1,2}","margin-inline-end":"<'margin-left'>","margin-inline-start":"<'margin-left'>","margin-left":"<length>|<percentage>|auto","margin-right":"<length>|<percentage>|auto","margin-top":"<length>|<percentage>|auto","margin-trim":"none|in-flow|all",mask:"<mask-layer>#","mask-border":"<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>","mask-border-mode":"luminance|alpha","mask-border-outset":"[<length>|<number>]{1,4}","mask-border-repeat":"[stretch|repeat|round|space]{1,2}","mask-border-slice":"<number-percentage>{1,4} fill?","mask-border-source":"none|<image>","mask-border-width":"[<length-percentage>|<number>|auto]{1,4}","mask-clip":"[<geometry-box>|no-clip]#","mask-composite":"<compositing-operator>#","mask-image":"<mask-reference>#","mask-mode":"<masking-mode>#","mask-origin":"<geometry-box>#","mask-position":"<position>#","mask-repeat":"<repeat-style>#","mask-size":"<bg-size>#","mask-type":"luminance|alpha","masonry-auto-flow":"[pack|next]||[definite-first|ordered]","math-depth":"auto-add|add( <integer> )|<integer>","math-shift":"normal|compact","math-style":"normal|compact","max-block-size":"<'max-width'>","max-height":"none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )","max-inline-size":"<'max-width'>","max-lines":"none|<integer>","max-width":"none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|<-non-standard-width>","min-block-size":"<'min-width'>","min-height":"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )","min-inline-size":"<'min-width'>","min-width":"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|<-non-standard-width>","mix-blend-mode":"<blend-mode>|plus-lighter","object-fit":"fill|contain|cover|none|scale-down","object-position":"<position>",offset:"[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?","offset-anchor":"auto|<position>","offset-distance":"<length-percentage>","offset-path":"none|ray( [<angle>&&<size>&&contain?] )|<path()>|<url>|[<basic-shape>||<geometry-box>]","offset-position":"auto|<position>","offset-rotate":"[auto|reverse]||<angle>",opacity:"<alpha-value>",order:"<integer>",orphans:"<integer>",outline:"[<'outline-color'>||<'outline-style'>||<'outline-width'>]","outline-color":"<color>|invert","outline-offset":"<length>","outline-style":"auto|<'border-style'>","outline-width":"<line-width>",overflow:"[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>","overflow-anchor":"auto|none","overflow-block":"visible|hidden|clip|scroll|auto","overflow-clip-box":"padding-box|content-box","overflow-clip-margin":"<visual-box>||<length [0,\u221E]>","overflow-inline":"visible|hidden|clip|scroll|auto","overflow-wrap":"normal|break-word|anywhere","overflow-x":"visible|hidden|clip|scroll|auto","overflow-y":"visible|hidden|clip|scroll|auto","overscroll-behavior":"[contain|none|auto]{1,2}","overscroll-behavior-block":"contain|none|auto","overscroll-behavior-inline":"contain|none|auto","overscroll-behavior-x":"contain|none|auto","overscroll-behavior-y":"contain|none|auto",padding:"[<length>|<percentage>]{1,4}","padding-block":"<'padding-left'>{1,2}","padding-block-end":"<'padding-left'>","padding-block-start":"<'padding-left'>","padding-bottom":"<length>|<percentage>","padding-inline":"<'padding-left'>{1,2}","padding-inline-end":"<'padding-left'>","padding-inline-start":"<'padding-left'>","padding-left":"<length>|<percentage>","padding-right":"<length>|<percentage>","padding-top":"<length>|<percentage>","page-break-after":"auto|always|avoid|left|right|recto|verso","page-break-before":"auto|always|avoid|left|right|recto|verso","page-break-inside":"auto|avoid","paint-order":"normal|[fill||stroke||markers]",perspective:"none|<length>","perspective-origin":"<position>","place-content":"<'align-content'> <'justify-content'>?","place-items":"<'align-items'> <'justify-items'>?","place-self":"<'align-self'> <'justify-self'>?","pointer-events":"auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit",position:"static|relative|absolute|sticky|fixed|-webkit-sticky",quotes:"none|auto|[<string> <string>]+",resize:"none|both|horizontal|vertical|block|inline",right:"<length>|<percentage>|auto",rotate:"none|<angle>|[x|y|z|<number>{3}]&&<angle>","row-gap":"normal|<length-percentage>","ruby-align":"start|center|space-between|space-around","ruby-merge":"separate|collapse|auto","ruby-position":"[alternate||[over|under]]|inter-character",scale:"none|<number>{1,3}","scrollbar-color":"auto|<color>{2}","scrollbar-gutter":"auto|stable&&both-edges?","scrollbar-width":"auto|thin|none","scroll-behavior":"auto|smooth","scroll-margin":"<length>{1,4}","scroll-margin-block":"<length>{1,2}","scroll-margin-block-start":"<length>","scroll-margin-block-end":"<length>","scroll-margin-bottom":"<length>","scroll-margin-inline":"<length>{1,2}","scroll-margin-inline-start":"<length>","scroll-margin-inline-end":"<length>","scroll-margin-left":"<length>","scroll-margin-right":"<length>","scroll-margin-top":"<length>","scroll-padding":"[auto|<length-percentage>]{1,4}","scroll-padding-block":"[auto|<length-percentage>]{1,2}","scroll-padding-block-start":"auto|<length-percentage>","scroll-padding-block-end":"auto|<length-percentage>","scroll-padding-bottom":"auto|<length-percentage>","scroll-padding-inline":"[auto|<length-percentage>]{1,2}","scroll-padding-inline-start":"auto|<length-percentage>","scroll-padding-inline-end":"auto|<length-percentage>","scroll-padding-left":"auto|<length-percentage>","scroll-padding-right":"auto|<length-percentage>","scroll-padding-top":"auto|<length-percentage>","scroll-snap-align":"[none|start|end|center]{1,2}","scroll-snap-coordinate":"none|<position>#","scroll-snap-destination":"<position>","scroll-snap-points-x":"none|repeat( <length-percentage> )","scroll-snap-points-y":"none|repeat( <length-percentage> )","scroll-snap-stop":"normal|always","scroll-snap-type":"none|[x|y|block|inline|both] [mandatory|proximity]?","scroll-snap-type-x":"none|mandatory|proximity","scroll-snap-type-y":"none|mandatory|proximity","scroll-timeline":"<scroll-timeline-name>||<scroll-timeline-axis>","scroll-timeline-axis":"block|inline|vertical|horizontal","scroll-timeline-name":"none|<custom-ident>","shape-image-threshold":"<alpha-value>","shape-margin":"<length-percentage>","shape-outside":"none|[<shape-box>||<basic-shape>]|<image>","tab-size":"<integer>|<length>","table-layout":"auto|fixed","text-align":"start|end|left|right|center|justify|match-parent","text-align-last":"auto|start|end|left|right|center|justify","text-combine-upright":"none|all|[digits <integer>?]","text-decoration":"<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>","text-decoration-color":"<color>","text-decoration-line":"none|[underline||overline||line-through||blink]|spelling-error|grammar-error","text-decoration-skip":"none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]","text-decoration-skip-ink":"auto|all|none","text-decoration-style":"solid|double|dotted|dashed|wavy","text-decoration-thickness":"auto|from-font|<length>|<percentage>","text-emphasis":"<'text-emphasis-style'>||<'text-emphasis-color'>","text-emphasis-color":"<color>","text-emphasis-position":"[over|under]&&[right|left]","text-emphasis-style":"none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>","text-indent":"<length-percentage>&&hanging?&&each-line?","text-justify":"auto|inter-character|inter-word|none","text-orientation":"mixed|upright|sideways","text-overflow":"[clip|ellipsis|<string>]{1,2}","text-rendering":"auto|optimizeSpeed|optimizeLegibility|geometricPrecision","text-shadow":"none|<shadow-t>#","text-size-adjust":"none|auto|<percentage>","text-transform":"none|capitalize|uppercase|lowercase|full-width|full-size-kana","text-underline-offset":"auto|<length>|<percentage>","text-underline-position":"auto|from-font|[under||[left|right]]",top:"<length>|<percentage>|auto","touch-action":"auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation",transform:"none|<transform-list>","transform-box":"content-box|border-box|fill-box|stroke-box|view-box","transform-origin":"[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?","transform-style":"flat|preserve-3d",transition:"<single-transition>#","transition-delay":"<time>#","transition-duration":"<time>#","transition-property":"none|<single-transition-property>#","transition-timing-function":"<easing-function>#",translate:"none|<length-percentage> [<length-percentage> <length>?]?","unicode-bidi":"normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext","user-select":"auto|text|none|contain|all","vertical-align":"baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>",visibility:"visible|hidden|collapse","white-space":"normal|pre|nowrap|pre-wrap|pre-line|break-spaces",widows:"<integer>",width:"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|fill|stretch|intrinsic|-moz-max-content|-webkit-max-content|-moz-fit-content|-webkit-fit-content","will-change":"auto|<animateable-feature>#","word-break":"normal|break-all|keep-all|break-word","word-spacing":"normal|<length>","word-wrap":"normal|break-word","writing-mode":"horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>","z-index":"auto|<integer>",zoom:"normal|reset|<number>|<percentage>","-moz-background-clip":"padding|border","-moz-border-radius-bottomleft":"<'border-bottom-left-radius'>","-moz-border-radius-bottomright":"<'border-bottom-right-radius'>","-moz-border-radius-topleft":"<'border-top-left-radius'>","-moz-border-radius-topright":"<'border-bottom-right-radius'>","-moz-control-character-visibility":"visible|hidden","-moz-osx-font-smoothing":"auto|grayscale","-moz-user-select":"none|text|all|-moz-none","-ms-flex-align":"start|end|center|baseline|stretch","-ms-flex-item-align":"auto|start|end|center|baseline|stretch","-ms-flex-line-pack":"start|end|center|justify|distribute|stretch","-ms-flex-negative":"<'flex-shrink'>","-ms-flex-pack":"start|end|center|justify|distribute","-ms-flex-order":"<integer>","-ms-flex-positive":"<'flex-grow'>","-ms-flex-preferred-size":"<'flex-basis'>","-ms-interpolation-mode":"nearest-neighbor|bicubic","-ms-grid-column-align":"start|end|center|stretch","-ms-grid-row-align":"start|end|center|stretch","-ms-hyphenate-limit-last":"none|always|column|page|spread","-webkit-background-clip":"[<box>|border|padding|content|text]#","-webkit-column-break-after":"always|auto|avoid","-webkit-column-break-before":"always|auto|avoid","-webkit-column-break-inside":"always|auto|avoid","-webkit-font-smoothing":"auto|none|antialiased|subpixel-antialiased","-webkit-mask-box-image":"[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?","-webkit-print-color-adjust":"economy|exact","-webkit-text-security":"none|circle|disc|square","-webkit-user-drag":"none|element|auto","-webkit-user-select":"auto|none|text|all","alignment-baseline":"auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical","baseline-shift":"baseline|sub|super|<svg-length>",behavior:"<url>+","clip-rule":"nonzero|evenodd",cue:"<'cue-before'> <'cue-after'>?","cue-after":"<url> <decibel>?|none","cue-before":"<url> <decibel>?|none","dominant-baseline":"auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge",fill:"<paint>","fill-opacity":"<number-zero-one>","fill-rule":"nonzero|evenodd","glyph-orientation-horizontal":"<angle>","glyph-orientation-vertical":"<angle>",kerning:"auto|<svg-length>",marker:"none|<url>","marker-end":"none|<url>","marker-mid":"none|<url>","marker-start":"none|<url>",pause:"<'pause-before'> <'pause-after'>?","pause-after":"<time>|none|x-weak|weak|medium|strong|x-strong","pause-before":"<time>|none|x-weak|weak|medium|strong|x-strong",rest:"<'rest-before'> <'rest-after'>?","rest-after":"<time>|none|x-weak|weak|medium|strong|x-strong","rest-before":"<time>|none|x-weak|weak|medium|strong|x-strong","shape-rendering":"auto|optimizeSpeed|crispEdges|geometricPrecision",src:"[<url> [format( <string># )]?|local( <family-name> )]#",speak:"auto|none|normal","speak-as":"normal|spell-out||digits||[literal-punctuation|no-punctuation]",stroke:"<paint>","stroke-dasharray":"none|[<svg-length>+]#","stroke-dashoffset":"<svg-length>","stroke-linecap":"butt|round|square","stroke-linejoin":"miter|round|bevel","stroke-miterlimit":"<number-one-or-greater>","stroke-opacity":"<number-zero-one>","stroke-width":"<svg-length>","text-anchor":"start|middle|end","unicode-range":"<urange>#","voice-balance":"<number>|left|center|right|leftwards|rightwards","voice-duration":"auto|<time>","voice-family":"[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve","voice-pitch":"<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]","voice-range":"<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]","voice-rate":"[normal|x-slow|slow|medium|fast|x-fast]||<percentage>","voice-stress":"normal|strong|moderate|none|reduced","voice-volume":"silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]"},atrules:{charset:{prelude:"<string>",descriptors:null},"counter-style":{prelude:"<counter-style-name>",descriptors:{"additive-symbols":"[<integer>&&<symbol>]#",fallback:"<counter-style-name>",negative:"<symbol> <symbol>?",pad:"<integer>&&<symbol>",prefix:"<symbol>",range:"[[<integer>|infinite]{2}]#|auto","speak-as":"auto|bullets|numbers|words|spell-out|<counter-style-name>",suffix:"<symbol>",symbols:"<symbol>+",system:"cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]"}},document:{prelude:"[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#",descriptors:null},"font-face":{prelude:null,descriptors:{"ascent-override":"normal|<percentage>","descent-override":"normal|<percentage>","font-display":"[auto|block|swap|fallback|optional]","font-family":"<family-name>","font-feature-settings":"normal|<feature-tag-value>#","font-variation-settings":"normal|[<string> <number>]#","font-stretch":"<font-stretch-absolute>{1,2}","font-style":"normal|italic|oblique <angle>{0,2}","font-weight":"<font-weight-absolute>{1,2}","font-variant":"normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]","line-gap-override":"normal|<percentage>","size-adjust":"<percentage>",src:"[<url> [format( <string># )]?|local( <family-name> )]#","unicode-range":"<urange>#"}},"font-feature-values":{prelude:"<family-name>#",descriptors:null},import:{prelude:"[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?",descriptors:null},keyframes:{prelude:"<keyframes-name>",descriptors:null},layer:{prelude:"[<layer-name>#|<layer-name>?]",descriptors:null},media:{prelude:"<media-query-list>",descriptors:null},namespace:{prelude:"<namespace-prefix>? [<string>|<url>]",descriptors:null},page:{prelude:"<page-selector-list>",descriptors:{bleed:"auto|<length>",marks:"none|[crop||cross]",size:"<length>{1,2}|auto|[<page-size>||[portrait|landscape]]"}},property:{prelude:"<custom-property-name>",descriptors:{syntax:"<string>",inherits:"true|false","initial-value":"<string>"}},"scroll-timeline":{prelude:"<timeline-name>",descriptors:null},supports:{prelude:"<supports-condition>",descriptors:null},viewport:{prelude:null,descriptors:{height:"<viewport-length>{1,2}","max-height":"<viewport-length>","max-width":"<viewport-length>","max-zoom":"auto|<number>|<percentage>","min-height":"<viewport-length>","min-width":"<viewport-length>","min-zoom":"auto|<number>|<percentage>",orientation:"auto|portrait|landscape","user-zoom":"zoom|fixed","viewport-fit":"auto|contain|cover",width:"<viewport-length>{1,2}",zoom:"auto|<number>|<percentage>"}},nest:{prelude:"<complex-selector-list>",descriptors:null}}};var bt={};b(bt,{AnPlusB:()=>tr,Atrule:()=>rr,AtrulePrelude:()=>nr,AttributeSelector:()=>ir,Block:()=>ar,Brackets:()=>sr,CDC:()=>lr,CDO:()=>cr,ClassSelector:()=>ur,Combinator:()=>pr,Comment:()=>hr,Declaration:()=>mr,DeclarationList:()=>fr,Dimension:()=>dr,Function:()=>gr,Hash:()=>br,IdSelector:()=>yr,Identifier:()=>xr,MediaFeature:()=>kr,MediaQuery:()=>wr,MediaQueryList:()=>vr,NestingSelector:()=>Sr,Nth:()=>Cr,Number:()=>Ar,Operator:()=>Tr,Parentheses:()=>Er,Percentage:()=>Lr,PseudoClassSelector:()=>Pr,PseudoElementSelector:()=>Ir,Ratio:()=>Dr,Raw:()=>Or,Rule:()=>Nr,Selector:()=>zr,SelectorList:()=>Mr,String:()=>Fr,StyleSheet:()=>Br,TypeSelector:()=>_r,UnicodeRange:()=>jr,Url:()=>Wr,Value:()=>Hr,WhiteSpace:()=>Yr});var tr={};b(tr,{generate:()=>Sc,name:()=>wc,parse:()=>qn,structure:()=>vc});var fe=43,ne=45,Jt=110,De=!0,kc=!1;function er(e,t){let r=this.tokenStart+e,n=this.charCodeAt(r);for((n===fe||n===ne)&&(t&&this.error("Number sign is not allowed"),r++);r<this.tokenEnd;r++)_(this.charCodeAt(r))||this.error("Integer is expected",r);}function $e(e){return er.call(this,0,e)}function Ae(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let r="";switch(t){case Jt:r="N is expected";break;case ne:r="HyphenMinus is expected";break}this.error(r,this.tokenStart+e);}}function jn(){let e=0,t=0,r=this.tokenType;for(;r===13||r===25;)r=this.lookupType(++e);if(r!==10)if(this.isDelim(fe,e)||this.isDelim(ne,e)){t=this.isDelim(fe,e)?fe:ne;do r=this.lookupType(++e);while(r===13||r===25);r!==10&&(this.skip(e),$e.call(this,De));}else return null;return e>0&&this.skip(e),t===0&&(r=this.charCodeAt(this.tokenStart),r!==fe&&r!==ne&&this.error("Number sign is expected")),$e.call(this,t!==0),t===ne?"-"+this.consume(10):this.consume(10)}var wc="AnPlusB",vc={a:[String,null],b:[String,null]};function qn(){let e=this.tokenStart,t=null,r=null;if(this.tokenType===10)$e.call(this,kc),r=this.consume(10);else if(this.tokenType===1&&this.cmpChar(this.tokenStart,ne))switch(t="-1",Ae.call(this,1,Jt),this.tokenEnd-this.tokenStart){case 2:this.next(),r=jn.call(this);break;case 3:Ae.call(this,2,ne),this.next(),this.skipSC(),$e.call(this,De),r="-"+this.consume(10);break;default:Ae.call(this,2,ne),er.call(this,3,De),this.next(),r=this.substrToCursor(e+2);}else if(this.tokenType===1||this.isDelim(fe)&&this.lookupType(1)===1){let n=0;switch(t="1",this.isDelim(fe)&&(n=1,this.next()),Ae.call(this,0,Jt),this.tokenEnd-this.tokenStart){case 1:this.next(),r=jn.call(this);break;case 2:Ae.call(this,1,ne),this.next(),this.skipSC(),$e.call(this,De),r="-"+this.consume(10);break;default:Ae.call(this,1,ne),er.call(this,2,De),this.next(),r=this.substrToCursor(e+n+1);}}else if(this.tokenType===12){let n=this.charCodeAt(this.tokenStart),o=n===fe||n===ne,i=this.tokenStart+o;for(;i<this.tokenEnd&&_(this.charCodeAt(i));i++);i===this.tokenStart+o&&this.error("Integer is expected",this.tokenStart+o),Ae.call(this,i-this.tokenStart,Jt),t=this.substring(e,i),i+1===this.tokenEnd?(this.next(),r=jn.call(this)):(Ae.call(this,i-this.tokenStart+1,ne),i+2===this.tokenEnd?(this.next(),this.skipSC(),$e.call(this,De),r="-"+this.consume(10)):(er.call(this,i-this.tokenStart+2,De),this.next(),r=this.substrToCursor(i+1)));}else this.error();return t!==null&&t.charCodeAt(0)===fe&&(t=t.substr(1)),r!==null&&r.charCodeAt(0)===fe&&(r=r.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:r}}function Sc(e){if(e.a){let t=e.a==="+1"&&"n"||e.a==="1"&&"n"||e.a==="-1"&&"-n"||e.a+"n";if(e.b){let r=e.b[0]==="-"||e.b[0]==="+"?e.b:"+"+e.b;this.tokenize(t+r);}else this.tokenize(t);}else this.tokenize(e.b);}var rr={};b(rr,{generate:()=>Lc,name:()=>Ac,parse:()=>Wn,structure:()=>Ec,walkContext:()=>Tc});function ya(e){return this.Raw(e,this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function Cc(){for(let e=1,t;t=this.lookupType(e);e++){if(t===24)return !0;if(t===23||t===3)return !1}return !1}var Ac="Atrule",Tc="atrule",Ec={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]};function Wn(e=!1){let t=this.tokenStart,r,n,o=null,i=null;switch(this.eat(3),r=this.substrToCursor(t+1),n=r.toLowerCase(),this.skipSC(),this.eof===!1&&this.tokenType!==23&&this.tokenType!==17&&(this.parseAtrulePrelude?o=this.parseWithFallback(this.AtrulePrelude.bind(this,r,e),ya):o=ya.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case 17:this.next();break;case 23:hasOwnProperty.call(this.atrule,n)&&typeof this.atrule[n].block=="function"?i=this.atrule[n].block.call(this,e):i=this.Block(Cc.call(this));break}return {type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:r,prelude:o,block:i}}function Lc(e){this.token(3,"@"+e.name),e.prelude!==null&&this.node(e.prelude),e.block?this.node(e.block):this.token(17,";");}var nr={};b(nr,{generate:()=>Oc,name:()=>Pc,parse:()=>Hn,structure:()=>Dc,walkContext:()=>Ic});var Pc="AtrulePrelude",Ic="atrulePrelude",Dc={children:[[]]};function Hn(e){let t=null;return e!==null&&(e=e.toLowerCase()),this.skipSC(),hasOwnProperty.call(this.atrule,e)&&typeof this.atrule[e].prelude=="function"?t=this.atrule[e].prelude.call(this):t=this.readSequence(this.scope.AtrulePrelude),this.skipSC(),this.eof!==!0&&this.tokenType!==23&&this.tokenType!==17&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}function Oc(e){this.children(e);}var ir={};b(ir,{generate:()=>Uc,name:()=>Bc,parse:()=>Gn,structure:()=>_c});var Nc=36,ka=42,or=61,zc=94,Yn=124,Mc=126;function Rc(){this.eof&&this.error("Unexpected end of input");let e=this.tokenStart,t=!1;return this.isDelim(ka)?(t=!0,this.next()):this.isDelim(Yn)||this.eat(1),this.isDelim(Yn)?this.charCodeAt(this.tokenStart+1)!==or?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function Fc(){let e=this.tokenStart,t=this.charCodeAt(e);return t!==or&&t!==Mc&&t!==zc&&t!==Nc&&t!==ka&&t!==Yn&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),t!==or&&(this.isDelim(or)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}var Bc="AttributeSelector",_c={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]};function Gn(){let e=this.tokenStart,t,r=null,n=null,o=null;return this.eat(19),this.skipSC(),t=Rc.call(this),this.skipSC(),this.tokenType!==20&&(this.tokenType!==1&&(r=Fc.call(this),this.skipSC(),n=this.tokenType===5?this.String():this.Identifier(),this.skipSC()),this.tokenType===1&&(o=this.consume(1),this.skipSC())),this.eat(20),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:r,value:n,flags:o}}function Uc(e){this.token(9,"["),this.node(e.name),e.matcher!==null&&(this.tokenize(e.matcher),this.node(e.value)),e.flags!==null&&this.token(1,e.flags),this.token(9,"]");}var ar={};b(ar,{generate:()=>Gc,name:()=>Wc,parse:()=>Vn,structure:()=>Yc,walkContext:()=>Hc});var jc=38;function Sa(e){return this.Raw(e,null,!0)}function wa(){return this.parseWithFallback(this.Rule,Sa)}function va(e){return this.Raw(e,this.consumeUntilSemicolonIncluded,!0)}function qc(){if(this.tokenType===17)return va.call(this,this.tokenIndex);let e=this.parseWithFallback(this.Declaration,va);return this.tokenType===17&&this.next(),e}var Wc="Block",Hc="block",Yc={children:[["Atrule","Rule","Declaration"]]};function Vn(e){let t=e?qc:wa,r=this.tokenStart,n=this.createList();this.eat(23);e:for(;!this.eof;)switch(this.tokenType){case 24:break e;case 13:case 25:this.next();break;case 3:n.push(this.parseWithFallback(this.Atrule.bind(this,e),Sa));break;default:e&&this.isDelim(jc)?n.push(wa.call(this)):n.push(t.call(this));}return this.eof||this.eat(24),{type:"Block",loc:this.getLocation(r,this.tokenStart),children:n}}function Gc(e){this.token(23,"{"),this.children(e,t=>{t.type==="Declaration"&&this.token(17,";");}),this.token(24,"}");}var sr={};b(sr,{generate:()=>Qc,name:()=>Vc,parse:()=>Kn,structure:()=>Kc});var Vc="Brackets",Kc={children:[[]]};function Kn(e,t){let r=this.tokenStart,n=null;return this.eat(19),n=e.call(this,t),this.eof||this.eat(20),{type:"Brackets",loc:this.getLocation(r,this.tokenStart),children:n}}function Qc(e){this.token(9,"["),this.children(e),this.token(9,"]");}var lr={};b(lr,{generate:()=>Zc,name:()=>Xc,parse:()=>Qn,structure:()=>$c});var Xc="CDC",$c=[];function Qn(){let e=this.tokenStart;return this.eat(15),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}function Zc(){this.token(15,"-->");}var cr={};b(cr,{generate:()=>tu,name:()=>Jc,parse:()=>Xn,structure:()=>eu});var Jc="CDO",eu=[];function Xn(){let e=this.tokenStart;return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}function tu(){this.token(14,"<!--");}var ur={};b(ur,{generate:()=>iu,name:()=>nu,parse:()=>$n,structure:()=>ou});var ru=46,nu="ClassSelector",ou={name:String};function $n(){return this.eatDelim(ru),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}function iu(e){this.token(9,"."),this.token(1,e.name);}var pr={};b(pr,{generate:()=>pu,name:()=>cu,parse:()=>Zn,structure:()=>uu});var au=43,Ca=47,su=62,lu=126,cu="Combinator",uu={name:String};function Zn(){let e=this.tokenStart,t;switch(this.tokenType){case 13:t=" ";break;case 9:switch(this.charCodeAt(this.tokenStart)){case su:case au:case lu:this.next();break;case Ca:this.next(),this.eatIdent("deep"),this.eatDelim(Ca);break;default:this.error("Combinator is expected");}t=this.substrToCursor(e);break}return {type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}function pu(e){this.tokenize(e.name);}var hr={};b(hr,{generate:()=>gu,name:()=>fu,parse:()=>Jn,structure:()=>du});var hu=42,mu=47,fu="Comment",du={value:String};function Jn(){let e=this.tokenStart,t=this.tokenEnd;return this.eat(25),t-e+2>=2&&this.charCodeAt(t-2)===hu&&this.charCodeAt(t-1)===mu&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}function gu(e){this.token(25,"/*"+e.value+"*/");}var mr={};b(mr,{generate:()=>Lu,name:()=>Au,parse:()=>eo,structure:()=>Eu,walkContext:()=>Tu});var Ta=33,bu=35,xu=36,yu=38,ku=42,wu=43,Aa=47;function vu(e){return this.Raw(e,this.consumeUntilExclamationMarkOrSemicolon,!0)}function Su(e){return this.Raw(e,this.consumeUntilExclamationMarkOrSemicolon,!1)}function Cu(){let e=this.tokenIndex,t=this.Value();return t.type!=="Raw"&&this.eof===!1&&this.tokenType!==17&&this.isDelim(Ta)===!1&&this.isBalanceEdge(e)===!1&&this.error(),t}var Au="Declaration",Tu="declaration",Eu={important:[Boolean,String],property:String,value:["Value","Raw"]};function eo(){let e=this.tokenStart,t=this.tokenIndex,r=Pu.call(this),n=Bt(r),o=n?this.parseCustomProperty:this.parseValue,i=n?Su:vu,s=!1,u;this.skipSC(),this.eat(16);let c=this.tokenIndex;if(n||this.skipSC(),o?u=this.parseWithFallback(Cu,i):u=i.call(this,this.tokenIndex),n&&u.type==="Value"&&u.children.isEmpty){for(let a=c-this.tokenIndex;a<=0;a++)if(this.lookupType(a)===13){u.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}return this.isDelim(Ta)&&(s=Iu.call(this),this.skipSC()),this.eof===!1&&this.tokenType!==17&&this.isBalanceEdge(t)===!1&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:s,property:r,value:u}}function Lu(e){this.token(1,e.property),this.token(16,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,e.important===!0?"important":e.important));}function Pu(){let e=this.tokenStart;if(this.tokenType===9)switch(this.charCodeAt(this.tokenStart)){case ku:case xu:case wu:case bu:case yu:this.next();break;case Aa:this.next(),this.isDelim(Aa)&&this.next();break}return this.tokenType===4?this.eat(4):this.eat(1),this.substrToCursor(e)}function Iu(){this.eat(9),this.skipSC();let e=this.consume(1);return e==="important"?!0:e}var fr={};b(fr,{generate:()=>zu,name:()=>Ou,parse:()=>ro,structure:()=>Nu});var Du=38;function to(e){return this.Raw(e,this.consumeUntilSemicolonIncluded,!0)}var Ou="DeclarationList",Nu={children:[["Declaration","Atrule","Rule"]]};function ro(){let e=this.createList();for(;!this.eof;)switch(this.tokenType){case 13:case 25:case 17:this.next();break;case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),to));break;default:this.isDelim(Du)?e.push(this.parseWithFallback(this.Rule,to)):e.push(this.parseWithFallback(this.Declaration,to));}return {type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}function zu(e){this.children(e,t=>{t.type==="Declaration"&&this.token(17,";");});}var dr={};b(dr,{generate:()=>Fu,name:()=>Mu,parse:()=>no,structure:()=>Ru});var Mu="Dimension",Ru={value:String,unit:String};function no(){let e=this.tokenStart,t=this.consumeNumber(12);return {type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}function Fu(e){this.token(12,e.value+e.unit);}var gr={};b(gr,{generate:()=>ju,name:()=>Bu,parse:()=>oo,structure:()=>Uu,walkContext:()=>_u});var Bu="Function",_u="function",Uu={name:String,children:[[]]};function oo(e,t){let r=this.tokenStart,n=this.consumeFunctionName(),o=n.toLowerCase(),i;return i=t.hasOwnProperty(o)?t[o].call(this,t):e.call(this,t),this.eof||this.eat(22),{type:"Function",loc:this.getLocation(r,this.tokenStart),name:n,children:i}}function ju(e){this.token(2,e.name+"("),this.children(e),this.token(22,")");}var br={};b(br,{generate:()=>Yu,name:()=>Wu,parse:()=>io,structure:()=>Hu,xxx:()=>qu});var qu="XXX",Wu="Hash",Hu={value:String};function io(){let e=this.tokenStart;return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}function Yu(e){this.token(4,"#"+e.value);}var xr={};b(xr,{generate:()=>Ku,name:()=>Gu,parse:()=>ao,structure:()=>Vu});var Gu="Identifier",Vu={name:String};function ao(){return {type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}function Ku(e){this.token(1,e.name);}var yr={};b(yr,{generate:()=>$u,name:()=>Qu,parse:()=>so,structure:()=>Xu});var Qu="IdSelector",Xu={name:String};function so(){let e=this.tokenStart;return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}function $u(e){this.token(9,"#"+e.name);}var kr={};b(kr,{generate:()=>ep,name:()=>Zu,parse:()=>lo,structure:()=>Ju});var Zu="MediaFeature",Ju={name:String,value:["Identifier","Number","Dimension","Ratio",null]};function lo(){let e=this.tokenStart,t,r=null;if(this.eat(21),this.skipSC(),t=this.consume(1),this.skipSC(),this.tokenType!==22){switch(this.eat(16),this.skipSC(),this.tokenType){case 10:this.lookupNonWSType(1)===9?r=this.Ratio():r=this.Number();break;case 12:r=this.Dimension();break;case 1:r=this.Identifier();break;default:this.error("Number, dimension, ratio or identifier is expected");}this.skipSC();}return this.eat(22),{type:"MediaFeature",loc:this.getLocation(e,this.tokenStart),name:t,value:r}}function ep(e){this.token(21,"("),this.token(1,e.name),e.value!==null&&(this.token(16,":"),this.node(e.value)),this.token(22,")");}var wr={};b(wr,{generate:()=>np,name:()=>tp,parse:()=>co,structure:()=>rp});var tp="MediaQuery",rp={children:[["Identifier","MediaFeature","WhiteSpace"]]};function co(){let e=this.createList(),t=null;this.skipSC();e:for(;!this.eof;){switch(this.tokenType){case 25:case 13:this.next();continue;case 1:t=this.Identifier();break;case 21:t=this.MediaFeature();break;default:break e}e.push(t);}return t===null&&this.error("Identifier or parenthesis is expected"),{type:"MediaQuery",loc:this.getLocationFromList(e),children:e}}function np(e){this.children(e);}var vr={};b(vr,{generate:()=>ap,name:()=>op,parse:()=>uo,structure:()=>ip});var op="MediaQueryList",ip={children:[["MediaQuery"]]};function uo(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===18);)this.next();return {type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}function ap(e){this.children(e,()=>this.token(18,","));}var Sr={};b(Sr,{generate:()=>pp,name:()=>lp,parse:()=>up,structure:()=>cp});var sp=38,lp="NestingSelector",cp={};function up(){let e=this.tokenStart;return this.eatDelim(sp),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}function pp(){this.token(9,"&");}var Cr={};b(Cr,{generate:()=>fp,name:()=>hp,parse:()=>po,structure:()=>mp});var hp="Nth",mp={nth:["AnPlusB","Identifier"],selector:["SelectorList",null]};function po(){this.skipSC();let e=this.tokenStart,t=e,r=null,n;return this.lookupValue(0,"odd")||this.lookupValue(0,"even")?n=this.Identifier():n=this.AnPlusB(),t=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),r=this.SelectorList(),t=this.tokenStart),{type:"Nth",loc:this.getLocation(e,t),nth:n,selector:r}}function fp(e){this.node(e.nth),e.selector!==null&&(this.token(1,"of"),this.node(e.selector));}var Ar={};b(Ar,{generate:()=>bp,name:()=>dp,parse:()=>ho,structure:()=>gp});var dp="Number",gp={value:String};function ho(){return {type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(10)}}function bp(e){this.token(10,e.value);}var Tr={};b(Tr,{generate:()=>kp,name:()=>xp,parse:()=>mo,structure:()=>yp});var xp="Operator",yp={value:String};function mo(){let e=this.tokenStart;return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function kp(e){this.tokenize(e.value);}var Er={};b(Er,{generate:()=>Sp,name:()=>wp,parse:()=>fo,structure:()=>vp});var wp="Parentheses",vp={children:[[]]};function fo(e,t){let r=this.tokenStart,n=null;return this.eat(21),n=e.call(this,t),this.eof||this.eat(22),{type:"Parentheses",loc:this.getLocation(r,this.tokenStart),children:n}}function Sp(e){this.token(21,"("),this.children(e),this.token(22,")");}var Lr={};b(Lr,{generate:()=>Tp,name:()=>Cp,parse:()=>go,structure:()=>Ap});var Cp="Percentage",Ap={value:String};function go(){return {type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(11)}}function Tp(e){this.token(11,e.value+"%");}var Pr={};b(Pr,{generate:()=>Ip,name:()=>Ep,parse:()=>bo,structure:()=>Pp,walkContext:()=>Lp});var Ep="PseudoClassSelector",Lp="function",Pp={name:String,children:[["Raw"],null]};function bo(){let e=this.tokenStart,t=null,r,n;return this.eat(16),this.tokenType===2?(r=this.consumeFunctionName(),n=r.toLowerCase(),hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(this.tokenIndex,null,!1))),this.eat(22)):r=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:r,children:t}}function Ip(e){this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"));}var Ir={};b(Ir,{generate:()=>zp,name:()=>Dp,parse:()=>xo,structure:()=>Np,walkContext:()=>Op});var Dp="PseudoElementSelector",Op="function",Np={name:String,children:[["Raw"],null]};function xo(){let e=this.tokenStart,t=null,r,n;return this.eat(16),this.eat(16),this.tokenType===2?(r=this.consumeFunctionName(),n=r.toLowerCase(),hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(this.tokenIndex,null,!1))),this.eat(22)):r=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:r,children:t}}function zp(e){this.token(16,":"),this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"));}var Dr={};b(Dr,{generate:()=>_p,name:()=>Fp,parse:()=>yo,structure:()=>Bp});var Mp=47,Rp=46;function Ea(){this.skipSC();let e=this.consume(10);for(let t=0;t<e.length;t++){let r=e.charCodeAt(t);!_(r)&&r!==Rp&&this.error("Unsigned number is expected",this.tokenStart-e.length+t);}return Number(e)===0&&this.error("Zero number is not allowed",this.tokenStart-e.length),e}var Fp="Ratio",Bp={left:String,right:String};function yo(){let e=this.tokenStart,t=Ea.call(this),r;return this.skipSC(),this.eatDelim(Mp),r=Ea.call(this),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:r}}function _p(e){this.token(10,e.left),this.token(9,"/"),this.token(10,e.right);}var Or={};b(Or,{generate:()=>Wp,name:()=>jp,parse:()=>ko,structure:()=>qp});function Up(){return this.tokenIndex>0&&this.lookupType(-1)===13?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}var jp="Raw",qp={value:String};function ko(e,t,r){let n=this.getTokenStart(e),o;return this.skipUntilBalanced(e,t||this.consumeUntilBalanceEnd),r&&this.tokenStart>n?o=Up.call(this):o=this.tokenStart,{type:"Raw",loc:this.getLocation(n,o),value:this.substring(n,o)}}function Wp(e){this.tokenize(e.value);}var Nr={};b(Nr,{generate:()=>Kp,name:()=>Yp,parse:()=>wo,structure:()=>Vp,walkContext:()=>Gp});function La(e){return this.Raw(e,this.consumeUntilLeftCurlyBracket,!0)}function Hp(){let e=this.SelectorList();return e.type!=="Raw"&&this.eof===!1&&this.tokenType!==23&&this.error(),e}var Yp="Rule",Gp="rule",Vp={prelude:["SelectorList","Raw"],block:["Block"]};function wo(){let e=this.tokenIndex,t=this.tokenStart,r,n;return this.parseRulePrelude?r=this.parseWithFallback(Hp,La):r=La.call(this,e),n=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:r,block:n}}function Kp(e){this.node(e.prelude),this.node(e.block);}var zr={};b(zr,{generate:()=>$p,name:()=>Qp,parse:()=>vo,structure:()=>Xp});var Qp="Selector",Xp={children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator","WhiteSpace"]]};function vo(){let e=this.readSequence(this.scope.Selector);return this.getFirstListNode(e)===null&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}function $p(e){this.children(e);}var Mr={};b(Mr,{generate:()=>th,name:()=>Zp,parse:()=>So,structure:()=>eh,walkContext:()=>Jp});var Zp="SelectorList",Jp="selector",eh={children:[["Selector","Raw"]]};function So(){let e=this.createList();for(;!this.eof;){if(e.push(this.Selector()),this.tokenType===18){this.next();continue}break}return {type:"SelectorList",loc:this.getLocationFromList(e),children:e}}function th(e){this.children(e,()=>this.token(18,","));}var Fr={};b(Fr,{generate:()=>oh,name:()=>rh,parse:()=>To,structure:()=>nh});var Rr={};b(Rr,{decode:()=>dt,encode:()=>Ao});var Co=92,Pa=34,Ia=39;function dt(e){let t=e.length,r=e.charCodeAt(0),n=r===Pa||r===Ia?1:0,o=n===1&&t>1&&e.charCodeAt(t-1)===r?t-2:t-1,i="";for(let s=n;s<=o;s++){let u=e.charCodeAt(s);if(u===Co){if(s===o){s!==t-1&&(i=e.substr(s+1));break}if(u=e.charCodeAt(++s),Z(Co,u)){let c=s-1,a=le(e,c);s=a-1,i+=Be(e.substring(c+1,a));}else u===13&&e.charCodeAt(s+1)===10&&s++;}else i+=e[s];}return i}function Ao(e,t){let r=t?"'":'"',n=t?Ia:Pa,o="",i=!1;for(let s=0;s<e.length;s++){let u=e.charCodeAt(s);if(u===0){o+="\uFFFD";continue}if(u<=31||u===127){o+="\\"+u.toString(16),i=!0;continue}u===n||u===Co?(o+="\\"+e.charAt(s),i=!1):(i&&(te(u)||he(u))&&(o+=" "),o+=e.charAt(s),i=!1);}return r+o+r}var rh="String",nh={value:String};function To(){return {type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:dt(this.consume(5))}}function oh(e){this.token(5,Ao(e.value));}var Br={};b(Br,{generate:()=>ch,name:()=>ah,parse:()=>Eo,structure:()=>lh,walkContext:()=>sh});var ih=33;function Da(e){return this.Raw(e,null,!1)}var ah="StyleSheet",sh="stylesheet",lh={children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]};function Eo(){let e=this.tokenStart,t=this.createList(),r;for(;!this.eof;){switch(this.tokenType){case 13:this.next();continue;case 25:if(this.charCodeAt(this.tokenStart+2)!==ih){this.next();continue}r=this.Comment();break;case 14:r=this.CDO();break;case 15:r=this.CDC();break;case 3:r=this.parseWithFallback(this.Atrule,Da);break;default:r=this.parseWithFallback(this.Rule,Da);}t.push(r);}return {type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}function ch(e){this.children(e);}var _r={};b(_r,{generate:()=>mh,name:()=>ph,parse:()=>Po,structure:()=>hh});var uh=42,Oa=124;function Lo(){this.tokenType!==1&&this.isDelim(uh)===!1&&this.error("Identifier or asterisk is expected"),this.next();}var ph="TypeSelector",hh={name:String};function Po(){let e=this.tokenStart;return this.isDelim(Oa)?(this.next(),Lo.call(this)):(Lo.call(this),this.isDelim(Oa)&&(this.next(),Lo.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function mh(e){this.tokenize(e.name);}var jr={};b(jr,{generate:()=>xh,name:()=>gh,parse:()=>Do,structure:()=>bh});var Na=43,za=45,Io=63;function gt(e,t){let r=0;for(let n=this.tokenStart+e;n<this.tokenEnd;n++){let o=this.charCodeAt(n);if(o===za&&t&&r!==0)return gt.call(this,e+r+1,!1),-1;te(o)||this.error(t&&r!==0?"Hyphen minus"+(r<6?" or hex digit":"")+" is expected":r<6?"Hex digit is expected":"Unexpected input",n),++r>6&&this.error("Too many hex digits",n);}return this.next(),r}function Ur(e){let t=0;for(;this.isDelim(Io);)++t>e&&this.error("Too many question marks"),this.next();}function fh(e){this.charCodeAt(this.tokenStart)!==e&&this.error((e===Na?"Plus sign":"Hyphen minus")+" is expected");}function dh(){let e=0;switch(this.tokenType){case 10:if(e=gt.call(this,1,!0),this.isDelim(Io)){Ur.call(this,6-e);break}if(this.tokenType===12||this.tokenType===10){fh.call(this,za),gt.call(this,1,!1);break}break;case 12:e=gt.call(this,1,!0),e>0&&Ur.call(this,6-e);break;default:if(this.eatDelim(Na),this.tokenType===1){e=gt.call(this,0,!0),e>0&&Ur.call(this,6-e);break}if(this.isDelim(Io)){this.next(),Ur.call(this,5);break}this.error("Hex digit or question mark is expected");}}var gh="UnicodeRange",bh={value:String};function Do(){let e=this.tokenStart;return this.eatIdent("u"),dh.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function xh(e){this.tokenize(e.value);}var Wr={};b(Wr,{generate:()=>Ah,name:()=>Sh,parse:()=>Mo,structure:()=>Ch});var qr={};b(qr,{decode:()=>No,encode:()=>zo});var yh=32,Oo=92,kh=34,wh=39,vh=40,Ma=41;function No(e){let t=e.length,r=4,n=e.charCodeAt(t-1)===Ma?t-2:t-1,o="";for(;r<n&&he(e.charCodeAt(r));)r++;for(;r<n&&he(e.charCodeAt(n));)n--;for(let i=r;i<=n;i++){let s=e.charCodeAt(i);if(s===Oo){if(i===n){i!==t-1&&(o=e.substr(i+1));break}if(s=e.charCodeAt(++i),Z(Oo,s)){let u=i-1,c=le(e,u);i=c-1,o+=Be(e.substring(u+1,c));}else s===13&&e.charCodeAt(i+1)===10&&i++;}else o+=e[i];}return o}function zo(e){let t="",r=!1;for(let n=0;n<e.length;n++){let o=e.charCodeAt(n);if(o===0){t+="\uFFFD";continue}if(o<=31||o===127){t+="\\"+o.toString(16),r=!0;continue}o===yh||o===Oo||o===kh||o===wh||o===vh||o===Ma?(t+="\\"+e.charAt(n),r=!1):(r&&te(o)&&(t+=" "),t+=e.charAt(n),r=!1);}return "url("+t+")"}var Sh="Url",Ch={value:String};function Mo(){let e=this.tokenStart,t;switch(this.tokenType){case 7:t=No(this.consume(7));break;case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=dt(this.consume(5)),this.skipSC(),this.eof||this.eat(22);break;default:this.error("Url or Function is expected");}return {type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}function Ah(e){this.token(7,zo(e.value));}var Hr={};b(Hr,{generate:()=>Lh,name:()=>Th,parse:()=>Ro,structure:()=>Eh});var Th="Value",Eh={children:[[]]};function Ro(){let e=this.tokenStart,t=this.readSequence(this.scope.Value);return {type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}function Lh(e){this.children(e);}var Yr={};b(Yr,{generate:()=>Oh,name:()=>Ih,parse:()=>Fo,structure:()=>Dh});var Ph=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),Ih="WhiteSpace",Dh={value:String};function Fo(){return this.eat(13),Ph}function Oh(e){this.token(13,e.value);}var Ra=kt(C({generic:!0},xa),{node:bt});var Bo={};b(Bo,{AtrulePrelude:()=>Ba,Selector:()=>Ua,Value:()=>Ha});var Nh=35,zh=42,Fa=43,Mh=45,Rh=47,Fh=117;function xt(e){switch(this.tokenType){case 4:return this.Hash();case 18:return this.Operator();case 21:return this.Parentheses(this.readSequence,e.recognizer);case 19:return this.Brackets(this.readSequence,e.recognizer);case 5:return this.String();case 12:return this.Dimension();case 11:return this.Percentage();case 10:return this.Number();case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer);case 7:return this.Url();case 1:return this.cmpChar(this.tokenStart,Fh)&&this.cmpChar(this.tokenStart+1,Fa)?this.UnicodeRange():this.Identifier();case 9:{let t=this.charCodeAt(this.tokenStart);if(t===Rh||t===zh||t===Fa||t===Mh)return this.Operator();t===Nh&&this.error("Hex or identifier is expected",this.tokenStart+1);break}}}var Ba={getNode:xt};var Bh=35,_h=38,Uh=42,jh=43,qh=47,_a=46,Wh=62,Hh=124,Yh=126;function Gh(e,t){t.last!==null&&t.last.type!=="Combinator"&&e!==null&&e.type!=="Combinator"&&t.push({type:"Combinator",loc:null,name:" "});}function Vh(){switch(this.tokenType){case 19:return this.AttributeSelector();case 4:return this.IdSelector();case 16:return this.lookupType(1)===16?this.PseudoElementSelector():this.PseudoClassSelector();case 1:return this.TypeSelector();case 10:case 11:return this.Percentage();case 12:this.charCodeAt(this.tokenStart)===_a&&this.error("Identifier is expected",this.tokenStart+1);break;case 9:{switch(this.charCodeAt(this.tokenStart)){case jh:case Wh:case Yh:case qh:return this.Combinator();case _a:return this.ClassSelector();case Uh:case Hh:return this.TypeSelector();case Bh:return this.IdSelector();case _h:return this.NestingSelector()}break}}}var Ua={onWhiteSpace:Gh,getNode:Vh};function ja(){return this.createSingleNodeList(this.Raw(this.tokenIndex,null,!1))}function qa(){let e=this.createList();if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===18){e.push(this.Operator());let t=this.tokenIndex,r=this.parseCustomProperty?this.Value(null):this.Raw(this.tokenIndex,this.consumeUntilExclamationMarkOrSemicolon,!1);if(r.type==="Value"&&r.children.isEmpty){for(let n=t-this.tokenIndex;n<=0;n++)if(this.lookupType(n)===13){r.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}e.push(r);}return e}function Wa(e){return e!==null&&e.type==="Operator"&&(e.value[e.value.length-1]==="-"||e.value[e.value.length-1]==="+")}var Ha={getNode:xt,onWhiteSpace(e,t){Wa(e)&&(e.value=" "+e.value),Wa(t.last)&&(t.last.value+=" ");},expression:ja,var:qa};var Ya={parse:{prelude:null,block(){return this.Block(!0)}}};var Ga={parse:{prelude(){let e=this.createList();switch(this.skipSC(),this.tokenType){case 5:e.push(this.String());break;case 7:case 2:e.push(this.Url());break;default:this.error("String or url() is expected");}return (this.lookupNonWSType(0)===1||this.lookupNonWSType(0)===21)&&e.push(this.MediaQueryList()),e},block:null}};var Va={parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}};var Ka={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Qa={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};function Kh(){return this.createSingleNodeList(this.Raw(this.tokenIndex,null,!1))}function Qh(){return this.skipSC(),this.tokenType===1&&this.lookupNonWSType(1)===16?this.createSingleNodeList(this.Declaration()):Xa.call(this)}function Xa(){let e=this.createList(),t;this.skipSC();e:for(;!this.eof;){switch(this.tokenType){case 25:case 13:this.next();continue;case 2:t=this.Function(Kh,this.scope.AtrulePrelude);break;case 1:t=this.Identifier();break;case 21:t=this.Parentheses(Qh,this.scope.AtrulePrelude);break;default:break e}e.push(t);}return e}var $a={parse:{prelude(){let e=Xa.call(this);return this.getFirstListNode(e)===null&&this.error("Condition is expected"),e},block(e=!1){return this.Block(e)}}};var Za={"font-face":Ya,import:Ga,media:Va,nest:Ka,page:Qa,supports:$a};var Oe={parse(){return this.createSingleNodeList(this.SelectorList())}},Xh={parse(){return this.createSingleNodeList(this.Selector())}},Ja={parse(){return this.createSingleNodeList(this.Identifier())}},Gr={parse(){return this.createSingleNodeList(this.Nth())}},es={dir:Ja,has:Oe,lang:Ja,matches:Oe,is:Oe,"-moz-any":Oe,"-webkit-any":Oe,where:Oe,not:Oe,"nth-child":Gr,"nth-last-child":Gr,"nth-last-of-type":Gr,"nth-of-type":Gr,slotted:Xh};var _o={};b(_o,{AnPlusB:()=>qn,Atrule:()=>Wn,AtrulePrelude:()=>Hn,AttributeSelector:()=>Gn,Block:()=>Vn,Brackets:()=>Kn,CDC:()=>Qn,CDO:()=>Xn,ClassSelector:()=>$n,Combinator:()=>Zn,Comment:()=>Jn,Declaration:()=>eo,DeclarationList:()=>ro,Dimension:()=>no,Function:()=>oo,Hash:()=>io,IdSelector:()=>so,Identifier:()=>ao,MediaFeature:()=>lo,MediaQuery:()=>co,MediaQueryList:()=>uo,Nth:()=>po,Number:()=>ho,Operator:()=>mo,Parentheses:()=>fo,Percentage:()=>go,PseudoClassSelector:()=>bo,PseudoElementSelector:()=>xo,Ratio:()=>yo,Raw:()=>ko,Rule:()=>wo,Selector:()=>vo,SelectorList:()=>So,String:()=>To,StyleSheet:()=>Eo,TypeSelector:()=>Po,UnicodeRange:()=>Do,Url:()=>Mo,Value:()=>Ro,WhiteSpace:()=>Fo});var ts={parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},scope:Bo,atrule:Za,pseudo:es,node:_o};var rs={node:bt};var ns=Un(C(C(C({},Ra),ts),rs));var fb="2.3.0";function Uo(e){let t={};for(let r in e){let n=e[r];n&&(Array.isArray(n)||n instanceof O?n=n.map(Uo):n.constructor===Object&&(n=Uo(n))),t[r]=n;}return t}var jo={};b(jo,{decode:()=>$h,encode:()=>Zh});var os=92;function $h(e){let t=e.length-1,r="";for(let n=0;n<e.length;n++){let o=e.charCodeAt(n);if(o===os){if(n===t)break;if(o=e.charCodeAt(++n),Z(os,o)){let i=n-1,s=le(e,i);n=s-1,r+=Be(e.substring(i+1,s));}else o===13&&e.charCodeAt(n+1)===10&&n++;}else r+=e[n];}return r}function Zh(e){let t="";if(e.length===1&&e.charCodeAt(0)===45)return "\\-";for(let r=0;r<e.length;r++){let n=e.charCodeAt(r);if(n===0){t+="\uFFFD";continue}if(n<=31||n===127||n>=48&&n<=57&&(r===0||r===1&&e.charCodeAt(0)===45)){t+="\\"+n.toString(16)+" ";continue}Me(n)?t+=e.charAt(r):t+="\\"+e.charAt(r);}return t}var{tokenize:kb,parse:wb,generate:vb,lexer:Sb,createLexer:Cb,walk:Ab,find:Tb,findLast:Eb,findAll:Lb,toPlainObject:Pb,fromPlainObject:Ib,fork:Db}=ns;

	var cssTree$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Lexer: Xe,
		List: O,
		TokenStream: nt,
		clone: Uo,
		createLexer: Cb,
		createSyntax: Un,
		definitionSyntax: Ln,
		find: Tb,
		findAll: Lb,
		findLast: Eb,
		fork: Db,
		fromPlainObject: Ib,
		generate: vb,
		ident: jo,
		isCustomProperty: Bt,
		keyword: Ft,
		lexer: Sb,
		parse: wb,
		property: hn,
		string: Rr,
		toPlainObject: Pb,
		tokenNames: _e,
		tokenTypes: ze,
		tokenize: kb,
		url: qr,
		vendorPrefix: Zm,
		version: fb,
		walk: Ab
	});

	/*
	 * The MIT License (MIT)
	 * 
	 * Author: Gildas Lormeau
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */
	const REGEXP_SIMPLE_QUOTES_STRING$1 = /^'(.*?)'$/;
	const REGEXP_DOUBLE_QUOTES_STRING$1 = /^"(.*?)"$/;

	const globalKeywords = [
		"inherit",
		"initial",
		"unset"
	];

	const systemFontKeywords = [
		"caption",
		"icon",
		"menu",
		"message-box",
		"small-caption",
		"status-bar"
	];

	const fontWeightKeywords = [
		"normal",
		"bold",
		"bolder",
		"lighter",
		"100",
		"200",
		"300",
		"400",
		"500",
		"600",
		"700",
		"800",
		"900"
	];

	const fontStyleKeywords = [
		"normal",
		"italic",
		"oblique"
	];

	const fontStretchKeywords = [
		"normal",
		"condensed",
		"semi-condensed",
		"extra-condensed",
		"ultra-condensed",
		"expanded",
		"semi-expanded",
		"extra-expanded",
		"ultra-expanded"
	];

	const errorPrefix = "[parse-css-font] ";

	function parse(value) {
		const stringValue = vb(value);
		if (systemFontKeywords.indexOf(stringValue) !== -1) {
			return { system: stringValue };
		}
		const tokens = value.children;

		const font = {
			lineHeight: "normal",
			stretch: "normal",
			style: "normal",
			variant: "normal",
			weight: "normal",
		};

		let isLocked = false;
		for (let tokenNode = tokens.head; tokenNode; tokenNode = tokenNode.next) {
			const token = vb(tokenNode.data);
			if (token === "normal" || globalKeywords.indexOf(token) !== -1) {
				["style", "variant", "weight", "stretch"].forEach((prop) => {
					font[prop] = token;
				});
				isLocked = true;
				continue;
			}

			if (fontWeightKeywords.indexOf(token) !== -1) {
				if (isLocked) {
					continue;
				}
				font.weight = token;
				continue;
			}

			if (fontStyleKeywords.indexOf(token) !== -1) {
				if (isLocked) {
					continue;
				}
				font.style = token;
				continue;
			}

			if (fontStretchKeywords.indexOf(token) !== -1) {
				if (isLocked) {
					continue;
				}
				font.stretch = token;
				continue;
			}

			if (tokenNode.data.type == "Dimension") {
				font.size = vb(tokenNode.data);
				tokenNode = tokenNode.next;
				if (tokenNode && tokenNode.data.type == "Operator" && tokenNode.data.value == "/" && tokenNode.next) {
					tokenNode = tokenNode.next;
					font.lineHeight = vb(tokenNode.data);
					tokenNode = tokenNode.next;
				} else if (tokens.head.data.type == "Operator" && tokens.head.data.value == "/" && tokens.head.next) {
					font.lineHeight = vb(tokens.head.next.data);
					tokenNode = tokens.head.next.next;
				}
				if (!tokenNode) {
					throw error("Missing required font-family.");
				}
				font.family = [];
				for (; tokenNode; tokenNode = tokenNode.next) {
					while (tokenNode && tokenNode.data.type == "Operator" && tokenNode.data.value == ",") {
						tokenNode = tokenNode.next;
					}
					if (tokenNode) {
						font.family.push(removeQuotes(vb(tokenNode.data)));
					}
				}
				return font;
			}

			if (font.variant !== "normal") {
				throw error("Unknown or unsupported font token: " + font.variant);
			}

			if (isLocked) {
				continue;
			}
			font.variant = token;
		}

		throw error("Missing required font-size.");
	}

	function error(message) {
		return new Error(errorPrefix + message);
	}

	function removeQuotes(string) {
		if (string.match(REGEXP_SIMPLE_QUOTES_STRING$1)) {
			string = string.replace(REGEXP_SIMPLE_QUOTES_STRING$1, "$1");
		} else {
			string = string.replace(REGEXP_DOUBLE_QUOTES_STRING$1, "$1");
		}
		return string.trim();
	}

	var cssFontPropertyParser = /*#__PURE__*/Object.freeze({
		__proto__: null,
		parse: parse
	});

	/*
	 * The MIT License (MIT)
	 * 
	 * Author: Gildas Lormeau
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	// derived from https://github.com/dryoma/postcss-media-query-parser

	/*
	 * The MIT License (MIT)
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	*/

	/**
	 * Parses a media feature expression, e.g. `max-width: 10px`, `(color)`
	 *
	 * @param {string} string - the source expression string, can be inside parens
	 * @param {Number} index - the index of `string` in the overall input
	 *
	 * @return {Array} an array of Nodes, the first element being a media feature,
	 *    the second - its value (may be missing)
	 */

	function parseMediaFeature(string, index = 0) {
		const modesEntered = [{
			mode: "normal",
			character: null,
		}];
		const result = [];
		let lastModeIndex = 0, mediaFeature = "", colon = null, mediaFeatureValue = null, indexLocal = index;

		let stringNormalized = string;
		// Strip trailing parens (if any), and correct the starting index
		if (string[0] === "(" && string[string.length - 1] === ")") {
			stringNormalized = string.substring(1, string.length - 1);
			indexLocal++;
		}

		for (let i = 0; i < stringNormalized.length; i++) {
			const character = stringNormalized[i];

			// If entering/exiting a string
			if (character === "'" || character === "\"") {
				if (modesEntered[lastModeIndex].isCalculationEnabled === true) {
					modesEntered.push({
						mode: "string",
						isCalculationEnabled: false,
						character,
					});
					lastModeIndex++;
				} else if (modesEntered[lastModeIndex].mode === "string" &&
					modesEntered[lastModeIndex].character === character &&
					stringNormalized[i - 1] !== "\\"
				) {
					modesEntered.pop();
					lastModeIndex--;
				}
			}

			// If entering/exiting interpolation
			if (character === "{") {
				modesEntered.push({
					mode: "interpolation",
					isCalculationEnabled: true,
				});
				lastModeIndex++;
			} else if (character === "}") {
				modesEntered.pop();
				lastModeIndex--;
			}

			// If a : is met outside of a string, function call or interpolation, than
			// this : separates a media feature and a value
			if (modesEntered[lastModeIndex].mode === "normal" && character === ":") {
				const mediaFeatureValueStr = stringNormalized.substring(i + 1);
				mediaFeatureValue = {
					type: "value",
					before: /^(\s*)/.exec(mediaFeatureValueStr)[1],
					after: /(\s*)$/.exec(mediaFeatureValueStr)[1],
					value: mediaFeatureValueStr.trim(),
				};
				// +1 for the colon
				mediaFeatureValue.sourceIndex =
					mediaFeatureValue.before.length + i + 1 + indexLocal;
				colon = {
					type: "colon",
					sourceIndex: i + indexLocal,
					after: mediaFeatureValue.before,
					value: ":", // for consistency only
				};
				break;
			}

			mediaFeature += character;
		}

		// Forming a media feature node
		mediaFeature = {
			type: "media-feature",
			before: /^(\s*)/.exec(mediaFeature)[1],
			after: /(\s*)$/.exec(mediaFeature)[1],
			value: mediaFeature.trim(),
		};
		mediaFeature.sourceIndex = mediaFeature.before.length + indexLocal;
		result.push(mediaFeature);

		if (colon !== null) {
			colon.before = mediaFeature.after;
			result.push(colon);
		}

		if (mediaFeatureValue !== null) {
			result.push(mediaFeatureValue);
		}

		return result;
	}

	/**
	 * Parses a media query, e.g. `screen and (color)`, `only tv`
	 *
	 * @param {string} string - the source media query string
	 * @param {Number} index - the index of `string` in the overall input
	 *
	 * @return {Array} an array of Nodes and Containers
	 */

	function parseMediaQuery(string, index = 0) {
		const result = [];

		// How many times the parser entered parens/curly braces
		let localLevel = 0;
		// Has any keyword, media type, media feature expression or interpolation
		// ('element' hereafter) started
		let insideSomeValue = false, node;

		function resetNode() {
			return {
				before: "",
				after: "",
				value: "",
			};
		}

		node = resetNode();

		for (let i = 0; i < string.length; i++) {
			const character = string[i];
			// If not yet entered any element
			if (!insideSomeValue) {
				if (character.search(/\s/) !== -1) {
					// A whitespace
					// Don't form 'after' yet; will do it later
					node.before += character;
				} else {
					// Not a whitespace - entering an element
					// Expression start
					if (character === "(") {
						node.type = "media-feature-expression";
						localLevel++;
					}
					node.value = character;
					node.sourceIndex = index + i;
					insideSomeValue = true;
				}
			} else {
				// Already in the middle of some element
				node.value += character;

				// Here parens just increase localLevel and don't trigger a start of
				// a media feature expression (since they can't be nested)
				// Interpolation start
				if (character === "{" || character === "(") { localLevel++; }
				// Interpolation/function call/media feature expression end
				if (character === ")" || character === "}") { localLevel--; }
			}

			// If exited all parens/curlies and the next symbol
			if (insideSomeValue && localLevel === 0 &&
				(character === ")" || i === string.length - 1 ||
					string[i + 1].search(/\s/) !== -1)
			) {
				if (["not", "only", "and"].indexOf(node.value) !== -1) {
					node.type = "keyword";
				}
				// if it's an expression, parse its contents
				if (node.type === "media-feature-expression") {
					node.nodes = parseMediaFeature(node.value, node.sourceIndex);
				}
				result.push(Array.isArray(node.nodes) ?
					new Container(node) : new Node(node));
				node = resetNode();
				insideSomeValue = false;
			}
		}

		// Now process the result array - to specify undefined types of the nodes
		// and specify the `after` prop
		for (let i = 0; i < result.length; i++) {
			node = result[i];
			if (i > 0) { result[i - 1].after = node.before; }

			// Node types. Might not be set because contains interpolation/function
			// calls or fully consists of them
			if (node.type === undefined) {
				if (i > 0) {
					// only `and` can follow an expression
					if (result[i - 1].type === "media-feature-expression") {
						node.type = "keyword";
						continue;
					}
					// Anything after 'only|not' is a media type
					if (result[i - 1].value === "not" || result[i - 1].value === "only") {
						node.type = "media-type";
						continue;
					}
					// Anything after 'and' is an expression
					if (result[i - 1].value === "and") {
						node.type = "media-feature-expression";
						continue;
					}

					if (result[i - 1].type === "media-type") {
						// if it is the last element - it might be an expression
						// or 'and' depending on what is after it
						if (!result[i + 1]) {
							node.type = "media-feature-expression";
						} else {
							node.type = result[i + 1].type === "media-feature-expression" ?
								"keyword" : "media-feature-expression";
						}
					}
				}

				if (i === 0) {
					// `screen`, `fn( ... )`, `#{ ... }`. Not an expression, since then
					// its type would have been set by now
					if (!result[i + 1]) {
						node.type = "media-type";
						continue;
					}

					// `screen and` or `#{...} (max-width: 10px)`
					if (result[i + 1] &&
						(result[i + 1].type === "media-feature-expression" ||
							result[i + 1].type === "keyword")
					) {
						node.type = "media-type";
						continue;
					}
					if (result[i + 2]) {
						// `screen and (color) ...`
						if (result[i + 2].type === "media-feature-expression") {
							node.type = "media-type";
							result[i + 1].type = "keyword";
							continue;
						}
						// `only screen and ...`
						if (result[i + 2].type === "keyword") {
							node.type = "keyword";
							result[i + 1].type = "media-type";
							continue;
						}
					}
					if (result[i + 3]) {
						// `screen and (color) ...`
						if (result[i + 3].type === "media-feature-expression") {
							node.type = "keyword";
							result[i + 1].type = "media-type";
							result[i + 2].type = "keyword";
							continue;
						}
					}
				}
			}
		}
		return result;
	}

	/**
	 * Parses a media query list. Takes a possible `url()` at the start into
	 * account, and divides the list into media queries that are parsed separately
	 *
	 * @param {string} string - the source media query list string
	 *
	 * @return {Array} an array of Nodes/Containers
	 */

	function parseMediaList(string) {
		const result = [];
		let interimIndex = 0, levelLocal = 0;

		// Check for a `url(...)` part (if it is contents of an @import rule)
		const doesHaveUrl = /^(\s*)url\s*\(/.exec(string);
		if (doesHaveUrl !== null) {
			let i = doesHaveUrl[0].length;
			let parenthesesLv = 1;
			while (parenthesesLv > 0) {
				const character = string[i];
				if (character === "(") { parenthesesLv++; }
				if (character === ")") { parenthesesLv--; }
				i++;
			}
			result.unshift(new Node({
				type: "url",
				value: string.substring(0, i).trim(),
				sourceIndex: doesHaveUrl[1].length,
				before: doesHaveUrl[1],
				after: /^(\s*)/.exec(string.substring(i))[1],
			}));
			interimIndex = i;
		}

		// Start processing the media query list
		for (let i = interimIndex; i < string.length; i++) {
			const character = string[i];

			// Dividing the media query list into comma-separated media queries
			// Only count commas that are outside of any parens
			// (i.e., not part of function call params list, etc.)
			if (character === "(") { levelLocal++; }
			if (character === ")") { levelLocal--; }
			if (levelLocal === 0 && character === ",") {
				const mediaQueryString = string.substring(interimIndex, i);
				const spaceBefore = /^(\s*)/.exec(mediaQueryString)[1];
				result.push(new Container({
					type: "media-query",
					value: mediaQueryString.trim(),
					sourceIndex: interimIndex + spaceBefore.length,
					nodes: parseMediaQuery(mediaQueryString, interimIndex),
					before: spaceBefore,
					after: /(\s*)$/.exec(mediaQueryString)[1],
				}));
				interimIndex = i + 1;
			}
		}

		const mediaQueryString = string.substring(interimIndex);
		const spaceBefore = /^(\s*)/.exec(mediaQueryString)[1];
		result.push(new Container({
			type: "media-query",
			value: mediaQueryString.trim(),
			sourceIndex: interimIndex + spaceBefore.length,
			nodes: parseMediaQuery(mediaQueryString, interimIndex),
			before: spaceBefore,
			after: /(\s*)$/.exec(mediaQueryString)[1],
		}));

		return result;
	}

	function Container(opts) {
		this.constructor(opts);

		this.nodes = opts.nodes;

		if (this.after === undefined) {
			this.after = this.nodes.length > 0 ?
				this.nodes[this.nodes.length - 1].after : "";
		}

		if (this.before === undefined) {
			this.before = this.nodes.length > 0 ?
				this.nodes[0].before : "";
		}

		if (this.sourceIndex === undefined) {
			this.sourceIndex = this.before.length;
		}

		this.nodes.forEach(node => {
			node.parent = this; // eslint-disable-line no-param-reassign
		});
	}

	Container.prototype = Object.create(Node.prototype);
	Container.constructor = Node;

	/**
	 * Iterate over descendant nodes of the node
	 *
	 * @param {RegExp|string} filter - Optional. Only nodes with node.type that
	 *    satisfies the filter will be traversed over
	 * @param {function} cb - callback to call on each node. Takes these params:
	 *    node - the node being processed, i - it's index, nodes - the array
	 *    of all nodes
	 *    If false is returned, the iteration breaks
	 *
	 * @return (boolean) false, if the iteration was broken
	 */
	Container.prototype.walk = function walk(filter, cb) {
		const hasFilter = typeof filter === "string" || filter instanceof RegExp;
		const callback = hasFilter ? cb : filter;
		const filterReg = typeof filter === "string" ? new RegExp(filter) : filter;

		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const filtered = hasFilter ? filterReg.test(node.type) : true;
			if (filtered && callback && callback(node, i, this.nodes) === false) {
				return false;
			}
			if (node.nodes && node.walk(filter, cb) === false) { return false; }
		}
		return true;
	};

	/**
	 * Iterate over immediate children of the node
	 *
	 * @param {function} cb - callback to call on each node. Takes these params:
	 *    node - the node being processed, i - it's index, nodes - the array
	 *    of all nodes
	 *    If false is returned, the iteration breaks
	 *
	 * @return (boolean) false, if the iteration was broken
	 */
	Container.prototype.each = function each(cb = () => { }) {
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			if (cb(node, i, this.nodes) === false) { return false; }
		}
		return true;
	};

	/**
	 * A very generic node. Pretty much any element of a media query
	 */

	function Node(opts) {
		this.after = opts.after;
		this.before = opts.before;
		this.type = opts.type;
		this.value = opts.value;
		this.sourceIndex = opts.sourceIndex;
	}

	var cssMediaQueryParser = /*#__PURE__*/Object.freeze({
		__proto__: null,
		parseMediaList: parseMediaList
	});

	/*
	 * The MIT License (MIT)
	 * 
	 * Author: Gildas Lormeau
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	// derived from https://github.com/fmarcia/UglifyCSS

	/**
	 * UglifyCSS
	 * Port of YUI CSS Compressor to NodeJS
	 * Author: Franck Marcia - https://github.com/fmarcia
	 * MIT licenced
	 */

	/**
	 * cssmin.js
	 * Author: Stoyan Stefanov - http://phpied.com/
	 * This is a JavaScript port of the CSS minification tool
	 * distributed with YUICompressor, itself a port
	 * of the cssmin utility by Isaac Schlueter - http://foohack.com/
	 * Permission is hereby granted to use the JavaScript version under the same
	 * conditions as the YUICompressor (original YUICompressor note below).
	 */

	/**
	 * YUI Compressor
	 * http://developer.yahoo.com/yui/compressor/
	 * Author: Julien Lecomte - http://www.julienlecomte.net/
	 * Copyright (c) 2011 Yahoo! Inc. All rights reserved.
	 * The copyrights embodied in the content of this file are licensed
	 * by Yahoo! Inc. under the BSD (revised) open source license.
	 */

	/**
	 * @type {string} - placeholder prefix
	 */

	const ___PRESERVED_TOKEN_ = "___PRESERVED_TOKEN_";

	/**
	 * @typedef {object} options - UglifyCSS options
	 * @property {number} [maxLineLen=0] - Maximum line length of uglified CSS
	 * @property {boolean} [expandVars=false] - Expand variables
	 * @property {boolean} [uglyComments=false] - Removes newlines within preserved comments
	 * @property {boolean} [cuteComments=false] - Preserves newlines within and around preserved comments
	 * @property {boolean} [debug=false] - Prints full error stack on error
	 * @property {string} [output=''] - Output file name
	 */

	/**
	 * @type {options} - UglifyCSS options
	 */

	const defaultOptions = {
		maxLineLen: 0,
		expandVars: false,
		uglyComments: false,
		cuteComments: false,
		debug: false,
		output: ""
	};

	const REGEXP_DATA_URI = /url\(\s*(["']?)data:/g;
	const REGEXP_WHITE_SPACES = /\s+/g;
	const REGEXP_NEW_LINE = /\n/g;

	/**
	 * extractDataUrls replaces all data urls with tokens before we start
	 * compressing, to avoid performance issues running some of the subsequent
	 * regexes against large strings chunks.
	 *
	 * @param {string} css - CSS content
	 * @param {string[]} preservedTokens - Global array of tokens to preserve
	 *
	 * @return {string} Processed CSS
	 */

	function extractDataUrls(css, preservedTokens) {

		// Leave data urls alone to increase parse performance.
		const pattern = REGEXP_DATA_URI;
		const maxIndex = css.length - 1;
		const sb = [];

		let appendIndex = 0, match;

		// Since we need to account for non-base64 data urls, we need to handle
		// ' and ) being part of the data string. Hence switching to indexOf,
		// to determine whether or not we have matching string terminators and
		// handling sb appends directly, instead of using matcher.append* methods.

		while ((match = pattern.exec(css)) !== null) {

			const startIndex = match.index + 4;  // 'url('.length()
			let terminator = match[1];         // ', " or empty (not quoted)

			if (terminator.length === 0) {
				terminator = ")";
			}

			let foundTerminator = false, endIndex = pattern.lastIndex - 1;

			while (foundTerminator === false && endIndex + 1 <= maxIndex && endIndex != -1) {
				endIndex = css.indexOf(terminator, endIndex + 1);

				// endIndex == 0 doesn't really apply here
				if ((endIndex > 0) && (css.charAt(endIndex - 1) !== "\\")) {
					foundTerminator = true;
					if (")" != terminator) {
						endIndex = css.indexOf(")", endIndex);
					}
				}
			}

			// Enough searching, start moving stuff over to the buffer
			sb.push(css.substring(appendIndex, match.index));

			if (foundTerminator) {

				let token = css.substring(startIndex, endIndex);
				const parts = token.split(",");
				if (parts.length > 1 && parts[0].slice(-7) == ";base64") {
					token = token.replace(REGEXP_WHITE_SPACES, "");
				} else {
					token = token.replace(REGEXP_NEW_LINE, " ");
					token = token.replace(REGEXP_WHITE_SPACES, " ");
					token = token.replace(REGEXP_PRESERVE_HSLA1, "");
				}

				preservedTokens.push(token);

				const preserver = "url(" + ___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___)";
				sb.push(preserver);

				appendIndex = endIndex + 1;
			} else {
				// No end terminator found, re-add the whole match. Should we throw/warn here?
				sb.push(css.substring(match.index, pattern.lastIndex));
				appendIndex = pattern.lastIndex;
			}
		}

		sb.push(css.substring(appendIndex));

		return sb.join("");
	}

	const REGEXP_HEX_COLORS = /(=\s*?["']?)?#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])(\}|[^0-9a-f{][^{]*?\})/gi;

	/**
	 * compressHexColors compresses hex color values of the form #AABBCC to #ABC.
	 *
	 * DOES NOT compress CSS ID selectors which match the above pattern (which would
	 * break things), like #AddressForm { ... }
	 *
	 * DOES NOT compress IE filters, which have hex color values (which would break
	 * things), like chroma(color='#FFFFFF');
	 *
	 * DOES NOT compress invalid hex values, like background-color: #aabbccdd
	 *
	 * @param {string} css - CSS content
	 *
	 * @return {string} Processed CSS
	 */

	function compressHexColors(css) {

		// Look for hex colors inside { ... } (to avoid IDs) and which don't have a =, or a " in front of them (to avoid filters)

		const pattern = REGEXP_HEX_COLORS;
		const sb = [];

		let index = 0, match;

		while ((match = pattern.exec(css)) !== null) {

			sb.push(css.substring(index, match.index));

			const isFilter = match[1];

			if (isFilter) {
				// Restore, maintain case, otherwise filter will break
				sb.push(match[1] + "#" + (match[2] + match[3] + match[4] + match[5] + match[6] + match[7]));
			} else {
				if (match[2].toLowerCase() == match[3].toLowerCase() &&
					match[4].toLowerCase() == match[5].toLowerCase() &&
					match[6].toLowerCase() == match[7].toLowerCase()) {

					// Compress.
					sb.push("#" + (match[3] + match[5] + match[7]).toLowerCase());
				} else {
					// Non compressible color, restore but lower case.
					sb.push("#" + (match[2] + match[3] + match[4] + match[5] + match[6] + match[7]).toLowerCase());
				}
			}

			index = pattern.lastIndex = pattern.lastIndex - match[8].length;
		}

		sb.push(css.substring(index));

		return sb.join("");
	}

	const REGEXP_KEYFRAMES = /@[a-z0-9-_]*keyframes\s+[a-z0-9-_]+\s*{/gi;
	const REGEXP_WHITE_SPACE = /(^\s|\s$)/g;

	/** keyframes preserves 0 followed by unit in keyframes steps
	 *
	 * @param {string} content - CSS content
	 * @param {string[]} preservedTokens - Global array of tokens to preserve
	 *
	 * @return {string} Processed CSS
	 */

	function keyframes(content, preservedTokens) {

		const pattern = REGEXP_KEYFRAMES;

		let index = 0, buffer;

		const preserve = (part, i) => {
			part = part.replace(REGEXP_WHITE_SPACE, "");
			if (part.charAt(0) === "0") {
				preservedTokens.push(part);
				buffer[i] = ___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___";
			}
		};

		while (true) { // eslint-disable-line no-constant-condition

			let level = 0;
			buffer = "";

			let startIndex = content.slice(index).search(pattern);
			if (startIndex < 0) {
				break;
			}

			index += startIndex;
			startIndex = index;

			const len = content.length;
			const buffers = [];

			for (; index < len; ++index) {

				const ch = content.charAt(index);

				if (ch === "{") {

					if (level === 0) {
						buffers.push(buffer.replace(REGEXP_WHITE_SPACE, ""));

					} else if (level === 1) {

						buffer = buffer.split(",");

						buffer.forEach(preserve);

						buffers.push(buffer.join(",").replace(REGEXP_WHITE_SPACE, ""));
					}

					buffer = "";
					level += 1;

				} else if (ch === "}") {

					if (level === 2) {
						buffers.push("{" + buffer.replace(REGEXP_WHITE_SPACE, "") + "}");
						buffer = "";

					} else if (level === 1) {
						content = content.slice(0, startIndex) +
							buffers.shift() + "{" +
							buffers.join("") +
							content.slice(index);
						break;
					}

					level -= 1;
				}

				if (level < 0) {
					break;

				} else if (ch !== "{" && ch !== "}") {
					buffer += ch;
				}
			}
		}

		return content;
	}

	/**
	 * collectComments collects all comment blocks and return new content with comment placeholders
	 *
	 * @param {string} content - CSS content
	 * @param {string[]} comments - Global array of extracted comments
	 *
	 * @return {string} Processed CSS
	 */

	function collectComments(content, comments) {

		const table = [];

		let from = 0, end;

		while (true) { // eslint-disable-line no-constant-condition

			const start = content.indexOf("/*", from);

			if (start > -1) {

				end = content.indexOf("*/", start + 2);

				if (end > -1) {
					comments.push(content.slice(start + 2, end));
					table.push(content.slice(from, start));
					table.push("/*___PRESERVE_CANDIDATE_COMMENT_" + (comments.length - 1) + "___*/");
					from = end + 2;

				} else {
					// unterminated comment
					end = -2;
					break;
				}

			} else {
				break;
			}
		}

		table.push(content.slice(end + 2));

		return table.join("");
	}

	/**
	 * processString uglifies a CSS string
	 *
	 * @param {string} content - CSS string
	 * @param {options} options - UglifyCSS options
	 *
	 * @return {string} Uglified result
	 */

	// const REGEXP_EMPTY_RULES = /[^};{/]+\{\}/g;
	const REGEXP_PRESERVE_STRING1 = /"([^\\"])*"/g;
	const REGEXP_PRESERVE_STRING1_BIS = /"(\\.)*"/g;
	const REGEXP_PRESERVE_STRING1_TER = /"(\\)*"/g;
	const REGEXP_PRESERVE_STRING2 = /'([^\\']|\\.|\\)*'/g;
	const REGEXP_MINIFY_ALPHA = /progid:DXImageTransform.Microsoft.Alpha\(Opacity=/gi;
	const REGEXP_PRESERVE_TOKEN1 = /\r\n/g;
	const REGEXP_PRESERVE_TOKEN2 = /[\r\n]/g;
	const REGEXP_VARIABLES = /@variables\s*\{\s*([^}]+)\s*\}/g;
	const REGEXP_VARIABLE = /\s*([a-z0-9-]+)\s*:\s*([^;}]+)\s*/gi;
	const REGEXP_VARIABLE_VALUE = /var\s*\(\s*([^)]+)\s*\)/g;
	const REGEXP_PRESERVE_CALC = /calc\(([^;}]*)\)/g;
	const REGEXP_TRIM = /(^\s*|\s*$)/g;
	const REGEXP_PRESERVE_CALC2 = /\( /g;
	const REGEXP_PRESERVE_CALC3 = / \)/g;
	const REGEXP_PRESERVE_MATRIX = /\s*filter:\s*progid:DXImageTransform.Microsoft.Matrix\(([^)]+)\);/g;
	const REGEXP_REMOVE_SPACES = /(^|\})(([^{:])+:)+([^{]*{)/g;
	const REGEXP_REMOVE_SPACES2 = /\s+([!{;:>+()\],])/g;
	const REGEXP_REMOVE_SPACES2_BIS = /([^\\])\s+([}])/g;
	const REGEXP_RESTORE_SPACE_IMPORTANT = /!important/g;
	const REGEXP_PSEUDOCLASSCOLON = /___PSEUDOCLASSCOLON___/g;
	const REGEXP_COLUMN = /:/g;
	const REGEXP_PRESERVE_ZERO_UNIT = /\s*(animation|animation-delay|animation-duration|transition|transition-delay|transition-duration):\s*([^;}]+)/gi;
	const REGEXP_PRESERVE_ZERO_UNIT1 = /(^|\D)0?\.?0(m?s)/gi;
	const REGEXP_PRESERVE_FLEX = /\s*(flex|flex-basis):\s*([^;}]+)/gi;
	const REGEXP_SPACES = /\s+/;
	const REGEXP_PRESERVE_HSLA = /(hsla?)\(([^)]+)\)/g;
	const REGEXP_PRESERVE_HSLA1 = /(^\s+|\s+$)/g;
	const REGEXP_RETAIN_SPACE_IE6 = /:first-(line|letter)(\{|,)/gi;
	const REGEXP_CHARSET = /^(.*)(@charset)( "[^"]*";)/gi;
	const REGEXP_REMOVE_SECOND_CHARSET = /^((\s*)(@charset)( [^;]+;\s*))+/gi;
	const REGEXP_LOWERCASE_DIRECTIVES = /@(font-face|import|(?:-(?:atsc|khtml|moz|ms|o|wap|webkit)-)?keyframe|media|page|namespace)/gi;
	const REGEXP_LOWERCASE_PSEUDO_ELEMENTS = /:(active|after|before|checked|disabled|empty|enabled|first-(?:child|of-type)|focus|hover|last-(?:child|of-type)|link|only-(?:child|of-type)|root|:selection|target|visited)/gi;
	const REGEXP_CHARSET2 = /^(.*)(@charset "[^"]*";)/g;
	const REGEXP_CHARSET3 = /^(\s*@charset [^;]+;\s*)+/g;
	const REGEXP_LOWERCASE_FUNCTIONS = /:(lang|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|(?:-(?:atsc|khtml|moz|ms|o|wap|webkit)-)?any)\(/gi;
	const REGEXP_LOWERCASE_FUNCTIONS2 = /([:,( ]\s*)(attr|color-stop|from|rgba|to|url|(?:-(?:atsc|khtml|moz|ms|o|wap|webkit)-)?(?:calc|max|min|(?:repeating-)?(?:linear|radial)-gradient)|-webkit-gradient)/gi;
	const REGEXP_NEWLINE1 = /\s*\/\*/g;
	const REGEXP_NEWLINE2 = /\*\/\s*/g;
	const REGEXP_RESTORE_SPACE1 = /\band\(/gi;
	const REGEXP_RESTORE_SPACE2 = /([^:])not\(/gi;
	const REGEXP_RESTORE_SPACE3 = /\bor\(/gi;
	const REGEXP_REMOVE_SPACES3 = /([!{}:;>+([,])\s+/g;
	const REGEXP_REMOVE_SEMI_COLUMNS = /;+\}/g;
	// const REGEXP_REPLACE_ZERO = /(^|[^.0-9\\])(?:0?\.)?0(?:ex|ch|r?em|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|g?rad|turn|ms|k?Hz|dpi|dpcm|dppx|%)(?![a-z0-9])/gi;
	const REGEXP_REPLACE_ZERO_DOT = /([0-9])\.0(ex|ch|r?em|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|g?rad|turn|m?s|k?Hz|dpi|dpcm|dppx|%| |;)/gi;
	const REGEXP_REPLACE_4_ZEROS = /:0 0 0 0(;|\})/g;
	const REGEXP_REPLACE_3_ZEROS = /:0 0 0(;|\})/g;
	// const REGEXP_REPLACE_2_ZEROS = /:0 0(;|\})/g;
	const REGEXP_REPLACE_1_ZERO = /(transform-origin|webkit-transform-origin|moz-transform-origin|o-transform-origin|ms-transform-origin|box-shadow):0(;|\})/gi;
	const REGEXP_REPLACE_ZERO_DOT_DECIMAL = /(:|\s)0+\.(\d+)/g;
	const REGEXP_REPLACE_RGB = /rgb\s*\(\s*([0-9,\s]+)\s*\)/gi;
	const REGEXP_REPLACE_BORDER_ZERO = /(border|border-top|border-right|border-bottom|border-left|outline|background):none(;|\})/gi;
	const REGEXP_REPLACE_IE_OPACITY = /progid:DXImageTransform\.Microsoft\.Alpha\(Opacity=/gi;
	const REGEXP_REPLACE_QUERY_FRACTION = /\(([-A-Za-z]+):([0-9]+)\/([0-9]+)\)/g;
	const REGEXP_QUERY_FRACTION = /___QUERY_FRACTION___/g;
	const REGEXP_REPLACE_SEMI_COLUMNS = /;;+/g;
	const REGEXP_REPLACE_HASH_COLOR = /(:|\s)(#f00)(;|})/g;
	const REGEXP_PRESERVED_NEWLINE = /___PRESERVED_NEWLINE___/g;
	const REGEXP_REPLACE_HASH_COLOR_SHORT1 = /(:|\s)(#000080)(;|})/g;
	const REGEXP_REPLACE_HASH_COLOR_SHORT2 = /(:|\s)(#808080)(;|})/g;
	const REGEXP_REPLACE_HASH_COLOR_SHORT3 = /(:|\s)(#808000)(;|})/g;
	const REGEXP_REPLACE_HASH_COLOR_SHORT4 = /(:|\s)(#800080)(;|})/g;
	const REGEXP_REPLACE_HASH_COLOR_SHORT5 = /(:|\s)(#c0c0c0)(;|})/g;
	const REGEXP_REPLACE_HASH_COLOR_SHORT6 = /(:|\s)(#008080)(;|})/g;
	const REGEXP_REPLACE_HASH_COLOR_SHORT7 = /(:|\s)(#ffa500)(;|})/g;
	const REGEXP_REPLACE_HASH_COLOR_SHORT8 = /(:|\s)(#800000)(;|})/g;

	function processString(content = "", options = defaultOptions) {

		const comments = [];
		const preservedTokens = [];

		let pattern;

		const originalContent = content;
		content = extractDataUrls(content, preservedTokens);
		content = collectComments(content, comments);

		// preserve strings so their content doesn't get accidentally minified
		preserveString(REGEXP_PRESERVE_STRING1);
		preserveString(REGEXP_PRESERVE_STRING1_BIS);
		preserveString(REGEXP_PRESERVE_STRING1_TER);
		preserveString(REGEXP_PRESERVE_STRING2);

		function preserveString(pattern) {
			content = content.replace(pattern, token => {
				const quote = token.substring(0, 1);
				token = token.slice(1, -1);
				// maybe the string contains a comment-like substring or more? put'em back then
				if (token.indexOf("___PRESERVE_CANDIDATE_COMMENT_") >= 0) {
					for (let i = 0, len = comments.length; i < len; i += 1) {
						token = token.replace("___PRESERVE_CANDIDATE_COMMENT_" + i + "___", comments[i]);
					}
				}
				// minify alpha opacity in filter strings
				token = token.replace(REGEXP_MINIFY_ALPHA, "alpha(opacity=");
				preservedTokens.push(token);
				return quote + ___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___" + quote;
			});
		}

		// strings are safe, now wrestle the comments
		for (let i = 0, len = comments.length; i < len; i += 1) {

			const token = comments[i];
			const placeholder = "___PRESERVE_CANDIDATE_COMMENT_" + i + "___";

			// ! in the first position of the comment means preserve
			// so push to the preserved tokens keeping the !
			if (token.charAt(0) === "!") {
				if (options.cuteComments) {
					preservedTokens.push(token.substring(1).replace(REGEXP_PRESERVE_TOKEN1, "\n"));
				} else if (options.uglyComments) {
					preservedTokens.push(token.substring(1).replace(REGEXP_PRESERVE_TOKEN2, ""));
				} else {
					preservedTokens.push(token);
				}
				content = content.replace(placeholder, ___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___");
				continue;
			}

			// \ in the last position looks like hack for Mac/IE5
			// shorten that to /*\*/ and the next one to /**/
			if (token.charAt(token.length - 1) === "\\") {
				preservedTokens.push("\\");
				content = content.replace(placeholder, ___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___");
				i = i + 1; // attn: advancing the loop
				preservedTokens.push("");
				content = content.replace(
					"___PRESERVE_CANDIDATE_COMMENT_" + i + "___",
					___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___"
				);
				continue;
			}

			// keep empty comments after child selectors (IE7 hack)
			// e.g. html >/**/ body
			if (token.length === 0) {
				const startIndex = content.indexOf(placeholder);
				if (startIndex > 2) {
					if (content.charAt(startIndex - 3) === ">") {
						preservedTokens.push("");
						content = content.replace(placeholder, ___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___");
					}
				}
			}

			// in all other cases kill the comment
			content = content.replace(`/*${placeholder}*/`, "");
		}

		// parse simple @variables blocks and remove them
		if (options.expandVars) {
			const vars = {};
			pattern = REGEXP_VARIABLES;
			content = content.replace(pattern, (_, f1) => {
				pattern = REGEXP_VARIABLE;
				f1.replace(pattern, (_, f1, f2) => {
					if (f1 && f2) {
						vars[f1] = f2;
					}
					return "";
				});
				return "";
			});

			// replace var(x) with the value of x
			pattern = REGEXP_VARIABLE_VALUE;
			content = content.replace(pattern, (_, f1) => {
				return vars[f1] || "none";
			});
		}

		// normalize all whitespace strings to single spaces. Easier to work with that way.
		content = content.replace(REGEXP_WHITE_SPACES, " ");

		// preserve formulas in calc() before removing spaces
		pattern = REGEXP_PRESERVE_CALC;
		content = content.replace(pattern, (_, f1) => {
			preservedTokens.push(
				"calc(" +
				f1.replace(REGEXP_TRIM, "")
					.replace(REGEXP_PRESERVE_CALC2, "(")
					.replace(REGEXP_PRESERVE_CALC3, ")") +
				")"
			);
			return ___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___";
		});

		// preserve matrix
		pattern = REGEXP_PRESERVE_MATRIX;
		content = content.replace(pattern, (_, f1) => {
			preservedTokens.push(f1);
			return "filter:progid:DXImageTransform.Microsoft.Matrix(" + ___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___);";
		});

		// remove the spaces before the things that should not have spaces before them.
		// but, be careful not to turn 'p :link {...}' into 'p:link{...}'
		// swap out any pseudo-class colons with the token, and then swap back.
		try {
			pattern = REGEXP_REMOVE_SPACES;
			content = content.replace(pattern, token => token.replace(REGEXP_COLUMN, "___PSEUDOCLASSCOLON___"));
		} catch (_error) {
			// ignored
		}

		// remove spaces before the things that should not have spaces before them.
		content = content.replace(REGEXP_REMOVE_SPACES2, "$1");
		content = content.replace(REGEXP_REMOVE_SPACES2_BIS, "$1$2");

		// restore spaces for !important
		content = content.replace(REGEXP_RESTORE_SPACE_IMPORTANT, " !important");

		// bring back the colon
		content = content.replace(REGEXP_PSEUDOCLASSCOLON, ":");

		// preserve 0 followed by a time unit for properties using time units
		pattern = REGEXP_PRESERVE_ZERO_UNIT;
		content = content.replace(pattern, (_, f1, f2) => {

			f2 = f2.replace(REGEXP_PRESERVE_ZERO_UNIT1, (_, g1, g2) => {
				preservedTokens.push("0" + g2);
				return g1 + ___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___";
			});

			return f1 + ":" + f2;
		});

		// preserve unit for flex-basis within flex and flex-basis (ie10 bug)
		pattern = REGEXP_PRESERVE_FLEX;
		content = content.replace(pattern, (_, f1, f2) => {
			let f2b = f2.split(REGEXP_SPACES);
			preservedTokens.push(f2b.pop());
			f2b.push(___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___");
			f2b = f2b.join(" ");
			return `${f1}:${f2b}`;
		});

		// preserve 0% in hsl and hsla color definitions
		content = content.replace(REGEXP_PRESERVE_HSLA, (_, f1, f2) => {
			const f0 = [];
			f2.split(",").forEach(part => {
				part = part.replace(REGEXP_PRESERVE_HSLA1, "");
				if (part === "0%") {
					preservedTokens.push("0%");
					f0.push(___PRESERVED_TOKEN_ + (preservedTokens.length - 1) + "___");
				} else {
					f0.push(part);
				}
			});
			return f1 + "(" + f0.join(",") + ")";
		});

		// preserve 0 followed by unit in keyframes steps (WIP)
		content = keyframes(content, preservedTokens);

		// retain space for special IE6 cases
		content = content.replace(REGEXP_RETAIN_SPACE_IE6, (_, f1, f2) => ":first-" + f1.toLowerCase() + " " + f2);

		// newlines before and after the end of a preserved comment
		if (options.cuteComments) {
			content = content.replace(REGEXP_NEWLINE1, "___PRESERVED_NEWLINE___/*");
			content = content.replace(REGEXP_NEWLINE2, "*/___PRESERVED_NEWLINE___");
			// no space after the end of a preserved comment
		} else {
			content = content.replace(REGEXP_NEWLINE2, "*/");
		}

		// If there are multiple @charset directives, push them to the top of the file.
		pattern = REGEXP_CHARSET;
		content = content.replace(pattern, (_, f1, f2, f3) => f2.toLowerCase() + f3 + f1);

		// When all @charset are at the top, remove the second and after (as they are completely ignored).
		pattern = REGEXP_REMOVE_SECOND_CHARSET;
		content = content.replace(pattern, (_, __, f2, f3, f4) => f2 + f3.toLowerCase() + f4);

		// lowercase some popular @directives (@charset is done right above)
		pattern = REGEXP_LOWERCASE_DIRECTIVES;
		content = content.replace(pattern, (_, f1) => "@" + f1.toLowerCase());

		// lowercase some more common pseudo-elements
		pattern = REGEXP_LOWERCASE_PSEUDO_ELEMENTS;
		content = content.replace(pattern, (_, f1) => ":" + f1.toLowerCase());

		// if there is a @charset, then only allow one, and push to the top of the file.
		content = content.replace(REGEXP_CHARSET2, "$2$1");
		content = content.replace(REGEXP_CHARSET3, "$1");

		// lowercase some more common functions
		pattern = REGEXP_LOWERCASE_FUNCTIONS;
		content = content.replace(pattern, (_, f1) => ":" + f1.toLowerCase() + "(");

		// lower case some common function that can be values
		// NOTE: rgb() isn't useful as we replace with #hex later, as well as and() is already done for us right after this
		pattern = REGEXP_LOWERCASE_FUNCTIONS2;
		content = content.replace(pattern, (_, f1, f2) => f1 + f2.toLowerCase());

		// put the space back in some cases, to support stuff like
		// @media screen and (-webkit-min-device-pixel-ratio:0){
		content = content.replace(REGEXP_RESTORE_SPACE1, "and (");
		content = content.replace(REGEXP_RESTORE_SPACE2, "$1not (");
		content = content.replace(REGEXP_RESTORE_SPACE3, "or (");

		// remove the spaces after the things that should not have spaces after them.
		content = content.replace(REGEXP_REMOVE_SPACES3, "$1");

		// remove unnecessary semicolons
		content = content.replace(REGEXP_REMOVE_SEMI_COLUMNS, "}");

		// replace 0(px,em,%) with 0.
		// content = content.replace(REGEXP_REPLACE_ZERO, "$10");

		// Replace x.0(px,em,%) with x(px,em,%).
		content = content.replace(REGEXP_REPLACE_ZERO_DOT, "$1$2");

		// replace 0 0 0 0; with 0.
		content = content.replace(REGEXP_REPLACE_4_ZEROS, ":0$1");
		content = content.replace(REGEXP_REPLACE_3_ZEROS, ":0$1");
		// content = content.replace(REGEXP_REPLACE_2_ZEROS, ":0$1");

		// replace background-position:0; with background-position:0 0;
		// same for transform-origin and box-shadow
		pattern = REGEXP_REPLACE_1_ZERO;
		content = content.replace(pattern, (_, f1, f2) => f1.toLowerCase() + ":0 0" + f2);

		// replace 0.6 to .6, but only when preceded by : or a white-space
		content = content.replace(REGEXP_REPLACE_ZERO_DOT_DECIMAL, "$1.$2");

		// shorten colors from rgb(51,102,153) to #336699
		// this makes it more likely that it'll get further compressed in the next step.
		pattern = REGEXP_REPLACE_RGB;
		content = content.replace(pattern, (_, f1) => {
			const rgbcolors = f1.split(",");
			let hexcolor = "#";
			for (let i = 0; i < rgbcolors.length; i += 1) {
				let val = parseInt(rgbcolors[i], 10);
				if (val < 16) {
					hexcolor += "0";
				}
				if (val > 255) {
					val = 255;
				}
				hexcolor += val.toString(16);
			}
			return hexcolor;
		});

		// Shorten colors from #AABBCC to #ABC.
		content = compressHexColors(content);

		// Replace #f00 -> red
		content = content.replace(REGEXP_REPLACE_HASH_COLOR, "$1red$3");

		// Replace other short color keywords
		content = content.replace(REGEXP_REPLACE_HASH_COLOR_SHORT1, "$1navy$3");
		content = content.replace(REGEXP_REPLACE_HASH_COLOR_SHORT2, "$1gray$3");
		content = content.replace(REGEXP_REPLACE_HASH_COLOR_SHORT3, "$1olive$3");
		content = content.replace(REGEXP_REPLACE_HASH_COLOR_SHORT4, "$1purple$3");
		content = content.replace(REGEXP_REPLACE_HASH_COLOR_SHORT5, "$1silver$3");
		content = content.replace(REGEXP_REPLACE_HASH_COLOR_SHORT6, "$1teal$3");
		content = content.replace(REGEXP_REPLACE_HASH_COLOR_SHORT7, "$1orange$3");
		content = content.replace(REGEXP_REPLACE_HASH_COLOR_SHORT8, "$1maroon$3");

		// border: none -> border:0
		pattern = REGEXP_REPLACE_BORDER_ZERO;
		content = content.replace(pattern, (_, f1, f2) => f1.toLowerCase() + ":0" + f2);

		// shorter opacity IE filter
		content = content.replace(REGEXP_REPLACE_IE_OPACITY, "alpha(opacity=");

		// Find a fraction that is used for Opera's -o-device-pixel-ratio query
		// Add token to add the '\' back in later
		content = content.replace(REGEXP_REPLACE_QUERY_FRACTION, "($1:$2___QUERY_FRACTION___$3)");

		// remove empty rules.
		// content = content.replace(REGEXP_EMPTY_RULES, "");

		// Add '\' back to fix Opera -o-device-pixel-ratio query
		content = content.replace(REGEXP_QUERY_FRACTION, "/");

		// some source control tools don't like it when files containing lines longer
		// than, say 8000 characters, are checked in. The linebreak option is used in
		// that case to split long lines after a specific column.
		if (options.maxLineLen > 0) {
			const lines = [];
			let line = [];
			for (let i = 0, len = content.length; i < len; i += 1) {
				const ch = content.charAt(i);
				line.push(ch);
				if (ch === "}" && line.length > options.maxLineLen) {
					lines.push(line.join(""));
					line = [];
				}
			}
			if (line.length) {
				lines.push(line.join(""));
			}

			content = lines.join("\n");
		}

		// replace multiple semi-colons in a row by a single one
		// see SF bug #1980989
		content = content.replace(REGEXP_REPLACE_SEMI_COLUMNS, ";");

		// trim the final string (for any leading or trailing white spaces)
		content = content.replace(REGEXP_TRIM, "");

		if (preservedTokens.length > 1000) {
			return originalContent;
		}

		// restore preserved tokens
		for (let i = preservedTokens.length - 1; i >= 0; i--) {
			content = content.replace(___PRESERVED_TOKEN_ + i + "___", preservedTokens[i], "g");
		}

		// restore preserved newlines
		content = content.replace(REGEXP_PRESERVED_NEWLINE, "\n");

		// return
		return content;
	}

	var cssMinifier = /*#__PURE__*/Object.freeze({
		__proto__: null,
		defaultOptions: defaultOptions,
		processString: processString
	});

	/*
	 * The MIT License (MIT)
	 * 
	 * Author: Gildas Lormeau
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	// 1. Let input be the value passed to this algorithm.
	function process$7(input) {

		// UTILITY FUNCTIONS

		// Manual is faster than RegEx
		// http://bjorn.tipling.com/state-and-regular-expressions-in-javascript
		// http://jsperf.com/whitespace-character/5
		function isSpace(c) {
			return (c === "\u0020" || // space
				c === "\u0009" || // horizontal tab
				c === "\u000A" || // new line
				c === "\u000C" || // form feed
				c === "\u000D");  // carriage return
		}

		function collectCharacters(regEx) {
			let chars;
			const match = regEx.exec(input.substring(pos));
			if (match) {
				chars = match[0];
				pos += chars.length;
				return chars;
			}
		}

		const inputLength = input.length;

		// (Don"t use \s, to avoid matching non-breaking space)
		/* eslint-disable no-control-regex */
		const regexLeadingSpaces = /^[ \t\n\r\u000c]+/;
		const regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/;
		const regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/;
		const regexTrailingCommas = /[,]+$/;
		const regexNonNegativeInteger = /^\d+$/;
		/* eslint-enable no-control-regex */

		// ( Positive or negative or unsigned integers or decimals, without or without exponents.
		// Must include at least one digit.
		// According to spec tests any decimal point must be followed by a digit.
		// No leading plus sign is allowed.)
		// https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number
		const regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;

		let url, descriptors, currentDescriptor, state, c,
			// 2. Let position be a pointer into input, initially pointing at the start
			//    of the string.
			pos = 0;
		// 3. Let candidates be an initially empty source set.
		const candidates = [];

		// 4. Splitting loop: Collect a sequence of characters that are space
		//    characters or U+002C COMMA characters. If any U+002C COMMA characters
		//    were collected, that is a parse error.		
		while (true) { // eslint-disable-line no-constant-condition
			collectCharacters(regexLeadingCommasOrSpaces);

			// 5. If position is past the end of input, return candidates and abort these steps.
			if (pos >= inputLength) {
				return candidates; // (we"re done, this is the sole return path)
			}

			// 6. Collect a sequence of characters that are not space characters,
			//    and let that be url.
			url = collectCharacters(regexLeadingNotSpaces);

			// 7. Let descriptors be a new empty list.
			descriptors = [];

			// 8. If url ends with a U+002C COMMA character (,), follow these substeps:
			//		(1). Remove all trailing U+002C COMMA characters from url. If this removed
			//         more than one character, that is a parse error.
			if (url.slice(-1) === ",") {
				url = url.replace(regexTrailingCommas, "");
				// (Jump ahead to step 9 to skip tokenization and just push the candidate).
				parseDescriptors();

				//	Otherwise, follow these substeps:
			} else {
				tokenize();
			} // (close else of step 8)

			// 16. Return to the step labeled splitting loop.
		} // (Close of big while loop.)

		/**
		 * Tokenizes descriptor properties prior to parsing
		 * Returns undefined.
		 */
		function tokenize() {

			// 8.1. Descriptor tokeniser: Skip whitespace
			collectCharacters(regexLeadingSpaces);

			// 8.2. Let current descriptor be the empty string.
			currentDescriptor = "";

			// 8.3. Let state be in descriptor.
			state = "in descriptor";

			while (true) { // eslint-disable-line no-constant-condition

				// 8.4. Let c be the character at position.
				c = input.charAt(pos);

				//  Do the following depending on the value of state.
				//  For the purpose of this step, "EOF" is a special character representing
				//  that position is past the end of input.

				// In descriptor
				if (state === "in descriptor") {
					// Do the following, depending on the value of c:

					// Space character
					// If current descriptor is not empty, append current descriptor to
					// descriptors and let current descriptor be the empty string.
					// Set state to after descriptor.
					if (isSpace(c)) {
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
							currentDescriptor = "";
							state = "after descriptor";
						}

						// U+002C COMMA (,)
						// Advance position to the next character in input. If current descriptor
						// is not empty, append current descriptor to descriptors. Jump to the step
						// labeled descriptor parser.
					} else if (c === ",") {
						pos += 1;
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
						}
						parseDescriptors();
						return;

						// U+0028 LEFT PARENTHESIS (()
						// Append c to current descriptor. Set state to in parens.
					} else if (c === "\u0028") {
						currentDescriptor = currentDescriptor + c;
						state = "in parens";

						// EOF
						// If current descriptor is not empty, append current descriptor to
						// descriptors. Jump to the step labeled descriptor parser.
					} else if (c === "") {
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
						}
						parseDescriptors();
						return;

						// Anything else
						// Append c to current descriptor.
					} else {
						currentDescriptor = currentDescriptor + c;
					}
					// (end "in descriptor"

					// In parens
				} else if (state === "in parens") {

					// U+0029 RIGHT PARENTHESIS ())
					// Append c to current descriptor. Set state to in descriptor.
					if (c === ")") {
						currentDescriptor = currentDescriptor + c;
						state = "in descriptor";

						// EOF
						// Append current descriptor to descriptors. Jump to the step labeled
						// descriptor parser.
					} else if (c === "") {
						descriptors.push(currentDescriptor);
						parseDescriptors();
						return;

						// Anything else
						// Append c to current descriptor.
					} else {
						currentDescriptor = currentDescriptor + c;
					}

					// After descriptor
				} else if (state === "after descriptor") {

					// Do the following, depending on the value of c:
					// Space character: Stay in this state.
					if (isSpace(c)) ; else if (c === "") {
						parseDescriptors();
						return;

						// Anything else
						// Set state to in descriptor. Set position to the previous character in input.
					} else {
						state = "in descriptor";
						pos -= 1;

					}
				}

				// Advance position to the next character in input.
				pos += 1;

				// Repeat this step.
			} // (close while true loop)
		}

		/**
		 * Adds descriptor properties to a candidate, pushes to the candidates array
		 * @return undefined
		 */
		// Declared outside of the while loop so that it"s only created once.
		function parseDescriptors() {

			// 9. Descriptor parser: Let error be no.
			let pError = false,

				// 10. Let width be absent.
				// 11. Let density be absent.
				// 12. Let future-compat-h be absent. (We"re implementing it now as h)
				w, d, h, i,
				desc, lastChar, value, intVal, floatVal;
			const candidate = {};

			// 13. For each descriptor in descriptors, run the appropriate set of steps
			// from the following list:
			for (i = 0; i < descriptors.length; i++) {
				desc = descriptors[i];

				lastChar = desc[desc.length - 1];
				value = desc.substring(0, desc.length - 1);
				intVal = parseInt(value, 10);
				floatVal = parseFloat(value);

				// If the descriptor consists of a valid non-negative integer followed by
				// a U+0077 LATIN SMALL LETTER W character
				if (regexNonNegativeInteger.test(value) && (lastChar === "w")) {

					// If width and density are not both absent, then let error be yes.
					if (w || d) { pError = true; }

					// Apply the rules for parsing non-negative integers to the descriptor.
					// If the result is zero, let error be yes.
					// Otherwise, let width be the result.
					if (intVal === 0) { pError = true; } else { w = intVal; }

					// If the descriptor consists of a valid floating-point number followed by
					// a U+0078 LATIN SMALL LETTER X character
				} else if (regexFloatingPoint.test(value) && (lastChar === "x")) {

					// If width, density and future-compat-h are not all absent, then let error
					// be yes.
					if (w || d || h) { pError = true; }

					// Apply the rules for parsing floating-point number values to the descriptor.
					// If the result is less than zero, let error be yes. Otherwise, let density
					// be the result.
					if (floatVal < 0) { pError = true; } else { d = floatVal; }

					// If the descriptor consists of a valid non-negative integer followed by
					// a U+0068 LATIN SMALL LETTER H character
				} else if (regexNonNegativeInteger.test(value) && (lastChar === "h")) {

					// If height and density are not both absent, then let error be yes.
					if (h || d) { pError = true; }

					// Apply the rules for parsing non-negative integers to the descriptor.
					// If the result is zero, let error be yes. Otherwise, let future-compat-h
					// be the result.
					if (intVal === 0) { pError = true; } else { h = intVal; }

					// Anything else, Let error be yes.
				} else { pError = true; }
			} // (close step 13 for loop)

			// 15. If error is still no, then append a new image source to candidates whose
			// URL is url, associated with a width width if not absent and a pixel
			// density density if not absent. Otherwise, there is a parse error.
			if (!pError) {
				candidate.url = url;
				if (w) { candidate.w = w; }
				if (d) { candidate.d = d; }
				if (h) { candidate.h = h; }
				candidates.push(candidate);
			} else if (console && console.log) {  // eslint-disable-line no-console
				console.log("Invalid srcset descriptor found in \"" + input + "\" at \"" + desc + "\"."); // eslint-disable-line no-console
			}
		} // (close parseDescriptors fn)

	}

	var htmlSrcsetParser = /*#__PURE__*/Object.freeze({
		__proto__: null,
		process: process$7
	});

	/*
	 * The MIT License (MIT)
	 * 
	 * Author: Gildas Lormeau
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:

	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.

	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	// derived from https://github.com/jsdom/whatwg-mimetype

	/* 
	 * Copyright © 2017–2018 Domenic Denicola <d@domenic.me>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:

	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.

	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	let utils, parser, serializer, MIMEType;

	// lib/utils.js
	{
		utils = {};
		utils.removeLeadingAndTrailingHTTPWhitespace = string => {
			return string.replace(/^[ \t\n\r]+/, "").replace(/[ \t\n\r]+$/, "");
		};

		utils.removeTrailingHTTPWhitespace = string => {
			return string.replace(/[ \t\n\r]+$/, "");
		};

		utils.isHTTPWhitespaceChar = char => {
			return char === " " || char === "\t" || char === "\n" || char === "\r";
		};

		utils.solelyContainsHTTPTokenCodePoints = string => {
			return /^[-!#$%&'*+.^_`|~A-Za-z0-9]*$/.test(string);
		};

		utils.soleyContainsHTTPQuotedStringTokenCodePoints = string => {
			return /^[\t\u0020-\u007E\u0080-\u00FF]*$/.test(string);
		};

		utils.asciiLowercase = string => {
			return string.replace(/[A-Z]/g, l => l.toLowerCase());
		};

		// This variant only implements it with the extract-value flag set.
		utils.collectAnHTTPQuotedString = (input, position) => {
			let value = "";

			position++;

			// eslint-disable-next-line no-constant-condition
			while (true) {
				while (position < input.length && input[position] !== "\"" && input[position] !== "\\") {
					value += input[position];
					++position;
				}

				if (position >= input.length) {
					break;
				}

				const quoteOrBackslash = input[position];
				++position;

				if (quoteOrBackslash === "\\") {
					if (position >= input.length) {
						value += "\\";
						break;
					}

					value += input[position];
					++position;
				} else {
					break;
				}
			}

			return [value, position];
		};
	}

	// lib/serializer.js
	{
		const { solelyContainsHTTPTokenCodePoints } = utils;
		serializer = mimeType => {
			let serialization = `${mimeType.type}/${mimeType.subtype}`;

			if (mimeType.parameters.size === 0) {
				return serialization;
			}

			for (let [name, value] of mimeType.parameters) {
				serialization += ";";
				serialization += name;
				serialization += "=";

				if (!solelyContainsHTTPTokenCodePoints(value) || value.length === 0) {
					value = value.replace(/(["\\])/g, "\\$1");
					value = `"${value}"`;
				}

				serialization += value;
			}

			return serialization;
		};
	}

	// lib/parser.js
	{
		const {
			removeLeadingAndTrailingHTTPWhitespace,
			removeTrailingHTTPWhitespace,
			isHTTPWhitespaceChar,
			solelyContainsHTTPTokenCodePoints,
			soleyContainsHTTPQuotedStringTokenCodePoints,
			asciiLowercase,
			collectAnHTTPQuotedString
		} = utils;

		parser = input => {
			input = removeLeadingAndTrailingHTTPWhitespace(input);

			let position = 0;
			let type = "";
			while (position < input.length && input[position] !== "/") {
				type += input[position];
				++position;
			}

			if (type.length === 0 || !solelyContainsHTTPTokenCodePoints(type)) {
				return null;
			}

			if (position >= input.length) {
				return null;
			}

			// Skips past "/"
			++position;

			let subtype = "";
			while (position < input.length && input[position] !== ";") {
				subtype += input[position];
				++position;
			}

			subtype = removeTrailingHTTPWhitespace(subtype);

			if (subtype.length === 0 || !solelyContainsHTTPTokenCodePoints(subtype)) {
				return null;
			}

			const mimeType = {
				type: asciiLowercase(type),
				subtype: asciiLowercase(subtype),
				parameters: new Map()
			};

			while (position < input.length) {
				// Skip past ";"
				++position;

				while (isHTTPWhitespaceChar(input[position])) {
					++position;
				}

				let parameterName = "";
				while (position < input.length && input[position] !== ";" && input[position] !== "=") {
					parameterName += input[position];
					++position;
				}
				parameterName = asciiLowercase(parameterName);

				if (position < input.length) {
					if (input[position] === ";") {
						continue;
					}

					// Skip past "="
					++position;
				}

				let parameterValue = null;
				if (input[position] === "\"") {
					[parameterValue, position] = collectAnHTTPQuotedString(input, position);

					while (position < input.length && input[position] !== ";") {
						++position;
					}
				} else {
					parameterValue = "";
					while (position < input.length && input[position] !== ";") {
						parameterValue += input[position];
						++position;
					}

					parameterValue = removeTrailingHTTPWhitespace(parameterValue);

					if (parameterValue === "") {
						continue;
					}
				}

				if (parameterName.length > 0 &&
					solelyContainsHTTPTokenCodePoints(parameterName) &&
					soleyContainsHTTPQuotedStringTokenCodePoints(parameterValue) &&
					!mimeType.parameters.has(parameterName)) {
					mimeType.parameters.set(parameterName, parameterValue);
				}
			}

			return mimeType;
		};
	}

	// lib/mime-type.js
	{
		const parse = parser;
		const serialize = serializer;
		const {
			asciiLowercase,
			solelyContainsHTTPTokenCodePoints,
			soleyContainsHTTPQuotedStringTokenCodePoints
		} = utils;

		MIMEType = class MIMEType {
			constructor(string) {
				string = String(string);
				const result = parse(string);
				if (result === null) {
					throw new Error(`Could not parse MIME type string "${string}"`);
				}

				this._type = result.type;
				this._subtype = result.subtype;
				this._parameters = new MIMETypeParameters(result.parameters);
			}

			static parse(string) {
				try {
					return new this(string);
				} catch (e) {
					return null;
				}
			}

			get essence() {
				return `${this.type}/${this.subtype}`;
			}

			get type() {
				return this._type;
			}

			set type(value) {
				value = asciiLowercase(String(value));

				if (value.length === 0) {
					throw new Error("Invalid type: must be a non-empty string");
				}
				if (!solelyContainsHTTPTokenCodePoints(value)) {
					throw new Error(`Invalid type ${value}: must contain only HTTP token code points`);
				}

				this._type = value;
			}

			get subtype() {
				return this._subtype;
			}

			set subtype(value) {
				value = asciiLowercase(String(value));

				if (value.length === 0) {
					throw new Error("Invalid subtype: must be a non-empty string");
				}
				if (!solelyContainsHTTPTokenCodePoints(value)) {
					throw new Error(`Invalid subtype ${value}: must contain only HTTP token code points`);
				}

				this._subtype = value;
			}

			get parameters() {
				return this._parameters;
			}

			toString() {
				// The serialize function works on both "MIME type records" (i.e. the results of parse) and on this class, since
				// this class's interface is identical.
				return serialize(this);
			}

			isJavaScript({ allowParameters = false } = {}) {
				switch (this._type) {
					case "text": {
						switch (this._subtype) {
							case "ecmascript":
							case "javascript":
							case "javascript1.0":
							case "javascript1.1":
							case "javascript1.2":
							case "javascript1.3":
							case "javascript1.4":
							case "javascript1.5":
							case "jscript":
							case "livescript":
							case "x-ecmascript":
							case "x-javascript": {
								return allowParameters || this._parameters.size === 0;
							}
							default: {
								return false;
							}
						}
					}
					case "application": {
						switch (this._subtype) {
							case "ecmascript":
							case "javascript":
							case "x-ecmascript":
							case "x-javascript": {
								return allowParameters || this._parameters.size === 0;
							}
							default: {
								return false;
							}
						}
					}
					default: {
						return false;
					}
				}
			}
			isXML() {
				return (this._subtype === "xml" && (this._type === "text" || this._type === "application")) ||
					this._subtype.endsWith("+xml");
			}
			isHTML() {
				return this._subtype === "html" && this._type === "text";
			}
		};

		class MIMETypeParameters {
			constructor(map) {
				this._map = map;
			}

			get size() {
				return this._map.size;
			}

			get(name) {
				name = asciiLowercase(String(name));
				return this._map.get(name);
			}

			has(name) {
				name = asciiLowercase(String(name));
				return this._map.has(name);
			}

			set(name, value) {
				name = asciiLowercase(String(name));
				value = String(value);

				if (!solelyContainsHTTPTokenCodePoints(name)) {
					throw new Error(`Invalid MIME type parameter name "${name}": only HTTP token code points are valid.`);
				}
				if (!soleyContainsHTTPQuotedStringTokenCodePoints(value)) {
					throw new Error(`Invalid MIME type parameter value "${value}": only HTTP quoted-string token code points are valid.`);
				}

				return this._map.set(name, value);
			}

			clear() {
				this._map.clear();
			}

			delete(name) {
				name = asciiLowercase(String(name));
				return this._map.delete(name);
			}

			forEach(callbackFn, thisArg) {
				this._map.forEach(callbackFn, thisArg);
			}

			keys() {
				return this._map.keys();
			}

			values() {
				return this._map.values();
			}

			entries() {
				return this._map.entries();
			}

			[Symbol.iterator]() {
				return this._map[Symbol.iterator]();
			}
		}

	}

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	var index$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		fontPropertyParser: cssFontPropertyParser,
		mediaQueryParser: cssMediaQueryParser,
		cssMinifier: cssMinifier,
		cssTree: cssTree$1,
		cssUnescape: cssUnescape,
		srcsetParser: htmlSrcsetParser,
		get MIMEType () { return MIMEType; }
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	const helper$2 = {
		normalizeFontFamily,
		getFontWeight
	};

	const FontFace = globalThis.FontFace;
	const JSON$2 = globalThis.JSON;

	const REGEXP_URL_SIMPLE_QUOTES_FN = /url\s*\(\s*'(.*?)'\s*\)/i;
	const REGEXP_URL_DOUBLE_QUOTES_FN = /url\s*\(\s*"(.*?)"\s*\)/i;
	const REGEXP_URL_NO_QUOTES_FN = /url\s*\(\s*(.*?)\s*\)/i;
	const REGEXP_URL_FUNCTION = /(url|local|-sf-url-original)\(.*?\)\s*(,|$)/g;
	const REGEXP_SIMPLE_QUOTES_STRING = /^'(.*?)'$/;
	const REGEXP_DOUBLE_QUOTES_STRING = /^"(.*?)"$/;
	const REGEXP_URL_FUNCTION_WOFF = /^url\(\s*["']?data:font\/(woff2?)/;
	const REGEXP_URL_FUNCTION_WOFF_ALT = /^url\(\s*["']?data:application\/x-font-(woff)/;
	const REGEXP_FONT_FORMAT = /\.([^.?#]+)((\?|#).*?)?$/;
	const REGEXP_FONT_FORMAT_VALUE = /format\((.*?)\)\s*,?$/;
	const REGEXP_FONT_SRC = /(.*?)\s*,?$/;
	const EMPTY_URL_SOURCE = /^url\(["']?data:[^,]*,?["']?\)/;
	const LOCAL_SOURCE = "local(";
	const MEDIA_ALL$2 = "all";
	const FONT_STRETCHES = {
		"ultra-condensed": "50%",
		"extra-condensed": "62.5%",
		"condensed": "75%",
		"semi-condensed": "87.5%",
		"normal": "100%",
		"semi-expanded": "112.5%",
		"expanded": "125%",
		"extra-expanded": "150%",
		"ultra-expanded": "200%"
	};
	const FONT_MAX_LOAD_DELAY = 5000;

	async function process$6(doc, stylesheets, fontDeclarations, fontTests) {
		const fontsDetails = {
			fonts: new Map(),
			medias: new Map(),
			supports: new Map()
		};
		const stats = { rules: { processed: 0, discarded: 0 }, fonts: { processed: 0, discarded: 0 } };
		let sheetIndex = 0;
		stylesheets.forEach(stylesheetInfo => {
			const cssRules = stylesheetInfo.stylesheet.children;
			if (cssRules) {
				stats.rules.processed += cssRules.size;
				stats.rules.discarded += cssRules.size;
				if (stylesheetInfo.mediaText && stylesheetInfo.mediaText != MEDIA_ALL$2) {
					const mediaFontsDetails = createFontsDetailsInfo();
					fontsDetails.medias.set("media-" + sheetIndex + "-" + stylesheetInfo.mediaText, mediaFontsDetails);
					getFontsDetails(doc, cssRules, sheetIndex, mediaFontsDetails);
				} else {
					getFontsDetails(doc, cssRules, sheetIndex, fontsDetails);
				}
			}
			sheetIndex++;
		});
		processFontDetails(fontsDetails);
		await Promise.all([...stylesheets].map(async ([, stylesheetInfo], sheetIndex) => {
			const cssRules = stylesheetInfo.stylesheet.children;
			const media = stylesheetInfo.mediaText;
			if (cssRules) {
				if (media && media != MEDIA_ALL$2) {
					await processFontFaceRules(cssRules, sheetIndex, fontsDetails.medias.get("media-" + sheetIndex + "-" + media), fontDeclarations, fontTests, stats);
				} else {
					await processFontFaceRules(cssRules, sheetIndex, fontsDetails, fontDeclarations, fontTests, stats);
				}
				stats.rules.discarded -= cssRules.size;
			}
		}));
		return stats;
	}

	function getFontsDetails(doc, cssRules, sheetIndex, mediaFontsDetails) {
		let mediaIndex = 0, supportsIndex = 0;
		cssRules.forEach(ruleData => {
			if (ruleData.type == "Atrule" && ruleData.name == "media" && ruleData.block && ruleData.block.children && ruleData.prelude) {
				const mediaText = vb(ruleData.prelude);
				const fontsDetails = createFontsDetailsInfo();
				mediaFontsDetails.medias.set("media-" + sheetIndex + "-" + mediaIndex + "-" + mediaText, fontsDetails);
				mediaIndex++;
				getFontsDetails(doc, ruleData.block.children, sheetIndex, fontsDetails);
			} else if (ruleData.type == "Atrule" && ruleData.name == "supports" && ruleData.block && ruleData.block.children && ruleData.prelude) {
				const supportsText = vb(ruleData.prelude);
				const fontsDetails = createFontsDetailsInfo();
				mediaFontsDetails.supports.set("supports-" + sheetIndex + "-" + supportsIndex + "-" + supportsText, fontsDetails);
				supportsIndex++;
				getFontsDetails(doc, ruleData.block.children, sheetIndex, fontsDetails);
			} else if (ruleData.type == "Atrule" && ruleData.name == "font-face" && ruleData.block && ruleData.block.children) {
				const fontKey = getFontKey(ruleData);
				let fontInfo = mediaFontsDetails.fonts.get(fontKey);
				if (!fontInfo) {
					fontInfo = [];
					mediaFontsDetails.fonts.set(fontKey, fontInfo);
				}
				const src = getPropertyValue(ruleData, "src");
				if (src) {
					const fontSources = src.match(REGEXP_URL_FUNCTION);
					if (fontSources) {
						fontSources.forEach(source => fontInfo.unshift(source));
					}
				}
			}
		});
	}

	function processFontDetails(fontsDetails) {
		fontsDetails.fonts.forEach((fontInfo, fontKey) => {
			fontsDetails.fonts.set(fontKey, fontInfo.map(fontSource => {
				const fontFormatMatch = fontSource.match(REGEXP_FONT_FORMAT_VALUE);
				let fontFormat;
				const fontUrl = getURL(fontSource);
				if (fontFormatMatch && fontFormatMatch[1]) {
					fontFormat = fontFormatMatch[1].replace(REGEXP_SIMPLE_QUOTES_STRING, "$1").replace(REGEXP_DOUBLE_QUOTES_STRING, "$1").toLowerCase();
				}
				if (!fontFormat) {
					const fontFormatMatch = fontSource.match(REGEXP_URL_FUNCTION_WOFF);
					if (fontFormatMatch && fontFormatMatch[1]) {
						fontFormat = fontFormatMatch[1];
					} else {
						const fontFormatMatch = fontSource.match(REGEXP_URL_FUNCTION_WOFF_ALT);
						if (fontFormatMatch && fontFormatMatch[1]) {
							fontFormat = fontFormatMatch[1];
						}
					}
				}
				if (!fontFormat && fontUrl) {
					const fontFormatMatch = fontUrl.match(REGEXP_FONT_FORMAT);
					if (fontFormatMatch && fontFormatMatch[1]) {
						fontFormat = fontFormatMatch[1];
					}
				}
				return { src: fontSource.match(REGEXP_FONT_SRC)[1], fontUrl, format: fontFormat };
			}));
		});
		fontsDetails.medias.forEach(mediaFontsDetails => processFontDetails(mediaFontsDetails));
		fontsDetails.supports.forEach(supportsFontsDetails => processFontDetails(supportsFontsDetails));
	}

	async function processFontFaceRules(cssRules, sheetIndex, fontsDetails, fontDeclarations, fontTests, stats) {
		const removedRules = [];
		let mediaIndex = 0, supportsIndex = 0;
		for (let cssRule = cssRules.head; cssRule; cssRule = cssRule.next) {
			const ruleData = cssRule.data;
			if (ruleData.type == "Atrule" && ruleData.name == "media" && ruleData.block && ruleData.block.children && ruleData.prelude) {
				const mediaText = vb(ruleData.prelude);
				await processFontFaceRules(ruleData.block.children, sheetIndex, fontsDetails.medias.get("media-" + sheetIndex + "-" + mediaIndex + "-" + mediaText), fontDeclarations, fontTests, stats);
				mediaIndex++;
			} else if (ruleData.type == "Atrule" && ruleData.name == "supports" && ruleData.block && ruleData.block.children && ruleData.prelude) {
				const supportsText = vb(ruleData.prelude);
				await processFontFaceRules(ruleData.block.children, sheetIndex, fontsDetails.supports.get("supports-" + sheetIndex + "-" + supportsIndex + "-" + supportsText), fontDeclarations, fontTests, stats);
				supportsIndex++;
			} else if (ruleData.type == "Atrule" && ruleData.name == "font-face") {
				const key = getFontKey(ruleData);
				const fontInfo = fontsDetails.fonts.get(key);
				if (fontInfo) {
					const processed = await processFontFaceRule(ruleData, fontInfo, fontDeclarations, fontTests, stats);
					if (processed) {
						fontsDetails.fonts.delete(key);
					}
				} else {
					removedRules.push(cssRule);
				}
			}
		}
		removedRules.forEach(cssRule => cssRules.remove(cssRule));
	}

	async function processFontFaceRule(ruleData, fontInfo, fontDeclarations, fontTests, stats) {
		const removedNodes = [];
		for (let node = ruleData.block.children.head; node; node = node.next) {
			if (node.data.property == "src") {
				removedNodes.push(node);
			}
		}
		removedNodes.pop();
		removedNodes.forEach(node => ruleData.block.children.remove(node));
		const srcDeclaration = ruleData.block.children.filter(node => node.property == "src").tail;
		if (srcDeclaration) {
			await Promise.all(fontInfo.map(async source => {
				if (fontTests.has(source.src)) {
					source.valid = fontTests.get(source.src);
				} else {
					if (FontFace && source.fontUrl) {
						const fontFace = new FontFace("test-font", source.src);
						try {
							let timeout;
							await Promise.race([
								fontFace.load().then(() => fontFace.loaded).then(() => { source.valid = true; globalThis.clearTimeout(timeout); }),
								new Promise(resolve => timeout = globalThis.setTimeout(() => { source.valid = true; resolve(); }, FONT_MAX_LOAD_DELAY))
							]);
						} catch (error) {
							const urlNodes = Lb(srcDeclaration.data, node => node.type == "Url");
							const declarationFontURLs = Array.from(fontDeclarations).find(([node]) => urlNodes.includes(node) && node.value == source.fontUrl);
							if (declarationFontURLs && declarationFontURLs[1].length) {
								const fontURL = declarationFontURLs[1][0];
								if (fontURL) {
									const fontFace = new FontFace("test-font", "url(" + fontURL + ")");
									try {
										let timeout;
										await Promise.race([
											fontFace.load().then(() => fontFace.loaded).then(() => { source.valid = true; globalThis.clearTimeout(timeout); }),
											new Promise(resolve => timeout = globalThis.setTimeout(() => { source.valid = true; resolve(); }, FONT_MAX_LOAD_DELAY))
										]);
									} catch (error) {
										// ignored
									}
								}
							} else {
								source.valid = true;
							}
						}
					} else {
						source.valid = true;
					}
					fontTests.set(source.src, source.valid);
				}
			}));
			const findSourceByFormat = (fontFormat, testValidity) => fontInfo.find(source => !source.src.match(EMPTY_URL_SOURCE) && source.format == fontFormat && (!testValidity || source.valid));
			const filterSources = fontSource => fontInfo.filter(source => source == fontSource || source.src.startsWith(LOCAL_SOURCE));
			stats.fonts.processed += fontInfo.length;
			stats.fonts.discarded += fontInfo.length;
			const woffFontFound =
				findSourceByFormat("woff2-variations", true) || findSourceByFormat("woff2", true) || findSourceByFormat("woff", true);
			if (woffFontFound) {
				fontInfo = filterSources(woffFontFound);
			} else {
				const ttfFontFound =
					findSourceByFormat("truetype-variations", true) || findSourceByFormat("truetype", true);
				if (ttfFontFound) {
					fontInfo = filterSources(ttfFontFound);
				} else {
					const otfFontFound =
						findSourceByFormat("opentype") || findSourceByFormat("embedded-opentype");
					if (otfFontFound) {
						fontInfo = filterSources(otfFontFound);
					} else {
						fontInfo = fontInfo.filter(source => !source.src.match(EMPTY_URL_SOURCE) && (source.valid) || source.src.startsWith(LOCAL_SOURCE));
					}
				}
			}
			stats.fonts.discarded -= fontInfo.length;
			fontInfo.reverse();
			try {
				srcDeclaration.data.value = wb(fontInfo.map(fontSource => fontSource.src).join(","), { context: "value", parseCustomProperty: true });
			}
			catch (error) {
				// ignored
			}
			return true;
		} else {
			return false;
		}
	}

	function getPropertyValue(ruleData, propertyName) {
		let property;
		if (ruleData.block.children) {
			property = ruleData.block.children.filter(node => {
				try {
					return node.property == propertyName && !vb(node.value).match(/\\9$/);
				} catch (error) {
					return node.property == propertyName;
				}
			}).tail;
		}
		if (property) {
			try {
				return vb(property.data.value);
			} catch (error) {
				// ignored
			}
		}
	}

	function getFontKey(ruleData) {
		return JSON$2.stringify([
			helper$2.normalizeFontFamily(getPropertyValue(ruleData, "font-family")),
			helper$2.getFontWeight(getPropertyValue(ruleData, "font-weight") || "400"),
			getPropertyValue(ruleData, "font-style") || "normal",
			getPropertyValue(ruleData, "unicode-range"),
			getFontStretch(getPropertyValue(ruleData, "font-stretch")),
			getPropertyValue(ruleData, "font-variant") || "normal",
			getPropertyValue(ruleData, "font-feature-settings"),
			getPropertyValue(ruleData, "font-variation-settings")
		]);
	}

	function getFontStretch(stretch) {
		return FONT_STRETCHES[stretch] || stretch;
	}

	function createFontsDetailsInfo() {
		return {
			fonts: new Map(),
			medias: new Map(),
			supports: new Map()
		};
	}

	function getURL(urlFunction) {
		urlFunction = urlFunction.replace(/url\(-sf-url-original\\\(\\"(.*?)\\"\\\)\\ /g, "");
		const urlMatch = urlFunction.match(REGEXP_URL_SIMPLE_QUOTES_FN) ||
			urlFunction.match(REGEXP_URL_DOUBLE_QUOTES_FN) ||
			urlFunction.match(REGEXP_URL_NO_QUOTES_FN);
		return urlMatch && urlMatch[1];
	}

	var cssFontsAltMinifier = /*#__PURE__*/Object.freeze({
		__proto__: null,
		process: process$6
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	const helper$1 = {
		normalizeFontFamily,
		flatten,
		getFontWeight,
		removeQuotes: removeQuotes$1
	};

	const REGEXP_COMMA = /\s*,\s*/;
	const REGEXP_DASH = /-/;
	const REGEXP_QUESTION_MARK = /\?/g;
	const REGEXP_STARTS_U_PLUS = /^U\+/i;
	const VALID_FONT_STYLES = [/^normal$/, /^italic$/, /^oblique$/, /^oblique\s+/];

	function process$5(doc, stylesheets, styles, options) {
		const stats = { rules: { processed: 0, discarded: 0 }, fonts: { processed: 0, discarded: 0 } };
		const fontsInfo = { declared: [], used: [] };
		const workStyleElement = doc.createElement("style");
		let docContent = "";
		doc.body.appendChild(workStyleElement);
		stylesheets.forEach(stylesheetInfo => {
			const cssRules = stylesheetInfo.stylesheet.children;
			if (cssRules) {
				stats.processed += cssRules.size;
				stats.discarded += cssRules.size;
				getFontsInfo(cssRules, fontsInfo);
				docContent = getRulesTextContent(doc, cssRules, workStyleElement, docContent);
			}
		});
		styles.forEach(declarations => {
			const fontFamilyNames = getFontFamilyNames(declarations);
			if (fontFamilyNames.length) {
				fontsInfo.used.push(fontFamilyNames);
			}
			docContent = getDeclarationsTextContent(declarations.children, workStyleElement, docContent);
		});
		workStyleElement.remove();
		docContent += doc.body.innerText;
		if (globalThis.getComputedStyle && options.doc) {
			fontsInfo.used = fontsInfo.used.map(fontNames => fontNames.map(familyName => {
				const matchedVar = familyName.match(/^var\((--.*)\)$/);
				if (matchedVar && matchedVar[1]) {
					const computedFamilyName = globalThis.getComputedStyle(options.doc.body).getPropertyValue(matchedVar[1]);
					return (computedFamilyName && computedFamilyName.split(",").map(name => helper$1.normalizeFontFamily(name))) || familyName;
				}
				return familyName;
			}));
			fontsInfo.used = fontsInfo.used.map(fontNames => helper$1.flatten(fontNames));
		}
		const variableFound = fontsInfo.used.find(fontNames => fontNames.find(fontName => fontName.match(/^var\(--/)));
		let unusedFonts, filteredUsedFonts;
		if (variableFound) {
			unusedFonts = [];
		} else {
			filteredUsedFonts = new Map();
			fontsInfo.used.forEach(fontNames => fontNames.forEach(familyName => {
				if (fontsInfo.declared.find(fontInfo => fontInfo.fontFamily == familyName)) {
					const optionalData = options.usedFonts && options.usedFonts.filter(fontInfo => fontInfo[0] == familyName);
					if (optionalData && optionalData.length) {
						filteredUsedFonts.set(familyName, optionalData);
					}
				}
			}));
			unusedFonts = fontsInfo.declared.filter(fontInfo => !filteredUsedFonts.has(fontInfo.fontFamily));
		}
		stylesheets.forEach(stylesheetInfo => {
			const cssRules = stylesheetInfo.stylesheet.children;
			if (cssRules) {
				filterUnusedFonts(cssRules, fontsInfo.declared, unusedFonts, filteredUsedFonts, docContent);
				stats.rules.discarded -= cssRules.size;
			}
		});
		return stats;
	}

	function getFontsInfo(cssRules, fontsInfo) {
		cssRules.forEach(ruleData => {
			if (ruleData.type == "Atrule" && (ruleData.name == "media" || ruleData.name == "supports") && ruleData.block && ruleData.block.children) {
				getFontsInfo(ruleData.block.children, fontsInfo);
			} else if (ruleData.type == "Rule") {
				const fontFamilyNames = getFontFamilyNames(ruleData.block);
				if (fontFamilyNames.length) {
					fontsInfo.used.push(fontFamilyNames);
				}
			} else {
				if (ruleData.type == "Atrule" && ruleData.name == "font-face") {
					const fontFamily = helper$1.normalizeFontFamily(getDeclarationValue(ruleData.block.children, "font-family"));
					if (fontFamily) {
						const fontWeight = getDeclarationValue(ruleData.block.children, "font-weight") || "400";
						const fontStyle = getDeclarationValue(ruleData.block.children, "font-style") || "normal";
						const fontVariant = getDeclarationValue(ruleData.block.children, "font-variant") || "normal";
						fontWeight.split(",").forEach(weightValue =>
							fontsInfo.declared.push({ fontFamily, fontWeight: helper$1.getFontWeight(helper$1.removeQuotes(weightValue)), fontStyle, fontVariant }));
					}
				}
			}
		});
	}

	function filterUnusedFonts(cssRules, declaredFonts, unusedFonts, filteredUsedFonts, docContent) {
		const removedRules = [];
		for (let cssRule = cssRules.head; cssRule; cssRule = cssRule.next) {
			const ruleData = cssRule.data;
			if (ruleData.type == "Atrule" && (ruleData.name == "media" || ruleData.name == "supports") && ruleData.block && ruleData.block.children) {
				filterUnusedFonts(ruleData.block.children, declaredFonts, unusedFonts, filteredUsedFonts, docContent);
			} else if (ruleData.type == "Atrule" && ruleData.name == "font-face") {
				const fontFamily = helper$1.normalizeFontFamily(getDeclarationValue(ruleData.block.children, "font-family"));
				if (fontFamily) {
					const unicodeRange = getDeclarationValue(ruleData.block.children, "unicode-range");
					if (unusedFonts.find(fontInfo => fontInfo.fontFamily == fontFamily) || !testUnicodeRange(docContent, unicodeRange) || !testUsedFont(ruleData, fontFamily, declaredFonts, filteredUsedFonts)) {
						removedRules.push(cssRule);
					}
				}
				const removedDeclarations = [];
				for (let declaration = ruleData.block.children.head; declaration; declaration = declaration.next) {
					if (declaration.data.property == "font-display") {
						removedDeclarations.push(declaration);
					}
				}
				if (removedDeclarations.length) {
					removedDeclarations.forEach(removedDeclaration => ruleData.block.children.remove(removedDeclaration));
				}
			}
		}
		removedRules.forEach(cssRule => cssRules.remove(cssRule));
	}

	function testUsedFont(ruleData, familyName, declaredFonts, filteredUsedFonts) {
		let test;
		const optionalUsedFonts = filteredUsedFonts && filteredUsedFonts.get(familyName);
		if (optionalUsedFonts && optionalUsedFonts.length) {
			let fontStyle = getDeclarationValue(ruleData.block.children, "font-style") || "normal";
			if (VALID_FONT_STYLES.find(rule => fontStyle.trim().match(rule))) {
				const fontWeight = helper$1.getFontWeight(getDeclarationValue(ruleData.block.children, "font-weight") || "400");
				const declaredFontsWeights = declaredFonts
					.filter(fontInfo => fontInfo.fontFamily == familyName && fontInfo.fontStyle == fontStyle)
					.map(fontInfo => fontInfo.fontWeight)
					.sort((weight1, weight2) => Number.parseInt(weight1, 10) - Number.parseInt(weight2, 10));
				let usedFontWeights = optionalUsedFonts.map(fontInfo => getUsedFontWeight(fontInfo, fontStyle, declaredFontsWeights));
				test = testFontweight(fontWeight, usedFontWeights);
				if (!test) {
					usedFontWeights = optionalUsedFonts.map(fontInfo => {
						fontInfo = Array.from(fontInfo);
						fontInfo[2] = "normal";
						return getUsedFontWeight(fontInfo, fontStyle, declaredFontsWeights);
					});
				}
				test = testFontweight(fontWeight, usedFontWeights);
			} else {
				test = true;
			}
		} else {
			test = true;
		}
		return test;
	}

	function testFontweight(fontWeight, usedFontWeights) {
		let test;
		for (const value of fontWeight.split(/[ ,]/)) {
			test = test || usedFontWeights.includes(helper$1.getFontWeight(helper$1.removeQuotes(value)));
		}
		return test;
	}

	function getDeclarationValue(declarations, propertyName) {
		let property;
		if (declarations) {
			property = declarations.filter(declaration => declaration.property == propertyName).tail;
		}
		if (property) {
			try {
				return helper$1.removeQuotes(vb(property.data.value)).toLowerCase();
			} catch (error) {
				// ignored
			}
		}
	}

	function getFontFamilyNames(declarations) {
		let fontFamilyName = declarations.children.filter(node => node.property == "font-family").tail;
		let fontFamilyNames = [];
		if (fontFamilyName) {
			let familyName = "";
			if (fontFamilyName.data.value.children) {
				let previousType;
				fontFamilyName.data.value.children.forEach(node => {
					if (node.type == "Operator" && node.value == "," && familyName) {
						fontFamilyNames.push(helper$1.normalizeFontFamily(familyName));
						familyName = "";
						previousType = null;
					} else {
						if (previousType == "Identifier" && node.type == "Identifier") {
							familyName += " ";
						}
						familyName += vb(node);
					}
					previousType = node.type;
				});
			} else {
				fontFamilyName = vb(fontFamilyName.data.value);
			}
			if (familyName) {
				fontFamilyNames.push(helper$1.normalizeFontFamily(familyName));
			}
		}
		const font = declarations.children.filter(node => node.property == "font").tail;
		if (font && font.data && font.data.value) {
			try {
				const parsedFont = parse(font.data.value);
				parsedFont.family.forEach(familyName => fontFamilyNames.push(helper$1.normalizeFontFamily(familyName)));
			} catch (error) {
				// ignored				
			}
		}
		return fontFamilyNames;
	}

	function getUsedFontWeight(fontInfo, fontStyle, fontWeights) {
		let foundWeight;
		fontWeights = fontWeights.map(weight => String(Number.parseInt(weight, 10)));
		if (fontInfo[2] == fontStyle) {
			let fontWeight = Number(fontInfo[1]);
			if (fontWeights.length > 1) {
				if (fontWeight >= 400 && fontWeight <= 500) {
					foundWeight = fontWeights.find(weight => weight >= fontWeight && weight <= 500);
					if (!foundWeight) {
						foundWeight = findDescendingFontWeight(fontWeight, fontWeights);
					}
					if (!foundWeight) {
						foundWeight = findAscendingFontWeight(fontWeight, fontWeights);
					}
				}
				if (fontWeight < 400) {
					foundWeight = fontWeights.slice().reverse().find(weight => weight <= fontWeight);
					if (!foundWeight) {
						foundWeight = findAscendingFontWeight(fontWeight, fontWeights);
					}
				}
				if (fontWeight > 500) {
					foundWeight = fontWeights.find(weight => weight >= fontWeight);
					if (!foundWeight) {
						foundWeight = findDescendingFontWeight(fontWeight, fontWeights);
					}
				}
			} else {
				foundWeight = fontWeights[0];
			}
		}
		return foundWeight;
	}

	function findDescendingFontWeight(fontWeight, fontWeights) {
		return fontWeights.slice().reverse().find(weight => weight < fontWeight);
	}

	function findAscendingFontWeight(fontWeight, fontWeights) {
		return fontWeights.find(weight => weight > fontWeight);
	}

	function getRulesTextContent(doc, cssRules, workStylesheet, content) {
		cssRules.forEach(ruleData => {
			if (ruleData.block && ruleData.block.children && ruleData.prelude && ruleData.prelude.children) {
				if (ruleData.type == "Atrule" && (ruleData.name == "media" || ruleData.name == "supports")) {
					content = getRulesTextContent(doc, ruleData.block.children, workStylesheet, content);
				} else if (ruleData.type == "Rule") {
					content = getDeclarationsTextContent(ruleData.block.children, workStylesheet, content);
				}
			}
		});
		return content;
	}

	function getDeclarationsTextContent(declarations, workStylesheet, content) {
		const contentText = getDeclarationUnescapedValue(declarations, "content", workStylesheet);
		const quotesText = getDeclarationUnescapedValue(declarations, "quotes", workStylesheet);
		if (!content.includes(contentText)) {
			content += contentText;
		}
		if (!content.includes(quotesText)) {
			content += quotesText;
		}
		return content;
	}

	function getDeclarationUnescapedValue(declarations, property, workStylesheet) {
		const rawValue = getDeclarationValue(declarations, property) || "";
		if (rawValue) {
			workStylesheet.textContent = "tmp { content:\"" + rawValue + "\"}";
			if (workStylesheet.sheet && workStylesheet.sheet.cssRules) {
				return helper$1.removeQuotes(workStylesheet.sheet.cssRules[0].style.getPropertyValue("content"));
			} else {
				return rawValue;
			}
		}
		return "";
	}

	function testUnicodeRange(docContent, unicodeRange) {
		if (unicodeRange) {
			const unicodeRanges = unicodeRange.split(REGEXP_COMMA);
			let invalid;
			const result = unicodeRanges.filter(rangeValue => {
				const range = rangeValue.split(REGEXP_DASH);
				let regExpString;
				if (range.length == 2) {
					range[0] = transformRange(range[0]);
					regExpString = "[" + range[0] + "-" + transformRange("U+" + range[1]) + "]";
				}
				if (range.length == 1) {
					if (range[0].includes("?")) {
						const firstRange = transformRange(range[0]);
						const secondRange = firstRange;
						regExpString = "[" + firstRange.replace(REGEXP_QUESTION_MARK, "0") + "-" + secondRange.replace(REGEXP_QUESTION_MARK, "F") + "]";
					} else if (range[0]) {
						regExpString = "[" + transformRange(range[0]) + "]";
					}
				}
				if (regExpString) {
					try {
						return (new RegExp(regExpString, "u")).test(docContent);
					} catch (error) {
						invalid = true;
						return false;
					}
				}
				return true;
			});
			return !invalid && (!unicodeRanges.length || result.length);
		}
		return true;
	}

	function transformRange(range) {
		range = range.replace(REGEXP_STARTS_U_PLUS, "");
		while (range.length < 6) {
			range = "0" + range;
		}
		return "\\u{" + range + "}";
	}

	var cssFontsMinifier = /*#__PURE__*/Object.freeze({
		__proto__: null,
		process: process$5
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	const MEDIA_ALL$1 = "all";
	const IGNORED_PSEUDO_ELEMENTS = ["after", "before", "first-letter", "first-line", "placeholder", "selection", "part", "marker"];
	const SINGLE_FILE_HIDDEN_CLASS_NAME = "sf-hidden";
	const DISPLAY_STYLE = "display";
	const REGEXP_VENDOR_IDENTIFIER = /-(ms|webkit|moz|o)-/;

	class MatchedRules {
		constructor(doc, stylesheets, styles) {
			this.doc = doc;
			this.mediaAllInfo = createMediaInfo(MEDIA_ALL$1);
			const matchedElementsCache = new Map();
			let sheetIndex = 0;
			const workStyleSheet = doc.createElement("style");
			doc.body.appendChild(workStyleSheet);
			const workStyleElement = doc.createElement("span");
			doc.body.appendChild(workStyleElement);
			stylesheets.forEach(stylesheetInfo => {
				if (!stylesheetInfo.scoped) {
					const cssRules = stylesheetInfo.stylesheet.children;
					if (cssRules) {
						if (stylesheetInfo.mediaText && stylesheetInfo.mediaText != MEDIA_ALL$1) {
							const mediaInfo = createMediaInfo(stylesheetInfo.mediaText);
							this.mediaAllInfo.medias.set("style-" + sheetIndex + "-" + stylesheetInfo.mediaText, mediaInfo);
							getMatchedElementsRules(doc, cssRules, mediaInfo, sheetIndex, styles, matchedElementsCache, workStyleSheet);
						} else {
							getMatchedElementsRules(doc, cssRules, this.mediaAllInfo, sheetIndex, styles, matchedElementsCache, workStyleSheet);
						}
					}
				}
				sheetIndex++;
			});
			sortRules(this.mediaAllInfo);
			computeCascade(this.mediaAllInfo, [], this.mediaAllInfo, workStyleSheet, workStyleElement);
			workStyleSheet.remove();
			workStyleElement.remove();
		}

		getMediaAllInfo() {
			return this.mediaAllInfo;
		}
	}

	function getMediaAllInfo(doc, stylesheets, styles) {
		return new MatchedRules(doc, stylesheets, styles).getMediaAllInfo();
	}

	function createMediaInfo(media) {
		const mediaInfo = { media: media, elements: new Map(), medias: new Map(), rules: new Map(), pseudoRules: new Map() };
		if (media == MEDIA_ALL$1) {
			mediaInfo.matchedStyles = new Map();
		}
		return mediaInfo;
	}

	function getMatchedElementsRules(doc, cssRules, mediaInfo, sheetIndex, styles, matchedElementsCache, workStylesheet) {
		let mediaIndex = 0;
		let ruleIndex = 0;
		cssRules.forEach(ruleData => {
			if (ruleData.block && ruleData.block.children && ruleData.prelude && ruleData.prelude.children) {
				if (ruleData.type == "Atrule" && ruleData.name == "media") {
					const mediaText = vb(ruleData.prelude);
					const ruleMediaInfo = createMediaInfo(mediaText);
					mediaInfo.medias.set("rule-" + sheetIndex + "-" + mediaIndex + "-" + mediaText, ruleMediaInfo);
					mediaIndex++;
					getMatchedElementsRules(doc, ruleData.block.children, ruleMediaInfo, sheetIndex, styles, matchedElementsCache, workStylesheet);
				} else if (ruleData.type == "Rule") {
					const selectors = ruleData.prelude.children.toArray();
					const selectorsText = ruleData.prelude.children.toArray().map(selector => vb(selector));
					const ruleInfo = { ruleData, mediaInfo, ruleIndex, sheetIndex, matchedSelectors: new Set(), declarations: new Set(), selectors, selectorsText };
					if (!invalidSelector(selectorsText.join(","), workStylesheet)) {
						for (let selector = ruleData.prelude.children.head, selectorIndex = 0; selector; selector = selector.next, selectorIndex++) {
							const selectorText = selectorsText[selectorIndex];
							const selectorInfo = { selector, selectorText, ruleInfo };
							getMatchedElementsSelector(doc, selectorInfo, styles, matchedElementsCache);
						}
					}
					ruleIndex++;
				}
			}
		});
	}

	function invalidSelector(selectorText, workStylesheet) {
		workStylesheet.textContent = selectorText + "{}";
		return workStylesheet.sheet ? !workStylesheet.sheet.cssRules.length : workStylesheet.sheet;
	}

	function getMatchedElementsSelector(doc, selectorInfo, styles, matchedElementsCache) {
		const filteredSelectorText = getFilteredSelector(selectorInfo.selector, selectorInfo.selectorText);
		const selectorText = filteredSelectorText != selectorInfo.selectorText ? filteredSelectorText : selectorInfo.selectorText;
		const cachedMatchedElements = matchedElementsCache.get(selectorText);
		let matchedElements = cachedMatchedElements;
		if (!matchedElements) {
			try {
				matchedElements = doc.querySelectorAll(selectorText);
				if (selectorText != "." + SINGLE_FILE_HIDDEN_CLASS_NAME) {
					matchedElements = Array.from(doc.querySelectorAll(selectorText)).filter(matchedElement =>
						!matchedElement.classList.contains(SINGLE_FILE_HIDDEN_CLASS_NAME) &&
						(matchedElement.style.getPropertyValue(DISPLAY_STYLE) != "none" || matchedElement.style.getPropertyPriority("display") != "important")
					);
				}
			} catch (error) {
				// ignored				
			}
		}
		if (matchedElements) {
			if (!cachedMatchedElements) {
				matchedElementsCache.set(selectorText, matchedElements);
			}
			if (matchedElements.length) {
				if (filteredSelectorText == selectorInfo.selectorText) {
					matchedElements.forEach(element => addRule(element, selectorInfo, styles));
				} else {
					let pseudoSelectors = selectorInfo.ruleInfo.mediaInfo.pseudoRules.get(selectorInfo.ruleInfo.ruleData);
					if (!pseudoSelectors) {
						pseudoSelectors = new Set();
						selectorInfo.ruleInfo.mediaInfo.pseudoRules.set(selectorInfo.ruleInfo.ruleData, pseudoSelectors);
					}
					pseudoSelectors.add(selectorInfo.selectorText);
				}
			}
		}
	}

	function getFilteredSelector(selector, selectorText) {
		const removedSelectors = [];
		selector = { data: wb(vb(selector.data), { context: "selector" }) };
		filterPseudoClasses(selector);
		if (removedSelectors.length) {
			removedSelectors.forEach(({ parentSelector, selector }) => {
				if (parentSelector.data.children.size == 0 || !selector.prev || selector.prev.data.type == "Combinator" || selector.prev.data.type == "WhiteSpace") {
					parentSelector.data.children.replace(selector, wb("*", { context: "selector" }).children.head);
				} else {
					parentSelector.data.children.remove(selector);
				}
			});
			selectorText = vb(selector.data).trim();
		}
		return selectorText;

		function filterPseudoClasses(selector, parentSelector) {
			if (selector.data.children) {
				for (let childSelector = selector.data.children.head; childSelector; childSelector = childSelector.next) {
					filterPseudoClasses(childSelector, selector);
				}
			}
			if ((selector.data.type == "PseudoClassSelector") ||
				(selector.data.type == "PseudoElementSelector" && (testVendorPseudo(selector) || IGNORED_PSEUDO_ELEMENTS.includes(selector.data.name)))) {
				removedSelectors.push({ parentSelector, selector });
			}
		}

		function testVendorPseudo(selector) {
			const name = selector.data.name;
			return name.startsWith("-") || name.startsWith("\\-");
		}
	}

	function addRule(element, selectorInfo, styles) {
		const mediaInfo = selectorInfo.ruleInfo.mediaInfo;
		const elementStyle = styles.get(element);
		let elementInfo = mediaInfo.elements.get(element);
		if (!elementInfo) {
			elementInfo = [];
			if (elementStyle) {
				elementInfo.push({ styleInfo: { styleData: elementStyle, declarations: new Set() } });
			}
			mediaInfo.elements.set(element, elementInfo);
		}
		const specificity = computeSpecificity(selectorInfo.selector.data);
		specificity.ruleIndex = selectorInfo.ruleInfo.ruleIndex;
		specificity.sheetIndex = selectorInfo.ruleInfo.sheetIndex;
		selectorInfo.specificity = specificity;
		elementInfo.push(selectorInfo);
	}

	function computeCascade(mediaInfo, parentMediaInfo, mediaAllInfo, workStylesheet, workStyleElement) {
		mediaInfo.elements.forEach((elementInfo/*, element*/) =>
			getDeclarationsInfo(elementInfo, workStylesheet, workStyleElement/*, element*/).forEach((declarationsInfo, property) => {
				if (declarationsInfo.selectorInfo.ruleInfo || mediaInfo == mediaAllInfo) {
					let info;
					if (declarationsInfo.selectorInfo.ruleInfo) {
						info = declarationsInfo.selectorInfo.ruleInfo;
						const ruleData = info.ruleData;
						const ascendantMedia = [mediaInfo, ...parentMediaInfo].find(media => media.rules.get(ruleData)) || mediaInfo;
						ascendantMedia.rules.set(ruleData, info);
						if (ruleData) {
							info.matchedSelectors.add(declarationsInfo.selectorInfo.selectorText);
						}
					} else {
						info = declarationsInfo.selectorInfo.styleInfo;
						const styleData = info.styleData;
						const matchedStyleInfo = mediaAllInfo.matchedStyles.get(styleData);
						if (!matchedStyleInfo) {
							mediaAllInfo.matchedStyles.set(styleData, info);
						}
					}
					if (!info.declarations.has(property)) {
						info.declarations.add(property);
					}
				}
			}));
		delete mediaInfo.elements;
		mediaInfo.medias.forEach(childMediaInfo => computeCascade(childMediaInfo, [mediaInfo, ...parentMediaInfo], mediaAllInfo, workStylesheet, workStyleElement));
	}

	function getDeclarationsInfo(elementInfo, workStylesheet, workStyleElement/*, element*/) {
		const declarationsInfo = new Map();
		const processedProperties = new Set();
		elementInfo.forEach(selectorInfo => {
			let declarations;
			if (selectorInfo.styleInfo) {
				declarations = selectorInfo.styleInfo.styleData.children;
			} else {
				declarations = selectorInfo.ruleInfo.ruleData.block.children;
			}
			processDeclarations(declarationsInfo, declarations, selectorInfo, processedProperties, workStylesheet, workStyleElement);
		});
		return declarationsInfo;
	}

	function processDeclarations(declarationsInfo, declarations, selectorInfo, processedProperties, workStylesheet, workStyleElement) {
		for (let declaration = declarations.tail; declaration; declaration = declaration.prev) {
			const declarationData = declaration.data;
			const declarationText = vb(declarationData);
			if (declarationData.type == "Declaration" &&
				(declarationText.match(REGEXP_VENDOR_IDENTIFIER) || !processedProperties.has(declarationData.property) || declarationData.important) && !invalidDeclaration(declarationText, workStyleElement)) {
				const declarationInfo = declarationsInfo.get(declarationData);
				if (!declarationInfo || (declarationData.important && !declarationInfo.important)) {
					declarationsInfo.set(declarationData, { selectorInfo, important: declarationData.important });
					if (!declarationText.match(REGEXP_VENDOR_IDENTIFIER)) {
						processedProperties.add(declarationData.property);
					}
				}
			}
		}
	}

	function invalidDeclaration(declarationText, workStyleElement) {
		let invalidDeclaration;
		workStyleElement.style = declarationText;
		if (!workStyleElement.style.length) {
			if (!declarationText.match(REGEXP_VENDOR_IDENTIFIER)) {
				invalidDeclaration = true;
			}
		}
		return invalidDeclaration;
	}

	function sortRules(media) {
		media.elements.forEach(elementRules => elementRules.sort((ruleInfo1, ruleInfo2) =>
			ruleInfo1.styleInfo && !ruleInfo2.styleInfo ? -1 :
				!ruleInfo1.styleInfo && ruleInfo2.styleInfo ? 1 :
					compareSpecificity(ruleInfo1.specificity, ruleInfo2.specificity)));
		media.medias.forEach(sortRules);
	}

	function computeSpecificity(selector, specificity = { a: 0, b: 0, c: 0 }) {
		if (selector.type == "IdSelector") {
			specificity.a++;
		}
		if (selector.type == "ClassSelector" || selector.type == "AttributeSelector" || (selector.type == "PseudoClassSelector" && selector.name != "not")) {
			specificity.b++;
		}
		if ((selector.type == "TypeSelector" && selector.name != "*") || selector.type == "PseudoElementSelector") {
			specificity.c++;
		}
		if (selector.children) {
			selector.children.forEach(selector => computeSpecificity(selector, specificity));
		}
		return specificity;
	}

	function compareSpecificity(specificity1, specificity2) {
		if (specificity1.a > specificity2.a) {
			return -1;
		} else if (specificity1.a < specificity2.a) {
			return 1;
		} else if (specificity1.b > specificity2.b) {
			return -1;
		} else if (specificity1.b < specificity2.b) {
			return 1;
		} else if (specificity1.c > specificity2.c) {
			return -1;
		} else if (specificity1.c < specificity2.c) {
			return 1;
		} else if (specificity1.sheetIndex > specificity2.sheetIndex) {
			return -1;
		} else if (specificity1.sheetIndex < specificity2.sheetIndex) {
			return 1;
		} else if (specificity1.ruleIndex > specificity2.ruleIndex) {
			return -1;
		} else if (specificity1.ruleIndex < specificity2.ruleIndex) {
			return 1;
		} else {
			return -1;
		}
	}

	var cssMatchedRules = /*#__PURE__*/Object.freeze({
		__proto__: null,
		getMediaAllInfo: getMediaAllInfo
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	const helper = {
		flatten
	};

	const MEDIA_ALL = "all";
	const MEDIA_SCREEN = "screen";

	function process$4(stylesheets) {
		const stats = { processed: 0, discarded: 0 };
		stylesheets.forEach((stylesheetInfo, element) => {
			if (matchesMediaType(stylesheetInfo.mediaText || MEDIA_ALL, MEDIA_SCREEN) && stylesheetInfo.stylesheet.children) {
				const removedRules = processRules$1(stylesheetInfo.stylesheet.children, stats);
				removedRules.forEach(({ cssRules, cssRule }) => cssRules.remove(cssRule));
			} else {
				stylesheets.delete(element);
			}
		});
		return stats;
	}

	function processRules$1(cssRules, stats, removedRules = []) {
		for (let cssRule = cssRules.head; cssRule; cssRule = cssRule.next) {
			const ruleData = cssRule.data;
			if (ruleData.type == "Atrule" && ruleData.name == "media" && ruleData.block && ruleData.block.children && ruleData.prelude && ruleData.prelude.children) {
				stats.processed++;
				if (matchesMediaType(vb(ruleData.prelude), MEDIA_SCREEN)) {
					processRules$1(ruleData.block.children, stats, removedRules);
				} else {
					removedRules.push({ cssRules, cssRule });
					stats.discarded++;
				}
			}
		}
		return removedRules;
	}

	function matchesMediaType(mediaText, mediaType) {
		const foundMediaTypes = helper.flatten(parseMediaList(mediaText).map(node => getMediaTypes(node, mediaType)));
		return foundMediaTypes.find(mediaTypeInfo => (!mediaTypeInfo.not && (mediaTypeInfo.value == mediaType || mediaTypeInfo.value == MEDIA_ALL))
			|| (mediaTypeInfo.not && (mediaTypeInfo.value == MEDIA_ALL || mediaTypeInfo.value != mediaType)));
	}

	function getMediaTypes(parentNode, mediaType, mediaTypes = []) {
		parentNode.nodes.map((node, indexNode) => {
			if (node.type == "media-query") {
				return getMediaTypes(node, mediaType, mediaTypes);
			} else {
				if (node.type == "media-type") {
					const nodeMediaType = { not: Boolean(indexNode && parentNode.nodes[0].type == "keyword" && parentNode.nodes[0].value == "not"), value: node.value };
					if (!mediaTypes.find(mediaType => nodeMediaType.not == mediaType.not && nodeMediaType.value == mediaType.value)) {
						mediaTypes.push(nodeMediaType);
					}
				}
			}
		});
		if (!mediaTypes.length) {
			mediaTypes.push({ not: false, value: MEDIA_ALL });
		}
		return mediaTypes;
	}

	var cssMediasAltMinifier = /*#__PURE__*/Object.freeze({
		__proto__: null,
		process: process$4
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	function process$3(stylesheets, styles, mediaAllInfo) {
		const stats = { processed: 0, discarded: 0 };
		let sheetIndex = 0;
		stylesheets.forEach(stylesheetInfo => {
			if (!stylesheetInfo.scoped) {
				const cssRules = stylesheetInfo.stylesheet.children;
				if (cssRules) {
					stats.processed += cssRules.size;
					stats.discarded += cssRules.size;
					let mediaInfo;
					if (stylesheetInfo.mediaText && stylesheetInfo.mediaText != "all") {
						mediaInfo = mediaAllInfo.medias.get("style-" + sheetIndex + "-" + stylesheetInfo.mediaText);
					} else {
						mediaInfo = mediaAllInfo;
					}
					processRules(cssRules, sheetIndex, mediaInfo);
					stats.discarded -= cssRules.size;
				}
			}
			sheetIndex++;
		});
		styles.forEach(style => processStyleAttribute(style, mediaAllInfo));
		return stats;
	}

	function processRules(cssRules, sheetIndex, mediaInfo) {
		let mediaRuleIndex = 0;
		const removedCssRules = [];
		for (let cssRule = cssRules.head; cssRule; cssRule = cssRule.next) {
			const ruleData = cssRule.data;
			if (ruleData.block && ruleData.block.children && ruleData.prelude && ruleData.prelude.children) {
				if (ruleData.type == "Atrule" && ruleData.name == "media") {
					const mediaText = vb(ruleData.prelude);
					processRules(ruleData.block.children, sheetIndex, mediaInfo.medias.get("rule-" + sheetIndex + "-" + mediaRuleIndex + "-" + mediaText));
					if (!ruleData.prelude.children.size || !ruleData.block.children.size) {
						removedCssRules.push(cssRule);
					}
					mediaRuleIndex++;
				} else if (ruleData.type == "Rule") {
					const ruleInfo = mediaInfo.rules.get(ruleData);
					const pseudoSelectors = mediaInfo.pseudoRules.get(ruleData);
					if (!ruleInfo && !pseudoSelectors) {
						removedCssRules.push(cssRule);
					} else if (ruleInfo) {
						processRuleInfo(ruleData, ruleInfo, pseudoSelectors);
						if (!ruleData.prelude.children.size || !ruleData.block.children.size) {
							removedCssRules.push(cssRule);
						}
					}
				}
			} else {
				if (!ruleData || ruleData.type == "Raw" || (ruleData.type == "Rule" && (!ruleData.prelude || ruleData.prelude.type == "Raw"))) {
					removedCssRules.push(cssRule);
				}
			}
		}
		removedCssRules.forEach(cssRule => cssRules.remove(cssRule));
	}

	function processRuleInfo(ruleData, ruleInfo, pseudoSelectors) {
		const removedDeclarations = [];
		const removedSelectors = [];
		let pseudoSelectorFound;
		for (let selector = ruleData.prelude.children.head; selector; selector = selector.next) {
			const selectorText = vb(selector.data);
			if (pseudoSelectors && pseudoSelectors.has(selectorText)) {
				pseudoSelectorFound = true;
			}
			if (!ruleInfo.matchedSelectors.has(selectorText) && (!pseudoSelectors || !pseudoSelectors.has(selectorText))) {
				removedSelectors.push(selector);
			}
		}
		if (!pseudoSelectorFound) {
			for (let declaration = ruleData.block.children.tail; declaration; declaration = declaration.prev) {
				if (!ruleInfo.declarations.has(declaration.data)) {
					removedDeclarations.push(declaration);
				}
			}
		}
		removedDeclarations.forEach(declaration => ruleData.block.children.remove(declaration));
		removedSelectors.forEach(selector => ruleData.prelude.children.remove(selector));
	}

	function processStyleAttribute(styleData, mediaAllInfo) {
		const removedDeclarations = [];
		const styleInfo = mediaAllInfo.matchedStyles.get(styleData);
		if (styleInfo) {
			let propertyFound;
			for (let declaration = styleData.children.head; declaration && !propertyFound; declaration = declaration.next) {
				if (!styleInfo.declarations.has(declaration.data)) {
					removedDeclarations.push(declaration);
				}
			}
			removedDeclarations.forEach(declaration => styleData.children.remove(declaration));
		}
	}

	var cssRulesMinifier = /*#__PURE__*/Object.freeze({
		__proto__: null,
		process: process$3
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	const EMPTY_RESOURCE = "data:,";

	function process$2(doc) {
		doc.querySelectorAll("picture").forEach(pictureElement => {
			const imgElement = pictureElement.querySelector("img");
			if (imgElement) {
				let { src, srcset } = getImgSrcData(imgElement);
				if (!src) {
					const data = getSourceSrcData(Array.from(pictureElement.querySelectorAll("source")).reverse());
					src = data.src;
					if (!srcset) {
						srcset = data.srcset;
					}
				}
				setSrc({ src, srcset }, imgElement, pictureElement);
			}
		});
		doc.querySelectorAll(":not(picture) > img[srcset]").forEach(imgElement => setSrc(getImgSrcData(imgElement), imgElement));
	}

	function getImgSrcData(imgElement) {
		let src = imgElement.getAttribute("src");
		if (src == EMPTY_RESOURCE) {
			src = null;
		}
		let srcset = getSourceSrc(imgElement.getAttribute("srcset"));
		if (srcset == EMPTY_RESOURCE) {
			srcset = null;
		}
		return { src, srcset };
	}

	function getSourceSrcData(sources) {
		let source = sources.find(source => source.src);
		let src = source && source.src;
		let srcset = source && source.srcset;
		if (!src) {
			source = sources.find(source => getSourceSrc(source.src));
			src = source && source.src;
			if (src == EMPTY_RESOURCE) {
				src = null;
			}
		}
		if (!srcset) {
			source = sources.find(source => getSourceSrc(source.srcset));
			srcset = source && source.srcset;
			if (srcset == EMPTY_RESOURCE) {
				srcset = null;
			}
		}
		return { src, srcset };
	}

	function setSrc(srcData, imgElement, pictureElement) {
		if (srcData.src) {
			imgElement.setAttribute("src", srcData.src);
			imgElement.setAttribute("srcset", "");
			imgElement.setAttribute("sizes", "");
		} else {
			imgElement.setAttribute("src", EMPTY_RESOURCE);
			if (srcData.srcset) {
				imgElement.setAttribute("srcset", srcData.srcset);
			} else {
				imgElement.setAttribute("srcset", "");
				imgElement.setAttribute("sizes", "");
			}
		}
		if (pictureElement) {
			pictureElement.querySelectorAll("source").forEach(sourceElement => sourceElement.remove());
		}
	}

	function getSourceSrc(sourceSrcSet) {
		if (sourceSrcSet) {
			try {
				const srcset = process$7(sourceSrcSet);
				if (srcset.length) {
					return (srcset.find(srcset => srcset.url)).url;
				}
			} catch (error) {
				// ignored
			}
		}
	}

	var htmlImagesAltMinifier = /*#__PURE__*/Object.freeze({
		__proto__: null,
		process: process$2
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	// Derived from the work of Kirill Maltsev - https://github.com/posthtml/htmlnano

	// Source: https://github.com/kangax/html-minifier/issues/63
	const booleanAttributes = [
		"allowfullscreen",
		"async",
		"autofocus",
		"autoplay",
		"checked",
		"compact",
		"controls",
		"declare",
		"default",
		"defaultchecked",
		"defaultmuted",
		"defaultselected",
		"defer",
		"disabled",
		"enabled",
		"formnovalidate",
		"hidden",
		"indeterminate",
		"inert",
		"ismap",
		"itemscope",
		"loop",
		"multiple",
		"muted",
		"nohref",
		"noresize",
		"noshade",
		"novalidate",
		"nowrap",
		"open",
		"pauseonexit",
		"readonly",
		"required",
		"reversed",
		"scoped",
		"seamless",
		"selected",
		"sortable",
		"truespeed",
		"typemustmatch",
		"visible"
	];

	const noWhitespaceCollapseElements = ["script", "style", "pre", "textarea"];

	// Source: https://www.w3.org/TR/html4/sgml/dtd.html#events (Generic Attributes)
	const safeToRemoveAttrs = [
		"id",
		"class",
		"style",
		"lang",
		"dir",
		"onclick",
		"ondblclick",
		"onmousedown",
		"onmouseup",
		"onmouseover",
		"onmousemove",
		"onmouseout",
		"onkeypress",
		"onkeydown",
		"onkeyup"
	];

	const redundantAttributes = {
		"form": {
			"method": "get"
		},
		"script": {
			"language": "javascript",
			"type": "text/javascript",
			// Remove attribute if the function returns false
			"charset": node => {
				// The charset attribute only really makes sense on “external” SCRIPT elements:
				// http://perfectionkills.com/optimizing-html/#8_script_charset
				return !node.getAttribute("src");
			}
		},
		"style": {
			"media": "all",
			"type": "text/css"
		},
		"link": {
			"media": "all"
		}
	};

	const REGEXP_WHITESPACE = /[ \t\f\r]+/g;
	const REGEXP_NEWLINE = /[\n]+/g;
	const REGEXP_ENDS_WHITESPACE = /^\s+$/;
	const NodeFilter_SHOW_ALL = 4294967295;
	const Node_ELEMENT_NODE$1 = 1;
	const Node_TEXT_NODE$1 = 3;
	const Node_COMMENT_NODE$1 = 8;

	const modules = [
		collapseBooleanAttributes,
		mergeTextNodes,
		collapseWhitespace,
		removeComments,
		removeEmptyAttributes,
		removeRedundantAttributes,
		compressJSONLD,
		node => mergeElements(node, "style", (node, previousSibling) => node.parentElement && node.parentElement.tagName == "HEAD" && node.media == previousSibling.media && node.title == previousSibling.title)
	];

	function process$1(doc, options) {
		removeEmptyInlineElements(doc);
		const nodesWalker = doc.createTreeWalker(doc.documentElement, NodeFilter_SHOW_ALL, null, false);
		let node = nodesWalker.nextNode();
		while (node) {
			const deletedNode = modules.find(module => module(node, options));
			const previousNode = node;
			node = nodesWalker.nextNode();
			if (deletedNode) {
				previousNode.remove();
			}
		}
	}

	function collapseBooleanAttributes(node) {
		if (node.nodeType == Node_ELEMENT_NODE$1) {
			Array.from(node.attributes).forEach(attribute => {
				if (booleanAttributes.includes(attribute.name)) {
					node.setAttribute(attribute.name, "");
				}
			});
		}
	}

	function mergeTextNodes(node) {
		if (node.nodeType == Node_TEXT_NODE$1) {
			if (node.previousSibling && node.previousSibling.nodeType == Node_TEXT_NODE$1) {
				node.textContent = node.previousSibling.textContent + node.textContent;
				node.previousSibling.remove();
			}
		}
	}

	function mergeElements(node, tagName, acceptMerge) {
		if (node.nodeType == Node_ELEMENT_NODE$1 && node.tagName.toLowerCase() == tagName.toLowerCase()) {
			let previousSibling = node.previousSibling;
			const previousSiblings = [];
			while (previousSibling && previousSibling.nodeType == Node_TEXT_NODE$1 && !previousSibling.textContent.trim()) {
				previousSiblings.push(previousSibling);
				previousSibling = previousSibling.previousSibling;
			}
			if (previousSibling && previousSibling.nodeType == Node_ELEMENT_NODE$1 && previousSibling.tagName == node.tagName && acceptMerge(node, previousSibling)) {
				node.textContent = previousSibling.textContent + node.textContent;
				previousSiblings.forEach(node => node.remove());
				previousSibling.remove();
			}
		}
	}

	function collapseWhitespace(node, options) {
		if (node.nodeType == Node_TEXT_NODE$1) {
			let element = node.parentElement;
			const spacePreserved = element.getAttribute(options.PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME) == "";
			if (!spacePreserved) {
				const textContent = node.textContent;
				let noWhitespace = noWhitespaceCollapse(element);
				while (noWhitespace) {
					element = element.parentElement;
					noWhitespace = element && noWhitespaceCollapse(element);
				}
				if ((!element || noWhitespace) && textContent.length > 1) {
					node.textContent = textContent.replace(REGEXP_WHITESPACE, getWhiteSpace(node)).replace(REGEXP_NEWLINE, "\n");
				}
			}
		}
	}

	function getWhiteSpace(node) {
		return node.parentElement && node.parentElement.tagName == "HEAD" ? "\n" : " ";
	}

	function noWhitespaceCollapse(element) {
		return element && !noWhitespaceCollapseElements.includes(element.tagName.toLowerCase());
	}

	function removeComments(node) {
		if (node.nodeType == Node_COMMENT_NODE$1 && node.parentElement.tagName != "HTML") {
			return !node.textContent.toLowerCase().trim().startsWith("[if");
		}
	}

	function removeEmptyAttributes(node) {
		if (node.nodeType == Node_ELEMENT_NODE$1) {
			Array.from(node.attributes).forEach(attribute => {
				if (safeToRemoveAttrs.includes(attribute.name.toLowerCase())) {
					const attributeValue = node.getAttribute(attribute.name);
					if (attributeValue == "" || (attributeValue || "").match(REGEXP_ENDS_WHITESPACE)) {
						node.removeAttribute(attribute.name);
					}
				}
			});
		}
	}

	function removeRedundantAttributes(node) {
		if (node.nodeType == Node_ELEMENT_NODE$1) {
			const tagRedundantAttributes = redundantAttributes[node.tagName.toLowerCase()];
			if (tagRedundantAttributes) {
				Object.keys(tagRedundantAttributes).forEach(redundantAttributeName => {
					const tagRedundantAttributeValue = tagRedundantAttributes[redundantAttributeName];
					if (typeof tagRedundantAttributeValue == "function" ? tagRedundantAttributeValue(node) : node.getAttribute(redundantAttributeName) == tagRedundantAttributeValue) {
						node.removeAttribute(redundantAttributeName);
					}
				});
			}
		}
	}

	function compressJSONLD(node) {
		if (node.nodeType == Node_ELEMENT_NODE$1 && node.tagName == "SCRIPT" && node.type == "application/ld+json" && node.textContent.trim()) {
			try {
				node.textContent = JSON.stringify(JSON.parse(node.textContent));
			} catch (error) {
				// ignored
			}
		}
	}

	function removeEmptyInlineElements(doc) {
		doc.querySelectorAll("style, script:not([src])").forEach(element => {
			if (!element.textContent.trim()) {
				element.remove();
			}
		});
	}

	var htmlMinifier = /*#__PURE__*/Object.freeze({
		__proto__: null,
		process: process$1
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	const SELF_CLOSED_TAG_NAMES = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];

	const Node_ELEMENT_NODE = 1;
	const Node_TEXT_NODE = 3;
	const Node_COMMENT_NODE = 8;

	// see https://www.w3.org/TR/html5/syntax.html#optional-tags
	const OMITTED_START_TAGS = [
		{ tagName: "head", accept: element => !element.childNodes.length || element.childNodes[0].nodeType == Node_ELEMENT_NODE },
		{ tagName: "body", accept: element => !element.childNodes.length }
	];
	const OMITTED_END_TAGS = [
		{ tagName: "html", accept: next => !next || next.nodeType != Node_COMMENT_NODE },
		{ tagName: "head", accept: next => !next || (next.nodeType != Node_COMMENT_NODE && (next.nodeType != Node_TEXT_NODE || !startsWithSpaceChar(next.textContent))) },
		{ tagName: "body", accept: next => !next || next.nodeType != Node_COMMENT_NODE },
		{ tagName: "li", accept: (next, element) => (!next && element.parentElement && (element.parentElement.tagName == "UL" || element.parentElement.tagName == "OL")) || (next && ["LI"].includes(next.tagName)) },
		{ tagName: "dt", accept: next => !next || ["DT", "DD"].includes(next.tagName) },
		{ tagName: "p", accept: next => next && ["ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "DETAILS", "DIV", "DL", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HR", "MAIN", "NAV", "OL", "P", "PRE", "SECTION", "TABLE", "UL"].includes(next.tagName) },
		{ tagName: "dd", accept: next => !next || ["DT", "DD"].includes(next.tagName) },
		{ tagName: "rt", accept: next => !next || ["RT", "RP"].includes(next.tagName) },
		{ tagName: "rp", accept: next => !next || ["RT", "RP"].includes(next.tagName) },
		{ tagName: "optgroup", accept: next => !next || ["OPTGROUP"].includes(next.tagName) },
		{ tagName: "option", accept: next => !next || ["OPTION", "OPTGROUP"].includes(next.tagName) },
		{ tagName: "colgroup", accept: next => !next || (next.nodeType != Node_COMMENT_NODE && (next.nodeType != Node_TEXT_NODE || !startsWithSpaceChar(next.textContent))) },
		{ tagName: "caption", accept: next => !next || (next.nodeType != Node_COMMENT_NODE && (next.nodeType != Node_TEXT_NODE || !startsWithSpaceChar(next.textContent))) },
		{ tagName: "thead", accept: next => !next || ["TBODY", "TFOOT"].includes(next.tagName) },
		{ tagName: "tbody", accept: next => !next || ["TBODY", "TFOOT"].includes(next.tagName) },
		{ tagName: "tfoot", accept: next => !next },
		{ tagName: "tr", accept: next => !next || ["TR"].includes(next.tagName) },
		{ tagName: "td", accept: next => !next || ["TD", "TH"].includes(next.tagName) },
		{ tagName: "th", accept: next => !next || ["TD", "TH"].includes(next.tagName) }
	];
	const TEXT_NODE_TAGS = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"];

	function process(doc, compressHTML) {
		const docType = doc.doctype;
		let docTypeString = "";
		if (docType) {
			docTypeString = "<!DOCTYPE " + docType.nodeName;
			if (docType.publicId) {
				docTypeString += " PUBLIC \"" + docType.publicId + "\"";
				if (docType.systemId)
					docTypeString += " \"" + docType.systemId + "\"";
			} else if (docType.systemId)
				docTypeString += " SYSTEM \"" + docType.systemId + "\"";
			if (docType.internalSubset)
				docTypeString += " [" + docType.internalSubset + "]";
			docTypeString += "> ";
		}
		return docTypeString + serialize(doc.documentElement, compressHTML);
	}

	function serialize(node, compressHTML, isSVG) {
		if (node.nodeType == Node_TEXT_NODE) {
			return serializeTextNode(node);
		} else if (node.nodeType == Node_COMMENT_NODE) {
			return serializeCommentNode(node);
		} else if (node.nodeType == Node_ELEMENT_NODE) {
			return serializeElement(node, compressHTML, isSVG);
		}
	}

	function serializeTextNode(textNode) {
		const parentNode = textNode.parentNode;
		let parentTagName;
		if (parentNode && parentNode.nodeType == Node_ELEMENT_NODE) {
			parentTagName = parentNode.tagName.toLowerCase();
		}
		if (!parentTagName || TEXT_NODE_TAGS.includes(parentTagName)) {
			if (parentTagName == "script" || parentTagName == "style") {
				return textNode.textContent.replace(/<\//gi, "<\\/").replace(/\/>/gi, "\\/>");
			}
			return textNode.textContent;
		} else {
			return textNode.textContent.replace(/&/g, "&amp;").replace(/\u00a0/g, "&nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
	}

	function serializeCommentNode(commentNode) {
		return "<!--" + commentNode.textContent + "-->";
	}

	function serializeElement(element, compressHTML, isSVG) {
		const tagName = element.tagName.toLowerCase();
		const omittedStartTag = compressHTML && OMITTED_START_TAGS.find(omittedStartTag => tagName == omittedStartTag.tagName && omittedStartTag.accept(element));
		let content = "";
		if (!omittedStartTag || element.attributes.length) {
			content = "<" + tagName;
			Array.from(element.attributes).forEach(attribute => content += serializeAttribute(attribute, element, compressHTML));
			content += ">";
		}
		if (element.tagName == "TEMPLATE" && !element.childNodes.length) {
			content += element.innerHTML;
		} else {
			Array.from(element.childNodes).forEach(childNode => content += serialize(childNode, compressHTML, isSVG || tagName == "svg"));
		}
		const omittedEndTag = compressHTML && OMITTED_END_TAGS.find(omittedEndTag => tagName == omittedEndTag.tagName && omittedEndTag.accept(element.nextSibling, element));
		if (isSVG || (!omittedEndTag && !SELF_CLOSED_TAG_NAMES.includes(tagName))) {
			content += "</" + tagName + ">";
		}
		return content;
	}

	function serializeAttribute(attribute, element, compressHTML) {
		const name = attribute.name;
		let content = "";
		if (!name.match(/["'>/=]/)) {
			let value = attribute.value;
			if (compressHTML && name == "class") {
				value = Array.from(element.classList).map(className => className.trim()).join(" ");
			}
			let simpleQuotesValue;
			value = value.replace(/&/g, "&amp;").replace(/\u00a0/g, "&nbsp;");
			if (value.includes("\"")) {
				if (value.includes("'") || !compressHTML) {
					value = value.replace(/"/g, "&quot;");
				} else {
					simpleQuotesValue = true;
				}
			}
			const invalidUnquotedValue = !compressHTML || value.match(/[ \t\n\f\r'"`=<>]/);
			content += " ";
			if (!attribute.namespace) {
				content += name;
			} else if (attribute.namespaceURI == "http://www.w3.org/XML/1998/namespace") {
				content += "xml:" + name;
			} else if (attribute.namespaceURI == "http://www.w3.org/2000/xmlns/") {
				if (name !== "xmlns") {
					content += "xmlns:";
				}
				content += name;
			} else if (attribute.namespaceURI == "http://www.w3.org/1999/xlink") {
				content += "xlink:" + name;
			} else {
				content += name;
			}
			if (value != "") {
				content += "=";
				if (invalidUnquotedValue) {
					content += simpleQuotesValue ? "'" : "\"";
				}
				content += value;
				if (invalidUnquotedValue) {
					content += simpleQuotesValue ? "'" : "\"";
				}
			}
		}
		return content;
	}

	function startsWithSpaceChar(textContent) {
		return Boolean(textContent.match(/^[ \t\n\f\r]/));
	}

	var htmlSerializer = /*#__PURE__*/Object.freeze({
		__proto__: null,
		process: process
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	var index = /*#__PURE__*/Object.freeze({
		__proto__: null,
		fontsAltMinifier: cssFontsAltMinifier,
		fontsMinifier: cssFontsMinifier,
		matchedRules: cssMatchedRules,
		mediasAltMinifier: cssMediasAltMinifier,
		cssRulesMinifier: cssRulesMinifier,
		imagesAltMinifier: htmlImagesAltMinifier,
		htmlMinifier: htmlMinifier,
		serializer: htmlSerializer
	});

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	const Set$1 = globalThis.Set;
	const Map$1 = globalThis.Map;
	const JSON$1 = globalThis.JSON;

	let util, cssTree;

	function getClass(...args) {
		[util, cssTree] = args;
		return SingleFileClass;
	}

	class SingleFileClass {
		constructor(options) {
			this.options = options;
		}
		async run() {
			const waitForUserScript = globalThis._singleFile_waitForUserScript;
			if (this.options.userScriptEnabled && waitForUserScript) {
				await waitForUserScript(util.ON_BEFORE_CAPTURE_EVENT_NAME);
			}
			this.runner = new Runner(this.options, true);
			await this.runner.loadPage();
			await this.runner.initialize();
			if (this.options.userScriptEnabled && waitForUserScript) {
				await waitForUserScript(util.ON_AFTER_CAPTURE_EVENT_NAME);
			}
			await this.runner.run();
		}
		cancel() {
			this.cancelled = true;
			if (this.runner) {
				this.runner.cancel();
			}
		}
		getPageData() {
			return this.runner.getPageData();
		}
	}

	// -------------
	// ProgressEvent
	// -------------
	const PAGE_LOADING = "page-loading";
	const PAGE_LOADED = "page-loaded";
	const RESOURCES_INITIALIZING = "resource-initializing";
	const RESOURCES_INITIALIZED = "resources-initialized";
	const RESOURCE_LOADED = "resource-loaded";
	const PAGE_ENDED = "page-ended";
	const STAGE_STARTED = "stage-started";
	const STAGE_ENDED = "stage-ended";
	const STAGE_TASK_STARTED = "stage-task-started";
	const STAGE_TASK_ENDED = "stage-task-ended";

	class ProgressEvent {
		constructor(type, detail) {
			return { type, detail, PAGE_LOADING, PAGE_LOADED, RESOURCES_INITIALIZING, RESOURCES_INITIALIZED, RESOURCE_LOADED, PAGE_ENDED, STAGE_STARTED, STAGE_ENDED, STAGE_TASK_STARTED, STAGE_TASK_ENDED };
		}
	}

	// ------
	// Runner
	// ------
	const RESOLVE_URLS_STAGE = 0;
	const REPLACE_DATA_STAGE = 1;
	const REPLACE_DOCS_STAGE = 2;
	const POST_PROCESS_STAGE = 3;
	const STAGES = [{
		sequential: [
			{ action: "preProcessPage" },
			{ option: "loadDeferredImagesKeepZoomLevel", action: "resetZoomLevel" },
			{ action: "replaceStyleContents" },
			{ action: "replaceInvalidElements" },
			{ action: "resetCharsetMeta" },
			{ option: "saveFavicon", action: "saveFavicon" },
			{ action: "replaceCanvasElements" },
			{ action: "insertFonts" },
			{ action: "insertShadowRootContents" },
			{ action: "setInputValues" },
			{ option: "moveStylesInHead", action: "moveStylesInHead" },
			{ option: "blockScripts", action: "removeEmbedScripts" },
			{ option: "selected", action: "removeUnselectedElements" },
			{ option: "blockVideos", action: "insertVideoPosters" },
			{ option: "blockVideos", action: "insertVideoLinks" },
			{ option: "removeFrames", action: "removeFrames" },
			{ action: "removeDiscardedResources" },
			{ option: "removeHiddenElements", action: "removeHiddenElements" },
			{ action: "resolveHrefs" },
			{ action: "resolveStyleAttributeURLs" }
		],
		parallel: [
			{ option: "blockVideos", action: "insertMissingVideoPosters" },
			{ action: "resolveStylesheetURLs" },
			{ option: "!removeFrames", action: "resolveFrameURLs" }
		]
	}, {
		sequential: [
			{ option: "removeUnusedStyles", action: "removeUnusedStyles" },
			{ option: "removeAlternativeMedias", action: "removeAlternativeMedias" },
			{ option: "removeUnusedFonts", action: "removeUnusedFonts" }
		],
		parallel: [
			{ action: "processStylesheets" },
			{ action: "processStyleAttributes" },
			{ action: "processPageResources" },
			{ action: "processScripts" }
		]
	}, {
		sequential: [
			{ option: "removeAlternativeImages", action: "removeAlternativeImages" }
		],
		parallel: [
			{ option: "removeAlternativeFonts", action: "removeAlternativeFonts" },
			{ option: "!removeFrames", action: "processFrames" }
		]
	}, {
		sequential: [
			{ action: "replaceStylesheets" },
			{ action: "replaceStyleAttributes" },
			{ action: "insertVariables" },
			{ option: "compressHTML", action: "compressHTML" },
			{ action: "cleanupPage" }
		],
		parallel: [
			{ option: "enableMaff", action: "insertMAFFMetaData" },
			{ action: "setDocInfo" }
		]
	}];

	class Runner {
		constructor(options, root) {
			const rootDocDefined = root && options.doc;
			this.root = root;
			this.options = options;
			this.options.url = this.options.url || (rootDocDefined && this.options.doc.location.href);
			const matchResourceReferrer = this.options.url.match(/^.*\//);
			this.options.resourceReferrer = this.options.passReferrerOnError && matchResourceReferrer && matchResourceReferrer[0];
			this.options.baseURI = rootDocDefined && this.options.doc.baseURI;
			this.options.rootDocument = root;
			this.options.updatedResources = this.options.updatedResources || {};
			this.options.fontTests = new Map$1();
			this.batchRequest = new BatchRequest();
			this.processor = new Processor(options, this.batchRequest);
			if (rootDocDefined) {
				const docData = util.preProcessDoc(this.options.doc, this.options.win, this.options);
				this.options.canvases = docData.canvases;
				this.options.fonts = docData.fonts;
				this.options.stylesheets = docData.stylesheets;
				this.options.images = docData.images;
				this.options.posters = docData.posters;
				this.options.videos = docData.videos;
				this.options.usedFonts = docData.usedFonts;
				this.options.shadowRoots = docData.shadowRoots;
				this.options.referrer = docData.referrer;
				this.markedElements = docData.markedElements;
				this.invalidElements = docData.invalidElements;
			}
			if (this.options.saveRawPage) {
				this.options.removeFrames = true;
			}
			this.options.content = this.options.content || (rootDocDefined ? util.serialize(this.options.doc) : null);
			this.onprogress = options.onprogress || (() => { });
		}

		async loadPage() {
			this.onprogress(new ProgressEvent(PAGE_LOADING, { pageURL: this.options.url, frame: !this.root }));
			await this.processor.loadPage(this.options.content);
			this.onprogress(new ProgressEvent(PAGE_LOADED, { pageURL: this.options.url, frame: !this.root }));
		}

		async initialize() {
			this.onprogress(new ProgressEvent(RESOURCES_INITIALIZING, { pageURL: this.options.url }));
			await this.executeStage(RESOLVE_URLS_STAGE);
			this.pendingPromises = this.executeStage(REPLACE_DATA_STAGE);
			if (this.root && this.options.doc) {
				util.postProcessDoc(this.options.doc, this.markedElements, this.invalidElements);
			}
		}

		cancel() {
			this.cancelled = true;
			this.batchRequest.cancel();
			if (this.root) {
				if (this.options.frames) {
					this.options.frames.forEach(cancelRunner);
				}
			}

			function cancelRunner(resourceData) {
				if (resourceData.runner) {
					resourceData.runner.cancel();
				}
			}
		}

		async run() {
			if (this.root) {
				this.processor.initialize(this.batchRequest);
				this.onprogress(new ProgressEvent(RESOURCES_INITIALIZED, { pageURL: this.options.url, max: this.processor.maxResources }));
			}
			await this.batchRequest.run(detail => {
				detail.pageURL = this.options.url;
				this.onprogress(new ProgressEvent(RESOURCE_LOADED, detail));
			}, this.options);
			await this.pendingPromises;
			this.options.doc = null;
			this.options.win = null;
			await this.executeStage(REPLACE_DOCS_STAGE);
			await this.executeStage(POST_PROCESS_STAGE);
			this.processor.finalize();
		}

		getDocument() {
			return this.processor.doc;
		}

		getStyleSheets() {
			return this.processor.stylesheets;
		}

		getPageData() {
			if (this.root) {
				this.onprogress(new ProgressEvent(PAGE_ENDED, { pageURL: this.options.url }));
			}
			return this.processor.getPageData();
		}

		async executeStage(step) {
			const frame = !this.root;
			this.onprogress(new ProgressEvent(STAGE_STARTED, { pageURL: this.options.url, step, frame }));
			STAGES[step].sequential.forEach(task => {
				this.onprogress(new ProgressEvent(STAGE_TASK_STARTED, { pageURL: this.options.url, step, task: task.action, frame }));
				if (!this.cancelled) {
					this.executeTask(task);
				}
				this.onprogress(new ProgressEvent(STAGE_TASK_ENDED, { pageURL: this.options.url, step, task: task.action, frame }));
			});
			let parallelTasksPromise;
			if (STAGES[step].parallel) {
				parallelTasksPromise = await Promise.all(STAGES[step].parallel.map(async task => {
					this.onprogress(new ProgressEvent(STAGE_TASK_STARTED, { pageURL: this.options.url, step, task: task.action, frame }));
					if (!this.cancelled) {
						await this.executeTask(task);
					}
					this.onprogress(new ProgressEvent(STAGE_TASK_ENDED, { pageURL: this.options.url, step, task: task.action, frame }));
				}));
			} else {
				parallelTasksPromise = Promise.resolve();
			}
			this.onprogress(new ProgressEvent(STAGE_ENDED, { pageURL: this.options.url, step, frame }));
			return parallelTasksPromise;
		}

		executeTask(task) {
			if (!task.option || ((task.option.startsWith("!") && !this.options[task.option]) || this.options[task.option])) {
				return this.processor[task.action]();
			}
		}
	}

	// ------------
	// BatchRequest
	// ------------
	class BatchRequest {
		constructor() {
			this.requests = new Map$1();
			this.duplicates = new Map$1();
		}

		addURL(resourceURL, { asBinary, expectedType, groupDuplicates, baseURI, blockMixedContent } = {}) {
			return new Promise((resolve, reject) => {
				const requestKey = JSON$1.stringify([resourceURL, asBinary, expectedType, baseURI, blockMixedContent]);
				let resourceRequests = this.requests.get(requestKey);
				if (!resourceRequests) {
					resourceRequests = [];
					this.requests.set(requestKey, resourceRequests);
				}
				const callbacks = { resolve, reject };
				resourceRequests.push(callbacks);
				if (groupDuplicates) {
					let duplicateRequests = this.duplicates.get(requestKey);
					if (!duplicateRequests) {
						duplicateRequests = [];
						this.duplicates.set(requestKey, duplicateRequests);
					}
					duplicateRequests.push(callbacks);
				}
			});
		}

		getMaxResources() {
			return this.requests.size;
		}

		run(onloadListener, options) {
			const resourceURLs = [...this.requests.keys()];
			let indexResource = 0;
			return Promise.all(resourceURLs.map(async requestKey => {
				const [resourceURL, asBinary, expectedType, baseURI, blockMixedContent] = JSON$1.parse(requestKey);
				const resourceRequests = this.requests.get(requestKey);
				try {
					const currentIndexResource = indexResource;
					indexResource = indexResource + 1;
					const content = await util.getContent(resourceURL, {
						asBinary,
						expectedType,
						maxResourceSize: options.maxResourceSize,
						maxResourceSizeEnabled: options.maxResourceSizeEnabled,
						frameId: options.windowId,
						resourceReferrer: options.resourceReferrer,
						baseURI,
						blockMixedContent,
						acceptHeaders: options.acceptHeaders,
						networkTimeout: options.networkTimeout
					});
					onloadListener({ url: resourceURL });
					if (!this.cancelled) {
						resourceRequests.forEach(callbacks => {
							const duplicateCallbacks = this.duplicates.get(requestKey);
							const duplicate = duplicateCallbacks && duplicateCallbacks.length > 1 && duplicateCallbacks.includes(callbacks);
							callbacks.resolve({ content: content.data, indexResource: currentIndexResource, duplicate });
						});
					}
				} catch (error) {
					indexResource = indexResource + 1;
					onloadListener({ url: resourceURL });
					resourceRequests.forEach(resourceRequest => resourceRequest.reject(error));
				}
				this.requests.delete(requestKey);
			}));
		}

		cancel() {
			this.cancelled = true;
			const resourceURLs = [...this.requests.keys()];
			resourceURLs.forEach(requestKey => {
				const resourceRequests = this.requests.get(requestKey);
				resourceRequests.forEach(callbacks => callbacks.reject());
				this.requests.delete(requestKey);
			});
		}
	}

	// ---------
	// Processor
	// ---------
	const PREFIXES_FORBIDDEN_DATA_URI = ["data:text/"];
	const PREFIX_DATA_URI_IMAGE_SVG = "data:image/svg+xml";
	const SCRIPT_TAG_FOUND = /<script/gi;
	const NOSCRIPT_TAG_FOUND = /<noscript/gi;
	const CANVAS_TAG_FOUND = /<canvas/gi;
	const SHADOWROOT_ATTRIBUTE_NAME = "shadowroot";
	const SCRIPT_TEMPLATE_SHADOW_ROOT = "data-template-shadow-root";
	const UTF8_CHARSET = "utf-8";

	class Processor {
		constructor(options, batchRequest) {
			this.options = options;
			this.stats = new Stats(options);
			this.baseURI = normalizeURL(options.baseURI || options.url);
			this.batchRequest = batchRequest;
			this.stylesheets = new Map$1();
			this.styles = new Map$1();
			this.cssVariables = new Map$1();
			this.fontTests = options.fontTests;
		}

		initialize() {
			this.options.saveDate = new Date();
			this.options.saveUrl = this.options.url;
			if (this.options.enableMaff) {
				this.maffMetaDataPromise = this.batchRequest.addURL(util.resolveURL("index.rdf", this.options.baseURI || this.options.url), { expectedType: "document" });
			}
			this.maxResources = this.batchRequest.getMaxResources();
			if (!this.options.saveRawPage && !this.options.removeFrames && this.options.frames) {
				this.options.frames.forEach(frameData => this.maxResources += frameData.maxResources || 0);
			}
			this.stats.set("processed", "resources", this.maxResources);
		}

		async loadPage(pageContent, charset) {
			let content;
			if (!pageContent || this.options.saveRawPage) {
				content = await util.getContent(this.baseURI, {
					maxResourceSize: this.options.maxResourceSize,
					maxResourceSizeEnabled: this.options.maxResourceSizeEnabled,
					charset,
					frameId: this.options.windowId,
					resourceReferrer: this.options.resourceReferrer,
					expectedType: "document",
					acceptHeaders: this.options.acceptHeaders,
					networkTimeout: this.options.networkTimeout
				});
				pageContent = content.data;
			}
			this.doc = util.parseDocContent(pageContent, this.baseURI);
			if (this.options.saveRawPage) {
				let charset;
				this.doc.querySelectorAll("meta[charset], meta[http-equiv=\"content-type\"]").forEach(element => {
					const charsetDeclaration = element.content.split(";")[1];
					if (charsetDeclaration && !charset) {
						charset = charsetDeclaration.split("=")[1].trim().toLowerCase();
					}
				});
				if (charset && content.charset && charset.toLowerCase() != content.charset.toLowerCase()) {
					return this.loadPage(pageContent, charset);
				}
			}
			this.workStyleElement = this.doc.createElement("style");
			this.doc.body.appendChild(this.workStyleElement);
			this.onEventAttributeNames = getOnEventAttributeNames(this.doc);
		}

		finalize() {
			if (this.workStyleElement.parentNode) {
				this.workStyleElement.remove();
			}
		}

		async getPageData() {
			util.postProcessDoc(this.doc);
			const url = util.parseURL(this.baseURI);
			if (this.options.insertSingleFileComment) {
				const firstComment = this.doc.documentElement.firstChild;
				let infobarURL = this.options.saveUrl, infobarSaveDate = this.options.saveDate;
				if (firstComment.nodeType == 8 && (firstComment.textContent.includes(util.COMMENT_HEADER_LEGACY) || firstComment.textContent.includes(util.COMMENT_HEADER))) {
					const info = this.doc.documentElement.firstChild.textContent.split("\n");
					try {
						const [, , url, saveDate] = info;
						infobarURL = url.split("url: ")[1];
						infobarSaveDate = saveDate.split("saved date: ")[1];
						firstComment.remove();
					} catch (error) {
						// ignored
					}
				}
				const infobarContent = (this.options.infobarContent || "").replace(/\\n/g, "\n").replace(/\\t/g, "\t");
				const commentNode = this.doc.createComment("\n " + (this.options.useLegacyCommentHeader ? util.COMMENT_HEADER_LEGACY : util.COMMENT_HEADER) +
					" \n url: " + infobarURL +
					(this.options.removeSavedDate ? " " : " \n saved date: " + infobarSaveDate) +
					(infobarContent ? " \n info: " + infobarContent : "") + "\n");
				this.doc.documentElement.insertBefore(commentNode, this.doc.documentElement.firstChild);
			}
			if (this.options.insertCanonicalLink && this.options.saveUrl.match(HTTP_URI_PREFIX)) {
				let canonicalLink = this.doc.querySelector("link[rel=canonical]");
				if (!canonicalLink) {
					canonicalLink = this.doc.createElement("link");
					canonicalLink.setAttribute("rel", "canonical");
					this.doc.head.appendChild(canonicalLink);
				}
				if (canonicalLink && !canonicalLink.href) {
					canonicalLink.href = this.options.saveUrl;
				}
			}
			if (this.options.insertMetaCSP) {
				const metaTag = this.doc.createElement("meta");
				metaTag.httpEquiv = "content-security-policy";
				metaTag.content = "default-src 'none'; font-src 'self' data:; img-src 'self' data:; style-src 'unsafe-inline'; media-src 'self' data:; script-src 'unsafe-inline' data:; object-src 'self' data:; frame-src 'self' data:;";
				this.doc.head.appendChild(metaTag);
			}
			if (this.options.insertMetaNoIndex) {
				let metaElement = this.doc.querySelector("meta[name=robots][content*=noindex]");
				if (!metaElement) {
					metaElement = this.doc.createElement("meta");
					metaElement.setAttribute("name", "robots");
					metaElement.setAttribute("content", "noindex");
					this.doc.head.appendChild(metaElement);
				}
			}
			const styleElement = this.doc.createElement("style");
			styleElement.textContent = "img[src=\"data:,\"],source[src=\"data:,\"]{display:none!important}";
			this.doc.head.appendChild(styleElement);
			let size;
			if (this.options.displayStats) {
				size = util.getContentSize(this.doc.documentElement.outerHTML);
			}
			const content = util.serialize(this.doc, this.options.compressHTML);
			if (this.options.displayStats) {
				const contentSize = util.getContentSize(content);
				this.stats.set("processed", "HTML bytes", contentSize);
				this.stats.add("discarded", "HTML bytes", size - contentSize);
			}
			let filename = await ProcessorHelper.evalTemplate(this.options.filenameTemplate, this.options, content) || "";
			const replacementCharacter = this.options.filenameReplacementCharacter;
			filename = util.getValidFilename(filename, this.options.filenameReplacedCharacters, replacementCharacter);
			if (!this.options.backgroundSave) {
				filename = filename.replace(/\//g, replacementCharacter);
			}
			if (!this.options.keepFilename &&
				((this.options.filenameMaxLengthUnit == "bytes" && util.getContentSize(filename) > this.options.filenameMaxLength) || (filename.length > this.options.filenameMaxLength))) {
				const extensionMatch = filename.match(/(\.[^.]{3,4})$/);
				const extension = extensionMatch && extensionMatch[0] && extensionMatch[0].length > 1 ? extensionMatch[0] : "";
				filename = this.options.filenameMaxLengthUnit == "bytes" ?
					await util.truncateText(filename, this.options.filenameMaxLength - extension.length) :
					filename.substring(0, this.options.filenameMaxLength - extension.length);
				filename = filename + "…" + extension;
			}
			if (!filename) {
				filename = "Unnamed page";
			}
			const matchTitle = this.baseURI.match(/([^/]*)\/?(\.html?.*)$/) || this.baseURI.match(/\/\/([^/]*)\/?$/);
			const pageData = {
				stats: this.stats.data,
				title: this.options.title || (this.baseURI && matchTitle ? matchTitle[1] : (url.hostname ? url.hostname : "")),
				filename,
				content
			};
			if (this.options.addProof) {
				pageData.hash = await util.digest("SHA-256", content);
			}
			if (this.options.retrieveLinks) {
				pageData.links = Array.from(new Set$1(Array.from(this.doc.links).map(linkElement => linkElement.href)));
			}
			return pageData;
		}

		preProcessPage() {
			if (this.options.win) {
				this.doc.body.querySelectorAll(":not(svg) title, meta, link[href][rel*=\"icon\"]").forEach(element => element instanceof this.options.win.HTMLElement && this.doc.head.appendChild(element));
			}
			if (this.options.images && !this.options.saveRawPage) {
				this.doc.querySelectorAll("img[" + util.IMAGE_ATTRIBUTE_NAME + "]").forEach(imgElement => {
					const attributeValue = imgElement.getAttribute(util.IMAGE_ATTRIBUTE_NAME);
					if (attributeValue) {
						const imageData = this.options.images[Number(attributeValue)];
						if (imageData) {
							if (this.options.removeHiddenElements && (
								(imageData.size && !imageData.size.pxWidth && !imageData.size.pxHeight) ||
								(imgElement.getAttribute(util.HIDDEN_CONTENT_ATTRIBUTE_NAME) == "")
							)) {
								imgElement.setAttribute("src", util.EMPTY_RESOURCE);
							} else {
								if (imageData.currentSrc) {
									imgElement.dataset.singleFileOriginURL = imgElement.getAttribute("src");
									imgElement.setAttribute("src", imageData.currentSrc);
								}
								if (this.options.loadDeferredImages) {
									if ((!imgElement.getAttribute("src") || imgElement.getAttribute("src") == util.EMPTY_RESOURCE) && imgElement.getAttribute("data-src")) {
										imageData.src = imgElement.dataset.src;
										imgElement.setAttribute("src", imgElement.dataset.src);
										imgElement.removeAttribute("data-src");
									}
								}
							}
						}
					}
				});
				if (this.options.loadDeferredImages) {
					this.doc.querySelectorAll("img[data-srcset]").forEach(imgElement => {
						if (!imgElement.getAttribute("srcset") && imgElement.getAttribute("data-srcset")) {
							imgElement.setAttribute("srcset", imgElement.dataset.srcset);
							imgElement.removeAttribute("data-srcset");
						}
					});
				}
			}
		}

		replaceStyleContents() {
			if (this.options.stylesheets) {
				this.doc.querySelectorAll("style").forEach((styleElement, styleIndex) => {
					const attributeValue = styleElement.getAttribute(util.STYLESHEET_ATTRIBUTE_NAME);
					if (attributeValue) {
						const stylesheetContent = this.options.stylesheets[Number(styleIndex)];
						if (stylesheetContent) {
							styleElement.textContent = stylesheetContent;
						}
					}
				});
			}
		}

		removeUnselectedElements() {
			removeUnmarkedElements(this.doc.body);
			this.doc.body.removeAttribute(util.SELECTED_CONTENT_ATTRIBUTE_NAME);

			function removeUnmarkedElements(element) {
				let selectedElementFound = false;
				Array.from(element.childNodes).forEach(node => {
					if (node.nodeType == 1) {
						const isSelectedElement = node.getAttribute(util.SELECTED_CONTENT_ATTRIBUTE_NAME) == "";
						selectedElementFound = selectedElementFound || isSelectedElement;
						if (isSelectedElement) {
							node.removeAttribute(util.SELECTED_CONTENT_ATTRIBUTE_NAME);
							removeUnmarkedElements(node);
						} else if (selectedElementFound) {
							removeNode(node);
						} else {
							hideNode(node);
						}
					}
				});
			}

			function removeNode(node) {
				if ((node.nodeType != 1 || !node.querySelector("svg,style,link")) && canHideNode(node)) {
					node.remove();
				} else {
					hideNode(node);
				}
			}

			function hideNode(node) {
				if (canHideNode(node)) {
					node.style.setProperty("display", "none", "important");
					Array.from(node.childNodes).forEach(removeNode);
				}
			}

			function canHideNode(node) {
				if (node.nodeType == 1) {
					const tagName = node.tagName && node.tagName.toLowerCase();
					return (tagName != "svg" && tagName != "style" && tagName != "link");
				}
			}
		}

		insertVideoPosters() {
			if (this.options.posters) {
				this.doc.querySelectorAll("video, video > source").forEach(element => {
					let videoElement;
					if (element.tagName == "VIDEO") {
						videoElement = element;
					} else {
						videoElement = element.parentElement;
					}
					const attributeValue = element.getAttribute(util.POSTER_ATTRIBUTE_NAME);
					if (attributeValue) {
						const posterURL = this.options.posters[Number(attributeValue)];
						if (!videoElement.getAttribute("poster") && posterURL) {
							videoElement.setAttribute("poster", posterURL);
						}
					}
				});
			}
		}

		insertVideoLinks() {
			const LINK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAABhmlDQ1BJQ0MgcHJvZmlsZQAAKJF9kj1Iw0AYht+mSkUrDnYQcchQnSyIijqWKhbBQmkrtOpgcukfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfEydFJ0UVK/C4ptIjx4LiH9+59+e67A4RGhalm1wSgapaRisfEbG5VDLyiDwEAvZiVmKkn0osZeI6ve/j4ehfhWd7n/hz9St5kgE8kjjLdsIg3iGc2LZ3zPnGIlSSF+Jx43KACiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvE0cVhRNcoXsi4rnLc4q5Uaa9XJbxjMaytprtMcQRxLSCAJETJqKKMCCxFaNVJMpGg/5uEfdvxJcsnkKoORYwFVqJAcP/gb/O6tWZiadJOCMaD7xbY/RoHALtCs2/b3sW03TwD/M3Cltf3VBjD3SXq9rYWPgIFt4OK6rcl7wOUOMPSkS4bkSH6aQqEAvJ/RM+WAwVv6EGtu31r7OH0AMtSr5Rvg4BAYK1L2use9ezr79u+ZVv9+AFlNcp0UUpiqAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5AsHAB8H+DhhoQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAJUExURQAAAICHi4qKioTuJAkAAAABdFJOUwBA5thmAAAAAWJLR0QCZgt8ZAAAAJJJREFUOI3t070NRCEMA2CnYAOyDyPwpHj/Va7hJ3FzV7zy3ET5JIwoAF6Jk4wzAJAkzxAYG9YRTgB+24wBgKmfrGAKTcEfAY4KRlRoIeBTgKOCERVaCPgU4Khge2GqKOBTgKOCERVaAEC/4PNcnyoSWHpjqkhwKxbcig0Q6AorXYF/+A6eIYD1lVbwG/jdA6/kA2THRAURVubcAAAAAElFTkSuQmCC";
			const ICON_SIZE = "16px";
			this.doc.querySelectorAll("video").forEach(videoElement => {
				const attributeValue = videoElement.getAttribute(util.VIDEO_ATTRIBUTE_NAME);
				if (attributeValue) {
					const videoData = this.options.videos[Number(attributeValue)];
					const src = videoData.src || videoElement.src;
					if (videoElement && src) {
						const linkElement = this.doc.createElement("a");
						const imgElement = this.doc.createElement("img");
						linkElement.href = src;
						linkElement.target = "_blank";
						linkElement.style.setProperty("z-index", 2147483647, "important");
						linkElement.style.setProperty("position", "absolute", "important");
						linkElement.style.setProperty("top", "8px", "important");
						linkElement.style.setProperty("left", "8px", "important");
						linkElement.style.setProperty("width", ICON_SIZE, "important");
						linkElement.style.setProperty("height", ICON_SIZE, "important");
						linkElement.style.setProperty("min-width", ICON_SIZE, "important");
						linkElement.style.setProperty("min-height", ICON_SIZE, "important");
						linkElement.style.setProperty("max-width", ICON_SIZE, "important");
						linkElement.style.setProperty("max-height", ICON_SIZE, "important");
						imgElement.src = LINK_ICON;
						imgElement.style.setProperty("width", ICON_SIZE, "important");
						imgElement.style.setProperty("height", ICON_SIZE, "important");
						imgElement.style.setProperty("min-width", ICON_SIZE, "important");
						imgElement.style.setProperty("min-height", ICON_SIZE, "important");
						imgElement.style.setProperty("max-width", ICON_SIZE, "important");
						imgElement.style.setProperty("max-height", ICON_SIZE, "important");
						linkElement.appendChild(imgElement);
						videoElement.insertAdjacentElement("afterend", linkElement);
						const positionInlineParent = videoElement.parentNode.style.getPropertyValue("position");
						if ((!videoData.positionParent && (!positionInlineParent || positionInlineParent != "static")) || videoData.positionParent == "static") {
							videoElement.parentNode.style.setProperty("position", "relative", "important");
						}
					}
				}
			});
		}

		removeFrames() {
			const frameElements = this.doc.querySelectorAll("iframe, frame, object[type=\"text/html\"][data]");
			this.stats.set("discarded", "frames", frameElements.length);
			this.stats.set("processed", "frames", frameElements.length);
			this.doc.querySelectorAll("iframe, frame, object[type=\"text/html\"][data]").forEach(element => element.remove());
		}

		removeEmbedScripts() {
			const JAVASCRIPT_URI_PREFIX = "javascript:";
			this.onEventAttributeNames.forEach(attributeName => this.doc.querySelectorAll("[" + attributeName + "]").forEach(element => element.removeAttribute(attributeName)));
			this.doc.querySelectorAll("[href]").forEach(element => {
				if (element.href && element.href.match && element.href.trim().startsWith(JAVASCRIPT_URI_PREFIX)) {
					element.removeAttribute("href");
				}
			});
			this.doc.querySelectorAll("[src]").forEach(element => {
				if (element.src && element.src.trim().startsWith(JAVASCRIPT_URI_PREFIX)) {
					element.removeAttribute("src");
				}
			});
			const scriptElements = this.doc.querySelectorAll("script:not([type=\"application/ld+json\"]):not([" + SCRIPT_TEMPLATE_SHADOW_ROOT + "])");
			this.stats.set("discarded", "scripts", scriptElements.length);
			this.stats.set("processed", "scripts", scriptElements.length);
			scriptElements.forEach(element => element.remove());
		}

		removeDiscardedResources() {
			this.doc.querySelectorAll("." + util.SINGLE_FILE_UI_ELEMENT_CLASS).forEach(element => element.remove());
			const noscriptPlaceholders = new Map$1();
			this.doc.querySelectorAll("noscript").forEach(noscriptElement => {
				const placeholderElement = this.doc.createElement("div");
				placeholderElement.innerHTML = noscriptElement.dataset.singleFileDisabledNoscript;
				noscriptElement.replaceWith(placeholderElement);
				noscriptPlaceholders.set(placeholderElement, noscriptElement);
			});
			this.doc.querySelectorAll("meta[http-equiv=refresh], meta[disabled-http-equiv]").forEach(element => element.remove());
			Array.from(noscriptPlaceholders).forEach(([placeholderElement, noscriptElement]) => {
				noscriptElement.dataset.singleFileDisabledNoscript = placeholderElement.innerHTML;
				placeholderElement.replaceWith(noscriptElement);
			});
			this.doc.querySelectorAll("meta[http-equiv=\"content-security-policy\"]").forEach(element => element.remove());
			const objectElements = this.doc.querySelectorAll("applet, object[data]:not([type=\"image/svg+xml\"]):not([type=\"image/svg-xml\"]):not([type=\"text/html\"]):not([data*=\".svg\"]):not([data*=\".pdf\"]), embed[src]:not([src*=\".svg\"]):not([src*=\".pdf\"])");
			this.stats.set("discarded", "objects", objectElements.length);
			this.stats.set("processed", "objects", objectElements.length);
			objectElements.forEach(element => element.remove());
			const replacedAttributeValue = this.doc.querySelectorAll("link[rel~=preconnect], link[rel~=prerender], link[rel~=dns-prefetch], link[rel~=preload], link[rel~=manifest], link[rel~=prefetch]");
			replacedAttributeValue.forEach(element => {
				const relValue = element.getAttribute("rel").replace(/(preconnect|prerender|dns-prefetch|preload|prefetch|manifest)/g, "").trim();
				if (relValue.length) {
					element.setAttribute("rel", relValue);
				} else {
					element.remove();
				}
			});
			this.doc.querySelectorAll("link[rel*=stylesheet][rel*=alternate][title],link[rel*=stylesheet]:not([href]),link[rel*=stylesheet][href=\"\"]").forEach(element => element.remove());
			if (this.options.removeHiddenElements) {
				this.doc.querySelectorAll("input[type=hidden]").forEach(element => element.remove());
			}
			if (!this.options.saveFavicon) {
				this.doc.querySelectorAll("link[rel*=\"icon\"]").forEach(element => element.remove());
			}
			this.doc.querySelectorAll("a[ping]").forEach(element => element.removeAttribute("ping"));
			this.doc.querySelectorAll("link[rel=import][href]").forEach(element => element.remove());
		}

		replaceInvalidElements() {
			this.doc.querySelectorAll("template[" + util.INVALID_ELEMENT_ATTRIBUTE_NAME + "]").forEach(templateElement => {
				const placeHolderElement = this.doc.createElement("span");
				if (templateElement.content) {
					const originalElement = templateElement.content.firstChild;
					if (originalElement) {
						if (originalElement.hasAttributes()) {
							Array.from(originalElement.attributes).forEach(attribute => placeHolderElement.setAttribute(attribute.name, attribute.value));
						}
						originalElement.childNodes.forEach(childNode => placeHolderElement.appendChild(childNode.cloneNode(true)));
					}
					templateElement.replaceWith(placeHolderElement);
				}
			});
		}

		resetCharsetMeta() {
			let charset;
			this.doc.querySelectorAll("meta[charset], meta[http-equiv=\"content-type\"]").forEach(element => {
				const charsetDeclaration = element.content.split(";")[1];
				if (charsetDeclaration && !charset) {
					charset = charsetDeclaration.split("=")[1];
					if (charset) {
						this.charset = charset.trim().toLowerCase();
					}
				}
				element.remove();
			});
			const metaElement = this.doc.createElement("meta");
			metaElement.setAttribute("charset", UTF8_CHARSET);
			if (this.doc.head.firstChild) {
				this.doc.head.insertBefore(metaElement, this.doc.head.firstChild);
			} else {
				this.doc.head.appendChild(metaElement);
			}
		}

		setInputValues() {
			this.doc.querySelectorAll("input:not([type=radio]):not([type=checkbox])").forEach(input => {
				const value = input.getAttribute(util.INPUT_VALUE_ATTRIBUTE_NAME);
				input.setAttribute("value", value || "");
			});
			this.doc.querySelectorAll("input[type=radio], input[type=checkbox]").forEach(input => {
				const value = input.getAttribute(util.INPUT_VALUE_ATTRIBUTE_NAME);
				if (value == "true") {
					input.setAttribute("checked", "");
				}
			});
			this.doc.querySelectorAll("textarea").forEach(textarea => {
				const value = textarea.getAttribute(util.INPUT_VALUE_ATTRIBUTE_NAME);
				textarea.textContent = value || "";
			});
			this.doc.querySelectorAll("select").forEach(select => {
				select.querySelectorAll("option").forEach(option => {
					const selected = option.getAttribute(util.INPUT_VALUE_ATTRIBUTE_NAME) != null;
					if (selected) {
						option.setAttribute("selected", "");
					}
				});
			});
		}

		moveStylesInHead() {
			this.doc.querySelectorAll("style").forEach(stylesheet => {
				if (stylesheet.getAttribute(util.STYLE_ATTRIBUTE_NAME) == "") {
					this.doc.head.appendChild(stylesheet);
				}
			});
		}

		saveFavicon() {
			let faviconElement = this.doc.querySelector("link[href][rel=\"icon\"]");
			if (!faviconElement) {
				faviconElement = this.doc.querySelector("link[href][rel=\"shortcut icon\"]");
			}
			if (!faviconElement) {
				faviconElement = this.doc.createElement("link");
				faviconElement.setAttribute("type", "image/x-icon");
				faviconElement.setAttribute("rel", "shortcut icon");
				faviconElement.setAttribute("href", "/favicon.ico");
			}
			this.doc.head.appendChild(faviconElement);
		}

		replaceCanvasElements() {
			if (this.options.canvases) {
				this.doc.querySelectorAll("canvas").forEach(canvasElement => {
					const attributeValue = canvasElement.getAttribute(util.CANVAS_ATTRIBUTE_NAME);
					if (attributeValue) {
						const canvasData = this.options.canvases[Number(attributeValue)];
						if (canvasData) {
							ProcessorHelper.setBackgroundImage(canvasElement, "url(" + canvasData.dataURI + ")");
							this.stats.add("processed", "canvas", 1);
						}
					}
				});
			}
		}

		insertFonts() {
			if (this.options.fonts && this.options.fonts.length) {
				let firstStylesheet = this.doc.querySelector("style, link[rel=stylesheet]"), previousStyleElement;
				this.options.fonts.forEach(fontData => {
					if (fontData["font-family"] && fontData.src) {
						let stylesheetContent = "@font-face{";
						let stylesContent = "";
						Object.keys(fontData).forEach(fontStyle => {
							if (stylesContent) {
								stylesContent += ";";
							}
							stylesContent += fontStyle + ":" + fontData[fontStyle];
						});
						stylesheetContent += stylesContent + "}";
						const styleElement = this.doc.createElement("style");
						styleElement.textContent = stylesheetContent;
						if (previousStyleElement) {
							previousStyleElement.insertAdjacentElement("afterend", styleElement);
						} else if (firstStylesheet) {
							firstStylesheet.parentElement.insertBefore(styleElement, firstStylesheet);
						} else {
							this.doc.head.appendChild(styleElement);
						}
						previousStyleElement = styleElement;
					}
				});
			}
		}

		removeHiddenElements() {
			const hiddenElements = this.doc.querySelectorAll("[" + util.HIDDEN_CONTENT_ATTRIBUTE_NAME + "]");
			const removedElements = this.doc.querySelectorAll("[" + util.REMOVED_CONTENT_ATTRIBUTE_NAME + "]");
			this.stats.set("discarded", "hidden elements", removedElements.length);
			this.stats.set("processed", "hidden elements", removedElements.length);
			if (hiddenElements.length) {
				const styleElement = this.doc.createElement("style");
				styleElement.textContent = ".sf-hidden{display:none!important;}";
				this.doc.head.appendChild(styleElement);
				hiddenElements.forEach(element => {
					if (element.style.getPropertyValue("display") != "none") {
						if (element.style.getPropertyPriority("display") == "important") {
							element.style.setProperty("display", "none", "important");
						} else {
							element.classList.add("sf-hidden");
						}
					}
				});
			}
			removedElements.forEach(element => element.remove());
		}

		resolveHrefs() {
			this.doc.querySelectorAll("a[href], area[href], link[href]").forEach(element => {
				const href = element.getAttribute("href").trim();
				if (element.tagName == "LINK" && element.rel.includes("stylesheet")) {
					if (this.options.saveOriginalURLs && !isDataURL(href)) {
						element.setAttribute("data-sf-original-href", href);
					}
				}
				if (!testIgnoredPath(href)) {
					let resolvedURL;
					try {
						resolvedURL = util.resolveURL(href, this.options.baseURI || this.options.url);
					} catch (error) {
						// ignored
					}
					if (resolvedURL) {
						const url = normalizeURL(this.options.url);
						if (resolvedURL.startsWith(url + "#") && !resolvedURL.startsWith(url + "#!") && !this.options.resolveFragmentIdentifierURLs) {
							resolvedURL = resolvedURL.substring(url.length);
						}
						try {
							element.setAttribute("href", resolvedURL);
						} catch (error) {
							// ignored
						}
					}
				}
			});
		}

		async insertMissingVideoPosters() {
			await Promise.all(Array.from(this.doc.querySelectorAll("video[src], video > source[src]")).map(async element => {
				let videoElement;
				if (element.tagName == "VIDEO") {
					videoElement = element;
				} else {
					videoElement = element.parentElement;
				}
				if (!videoElement.poster) {
					const attributeValue = videoElement.getAttribute(util.VIDEO_ATTRIBUTE_NAME);
					if (attributeValue) {
						const videoData = this.options.videos[Number(attributeValue)];
						const src = videoData.src || videoElement.src;
						if (src) {
							const temporaryVideoElement = this.doc.createElement("video");
							temporaryVideoElement.src = src;
							temporaryVideoElement.style.setProperty("width", videoData.size.pxWidth + "px", "important");
							temporaryVideoElement.style.setProperty("height", videoData.size.pxHeight + "px", "important");
							temporaryVideoElement.style.setProperty("display", "none", "important");
							temporaryVideoElement.crossOrigin = "anonymous";
							const canvasElement = this.doc.createElement("canvas");
							const context = canvasElement.getContext("2d");
							this.options.doc.body.appendChild(temporaryVideoElement);
							return new Promise(resolve => {
								temporaryVideoElement.currentTime = videoData.currentTime;
								temporaryVideoElement.oncanplay = () => {
									canvasElement.width = videoData.size.pxWidth;
									canvasElement.height = videoData.size.pxHeight;
									context.drawImage(temporaryVideoElement, 0, 0, canvasElement.width, canvasElement.height);
									try {
										videoElement.poster = canvasElement.toDataURL("image/png", "");
									} catch (error) {
										// ignored
									}
									temporaryVideoElement.remove();
									resolve();
								};
								temporaryVideoElement.onerror = () => {
									temporaryVideoElement.remove();
									resolve();
								};
							});
						}
					}
				}
			}));
		}

		resolveStyleAttributeURLs() {
			this.doc.querySelectorAll("[style]").forEach(element => {
				if (this.options.blockStylesheets) {
					element.removeAttribute("style");
				} else {
					const styleContent = element.getAttribute("style");
					const declarationList = cssTree.parse(styleContent, { context: "declarationList", parseCustomProperty: true });
					ProcessorHelper.resolveStylesheetURLs(declarationList, this.baseURI, this.workStyleElement);
					this.styles.set(element, declarationList);
				}
			});
		}

		async resolveStylesheetURLs() {
			await Promise.all(Array.from(this.doc.querySelectorAll("style, link[rel*=stylesheet]")).map(async element => {
				const options = Object.assign({}, this.options, { charset: this.charset });
				let mediaText;
				if (element.media) {
					mediaText = element.media.toLowerCase();
				}
				const scoped = Boolean(element.closest("[" + SHADOWROOT_ATTRIBUTE_NAME + "]"));
				const stylesheetInfo = {
					mediaText,
					scoped
				};
				if (element.tagName == "LINK" && element.charset) {
					options.charset = element.charset;
				}
				await processElement(element, stylesheetInfo, this.stylesheets, this.baseURI, options, this.workStyleElement);
			}));
			if (this.options.rootDocument) {
				const newResources = Object.keys(this.options.updatedResources).filter(url => this.options.updatedResources[url].type == "stylesheet" && !this.options.updatedResources[url].retrieved).map(url => this.options.updatedResources[url]);
				await Promise.all(newResources.map(async resource => {
					resource.retrieved = true;
					if (!this.options.blockStylesheets) {
						const stylesheetInfo = {};
						const element = this.doc.createElement("style");
						this.doc.body.appendChild(element);
						element.textContent = resource.content;
						await processElement(element, stylesheetInfo, this.stylesheets, this.baseURI, this.options, this.workStyleElement);
					}
				}));
			}

			async function processElement(element, stylesheetInfo, stylesheets, baseURI, options, workStyleElement) {
				let stylesheet;
				stylesheets.set(element, stylesheetInfo);
				if (!options.blockStylesheets) {
					if (element.tagName == "LINK") {
						stylesheet = await ProcessorHelper.resolveLinkStylesheetURLs(element.href, baseURI, options, workStyleElement);
					} else {
						stylesheet = cssTree.parse(element.textContent, { context: "stylesheet", parseCustomProperty: true });
						const importFound = await ProcessorHelper.resolveImportURLs(stylesheet, baseURI, options, workStyleElement);
						if (importFound) {
							stylesheet = cssTree.parse(cssTree.generate(stylesheet), { context: "stylesheet", parseCustomProperty: true });
						}
					}
				}
				if (stylesheet && stylesheet.children) {
					if (options.compressCSS) {
						ProcessorHelper.removeSingleLineCssComments(stylesheet);
					}
					stylesheetInfo.stylesheet = stylesheet;
				} else {
					stylesheets.delete(element);
				}
			}
		}

		async resolveFrameURLs() {
			if (!this.options.saveRawPage) {
				const frameElements = Array.from(this.doc.querySelectorAll("iframe, frame, object[type=\"text/html\"][data]"));
				await Promise.all(frameElements.map(async frameElement => {
					if (frameElement.tagName == "OBJECT") {
						frameElement.setAttribute("data", "data:text/html,");
					} else {
						const src = frameElement.getAttribute("src");
						if (this.options.saveOriginalURLs && src && !isDataURL(src)) {
							frameElement.setAttribute("data-sf-original-src", src);
						}
						frameElement.removeAttribute("src");
						frameElement.removeAttribute("srcdoc");
					}
					Array.from(frameElement.childNodes).forEach(node => node.remove());
					const frameWindowId = frameElement.getAttribute(util.WIN_ID_ATTRIBUTE_NAME);
					if (this.options.frames && frameWindowId) {
						const frameData = this.options.frames.find(frame => frame.windowId == frameWindowId);
						if (frameData) {
							await initializeProcessor(frameData, frameElement, frameWindowId, this.batchRequest, Object.create(this.options));
						}
					}
				}));
			}

			async function initializeProcessor(frameData, frameElement, frameWindowId, batchRequest, options) {
				options.insertSingleFileComment = false;
				options.insertCanonicalLink = false;
				options.insertMetaNoIndex = false;
				options.saveFavicon = false;
				options.url = frameData.baseURI;
				options.windowId = frameWindowId;
				if (frameData.content) {
					options.content = frameData.content;
					options.canvases = frameData.canvases;
					options.fonts = frameData.fonts;
					options.stylesheets = frameData.stylesheets;
					options.images = frameData.images;
					options.posters = frameData.posters;
					options.videos = frameData.videos;
					options.usedFonts = frameData.usedFonts;
					options.shadowRoots = frameData.shadowRoots;
					frameData.runner = new Runner(options);
					frameData.frameElement = frameElement;
					await frameData.runner.loadPage();
					await frameData.runner.initialize();
					frameData.maxResources = batchRequest.getMaxResources();
				}
			}
		}

		insertShadowRootContents() {
			const doc = this.doc;
			const options = this.options;
			if (options.shadowRoots && options.shadowRoots.length) {
				processElement(this.doc);
				if (options.blockScripts) {
					this.doc.querySelectorAll("script[" + SCRIPT_TEMPLATE_SHADOW_ROOT + "]").forEach(element => element.remove());
				}
				const scriptElement = doc.createElement("script");
				scriptElement.setAttribute(SCRIPT_TEMPLATE_SHADOW_ROOT, "");
				scriptElement.textContent = `(()=>{document.currentScript.remove();processNode(document);function processNode(node){node.querySelectorAll("template[${SHADOWROOT_ATTRIBUTE_NAME}]").forEach(element=>{let shadowRoot = element.parentElement.shadowRoot;if (!shadowRoot) {try {shadowRoot=element.parentElement.attachShadow({mode:element.getAttribute("${SHADOWROOT_ATTRIBUTE_NAME}")});shadowRoot.innerHTML=element.innerHTML;element.remove()} catch (error) {} if (shadowRoot) {processNode(shadowRoot)}}})}})()`;
				doc.body.appendChild(scriptElement);
			}

			function processElement(element) {
				const shadowRootElements = Array.from((element.querySelectorAll("[" + util.SHADOW_ROOT_ATTRIBUTE_NAME + "]")));
				shadowRootElements.forEach(element => {
					const attributeValue = element.getAttribute(util.SHADOW_ROOT_ATTRIBUTE_NAME);
					if (attributeValue) {
						const shadowRootData = options.shadowRoots[Number(attributeValue)];
						if (shadowRootData) {
							const templateElement = doc.createElement("template");
							templateElement.setAttribute(SHADOWROOT_ATTRIBUTE_NAME, shadowRootData.mode);
							if (shadowRootData.adoptedStyleSheets) {
								shadowRootData.adoptedStyleSheets.forEach(stylesheetContent => {
									const styleElement = doc.createElement("style");
									styleElement.textContent = stylesheetContent;
									templateElement.appendChild(styleElement);
								});
							}
							const shadowDoc = util.parseDocContent(shadowRootData.content);
							if (shadowDoc.head) {
								const metaCharset = shadowDoc.head.querySelector("meta[charset]");
								if (metaCharset) {
									metaCharset.remove();
								}
								shadowDoc.head.childNodes.forEach(node => templateElement.appendChild(shadowDoc.importNode(node, true)));
							}
							if (shadowDoc.body) {
								shadowDoc.body.childNodes.forEach(node => templateElement.appendChild(shadowDoc.importNode(node, true)));
							}
							processElement(templateElement);
							if (element.firstChild) {
								element.insertBefore(templateElement, element.firstChild);
							} else {
								element.appendChild(templateElement);
							}
						}
					}
				});
			}
		}

		removeUnusedStyles() {
			if (!this.mediaAllInfo) {
				this.mediaAllInfo = util.getMediaAllInfo(this.doc, this.stylesheets, this.styles);
			}
			const stats = util.minifyCSSRules(this.stylesheets, this.styles, this.mediaAllInfo);
			this.stats.set("processed", "CSS rules", stats.processed);
			this.stats.set("discarded", "CSS rules", stats.discarded);
		}

		removeUnusedFonts() {
			util.removeUnusedFonts(this.doc, this.stylesheets, this.styles, this.options);
		}

		removeAlternativeMedias() {
			const stats = util.minifyMedias(this.stylesheets);
			this.stats.set("processed", "medias", stats.processed);
			this.stats.set("discarded", "medias", stats.discarded);
		}

		async processStylesheets() {
			this.options.fontDeclarations = new Map$1();
			await Promise.all([...this.stylesheets].map(([, stylesheetInfo]) =>
				ProcessorHelper.processStylesheet(stylesheetInfo.stylesheet.children, this.baseURI, this.options, this.cssVariables, this.batchRequest)
			));
		}

		async processStyleAttributes() {
			return Promise.all([...this.styles].map(([, stylesheet]) =>
				ProcessorHelper.processStyle(stylesheet, this.baseURI, this.options, this.cssVariables, this.batchRequest)
			));
		}

		async processPageResources() {
			const processAttributeArgs = [
				["link[href][rel*=\"icon\"]", "href", false, true],
				["object[type=\"image/svg+xml\"], object[type=\"image/svg-xml\"], object[data*=\".svg\"], object[data*=\".pdf\"]", "data"],
				["img[src], input[src][type=image]", "src", true],
				["embed[src*=\".svg\"], embed[src*=\".pdf\"]", "src"],
				["video[poster]", "poster"],
				["*[background]", "background"],
				["image", "xlink:href"],
				["image", "href"]
			];
			if (this.options.blockImages) {
				this.doc.querySelectorAll("svg").forEach(element => element.remove());
			}
			let resourcePromises = processAttributeArgs.map(([selector, attributeName, processDuplicates, removeElementIfMissing]) =>
				ProcessorHelper.processAttribute(this.doc.querySelectorAll(selector), attributeName, this.baseURI, this.options, "image", this.cssVariables, this.styles, this.batchRequest, processDuplicates, removeElementIfMissing)
			);
			resourcePromises = resourcePromises.concat([
				ProcessorHelper.processXLinks(this.doc.querySelectorAll("use"), this.doc, this.baseURI, this.options, this.batchRequest),
				ProcessorHelper.processSrcset(this.doc.querySelectorAll("img[srcset], source[srcset]"), this.baseURI, this.options, this.batchRequest)
			]);
			resourcePromises.push(ProcessorHelper.processAttribute(this.doc.querySelectorAll("audio[src], audio > source[src]"), "src", this.baseURI, this.options, "audio", this.cssVariables, this.styles, this.batchRequest));
			resourcePromises.push(ProcessorHelper.processAttribute(this.doc.querySelectorAll("video[src], video > source[src]"), "src", this.baseURI, this.options, "video", this.cssVariables, this.styles, this.batchRequest));
			await Promise.all(resourcePromises);
			if (this.options.saveFavicon) {
				ProcessorHelper.processShortcutIcons(this.doc);
			}
		}

		async processScripts() {
			await Promise.all(Array.from(this.doc.querySelectorAll("script[src]")).map(async element => {
				let resourceURL;
				let scriptSrc;
				scriptSrc = element.getAttribute("src");
				if (this.options.saveOriginalURLs && !isDataURL(scriptSrc)) {
					element.setAttribute("data-sf-original-src", scriptSrc);
				}
				element.removeAttribute("integrity");
				if (!this.options.blockScripts) {
					element.textContent = "";
					try {
						resourceURL = util.resolveURL(scriptSrc, this.baseURI);
					} catch (error) {
						// ignored
					}
					if (testValidURL(resourceURL)) {
						element.removeAttribute("src");
						const content = await util.getContent(resourceURL, {
							asBinary: true,
							charset: this.charset != UTF8_CHARSET && this.charset,
							maxResourceSize: this.options.maxResourceSize,
							maxResourceSizeEnabled: this.options.maxResourceSizeEnabled,
							frameId: this.options.windowId,
							resourceReferrer: this.options.resourceReferrer,
							baseURI: this.options.baseURI,
							blockMixedContent: this.options.blockMixedContent,
							expectedType: "script",
							acceptHeaders: this.options.acceptHeaders,
							networkTimeout: this.options.networkTimeout
						});
						content.data = getUpdatedResourceContent(resourceURL, content, this.options);
						element.setAttribute("src", content.data);
						if (element.getAttribute("async") == "async" || element.getAttribute(util.ASYNC_SCRIPT_ATTRIBUTE_NAME) == "") {
							element.setAttribute("async", "");
						}
					}
				} else {
					element.removeAttribute("src");
				}
				this.stats.add("processed", "scripts", 1);
			}));
		}

		removeAlternativeImages() {
			util.removeAlternativeImages(this.doc);
		}

		async removeAlternativeFonts() {
			await util.removeAlternativeFonts(this.doc, this.stylesheets, this.options.fontDeclarations, this.options.fontTests);
		}

		async processFrames() {
			if (this.options.frames) {
				const frameElements = Array.from(this.doc.querySelectorAll("iframe, frame, object[type=\"text/html\"][data]"));
				await Promise.all(frameElements.map(async frameElement => {
					const frameWindowId = frameElement.getAttribute(util.WIN_ID_ATTRIBUTE_NAME);
					if (frameWindowId) {
						const frameData = this.options.frames.find(frame => frame.windowId == frameWindowId);
						if (frameData) {
							this.options.frames = this.options.frames.filter(frame => frame.windowId != frameWindowId);
							if (frameData.runner && frameElement.getAttribute(util.HIDDEN_FRAME_ATTRIBUTE_NAME) != "") {
								this.stats.add("processed", "frames", 1);
								await frameData.runner.run();
								const pageData = await frameData.runner.getPageData();
								frameElement.removeAttribute(util.WIN_ID_ATTRIBUTE_NAME);
								let sandbox = "allow-popups allow-top-navigation allow-top-navigation-by-user-activation";
								if (pageData.content.match(NOSCRIPT_TAG_FOUND) || pageData.content.match(CANVAS_TAG_FOUND) || pageData.content.match(SCRIPT_TAG_FOUND)) {
									sandbox += " allow-scripts allow-same-origin";
								}
								frameElement.setAttribute("sandbox", sandbox);
								if (frameElement.tagName == "OBJECT") {
									frameElement.setAttribute("data", "data:text/html," + pageData.content);
								} else {
									if (frameElement.tagName == "FRAME") {
										frameElement.setAttribute("src", "data:text/html," + pageData.content.replace(/%/g, "%25").replace(/#/g, "%23"));
									} else {
										frameElement.setAttribute("srcdoc", pageData.content);
										frameElement.removeAttribute("src");
									}
								}
								this.stats.addAll(pageData);
							} else {
								frameElement.removeAttribute(util.WIN_ID_ATTRIBUTE_NAME);
								this.stats.add("discarded", "frames", 1);
							}
						}
					}
				}));
			}
		}

		replaceStylesheets() {
			this.doc.querySelectorAll("style").forEach(styleElement => {
				const stylesheetInfo = this.stylesheets.get(styleElement);
				if (stylesheetInfo) {
					this.stylesheets.delete(styleElement);
					styleElement.textContent = generateStylesheetContent(stylesheetInfo.stylesheet, this.options);
					if (stylesheetInfo.mediaText) {
						styleElement.media = stylesheetInfo.mediaText;
					}
				} else {
					styleElement.remove();
				}
			});
			this.doc.querySelectorAll("link[rel*=stylesheet]").forEach(linkElement => {
				const stylesheetInfo = this.stylesheets.get(linkElement);
				if (stylesheetInfo) {
					this.stylesheets.delete(linkElement);
					const styleElement = this.doc.createElement("style");
					if (stylesheetInfo.mediaText) {
						styleElement.media = stylesheetInfo.mediaText;
					}
					styleElement.textContent = generateStylesheetContent(stylesheetInfo.stylesheet, this.options);
					linkElement.parentElement.replaceChild(styleElement, linkElement);
				} else {
					linkElement.remove();
				}
			});
		}

		replaceStyleAttributes() {
			this.doc.querySelectorAll("[style]").forEach(element => {
				const declarationList = this.styles.get(element);
				if (declarationList) {
					this.styles.delete(element);
					element.setAttribute("style", generateStylesheetContent(declarationList, this.options));
				} else {
					element.setAttribute("style", "");
				}
			});
		}

		insertVariables() {
			if (this.cssVariables.size) {
				const styleElement = this.doc.createElement("style");
				const firstStyleElement = this.doc.head.querySelector("style");
				if (firstStyleElement) {
					this.doc.head.insertBefore(styleElement, firstStyleElement);
				} else {
					this.doc.head.appendChild(styleElement);
				}
				let stylesheetContent = "";
				this.cssVariables.forEach(({ content, url }, indexResource) => {
					this.cssVariables.delete(indexResource);
					if (stylesheetContent) {
						stylesheetContent += ";";
					}
					stylesheetContent += `${SINGLE_FILE_VARIABLE_NAME_PREFIX + indexResource}: `;
					if (this.options.saveOriginalURLs) {
						stylesheetContent += `/* original URL: ${url} */ `;
					}
					stylesheetContent += `url("${content}")`;
				});
				styleElement.textContent = ":root{" + stylesheetContent + "}";
			}
		}

		compressHTML() {
			let size;
			if (this.options.displayStats) {
				size = util.getContentSize(this.doc.documentElement.outerHTML);
			}
			util.minifyHTML(this.doc, { PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME: util.PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME });
			if (this.options.displayStats) {
				this.stats.add("discarded", "HTML bytes", size - util.getContentSize(this.doc.documentElement.outerHTML));
			}
		}

		cleanupPage() {
			this.doc.querySelectorAll("base").forEach(element => element.remove());
			const metaCharset = this.doc.head.querySelector("meta[charset]");
			if (metaCharset) {
				this.doc.head.insertBefore(metaCharset, this.doc.head.firstChild);
				if (this.doc.head.querySelectorAll("*").length == 1 && this.doc.body.childNodes.length == 0) {
					this.doc.head.querySelector("meta[charset]").remove();
				}
			}
		}

		resetZoomLevel() {
			const transform = this.doc.documentElement.style.getPropertyValue("-sf-transform");
			const transformPriority = this.doc.documentElement.style.getPropertyPriority("-sf-transform");
			const transformOrigin = this.doc.documentElement.style.getPropertyValue("-sf-transform-origin");
			const transformOriginPriority = this.doc.documentElement.style.getPropertyPriority("-sf-transform-origin");
			const minHeight = this.doc.documentElement.style.getPropertyValue("-sf-min-height");
			const minHeightPriority = this.doc.documentElement.style.getPropertyPriority("-sf-min-height");
			this.doc.documentElement.style.setProperty("transform", transform, transformPriority);
			this.doc.documentElement.style.setProperty("transform-origin", transformOrigin, transformOriginPriority);
			this.doc.documentElement.style.setProperty("min-height", minHeight, minHeightPriority);
			this.doc.documentElement.style.removeProperty("-sf-transform");
			this.doc.documentElement.style.removeProperty("-sf-transform-origin");
			this.doc.documentElement.style.removeProperty("-sf-min-height");
		}

		async insertMAFFMetaData() {
			const maffMetaData = await this.maffMetaDataPromise;
			if (maffMetaData && maffMetaData.content) {
				const NAMESPACE_RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
				const maffDoc = util.parseXMLContent(maffMetaData.content);
				const originalURLElement = maffDoc.querySelector("RDF > Description > originalurl");
				const archiveTimeElement = maffDoc.querySelector("RDF > Description > archivetime");
				if (originalURLElement) {
					this.options.saveUrl = originalURLElement.getAttributeNS(NAMESPACE_RDF, "resource");
				}
				if (archiveTimeElement) {
					const value = archiveTimeElement.getAttributeNS(NAMESPACE_RDF, "resource");
					if (value) {
						const date = new Date(value);
						if (!isNaN(date.getTime())) {
							this.options.saveDate = new Date(value);
						}
					}
				}
			}
		}

		async setDocInfo() {
			const titleElement = this.doc.querySelector("title");
			const descriptionElement = this.doc.querySelector("meta[name=description]");
			const authorElement = this.doc.querySelector("meta[name=author]");
			const creatorElement = this.doc.querySelector("meta[name=creator]");
			const publisherElement = this.doc.querySelector("meta[name=publisher]");
			const headingElement = this.doc.querySelector("h1");
			this.options.title = titleElement ? titleElement.textContent.trim() : "";
			this.options.info = {
				description: descriptionElement && descriptionElement.content ? descriptionElement.content.trim() : "",
				lang: this.doc.documentElement.lang,
				author: authorElement && authorElement.content ? authorElement.content.trim() : "",
				creator: creatorElement && creatorElement.content ? creatorElement.content.trim() : "",
				publisher: publisherElement && publisherElement.content ? publisherElement.content.trim() : "",
				heading: headingElement && headingElement.textContent ? headingElement.textContent.trim() : ""
			};
			this.options.infobarContent = await ProcessorHelper.evalTemplate(this.options.infobarTemplate, this.options, null, true);
		}
	}

	// ---------------
	// ProcessorHelper
	// ---------------
	const DATA_URI_PREFIX = "data:";
	const ABOUT_BLANK_URI = "about:blank";
	const REGEXP_URL_HASH = /(#.+?)$/;
	const SINGLE_FILE_VARIABLE_NAME_PREFIX = "--sf-img-";
	const SINGLE_FILE_VARIABLE_MAX_SIZE = 512 * 1024;

	class ProcessorHelper {
		static async evalTemplate(template = "", options, content, dontReplaceSlash) {
			const url = util.parseURL(options.saveUrl);
			template = await evalTemplateVariable(template, "page-title", () => options.title || "No title", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "page-heading", () => options.info.heading || "No heading", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "page-language", () => options.info.lang || "No language", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "page-description", () => options.info.description || "No description", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "page-author", () => options.info.author || "No author", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "page-creator", () => options.info.creator || "No creator", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "page-publisher", () => options.info.publisher || "No publisher", dontReplaceSlash, options.filenameReplacementCharacter);
			await evalDate(options.saveDate);
			await evalDate(options.visitDate, "visit-");
			template = await evalTemplateVariable(template, "url-hash", () => url.hash.substring(1) || "No hash", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-host", () => url.host.replace(/\/$/, "") || "No host", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-hostname", () => url.hostname.replace(/\/$/, "") || "No hostname", dontReplaceSlash, options.filenameReplacementCharacter);
			const urlHref = decode(url.href);
			template = await evalTemplateVariable(template, "url-href", () => urlHref || "No href", dontReplaceSlash === undefined ? true : dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-href-digest-sha-1", urlHref ? async () => util.digest("SHA-1", urlHref) : "No href", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-href-flat", () => decode(url.href) || "No href", false, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-referrer", () => decode(options.referrer) || "No referrer", dontReplaceSlash === undefined ? true : dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-referrer-flat", () => decode(options.referrer) || "No referrer", false, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-password", () => url.password || "No password", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-pathname", () => decode(url.pathname).replace(/^\//, "").replace(/\/$/, "") || "No pathname", dontReplaceSlash === undefined ? true : dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-pathname-flat", () => decode(url.pathname) || "No pathname", false, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-port", () => url.port || "No port", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-protocol", () => url.protocol || "No protocol", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-search", () => url.search.substring(1) || "No search", dontReplaceSlash, options.filenameReplacementCharacter);
			const params = util.getSearchParams(url.search);
			for (const [name, value] of params) {
				template = await evalTemplateVariable(template, "url-search-" + name, () => value || "", dontReplaceSlash, options.filenameReplacementCharacter);
			}
			template = template.replace(/{\s*url-search-[^}\s]*\s*}/gi, "");
			template = await evalTemplateVariable(template, "url-username", () => url.username || "No username", dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "tab-id", () => String(options.tabId || "No tab id"), dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "tab-index", () => String(options.tabIndex || "No tab index"), dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "url-last-segment", () => decode(getLastSegment(url, options.filenameReplacementCharacter)) || "No last segment", dontReplaceSlash, options.filenameReplacementCharacter);
			if (content) {
				template = await evalTemplateVariable(template, "digest-sha-256", async () => util.digest("SHA-256", content), dontReplaceSlash, options.filenameReplacementCharacter);
				template = await evalTemplateVariable(template, "digest-sha-384", async () => util.digest("SHA-384", content), dontReplaceSlash, options.filenameReplacementCharacter);
				template = await evalTemplateVariable(template, "digest-sha-512", async () => util.digest("SHA-512", content), dontReplaceSlash, options.filenameReplacementCharacter);
			}
			const bookmarkFolder = (options.bookmarkFolders && options.bookmarkFolders.join("/")) || "";
			template = await evalTemplateVariable(template, "bookmark-pathname", () => bookmarkFolder, dontReplaceSlash === undefined ? true : dontReplaceSlash, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "bookmark-pathname-flat", () => bookmarkFolder, false, options.filenameReplacementCharacter);
			template = await evalTemplateVariable(template, "profile-name", () => options.profileName, dontReplaceSlash, options.filenameReplacementCharacter);
			return template.trim();

			function decode(value) {
				try {
					return decodeURI(value);
				} catch (error) {
					return value;
				}
			}

			async function evalDate(date, prefix = "") {
				if (date) {
					template = await evalTemplateVariable(template, prefix + "datetime-iso", () => date.toISOString(), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "date-iso", () => date.toISOString().split("T")[0], dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "time-iso", () => date.toISOString().split("T")[1].split("Z")[0], dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "date-locale", () => date.toLocaleDateString(), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "time-locale", () => date.toLocaleTimeString(), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "day-locale", () => String(date.getDate()).padStart(2, "0"), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "month-locale", () => String(date.getMonth() + 1).padStart(2, "0"), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "year-locale", () => String(date.getFullYear()), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "datetime-locale", () => date.toLocaleString(), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "datetime-utc", () => date.toUTCString(), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "day-utc", () => String(date.getUTCDate()).padStart(2, "0"), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "month-utc", () => String(date.getUTCMonth() + 1).padStart(2, "0"), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "year-utc", () => String(date.getUTCFullYear()), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "hours-locale", () => String(date.getHours()).padStart(2, "0"), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "minutes-locale", () => String(date.getMinutes()).padStart(2, "0"), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "seconds-locale", () => String(date.getSeconds()).padStart(2, "0"), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "hours-utc", () => String(date.getUTCHours()).padStart(2, "0"), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "minutes-utc", () => String(date.getUTCMinutes()).padStart(2, "0"), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "seconds-utc", () => String(date.getUTCSeconds()).padStart(2, "0"), dontReplaceSlash, options.filenameReplacementCharacter);
					template = await evalTemplateVariable(template, prefix + "time-ms", () => String(date.getTime()), dontReplaceSlash, options.filenameReplacementCharacter);
				}
			}
		}

		static setBackgroundImage(element, url, style) {
			element.style.setProperty("background-blend-mode", "normal", "important");
			element.style.setProperty("background-clip", "content-box", "important");
			element.style.setProperty("background-position", style && style["background-position"] ? style["background-position"] : "center", "important");
			element.style.setProperty("background-color", style && style["background-color"] ? style["background-color"] : "transparent", "important");
			element.style.setProperty("background-image", url, "important");
			element.style.setProperty("background-size", style && style["background-size"] ? style["background-size"] : "100% 100%", "important");
			element.style.setProperty("background-origin", "content-box", "important");
			element.style.setProperty("background-repeat", "no-repeat", "important");
		}

		static processShortcutIcons(doc) {
			let shortcutIcon = findShortcutIcon(Array.from(doc.querySelectorAll("link[href][rel=\"icon\"], link[href][rel=\"shortcut icon\"]")));
			if (!shortcutIcon) {
				shortcutIcon = findShortcutIcon(Array.from(doc.querySelectorAll("link[href][rel*=\"icon\"]")));
				if (shortcutIcon) {
					shortcutIcon.rel = "icon";
				}
			}
			if (shortcutIcon) {
				doc.querySelectorAll("link[href][rel*=\"icon\"]").forEach(linkElement => {
					if (linkElement != shortcutIcon) {
						linkElement.remove();
					}
				});
			}
		}

		static removeSingleLineCssComments(stylesheet) {
			const removedRules = [];
			for (let cssRule = stylesheet.children.head; cssRule; cssRule = cssRule.next) {
				const ruleData = cssRule.data;
				if (ruleData.type == "Raw" && ruleData.value && ruleData.value.trim().startsWith("//")) {
					removedRules.push(cssRule);
				}
			}
			removedRules.forEach(cssRule => stylesheet.children.remove(cssRule));
		}

		static async resolveImportURLs(stylesheet, baseURI, options, workStylesheet, importedStyleSheets = new Set$1()) {
			let importFound;
			ProcessorHelper.resolveStylesheetURLs(stylesheet, baseURI, workStylesheet);
			const imports = getImportFunctions(stylesheet);
			await Promise.all(imports.map(async node => {
				const urlNode = cssTree.find(node, node => node.type == "Url") || cssTree.find(node, node => node.type == "String");
				if (urlNode) {
					let resourceURL = normalizeURL(urlNode.value);
					if (!testIgnoredPath(resourceURL) && testValidPath(resourceURL)) {
						urlNode.value = util.EMPTY_RESOURCE;
						try {
							resourceURL = util.resolveURL(resourceURL, baseURI);
						} catch (error) {
							// ignored
						}
						if (testValidURL(resourceURL) && !importedStyleSheets.has(resourceURL)) {
							const content = await getStylesheetContent(resourceURL);
							resourceURL = content.resourceURL;
							content.data = getUpdatedResourceContent(resourceURL, content, options);
							if (content.data && content.data.match(/^<!doctype /i)) {
								content.data = "";
							}
							const mediaQueryListNode = cssTree.find(node, node => node.type == "MediaQueryList");
							if (mediaQueryListNode) {
								content.data = wrapMediaQuery(content.data, cssTree.generate(mediaQueryListNode));
							}
							const importedStylesheet = cssTree.parse(content.data, { context: "stylesheet", parseCustomProperty: true });
							const ancestorStyleSheets = new Set$1(importedStyleSheets);
							ancestorStyleSheets.add(resourceURL);
							await ProcessorHelper.resolveImportURLs(importedStylesheet, resourceURL, options, workStylesheet, ancestorStyleSheets);
							for (let keyName of Object.keys(importedStylesheet)) {
								node[keyName] = importedStylesheet[keyName];
							}
							importFound = true;
						}
					}
				}
			}));
			return importFound;

			async function getStylesheetContent(resourceURL) {
				const content = await util.getContent(resourceURL, {
					maxResourceSize: options.maxResourceSize,
					maxResourceSizeEnabled: options.maxResourceSizeEnabled,
					validateTextContentType: true,
					frameId: options.frameId,
					charset: options.charset,
					resourceReferrer: options.resourceReferrer,
					baseURI: options.baseURI,
					blockMixedContent: options.blockMixedContent,
					expectedType: "stylesheet",
					acceptHeaders: options.acceptHeaders,
					networkTimeout: options.networkTimeout
				});
				if (!(matchCharsetEquals(content.data, content.charset) || matchCharsetEquals(content.data, options.charset))) {
					options = Object.assign({}, options, { charset: getCharset(content.data) });
					return util.getContent(resourceURL, {
						maxResourceSize: options.maxResourceSize,
						maxResourceSizeEnabled: options.maxResourceSizeEnabled,
						validateTextContentType: true,
						frameId: options.frameId,
						charset: options.charset,
						resourceReferrer: options.resourceReferrer,
						baseURI: options.baseURI,
						blockMixedContent: options.blockMixedContent,
						expectedType: "stylesheet",
						acceptHeaders: options.acceptHeaders,
						networkTimeout: options.networkTimeout
					});
				} else {
					return content;
				}
			}
		}

		static resolveStylesheetURLs(stylesheet, baseURI, workStylesheet) {
			const urls = getUrlFunctions(stylesheet);
			urls.map(urlNode => {
				const originalResourceURL = urlNode.value;
				let resourceURL = normalizeURL(originalResourceURL);
				workStylesheet.textContent = "tmp { content:\"" + resourceURL + "\"}";
				if (workStylesheet.sheet && workStylesheet.sheet.cssRules) {
					resourceURL = util.removeQuotes(workStylesheet.sheet.cssRules[0].style.getPropertyValue("content"));
				}
				if (!testIgnoredPath(resourceURL)) {
					if (!resourceURL || testValidPath(resourceURL)) {
						let resolvedURL;
						if (!originalResourceURL.startsWith("#")) {
							try {
								resolvedURL = util.resolveURL(resourceURL, baseURI);
							} catch (error) {
								// ignored
							}
						}
						if (testValidURL(resolvedURL)) {
							urlNode.value = resolvedURL;
						}
					} else {
						urlNode.value = util.EMPTY_RESOURCE;
					}
				}
			});
		}

		static async resolveLinkStylesheetURLs(resourceURL, baseURI, options, workStylesheet) {
			resourceURL = normalizeURL(resourceURL);
			if (resourceURL && resourceURL != baseURI && resourceURL != ABOUT_BLANK_URI) {
				const content = await util.getContent(resourceURL, {
					maxResourceSize: options.maxResourceSize,
					maxResourceSizeEnabled: options.maxResourceSizeEnabled,
					charset: options.charset,
					frameId: options.frameId,
					resourceReferrer: options.resourceReferrer,
					validateTextContentType: true,
					baseURI: baseURI,
					blockMixedContent: options.blockMixedContent,
					expectedType: "stylesheet",
					acceptHeaders: options.acceptHeaders,
					networkTimeout: options.networkTimeout
				});
				if (!(matchCharsetEquals(content.data, content.charset) || matchCharsetEquals(content.data, options.charset))) {
					options = Object.assign({}, options, { charset: getCharset(content.data) });
					return ProcessorHelper.resolveLinkStylesheetURLs(resourceURL, baseURI, options, workStylesheet);
				}
				resourceURL = content.resourceURL;
				content.data = getUpdatedResourceContent(content.resourceURL, content, options);
				if (content.data && content.data.match(/^<!doctype /i)) {
					content.data = "";
				}
				let stylesheet = cssTree.parse(content.data, { context: "stylesheet", parseCustomProperty: true });
				const importFound = await ProcessorHelper.resolveImportURLs(stylesheet, resourceURL, options, workStylesheet);
				if (importFound) {
					stylesheet = cssTree.parse(cssTree.generate(stylesheet), { context: "stylesheet", parseCustomProperty: true });
				}
				return stylesheet;
			}
		}

		static async processStylesheet(cssRules, baseURI, options, cssVariables, batchRequest) {
			const promises = [];
			const removedRules = [];
			for (let cssRule = cssRules.head; cssRule; cssRule = cssRule.next) {
				const ruleData = cssRule.data;
				if (ruleData.type == "Atrule" && ruleData.name == "charset") {
					removedRules.push(cssRule);
				} else if (ruleData.block && ruleData.block.children) {
					if (ruleData.type == "Rule") {
						promises.push(this.processStyle(ruleData, baseURI, options, cssVariables, batchRequest));
					} else if (ruleData.type == "Atrule" && (ruleData.name == "media" || ruleData.name == "supports")) {
						promises.push(this.processStylesheet(ruleData.block.children, baseURI, options, cssVariables, batchRequest));
					} else if (ruleData.type == "Atrule" && ruleData.name == "font-face") {
						promises.push(processFontFaceRule(ruleData));
					}
				}
			}
			removedRules.forEach(cssRule => cssRules.remove(cssRule));
			await Promise.all(promises);

			async function processFontFaceRule(ruleData) {
				const urls = getUrlFunctions(ruleData);
				await Promise.all(urls.map(async urlNode => {
					const originalResourceURL = urlNode.value;
					if (!options.blockFonts) {
						const resourceURL = normalizeURL(originalResourceURL);
						if (!testIgnoredPath(resourceURL) && testValidURL(resourceURL)) {
							let { content } = await batchRequest.addURL(resourceURL,
								{ asBinary: true, expectedType: "font", baseURI, blockMixedContent: options.blockMixedContent });
							let resourceURLs = options.fontDeclarations.get(urlNode);
							if (!resourceURLs) {
								resourceURLs = [];
								options.fontDeclarations.set(urlNode, resourceURLs);
							}
							resourceURLs.push(resourceURL);
							if (!isDataURL(resourceURL) && options.saveOriginalURLs) {
								urlNode.value = "-sf-url-original(" + JSON$1.stringify(originalResourceURL) + ") " + content;
							} else {
								urlNode.value = content;
							}
						}
					} else {
						urlNode.value = util.EMPTY_RESOURCE;
					}
				}));
			}
		}

		static async processStyle(ruleData, baseURI, options, cssVariables, batchRequest) {
			const urls = getUrlFunctions(ruleData);
			await Promise.all(urls.map(async urlNode => {
				const originalResourceURL = urlNode.value;
				if (!options.blockImages) {
					const resourceURL = normalizeURL(originalResourceURL);
					if (!testIgnoredPath(resourceURL) && testValidURL(resourceURL)) {
						let { content, indexResource, duplicate } = await batchRequest.addURL(resourceURL,
							{ asBinary: true, expectedType: "image", groupDuplicates: options.groupDuplicateImages });
						if (!originalResourceURL.startsWith("#")) {
							const maxSizeDuplicateImages = options.maxSizeDuplicateImages || SINGLE_FILE_VARIABLE_MAX_SIZE;
							if (duplicate && options.groupDuplicateImages && util.getContentSize(content) < maxSizeDuplicateImages) {
								const varNode = cssTree.parse("var(" + SINGLE_FILE_VARIABLE_NAME_PREFIX + indexResource + ")", { context: "value" });
								for (let keyName of Object.keys(varNode.children.head.data)) {
									urlNode[keyName] = varNode.children.head.data[keyName];
								}
								cssVariables.set(indexResource, { content, url: originalResourceURL });
							} else {
								if (!isDataURL(resourceURL) && options.saveOriginalURLs) {
									urlNode.value = "-sf-url-original(" + JSON$1.stringify(originalResourceURL) + ") " + content;
								} else {
									urlNode.value = content;
								}
							}
						}
					}
				} else {
					urlNode.value = util.EMPTY_RESOURCE;
				}
			}));
		}

		static async processAttribute(resourceElements, attributeName, baseURI, options, expectedType, cssVariables, styles, batchRequest, processDuplicates, removeElementIfMissing) {
			await Promise.all(Array.from(resourceElements).map(async resourceElement => {
				let resourceURL = resourceElement.getAttribute(attributeName);
				if (resourceURL != null) {
					resourceURL = normalizeURL(resourceURL);
					let originURL = resourceElement.dataset.singleFileOriginURL;
					if (options.saveOriginalURLs && !isDataURL(resourceURL)) {
						resourceElement.setAttribute("data-sf-original-" + attributeName, resourceURL);
					}
					delete resourceElement.dataset.singleFileOriginURL;
					if (!options["block" + expectedType.charAt(0).toUpperCase() + expectedType.substring(1) + "s"]) {
						if (!testIgnoredPath(resourceURL)) {
							setAttributeEmpty(resourceElement, attributeName, expectedType);
							if (testValidPath(resourceURL)) {
								try {
									resourceURL = util.resolveURL(resourceURL, baseURI);
								} catch (error) {
									// ignored
								}
								if (testValidURL(resourceURL)) {
									let { content, indexResource, duplicate } = await batchRequest.addURL(resourceURL,
										{ asBinary: true, expectedType, groupDuplicates: options.groupDuplicateImages && resourceElement.tagName == "IMG" && attributeName == "src" });
									if (originURL) {
										if (content == util.EMPTY_RESOURCE) {
											try {
												originURL = util.resolveURL(originURL, baseURI);
											} catch (error) {
												// ignored
											}
											try {
												resourceURL = originURL;
												content = (await util.getContent(resourceURL, {
													asBinary: true,
													expectedType,
													maxResourceSize: options.maxResourceSize,
													maxResourceSizeEnabled: options.maxResourceSizeEnabled,
													frameId: options.windowId,
													resourceReferrer: options.resourceReferrer,
													acceptHeaders: options.acceptHeaders,
													networkTimeout: options.networkTimeout
												})).data;
											} catch (error) {
												// ignored
											}
										}
									}
									if (removeElementIfMissing && content == util.EMPTY_RESOURCE) {
										resourceElement.remove();
									} else if (content !== util.EMPTY_RESOURCE) {
										const forbiddenPrefixFound = PREFIXES_FORBIDDEN_DATA_URI.filter(prefixDataURI => content.startsWith(prefixDataURI)).length;
										if (!forbiddenPrefixFound) {
											const isSVG = content.startsWith(PREFIX_DATA_URI_IMAGE_SVG);
											const maxSizeDuplicateImages = options.maxSizeDuplicateImages || SINGLE_FILE_VARIABLE_MAX_SIZE;
											if (expectedType == "image" && processDuplicates && duplicate && !isSVG && util.getContentSize(content) < maxSizeDuplicateImages) {
												if (ProcessorHelper.replaceImageSource(resourceElement, SINGLE_FILE_VARIABLE_NAME_PREFIX + indexResource, options)) {
													cssVariables.set(indexResource, { content, url: originURL });
													const declarationList = cssTree.parse(resourceElement.getAttribute("style"), { context: "declarationList", parseCustomProperty: true });
													styles.set(resourceElement, declarationList);
												} else {
													resourceElement.setAttribute(attributeName, content);
												}
											} else {
												resourceElement.setAttribute(attributeName, content);
											}
										}
									}
								}
							}
						}
					} else {
						setAttributeEmpty(resourceElement, attributeName, expectedType);
					}
				}
			}));

			function setAttributeEmpty(resourceElement, attributeName, expectedType) {
				if (expectedType == "video" || expectedType == "audio") {
					resourceElement.removeAttribute(attributeName);
				} else {
					resourceElement.setAttribute(attributeName, util.EMPTY_RESOURCE);
				}
			}
		}

		static async processXLinks(resourceElements, doc, baseURI, options, batchRequest) {
			let attributeName = "xlink:href";
			await Promise.all(Array.from(resourceElements).map(async resourceElement => {
				let originalResourceURL = resourceElement.getAttribute(attributeName);
				if (originalResourceURL == null) {
					attributeName = "href";
					originalResourceURL = resourceElement.getAttribute(attributeName);
				}
				if (options.saveOriginalURLs && !isDataURL(originalResourceURL)) {
					resourceElement.setAttribute("data-sf-original-href", originalResourceURL);
				}
				let resourceURL = normalizeURL(originalResourceURL);
				if (!options.blockImages) {
					if (testValidPath(resourceURL) && !testIgnoredPath(resourceURL)) {
						resourceElement.setAttribute(attributeName, util.EMPTY_RESOURCE);
						try {
							resourceURL = util.resolveURL(resourceURL, baseURI);
						} catch (error) {
							// ignored
						}
						if (testValidURL(resourceURL)) {
							const hashMatch = originalResourceURL.match(REGEXP_URL_HASH);
							if (originalResourceURL.startsWith(baseURI + "#")) {
								resourceElement.setAttribute(attributeName, hashMatch[0]);
							} else {
								const response = await batchRequest.addURL(resourceURL, { expectedType: "image" });
								const svgDoc = util.parseSVGContent(response.content);
								if (hashMatch && hashMatch[0]) {
									let symbolElement;
									try {
										symbolElement = svgDoc.querySelector(hashMatch[0]);
									} catch (error) {
										// ignored
									}
									if (symbolElement) {
										resourceElement.setAttribute(attributeName, hashMatch[0]);
										resourceElement.parentElement.insertBefore(symbolElement, resourceElement.parentElement.firstChild);
									}
								} else {
									const content = await batchRequest.addURL(resourceURL, { expectedType: "image" });
									resourceElement.setAttribute(attributeName, PREFIX_DATA_URI_IMAGE_SVG + "," + content);
								}
							}
						}
					} else if (resourceURL == options.url) {
						resourceElement.setAttribute(attributeName, originalResourceURL.substring(resourceURL.length));
					}
				} else {
					resourceElement.setAttribute(attributeName, util.EMPTY_RESOURCE);
				}
			}));
		}

		static async processSrcset(resourceElements, baseURI, options, batchRequest) {
			await Promise.all(Array.from(resourceElements).map(async resourceElement => {
				const originSrcset = resourceElement.getAttribute("srcset");
				const srcset = util.parseSrcset(originSrcset);
				if (options.saveOriginalURLs && !isDataURL(originSrcset)) {
					resourceElement.setAttribute("data-sf-original-srcset", originSrcset);
				}
				if (!options.blockImages) {
					const srcsetValues = await Promise.all(srcset.map(async srcsetValue => {
						let resourceURL = normalizeURL(srcsetValue.url);
						if (!testIgnoredPath(resourceURL)) {
							if (testValidPath(resourceURL)) {
								try {
									resourceURL = util.resolveURL(resourceURL, baseURI);
								} catch (error) {
									// ignored
								}
								if (testValidURL(resourceURL)) {
									const { content } = await batchRequest.addURL(resourceURL, { asBinary: true, expectedType: "image" });
									const forbiddenPrefixFound = PREFIXES_FORBIDDEN_DATA_URI.filter(prefixDataURI => content.startsWith(prefixDataURI)).length;
									if (forbiddenPrefixFound) {
										return "";
									}
									return content + (srcsetValue.w ? " " + srcsetValue.w + "w" : srcsetValue.d ? " " + srcsetValue.d + "x" : "");
								} else {
									return "";
								}
							} else {
								return "";
							}
						} else {
							return resourceURL + (srcsetValue.w ? " " + srcsetValue.w + "w" : srcsetValue.d ? " " + srcsetValue.d + "x" : "");
						}
					}));
					resourceElement.setAttribute("srcset", srcsetValues.join(", "));
				} else {
					resourceElement.setAttribute("srcset", "");
				}
			}));
		}

		static replaceImageSource(imgElement, variableName, options) {
			const attributeValue = imgElement.getAttribute(util.IMAGE_ATTRIBUTE_NAME);
			if (attributeValue) {
				const imageData = options.images[Number(imgElement.getAttribute(util.IMAGE_ATTRIBUTE_NAME))];
				if (imageData && imageData.replaceable) {
					imgElement.setAttribute("src", `${PREFIX_DATA_URI_IMAGE_SVG},<svg xmlns="http://www.w3.org/2000/svg" width="${imageData.size.pxWidth}" height="${imageData.size.pxHeight}"><rect fill-opacity="0"/></svg>`);
					const backgroundStyle = {};
					const backgroundSize = (imageData.objectFit == "content" || imageData.objectFit == "cover") && imageData.objectFit;
					if (backgroundSize) {
						backgroundStyle["background-size"] = imageData.objectFit;
					}
					if (imageData.objectPosition) {
						backgroundStyle["background-position"] = imageData.objectPosition;
					}
					if (imageData.backgroundColor) {
						backgroundStyle["background-color"] = imageData.backgroundColor;
					}
					ProcessorHelper.setBackgroundImage(imgElement, "var(" + variableName + ")", backgroundStyle);
					imgElement.removeAttribute(util.IMAGE_ATTRIBUTE_NAME);
					return true;
				}
			}
		}
	}

	// ----
	// Util
	// ----
	const BLOB_URI_PREFIX = "blob:";
	const HTTP_URI_PREFIX = /^https?:\/\//;
	const FILE_URI_PREFIX = /^file:\/\//;
	const EMPTY_URL = /^https?:\/\/+\s*$/;
	const NOT_EMPTY_URL = /^(https?:\/\/|file:\/\/|blob:).+/;

	function getUpdatedResourceContent(resourceURL, content, options) {
		if (options.rootDocument && options.updatedResources[resourceURL]) {
			options.updatedResources[resourceURL].retrieved = true;
			return options.updatedResources[resourceURL].content;
		} else {
			return content.data || "";
		}
	}

	function normalizeURL(url) {
		if (!url || url.startsWith(DATA_URI_PREFIX)) {
			return url;
		} else {
			return url.split("#")[0];
		}
	}

	function matchCharsetEquals(stylesheetContent, charset = UTF8_CHARSET) {
		const stylesheetCharset = getCharset(stylesheetContent);
		if (stylesheetCharset) {
			return stylesheetCharset == charset.toLowerCase();
		} else {
			return true;
		}
	}

	function getCharset(stylesheetContent) {
		const match = stylesheetContent.match(/^@charset\s+"([^"]*)";/i);
		if (match && match[1]) {
			return match[1].toLowerCase().trim();
		}
	}

	function getOnEventAttributeNames(doc) {
		const element = doc.createElement("div");
		const attributeNames = [];
		for (const propertyName in element) {
			if (propertyName.startsWith("on")) {
				attributeNames.push(propertyName);
			}
		}
		attributeNames.push("onunload");
		return attributeNames;
	}

	async function evalTemplateVariable(template, variableName, valueGetter, dontReplaceSlash, replacementCharacter) {
		let maxLength, maxCharLength;
		if (template) {
			const regExpVariable = "{\\s*" + variableName.replace(/\W|_/g, "[$&]") + "\\s*}";
			let replaceRegExp = new RegExp(regExpVariable + "\\[\\d+(ch)?\\]", "g");
			if (template.match(replaceRegExp)) {
				const matchedLength = template.match(replaceRegExp)[0];
				if (matchedLength.match(/\[(\d+)\]$/)) {
					maxLength = Number(matchedLength.match(/\[(\d+)\]$/)[1]);
					if (isNaN(maxLength) || maxLength <= 0) {
						maxLength = null;
					}
				} else {
					maxCharLength = Number(matchedLength.match(/\[(\d+)ch\]$/)[1]);
					if (isNaN(maxCharLength) || maxCharLength <= 0) {
						maxCharLength = null;
					}
				}
			} else {
				replaceRegExp = new RegExp(regExpVariable, "g");
			}
			if (template.match(replaceRegExp)) {
				let value = await valueGetter();
				if (!dontReplaceSlash) {
					value = value.replace(/\/+/g, replacementCharacter);
				}
				if (maxLength) {
					value = await util.truncateText(value, maxLength);
				} else if (maxCharLength) {
					value = value.substring(0, maxCharLength);
				}
				return template.replace(replaceRegExp, value);
			}
		}
		return template;
	}

	function getLastSegment(url, replacementCharacter) {
		let lastSegmentMatch = url.pathname.match(/\/([^/]+)$/), lastSegment = lastSegmentMatch && lastSegmentMatch[0];
		if (!lastSegment) {
			lastSegmentMatch = url.href.match(/([^/]+)\/?$/);
			lastSegment = lastSegmentMatch && lastSegmentMatch[0];
		}
		if (!lastSegment) {
			lastSegmentMatch = lastSegment.match(/(.*)\.[^.]+$/);
			lastSegment = lastSegmentMatch && lastSegmentMatch[0];
		}
		if (!lastSegment) {
			lastSegment = url.hostname.replace(/\/+/g, replacementCharacter).replace(/\/$/, "");
		}
		lastSegmentMatch = lastSegment.match(/(.*)\.[^.]+$/);
		if (lastSegmentMatch && lastSegmentMatch[1]) {
			lastSegment = lastSegmentMatch[1];
		}
		lastSegment = lastSegment.replace(/\/$/, "").replace(/^\//, "");
		return lastSegment;
	}

	function getUrlFunctions(declarationList) {
		return cssTree.findAll(declarationList, node => node.type == "Url");
	}

	function getImportFunctions(declarationList) {
		return cssTree.findAll(declarationList, node => node.type == "Atrule" && node.name == "import");
	}

	function generateStylesheetContent(stylesheet, options) {
		let stylesheetContent = cssTree.generate(stylesheet);
		if (options.compressCSS) {
			stylesheetContent = util.compressCSS(stylesheetContent);
		}
		if (options.saveOriginalURLs) {
			stylesheetContent = replaceOriginalURLs(stylesheetContent);
		}
		return stylesheetContent;
	}

	function findShortcutIcon(shortcutIcons) {
		shortcutIcons = shortcutIcons.filter(linkElement => linkElement.href != util.EMPTY_RESOURCE);
		shortcutIcons.sort((linkElement1, linkElement2) => (parseInt(linkElement2.sizes, 10) || 16) - (parseInt(linkElement1.sizes, 10) || 16));
		return shortcutIcons[0];
	}

	function isDataURL(url) {
		return url && (url.startsWith(DATA_URI_PREFIX) || url.startsWith(BLOB_URI_PREFIX));
	}

	function replaceOriginalURLs(stylesheetContent) {
		return stylesheetContent.replace(/url\(-sf-url-original\\\(\\"(.*?)\\"\\\)\\ /g, "/* original URL: $1 */url(");
	}

	function testIgnoredPath(resourceURL) {
		return resourceURL && (resourceURL.startsWith(DATA_URI_PREFIX) || resourceURL == ABOUT_BLANK_URI);
	}

	function testValidPath(resourceURL) {
		return resourceURL && !resourceURL.match(EMPTY_URL);
	}

	function testValidURL(resourceURL) {
		return testValidPath(resourceURL) && (resourceURL.match(HTTP_URI_PREFIX) || resourceURL.match(FILE_URI_PREFIX) || resourceURL.startsWith(BLOB_URI_PREFIX)) && resourceURL.match(NOT_EMPTY_URL);
	}

	function wrapMediaQuery(stylesheetContent, mediaQuery) {
		if (mediaQuery) {
			return "@media " + mediaQuery + "{ " + stylesheetContent + " }";
		} else {
			return stylesheetContent;
		}
	}

	// -----
	// Stats
	// -----
	const STATS_DEFAULT_VALUES = {
		discarded: {
			"HTML bytes": 0,
			"hidden elements": 0,
			scripts: 0,
			objects: 0,
			"audio sources": 0,
			"video sources": 0,
			frames: 0,
			"CSS rules": 0,
			canvas: 0,
			stylesheets: 0,
			resources: 0,
			medias: 0
		},
		processed: {
			"HTML bytes": 0,
			"hidden elements": 0,
			scripts: 0,
			objects: 0,
			"audio sources": 0,
			"video sources": 0,
			frames: 0,
			"CSS rules": 0,
			canvas: 0,
			stylesheets: 0,
			resources: 0,
			medias: 0
		}
	};

	class Stats {
		constructor(options) {
			this.options = options;
			if (options.displayStats) {
				this.data = JSON$1.parse(JSON$1.stringify(STATS_DEFAULT_VALUES));
			}
		}
		set(type, subType, value) {
			if (this.options.displayStats) {
				this.data[type][subType] = value;
			}
		}
		add(type, subType, value) {
			if (this.options.displayStats) {
				this.data[type][subType] += value;
			}
		}
		addAll(pageData) {
			if (this.options.displayStats) {
				Object.keys(this.data.discarded).forEach(key => this.add("discarded", key, pageData.stats.discarded[key] || 0));
				Object.keys(this.data.processed).forEach(key => this.add("processed", key, pageData.stats.processed[key] || 0));
			}
		}
	}

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	const DEBUG = false;
	const ONE_MB = 1024 * 1024;
	const PREFIX_CONTENT_TYPE_TEXT = "text/";
	const DEFAULT_REPLACED_CHARACTERS = ["~", "+", "\\\\", "?", "%", "*", ":", "|", "\"", "<", ">", "\x00-\x1f", "\x7F"];
	const DEFAULT_REPLACEMENT_CHARACTER = "_";

	const URL = globalThis.URL;
	const DOMParser = globalThis.DOMParser;
	const Blob = globalThis.Blob;
	const FileReader = globalThis.FileReader;
	const fetch = (url, options) => globalThis.fetch(url, options);
	const crypto = globalThis.crypto;
	const TextDecoder = globalThis.TextDecoder;
	const TextEncoder = globalThis.TextEncoder;

	function getInstance(utilOptions) {
		utilOptions = utilOptions || {};
		utilOptions.fetch = utilOptions.fetch || fetch;
		utilOptions.frameFetch = utilOptions.frameFetch || utilOptions.fetch || fetch;
		return {
			getContent,
			parseURL(resourceURL, baseURI) {
				if (baseURI === undefined) {
					return new URL(resourceURL);
				} else {
					return new URL(resourceURL, baseURI);
				}
			},
			resolveURL(resourceURL, baseURI) {
				return this.parseURL(resourceURL, baseURI).href;
			},
			getSearchParams(searchParams) {
				return Array.from(new URLSearchParams(searchParams));
			},
			getValidFilename(filename, replacedCharacters = DEFAULT_REPLACED_CHARACTERS, replacementCharacter = DEFAULT_REPLACEMENT_CHARACTER) {
				replacedCharacters.forEach(replacedCharacter => filename = filename.replace(new RegExp("[" + replacedCharacter + "]+", "g"), replacementCharacter));
				filename = filename
					.replace(/\.\.\//g, "")
					.replace(/^\/+/, "")
					.replace(/\/+/g, "/")
					.replace(/\/$/, "")
					.replace(/\.$/, "")
					.replace(/\.\//g, "." + replacementCharacter)
					.replace(/\/\./g, "/" + replacementCharacter);
				return filename;
			},
			parseDocContent(content, baseURI) {
				const doc = (new DOMParser()).parseFromString(content, "text/html");
				if (!doc.head) {
					doc.documentElement.insertBefore(doc.createElement("HEAD"), doc.body);
				}
				let baseElement = doc.querySelector("base");
				if (!baseElement || !baseElement.getAttribute("href")) {
					if (baseElement) {
						baseElement.remove();
					}
					baseElement = doc.createElement("base");
					baseElement.setAttribute("href", baseURI);
					doc.head.insertBefore(baseElement, doc.head.firstChild);
				}
				return doc;
			},
			parseXMLContent(content) {
				return (new DOMParser()).parseFromString(content, "text/xml");
			},
			parseSVGContent(content) {
				const doc = (new DOMParser()).parseFromString(content, "image/svg+xml");
				if (doc.querySelector("parsererror")) {
					return (new DOMParser()).parseFromString(content, "text/html");
				} else {
					return doc;
				}
			},
			async digest(algo, text) {
				try {
					const hash = await crypto.subtle.digest(algo, new TextEncoder("utf-8").encode(text));
					return hex(hash);
				} catch (error) {
					return "";
				}
			},
			getContentSize(content) {
				return new Blob([content]).size;
			},
			truncateText(content, maxSize) {
				const blob = new Blob([content]);
				const reader = new FileReader();
				reader.readAsText(blob.slice(0, maxSize));
				return new Promise((resolve, reject) => {
					reader.addEventListener("load", () => {
						if (content.startsWith(reader.result)) {
							resolve(reader.result);
						} else {
							this.truncateText(content, maxSize - 1).then(resolve).catch(reject);
						}
					}, false);
					reader.addEventListener("error", reject, false);
				});
			},
			minifyHTML(doc, options) {
				return process$1(doc, options);
			},
			minifyCSSRules(stylesheets, styles, mediaAllInfo) {
				return process$3(stylesheets, styles, mediaAllInfo);
			},
			removeUnusedFonts(doc, stylesheets, styles, options) {
				return process$5(doc, stylesheets, styles, options);
			},
			removeAlternativeFonts(doc, stylesheets, fontDeclarations, fontTests) {
				return process$6(doc, stylesheets, fontDeclarations, fontTests);
			},
			getMediaAllInfo(doc, stylesheets, styles) {
				return getMediaAllInfo(doc, stylesheets, styles);
			},
			compressCSS(content, options) {
				return processString(content, options);
			},
			minifyMedias(stylesheets) {
				return process$4(stylesheets);
			},
			removeAlternativeImages(doc) {
				return process$2(doc);
			},
			parseSrcset(srcset) {
				return process$7(srcset);
			},
			preProcessDoc(doc, win, options) {
				return preProcessDoc(doc, win, options);
			},
			postProcessDoc(doc, markedElements, invalidElements) {
				postProcessDoc(doc, markedElements, invalidElements);
			},
			serialize(doc, compressHTML) {
				return process(doc, compressHTML);
			},
			removeQuotes(string) {
				return removeQuotes$1(string);
			},
			ON_BEFORE_CAPTURE_EVENT_NAME: ON_BEFORE_CAPTURE_EVENT_NAME,
			ON_AFTER_CAPTURE_EVENT_NAME: ON_AFTER_CAPTURE_EVENT_NAME,
			WIN_ID_ATTRIBUTE_NAME: WIN_ID_ATTRIBUTE_NAME,
			REMOVED_CONTENT_ATTRIBUTE_NAME: REMOVED_CONTENT_ATTRIBUTE_NAME,
			HIDDEN_CONTENT_ATTRIBUTE_NAME: HIDDEN_CONTENT_ATTRIBUTE_NAME,
			HIDDEN_FRAME_ATTRIBUTE_NAME: HIDDEN_FRAME_ATTRIBUTE_NAME,
			IMAGE_ATTRIBUTE_NAME: IMAGE_ATTRIBUTE_NAME,
			POSTER_ATTRIBUTE_NAME: POSTER_ATTRIBUTE_NAME,
			VIDEO_ATTRIBUTE_NAME: VIDEO_ATTRIBUTE_NAME,
			CANVAS_ATTRIBUTE_NAME: CANVAS_ATTRIBUTE_NAME,
			STYLE_ATTRIBUTE_NAME: STYLE_ATTRIBUTE_NAME,
			INPUT_VALUE_ATTRIBUTE_NAME: INPUT_VALUE_ATTRIBUTE_NAME,
			SHADOW_ROOT_ATTRIBUTE_NAME: SHADOW_ROOT_ATTRIBUTE_NAME,
			PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME: PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME,
			STYLESHEET_ATTRIBUTE_NAME: STYLESHEET_ATTRIBUTE_NAME,
			SELECTED_CONTENT_ATTRIBUTE_NAME: SELECTED_CONTENT_ATTRIBUTE_NAME,
			INVALID_ELEMENT_ATTRIBUTE_NAME: INVALID_ELEMENT_ATTRIBUTE_NAME,
			COMMENT_HEADER: COMMENT_HEADER,
			COMMENT_HEADER_LEGACY: COMMENT_HEADER_LEGACY,
			SINGLE_FILE_UI_ELEMENT_CLASS: SINGLE_FILE_UI_ELEMENT_CLASS,
			EMPTY_RESOURCE: EMPTY_RESOURCE$1
		};

		async function getContent(resourceURL, options) {
			let response, startTime, networkTimeoutId, networkTimeoutPromise, resolveNetworkTimeoutPromise;
			const fetchResource = utilOptions.fetch;
			const fetchFrameResource = utilOptions.frameFetch;
			if (options.blockMixedContent && /^https:/i.test(options.baseURI) && !/^https:/i.test(resourceURL)) {
				return getFetchResponse(resourceURL, options);
			}
			if (options.networkTimeout) {
				networkTimeoutPromise = new Promise((resolve, reject) => {
					resolveNetworkTimeoutPromise = resolve;
					networkTimeoutId = globalThis.setTimeout(() => reject(new Error("network timeout")), options.networkTimeout);
				});
			} else {
				networkTimeoutPromise = new Promise(resolve => {
					resolveNetworkTimeoutPromise = resolve;
				});
			}
			try {
				const accept = options.acceptHeaders ? options.acceptHeaders[options.expectedType] : "*/*";
				if (options.frameId) {
					try {
						response = await Promise.race([
							fetchFrameResource(resourceURL, { frameId: options.frameId, referrer: options.resourceReferrer, headers: { accept } }),
							networkTimeoutPromise
						]);
					} catch (error) {
						response = await Promise.race([
							fetchResource(resourceURL, { headers: { accept } }),
							networkTimeoutPromise
						]);
					}
				} else {
					response = await Promise.race([
						fetchResource(resourceURL, { referrer: options.resourceReferrer, headers: { accept } }),
						networkTimeoutPromise
					]);
				}
			} catch (error) {
				return getFetchResponse(resourceURL, options);
			} finally {
				resolveNetworkTimeoutPromise();
				if (options.networkTimeout) {
					globalThis.clearTimeout(networkTimeoutId);
				}
			}
			let buffer;
			try {
				buffer = await response.arrayBuffer();
			} catch (error) {
				return { data: options.asBinary ? EMPTY_RESOURCE$1 : "", resourceURL };
			}
			resourceURL = response.url || resourceURL;
			let contentType = "", charset;
			try {
				const mimeType = new MIMEType(response.headers.get("content-type"));
				contentType = mimeType.type + "/" + mimeType.subtype;
				charset = mimeType.parameters.get("charset");
			} catch (error) {
				// ignored
			}
			if (!contentType) {
				contentType = guessMIMEType(options.expectedType, buffer);
			}
			if (!charset && options.charset) {
				charset = options.charset;
			}
			if (options.asBinary) {
				if (response.status >= 400) {
					return getFetchResponse(resourceURL, options);
				}
				try {
					if (DEBUG) ;
					if (options.maxResourceSizeEnabled && buffer.byteLength > options.maxResourceSize * ONE_MB) {
						return getFetchResponse(resourceURL, options);
					} else {
						return getFetchResponse(resourceURL, options, buffer, null, contentType);
					}
				} catch (error) {
					return getFetchResponse(resourceURL, options);
				}
			} else {
				if (response.status >= 400 || (options.validateTextContentType && contentType && !contentType.startsWith(PREFIX_CONTENT_TYPE_TEXT))) {
					return getFetchResponse(resourceURL, options);
				}
				if (!charset) {
					charset = "utf-8";
				}
				if (options.maxResourceSizeEnabled && buffer.byteLength > options.maxResourceSize * ONE_MB) {
					return getFetchResponse(resourceURL, options, null, charset);
				} else {
					try {
						return getFetchResponse(resourceURL, options, buffer, charset, contentType);
					} catch (error) {
						return getFetchResponse(resourceURL, options, null, charset);
					}
				}
			}
		}
	}

	async function getFetchResponse(resourceURL, options, data, charset, contentType) {
		if (data) {
			if (options.asBinary) {
				const reader = new FileReader();
				reader.readAsDataURL(new Blob([data], { type: contentType + (options.charset ? ";charset=" + options.charset : "") }));
				data = await new Promise((resolve, reject) => {
					reader.addEventListener("load", () => resolve(reader.result), false);
					reader.addEventListener("error", reject, false);
				});
			} else {
				const firstBytes = new Uint8Array(data.slice(0, 4));
				if (firstBytes[0] == 132 && firstBytes[1] == 49 && firstBytes[2] == 149 && firstBytes[3] == 51) {
					charset = "gb18030";
				} else if (firstBytes[0] == 255 && firstBytes[1] == 254) {
					charset = "utf-16le";
				} else if (firstBytes[0] == 254 && firstBytes[1] == 255) {
					charset = "utf-16be";
				}
				try {
					data = new TextDecoder(charset).decode(data);
				} catch (error) {
					charset = "utf-8";
					data = new TextDecoder(charset).decode(data);
				}
			}
		} else {
			data = options.asBinary ? EMPTY_RESOURCE$1 : "";
		}
		return { data, resourceURL, charset };
	}

	function guessMIMEType(expectedType, buffer) {
		if (expectedType == "image") {
			if (compareBytes([255, 255, 255, 255], [0, 0, 1, 0])) {
				return "image/x-icon";
			}
			if (compareBytes([255, 255, 255, 255], [0, 0, 2, 0])) {
				return "image/x-icon";
			}
			if (compareBytes([255, 255], [78, 77])) {
				return "image/bmp";
			}
			if (compareBytes([255, 255, 255, 255, 255, 255], [71, 73, 70, 56, 57, 97])) {
				return "image/gif";
			}
			if (compareBytes([255, 255, 255, 255, 255, 255], [71, 73, 70, 56, 59, 97])) {
				return "image/gif";
			}
			if (compareBytes([255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255], [82, 73, 70, 70, 0, 0, 0, 0, 87, 69, 66, 80, 86, 80])) {
				return "image/webp";
			}
			if (compareBytes([255, 255, 255, 255, 255, 255, 255, 255], [137, 80, 78, 71, 13, 10, 26, 10])) {
				return "image/png";
			}
			if (compareBytes([255, 255, 255], [255, 216, 255])) {
				return "image/jpeg";
			}
		}
		if (expectedType == "font") {
			if (compareBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 80])) {
				return "application/vnd.ms-fontobject";
			}
			if (compareBytes([255, 255, 255, 255], [0, 1, 0, 0])) {
				return "font/ttf";
			}
			if (compareBytes([255, 255, 255, 255], [79, 84, 84, 79])) {
				return "font/otf";
			}
			if (compareBytes([255, 255, 255, 255], [116, 116, 99, 102])) {
				return "font/collection";
			}
			if (compareBytes([255, 255, 255, 255], [119, 79, 70, 70])) {
				return "font/woff";
			}
			if (compareBytes([255, 255, 255, 255], [119, 79, 70, 50])) {
				return "font/woff2";
			}
		}

		function compareBytes(mask, pattern) {
			let patternMatch = true, index = 0;
			if (buffer.byteLength >= pattern.length) {
				const value = new Uint8Array(buffer, 0, mask.length);
				for (index = 0; index < mask.length && patternMatch; index++) {
					patternMatch = patternMatch && ((value[index] & mask[index]) == pattern[index]);
				}
				return patternMatch;
			}
		}
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
	function hex(buffer) {
		const hexCodes = [];
		const view = new DataView(buffer);
		for (let i = 0; i < view.byteLength; i += 4) {
			const value = view.getUint32(i);
			const stringValue = value.toString(16);
			const padding = "00000000";
			const paddedValue = (padding + stringValue).slice(-padding.length);
			hexCodes.push(paddedValue);
		}
		return hexCodes.join("");
	}

	function log(...args) {
		console.log("S-File <browser>", ...args); // eslint-disable-line no-console
	}

	/*
	 * Copyright 2010-2022 Gildas Lormeau
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

	exports.SingleFile = void 0;

	function init(initOptions) {
		if (typeof exports.SingleFile == "undefined") {
			exports.SingleFile = getClass(getInstance(initOptions), cssTree$1);
		}
	}

	async function getPageData(options = {}, initOptions, doc = globalThis.document, win = globalThis) {
		const frames = contentFrameTree;
		let framesSessionId;
		init(initOptions);
		if (doc && win) {
			initDoc(doc);
			const preInitializationPromises = [];
			if (!options.saveRawPage) {
				if (!options.removeFrames && frames && globalThis.frames && globalThis.frames.length) {
					let frameTreePromise;
					if (options.loadDeferredImages) {
						frameTreePromise = new Promise(resolve => globalThis.setTimeout(() => resolve(frames.getAsync(options)), options.loadDeferredImagesMaxIdleTime - frames.TIMEOUT_INIT_REQUEST_MESSAGE));
					} else {
						frameTreePromise = frames.getAsync(options);
					}
					preInitializationPromises.push(frameTreePromise);
				}
				if (options.loadDeferredImages) {
					preInitializationPromises.push(process$8(options));
				}
			}
			[options.frames] = await Promise.all(preInitializationPromises);
			framesSessionId = options.frames && options.frames.sessionId;
		}
		options.doc = doc;
		options.win = win;
		options.insertCanonicalLink = true;
		options.onprogress = event => {
			if (event.type === event.RESOURCES_INITIALIZED && doc && win && options.loadDeferredImages) {
				resetZoomLevel(options);
			}
		};
		const processor = new exports.SingleFile(options);
		await processor.run();
		if (framesSessionId) {
			frames.cleanup(framesSessionId);
		}
		return await processor.getPageData();
	}

	exports.getPageData = getPageData;
	exports.helper = singleFileHelper;
	exports.init = init;
	exports.modules = index;
	exports.processors = index$2;
	exports.vendor = index$1;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
