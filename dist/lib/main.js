"use strict";var u=Object.defineProperty;var f=(n,e,t)=>e in n?u(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var a=(n,e,t)=>(f(n,typeof e!="symbol"?e+"":e,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});class h{constructor(){a(this,"listeners");this.listeners={}}dispatchWithData(e,t){if(this.listeners[e])for(const s of this.listeners[e])s(t);return this}addListener(e,t){if(typeof t!="function")throw`invalid event listener passed for "${e}" event!`;return this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t),()=>{this.removeListener(e,t)}}removeListener(e,t){if(!this.listeners[e])throw`no listeners found for ${e}, there is nothing to delete`;let s=!1,r=0;for(const i of this.listeners[e])i===t&&(this.listeners[e].splice(r,1),s=!0),r++;if(!s)throw`listener not found for ${e}, there is nothing to delete`;return this}}const m={color:"currentColor",opacity:.2,centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out"};function d(n,e){e={...m,...e};const t=document.createElement("div");t.classList.add("ripple"),t.style.position="absolute",t.style.color="inherit",t.style.borderRadius="50%",t.style.pointerEvents="none",t.style.width="100px",t.style.height="100px",t.style.marginTop="-50px",t.style.marginLeft="-50px",t.style.opacity=`${e.opacity}`,t.style.backgroundColor=e.color,t.style.transform="scale(0) translate(0, 0)",t.style.transition=`transform ${e.spreadDuration} ${e.spreadTiming} 0s,opacity ${e.clearDuration} ${e.clearTiming} 0s`,n.currentTarget.appendChild(t);const s=n.currentTarget.getBoundingClientRect();e.centered?(t.style.top=`${s.height/2}px`,t.style.left=`${s.width/2}px`):(t.style.top=`${n.clientY-s.top}px`,t.style.left=`${n.clientX-s.left}px`);const r=Math.max(s.width,s.height)*.02;return t.style.transform=`scale(${r}) translate(0, 0)`,t}function p(n){n&&(n.addEventListener("transitionend",e=>{e.propertyName==="opacity"&&n.remove()}),n.style.opacity="0")}function y(n,e={}){let t,s=!1;const r=l=>{t=d(l,{...e})},i=()=>{p(t)},c=()=>{n.classList.add("ripple-container"),n.addEventListener("pointerdown",r),n.addEventListener("pointerup",i),n.addEventListener("pointerleave",i),s=!1},o=()=>{n.classList.remove("ripple-container"),n.removeEventListener("pointerdown",r),n.removeEventListener("pointerup",i),n.removeEventListener("pointerleave",i),s=!0};return e&&c(),{update(l){e=l,e&&s?c():e||s||o()},destroy:o}}class b extends HTMLElement{constructor(){super()}connectedCallback(){}disconnectedCallback(){}}class v extends HTMLElement{constructor(){super()}connectedCallback(){}disconnectedCallback(){}}class g extends HTMLElement{constructor(){super()}connectedCallback(){}disconnectedCallback(){}}class L extends HTMLElement{constructor(){super()}connectedCallback(){}disconnectedCallback(){}}class x extends HTMLElement{constructor(){super()}connectedCallback(){}disconnectedCallback(){}}class E extends HTMLElement{constructor(){super()}connectedCallback(){}disconnectedCallback(){}}const C=Object.freeze(Object.defineProperty({__proto__:null,Button:b,IconButton:v,Label:L,Primary:x,Secondary:E,Select:g},Symbol.toStringTag,{value:"Module"}));console.log("unimplemented (lib)");exports.Events=h;exports.create=y;exports.start=d;exports.stop=p;exports.wc=C;
