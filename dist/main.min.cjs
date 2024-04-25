"use strict";var At=Object.defineProperty;var $t=(o,e,t)=>e in o?At(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var d=(o,e,t)=>($t(o,typeof e!="symbol"?e+"":e,t),t),_=(o,e,t)=>{if(!e.has(o))throw TypeError("Cannot "+t)};var i=(o,e,t)=>(_(o,e,"read from private field"),t?t.call(o):e.get(o)),r=(o,e,t)=>{if(e.has(o))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(o):e.set(o,t)},l=(o,e,t,s)=>(_(o,e,"write to private field"),s?s.call(o,t):e.set(o,t),t);var p=(o,e,t)=>(_(o,e,"access private method"),t);class B{constructor(e=!1){d(this,"listeners");this.debug=!!e,this.listeners={}}dispatchWithData(e,t){if(this.debug&&console.log(`[events] dispatchWithData: key=${e}`,t),t===void 0)throw"data is undefined!";if(this.listeners[e])for(const s of this.listeners[e])s(t);return this}addListener(e,t){if(this.debug&&console.log(`[events] addListener: key=${e}, listener=${t}`),typeof t!="function")throw`invalid event listener passed for "${e}" event!`;return this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t),()=>{this.removeListener(e,t)}}removeListener(e,t){if(this.debug&&console.log(`[events] removeListener: key=${e}, listener=${t}`),!this.listeners[e])throw`no listeners found for ${e}, there is nothing to delete`;let s=!1,n=0;for(const m of this.listeners[e])m===t&&(this.listeners[e].splice(n,1),s=!0),n++;if(!s)throw`listener not found for ${e}, there is nothing to delete`;return this}}const Rt=Object.freeze(Object.defineProperty({__proto__:null,Events:B},Symbol.toStringTag,{value:"Module"})),jt={color:"currentColor",opacity:.2,centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out"};function F(o,e){e={...jt,...e};const t=document.createElement("div");t.classList.add("ripple"),t.style.position="absolute",t.style.color="inherit",t.style.borderRadius="50%",t.style.pointerEvents="none",t.style.width="100px",t.style.height="100px",t.style.marginTop="-50px",t.style.marginLeft="-50px",t.style.opacity=`${e.opacity}`,t.style.backgroundColor=e.color,t.style.transform="scale(0) translate(0, 0)",t.style.transition=`transform ${e.spreadDuration} ${e.spreadTiming} 0s,opacity ${e.clearDuration} ${e.clearTiming} 0s`,o.currentTarget.appendChild(t);const s=o.currentTarget.getBoundingClientRect();e.centered?(t.style.top=`${s.height/2}px`,t.style.left=`${s.width/2}px`):(t.style.top=`${o.clientY-s.top}px`,t.style.left=`${o.clientX-s.left}px`);const n=Math.max(s.width,s.height)*.02;return t.style.transform=`scale(${n}) translate(0, 0)`,t}function W(o){o&&(o.addEventListener("transitionend",e=>{e.propertyName==="opacity"&&o.remove()}),o.style.opacity="0")}function O(o,e={}){let t;const s=m=>{t=F(m,e)},n=()=>{W(t)};return o.classList.add("ripple-container"),o.style.overflow="hidden",o.addEventListener("pointerdown",s),o.addEventListener("pointerup",n),o.addEventListener("pointerleave",n),()=>{o.classList.remove("ripple-container"),o.removeEventListener("pointerdown",s),o.removeEventListener("pointerup",n),o.removeEventListener("pointerleave",n)}}const Nt=Object.freeze(Object.defineProperty({__proto__:null,create:O,start:F,stop:W},Symbol.toStringTag,{value:"Module"}));function Pt(){return/(android)/i.test(navigator.userAgent)}const Dt=Object.freeze(Object.defineProperty({__proto__:null,isAndroid:Pt},Symbol.toStringTag,{value:"Module"})),zt=Object.freeze(Object.defineProperty({__proto__:null,events:Rt,ripple:Nt,utils:Dt},Symbol.toStringTag,{value:"Module"})),V=document.createElement("template");V.innerHTML=`
<style>
    :host {
        display: flex;
        position: absolute;
        z-index: 100;
        background-color: hsla(var(--bg), .2);
        backdrop-filter: blur(5px);
        overflow: hidden;
        user-select: none;
    }

    :host([position="top"]) {
        top: 0;
        left: 0;
        width: 100%;
        height: var(--app-bar-height);
        border-bottom: var(--border-width) var(--border-style) hsl(var(--border));
    }

    :host > ui-flex-grid-row {
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: space-between;
    }

    :host > ui-flex-grid-row > * {
        height: 100%;
    }

    :host > ui-flex-grid-row > *:nth-child(1),
    :host > ui-flex-grid-row > *:nth-child(3) {
        width: fit-content;
    }

    :host > ui-flex-grid-row > [slot="left"] {
        margin-left: 0;
    }

    :host > ui-flex-grid-row > [slot="center"] {
        width: 100%;
    }

    :host > ui-flex-grid-row > [slot="right"] {
        margin-right: 0;
        justify-content: flex-end;
    }
</style>

<ui-flex-grid-row gap="0.25rem">
    <ui-flex-grid-row gap="0.25rem">
        <slot name="left"></slot>
    </ui-flex-grid-row>

    <ui-flex-grid-row gap="0.25rem" style="overflow: hidden;">
        <slot name="center"></slot>
    </ui-flex-grid-row>

    <ui-flex-grid-row gap="0.25rem">
        <slot name="right"></slot>
    </ui-flex-grid-row>
</ui-flex-grid-row>
`;class G extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(V.content.cloneNode(!0))}}const J=document.createElement("template");J.innerHTML=`
<style>
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: var(--spacing) calc(var(--spacing) * 2.5);
        border: var(--border-width) var(--border-style) currentColor;
        border-radius: var(--radius);
        overflow: hidden;
        font-family: var(--font-family);
        font-weight: bold;
        text-transform: capitalize;
        cursor: pointer;
        outline: none;
        user-select: none;
    }

    :host([variant="full"]) {
        border: none;
    }

    :host([variant="full"][color="primary"]) {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-fg));
    }

    :host([variant="full"][color="secondary"]) {
        background-color: hsl(var(--secondary));
        color: hsl(var(--secondary-fg));
    }

    :host([variant="full"][color="destructive"]) {
        background-color: hsl(var(--destructive));
        color: hsl(var(--destructive-fg));
    }

    :host([variant="outline"]) {
        border-color: currentColor;
        background-color: transparent;
    }

    :host([variant="outline"][color="primary"]) {
        color: hsl(var(--primary));
    }

    :host([variant="outline"][color="secondary"]) {
        color: hsl(var(--secondary));
    }

    :host([variant="outline"][color="destructive"]) {
        color: hsl(var(--destructive));
    }

    :host([variant="ghost"]) {
        border-color: transparent;
        background-color: transparent;
    }

    :host([variant="ghost"][color="primary"]) {
        color: hsl(var(--primary));
    }

    :host([variant="ghost"][color="secondary"]) {
        color: hsl(var(--secondary));
    }

    :host([variant="ghost"][color="destructive"]) {
        color: hsl(var(--destructive));
    }

    :host(:disabled),
    :host(:disabled:hover),
    :host(:disabled:active) {
        background-color: transparent;
        opacity: 0.25;
        cursor: default;
    }
</style>

<slot></slot>
`;class X extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(J.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("no-ripple")||O(this)}}const Y=document.createElement("template");Y.innerHTML=`
<style>
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 2.5em;
        height: 2.5em;
        padding: var(--spacing);
        border: var(--border-width) var(--border-style) hsl(var(--border));
        border-radius: var(--radius);
        outline: none;
        overflow: hidden;
        font-family: var(--font-family);
        cursor: pointer;
        user-select: none;
    }

    :host([ghost]) {
        border-color: transparent !important;
        box-shadow: none;
    }

    :host([color="primary"]) {
        color: hsl(var(--primary));
        border-color: hsl(var(--primary));
    }

    :host([color="secondary"]) {
        color: hsl(var(--secondary));
        border-color: hsl(var(--secondary));
    }

    :host([color="destructive"]) {
        color: hsl(var(--destructive));
        border-color: hsl(var(--destructive));
    }

    /* :disabled */

    :host(:disabled),
    :host(:disabled:hover),
    :host(:disabled:active) {
        opacity: 0.25;
        cursor: default;
    }
</style>

<slot></slot>
`;class K extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Y.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("no-ripple")||O(this,{centered:!0})}}const Q=document.createElement("template");Q.innerHTML=`
<style>
    :host {
        display: block;
        width: 100%;
        max-width: 65em;
        margin: 0 auto;
        padding: var(--spacing);
    }
</style>

<slot></slot>
`;class U extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Q.content.cloneNode(!0))}}const tt=document.createElement("template");tt.innerHTML=`
<style>
    :host {
        flex: 1;
    }
</style>

<slot></slot>
`;class et extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(tt.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("flex")&&this.style.setProperty("flex",this.getAttribute("flex"))}}const ot=document.createElement("template");ot.innerHTML=`
<style>
    :host {
        display: flex;
        flex-flow: row nowrap;
        position: relative;
        width: 100%;
    }

    :host ::slotted(ui-flex-grid-item) {
        margin: 0 var(--row-gap);
    }

    :host ::slotted(ui-flex-grid-item:first-child) {
        margin-left: 0;
    }

    :host ::slotted(ui-flex-grid-item:last-child) {
        margin-right: 0;
    }
</style>

<slot></slot>
`;class st extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ot.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("gap")&&this.style.setProperty("--row-gap",this.getAttribute("gap"))}}const it=document.createElement("template");it.innerHTML=`
<style>
    :host {
        display: flex;
        flex-flow: column nowrap;
        position: relative;
        width: 100%;
        height: fit-content;
    }

    :host ::slotted(ui-flex-grid-row) {
        margin: var(--gap, 0) 0;
    }

    :host ::slotted(ui-flex-grid-row:first-child) {
        margin-top: 0;
    }

    :host ::slotted(ui-flex-grid-row:last-child) {
        margin-bottom: 0;
    }
</style>

<slot></slot>
`;class nt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(it.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("gap")&&this.style.setProperty("--gap",this.getAttribute("gap"))}}const rt=document.createElement("template");rt.innerHTML=`
<style>
    :host {
        display: none;
        padding: var(--spacing);
        padding-right: 2.5em;
        font-family: var(--font-family);
        transition: background-color 0.25s linear;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

<slot></slot>
`;class q extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(rt.content.cloneNode(!0)),this.type="ui-select-option"}get value(){return this.getAttribute("value")||""}get selected(){return this.hasAttribute("selected")}set selected(e){e?this.setAttribute("selected",""):this.removeAttribute("selected")}}const lt=document.createElement("template");lt.innerHTML=`
<style>
    :host {
        --items-length: 0;
        position: relative; 
        display: block;
        width: 100%;
        height: calc(1em * var(--line-height) + var(--spacing) * 2);
        border: var(--border-width) var(--border-style) hsl(var(--border));
        border-radius: var(--radius);
        font-size: 0.95em;
        transition: height 0.25s ease;
        line-height: 1.15;
        box-sizing: content-box !important;
        overflow: hidden;
    }

    .options {
        cursor: pointer;
        display: none;
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        width: 2.5em;
        height: 100%;
        color: hsl(var(--primary));
    }

    ::slotted(ui-select-option) {
        display: block;
    }

    :host(.open) {
        height: calc(
            (var(--spacing) * 2 + (1em * 1.15)) * var(--items-length)
        );
    }

    :host(.open) .options {
        display: block;
    }

    :host(.open) .icon {
        display: none;
    }

    :host(.open) ::slotted(ui-select-option[selected]) {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-fg));
    }

    :host(.open) ::slotted(ui-select-option:not([selected]):hover) {
        background-color: hsl(var(--fg), 0.1);
    }

    :host(:not(.open)) .options:has(> ::slotted(ui-select-option[selected])) {
        display: block;
    }

    :host(:not(.open)) ::slotted(ui-select-option:not([selected])) {
        display: none;
    }
</style>

<div class="options">
    <div class="icon"><ui-icon-chevron-down></ui-icon-chevron-down></div>

    <slot></slot>
</div>
`;var g,k,f;class at extends HTMLElement{constructor(){super();r(this,g,!1);r(this,k,t=>{this.classList.toggle("open")?(t.stopPropagation(),this.addEventListener("click",i(this,f))):setTimeout(()=>this.removeEventListener("click",i(this,f)))});r(this,f,t=>{(t.composedPath()||[]).forEach(s=>{s instanceof q&&([...this.querySelectorAll("ui-select-option")].forEach(n=>n.removeAttribute("selected")),s.setAttribute("selected",""),this.dispatchEvent(new CustomEvent("change",{detail:s})))})});this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(lt.content.cloneNode(!0))}connectedCallback(){var t;i(this,g)||((t=this.shadowRoot.querySelector(".options"))==null||t.addEventListener("click",i(this,k)),l(this,g,!0)),this.style.setProperty("--items-length",this.querySelectorAll("ui-select-option").length.toString())}disconnectedCallback(){var t;this.removeEventListener("click",i(this,f)),(t=this.shadowRoot.querySelector(".options"))==null||t.addEventListener("click",i(this,k)),l(this,g,!1)}}g=new WeakMap,k=new WeakMap,f=new WeakMap;var v,C,I;let Bt=(I=class{constructor(){r(this,v,void 0);r(this,C,void 0);l(this,v,new B),this.langType=null}new(e,t){this.langType=e,l(this,C,t),i(this,v).dispatchWithData("change",this.langType)}get(e,t){var s;return(s=i(this,C))==null?void 0:s[e][t]}on(e,t,s=!1){if(typeof t!="function")throw"callback is not a function";return s&&t(this.langType),i(this,v).addListener(e,t)}},v=new WeakMap,C=new WeakMap,I);var R,ht;class ct extends HTMLElement{constructor(){super();r(this,R);this.data=new Bt}set current(t){this.setAttribute("current",t),p(this,R,ht).call(this,t)}get current(){return this.getAttribute("current")}get fallback(){return this.querySelector("ui-lang-type[fallback]")}connectedCallback(){this.current=this.current}}R=new WeakSet,ht=async function(t){const s=this.querySelector(`ui-lang-type[name="${t}"]`)||this.fallback;if(!s)return;if(!s.href)throw"Missing href attribute!";const n=await fetch(s.href);this.data.new(s,await n.json())};class dt extends HTMLElement{constructor(){super()}set name(e){this.setAttribute("name",e)}get name(){return this.getAttribute("name")}set href(e){this.setAttribute("href",e)}get href(){return this.getAttribute("href")}set fallback(e){e?this.setAttribute("fallback",""):this.removeAttribute("fallback")}get fallback(){return this.hasAttribute("fallback")}}const ut=document.createElement("template");ut.innerHTML=`
    <style>
        :host {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            animation: fade-in 0.5s;
            transition: opacity 0.5s ease;
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
    </style>

    <slot></slot>
`;class pt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ut.content.cloneNode(!0))}get name(){return this.getAttribute("name")||""}get title(){return this.getAttribute("title")||""}connectedCallback(){}disconnectedCallback(){}}const mt=document.createElement("template");mt.innerHTML=`
    <style>
        :host {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
        }
    </style>

    <slot></slot>
`;var w,E,Z;class gt extends HTMLElement{constructor(){super();r(this,E);r(this,w,{});this.events=new B,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(mt.content.cloneNode(!0)),this.stack=[]}registerPage(t,s){i(this,w)[t]=s}unregisterPage(t){delete i(this,w)[t]}goBack(){if(!this.stack.length)return;const t=this.stack.pop();t.element.ontransitionend=()=>{t.element.ontransitionend=null,this.removeChild(t.element)},this.stack.length&&this.appendChild(this.stack[this.stack.length-1].element),p(this,E,Z).call(this)}setPage(t){if(this.stack.push({name:t,element:this.appendChild(i(this,w)[t]().children[0])}),this.stack.length>1){const s=this.stack[this.stack.length-2].element;s.ontransitionend=()=>{s.ontransitionend=null,s.parentElement.removeChild(s)}}p(this,E,Z).call(this)}}w=new WeakMap,E=new WeakSet,Z=async function(){var t,s;this.events.dispatchWithData("change",{newPage:((t=this.stack[this.stack.length-1])==null?void 0:t.element)||null,oldPage:((s=this.stack[this.stack.length-2])==null?void 0:s.element)||null})};var y,c;class Ot{constructor(e){r(this,y,void 0);r(this,c,void 0);l(this,c,e),l(this,y,new B),this.localStoragePrefix="",this.enableLocalStorage=!1}get(e){return i(this,c).stores[e]}set(e,t,s=!1){if(s&&this.enableLocalStorage){const n=JSON.parse(localStorage.getItem(this.localStoragePrefix+e)||"null");i(this,c).stores[e]=n??t}else i(this,c).stores[e]=t;this.enableLocalStorage&&localStorage.setItem(this.localStoragePrefix+e,JSON.stringify(i(this,c).stores[e])),i(this,y).dispatchWithData(e,i(this,c).stores[e])}update(e,t){if(typeof t!="function")throw"callback is not a function";this.set(e,t(i(this,c).stores[e]))}on(e,t,s=!1){if(typeof t!="function")throw"callback is not a function";return s&&t(this.get(e)),i(this,y).addListener(e,t)}}y=new WeakMap,c=new WeakMap;class ft extends HTMLElement{constructor(){super(),this.data=new Ot(this),this.stores={}}connectedCallback(){this.hasAttribute("enable-local-storage")&&(this.data.enableLocalStorage=!0),this.hasAttribute("local-storage-prefix")&&(this.data.localStoragePrefix=this.getAttribute("local-storage-prefix"))}}const vt=document.createElement("template");vt.innerHTML=`
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 52 52"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z"
    />
</svg>
`;class _t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(vt.content.cloneNode(!0))}}const wt=document.createElement("template");wt.innerHTML=`
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <rect width="24" height="24" fill="none" />
    <path
        d="M17 9.5L12 14.5L7 9.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
`;class Zt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(wt.content.cloneNode(!0))}}const yt=document.createElement("template");yt.innerHTML=`
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z"
        fill="currentColor"
    />
    <path
        d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z"
        fill="currentColor"
    />
</svg>
`;class qt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(yt.content.cloneNode(!0))}}const bt=document.createElement("template");bt.innerHTML=`
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M21 21H12"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    /></svg
>;
`;class It extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(bt.content.cloneNode(!0))}}const xt=document.createElement("template");xt.innerHTML=`
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor" transform="translate(85.333333, 42.666667)">
            <path
                d="M75.9466667,285.653333 C63.8764997,278.292415 49.6246897,275.351565 35.6266667,277.333333 L1.42108547e-14,277.333333 L1.42108547e-14,405.333333 L28.3733333,405.333333 L28.3733333,356.48 L40.5333333,356.48 C53.1304778,357.774244 65.7885986,354.68506 76.3733333,347.733333 C85.3576891,340.027178 90.3112817,328.626053 89.8133333,316.8 C90.4784904,304.790173 85.3164923,293.195531 75.9466667,285.653333 L75.9466667,285.653333 Z M53.12,332.373333 C47.7608867,334.732281 41.8687051,335.616108 36.0533333,334.933333 L27.7333333,334.933333 L27.7333333,298.666667 L36.0533333,298.666667 C42.094796,298.02451 48.1897668,299.213772 53.5466667,302.08 C58.5355805,305.554646 61.3626692,311.370371 61.0133333,317.44 C61.6596233,323.558965 58.5400493,329.460862 53.12,332.373333 L53.12,332.373333 Z M150.826667,277.333333 L115.413333,277.333333 L115.413333,405.333333 L149.333333,405.333333 C166.620091,407.02483 184.027709,403.691457 199.466667,395.733333 C216.454713,383.072462 225.530463,362.408923 223.36,341.333333 C224.631644,323.277677 218.198313,305.527884 205.653333,292.48 C190.157107,280.265923 170.395302,274.806436 150.826667,277.333333 L150.826667,277.333333 Z M178.986667,376.32 C170.098963,381.315719 159.922142,383.54422 149.76,382.72 L144.213333,382.72 L144.213333,299.946667 L149.333333,299.946667 C167.253333,299.946667 174.293333,301.653333 181.333333,308.053333 C189.877212,316.948755 194.28973,329.025119 193.493333,341.333333 C194.590843,354.653818 189.18793,367.684372 178.986667,376.32 L178.986667,376.32 Z M254.506667,405.333333 L283.306667,405.333333 L283.306667,351.786667 L341.333333,351.786667 L341.333333,329.173333 L283.306667,329.173333 L283.306667,299.946667 L341.333333,299.946667 L341.333333,277.333333 L254.506667,277.333333 L254.506667,405.333333 L254.506667,405.333333 Z M234.666667,7.10542736e-15 L9.52127266e-13,7.10542736e-15 L9.52127266e-13,234.666667 L42.6666667,234.666667 L42.6666667,192 L42.6666667,169.6 L42.6666667,42.6666667 L216.96,42.6666667 L298.666667,124.373333 L298.666667,169.6 L298.666667,192 L298.666667,234.666667 L341.333333,234.666667 L341.333333,106.666667 L234.666667,7.10542736e-15 L234.666667,7.10542736e-15 Z"
            ></path>
        </g>
    </g></svg
>
`;class Ft extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(xt.content.cloneNode(!0))}}const Lt=document.createElement("template");Lt.innerHTML=`
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 -0.5 21 21"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
>
    <defs></defs>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-259.000000, -840.000000)" fill="currentColor">
            <g transform="translate(56.000000, 160.000000)">
                <path
                    d="M211.261065,690.694762 C209.623062,692.25443 206.966811,692.25443 205.328807,690.694762 L203.614251,689.062203 C202.79525,688.282368 202.79525,687.018258 203.614251,686.238424 C204.433253,685.45859 205.761903,685.45859 206.580905,686.238424 C207.721845,687.3248 208.972894,687.224949 209.777214,686.458096 C210.587827,685.686249 210.685352,684.498026 209.541266,683.409653 C208.722264,682.629819 208.722264,681.36471 209.541266,680.584876 C210.361317,679.805041 211.688918,679.805041 212.50792,680.584876 L214.22667,682.221429 C215.864674,683.781098 215.864674,686.310317 214.22667,687.869985 L223.356286,696.563988 C225.318325,698.431197 222.350623,701.253977 220.390682,699.387767 L211.261065,690.694762 Z"
                ></path>
            </g>
        </g>
    </g>
</svg>
`;class Wt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Lt.content.cloneNode(!0))}}const kt=document.createElement("template");kt.innerHTML=`
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
>
    <rect
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        x="48"
        y="80"
        width="416"
        height="384"
        rx="48"
    />
    <line
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        stroke-linecap="round"
        x1="128"
        y1="48"
        x2="128"
        y2="80"
    />
    <line
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        stroke-linecap="round"
        x1="384"
        y1="48"
        x2="384"
        y2="80"
    />
    <rect
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        stroke-linecap="round"
        x="112"
        y="224"
        width="96"
        height="96"
        rx="13"
    />
    <line
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        stroke-linecap="round"
        x1="464"
        y1="160"
        x2="48"
        y2="160"
    />
</svg>
`;class Vt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(kt.content.cloneNode(!0))}}const u={BackArrowNavigation:_t,ChevronDown:Zt,DeleteRecycleBin:qt,Edit2:It,PDFDocument:Ft,Settings:Wt,TodayOutline:Vt},Ct=document.createElement("template");Ct.innerHTML=`
<style>
    :host {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: calc(var(--spacing) / 4) calc(var(--spacing) / 2);
        border-radius: var(--radius);
    }

    :host > .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: fit-content;
        width: 100%;
        margin-right: var(--spacing);
    }

    :host > .input {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-width: fit-content;
        width: 100%;
    }
</style>

<span class="text">
    <slot name="primary"></slot>
    <slot name="secondary"></slot>
</span>

<span class="input">
    <slot name="input"></slot>
</span>

<slot></slot>
`;var h,b,M,T,j,Et,N,Mt;const x=class x extends HTMLElement{constructor(){super();r(this,j);r(this,N);r(this,h,null);r(this,b,!1);r(this,M,async()=>!!i(this,h)&&i(this,h).click());r(this,T,async t=>t.stopPropagation());this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Ct.content.cloneNode(!0))}attributeChangedCallback(t,s,n){switch(t){case"ripple":n!==null?this.enableRipple():this.disableRipple();break}}enableRipple(){O(this),this.style.cursor="pointer",p(this,j,Et).call(this)}disableRipple(){p(this,N,Mt).call(this)}};h=new WeakMap,b=new WeakMap,M=new WeakMap,T=new WeakMap,j=new WeakSet,Et=function(){i(this,b)||(l(this,h,this.querySelector("input")),i(this,h)&&(this.addEventListener("click",i(this,M)),i(this,h).addEventListener("click",i(this,T))),l(this,b,!0))},N=new WeakSet,Mt=function(){i(this,h)&&(this.removeEventListener("click",i(this,M)),i(this,h).removeEventListener("click",i(this,T))),l(this,b,!1)},d(x,"register",()=>customElements.define("ui-label",x)),d(x,"observedAttributes",["ripple"]);let S=x;const Tt=document.createElement("template");Tt.innerHTML=`
<style>
    :host {
        font-size: 1.1em;
        font-weight: normal;
    }
</style>

<slot></slot>
`;const P=class P extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Tt.content.cloneNode(!0))}};d(P,"register",()=>customElements.define("ui-primary",P));let H=P;const St=document.createElement("template");St.innerHTML=`
<style>
    :host {
        font-size: 0.9em;
        font-weight: 300;
        font-style: italic;
    }
</style>

<slot></slot>
`;const D=class D extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(St.content.cloneNode(!0))}};d(D,"register",()=>customElements.define("ui-secondary",D));let A=D;var a,z,Ht;const L=class L extends HTMLElement{constructor(){super();r(this,z);r(this,a,null);this.currentTheme=null,this.themes={}}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(t,s,n){switch(t){case"auto":n!==null?this.enableAutoMode():this.disableAutoMode();break;case"mode":n!==null?this.setMode(n):this.removeMode();break}}enableAutoMode(){if(this.removeMode(),i(this,a)){this.mediaChangeHandler(i(this,a));return}l(this,a,window.matchMedia("(prefers-color-scheme: dark)")),i(this,a).addEventListener("change",this.mediaChangeHandler),this.mediaChangeHandler(i(this,a))}disableAutoMode(){p(this,z,Ht).call(this)}addTheme(t,s){this.themes[t]=s}loadTheme(t){var n;if(!this.themes[t])throw`theme "${t}" is missing in this.themes`;if(((n=this.currentTheme)==null?void 0:n.name)==t)return;{const m=document.getElementById("theme");m&&(document.head.removeChild(m),this.currentTheme=null)}const s=document.createElement("link");s.id="theme",s.rel="stylesheet",s.href=this.themes[t],document.head.appendChild(s),this.currentTheme={name:t,href:this.themes[t]}}mediaChangeHandler(t){t.matches?document.body.setAttribute("data-theme","dark"):document.body.setAttribute("data-theme","light")}removeMode(t=document.body){t.removeAttribute("data-theme")}setMode(t,s=document.body){switch(t){case"dark":s.setAttribute("data-theme",t);break;case"light":s.setAttribute("data-theme",t);break}}};a=new WeakMap,z=new WeakSet,Ht=function(){i(this,a)&&(i(this,a).removeEventListener("change",this.mediaChangeHandler),l(this,a,null))},d(L,"register",()=>customElements.define("ui-theme-handler",L)),d(L,"observedAttributes",["auto","mode"]);let $=L;const Gt=Object.freeze(Object.defineProperty({__proto__:null,AppBar:G,Button:X,Container:U,FlexGrid:nt,FlexGridItem:et,FlexGridRow:st,IconButton:K,Label:S,Lang:ct,LangType:dt,Primary:H,Secondary:A,Select:at,SelectOption:q,StackLayout:gt,StackLayoutPage:pt,Store:ft,ThemeHandler:$,svg:u},Symbol.toStringTag,{value:"Module"}));async function Jt(){customElements.define("ui-app-bar",G),customElements.define("ui-icon-button",K),customElements.define("ui-button",X),customElements.define("ui-container",U),customElements.define("ui-flex-grid",nt),customElements.define("ui-flex-grid-row",st),customElements.define("ui-flex-grid-item",et),customElements.define("ui-select-option",q),customElements.define("ui-select",at),customElements.define("ui-lang-type",dt),customElements.define("ui-lang",ct),customElements.define("ui-stack-layout-page",pt),customElements.define("ui-stack-layout",gt),customElements.define("ui-store",ft),customElements.define("ui-icon-back-arrow-navigation",u.BackArrowNavigation),customElements.define("ui-icon-chevron-down",u.ChevronDown),customElements.define("ui-icon-delete-recycle-bin",u.DeleteRecycleBin),customElements.define("ui-icon-edit2",u.Edit2),customElements.define("ui-icon-pdf-document",u.PDFDocument),customElements.define("ui-icon-settings",u.Settings),customElements.define("ui-icon-today-outline",u.TodayOutline),A.register(),H.register(),S.register(),$.register()}const Xt={...zt,wc:Gt,define:Jt};module.exports=Xt;
