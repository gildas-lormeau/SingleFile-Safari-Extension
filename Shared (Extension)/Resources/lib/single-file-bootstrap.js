!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).singlefileBootstrap={})}(this,(function(e){"use strict";const t="single-file-load-deferred-images-start",s="single-file-load-deferred-images-end",o="single-file-load-deferred-images-keep-zoom-level-start",n="single-file-load-deferred-images-keep-zoom-level-end",a="single-file-block-cookies-start",i="single-file-block-cookies-end",r="single-file-dispatch-scroll-event-start",l="single-file-dispatch-scroll-event-end",d="single-file-block-storage-start",c="single-file-block-storage-end",m="single-file-load-image",u="single-file-image-loaded",p="_singleFile_fontFaces",g=(e,t,s)=>globalThis.addEventListener(e,t,s),h=e=>{try{globalThis.dispatchEvent(e)}catch(e){}},f=globalThis.CustomEvent,E=globalThis.document,T=globalThis.Document,b=globalThis.JSON;let y;y=window[p]?window[p]:window[p]=new Map,E instanceof T&&(g("single-file-new-font-face",(e=>{const t=e.detail,s=Object.assign({},t);delete s.src,y.set(b.stringify(s),t)})),g("single-file-delete-font",(e=>{const t=e.detail,s=Object.assign({},t);delete s.src,y.delete(b.stringify(s))})),g("single-file-clear-fonts",(()=>y=new Map)));const I="[\\x20\\t\\r\\n\\f]",w=new RegExp("\\\\([\\da-f]{1,6}"+I+"?|("+I+")|.)","ig");const A="single-file-",v="_singleFile_waitForUserScript",S="__frameTree__::",R=A+"on-before-capture",N=A+"on-after-capture",P=A+"request-get-adopted-stylesheets",_=A+"response-get-adopted-stylesheets",C=A+"unregister-request-get-adopted-stylesheets",M=A+"user-script-init",O="data-"+A+"removed-content",D="data-"+A+"hidden-content",L="data-"+A+"kept-content",F="data-"+A+"hidden-frame",x="data-"+A+"preserved-space-element",U="data-"+A+"shadow-root-element",q="data-"+A+"win-id",k="data-"+A+"image",H="data-"+A+"poster",B="data-"+A+"video",V="data-"+A+"canvas",W="data-"+A+"movable-style",z="data-"+A+"input-value",Y="data-"+A+"lazy-loaded-src",j="data-"+A+"stylesheet",G="data-"+A+"disabled-noscript",K="data-"+A+"invalid-element",X="data-"+A+"async-script",Z="*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)",J=["NOSCRIPT","DISABLED-NOSCRIPT","META","LINK","STYLE","TITLE","TEMPLATE","SOURCE","OBJECT","SCRIPT","HEAD","BODY"],$=/^'(.*?)'$/,Q=/^"(.*?)"$/,ee={regular:"400",normal:"400",bold:"700",bolder:"700",lighter:"100"},te="single-file-ui-element",se="data:,",oe=(e,t,s)=>globalThis.addEventListener(e,t,s),ne=globalThis.JSON;function ae(e,t,s){e.querySelectorAll("noscript:not(["+G+"])").forEach((e=>{e.setAttribute(G,e.textContent),e.textContent=""})),function(e){e.querySelectorAll("meta[http-equiv=refresh]").forEach((e=>{e.removeAttribute("http-equiv"),e.setAttribute("disabled-http-equiv","refresh")}))}(e),e.head&&e.head.querySelectorAll(Z).forEach((e=>e.hidden=!0)),e.querySelectorAll("svg foreignObject").forEach((e=>{const t=e.querySelectorAll("html > head > "+Z+", html > body > "+Z);t.length&&(Array.from(e.childNodes).forEach((e=>e.remove())),t.forEach((t=>e.appendChild(t))))}));const o=new Map;let n;return t&&e.documentElement?(e.querySelectorAll("button button, a a").forEach((t=>{const s=e.createElement("template");s.setAttribute(K,""),s.content.appendChild(t.cloneNode(!0)),o.set(t,s),t.replaceWith(s)})),n=ie(t,e,e.documentElement,s),s.moveStylesInHead&&e.querySelectorAll("body style, body ~ style").forEach((e=>{const s=he(t,e);s&&me(e,s)&&(e.setAttribute(W,""),n.markedElements.push(e))}))):n={canvases:[],images:[],posters:[],videos:[],usedFonts:[],shadowRoots:[],markedElements:[]},{canvases:n.canvases,fonts:Array.from(y.values()),stylesheets:pe(e),images:n.images,posters:n.posters,videos:n.videos,usedFonts:Array.from(n.usedFonts.values()),shadowRoots:n.shadowRoots,referrer:e.referrer,markedElements:n.markedElements,invalidElements:o,scrollPosition:{x:t.scrollX,y:t.scrollY},adoptedStyleSheets:re(e.adoptedStyleSheets)}}function ie(e,t,s,o,n={usedFonts:new Map,canvases:[],images:[],posters:[],videos:[],shadowRoots:[],markedElements:[]},a){if(s.childNodes){Array.from(s.childNodes).filter((t=>t instanceof e.HTMLElement||t instanceof e.SVGElement)).forEach((s=>{let i,r,l;if(!o.autoSaveExternalSave&&(o.removeHiddenElements||o.removeUnusedFonts||o.compressHTML)&&(l=he(e,s),s instanceof e.HTMLElement&&o.removeHiddenElements&&(r=(a||s.closest("html > head"))&&J.includes(s.tagName.toUpperCase())||s.closest("details"),r||(i=a||me(s,l),i&&(s.setAttribute(D,""),n.markedElements.push(s)))),!i)){if(o.compressHTML&&l){const e=l.getPropertyValue("white-space");e&&e.startsWith("pre")&&(s.setAttribute(x,""),n.markedElements.push(s))}o.removeUnusedFonts&&(le(l,o,n.usedFonts),le(he(e,s,":first-letter"),o,n.usedFonts),le(he(e,s,":before"),o,n.usedFonts),le(he(e,s,":after"),o,n.usedFonts))}!function(e,t,s,o,n,a,i){const r=s.tagName&&s.tagName.toUpperCase();if("CANVAS"==r)try{n.canvases.push({dataURI:s.toDataURL("image/png",""),backgroundColor:i.getPropertyValue("background-color")}),s.setAttribute(V,n.canvases.length-1),n.markedElements.push(s)}catch(e){}if("IMG"==r){const t={currentSrc:a?se:o.loadDeferredImages&&s.getAttribute(Y)||s.currentSrc};if(n.images.push(t),s.setAttribute(k,n.images.length-1),n.markedElements.push(s),s.removeAttribute(Y),i=i||he(e,s)){t.size=function(e,t,s){let o=t.naturalWidth,n=t.naturalHeight;if(!o&&!n){const a=null==t.getAttribute("style");if(s=s||he(e,t)){let e,i,r,l,d,c,m,u,p=!1;if("content-box"==s.getPropertyValue("box-sizing")){const e=t.style.getPropertyValue("box-sizing"),s=t.style.getPropertyPriority("box-sizing"),o=t.clientWidth;t.style.setProperty("box-sizing","border-box","important"),p=t.clientWidth!=o,e?t.style.setProperty("box-sizing",e,s):t.style.removeProperty("box-sizing")}e=ge("padding-left",s),i=ge("padding-right",s),r=ge("padding-top",s),l=ge("padding-bottom",s),p?(d=ge("border-left-width",s),c=ge("border-right-width",s),m=ge("border-top-width",s),u=ge("border-bottom-width",s)):d=c=m=u=0,o=Math.max(0,t.clientWidth-e-i-d-c),n=Math.max(0,t.clientHeight-r-l-m-u),a&&t.removeAttribute("style")}}return{pxWidth:o,pxHeight:n}}(e,s,i);const o=i.getPropertyValue("box-shadow"),n=i.getPropertyValue("background-image");o&&"none"!=o||n&&"none"!=n||!(t.size.pxWidth>1||t.size.pxHeight>1)||(t.replaceable=!0,t.backgroundColor=i.getPropertyValue("background-color"),t.objectFit=i.getPropertyValue("object-fit"),t.boxSizing=i.getPropertyValue("box-sizing"),t.objectPosition=i.getPropertyValue("object-position"))}}if("VIDEO"==r){const o=s.currentSrc;if(o&&!o.startsWith("blob:")&&!o.startsWith("data:")){const t=he(e,s.parentNode);n.videos.push({positionParent:t&&t.getPropertyValue("position"),src:o,size:{pxWidth:s.clientWidth,pxHeight:s.clientHeight},currentTime:s.currentTime}),s.setAttribute(B,n.videos.length-1)}if(!s.getAttribute("poster")){const e=t.createElement("canvas"),o=e.getContext("2d");e.width=s.clientWidth,e.height=s.clientHeight;try{o.drawImage(s,0,0,e.width,e.height),n.posters.push(e.toDataURL("image/png","")),s.setAttribute(H,n.posters.length-1),n.markedElements.push(s)}catch(e){}}}"IFRAME"==r&&a&&o.removeHiddenElements&&(s.setAttribute(F,""),n.markedElements.push(s));"INPUT"==r&&("password"!=s.type&&(s.setAttribute(z,s.value),n.markedElements.push(s)),"radio"!=s.type&&"checkbox"!=s.type||(s.setAttribute(z,s.checked),n.markedElements.push(s)));"TEXTAREA"==r&&(s.setAttribute(z,s.value),n.markedElements.push(s));"SELECT"==r&&s.querySelectorAll("option").forEach((e=>{e.selected&&(e.setAttribute(z,""),n.markedElements.push(e))}));"SCRIPT"==r&&(s.async&&""!=s.getAttribute("async")&&"async"!=s.getAttribute("async")&&(s.setAttribute(X,""),n.markedElements.push(s)),s.textContent=s.textContent.replace(/<\/script>/gi,"<\\/script>"))}(e,t,s,o,n,i,l);const d=!(s instanceof e.SVGElement)&&de(s);if(d&&!s.classList.contains(te)){const a={};s.setAttribute(U,n.shadowRoots.length),n.markedElements.push(s),n.shadowRoots.push(a);try{if(d.adoptedStyleSheets)if(d.adoptedStyleSheets.length)a.adoptedStyleSheets=re(d.adoptedStyleSheets);else if(void 0===d.adoptedStyleSheets.length){const e=e=>a.adoptedStyleSheets=e.detail.adoptedStyleSheets;s.addEventListener(_,e),s.dispatchEvent(new CustomEvent(P,{bubbles:!0})),s.removeEventListener(_,e)}}catch(e){}ie(e,t,d,o,n,i),a.content=d.innerHTML,a.mode=d.mode;try{d.adoptedStyleSheets&&void 0===d.adoptedStyleSheets.length&&s.dispatchEvent(new CustomEvent(C,{bubbles:!0}))}catch(e){}}ie(e,t,s,o,n,i),!o.autoSaveExternalSave&&o.removeHiddenElements&&a&&(r||""==s.getAttribute(L)?s.parentElement&&(s.parentElement.setAttribute(L,""),n.markedElements.push(s.parentElement)):i&&(s.setAttribute(O,""),n.markedElements.push(s)))}))}return n}function re(e){return e?Array.from(e).map((e=>Array.from(e.cssRules).map((e=>e.cssText)).join("\n"))):[]}function le(e,t,s){if(e){const o=e.getPropertyValue("font-style")||"normal";e.getPropertyValue("font-family").split(",").forEach((n=>{if(n=ce(n),!t.loadedFonts||t.loadedFonts.find((e=>ce(e.family)==n&&e.style==o))){const t=(a=e.getPropertyValue("font-weight"),ee[a.toLowerCase().trim()]||a),i=e.getPropertyValue("font-variant")||"normal",r=[n,t,o,i];s.set(ne.stringify(r),[n,t,o,i])}var a}))}}function de(e){const t=globalThis.chrome;if(e.openOrClosedShadowRoot)return e.openOrClosedShadowRoot;if(!(t&&t.dom&&t.dom.openOrClosedShadowRoot))return e.shadowRoot;try{return t.dom.openOrClosedShadowRoot(e)}catch(t){return e.shadowRoot}}function ce(e=""){return function(e){e=e.match($)?e.replace($,"$1"):e.replace(Q,"$1");return e.trim()}((t=e.trim(),t.replace(w,((e,t,s)=>{const o="0x"+t-65536;return o!=o||s?t:o<0?String.fromCharCode(o+65536):String.fromCharCode(o>>10|55296,1023&o|56320)})))).toLowerCase();var t}function me(e,t){let s=!1;if(t){const o=t.getPropertyValue("display"),n=t.getPropertyValue("opacity"),a=t.getPropertyValue("visibility");if(s="none"==o,!s&&("0"==n||"hidden"==a)&&e.getBoundingClientRect){const t=e.getBoundingClientRect();s=!t.width&&!t.height}}return Boolean(s)}function ue(e,t,s){if(e.querySelectorAll("["+G+"]").forEach((t=>{t.textContent=t.getAttribute(G),t.removeAttribute(G),e.body.firstChild?e.body.insertBefore(t,e.body.firstChild):e.body.appendChild(t)})),e.querySelectorAll("meta[disabled-http-equiv]").forEach((e=>{e.setAttribute("http-equiv",e.getAttribute("disabled-http-equiv")),e.removeAttribute("disabled-http-equiv")})),e.head&&e.head.querySelectorAll("*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)").forEach((e=>e.removeAttribute("hidden"))),!t){const s=[O,F,D,x,k,H,B,V,z,U,j,X];t=e.querySelectorAll(s.map((e=>"["+e+"]")).join(","))}t.forEach((e=>{e.removeAttribute(O),e.removeAttribute(D),e.removeAttribute(L),e.removeAttribute(F),e.removeAttribute(x),e.removeAttribute(k),e.removeAttribute(H),e.removeAttribute(B),e.removeAttribute(V),e.removeAttribute(z),e.removeAttribute(U),e.removeAttribute(j),e.removeAttribute(X),e.removeAttribute(W)})),s&&s.forEach(((e,t)=>e.replaceWith(t)))}function pe(e){if(e){const t=[];return e.querySelectorAll("style").forEach(((s,o)=>{try{const n=e.createElement("style");n.textContent=s.textContent,e.body.appendChild(n);const a=n.sheet;n.remove(),a&&a.cssRules.length==s.sheet.cssRules.length||(s.setAttribute(j,o),t[o]=Array.from(s.sheet.cssRules).map((e=>e.cssText)).join("\n"))}catch(e){}})),t}}function ge(e,t){if(t.getPropertyValue(e).endsWith("px"))return parseFloat(t.getPropertyValue(e))}function he(e,t,s){try{return e.getComputedStyle(t,s)}catch(e){}}const fe={LAZY_SRC_ATTRIBUTE_NAME:Y,SINGLE_FILE_UI_ELEMENT_CLASS:te},Ee=10,Te="attributes",be=globalThis.browser,ye=globalThis.document,Ie=globalThis.MutationObserver,we=(e,t,s)=>globalThis.addEventListener(e,t,s),Ae=(e,t,s)=>globalThis.removeEventListener(e,t,s),ve=new Map;let Se;async function Re(e){if(ye.documentElement){ve.clear();const s=ye.body?Math.max(ye.body.scrollHeight,ye.documentElement.scrollHeight):ye.documentElement.scrollHeight,n=ye.body?Math.max(ye.body.scrollWidth,ye.documentElement.scrollWidth):ye.documentElement.scrollWidth;if(s>globalThis.innerHeight||n>globalThis.innerWidth){const i=Math.max(s-1.5*globalThis.innerHeight,0),l=Math.max(n-1.5*globalThis.innerWidth,0);if(globalThis.scrollY<i||globalThis.scrollX<l)return function(e){return Se=0,new Promise((async s=>{let n;const i=new Set,l=new Ie((async t=>{if((t=t.filter((e=>e.type==Te))).length){t.filter((e=>{if("src"==e.attributeName&&(e.target.setAttribute(fe.LAZY_SRC_ATTRIBUTE_NAME,e.target.src),e.target.addEventListener("load",p)),"src"==e.attributeName||"srcset"==e.attributeName||e.target.tagName&&"SOURCE"==e.target.tagName.toUpperCase())return!e.target.classList||!e.target.classList.contains(fe.SINGLE_FILE_UI_ELEMENT_CLASS)})).length&&(n=!0,await Pe(l,e,T),i.size||await Ne(l,e,T))}}));async function c(t){await Ce("idleTimeout",(async()=>{n?Se<Ee&&(Se++,Oe("idleTimeout"),await c(Math.max(500,t/2))):(Oe("loadTimeout"),Oe("maxTimeout"),_e(l,e,T))}),t,e.loadDeferredImagesNativeTimeout)}function p(e){const t=e.target;t.removeAttribute(fe.LAZY_SRC_ATTRIBUTE_NAME),t.removeEventListener("load",p)}async function g(t){n=!0,await Pe(l,e,T),await Ne(l,e,T),t.detail&&i.add(t.detail)}async function E(t){await Pe(l,e,T),await Ne(l,e,T),i.delete(t.detail),i.size||await Ne(l,e,T)}function T(e){l.disconnect(),Ae(m,g),Ae(u,E),s(e)}await c(2*e.loadDeferredImagesMaxIdleTime),await Pe(l,e,T),l.observe(ye,{subtree:!0,childList:!0,attributes:!0}),we(m,g),we(u,E),function(e){e.loadDeferredImagesBlockCookies&&h(new f(a)),e.loadDeferredImagesBlockStorage&&h(new f(d)),e.loadDeferredImagesDispatchScrollEvent&&h(new f(r)),e.loadDeferredImagesKeepZoomLevel?h(new f(o)):h(new f(t))}(e)}))}(e)}}}async function Ne(e,t,s){await Ce("loadTimeout",(()=>_e(e,t,s)),t.loadDeferredImagesMaxIdleTime,t.loadDeferredImagesNativeTimeout)}async function Pe(e,t,s){await Ce("maxTimeout",(async()=>{await Oe("loadTimeout"),await _e(e,t,s)}),10*t.loadDeferredImagesMaxIdleTime,t.loadDeferredImagesNativeTimeout)}async function _e(e,t,o){await Oe("idleTimeout"),function(e){e.loadDeferredImagesBlockCookies&&h(new f(i)),e.loadDeferredImagesBlockStorage&&h(new f(c)),e.loadDeferredImagesDispatchScrollEvent&&h(new f(l)),e.loadDeferredImagesKeepZoomLevel?h(new f(n)):h(new f(s))}(t),await Ce("endTimeout",(async()=>{await Oe("maxTimeout"),o()}),t.loadDeferredImagesMaxIdleTime/2,t.loadDeferredImagesNativeTimeout),e.disconnect()}async function Ce(e,t,s,o){if(be&&be.runtime&&be.runtime.sendMessage&&!o){if(!ve.get(e)||!ve.get(e).pending){const o={callback:t,pending:!0};ve.set(e,o);try{await be.runtime.sendMessage({method:"singlefile.lazyTimeout.setTimeout",type:e,delay:s})}catch(o){Me(e,t,s)}o.pending=!1}}else Me(e,t,s)}function Me(e,t,s){const o=ve.get(e);o&&globalThis.clearTimeout(o),ve.set(e,t),globalThis.setTimeout(t,s)}async function Oe(e){if(be&&be.runtime&&be.runtime.sendMessage)try{await be.runtime.sendMessage({method:"singlefile.lazyTimeout.clearTimeout",type:e})}catch(t){De(e)}else De(e)}function De(e){const t=ve.get(e);ve.delete(e),t&&globalThis.clearTimeout(t)}be&&be.runtime&&be.runtime.onMessage&&be.runtime.onMessage.addListener&&be.runtime.onMessage.addListener((e=>{if("singlefile.lazyTimeout.onTimeout"==e.method){const t=ve.get(e.type);if(t){ve.delete(e.type);try{t.callback()}catch(t){De(e.type)}}}}));const Le={ON_BEFORE_CAPTURE_EVENT_NAME:R,ON_AFTER_CAPTURE_EVENT_NAME:N,WIN_ID_ATTRIBUTE_NAME:q,WAIT_FOR_USERSCRIPT_PROPERTY_NAME:v,preProcessDoc:ae,serialize:function(e){const t=e.doctype;let s="";return t&&(s="<!DOCTYPE "+t.nodeName,t.publicId?(s+=' PUBLIC "'+t.publicId+'"',t.systemId&&(s+=' "'+t.systemId+'"')):t.systemId&&(s+=' SYSTEM "'+t.systemId+'"'),t.internalSubset&&(s+=" ["+t.internalSubset+"]"),s+="> "),s+e.documentElement.outerHTML},postProcessDoc:ue,getShadowRoot:de},Fe='iframe, frame, object[type="text/html"][data]',xe="*",Ue="singlefile.frameTree.initRequest",qe="singlefile.frameTree.ackInitRequest",ke="singlefile.frameTree.cleanupRequest",He="singlefile.frameTree.initResponse",Be="*",Ve=5e3,We=".",ze=globalThis.window==globalThis.top,Ye=globalThis.browser,je=globalThis.top,Ge=globalThis.MessageChannel,Ke=globalThis.document,Xe=globalThis.JSON;let Ze,Je=globalThis.sessions;var $e,Qe,et;function tt(){return globalThis.crypto.getRandomValues(new Uint32Array(32)).join("")}async function st(e){const t=e.sessionId,s=globalThis[Le.WAIT_FOR_USERSCRIPT_PROPERTY_NAME];delete globalThis._singleFile_cleaningUp,ze||(Ze=globalThis.frameId=e.windowId),at(Ke,e.options,Ze,t),ze||(e.options.userScriptEnabled&&s&&await s(Le.ON_BEFORE_CAPTURE_EVENT_NAME),dt({frames:[mt(Ke,globalThis,Ze,e.options,e.scrolling)],sessionId:t,requestedFrameId:Ke.documentElement.dataset.requestedFrameId&&Ze}),e.options.userScriptEnabled&&s&&await s(Le.ON_AFTER_CAPTURE_EVENT_NAME),delete Ke.documentElement.dataset.requestedFrameId)}function ot(e){if(!globalThis._singleFile_cleaningUp){globalThis._singleFile_cleaningUp=!0;const t=e.sessionId;lt(ut(Ke),e.windowId,t)}}function nt(e){e.frames.forEach((t=>it("responseTimeouts",e.sessionId,t.windowId)));const t=Je.get(e.sessionId);if(t){e.requestedFrameId&&(t.requestedFrameId=e.requestedFrameId),e.frames.forEach((e=>{let s=t.frames.find((t=>e.windowId==t.windowId));s||(s={windowId:e.windowId},t.frames.push(s)),s.processed||(s.content=e.content,s.baseURI=e.baseURI,s.title=e.title,s.url=e.url,s.canvases=e.canvases,s.fonts=e.fonts,s.stylesheets=e.stylesheets,s.images=e.images,s.posters=e.posters,s.videos=e.videos,s.usedFonts=e.usedFonts,s.shadowRoots=e.shadowRoots,s.processed=e.processed,s.scrollPosition=e.scrollPosition,s.scrolling=e.scrolling,s.adoptedStyleSheets=e.adoptedStyleSheets)}));t.frames.filter((e=>!e.processed)).length||(t.frames=t.frames.sort(((e,t)=>t.windowId.split(We).length-e.windowId.split(We).length)),t.resolve&&(t.requestedFrameId&&t.frames.forEach((e=>{e.windowId==t.requestedFrameId&&(e.requestedFrame=!0)})),t.resolve(t.frames)))}}function at(e,t,s,o){const n=ut(e);!function(e,t,s,o,n){const a=[];let i;Je.get(n)?i=Je.get(n).requestTimeouts:(i={},Je.set(n,{requestTimeouts:i}));t.forEach(((e,t)=>{const s=o+We+t;e.setAttribute(Le.WIN_ID_ATTRIBUTE_NAME,s),a.push({windowId:s})})),dt({frames:a,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),t.forEach(((e,t)=>{const a=o+We+t;try{ct(e.contentWindow,{method:Ue,windowId:a,sessionId:n,options:s,scrolling:e.scrolling})}catch(e){}i[a]=globalThis.setTimeout((()=>dt({frames:[{windowId:a,processed:!0}],sessionId:n})),Ve)})),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o),n.length&&function(e,t,s,o,n){const a=[];t.forEach(((e,t)=>{const i=o+We+t;let r;try{r=e.contentDocument}catch(e){}if(r)try{const t=e.contentWindow;t.stop(),it("requestTimeouts",n,i),at(r,s,i,n),a.push(mt(r,t,i,s,e.scrolling))}catch(e){a.push({windowId:i,processed:!0})}})),dt({frames:a,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o)}function it(e,t,s){const o=Je.get(t);if(o&&o[e]){const t=o[e][s];t&&(globalThis.clearTimeout(t),delete o[e][s])}}function rt(e,t){const s=Je.get(e);s&&s.responseTimeouts&&(s.responseTimeouts[t]=globalThis.setTimeout((()=>dt({frames:[{windowId:t,processed:!0}],sessionId:e})),1e4))}function lt(e,t,s){e.forEach(((e,o)=>{const n=t+We+o;e.removeAttribute(Le.WIN_ID_ATTRIBUTE_NAME);try{ct(e.contentWindow,{method:ke,windowId:n,sessionId:s})}catch(e){}})),e.forEach(((e,o)=>{const n=t+We+o;let a;try{a=e.contentDocument}catch(e){}if(a)try{lt(ut(a),n,s)}catch(e){}}))}function dt(e){e.method=He;try{je.singlefile.processors.frameTree.initResponse(e)}catch(t){ct(je,e,!0)}}function ct(e,t,s){if(e==je&&Ye&&Ye.runtime&&Ye.runtime.sendMessage)Ye.runtime.sendMessage(t);else if(s){const s=new Ge;e.postMessage(S+Xe.stringify({method:t.method,sessionId:t.sessionId}),Be,[s.port2]),s.port1.postMessage(t)}else e.postMessage(S+Xe.stringify(t),Be)}function mt(e,t,s,o,n){const a=Le.preProcessDoc(e,t,o),i=Le.serialize(e);Le.postProcessDoc(e,a.markedElements,a.invalidElements);return{windowId:s,content:i,baseURI:e.baseURI.split("#")[0],url:e.location.href,title:e.title,canvases:a.canvases,fonts:a.fonts,stylesheets:a.stylesheets,images:a.images,posters:a.posters,videos:a.videos,usedFonts:a.usedFonts,shadowRoots:a.shadowRoots,scrollPosition:a.scrollPosition,scrolling:n,adoptedStyleSheets:a.adoptedStyleSheets,processed:!0}}function ut(e){let t=Array.from(e.querySelectorAll(Fe));return e.querySelectorAll(xe).forEach((e=>{const s=Le.getShadowRoot(e);s&&(t=t.concat(...s.querySelectorAll(Fe)))})),t}Je||(Je=globalThis.sessions=new Map),ze&&(Ze="0",Ye&&Ye.runtime&&Ye.runtime.onMessage&&Ye.runtime.onMessage.addListener&&Ye.runtime.onMessage.addListener((e=>e.method==He?(nt(e),Promise.resolve({})):e.method==qe?(it("requestTimeouts",e.sessionId,e.windowId),rt(e.sessionId,e.windowId),Promise.resolve({})):void 0))),$e="message",Qe=async e=>{if("string"==typeof e.data&&e.data.startsWith(S)){e.preventDefault(),e.stopPropagation();const t=Xe.parse(e.data.substring(S.length));t.method==Ue?(e.source&&ct(e.source,{method:qe,windowId:t.windowId,sessionId:t.sessionId}),ze||(globalThis.stop(),t.options.loadDeferredImages&&Re(t.options),await st(t))):t.method==qe?(it("requestTimeouts",t.sessionId,t.windowId),rt(t.sessionId,t.windowId)):t.method==ke?ot(t):t.method==He&&Je.get(t.sessionId)&&(e.ports[0].onmessage=e=>nt(e.data))}},et=!0,globalThis.addEventListener($e,Qe,et);var pt=Object.freeze({__proto__:null,getAsync:function(e){const t=tt();return e=Xe.parse(Xe.stringify(e)),new Promise((s=>{Je.set(t,{frames:[],requestTimeouts:{},responseTimeouts:{},resolve:e=>{e.sessionId=t,s(e)}}),st({windowId:Ze,sessionId:t,options:e})}))},getSync:function(e){const t=tt();e=Xe.parse(Xe.stringify(e)),Je.set(t,{frames:[],requestTimeouts:{},responseTimeouts:{}}),function(e){const t=e.sessionId,s=globalThis[Le.WAIT_FOR_USERSCRIPT_PROPERTY_NAME];delete globalThis._singleFile_cleaningUp,ze||(Ze=globalThis.frameId=e.windowId);at(Ke,e.options,Ze,t),ze||(e.options.userScriptEnabled&&s&&s(Le.ON_BEFORE_CAPTURE_EVENT_NAME),dt({frames:[mt(Ke,globalThis,Ze,e.options,e.scrolling)],sessionId:t,requestedFrameId:Ke.documentElement.dataset.requestedFrameId&&Ze}),e.options.userScriptEnabled&&s&&s(Le.ON_AFTER_CAPTURE_EVENT_NAME),delete Ke.documentElement.dataset.requestedFrameId)}({windowId:Ze,sessionId:t,options:e});const s=Je.get(t).frames;return s.sessionId=t,s},cleanup:function(e){Je.delete(e),ot({windowId:Ze,sessionId:e,options:{sessionId:e}})},initResponse:nt,TIMEOUT_INIT_REQUEST_MESSAGE:Ve});const gt=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"],ht=1,ft=3,Et=8,Tt=[{tagName:"HEAD",accept:e=>!e.childNodes.length||e.childNodes[0].nodeType==ht},{tagName:"BODY",accept:e=>!e.childNodes.length}],bt=[{tagName:"HTML",accept:e=>!e||e.nodeType!=Et},{tagName:"HEAD",accept:e=>!e||e.nodeType!=Et&&(e.nodeType!=ft||!wt(e.textContent))},{tagName:"BODY",accept:e=>!e||e.nodeType!=Et},{tagName:"LI",accept:(e,t)=>!e&&t.parentElement&&("UL"==At(t.parentElement)||"OL"==At(t.parentElement))||e&&["LI"].includes(At(e))},{tagName:"DT",accept:e=>!e||["DT","DD"].includes(At(e))},{tagName:"P",accept:e=>e&&["ADDRESS","ARTICLE","ASIDE","BLOCKQUOTE","DETAILS","DIV","DL","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HR","MAIN","NAV","OL","P","PRE","SECTION","TABLE","UL"].includes(At(e))},{tagName:"DD",accept:e=>!e||["DT","DD"].includes(At(e))},{tagName:"RT",accept:e=>!e||["RT","RP"].includes(At(e))},{tagName:"RP",accept:e=>!e||["RT","RP"].includes(At(e))},{tagName:"OPTGROUP",accept:e=>!e||["OPTGROUP"].includes(At(e))},{tagName:"OPTION",accept:e=>!e||["OPTION","OPTGROUP"].includes(At(e))},{tagName:"COLGROUP",accept:e=>!e||e.nodeType!=Et&&(e.nodeType!=ft||!wt(e.textContent))},{tagName:"CAPTION",accept:e=>!e||e.nodeType!=Et&&(e.nodeType!=ft||!wt(e.textContent))},{tagName:"THEAD",accept:e=>!e||["TBODY","TFOOT"].includes(At(e))},{tagName:"TBODY",accept:e=>!e||["TBODY","TFOOT"].includes(At(e))},{tagName:"TFOOT",accept:e=>!e},{tagName:"TR",accept:e=>!e||["TR"].includes(At(e))},{tagName:"TD",accept:e=>!e||["TD","TH"].includes(At(e))},{tagName:"TH",accept:e=>!e||["TD","TH"].includes(At(e))}],yt=["STYLE","SCRIPT","XMP","IFRAME","NOEMBED","NOFRAMES","PLAINTEXT","NOSCRIPT"];function It(e,t,s){return e.nodeType==ft?function(e){const t=e.parentNode;let s;t&&t.nodeType==ht&&(s=At(t));return!s||yt.includes(s)?"SCRIPT"==s||"STYLE"==s?e.textContent.replace(/<\//gi,"<\\/").replace(/\/>/gi,"\\/>"):e.textContent:e.textContent.replace(/&/g,"&amp;").replace(/\u00a0/g,"&nbsp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}(e):e.nodeType==Et?"\x3c!--"+e.textContent+"--\x3e":e.nodeType==ht?function(e,t,s){const o=At(e),n=t&&Tt.find((t=>o==At(t)&&t.accept(e)));let a="";n&&!e.attributes.length||(a="<"+o.toLowerCase(),Array.from(e.attributes).forEach((s=>a+=function(e,t,s){const o=e.name;let n="";if(!o.match(/["'>/=]/)){let a,i=e.value;s&&"class"==o&&(i=Array.from(t.classList).map((e=>e.trim())).join(" ")),i=i.replace(/&/g,"&amp;").replace(/\u00a0/g,"&nbsp;"),i.includes('"')&&(i.includes("'")||!s?i=i.replace(/"/g,"&quot;"):a=!0);const r=!s||i.match(/[ \t\n\f\r'"`=<>]/);n+=" ",e.namespace?"http://www.w3.org/XML/1998/namespace"==e.namespaceURI?n+="xml:"+o:"http://www.w3.org/2000/xmlns/"==e.namespaceURI?("xmlns"!==o&&(n+="xmlns:"),n+=o):"http://www.w3.org/1999/xlink"==e.namespaceURI?n+="xlink:"+o:n+=o:n+=o,""!=i&&(n+="=",r&&(n+=a?"'":'"'),n+=i,r&&(n+=a?"'":'"'))}return n}(s,e,t))),a+=">");"TEMPLATE"!=o||e.childNodes.length?Array.from(e.childNodes).forEach((e=>a+=It(e,t,s||"svg"==o))):a+=e.innerHTML;const i=t&&bt.find((t=>o==At(t)&&t.accept(e.nextSibling,e)));(s||!i&&!gt.includes(o))&&(a+="</"+o.toLowerCase()+">");return a}(e,t,s):void 0}function wt(e){return Boolean(e.match(/^[ \t\n\f\r]/))}function At(e){return e.tagName&&e.tagName.toUpperCase()}const vt={frameTree:pt},St={COMMENT_HEADER:"Page saved with SingleFile",COMMENT_HEADER_LEGACY:"Archive processed by SingleFile",ON_BEFORE_CAPTURE_EVENT_NAME:R,ON_AFTER_CAPTURE_EVENT_NAME:N,preProcessDoc:ae,postProcessDoc:ue,serialize:(e,t)=>function(e,t){const s=e.doctype;let o="";return s&&(o="<!DOCTYPE "+s.nodeName,s.publicId?(o+=' PUBLIC "'+s.publicId+'"',s.systemId&&(o+=' "'+s.systemId+'"')):s.systemId&&(o+=' SYSTEM "'+s.systemId+'"'),s.internalSubset&&(o+=" ["+s.internalSubset+"]"),o+="> "),o+It(e.documentElement,t)}(e,t),getShadowRoot:de};oe(M,(()=>globalThis[v]=async e=>{const t=new CustomEvent(e+"-request",{cancelable:!0}),s=new Promise((t=>oe(e+"-response",t)));(e=>{try{globalThis.dispatchEvent(e)}catch(e){}})(t),t.defaultPrevented&&await s})),e.helper=St,e.processors=vt,Object.defineProperty(e,"__esModule",{value:!0})}));
