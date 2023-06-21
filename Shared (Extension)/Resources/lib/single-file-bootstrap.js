!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).singlefileBootstrap={})}(this,(function(e){"use strict";const t="single-file-load-deferred-images-start",s="single-file-load-deferred-images-end",o="single-file-load-deferred-images-keep-zoom-level-start",n="single-file-load-deferred-images-keep-zoom-level-end",a="single-file-block-cookies-start",i="single-file-block-cookies-end",r="single-file-dispatch-scroll-event-start",l="single-file-dispatch-scroll-event-end",d="single-file-block-storage-start",c="single-file-block-storage-end",m="single-file-load-image",u="single-file-image-loaded",g=(e,t,s)=>globalThis.addEventListener(e,t,s),p=e=>{try{globalThis.dispatchEvent(e)}catch(e){}},f=globalThis.CustomEvent,h=globalThis.document,T=globalThis.Document,E=globalThis.JSON;let b;b=window._singleFile_fontFaces?window._singleFile_fontFaces:window._singleFile_fontFaces=new Map,h instanceof T&&(g("single-file-new-font-face",(e=>{const t=e.detail,s=Object.assign({},t);delete s.src,b.set(E.stringify(s),t)})),g("single-file-delete-font",(e=>{const t=e.detail,s=Object.assign({},t);delete s.src,b.delete(E.stringify(s))})),g("single-file-clear-fonts",(()=>b=new Map)));const y="[\\x20\\t\\r\\n\\f]",w=new RegExp("\\\\([\\da-f]{1,6}"+y+"?|("+y+")|.)","ig");const I="single-file-on-before-capture",A="single-file-on-after-capture",v="data-single-file-removed-content",N="data-single-file-hidden-content",S="data-single-file-kept-content",R="data-single-file-hidden-frame",_="data-single-file-preserved-space-element",C="data-single-file-shadow-root-element",F="data-single-file-image",M="data-single-file-poster",P="data-single-file-video",x="data-single-file-canvas",L="data-single-file-movable-style",D="data-single-file-input-value",O="data-single-file-lazy-loaded-src",q="data-single-file-stylesheet",k="data-single-file-disabled-noscript",U="data-single-file-async-script",H="*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)",V=["NOSCRIPT","DISABLED-NOSCRIPT","META","LINK","STYLE","TITLE","TEMPLATE","SOURCE","OBJECT","SCRIPT","HEAD","BODY"],B=/^'(.*?)'$/,W=/^"(.*?)"$/,z={regular:"400",normal:"400",bold:"700",bolder:"700",lighter:"100"},j="single-file-ui-element",Y="data:,",G=(e,t,s)=>globalThis.addEventListener(e,t,s),Z=globalThis.JSON;function J(e,t,s){e.querySelectorAll("noscript:not(["+k+"])").forEach((e=>{e.setAttribute(k,e.textContent),e.textContent=""})),function(e){e.querySelectorAll("meta[http-equiv=refresh]").forEach((e=>{e.removeAttribute("http-equiv"),e.setAttribute("disabled-http-equiv","refresh")}))}(e),e.head&&e.head.querySelectorAll(H).forEach((e=>e.hidden=!0)),e.querySelectorAll("svg foreignObject").forEach((e=>{const t=e.querySelectorAll("html > head > "+H+", html > body > "+H);t.length&&(Array.from(e.childNodes).forEach((e=>e.remove())),t.forEach((t=>e.appendChild(t))))}));const o=new Map;let n;return t&&e.documentElement?(e.querySelectorAll("button button, a a").forEach((t=>{const s=e.createElement("template");s.setAttribute("data-single-file-invalid-element",""),s.content.appendChild(t.cloneNode(!0)),o.set(t,s),t.replaceWith(s)})),n=K(t,e,e.documentElement,s),s.moveStylesInHead&&e.querySelectorAll("body style, body ~ style").forEach((e=>{const s=ne(t,e);s&&ee(e,s)&&(e.setAttribute(L,""),n.markedElements.push(e))}))):n={canvases:[],images:[],posters:[],videos:[],usedFonts:[],shadowRoots:[],markedElements:[]},{canvases:n.canvases,fonts:Array.from(b.values()),stylesheets:se(e),images:n.images,posters:n.posters,videos:n.videos,usedFonts:Array.from(n.usedFonts.values()),shadowRoots:n.shadowRoots,referrer:e.referrer,markedElements:n.markedElements,invalidElements:o}}function K(e,t,s,o,n={usedFonts:new Map,canvases:[],images:[],posters:[],videos:[],shadowRoots:[],markedElements:[]},a){if(s.childNodes){Array.from(s.childNodes).filter((t=>t instanceof e.HTMLElement||t instanceof e.SVGElement)).forEach((s=>{let i,r,l;if(!o.autoSaveExternalSave&&(o.removeHiddenElements||o.removeUnusedFonts||o.compressHTML)&&(l=ne(e,s),s instanceof e.HTMLElement&&o.removeHiddenElements&&(r=(a||s.closest("html > head"))&&V.includes(s.tagName)||s.closest("details"),r||(i=a||ee(s,l),i&&(s.setAttribute(N,""),n.markedElements.push(s)))),!i)){if(o.compressHTML&&l){const e=l.getPropertyValue("white-space");e&&e.startsWith("pre")&&(s.setAttribute(_,""),n.markedElements.push(s))}o.removeUnusedFonts&&($(l,o,n.usedFonts),$(ne(e,s,":first-letter"),o,n.usedFonts),$(ne(e,s,":before"),o,n.usedFonts),$(ne(e,s,":after"),o,n.usedFonts))}!function(e,t,s,o,n,a,i){if("CANVAS"==s.tagName)try{n.canvases.push({dataURI:s.toDataURL("image/png","")}),s.setAttribute(x,n.canvases.length-1),n.markedElements.push(s)}catch(e){}if("IMG"==s.tagName){const t={currentSrc:a?Y:o.loadDeferredImages&&s.getAttribute(O)||s.currentSrc};if(n.images.push(t),s.setAttribute(F,n.images.length-1),n.markedElements.push(s),s.removeAttribute(O),i=i||ne(e,s)){t.size=function(e,t,s){let o=t.naturalWidth,n=t.naturalHeight;if(!o&&!n){const a=null==t.getAttribute("style");if(s=s||ne(e,t)){let e,i,r,l,d,c,m,u,g=!1;if("content-box"==s.getPropertyValue("box-sizing")){const e=t.style.getPropertyValue("box-sizing"),s=t.style.getPropertyPriority("box-sizing"),o=t.clientWidth;t.style.setProperty("box-sizing","border-box","important"),g=t.clientWidth!=o,e?t.style.setProperty("box-sizing",e,s):t.style.removeProperty("box-sizing")}e=oe("padding-left",s),i=oe("padding-right",s),r=oe("padding-top",s),l=oe("padding-bottom",s),g?(d=oe("border-left-width",s),c=oe("border-right-width",s),m=oe("border-top-width",s),u=oe("border-bottom-width",s)):d=c=m=u=0,o=Math.max(0,t.clientWidth-e-i-d-c),n=Math.max(0,t.clientHeight-r-l-m-u),a&&t.removeAttribute("style")}}return{pxWidth:o,pxHeight:n}}(e,s,i);const o=i.getPropertyValue("box-shadow"),n=i.getPropertyValue("background-image");o&&"none"!=o||n&&"none"!=n||!(t.size.pxWidth>1||t.size.pxHeight>1)||(t.replaceable=!0,t.backgroundColor=i.getPropertyValue("background-color"),t.objectFit=i.getPropertyValue("object-fit"),t.boxSizing=i.getPropertyValue("box-sizing"),t.objectPosition=i.getPropertyValue("object-position"))}}if("VIDEO"==s.tagName){const o=s.currentSrc;if(o&&!o.startsWith("blob:")&&!o.startsWith("data:")){const t=ne(e,s.parentNode);n.videos.push({positionParent:t&&t.getPropertyValue("position"),src:o,size:{pxWidth:s.clientWidth,pxHeight:s.clientHeight},currentTime:s.currentTime}),s.setAttribute(P,n.videos.length-1)}if(!s.getAttribute("poster")){const e=t.createElement("canvas"),o=e.getContext("2d");e.width=s.clientWidth,e.height=s.clientHeight;try{o.drawImage(s,0,0,e.width,e.height),n.posters.push(e.toDataURL("image/png","")),s.setAttribute(M,n.posters.length-1),n.markedElements.push(s)}catch(e){}}}"IFRAME"==s.tagName&&a&&o.removeHiddenElements&&(s.setAttribute(R,""),n.markedElements.push(s));"INPUT"==s.tagName&&("password"!=s.type&&(s.setAttribute(D,s.value),n.markedElements.push(s)),"radio"!=s.type&&"checkbox"!=s.type||(s.setAttribute(D,s.checked),n.markedElements.push(s)));"TEXTAREA"==s.tagName&&(s.setAttribute(D,s.value),n.markedElements.push(s));"SELECT"==s.tagName&&s.querySelectorAll("option").forEach((e=>{e.selected&&(e.setAttribute(D,""),n.markedElements.push(e))}));"SCRIPT"==s.tagName&&(s.async&&""!=s.getAttribute("async")&&"async"!=s.getAttribute("async")&&(s.setAttribute(U,""),n.markedElements.push(s)),s.textContent=s.textContent.replace(/<\/script>/gi,"<\\/script>"))}(e,t,s,o,n,i,l);const d=!(s instanceof e.SVGElement)&&X(s);if(d&&!s.classList.contains(j)){const a={};s.setAttribute(C,n.shadowRoots.length),n.markedElements.push(s),n.shadowRoots.push(a),K(e,t,d,o,n,i),a.content=d.innerHTML,a.mode=d.mode;try{d.adoptedStyleSheets&&d.adoptedStyleSheets.length&&(a.adoptedStyleSheets=Array.from(d.adoptedStyleSheets).map((e=>Array.from(e.cssRules).map((e=>e.cssText)).join("\n"))))}catch(e){}}K(e,t,s,o,n,i),!o.autoSaveExternalSave&&o.removeHiddenElements&&a&&(r||""==s.getAttribute(S)?s.parentElement&&(s.parentElement.setAttribute(S,""),n.markedElements.push(s.parentElement)):i&&(s.setAttribute(v,""),n.markedElements.push(s)))}))}return n}function $(e,t,s){if(e){const o=e.getPropertyValue("font-style")||"normal";e.getPropertyValue("font-family").split(",").forEach((n=>{if(n=Q(n),!t.loadedFonts||t.loadedFonts.find((e=>Q(e.family)==n&&e.style==o))){const t=(a=e.getPropertyValue("font-weight"),z[a.toLowerCase().trim()]||a),i=e.getPropertyValue("font-variant")||"normal",r=[n,t,o,i];s.set(Z.stringify(r),[n,t,o,i])}var a}))}}function X(e){const t=globalThis.chrome;if(e.openOrClosedShadowRoot)return e.openOrClosedShadowRoot;if(!(t&&t.dom&&t.dom.openOrClosedShadowRoot))return e.shadowRoot;try{return t.dom.openOrClosedShadowRoot(e)}catch(t){return e.shadowRoot}}function Q(e=""){return function(e){e=e.match(B)?e.replace(B,"$1"):e.replace(W,"$1");return e.trim()}((t=e.trim(),t.replace(w,((e,t,s)=>{const o="0x"+t-65536;return o!=o||s?t:o<0?String.fromCharCode(o+65536):String.fromCharCode(o>>10|55296,1023&o|56320)})))).toLowerCase();var t}function ee(e,t){let s=!1;if(t){const o=t.getPropertyValue("display"),n=t.getPropertyValue("opacity"),a=t.getPropertyValue("visibility");if(s="none"==o,!s&&("0"==n||"hidden"==a)&&e.getBoundingClientRect){const t=e.getBoundingClientRect();s=!t.width&&!t.height}}return Boolean(s)}function te(e,t,s){if(e.querySelectorAll("["+k+"]").forEach((e=>{e.textContent=e.getAttribute(k),e.removeAttribute(k)})),e.querySelectorAll("meta[disabled-http-equiv]").forEach((e=>{e.setAttribute("http-equiv",e.getAttribute("disabled-http-equiv")),e.removeAttribute("disabled-http-equiv")})),e.head&&e.head.querySelectorAll("*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)").forEach((e=>e.removeAttribute("hidden"))),!t){const s=[v,R,N,_,F,M,P,x,D,C,q,U];t=e.querySelectorAll(s.map((e=>"["+e+"]")).join(","))}t.forEach((e=>{e.removeAttribute(v),e.removeAttribute(N),e.removeAttribute(S),e.removeAttribute(R),e.removeAttribute(_),e.removeAttribute(F),e.removeAttribute(M),e.removeAttribute(P),e.removeAttribute(x),e.removeAttribute(D),e.removeAttribute(C),e.removeAttribute(q),e.removeAttribute(U),e.removeAttribute(L)})),s&&Array.from(s.entries()).forEach((([e,t])=>t.replaceWith(e)))}function se(e){if(e){const t=[];return e.querySelectorAll("style").forEach(((s,o)=>{try{const n=e.createElement("style");n.textContent=s.textContent,e.body.appendChild(n);const a=n.sheet;n.remove(),a&&a.cssRules.length==s.sheet.cssRules.length||(s.setAttribute(q,o),t[o]=Array.from(s.sheet.cssRules).map((e=>e.cssText)).join("\n"))}catch(e){}})),t}}function oe(e,t){if(t.getPropertyValue(e).endsWith("px"))return parseFloat(t.getPropertyValue(e))}function ne(e,t,s){try{return e.getComputedStyle(t,s)}catch(e){}}const ae={LAZY_SRC_ATTRIBUTE_NAME:O,SINGLE_FILE_UI_ELEMENT_CLASS:j},ie=10,re="attributes",le=globalThis.browser,de=globalThis.document,ce=globalThis.MutationObserver,me=(e,t,s)=>globalThis.addEventListener(e,t,s),ue=(e,t,s)=>globalThis.removeEventListener(e,t,s),ge=new Map;let pe;async function fe(e){if(de.documentElement){ge.clear();const s=de.body&&de.body.scrollHeight||de.documentElement.scrollHeight,n=de.body&&de.body.scrollWidth||de.documentElement.scrollWidth;if(s>globalThis.innerHeight||n>globalThis.innerWidth){const i=Math.max(s-1.5*globalThis.innerHeight,0),l=Math.max(n-1.5*globalThis.innerWidth,0);if(globalThis.scrollY<i||globalThis.scrollX<l)return function(e){return pe=0,new Promise((async s=>{let n;const i=new Set,l=new ce((async t=>{if((t=t.filter((e=>e.type==re))).length){t.filter((e=>{if("src"==e.attributeName&&(e.target.setAttribute(ae.LAZY_SRC_ATTRIBUTE_NAME,e.target.src),e.target.addEventListener("load",g)),"src"==e.attributeName||"srcset"==e.attributeName||"SOURCE"==e.target.tagName)return!e.target.classList||!e.target.classList.contains(ae.SINGLE_FILE_UI_ELEMENT_CLASS)})).length&&(n=!0,await Te(l,e,E),i.size||await he(l,e,E))}}));async function c(t){await be("idleTimeout",(async()=>{n?pe<ie&&(pe++,we("idleTimeout"),await c(Math.max(500,t/2))):(we("loadTimeout"),we("maxTimeout"),Ee(l,e,E))}),t,e.loadDeferredImagesNativeTimeout)}function g(e){const t=e.target;t.removeAttribute(ae.LAZY_SRC_ATTRIBUTE_NAME),t.removeEventListener("load",g)}async function h(t){n=!0,await Te(l,e,E),await he(l,e,E),t.detail&&i.add(t.detail)}async function T(t){await Te(l,e,E),await he(l,e,E),i.delete(t.detail),i.size||await he(l,e,E)}function E(e){l.disconnect(),ue(m,h),ue(u,T),s(e)}await c(2*e.loadDeferredImagesMaxIdleTime),await Te(l,e,E),l.observe(de,{subtree:!0,childList:!0,attributes:!0}),me(m,h),me(u,T),function(e){e.loadDeferredImagesBlockCookies&&p(new f(a)),e.loadDeferredImagesBlockStorage&&p(new f(d)),e.loadDeferredImagesDispatchScrollEvent&&p(new f(r)),e.loadDeferredImagesKeepZoomLevel?p(new f(o)):p(new f(t))}(e)}))}(e)}}}async function he(e,t,s){await be("loadTimeout",(()=>Ee(e,t,s)),t.loadDeferredImagesMaxIdleTime,t.loadDeferredImagesNativeTimeout)}async function Te(e,t,s){await be("maxTimeout",(async()=>{await we("loadTimeout"),await Ee(e,t,s)}),10*t.loadDeferredImagesMaxIdleTime,t.loadDeferredImagesNativeTimeout)}async function Ee(e,t,o){await we("idleTimeout"),function(e){e.loadDeferredImagesBlockCookies&&p(new f(i)),e.loadDeferredImagesBlockStorage&&p(new f(c)),e.loadDeferredImagesDispatchScrollEvent&&p(new f(l)),e.loadDeferredImagesKeepZoomLevel?p(new f(n)):p(new f(s))}(t),await be("endTimeout",(async()=>{await we("maxTimeout"),o()}),t.loadDeferredImagesMaxIdleTime/2,t.loadDeferredImagesNativeTimeout),e.disconnect()}async function be(e,t,s,o){if(le&&le.runtime&&le.runtime.sendMessage&&!o){if(!ge.get(e)||!ge.get(e).pending){const o={callback:t,pending:!0};ge.set(e,o);try{await le.runtime.sendMessage({method:"singlefile.lazyTimeout.setTimeout",type:e,delay:s})}catch(o){ye(e,t,s)}o.pending=!1}}else ye(e,t,s)}function ye(e,t,s){const o=ge.get(e);o&&globalThis.clearTimeout(o),ge.set(e,t),globalThis.setTimeout(t,s)}async function we(e){if(le&&le.runtime&&le.runtime.sendMessage)try{await le.runtime.sendMessage({method:"singlefile.lazyTimeout.clearTimeout",type:e})}catch(t){Ie(e)}else Ie(e)}function Ie(e){const t=ge.get(e);ge.delete(e),t&&globalThis.clearTimeout(t)}le&&le.runtime&&le.runtime.onMessage&&le.runtime.onMessage.addListener&&le.runtime.onMessage.addListener((e=>{if("singlefile.lazyTimeout.onTimeout"==e.method){const t=ge.get(e.type);if(t){ge.delete(e.type);try{t.callback()}catch(t){Ie(e.type)}}}}));const Ae={ON_BEFORE_CAPTURE_EVENT_NAME:I,ON_AFTER_CAPTURE_EVENT_NAME:A,WIN_ID_ATTRIBUTE_NAME:"data-single-file-win-id",preProcessDoc:J,serialize:function(e){const t=e.doctype;let s="";return t&&(s="<!DOCTYPE "+t.nodeName,t.publicId?(s+=' PUBLIC "'+t.publicId+'"',t.systemId&&(s+=' "'+t.systemId+'"')):t.systemId&&(s+=' SYSTEM "'+t.systemId+'"'),t.internalSubset&&(s+=" ["+t.internalSubset+"]"),s+="> "),s+e.documentElement.outerHTML},postProcessDoc:te,getShadowRoot:X},ve="__frameTree__::",Ne='iframe, frame, object[type="text/html"][data]',Se="*",Re="singlefile.frameTree.initRequest",_e="singlefile.frameTree.ackInitRequest",Ce="singlefile.frameTree.cleanupRequest",Fe="singlefile.frameTree.initResponse",Me="*",Pe=5e3,xe=".",Le=globalThis.window==globalThis.top,De=globalThis.browser,Oe=globalThis.top,qe=globalThis.MessageChannel,ke=globalThis.document,Ue=globalThis.JSON;let He,Ve=globalThis.sessions;var Be,We,ze;function je(){return globalThis.crypto.getRandomValues(new Uint32Array(32)).join("")}async function Ye(e){const t=e.sessionId,s=globalThis._singleFile_waitForUserScript;delete globalThis._singleFile_cleaningUp,Le||(He=globalThis.frameId=e.windowId),Je(ke,e.options,He,t),Le||(e.options.userScriptEnabled&&s&&await s(Ae.ON_BEFORE_CAPTURE_EVENT_NAME),Qe({frames:[tt(ke,globalThis,He,e.options)],sessionId:t,requestedFrameId:ke.documentElement.dataset.requestedFrameId&&He}),e.options.userScriptEnabled&&s&&await s(Ae.ON_AFTER_CAPTURE_EVENT_NAME),delete ke.documentElement.dataset.requestedFrameId)}function Ge(e){if(!globalThis._singleFile_cleaningUp){globalThis._singleFile_cleaningUp=!0;const t=e.sessionId;Xe(st(ke),e.windowId,t)}}function Ze(e){e.frames.forEach((t=>Ke("responseTimeouts",e.sessionId,t.windowId)));const t=Ve.get(e.sessionId);if(t){e.requestedFrameId&&(t.requestedFrameId=e.requestedFrameId),e.frames.forEach((e=>{let s=t.frames.find((t=>e.windowId==t.windowId));s||(s={windowId:e.windowId},t.frames.push(s)),s.processed||(s.content=e.content,s.baseURI=e.baseURI,s.title=e.title,s.canvases=e.canvases,s.fonts=e.fonts,s.stylesheets=e.stylesheets,s.images=e.images,s.posters=e.posters,s.videos=e.videos,s.usedFonts=e.usedFonts,s.shadowRoots=e.shadowRoots,s.processed=e.processed)}));t.frames.filter((e=>!e.processed)).length||(t.frames=t.frames.sort(((e,t)=>t.windowId.split(xe).length-e.windowId.split(xe).length)),t.resolve&&(t.requestedFrameId&&t.frames.forEach((e=>{e.windowId==t.requestedFrameId&&(e.requestedFrame=!0)})),t.resolve(t.frames)))}}function Je(e,t,s,o){const n=st(e);!function(e,t,s,o,n){const a=[];let i;Ve.get(n)?i=Ve.get(n).requestTimeouts:(i={},Ve.set(n,{requestTimeouts:i}));t.forEach(((e,t)=>{const s=o+xe+t;e.setAttribute(Ae.WIN_ID_ATTRIBUTE_NAME,s),a.push({windowId:s})})),Qe({frames:a,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),t.forEach(((e,t)=>{const a=o+xe+t;try{et(e.contentWindow,{method:Re,windowId:a,sessionId:n,options:s})}catch(e){}i[a]=globalThis.setTimeout((()=>Qe({frames:[{windowId:a,processed:!0}],sessionId:n})),Pe)})),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o),n.length&&function(e,t,s,o,n){const a=[];t.forEach(((e,t)=>{const i=o+xe+t;let r;try{r=e.contentDocument}catch(e){}if(r)try{const t=e.contentWindow;t.stop(),Ke("requestTimeouts",n,i),Je(r,s,i,n),a.push(tt(r,t,i,s))}catch(e){a.push({windowId:i,processed:!0})}})),Qe({frames:a,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o)}function Ke(e,t,s){const o=Ve.get(t);if(o&&o[e]){const t=o[e][s];t&&(globalThis.clearTimeout(t),delete o[e][s])}}function $e(e,t){const s=Ve.get(e);s&&s.responseTimeouts&&(s.responseTimeouts[t]=globalThis.setTimeout((()=>Qe({frames:[{windowId:t,processed:!0}],sessionId:e})),1e4))}function Xe(e,t,s){e.forEach(((e,o)=>{const n=t+xe+o;e.removeAttribute(Ae.WIN_ID_ATTRIBUTE_NAME);try{et(e.contentWindow,{method:Ce,windowId:n,sessionId:s})}catch(e){}})),e.forEach(((e,o)=>{const n=t+xe+o;let a;try{a=e.contentDocument}catch(e){}if(a)try{Xe(st(a),n,s)}catch(e){}}))}function Qe(e){e.method=Fe;try{Oe.singlefile.processors.frameTree.initResponse(e)}catch(t){et(Oe,e,!0)}}function et(e,t,s){if(e==Oe&&De&&De.runtime&&De.runtime.sendMessage)De.runtime.sendMessage(t);else if(s){const s=new qe;e.postMessage(ve+Ue.stringify({method:t.method,sessionId:t.sessionId}),Me,[s.port2]),s.port1.postMessage(t)}else e.postMessage(ve+Ue.stringify(t),Me)}function tt(e,t,s,o){const n=Ae.preProcessDoc(e,t,o),a=Ae.serialize(e);Ae.postProcessDoc(e,n.markedElements,n.invalidElements);return{windowId:s,content:a,baseURI:e.baseURI.split("#")[0],title:e.title,canvases:n.canvases,fonts:n.fonts,stylesheets:n.stylesheets,images:n.images,posters:n.posters,videos:n.videos,usedFonts:n.usedFonts,shadowRoots:n.shadowRoots,processed:!0}}function st(e){let t=Array.from(e.querySelectorAll(Ne));return e.querySelectorAll(Se).forEach((e=>{const s=Ae.getShadowRoot(e);s&&(t=t.concat(...s.querySelectorAll(Ne)))})),t}Ve||(Ve=globalThis.sessions=new Map),Le&&(He="0",De&&De.runtime&&De.runtime.onMessage&&De.runtime.onMessage.addListener&&De.runtime.onMessage.addListener((e=>e.method==Fe?(Ze(e),Promise.resolve({})):e.method==_e?(Ke("requestTimeouts",e.sessionId,e.windowId),$e(e.sessionId,e.windowId),Promise.resolve({})):void 0))),Be="message",We=async e=>{if("string"==typeof e.data&&e.data.startsWith(ve)){e.preventDefault(),e.stopPropagation();const t=Ue.parse(e.data.substring(ve.length));t.method==Re?(e.source&&et(e.source,{method:_e,windowId:t.windowId,sessionId:t.sessionId}),Le||(globalThis.stop(),t.options.loadDeferredImages&&fe(t.options),await Ye(t))):t.method==_e?(Ke("requestTimeouts",t.sessionId,t.windowId),$e(t.sessionId,t.windowId)):t.method==Ce?Ge(t):t.method==Fe&&Ve.get(t.sessionId)&&(e.ports[0].onmessage=e=>Ze(e.data))}},ze=!0,globalThis.addEventListener(Be,We,ze);var ot=Object.freeze({__proto__:null,getAsync:function(e){const t=je();return e=Ue.parse(Ue.stringify(e)),new Promise((s=>{Ve.set(t,{frames:[],requestTimeouts:{},responseTimeouts:{},resolve:e=>{e.sessionId=t,s(e)}}),Ye({windowId:He,sessionId:t,options:e})}))},getSync:function(e){const t=je();e=Ue.parse(Ue.stringify(e)),Ve.set(t,{frames:[],requestTimeouts:{},responseTimeouts:{}}),function(e){const t=e.sessionId,s=globalThis._singleFile_waitForUserScript;delete globalThis._singleFile_cleaningUp,Le||(He=globalThis.frameId=e.windowId);Je(ke,e.options,He,t),Le||(e.options.userScriptEnabled&&s&&s(Ae.ON_BEFORE_CAPTURE_EVENT_NAME),Qe({frames:[tt(ke,globalThis,He,e.options)],sessionId:t,requestedFrameId:ke.documentElement.dataset.requestedFrameId&&He}),e.options.userScriptEnabled&&s&&s(Ae.ON_AFTER_CAPTURE_EVENT_NAME),delete ke.documentElement.dataset.requestedFrameId)}({windowId:He,sessionId:t,options:e});const s=Ve.get(t).frames;return s.sessionId=t,s},cleanup:function(e){Ve.delete(e),Ge({windowId:He,sessionId:e,options:{sessionId:e}})},initResponse:Ze,TIMEOUT_INIT_REQUEST_MESSAGE:Pe});const nt=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],at=1,it=3,rt=8,lt=[{tagName:"head",accept:e=>!e.childNodes.length||e.childNodes[0].nodeType==at},{tagName:"body",accept:e=>!e.childNodes.length}],dt=[{tagName:"html",accept:e=>!e||e.nodeType!=rt},{tagName:"head",accept:e=>!e||e.nodeType!=rt&&(e.nodeType!=it||!ut(e.textContent))},{tagName:"body",accept:e=>!e||e.nodeType!=rt},{tagName:"li",accept:(e,t)=>!e&&t.parentElement&&("UL"==t.parentElement.tagName||"OL"==t.parentElement.tagName)||e&&["LI"].includes(e.tagName)},{tagName:"dt",accept:e=>!e||["DT","DD"].includes(e.tagName)},{tagName:"p",accept:e=>e&&["ADDRESS","ARTICLE","ASIDE","BLOCKQUOTE","DETAILS","DIV","DL","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HR","MAIN","NAV","OL","P","PRE","SECTION","TABLE","UL"].includes(e.tagName)},{tagName:"dd",accept:e=>!e||["DT","DD"].includes(e.tagName)},{tagName:"rt",accept:e=>!e||["RT","RP"].includes(e.tagName)},{tagName:"rp",accept:e=>!e||["RT","RP"].includes(e.tagName)},{tagName:"optgroup",accept:e=>!e||["OPTGROUP"].includes(e.tagName)},{tagName:"option",accept:e=>!e||["OPTION","OPTGROUP"].includes(e.tagName)},{tagName:"colgroup",accept:e=>!e||e.nodeType!=rt&&(e.nodeType!=it||!ut(e.textContent))},{tagName:"caption",accept:e=>!e||e.nodeType!=rt&&(e.nodeType!=it||!ut(e.textContent))},{tagName:"thead",accept:e=>!e||["TBODY","TFOOT"].includes(e.tagName)},{tagName:"tbody",accept:e=>!e||["TBODY","TFOOT"].includes(e.tagName)},{tagName:"tfoot",accept:e=>!e},{tagName:"tr",accept:e=>!e||["TR"].includes(e.tagName)},{tagName:"td",accept:e=>!e||["TD","TH"].includes(e.tagName)},{tagName:"th",accept:e=>!e||["TD","TH"].includes(e.tagName)}],ct=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"];function mt(e,t,s){return e.nodeType==it?function(e){const t=e.parentNode;let s;t&&t.nodeType==at&&(s=t.tagName.toLowerCase());return!s||ct.includes(s)?"script"==s||"style"==s?e.textContent.replace(/<\//gi,"<\\/").replace(/\/>/gi,"\\/>"):e.textContent:e.textContent.replace(/&/g,"&amp;").replace(/\u00a0/g,"&nbsp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}(e):e.nodeType==rt?"\x3c!--"+e.textContent+"--\x3e":e.nodeType==at?function(e,t,s){const o=e.tagName.toLowerCase(),n=t&&lt.find((t=>o==t.tagName&&t.accept(e)));let a="";n&&!e.attributes.length||(a="<"+o,Array.from(e.attributes).forEach((s=>a+=function(e,t,s){const o=e.name;let n="";if(!o.match(/["'>/=]/)){let a,i=e.value;s&&"class"==o&&(i=Array.from(t.classList).map((e=>e.trim())).join(" ")),i=i.replace(/&/g,"&amp;").replace(/\u00a0/g,"&nbsp;"),i.includes('"')&&(i.includes("'")||!s?i=i.replace(/"/g,"&quot;"):a=!0);const r=!s||i.match(/[ \t\n\f\r'"`=<>]/);n+=" ",e.namespace?"http://www.w3.org/XML/1998/namespace"==e.namespaceURI?n+="xml:"+o:"http://www.w3.org/2000/xmlns/"==e.namespaceURI?("xmlns"!==o&&(n+="xmlns:"),n+=o):"http://www.w3.org/1999/xlink"==e.namespaceURI?n+="xlink:"+o:n+=o:n+=o,""!=i&&(n+="=",r&&(n+=a?"'":'"'),n+=i,r&&(n+=a?"'":'"'))}return n}(s,e,t))),a+=">");"TEMPLATE"!=e.tagName||e.childNodes.length?Array.from(e.childNodes).forEach((e=>a+=mt(e,t,s||"svg"==o))):a+=e.innerHTML;const i=t&&dt.find((t=>o==t.tagName&&t.accept(e.nextSibling,e)));(s||!i&&!nt.includes(o))&&(a+="</"+o+">");return a}(e,t,s):void 0}function ut(e){return Boolean(e.match(/^[ \t\n\f\r]/))}const gt={frameTree:ot},pt={COMMENT_HEADER:"Page saved with SingleFile",COMMENT_HEADER_LEGACY:"Archive processed by SingleFile",ON_BEFORE_CAPTURE_EVENT_NAME:I,ON_AFTER_CAPTURE_EVENT_NAME:A,preProcessDoc:J,postProcessDoc:te,serialize:(e,t)=>function(e,t){const s=e.doctype;let o="";return s&&(o="<!DOCTYPE "+s.nodeName,s.publicId?(o+=' PUBLIC "'+s.publicId+'"',s.systemId&&(o+=' "'+s.systemId+'"')):s.systemId&&(o+=' SYSTEM "'+s.systemId+'"'),s.internalSubset&&(o+=" ["+s.internalSubset+"]"),o+="> "),o+mt(e.documentElement,t)}(e,t),getShadowRoot:X};G("single-file-user-script-init",(()=>globalThis._singleFile_waitForUserScript=async e=>{const t=new CustomEvent(e+"-request",{cancelable:!0}),s=new Promise((t=>G(e+"-response",t)));(e=>{try{globalThis.dispatchEvent(e)}catch(e){}})(t),t.defaultPrevented&&await s})),e.helper=pt,e.processors=gt,Object.defineProperty(e,"__esModule",{value:!0})}));
