!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).singlefile={})}(this,(function(e){"use strict";const t=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"],n=1,a=3,c=8,o=[{tagName:"HEAD",accept:e=>!e.childNodes.length||e.childNodes[0].nodeType==n},{tagName:"BODY",accept:e=>!e.childNodes.length}],p=[{tagName:"HTML",accept:e=>!e||e.nodeType!=c},{tagName:"HEAD",accept:e=>!e||e.nodeType!=c&&(e.nodeType!=a||!T(e.textContent))},{tagName:"BODY",accept:e=>!e||e.nodeType!=c},{tagName:"LI",accept:(e,t)=>!e&&t.parentElement&&("UL"==i(t.parentElement)||"OL"==i(t.parentElement))||e&&["LI"].includes(i(e))},{tagName:"DT",accept:e=>!e||["DT","DD"].includes(i(e))},{tagName:"P",accept:e=>e&&["ADDRESS","ARTICLE","ASIDE","BLOCKQUOTE","DETAILS","DIV","DL","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HR","MAIN","NAV","OL","P","PRE","SECTION","TABLE","UL"].includes(i(e))},{tagName:"DD",accept:e=>!e||["DT","DD"].includes(i(e))},{tagName:"RT",accept:e=>!e||["RT","RP"].includes(i(e))},{tagName:"RP",accept:e=>!e||["RT","RP"].includes(i(e))},{tagName:"OPTGROUP",accept:e=>!e||["OPTGROUP"].includes(i(e))},{tagName:"OPTION",accept:e=>!e||["OPTION","OPTGROUP"].includes(i(e))},{tagName:"COLGROUP",accept:e=>!e||e.nodeType!=c&&(e.nodeType!=a||!T(e.textContent))},{tagName:"CAPTION",accept:e=>!e||e.nodeType!=c&&(e.nodeType!=a||!T(e.textContent))},{tagName:"THEAD",accept:e=>!e||["TBODY","TFOOT"].includes(i(e))},{tagName:"TBODY",accept:e=>!e||["TBODY","TFOOT"].includes(i(e))},{tagName:"TFOOT",accept:e=>!e},{tagName:"TR",accept:e=>!e||["TR"].includes(i(e))},{tagName:"TD",accept:e=>!e||["TD","TH"].includes(i(e))},{tagName:"TH",accept:e=>!e||["TD","TH"].includes(i(e))}],s=["STYLE","SCRIPT","XMP","IFRAME","NOEMBED","NOFRAMES","PLAINTEXT","NOSCRIPT"];function l(e,T,d){return e.nodeType==a?function(e){const t=e.parentNode;let a;t&&t.nodeType==n&&(a=i(t));return!a||s.includes(a)?"SCRIPT"==a||"STYLE"==a?e.textContent.replace(/<\//gi,"<\\/").replace(/\/>/gi,"\\/>"):e.textContent:e.textContent.replace(/&/g,"&amp;").replace(/\u00a0/g,"&nbsp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}(e):e.nodeType==c?"\x3c!--"+e.textContent+"--\x3e":e.nodeType==n?function(e,n,a){const c=i(e),s=n&&o.find((t=>c==i(t)&&t.accept(e)));let T="";s&&!e.attributes.length||(T="<"+c.toLowerCase(),Array.from(e.attributes).forEach((t=>T+=function(e,t,n){const a=e.name;let c="";if(!a.match(/["'>/=]/)){let o,p=e.value;n&&"class"==a&&(p=Array.from(t.classList).map((e=>e.trim())).join(" ")),p=p.replace(/&/g,"&amp;").replace(/\u00a0/g,"&nbsp;"),p.includes('"')&&(p.includes("'")||!n?p=p.replace(/"/g,"&quot;"):o=!0);const s=!n||p.match(/[ \t\n\f\r'"`=<>]/);c+=" ",e.namespace?"http://www.w3.org/XML/1998/namespace"==e.namespaceURI?c+="xml:"+a:"http://www.w3.org/2000/xmlns/"==e.namespaceURI?("xmlns"!==a&&(c+="xmlns:"),c+=a):"http://www.w3.org/1999/xlink"==e.namespaceURI?c+="xlink:"+a:c+=a:c+=a,""!=p&&(c+="=",s&&(c+=o?"'":'"'),c+=p,s&&(c+=o?"'":'"'))}return c}(t,e,n))),T+=">");"TEMPLATE"!=c||e.childNodes.length?Array.from(e.childNodes).forEach((e=>T+=l(e,n,a||"svg"==c))):T+=e.innerHTML;const d=n&&p.find((t=>c==i(t)&&t.accept(e.nextSibling,e)));(a||!d&&!t.includes(c))&&(T+="</"+c.toLowerCase()+">");return T}(e,T,d):void 0}function T(e){return Boolean(e.match(/^[ \t\n\f\r]/))}function i(e){return e.tagName&&e.tagName.toUpperCase()}const d={serialize:(e,t)=>function(e,t){const n=e.doctype;let a="";return n&&(a="<!DOCTYPE "+n.nodeName,n.publicId?(a+=' PUBLIC "'+n.publicId+'"',n.systemId&&(a+=' "'+n.systemId+'"')):n.systemId&&(a+=' SYSTEM "'+n.systemId+'"'),n.internalSubset&&(a+=" ["+n.internalSubset+"]"),a+="> "),a+l(e.documentElement,t)}(e,t)};e.helper=d,Object.defineProperty(e,"__esModule",{value:!0})}));
