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

/* global browser, document */

const optionsTab = document.getElementById("tab-options");
const pendingsTab = document.getElementById("tab-pendings");
const batchSaveUrlsTab = document.getElementById("tab-batch-save-urls");
const viewPanel = document.getElementById("view-panel");

optionsTab.textContent = optionsTab.title = browser.i18n.getMessage("optionsTitle");
pendingsTab.textContent = pendingsTab.title = browser.i18n.getMessage("pendingsTitle");
batchSaveUrlsTab.textContent = batchSaveUrlsTab.title = browser.i18n.getMessage("batchSaveUrlsTitle");

optionsTab.onclick = () => {
	optionsTab.classList.add("tab-selected");
	pendingsTab.classList.remove("tab-selected");
	batchSaveUrlsTab.classList.remove("tab-selected");
	viewPanel.src = "options.html#side-panel";
};
pendingsTab.onclick = () => {
	optionsTab.classList.remove("tab-selected");
	pendingsTab.classList.add("tab-selected");
	batchSaveUrlsTab.classList.remove("tab-selected");
	viewPanel.src = "pendings.html#side-panel";
};
batchSaveUrlsTab.onclick = () => {
	optionsTab.classList.remove("tab-selected");
	pendingsTab.classList.remove("tab-selected");
	batchSaveUrlsTab.classList.add("tab-selected");
	viewPanel.src = "batch-save-urls.html#side-panel";
};