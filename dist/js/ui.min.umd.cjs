(function(c,S){typeof exports=="object"&&typeof module<"u"?S(exports):typeof define=="function"&&define.amd?define(["exports"],S):(c=typeof globalThis<"u"?globalThis:c||self,S(c.ui={}))})(this,function(c){"use strict";var Zt;let S=null;function Kt(){return S===null&&(S=Array.from(document.styleSheets).map(s=>{const t=new CSSStyleSheet,e=Array.from(s.cssRules).map(i=>i.cssText).join(" ");return t.replaceSync(e),t})),S}function ct(s){s.adoptedStyleSheets.push(...Kt())}class Q{constructor(){this.listeners={}}addListener(t,e){return this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e),()=>this.removeListener(t,e)}removeListener(t,e){this.listeners[t]&&(this.listeners[t]=this.listeners[t].filter(i=>i!==e))}dispatch(t,e){this.listeners[t]&&this.listeners[t].forEach(i=>i(e))}}class Qt{constructor(){this.callbacks=[]}add(...t){this.callbacks.push(...t)}run(){this.callbacks.filter(t=>(t(),!1))}}const te={onDragStart:null,onDragging:null,onDragEnd:null};function ee(s,t,e){e={...te,...e};const i=[...s.children].indexOf(t);return t.draggable=!0,t.ondragstart=r=>{r.dataTransfer&&(r.dataTransfer.effectAllowed="move",r.dataTransfer.dropEffect="move"),s.classList.add("ui-dragging"),e.onDragStart&&e.onDragStart(i)},t.ondragover=r=>(r.preventDefault(),!1),t.ondragenter=r=>{r.preventDefault(),[...s.children].forEach((o,n)=>{if(n===i){o.style.background="var(--ui-primary)",o.style.color="var(--ui-primary-text)";return}o.style.background="inherit",o.style.color="inherit"}),e.onDragging&&e.onDragging(i)},t.ondrop=r=>{r.preventDefault(),r.dataTransfer&&(r.dataTransfer.dropEffect="move"),s.classList.remove("ui-dragging"),e.onDragEnd&&e.onDragEnd(i),[...s.children].forEach(o=>{o.style.background="inherit",o.style.color="inherit"})},()=>{t.draggable=!1,t.ondragstart=null,t.ondragover=null,t.ondragenter=null,t.ondrop=null}}const re={onDragStart:null,onDragEnd:null};function ie(s,t){t={...re,...t};let e=null,i=null,r=null,o=!1,n="",d="";const l=a=>{const m=a.currentTarget;!e&&Array.from(m.classList).includes("draggable")&&(i=new Date().getTime(),e=m,r&&clearTimeout(r),r=setTimeout(()=>{e&&(n=e.style.color,d=e.style.backgroundColor,e.style.color="var(--ui-primary-text)",e.style.backgroundColor="var(--ui-primary)",s.classList.add("ui-dragging"),o=!0,t!=null&&t.onDragStart&&t.onDragStart())},200))},p=a=>{if(!i||!e)return;if(!o&&new Date().getTime()-i<200){f();return}a.preventDefault(),o||(o=!0,t!=null&&t.onDragStart&&t.onDragStart());let m;if(a instanceof TouchEvent){const x=a.targetTouches[0];m={clientX:x.clientX,clientY:x.clientY}}else m={clientX:a.clientX,clientY:a.clientY};let v=document.elementFromPoint(m.clientX,m.clientY);if(v){for(;!v.classList.contains("draggable")&&v.parentElement;)v=v.parentElement;v.classList.contains("draggable")&&((()=>{let lt=e==null?void 0:e.previousElementSibling;for(;lt;){if(lt===v)return!0;lt=lt.previousElementSibling}return!1})()?s.insertBefore(e,v):s.insertBefore(e,v.nextElementSibling))}},f=()=>{r!==null&&(clearTimeout(r),r=null),e&&(e.style.color=n,e.style.backgroundColor=d,e=null),i=null,s.classList.remove("ui-dragging"),o&&(o=!1,t!=null&&t.onDragEnd&&t.onDragEnd())};return[...s.children].forEach(a=>{a.classList.add("draggable"),a.onmousedown=l,a.ontouchstart=l,a.onmousemove=p,a.ontouchmove=p,s.onmouseleave=a.onmouseup=f,a.ontouchend=f}),()=>{[...s.children].forEach(a=>{a.classList.remove("draggable"),a.onmousedown=null,a.ontouchstart=null,a.onmousemove=null,a.ontouchmove=null,s.onmouseleave=a.onmouseup=null,a.ontouchend=null})}}const se=Object.freeze(Object.defineProperty({__proto__:null,createMobile:ie,createNative:ee},Symbol.toStringTag,{value:"Module"})),Ot={color:"var(--ui-ripple, currentColor)",opacity:"var(--ui-ripple-opacity, 0.2)",centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out",usePointer:!1};function oe(s,t){t={...Ot,...t||{}};let e=null;const i=d=>{e=ht(d,t),s.addEventListener("pointermove",o)},r=()=>{s.removeEventListener("pointermove",o),dt(e),e=null},o=()=>r(),n=d=>{e=ht(d,t),dt(e),e=null};return s.classList.add("ripple-container"),s.style.overflow="hidden",t.usePointer?(s.addEventListener("pointerdown",i),s.addEventListener("pointerup",r),s.addEventListener("pointerleave",r)):s.addEventListener("click",n),()=>{if(s.classList.remove("ripple-container"),t.usePointer){s.removeEventListener("pointerdown",i),s.removeEventListener("pointerup",r),s.removeEventListener("pointerleave",r),s.removeEventListener("pointermove",o);return}s.removeEventListener("click",n)}}function ht(s,t){const e=document.createElement("div"),i=s.currentTarget;i.appendChild(e),e.classList.add("ripple"),e.style.position="absolute",e.style.color="inherit",e.style.borderRadius="50%",e.style.pointerEvents="none",e.style.width="100px",e.style.height="100px",e.style.marginTop="-50px",e.style.marginLeft="-50px",e.style.opacity=`${t.opacity}`,e.style.backgroundColor=`${t.color}`,e.style.transform="scale(0) translate(0, 0)",e.style.transition=`transform ${t.spreadDuration} ${t.spreadTiming} 0s,opacity ${t.clearDuration} ${t.clearTiming} 0s`;const r=i.getBoundingClientRect();t.centered?(e.style.top=`${r.height/2}px`,e.style.left=`${r.width/2}px`):(e.style.top=`${s.clientY-r.top}px`,e.style.left=`${s.clientX-r.left}px`);const o=Math.max(r.width,r.height)*.02;return e.style.transform=`scale(${o}) translate(0, 0)`,e}function dt(s){s&&(s.addEventListener("transitionend",t=>{t.propertyName==="opacity"&&s.remove()}),s.style.opacity="0")}const ne=Object.freeze(Object.defineProperty({__proto__:null,create:oe,defaultOptions:Ot,start:ht,stop:dt},Symbol.toStringTag,{value:"Module"})),ae=String.raw,le=String.raw;function ce(){return/(android)/i.test(navigator.userAgent)}function he(s){return Object.entries(s).map(([t,e])=>`${t.replace(/[A-Z]/g,i=>`-${i.toLowerCase()}`)}:${e}`).join(";")+";"}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tt=globalThis,ut=tt.ShadowRoot&&(tt.ShadyCSS===void 0||tt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pt=Symbol(),Ut=new WeakMap;let Dt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==pt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ut&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Ut.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ut.set(e,t))}return t}toString(){return this.cssText}};const de=s=>new Dt(typeof s=="string"?s:s+"",void 0,pt),y=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new Dt(e,s,pt)},ue=(s,t)=>{if(ut)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),r=tt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},It=ut?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return de(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:pe,defineProperty:fe,getOwnPropertyDescriptor:ge,getOwnPropertyNames:ve,getOwnPropertySymbols:ye,getPrototypeOf:be}=Object,w=globalThis,jt=w.trustedTypes,me=jt?jt.emptyScript:"",ft=w.reactiveElementPolyfillSupport,R=(s,t)=>s,et={toAttribute(s,t){switch(t){case Boolean:s=s?me:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},gt=(s,t)=>!pe(s,t),Tt={attribute:!0,type:String,converter:et,reflect:!1,hasChanged:gt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);class j extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Tt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&fe(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:o}=ge(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return r==null?void 0:r.call(this)},set(n){const d=r==null?void 0:r.call(this);o.call(this,n),this.requestUpdate(t,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Tt}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;const t=be(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){const e=this.properties,i=[...ve(e),...ye(e)];for(const r of i)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(It(r))}else t!==void 0&&e.push(It(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ue(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){var o;const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:et).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){var o;const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const n=i.getPropertyOptions(r),d=typeof n.converter=="function"?{fromAttribute:n.converter}:((o=n.converter)==null?void 0:o.fromAttribute)!==void 0?n.converter:et;this._$Em=r,this[r]=d.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??gt)(this[t],e))return;this.P(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r)n.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(e)):this._$EU()}catch(r){throw t=!1,this._$EU(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[R("elementProperties")]=new Map,j[R("finalized")]=new Map,ft==null||ft({ReactiveElement:j}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis,rt=B.trustedTypes,Lt=rt?rt.createPolicy("lit-html",{createHTML:s=>s}):void 0,kt="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,Rt="?"+P,_e=`<${Rt}>`,A=document,M=()=>A.createComment(""),N=s=>s===null||typeof s!="object"&&typeof s!="function",vt=Array.isArray,$e=s=>vt(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",yt=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bt=/-->/g,Mt=/>/g,E=RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nt=/'/g,Ht=/"/g,zt=/^(?:script|style|textarea|title)$/i,we=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),_=we(1),T=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Ft=new WeakMap,C=A.createTreeWalker(A,129);function Gt(s,t){if(!vt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Lt!==void 0?Lt.createHTML(t):t}const Pe=(s,t)=>{const e=s.length-1,i=[];let r,o=t===2?"<svg>":t===3?"<math>":"",n=H;for(let d=0;d<e;d++){const l=s[d];let p,f,a=-1,m=0;for(;m<l.length&&(n.lastIndex=m,f=n.exec(l),f!==null);)m=n.lastIndex,n===H?f[1]==="!--"?n=Bt:f[1]!==void 0?n=Mt:f[2]!==void 0?(zt.test(f[2])&&(r=RegExp("</"+f[2],"g")),n=E):f[3]!==void 0&&(n=E):n===E?f[0]===">"?(n=r??H,a=-1):f[1]===void 0?a=-2:(a=n.lastIndex-f[2].length,p=f[1],n=f[3]===void 0?E:f[3]==='"'?Ht:Nt):n===Ht||n===Nt?n=E:n===Bt||n===Mt?n=H:(n=E,r=void 0);const v=n===E&&s[d+1].startsWith("/>")?" ":"";o+=n===H?l+_e:a>=0?(i.push(p),l.slice(0,a)+kt+l.slice(a)+P+v):l+P+(a===-2?d:v)}return[Gt(s,o+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class z{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,n=0;const d=t.length-1,l=this.parts,[p,f]=Pe(t,e);if(this.el=z.createElement(p,i),C.currentNode=this.el.content,e===2||e===3){const a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(r=C.nextNode())!==null&&l.length<d;){if(r.nodeType===1){if(r.hasAttributes())for(const a of r.getAttributeNames())if(a.endsWith(kt)){const m=f[n++],v=r.getAttribute(a).split(P),x=/([.?@])?(.*)/.exec(m);l.push({type:1,index:o,name:x[2],strings:v,ctor:x[1]==="."?Se:x[1]==="?"?Ae:x[1]==="@"?Ee:it}),r.removeAttribute(a)}else a.startsWith(P)&&(l.push({type:6,index:o}),r.removeAttribute(a));if(zt.test(r.tagName)){const a=r.textContent.split(P),m=a.length-1;if(m>0){r.textContent=rt?rt.emptyScript:"";for(let v=0;v<m;v++)r.append(a[v],M()),C.nextNode(),l.push({type:2,index:++o});r.append(a[m],M())}}}else if(r.nodeType===8)if(r.data===Rt)l.push({type:2,index:o});else{let a=-1;for(;(a=r.data.indexOf(P,a+1))!==-1;)l.push({type:7,index:o}),a+=P.length-1}o++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function L(s,t,e=s,i){var n,d;if(t===T)return t;let r=i!==void 0?(n=e._$Co)==null?void 0:n[i]:e._$Cl;const o=N(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((d=r==null?void 0:r._$AO)==null||d.call(r,!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=r:e._$Cl=r),r!==void 0&&(t=L(s,r._$AS(s,t.values),r,i)),t}class xe{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=((t==null?void 0:t.creationScope)??A).importNode(e,!0);C.currentNode=r;let o=C.nextNode(),n=0,d=0,l=i[0];for(;l!==void 0;){if(n===l.index){let p;l.type===2?p=new F(o,o.nextSibling,this,t):l.type===1?p=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(p=new Ce(o,this,t)),this._$AV.push(p),l=i[++d]}n!==(l==null?void 0:l.index)&&(o=C.nextNode(),n++)}return C.currentNode=A,r}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class F{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),N(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):$e(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==g&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=z.createElement(Gt(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(e);else{const n=new xe(r,this),d=n.u(this.options);n.p(e),this.T(d),this._$AH=n}}_$AC(t){let e=Ft.get(t.strings);return e===void 0&&Ft.set(t.strings,e=new z(t)),e}k(t){vt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new F(this.O(M()),this.O(M()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(t,e=this,i,r){const o=this.strings;let n=!1;if(o===void 0)t=L(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else{const d=t;let l,p;for(t=o[0],l=0;l<o.length-1;l++)p=L(this,d[i+l],e,l),p===T&&(p=this._$AH[l]),n||(n=!N(p)||p!==this._$AH[l]),p===g?t=g:t!==g&&(t+=(p??"")+o[l+1]),this._$AH[l]=p}n&&!r&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Se extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}}class Ae extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}}class Ee extends it{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=L(this,t,e,0)??g)===T)return;const i=this._$AH,r=t===g&&i!==g||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==g&&(i===g||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ce{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}}const bt=B.litHtmlPolyfillSupport;bt==null||bt(z,F),(B.litHtmlVersions??(B.litHtmlVersions=[])).push("3.2.1");const Oe=(s,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let r=i._$litPart$;if(r===void 0){const o=(e==null?void 0:e.renderBefore)??null;i._$litPart$=r=new F(t.insertBefore(M(),o),o,void 0,e??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let u=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Oe(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return T}};u._$litElement$=!0,u.finalized=!0,(Zt=globalThis.litElementHydrateSupport)==null||Zt.call(globalThis,{LitElement:u});const mt=globalThis.litElementPolyfillSupport;mt==null||mt({LitElement:u}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ue={attribute:!0,type:String,converter:et,reflect:!1,hasChanged:gt},De=(s=Ue,t,e)=>{const{kind:i,metadata:r}=e;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),o.set(e.name,s),i==="accessor"){const{name:n}=e;return{set(d){const l=t.get.call(this);t.set.call(this,d),this.requestUpdate(n,l,s)},init(d){return d!==void 0&&this.P(n,void 0,s),d}}}if(i==="setter"){const{name:n}=e;return function(d){const l=this[n];t.call(this,d),this.requestUpdate(n,l,s)}}throw Error("Unsupported decorator location: "+i)};function h(s){return(t,e)=>typeof e=="object"?De(s,t,e):((i,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,n?{...i,wrapped:!0}:i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(s,t,e)}var Ie=Object.defineProperty,je=Object.getOwnPropertyDescriptor,_t=(s,t,e,i)=>{for(var r=i>1?void 0:i?je(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Ie(t,e,r),r};let G=class extends u{constructor(){super(...arguments),this.variant="info",this.message="",this.role="button"}static get styles(){return y`
            :host {
                position: relative;

                flex: 1;
                display: block;

                border-radius: var(--ui-radius);
                border: 1px solid var(--ui-borderColor);

                padding: var(--ui-spacing);

                width: 28rem;
                max-width: 100%;

                cursor: pointer;
            }

            :host([variant="info"]) {
                background-color: var(--ui-info);
                color: var(--ui-info-text));
            }

            :host([variant="warning"]) {
                background-color: hsl(48, 100%, 50%);
                background-color: var(--ui-warning);
                color: var(--ui-warning-text);
            }

            :host([variant="error"]) {
                background-color: var(--ui-error);
                color: var(--ui-error-text);
            }

            ui-text {
                flex-grow: 1;
            }
        `}render(){return _` <ui-text style="font-size: 0.9rem;">${this.message}</ui-text> `}firstUpdated(s){super.firstUpdated(s),this.addEventListener("click",()=>{this.parentElement&&this.parentElement.removeChild(this)})}};_t([h({type:String,attribute:"variant",reflect:!0})],G.prototype,"variant",2),_t([h({type:String,attribute:"message"})],G.prototype,"message",2),G=_t([b("ui-alert")],G);const Te=G;var Le=Object.defineProperty,ke=Object.getOwnPropertyDescriptor,Re=(s,t,e,i)=>{for(var r=i>1?void 0:i?ke(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Le(t,e,r),r};let $t=class extends u{static get styles(){return y`
            :host {
                display: block;

                z-index: 999;
                position: fixed !important;
                right: 0;
                bottom: 0;

                width: fit-content;
                max-width: 100%;
                height: fit-content;
                max-height: 100%;

                background: transparent;

                border-radius: var(--ui-radius);

                overflow: auto;

                /* Disable touch actions and pointer events */

                pointer-events: none;

                -ms-touch-action: none;
                touch-action: none;
            }

            ui-flex-grid {
                padding: var(--ui-spacing);
            }

            ::slotted(*) {
                pointer-events: auto;

                -ms-touch-action: auto;
                touch-action: auto;
            }
        `}render(){return _`
            <ui-flex-grid class="container" gap="0.25rem">
                <slot></slot>
            </ui-flex-grid>
        `}addAlert(s){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".container");return t&&t.append(s),()=>this.removeAlert(s)}removeAlert(s){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".container");t&&t.removeChild(s)}};$t=Re([b("ui-alerts")],$t);const Be=$t;var Me=Object.defineProperty,Ne=Object.getOwnPropertyDescriptor,wt=(s,t,e,i)=>{for(var r=i>1?void 0:i?Ne(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Me(t,e,r),r};let q=class extends u{constructor(){super(...arguments),this.position="top",this.fixed=!1}static get styles(){return y`
            :host {
                z-index: 999;

                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-between;

                width: 100%;

                overflow: hidden;

                padding: calc(var(--ui-spacing) / 2);

                background-color: var(--ui-backdrop);
                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);

                gap: var(--ui-spacing, 0.25rem);
            }

            :host([position="top"]),
            :host([position="bottom"]) {
                position: absolute !important;
                left: 0;
                right: 0;
                height: var(--ui-app-bar-height);
            }

            :host([position="top"]):host([fixed]),
            :host([position="bottom"]):host([fixed]) {
                position: fixed !important;
            }

            :host([position="top"]) {
                top: 0;
                border-bottom: 1px solid var(--ui-borderColor);
            }

            :host([position="bottom"]) {
                bottom: 0;
                border-top: 1px solid var(--ui-borderColor);
            }

            :host .container {
                height: 100%;
                width: 100%;
            }

            :host .container.left,
            :host .container.right {
                width: fit-content;
            }

            :host ::slotted([slot="center"]) {
                width: 100%;
            }
        `}render(){return _`
            <ui-flex-grid-row class="container left" part="container left" align="center">
                <slot name="left"></slot>
            </ui-flex-grid-row>

            <ui-flex-grid-row
                class="container center"
                part="container center"
                style="overflow: hidden;"
                align="center"
            >
                <slot name="center"></slot>
            </ui-flex-grid-row>

            <ui-flex-grid-row class="container right" part="container right" align="center">
                <slot name="right"></slot>
            </ui-flex-grid-row>
        `}content(s){return[...this.querySelectorAll(`[slot="${s}"]`)]}contentName(s){return this.querySelector(`[name="${s}"]`)}};wt([h({type:String,attribute:"position",reflect:!0})],q.prototype,"position",2),wt([h({type:Boolean,attribute:"fixed",reflect:!0})],q.prototype,"fixed",2),q=wt([b("ui-app-bar")],q);const He=q;var ze=Object.defineProperty,Fe=Object.getOwnPropertyDescriptor,Pt=(s,t,e,i)=>{for(var r=i>1?void 0:i?Fe(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&ze(t,e,r),r};let V=class extends u{constructor(){super(...arguments),this.name="",this.hidden=!1}static get styles(){return y`
            * {
                box-sizing: border-box;
            }

            :host {
                display: block;
                flex: 1;
            }

            :host([hidden]) {
                display: none;
            }

            ::slotted(*) {
                flex-grow: 1;
            }
        `}render(){return _`<slot></slot>`}content(){return[...this.children]}contentAt(s=0){return this.children[s]}show(){this.hidden=!1}hide(){this.hidden=!0}};Pt([h({type:String,attribute:"name",reflect:!0})],V.prototype,"name",2),Pt([h({type:Boolean,attribute:"hidden",reflect:!0})],V.prototype,"hidden",2),V=Pt([b("ui-app-bar-item")],V);const Ge=V;var qe=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,O=(s,t,e,i)=>{for(var r=i>1?void 0:i?Ve(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&qe(t,e,r),r};let $=class extends u{constructor(){super(...arguments),this.title="",this.fullscreen="",this.noFooter="",this.open=!1,this.modal=!1,this.inert=!1}static get styles(){return y`
            * {
                box-sizing: border-box;
            }

            dialog {
                z-index: 998; /* UIAlerts z-index is 999 */

                position: fixed !important;
                top: 50%;
                left: 50%;

                max-width: 100%;
                max-height: 100%;

                margin: 0;
                padding: 0;

                border: none;
                outline: none;

                background-color: transparent;

                transform: translate(-50%, -50%);

                /* Remove Scrollbar */
                -ms-overflow-style: none;
                scrollbar-width: none;
                scroll-behavior: smooth;
            }

            /* Remove Scrollbar */
            dialog::-webkit-scrollbar {
                display: none;
            }

            dialog::backdrop {
                background-color: var(--ui-backdrop-color);
                -webkit-backdrop-filter: var(--ui-backdrop-filter);
                backdrop-filter: var(--ui-backdrop-filter);
            }

            :host([fullscreen]) dialog {
                width: 100%;
                height: 100%;
            }

            dialog > .container {
                background-color: var(--ui-bg);
                color: var(--ui-text);

                border: 1px solid var(--ui-border-color);
                border-radius: var(--ui-radius);

                padding: var(--ui-spacing);

                display: flex;
                flex-direction: column;
                justify-content: space-between;

                position: relative;
            }

            :host([fullscreen]) dialog > .container {
                width: calc(100% - var(--ui-spacing) * 2);
                height: calc(100% - var(--ui-spacing) * 2);

                margin: var(--ui-spacing);
            }

            /*
             * Header Styles
             */

            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;

                border-top-right-radius: var(--ui-radius);
                border-top-left-radius: var(--ui-radius);

                width: 100%;
                height: var(--ui-dialog-header-height);
            }

            :host([fullscreen]) .header {
                z-index: 15;
                position: absolute;
                top: var(--ui-spacing);
                right: var(--ui-spacing);
                left: var(--ui-spacing);
                width: calc(100% - var(--ui-spacing) * 2);
            }

            /*
             * Content Styles
             */

            .content {
                padding: var(--ui-spacing);
                height: fit-content;
                min-width: fit-content;
                width: 100%;
            }

            :host([fullscreen]) .content {
                z-index: 10;
                position: absolute;
                top: calc(var(--ui-dialog-header-height) + var(--ui-spacing));
                bottom: calc(var(--ui-dialog-footer-height) + var(--ui-spacing));
                right: var(--ui-spacing);
                left: var(--ui-spacing);
                padding: unset;
                height: unset;
                width: unset;
                min-width: unset;
            }

            :host([no-footer]) .content {
                bottom: var(--ui-spacing);
            }

            /*
             * Footer Styles
             */

            .footer {
                margin-top: var(--ui-spacing);
                border-bottom-right-radius: var(--ui-radius);
                border-bottom-left-radius: var(--ui-radius);

                width: 100%;
                height: var(--ui-dialog-footer-height);
            }

            :host([fullscreen]) .footer {
                z-index: 15;
                position: absolute;
                right: var(--ui-spacing);
                bottom: var(--ui-spacing);
                left: var(--ui-spacing);
                width: calc(100% - var(--ui-spacing) * 2);
            }

            :host([no-footer]) .footer {
                display: none;
            }

            .footer ui-flex-grid-row {
                height: 100%;
                flex-wrap: nowrap;
                justify-content: flex-end;
                align-items: center;
            }
        `}render(){return _`
            <dialog
                @cancel=${s=>{s.preventDefault()}}
            >
                <div class="container">
                    <div class="header">
                        <h4>${this.title}</h4>

                        <button
                            class="ui-icon-button ui-icon-close"
                            style="width: var(--ui-dialog-header-height); height: 100%;"
                            variant="ghost"
                            @click=${()=>{this.close()}}
                        ></button>
                    </div>

                    <div class="content">
                        <slot></slot>
                    </div>

                    <div class="footer">
                        <ui-flex-grid-row gap="calc(var(--ui-spacing) / 2)">
                            <slot name="actions"></slot>
                        </ui-flex-grid-row>
                    </div>
                </div>
            </dialog>
        `}firstUpdated(s){this.shadowRoot!==null&&ct(this.shadowRoot)}updated(s){this.open?this.show():this.close()}show(){this.open||(this.open=!0);const s=this.shadowRoot.querySelector("dialog");if(s===null)return;const t=s.inert;s.inert=this.inert,this.modal?s.showModal():s.show(),s.inert=t,this.dispatchEvent(new Event("open"))}close(){this.dispatchEvent(new Event("close")),this.shadowRoot.querySelector("dialog").close()}addDialogActionButton(s,t){const e=new c.UIFlexGridItem;e.flex=(t==null?void 0:t.flex)||1,e.slot="actions",this.appendChild(e);let i=document.createElement("button");return e.appendChild(i),i.innerHTML=s,t!=null&&t.variant&&i.setAttribute("variant",t.variant),t!=null&&t.color&&i.setAttribute("color",t.color),i.onclick=(t==null?void 0:t.onClick)||null,i}};O([h({type:String,attribute:"title",reflect:!0})],$.prototype,"title",2),O([h({type:Boolean,attribute:"fullscreen",reflect:!0})],$.prototype,"fullscreen",2),O([h({type:Boolean,attribute:"no-footer",reflect:!0})],$.prototype,"noFooter",2),O([h({type:Boolean,attribute:"open",reflect:!0})],$.prototype,"open",2),O([h({type:Boolean,attribute:"modal",reflect:!0})],$.prototype,"modal",2),O([h({type:Boolean,attribute:"inert",reflect:!0})],$.prototype,"inert",2),$=O([b("ui-dialog")],$);const We=$;var Xe=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,W=(s,t,e,i)=>{for(var r=i>1?void 0:i?Ye(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Xe(t,e,r),r};const Je="0";let U=class extends u{constructor(){super(...arguments),this.title="",this.gap=Je,this.open=!1,this.noFold=!1}static get styles(){return y`
            :host {
                display: block;
                margin: 0;
                list-style: none;
                padding: var(--ui-spacing);
                overflow: hidden;
            }

            .fold {
                display: flex;
                position: relative;
                border-radius: var(--ui-radius);
                cursor: pointer;
            }

            :host([no-fold]) .fold {
                display: none;
            }

            .fold .icon {
                transition: transform 0.25s ease;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            :host(:not([open])) .fold .icon {
                transform: rotate(-90deg);
            }

            :host(:not([open])):host(:not([no-fold])) ::slotted(*) {
                display: none !important;
            }
        `}render(){return _`
            <ui-flex-grid gap="${this.gap}">
                <ui-drawer-group-item
                    class="fold"
                    role="button"
                    @click=${async()=>{this.open=!this.open,setTimeout(()=>{this.open?this.dispatchEvent(new Event("unfold")):this.dispatchEvent(new Event("fold"))})}}
                >
                    <ui-flex-grid-row>
                        <ui-flex-grid-item align="center" style="padding-right: var(--ui-spacing);">
                            <h4>${this.title}</h4>
                        </ui-flex-grid-item>

                        <ui-flex-grid-item class="icon" align="center" flex="0">
                            <div
                                class="ui-icon-chevron-down"
                                style="width: 2.5rem, height: 2.5rem"
                            ></div>
                        </ui-flex-grid-item>
                    </ui-flex-grid-row>
                </ui-drawer-group-item>

                <slot></slot>
            </ui-flex-grid>
        `}firstUpdated(s){this.shadowRoot!==null&&ct(this.shadowRoot)}};W([h({type:String,attribute:"title",reflect:!0})],U.prototype,"title",2),W([h({type:String,attribute:"gap"})],U.prototype,"gap",2),W([h({type:Boolean,attribute:"open",reflect:!0})],U.prototype,"open",2),W([h({type:Boolean,attribute:"no-fold",reflect:!0})],U.prototype,"noFold",2),U=W([b("ui-drawer-group")],U);const qt=U;var Ze=Object.defineProperty,Ke=Object.getOwnPropertyDescriptor,xt=(s,t,e,i)=>{for(var r=i>1?void 0:i?Ke(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Ze(t,e,r),r};let X=class extends u{constructor(){super(...arguments),this.open=!1,this.role="button",this.handleUnfold=s=>{s.currentTarget.scrollIntoView(!0)}}static get styles(){return y`
            * {
                box-sizing: border-box;
            }

            :host {
                display: block;

                position: fixed !important;
                z-index: 150;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;

                overflow: hidden;

                transition: left 0s ease 0.25s;
            }

            :host([open]) {
                left: 0;
                transition: none;
            }

            :host(:not([open])) {
            }

            aside {
                position: absolute;
                z-index: 150;
                top: 0;
                left: -100%;
                width: var(--_width, fit-content);
                max-width: calc(100% - 2.5rem);
                height: 100%;

                overflow-x: hidden;
                overflow-y: scroll;

                border-right: 1px solid var(--ui-card-borderColor);

                transition: left 0.5s ease;

                /* Remove Scrollbar */
                -ms-overflow-style: none;
                scrollbar-width: none;
                scroll-behavior: smooth;

                /* Backdrop Blur */
                background-color: var(--ui-backdrop);
                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
            }

            aside::-webkit-scrollbar {
                display: none;
            }

            :host([open]) aside {
                left: 0;
            }
        `}render(){return _`
            <aside
                @click=${s=>{s.stopPropagation()}}
            >
                <slot></slot>
            </aside>
        `}firstUpdated(s){this.classList.add("ui-backdrop-blur"),this.addEventListener("click",()=>{this.open=!1})}updated(s){[...this.children].forEach(async t=>{t instanceof qt&&t.addEventListener("unfold",this.handleUnfold)})}attributeChangedCallback(s,t,e){switch(super.attributeChangedCallback(s,t,e),s){case"width":e!==null?this.style.setProperty("--_width",e):this.style.removeProperty("--_width");break;case"open":e!==null?(history.pushState(null,"ui-drawer",location.href),this.dispatchEvent(new Event("open"))):this.dispatchEvent(new Event("close"));break}}};xt([h({type:String,attribute:"width",reflect:!0})],X.prototype,"width",2),xt([h({type:Boolean,attribute:"open",reflect:!0})],X.prototype,"open",2),X=xt([b("ui-drawer")],X);const Qe=X;var tr=Object.defineProperty,er=Object.getOwnPropertyDescriptor,rr=(s,t,e,i)=>{for(var r=i>1?void 0:i?er(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&tr(t,e,r),r};let St=class extends u{static get styles(){return y`
            * {
                box-sizing: border-box;
            }

            :host {
                width: 100%;

                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
            }

            ::slotted(*) {
                width: 100%;
            }
        `}render(){return _`<slot></slot>`}};St=rr([b("ui-drawer-group-item")],St);const ir=St;var sr=Object.defineProperty,or=Object.getOwnPropertyDescriptor,Y=(s,t,e,i)=>{for(var r=i>1?void 0:i?or(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&sr(t,e,r),r};const Vt="0";let D=class extends u{constructor(){super(...arguments),this.gap=Vt}static get styles(){return y`
            :host {
                display: flex !important;
                flex-direction: column !important;
                flex-flow: column var(--_wrap, nowrap);
                justify-content: var(--_justify);
                align-items: var(--_align);

                position: relative;
                width: 100%;
                height: fit-content;

                gap: var(--_gap);
            }
        `}render(){return _`<slot></slot>`}attributeChangedCallback(s,t,e){switch(super.attributeChangedCallback(s,t,e),s){case"gap":e?this.style.setProperty("--_gap",e||Vt):this.style.removeProperty("--_gap");break;case"justify":e?this.style.setProperty("--_justify",e||""):this.style.removeProperty("--_justify");break;case"align":e?this.style.setProperty("--_align",e||""):this.style.removeProperty("--_align");break;case"wrap":e?this.style.setProperty("--_wrap",e||""):this.style.removeProperty("--_wrap");break}}};Y([h({type:String,attribute:"gap"})],D.prototype,"gap",2),Y([h({type:String,attribute:"justify"})],D.prototype,"justify",2),Y([h({type:String,attribute:"align"})],D.prototype,"align",2),Y([h({type:String,attribute:"wrap"})],D.prototype,"wrap",2),D=Y([b("ui-flex-grid")],D);const nr=D;var ar=Object.defineProperty,lr=Object.getOwnPropertyDescriptor,J=(s,t,e,i)=>{for(var r=i>1?void 0:i?lr(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&ar(t,e,r),r};const At=1;c.UIFlexGridItem=class extends u{constructor(){super(...arguments),this.flex=At}static get styles(){return y`
            :host {
                flex: var(--_flex, ${At});
                display: flex;
                flex-direction: var(--_direction, row);
                justify-content: var(--_justify);
                align-items: var(--_align);
            }

            ::slotted(*) {
                flex-grow: 1;
            }
        `}render(){return _`<slot></slot>`}attributeChangedCallback(t,e,i){switch(super.attributeChangedCallback(t,e,i),t){case"flex":this.style.setProperty("--_flex",i||At.toString());break;case"direction":i?this.style.setProperty("--_direction",i):this.style.removeProperty("--_direction");break;case"justify":i?this.style.setProperty("--_justify",i):this.style.removeProperty("--_justify");break;case"align":i?this.style.setProperty("--_align",i):this.style.removeProperty("--_align");break}}},J([h({type:Number,attribute:"flex"})],c.UIFlexGridItem.prototype,"flex",2),J([h({type:String,attribute:"direction",reflect:!0})],c.UIFlexGridItem.prototype,"direction",2),J([h({type:String,attribute:"justify"})],c.UIFlexGridItem.prototype,"justify",2),J([h({type:String,attribute:"align"})],c.UIFlexGridItem.prototype,"align",2),c.UIFlexGridItem=J([b("ui-flex-grid-item")],c.UIFlexGridItem);var cr=Object.defineProperty,hr=Object.getOwnPropertyDescriptor,Z=(s,t,e,i)=>{for(var r=i>1?void 0:i?hr(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&cr(t,e,r),r};const Wt="0.25rem";let I=class extends u{constructor(){super(...arguments),this.gap=Wt}static get styles(){return y`
            :host {
                display: flex;
                flex-direction: row;
                flex-flow: row var(--_wrap, nowrap);

                justify-content: var(--_justify);
                align-items: var(--_align);

                width: 100%;
                min-height: fit-content;

                gap: var(--_gap, 0.25rem);
            }
        `}render(){return _`<slot></slot>`}attributeChangedCallback(s,t,e){switch(super.attributeChangedCallback(s,t,e),s){case"gap":e?this.style.setProperty("--_gap",e||Wt):this.style.removeProperty("--_gap");break;case"justify":e?this.style.setProperty("--_justify",e||""):this.style.removeProperty("--_justify");break;case"align":e?this.style.setProperty("--_align",e||""):this.style.removeProperty("--_align");break;case"wrap":e===null?this.style.removeProperty("--_wrap"):this.style.setProperty("--_wrap","wrap");break}}};Z([h({type:String,attribute:"gap",reflect:!0})],I.prototype,"gap",2),Z([h({type:String,attribute:"justify",reflect:!0})],I.prototype,"justify",2),Z([h({type:String,attribute:"align",reflect:!0})],I.prototype,"align",2),Z([h({type:Boolean,attribute:"wrap",reflect:!0})],I.prototype,"wrap",2),I=Z([b("ui-flex-grid-row")],I);const dr=I;var ur=Object.defineProperty,pr=Object.getOwnPropertyDescriptor,st=(s,t,e,i)=>{for(var r=i>1?void 0:i?pr(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&ur(t,e,r),r};let k=class extends u{constructor(){super(...arguments),this.name="",this.href="",this.fallback=!1}static get styles(){return y`
            :host {
                display: none;
            }
        `}};st([h({type:String,attribute:"name",reflect:!0})],k.prototype,"name",2),st([h({type:String,attribute:"href",reflect:!0})],k.prototype,"href",2),st([h({type:Boolean,attribute:"fallback",reflect:!0})],k.prototype,"fallback",2),k=st([b("ui-lang-type")],k);const fr=k;var gr=Object.defineProperty,vr=Object.getOwnPropertyDescriptor,Xt=(s,t,e,i)=>{for(var r=i>1?void 0:i?vr(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&gr(t,e,r),r};let ot=class extends u{constructor(){super(...arguments),this.data={},this.events=new Q,this.current=""}static get styles(){return y`
            :host {
                display: none;
            }
        `}render(){return _`<slot></slot>`}attributeChangedCallback(s,t,e){switch(super.attributeChangedCallback(s,t,e),s){case"current":this.setCurrent(e||"");break}}fallback(){return this.querySelector("ui-lang-type[fallback]")}get(s,t){var e,i;return((i=(e=this.data)==null?void 0:e[s])==null?void 0:i[t])||null}async setCurrent(s){const t=(s!==""?this.querySelector(`ui-lang-type[name="${s}"]`):this.fallback())||this.fallback();if(t){if(!t.href)throw"Missing href attribute!";try{this.data=await(await fetch(t.href)).json()}catch(e){console.error(e)}this.events.dispatch("change",t)}}};Xt([h({type:String,attribute:"current",reflect:!0})],ot.prototype,"current",2),ot=Xt([b("ui-lang")],ot);const yr=ot;var br=Object.defineProperty,mr=Object.getOwnPropertyDescriptor,Yt=(s,t,e,i)=>{for(var r=i>1?void 0:i?mr(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&br(t,e,r),r};let nt=class extends u{constructor(){super(...arguments),this.nobg=!1}static get styles(){return y`
            :host {
                position: absolute !important;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
            }

            .background {
                display: "block";

                z-index: 999;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;

                background-color: var(--ui-backdrop);
                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
            }

            :host([nobg]) .background {
                display: none;
            }

            .spinner {
                content: "";
                box-sizing: border-box;

                z-index: 1000;
                position: absolute;
                top: 50%;
                left: 50%;
                width: 2.5rem;
                height: 2.5rem;

                margin-top: -1.25rem;
                margin-left: -1.25rem;

                border: 2px solid var(--ui-borderColor);
                border-top-color: var(--ui-primary);
                border-radius: 50%;

                animation: spinner 0.6s linear infinite;
            }

            @keyframes spinner {
                to {
                    transform: rotate(360deg);
                }
            }
        `}render(){return _`
            <div class="background"></div>
            <div class="spinner"></div>
        `}};Yt([h({type:Boolean,attribute:"nobg",reflect:!0})],nt.prototype,"nobg",2),nt=Yt([b("ui-spinner")],nt);const _r=nt;var $r=Object.defineProperty,wr=Object.getOwnPropertyDescriptor,Pr=(s,t,e,i)=>{for(var r=i>1?void 0:i?wr(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&$r(t,e,r),r};let Et=class extends u{constructor(){super(...arguments),this.events=new Q,this.stack=[],this.onpopstate=()=>{if(this.stack.length===0){this.dispatchChangeEvent(null);return}const s=this.removeChild(this.stack.pop());this.stack.length>0&&(this.stack[this.stack.length-1].parentElement||this.appendChild(this.stack[this.stack.length-1])),this.dispatchChangeEvent(s)},this.pages={},this.lockNavigation=!1}static get styles(){return y`
            :host {
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
            }
        `}render(){return _`<slot></slot>`}connectedCallback(){super.connectedCallback(),window.addEventListener("popstate",this.onpopstate)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.onpopstate)}stackSize(){return this.stack.length}clearStack(){for(;this.stack.length>0;)this.removeChild(this.stack.pop());this.dispatchChangeEvent(null)}goBack(){this.stack.length===0||this.lockNavigation||history.back()}registerPage(s,t){this.pages[s]=t}unregisterPage(s){delete this.pages[s]}async setPage(s,t=null,e=!1){var o;if(this.lockNavigation)return;if(!(s in this.pages))throw new Error(`page "${s}" not found`);const i=await this.pages[s]();this.stack.push(this.appendChild(i)),typeof t=="function"&&t(i);let r=null;this.stack.length>1&&!e&&(r=this.stack[this.stack.length-2],(o=r.parentElement)==null||o.removeChild(r)),this.dispatchChangeEvent(r),this.onpopstate!==null&&history.pushState(null,document.title,location.href)}async dispatchChangeEvent(s){this.events.dispatch("change",{old:s||this.stack[this.stack.length-2]||null,current:this.stack[this.stack.length-1]||null})}};Et=Pr([b("ui-stack-layout")],Et);const xr=Et;var Sr=Object.defineProperty,Ar=Object.getOwnPropertyDescriptor,Jt=(s,t,e,i)=>{for(var r=i>1?void 0:i?Ar(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Sr(t,e,r),r};let at=class extends u{constructor(){super(...arguments),this.name=""}static get styles(){return y`
            :host {
                display: block;

                position: absolute !important;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;

                opacity: 0;

                transition: opacity 0.5s ease;
                animation: fade-in 0.5s;
            }

            :host(:last-child) {
                opacity: 1;
            }

            @keyframes fade-in {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
        `}render(){return _`<slot></slot>`}};Jt([h({type:String,attribute:"name",reflect:!0})],at.prototype,"name",2),at=Jt([b("ui-stack-layout-page")],at);const Er=at;var Cr=Object.defineProperty,Or=Object.getOwnPropertyDescriptor,Ct=(s,t,e,i)=>{for(var r=i>1?void 0:i?Or(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Cr(t,e,r),r};let K=class extends u{constructor(){super(...arguments),this.data={},this.events=new Q,this.storage=!1,this.storagePrefix=""}static get styles(){return y`
            :host {
                display: none;
            }
        `}getData(s){if(this.storage){const t=localStorage.getItem(`${this.storagePrefix}${s}`);if(t!==null)return JSON.parse(t)}if(this.data.hasOwnProperty(s))return this.data[s]}setData(s,t,e=!1){if(e&&this.storage){const i=localStorage.getItem(`${this.storagePrefix}${s}`);i!==null?this.data[s]=JSON.parse(i):this.data.hasOwnProperty(s)||(this.data[s]=t)}else this.data[s]=t;this.storage&&localStorage.setItem(`${this.storagePrefix}${s}`,JSON.stringify(this.data[s])),this.events.dispatch(s,this.data[s])}updateData(s,t){const e=this.getData(s);if(e===void 0)throw new Error(`"${s}" not found, use \`setData\``);this.setData(s,t(e))}addListener(s,t,e=!1){if(e){const i=this.getData(s);i!==void 0&&setTimeout(()=>t(i))}return this.events.addListener(s,t)}};Ct([h({type:Boolean,attribute:"storage",reflect:!0})],K.prototype,"storage",2),Ct([h({type:String,attribute:"storage-prefix",reflect:!0})],K.prototype,"storagePrefix",2),K=Ct([b("ui-store")],K);const Ur=K;c.CleanUp=Qt,c.Events=Q,c.UIAlert=Te,c.UIAlerts=Be,c.UIAppBar=He,c.UIAppBarItem=Ge,c.UIDialog=We,c.UIDrawer=Qe,c.UIDrawerGroup=qt,c.UIDrawerGroupItem=ir,c.UIFlexGrid=nr,c.UIFlexGridRow=dr,c.UILang=yr,c.UILangType=fr,c.UISpinner=_r,c.UIStackLayout=xr,c.UIStackLayoutPage=Er,c.UIStore=Ur,c.addGlobalStylesToShadowRoot=ct,c.css=le,c.draggable=se,c.html=ae,c.isAndroid=ce,c.ripple=ne,c.styles=he,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});
