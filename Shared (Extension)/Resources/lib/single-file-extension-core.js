!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).extension={})}(this,(function(e){"use strict";let r,t;const a=["lib/web-stream.js","lib/chrome-browser-polyfill.js","lib/single-file.js"],n=["lib/chrome-browser-polyfill.js","lib/single-file-frames.js"],s="../../../";async function i(e,s){let i;if(await async function(e){const s=e.extensionScriptFiles||[];r||t||([r,t]=await Promise.all([o(a.concat(s)),o(n)]))}(s),!s.removeFrames)try{await browser.tabs.executeScript(e,{code:t,allFrames:!0,matchAboutBlank:!0,runAt:"document_start"})}catch(e){}try{await browser.tabs.executeScript(e,{code:r,allFrames:!1,runAt:"document_idle"}),i=!0}catch(e){}return i&&s.frameId&&await browser.tabs.executeScript(e,{code:"document.documentElement.dataset.requestedFrameId = true",frameId:s.frameId,matchAboutBlank:!0,runAt:"document_start"}),i}async function o(e){const r=e.map((async e=>{if("function"==typeof e)return"("+e.toString()+")();";{const r=await fetch(browser.runtime.getURL(s+e));return(new TextDecoder).decode(await r.arrayBuffer())}}));let t="";for(const e of r)t+=await e;return t}const c="single-file-request-fetch-supported",f="single-file-response-fetch-supported",d="single-file-request-fetch",u="single-file-response-fetch",l="Host fetch error (SingleFile)",h=Boolean(window.wrappedJSObject),w=(e,r)=>(r.cache="force-cache",r.referrerPolicy="strict-origin-when-cross-origin",window.fetch(e,r));let m,y=0,g=new Map;async function p(e,r={}){try{const t={cache:"force-cache",headers:r.headers,referrerPolicy:"strict-origin-when-cross-origin"};let a;try{a=r.referrer&&!h?await w(e,t):await async function(e,r){if(void 0===m&&(m=!1,document.addEventListener(f,(()=>m=!0),!1),document.dispatchEvent(new CustomEvent(c))),!m)return w(e,r);{const t=new Promise(((t,a)=>{document.dispatchEvent(new CustomEvent(d,{detail:JSON.stringify({url:e,options:r})})),document.addEventListener(u,(function r(n){n.detail?n.detail.url==e&&(document.removeEventListener(u,r,!1),n.detail.response?t({status:n.detail.status,headers:new Map(n.detail.headers),arrayBuffer:async()=>n.detail.response}):a(n.detail.error)):a()}),!1)}));try{return await t}catch(t){if(t&&t.message==l)return w(e,r);throw t}}}(e,t)}catch(r){if(!r||r.message!=l)throw r;a=await w(e,t)}return a}catch(t){y++;const a=new Promise(((e,r)=>g.set(y,{resolve:e,reject:r})));return await v({method:"singlefile.fetch",url:e,requestId:y,referrer:r.referrer,headers:r.headers}),a}}async function b(e,r){const t=await v({method:"singlefile.fetchFrame",url:e,frameId:r.frameId,referrer:r.referrer,headers:r.headers});return{status:t.status,headers:new Map(t.headers),arrayBuffer:async()=>new Uint8Array(t.array).buffer}}async function v(e){const r=await browser.runtime.sendMessage(e);if(!r||r.error)throw new Error(r&&r.error&&r.error.toString());return r}browser.runtime.onMessage.addListener((e=>"singlefile.fetchFrame"==e.method&&window.frameId&&window.frameId==e.frameId?async function(e){try{const r=await w(e.url,{cache:"force-cache",headers:e.headers,referrerPolicy:"strict-origin-when-cross-origin"});return{status:r.status,headers:[...r.headers],array:Array.from(new Uint8Array(await r.arrayBuffer()))}}catch(e){return{error:e&&e.toString()}}}(e):"singlefile.fetchResponse"==e.method?async function(e){const r=g.get(e.requestId);r&&(e.error?(r.reject(new Error(e.error)),g.delete(e.requestId)):(e.truncated&&(r.array?r.array=r.array.concat(e.array):(r.array=e.array,g.set(e.requestId,r)),e.finished&&(e.array=r.array)),e.truncated&&!e.finished||(r.resolve({status:e.status,headers:{get:r=>e.headers&&e.headers[r]},arrayBuffer:async()=>new Uint8Array(e.array).buffer}),g.delete(e.requestId))));return{}}(e):void 0)),e.getPageData=function(e,r,t,a={fetch:p,frameFetch:b}){return globalThis.singlefile.getPageData(e,a,r,t)},e.injectScript=function(e,r){return i(e,r)},Object.defineProperty(e,"__esModule",{value:!0})}));
