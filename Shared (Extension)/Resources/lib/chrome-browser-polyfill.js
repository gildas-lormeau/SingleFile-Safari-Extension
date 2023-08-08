!function(){"use strict";"undefined"==typeof globalThis&&(window.globalThis=window),(()=>{const e={},r=globalThis.origin&&globalThis.origin.startsWith("safari-web-extension://");if((!globalThis.browser||r)&&globalThis.chrome){const r=globalThis.chrome;globalThis.__defineGetter__("browser",(()=>({browserAction:{onClicked:{addListener:e=>r.browserAction.onClicked.addListener(e)},setBadgeText:t=>new Promise(((o,n)=>{if(!e["browserAction.setBadgeText"]||!e["browserAction.setBadgeText"].callbackNotSupported)try{r.browserAction.setBadgeText(t,(()=>{r.runtime.lastError?n(r.runtime.lastError):o()}))}catch(r){e["browserAction.setBadgeText"]={callbackNotSupported:!0}}e["browserAction.setBadgeText"]&&e["browserAction.setBadgeText"].callbackNotSupported&&(r.browserAction.setBadgeText(t),r.runtime.lastError?n(r.runtime.lastError):o())})),setBadgeBackgroundColor:t=>new Promise(((o,n)=>{if(!e["browserAction.setBadgeBackgroundColor"]||!e["browserAction.setBadgeBackgroundColor"].callbackNotSupported)try{r.browserAction.setBadgeBackgroundColor(t,(()=>{r.runtime.lastError?n(r.runtime.lastError):o()}))}catch(r){e["browserAction.setBadgeBackgroundColor"]={callbackNotSupported:!0}}e["browserAction.setBadgeBackgroundColor"]&&e["browserAction.setBadgeBackgroundColor"].callbackNotSupported&&(r.browserAction.setBadgeBackgroundColor(t),r.runtime.lastError?n(r.runtime.lastError):o())})),setTitle:t=>new Promise(((o,n)=>{if(!e["browserAction.setTitle"]||!e["browserAction.setTitle"].callbackNotSupported)try{r.browserAction.setTitle(t,(()=>{r.runtime.lastError?n(r.runtime.lastError):o()}))}catch(r){e["browserAction.setTitle"]={callbackNotSupported:!0}}e["browserAction.setTitle"]&&e["browserAction.setTitle"].callbackNotSupported&&(r.browserAction.setTitle(t),r.runtime.lastError?n(r.runtime.lastError):o())})),setIcon:t=>new Promise(((o,n)=>{if(!e["browserAction.setIcon"]||!e["browserAction.setIcon"].callbackNotSupported)try{r.browserAction.setIcon(t,(()=>{r.runtime.lastError?n(r.runtime.lastError):o()}))}catch(r){e["browserAction.setIcon"]={callbackNotSupported:!0}}e["browserAction.setIcon"]&&e["browserAction.setIcon"].callbackNotSupported&&(r.browserAction.setIcon(t),r.runtime.lastError?n(r.runtime.lastError):o())}))},bookmarks:{get:e=>new Promise(((t,o)=>{r.bookmarks.get(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)}))})),onCreated:{addListener:e=>r.bookmarks.onCreated.addListener(e),removeListener:e=>r.bookmarks.onCreated.removeListener(e)},onChanged:{addListener:e=>r.bookmarks.onChanged.addListener(e),removeListener:e=>r.bookmarks.onChanged.removeListener(e)},onMoved:{addListener:e=>r.bookmarks.onMoved.addListener(e),removeListener:e=>r.bookmarks.onMoved.removeListener(e)},update:(e,t)=>new Promise(((o,n)=>{r.bookmarks.update(e,t,(e=>{r.runtime.lastError?n(r.runtime.lastError):o(e)}))}))},commands:{onCommand:{addListener:e=>r.commands.onCommand.addListener(e)}},downloads:{download:e=>new Promise(((t,o)=>{r.downloads.download(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)}))})),onChanged:{addListener:e=>r.downloads.onChanged.addListener(e),removeListener:e=>r.downloads.onChanged.removeListener(e)},search:e=>new Promise(((t,o)=>{r.downloads.search(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)}))}))},i18n:{getMessage:(e,t)=>r.i18n.getMessage(e,t)},identity:{getRedirectURL:()=>r.identity.getRedirectURL(),get getAuthToken(){return r.identity&&r.identity.getAuthToken&&(e=>new Promise(((t,o)=>r.identity.getAuthToken(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)})))))},get launchWebAuthFlow(){return r.identity&&r.identity.launchWebAuthFlow&&(e=>new Promise(((t,o)=>{r.identity.launchWebAuthFlow(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)}))})))},get removeCachedAuthToken(){return r.identity&&r.identity.removeCachedAuthToken&&(e=>new Promise(((t,o)=>r.identity.removeCachedAuthToken(e,(()=>{r.runtime.lastError?o(r.runtime.lastError):t()})))))}},menus:{onClicked:{addListener:e=>r.contextMenus.onClicked.addListener(e)},create:e=>new Promise(((t,o)=>{r.contextMenus.create(e,(()=>{r.runtime.lastError?o(r.runtime.lastError):t()}))})),update:(e,t)=>new Promise(((o,n)=>{r.contextMenus.update(e,t,(()=>{r.runtime.lastError?n(r.runtime.lastError):o()}))})),removeAll:()=>new Promise(((e,t)=>{r.contextMenus.removeAll((()=>{r.runtime.lastError?t(r.runtime.lastError):e()}))}))},permissions:{request:e=>new Promise(((t,o)=>{r.permissions.request(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)}))})),remove:e=>new Promise(((t,o)=>{r.permissions.remove(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)}))}))},runtime:{sendNativeMessage:(e,t)=>new Promise(((o,n)=>{r.runtime.sendNativeMessage(e,t,(e=>{r.runtime.lastError?n(r.runtime.lastError):o(e)}))})),getManifest:()=>r.runtime.getManifest(),onMessage:{addListener:e=>r.runtime.onMessage.addListener(((r,t,o)=>{const n=e(r,t);if(n&&"function"==typeof n.then)return n.then((e=>{if(void 0!==e)try{o(e)}catch(e){}})),!0})),removeListener:e=>r.runtime.onMessage.removeListener(e)},onMessageExternal:{addListener:e=>r.runtime.onMessageExternal.addListener(((r,t,o)=>{const n=e(r,t);if(n&&"function"==typeof n.then)return n.then((e=>{if(void 0!==e)try{o(e)}catch(e){}})),!0}))},sendMessage:e=>new Promise(((t,o)=>{r.runtime.sendMessage(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)})),r.runtime.lastError&&o(r.runtime.lastError)})),getURL:e=>r.runtime.getURL(e),get lastError(){return r.runtime.lastError}},storage:{local:{set:e=>new Promise(((t,o)=>{r.storage.local.set(e,(()=>{r.runtime.lastError?o(r.runtime.lastError):t()}))})),get:e=>new Promise(((t,o)=>{r.storage.local.get(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)}))})),clear:()=>new Promise(((e,t)=>{r.storage.local.clear((()=>{r.runtime.lastError?t(r.runtime.lastError):e()}))})),remove:e=>new Promise(((t,o)=>{r.storage.local.remove(e,(()=>{r.runtime.lastError?o(r.runtime.lastError):t()}))}))},sync:{set:e=>new Promise(((t,o)=>{r.storage.sync.set(e,(()=>{r.runtime.lastError?o(r.runtime.lastError):t()}))})),get:e=>new Promise(((t,o)=>{r.storage.sync.get(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)}))})),clear:()=>new Promise(((e,t)=>{r.storage.sync.clear((()=>{r.runtime.lastError?t(r.runtime.lastError):e()}))})),remove:e=>new Promise(((t,o)=>{r.storage.sync.remove(e,(()=>{r.runtime.lastError?o(r.runtime.lastError):t()}))}))}},tabs:{onCreated:{addListener:e=>r.tabs.onCreated.addListener(e)},onActivated:{addListener:e=>r.tabs.onActivated.addListener(e)},onUpdated:{addListener:e=>r.tabs.onUpdated.addListener(e),removeListener:e=>r.tabs.onUpdated.removeListener(e)},onRemoved:{addListener:e=>r.tabs.onRemoved.addListener(e),removeListener:e=>r.tabs.onRemoved.removeListener(e)},onReplaced:{addListener:e=>r.tabs.onReplaced.addListener(e),removeListener:e=>r.tabs.onReplaced.removeListener(e)},executeScript:(e,t)=>new Promise(((o,n)=>{r.tabs.executeScript(e,t,(()=>{r.runtime.lastError?n(r.runtime.lastError):o()}))})),sendMessage:(e,t,o={})=>new Promise(((n,s)=>{r.tabs.sendMessage(e,t,o,(e=>{r.runtime.lastError?s(r.runtime.lastError):n(e)})),r.runtime.lastError&&s(r.runtime.lastError)})),query:e=>new Promise(((t,o)=>{r.tabs.query(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)}))})),create:e=>new Promise(((t,o)=>{r.tabs.create(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)}))})),get:e=>new Promise(((t,o)=>{r.tabs.get(e,(e=>{r.runtime.lastError?o(r.runtime.lastError):t(e)}))})),remove:e=>new Promise(((t,o)=>{r.tabs.remove(e,(()=>{r.runtime.lastError?o(r.runtime.lastError):t()}))})),update:(e,t)=>new Promise(((o,n)=>{r.tabs.update(e,t,(e=>{r.runtime.lastError?n(r.runtime.lastError):o(e)}))}))},devtools:r.devtools&&{inspectedWindow:r.devtools.inspectedWindow&&{onResourceContentCommitted:r.devtools.inspectedWindow.onResourceContentCommitted&&{addListener:e=>r.devtools.inspectedWindow.onResourceContentCommitted.addListener(e)},get tabId(){return r.devtools.inspectedWindow.tabId}}},webRequest:{onBeforeSendHeaders:{addListener:(e,t,o)=>r.webRequest.onBeforeSendHeaders.addListener(e,t,o),removeListener:e=>r.webRequest.onBeforeSendHeaders.removeListener(e)}}})))}})()}();
