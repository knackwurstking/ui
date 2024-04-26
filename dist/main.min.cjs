"use strict";var bt=Object.defineProperty;var yt=(o,e,t)=>e in o?bt(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var r=(o,e,t)=>(yt(o,typeof e!="symbol"?e+"":e,t),t),He=(o,e,t)=>{if(!e.has(o))throw TypeError("Cannot "+t)};var i=(o,e,t)=>(He(o,e,"read from private field"),t?t.call(o):e.get(o)),l=(o,e,t)=>{if(e.has(o))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(o):e.set(o,t)},a=(o,e,t,s)=>(He(o,e,"write to private field"),s?s.call(o,t):e.set(o,t),t);var h=(o,e,t)=>(He(o,e,"access private method"),t);class qe{constructor(e=!1){r(this,"listeners");this.debug=!!e,this.listeners={}}dispatchWithData(e,t){if(this.debug&&console.log(`[events] dispatchWithData: key=${e}`,t),t===void 0)throw"data is undefined!";if(this.listeners[e])for(const s of this.listeners[e])s(t);return this}addListener(e,t){if(this.debug&&console.log(`[events] addListener: key=${e}, listener=${t}`),typeof t!="function")throw`invalid event listener passed for "${e}" event!`;return this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t),()=>{this.removeListener(e,t)}}removeListener(e,t){if(this.debug&&console.log(`[events] removeListener: key=${e}, listener=${t}`),!this.listeners[e])throw`no listeners found for ${e}, there is nothing to delete`;let s=!1,n=0;for(const Te of this.listeners[e])Te===t&&(this.listeners[e].splice(n,1),s=!0),n++;if(!s)throw`listener not found for ${e}, there is nothing to delete`;return this}}const xt=Object.freeze(Object.defineProperty({__proto__:null,Events:qe},Symbol.toStringTag,{value:"Module"})),Lt={color:"currentColor",opacity:.2,centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out"};function Je(o,e){e={...Lt,...e};const t=document.createElement("div");t.classList.add("ripple"),t.style.position="absolute",t.style.color="inherit",t.style.borderRadius="50%",t.style.pointerEvents="none",t.style.width="100px",t.style.height="100px",t.style.marginTop="-50px",t.style.marginLeft="-50px",t.style.opacity=`${e.opacity}`,t.style.backgroundColor=e.color,t.style.transform="scale(0) translate(0, 0)",t.style.transition=`transform ${e.spreadDuration} ${e.spreadTiming} 0s,opacity ${e.clearDuration} ${e.clearTiming} 0s`,o.currentTarget.appendChild(t);const s=o.currentTarget.getBoundingClientRect();e.centered?(t.style.top=`${s.height/2}px`,t.style.left=`${s.width/2}px`):(t.style.top=`${o.clientY-s.top}px`,t.style.left=`${o.clientX-s.left}px`);const n=Math.max(s.width,s.height)*.02;return t.style.transform=`scale(${n}) translate(0, 0)`,t}function Xe(o){o&&(o.addEventListener("transitionend",e=>{e.propertyName==="opacity"&&o.remove()}),o.style.opacity="0")}function Me(o,e={}){let t;const s=Te=>{t=Je(Te,e)},n=()=>{Xe(t)};return o.classList.add("ripple-container"),o.style.overflow="hidden",o.addEventListener("pointerdown",s),o.addEventListener("pointerup",n),o.addEventListener("pointerleave",n),()=>{o.classList.remove("ripple-container"),o.removeEventListener("pointerdown",s),o.removeEventListener("pointerup",n),o.removeEventListener("pointerleave",n)}}const Ct=Object.freeze(Object.defineProperty({__proto__:null,create:Me,start:Je,stop:Xe},Symbol.toStringTag,{value:"Module"}));function kt(){return/(android)/i.test(navigator.userAgent)}const Et=Object.freeze(Object.defineProperty({__proto__:null,isAndroid:kt},Symbol.toStringTag,{value:"Module"})),Mt=Object.freeze(Object.defineProperty({__proto__:null,events:xt,ripple:Ct,utils:Et},Symbol.toStringTag,{value:"Module"}));var m,Oe;let Tt=(Oe=class{constructor(e){l(this,m,void 0);a(this,m,e)}getLeftSlot(){return[...i(this,m).querySelectorAll('[slot="left"]')]}getCenterSlot(){return[...i(this,m).querySelectorAll('[slot="center"]')]}getRightSlot(){return[...i(this,m).querySelectorAll('[slot="right"]')]}},m=new WeakMap,Oe);const Ye=document.createElement("template");Ye.innerHTML=`
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
`;const ae=class ae extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Ye.content.cloneNode(!0)),this.ui=new Tt(this)}};r(ae,"register",()=>customElements.define("ui-app-bar",ae));let J=ae;const Ke=document.createElement("template");Ke.innerHTML=`
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
`;var j,Ze;let Ht=(Ze=class{constructor(e){l(this,j,void 0);a(this,j,e),this.removeRipple=null}enableRipple(){this.removeRipple||(this.removeRipple=Me(i(this,j),{centered:!0}))}disableRipple(){this.removeRipple&&this.removeRipple(),this.removeRipple=null}},j=new WeakMap,Ze);const y=class y extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Ke.content.cloneNode(!0)),this.ui=new Ht(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(e,t,s){switch(e){case"no-ripple":s!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r(y,"register",()=>customElements.define("ui-button",y)),r(y,"observedAttributes",["no-ripple"]);let X=y;const Qe=document.createElement("template");Qe.innerHTML=`
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
`;var N,Pe;let Rt=(Pe=class{constructor(e){l(this,N,void 0);a(this,N,e),this.removeRipple=null}enableRipple(){this.removeRipple||(this.removeRipple=Me(i(this,N),{centered:!0}))}disableRipple(){this.removeRipple&&this.removeRipple(),this.removeRipple=null}},N=new WeakMap,Pe);const x=class x extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Qe.content.cloneNode(!0)),this.ui=new Rt(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(e,t,s){switch(e){case"no-ripple":s!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r(x,"register",()=>customElements.define("ui-icon-button",x)),r(x,"observedAttributes",["no-ripple"]);let Y=x;const Be=document.createElement("template");Be.innerHTML=`
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
`;const ce=class ce extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Be.content.cloneNode(!0))}};r(ce,"register",()=>customElements.define("ui-container",ce));let K=ce;const Ge=document.createElement("template");Ge.innerHTML=`
<style></style>
<slot></slot>
`;var z,I,Re;const L=class L extends HTMLElement{constructor(){super();l(this,I);l(this,z,"1");this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Ge.content.cloneNode(!0))}connectedCallback(){h(this,I,Re).call(this)}attributeChangedCallback(t,s,n){switch(t){case"flex":a(this,z,n!==null?n:"1"),h(this,I,Re).call(this);break}}};z=new WeakMap,I=new WeakSet,Re=function(){this.shadowRoot.querySelector("style").textContent=`
            :host {
                flex: ${i(this,z)};
            }
        `},r(L,"register",()=>customElements.define("ui-flex-grid-item",L)),r(L,"observedAttributes",["flex"]);let Q=L;const Fe=document.createElement("template");Fe.innerHTML=`
<style></style>
<slot></slot>
`;var U,q,$e;const C=class C extends HTMLElement{constructor(){super();l(this,q);l(this,U,"0");this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Fe.content.cloneNode(!0))}connectedCallback(){h(this,q,$e).call(this)}attributeChangedCallback(t,s,n){switch(t){case"gap":a(this,U,n!==null?n:"0"),h(this,q,$e).call(this);break}}};U=new WeakMap,q=new WeakSet,$e=function(){this.shadowRoot.querySelector("style").textContent=`
            :host {
                --row-gap: ${i(this,U)};
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
        `},r(C,"register",()=>customElements.define("ui-flex-grid-row",C)),r(C,"observedAttributes",["gap"]);let B=C;const _e=document.createElement("template");_e.innerHTML=`
<style></style>
<slot></slot>
`;var O,he,et;const k=class k extends HTMLElement{constructor(){super();l(this,he);l(this,O,"0");this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(_e.content.cloneNode(!0))}connectedCallback(){h(this,he,et).call(this)}attributeChangedCallback(t,s,n){switch(t){case"gap":a(this,O,n!==null?n:"0");break}}};O=new WeakMap,he=new WeakSet,et=function(){this.shadowRoot.querySelector("style").textContent=`
            :host {
                --gap: ${i(this,O)};
                display: flex;
                flex-flow: column nowrap;
                position: relative;
                width: 100%;
                height: fit-content;
            }

            :host ::slotted(ui-flex-grid-row) {
                margin: var(--gap) 0;
            }

            :host ::slotted(ui-flex-grid-row:first-child) {
                margin-top: 0;
            }

            :host ::slotted(ui-flex-grid-row:last-child) {
                margin-bottom: 0;
            }
        `},r(k,"register",()=>customElements.define("ui-flex-grid",k)),r(k,"observedAttributes",["gap"]);let G=k;const tt=document.createElement("template");tt.innerHTML=`
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
`;let $t=class{constructor(){this.value=null,this.selected=!1}};const E=class E extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(tt.content.cloneNode(!0)),this.ui=new $t}attributeChangedCallback(e,t,s){switch(e){case"value":this.ui.value=s;break;case"selected":this.ui.selected=s!==null;break}}};r(E,"register",()=>customElements.define("ui-select-option",E)),r(E,"observedAttributes",["value","selected"]);let A=E;const st=document.createElement("template");st.innerHTML=`
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
`;var Z,g;const de=class de extends HTMLElement{constructor(){super();l(this,Z,t=>{this.classList.toggle("open")?(t.stopPropagation(),this.addEventListener("click",i(this,g))):setTimeout(()=>this.removeEventListener("click",i(this,g)))});l(this,g,t=>{(t.composedPath()||[]).forEach(s=>{s instanceof A&&([...this.querySelectorAll("ui-select-option")].forEach(n=>n.removeAttribute("selected")),s.setAttribute("selected",""),this.dispatchEvent(new CustomEvent("change",{detail:s})))})});this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(st.content.cloneNode(!0))}connectedCallback(){var t;(t=this.shadowRoot.querySelector(".options"))==null||t.addEventListener("click",i(this,Z)),this.style.setProperty("--items-length",this.querySelectorAll("ui-select-option").length.toString())}disconnectedCallback(){var t;this.removeEventListener("click",i(this,g)),(t=this.shadowRoot.querySelector(".options"))==null||t.addEventListener("click",i(this,Z))}};Z=new WeakMap,g=new WeakMap,r(de,"register",()=>customElements.define("ui-select",de));let F=de;var P,f,D,De;let St=(De=class{constructor(e){l(this,P,void 0);l(this,f,void 0);l(this,D,void 0);a(this,P,e),a(this,f,new qe),this.langType=null}getFallbackElement(){return i(this,P).querySelector("ui-lang-type[fallback]")}new(e,t){this.langType=e,a(this,D,t),i(this,f).dispatchWithData("change",this.langType)}get(e,t){var s;return(s=i(this,D))==null?void 0:s[e][t]}on(e,t,s=!1){if(typeof t!="function")throw"callback is not a function";return s&&t(this.langType),i(this,f).addListener(e,t)}},P=new WeakMap,f=new WeakMap,D=new WeakMap,De);var ue,ot;const M=class M extends HTMLElement{constructor(){super();l(this,ue);this.ui=new St(this)}attributeChangedCallback(t,s,n){switch(t){case"current":n!==null&&h(this,ue,ot).call(this,n);break}}};ue=new WeakSet,ot=async function(t){const s=this.querySelector(`ui-lang-type[name="${t}"]`)||this.ui.getFallbackElement();if(!s)return;if(!s.href)throw"Missing href attribute!";const n=await fetch(s.href);this.ui.new(s,await n.json())},r(M,"register",()=>customElements.define("ui-lang",M)),r(M,"observedAttributes",["current"]);let _=M,At=class{constructor(){this.name="",this.href="",this.fallback=!1}};const T=class T extends HTMLElement{constructor(){super(),this.ui=new At}attributeChangedCallback(e,t,s){switch(e){case"name":this.ui.name=s??"";break;case"href":this.ui.href=s??"";break;case"fallback":this.ui.fallback=s!=null;break}}};r(T,"register",()=>customElements.define("ui-lang-type",T)),r(T,"observedAttributes",["name","href","fallback"]);let ee=T;const it=document.createElement("template");it.innerHTML=`
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
`;let jt=class{constructor(){this.name=""}};const H=class H extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(it.content.cloneNode(!0)),this.ui=new jt}attributeChangedCallback(e,t,s){switch(e){case"name":this.ui.name=s!==null?s:"";break}}};r(H,"register",()=>customElements.define("ui-stack-layout-page",H)),r(H,"observedAttributes",["name"]);let te=H;const rt=document.createElement("template");rt.innerHTML=`
    <style>
        :host {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
        }
    </style>

    <slot></slot>
`;const pe=class pe extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(rt.content.cloneNode(!0))}};r(pe,"register",()=>customElements.define("ui-stack-layout",pe));let se=pe;var v,Ve;let Nt=(Ve=class{constructor(){l(this,v,void 0);a(this,v,new qe),this.localStoragePrefix="",this.enableLocalStorage=!1,this.stores={}}get(e){return this.stores[e]}set(e,t,s=!1){if(s&&this.enableLocalStorage){const n=JSON.parse(localStorage.getItem(this.localStoragePrefix+e)||"null");this.stores[e]=n??t}else this.stores[e]=t;this.enableLocalStorage&&localStorage.setItem(this.localStoragePrefix+e,JSON.stringify(this.stores[e])),i(this,v).dispatchWithData(e,this.stores[e])}update(e,t){if(typeof t!="function")throw"callback is not a function";this.set(e,t(this.stores[e]))}on(e,t,s=!1){if(typeof t!="function")throw"callback is not a function";return s&&t(this.get(e)),i(this,v).addListener(e,t)}},v=new WeakMap,Ve);const R=class R extends HTMLElement{constructor(){super(),this.ui=new Nt}attributeChangedCallback(e,t,s){switch(e){case"local-storage-prefix":this.ui.localStoragePrefix=s!==null?s:"";break;case"enable-local-storage":this.ui.enableLocalStorage=s!==null;break}}};r(R,"register",()=>customElements.define("ui-store",R)),r(R,"observedAttributes",["local-storage-prefix","enable-local-storage"]);let oe=R;const nt=document.createElement("template");nt.innerHTML=`
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
`;const me=class me extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(nt.content.cloneNode(!0))}};r(me,"register",()=>customElements.define("ui-svg-back-arrow-navigation",me));let Se=me;const lt=document.createElement("template");lt.innerHTML=`
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
`;const ge=class ge extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(lt.content.cloneNode(!0))}};r(ge,"register",()=>customElements.define("ui-svg-chevron-down",ge));let Ae=ge;const at=document.createElement("template");at.innerHTML=`
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
`;const fe=class fe extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(at.content.cloneNode(!0))}};r(fe,"register",()=>customElements.define("ui-svg-delete-recycle-bin",fe));let je=fe;const ct=document.createElement("template");ct.innerHTML=`
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
`;const ve=class ve extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ct.content.cloneNode(!0))}};r(ve,"register",()=>customElements.define("ui-svg-edit2",ve));let Ne=ve;const ht=document.createElement("template");ht.innerHTML=`
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
`;const we=class we extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ht.content.cloneNode(!0))}};r(we,"register",()=>customElements.define("ui-svg-pdf-document",we));let ze=we;const dt=document.createElement("template");dt.innerHTML=`
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
`;const be=class be extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(dt.content.cloneNode(!0))}};r(be,"register",()=>customElements.define("ui-svg-settings",be));let Ie=be;const ut=document.createElement("template");ut.innerHTML=`
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
`;const ye=class ye extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ut.content.cloneNode(!0))}};r(ye,"register",()=>customElements.define("ui-svg-today-outline",ye));let Ue=ye;const p={BackArrowNavigation:Se,ChevronDown:Ae,DeleteRecycleBin:je,Edit2:Ne,PDFDocument:ze,Settings:Ie,TodayOutline:Ue},pt=document.createElement("template");pt.innerHTML=`
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
`;var u,d,w,V,W,b,xe,mt,Le,gt,We;let zt=(We=class{constructor(e){l(this,xe);l(this,Le);l(this,u,void 0);l(this,d,null);l(this,w,!1);l(this,V,async()=>!!i(this,d)&&i(this,d).click());l(this,W,async e=>e.stopPropagation());l(this,b,void 0);a(this,u,e)}enableRipple(){i(this,b)||(this.removeRipple=Me(i(this,u)),i(this,u).style.cursor="pointer",h(this,xe,mt).call(this))}disableRipple(){i(this,b)&&i(this,b).call(this),h(this,Le,gt).call(this)}},u=new WeakMap,d=new WeakMap,w=new WeakMap,V=new WeakMap,W=new WeakMap,b=new WeakMap,xe=new WeakSet,mt=function(){i(this,w)||(a(this,d,i(this,u).querySelector("input")),i(this,d)&&(i(this,u).addEventListener("click",i(this,V)),i(this,d).addEventListener("click",i(this,W))),a(this,w,!0))},Le=new WeakSet,gt=function(){i(this,d)&&(i(this,u).removeEventListener("click",i(this,V)),i(this,d).removeEventListener("click",i(this,W))),a(this,w,!1)},We);const $=class $ extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(pt.content.cloneNode(!0)),this.ui=new zt(this)}attributeChangedCallback(e,t,s){switch(e){case"ripple":s!==null?this.ui.enableRipple():this.ui.disableRipple();break}}};r($,"register",()=>customElements.define("ui-label",$)),r($,"observedAttributes",["ripple"]);let ie=$;const ft=document.createElement("template");ft.innerHTML=`
<style>
    :host {
        font-size: 1.1em;
        font-weight: normal;
    }
</style>

<slot></slot>
`;const Ce=class Ce extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ft.content.cloneNode(!0))}};r(Ce,"register",()=>customElements.define("ui-primary",Ce));let re=Ce;const vt=document.createElement("template");vt.innerHTML=`
<style>
    :host {
        font-size: 0.9em;
        font-weight: 300;
        font-style: italic;
    }
</style>

<slot></slot>
`;const ke=class ke extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(vt.content.cloneNode(!0))}};r(ke,"register",()=>customElements.define("ui-secondary",ke));let ne=ke;var c,Ee,wt;class It{constructor(){l(this,Ee);l(this,c,null);this.currentTheme=null,this.themes={}}enableAutoMode(){if(this.removeMode(),i(this,c)){this.mediaChangeHandler(i(this,c));return}a(this,c,window.matchMedia("(prefers-color-scheme: dark)")),i(this,c).addEventListener("change",this.mediaChangeHandler),this.mediaChangeHandler(i(this,c))}disableAutoMode(){h(this,Ee,wt).call(this)}addTheme(e,t){this.themes[e]=t}loadTheme(e){var s;if(!this.themes[e])throw`theme "${e}" is missing in this.themes`;if(((s=this.currentTheme)==null?void 0:s.name)==e)return;{const n=document.getElementById("theme");n&&(document.head.removeChild(n),this.currentTheme=null)}const t=document.createElement("link");t.id="theme",t.rel="stylesheet",t.href=this.themes[e],document.head.appendChild(t),this.currentTheme={name:e,href:this.themes[e]}}mediaChangeHandler(e){e.matches?document.body.setAttribute("data-theme","dark"):document.body.setAttribute("data-theme","light")}removeMode(e=document.body){e.removeAttribute("data-theme")}setMode(e,t=document.body){switch(e){case"dark":t.setAttribute("data-theme",e);break;case"light":t.setAttribute("data-theme",e);break}}}c=new WeakMap,Ee=new WeakSet,wt=function(){i(this,c)&&(i(this,c).removeEventListener("change",this.mediaChangeHandler),a(this,c,null))};const S=class S extends HTMLElement{constructor(){super(),this.ui=new It}attributeChangedCallback(e,t,s){switch(e){case"auto":s!==null?this.ui.enableAutoMode():this.ui.disableAutoMode();break;case"mode":s!==null?this.ui.setMode(s):this.ui.removeMode();break}}};r(S,"register",()=>customElements.define("ui-theme-handler",S)),r(S,"observedAttributes",["auto","mode"]);let le=S;const Ut=Object.freeze(Object.defineProperty({__proto__:null,AppBar:J,Button:X,Container:K,FlexGrid:G,FlexGridItem:Q,FlexGridRow:B,IconButton:Y,Label:ie,Lang:_,LangType:ee,Primary:re,Secondary:ne,Select:F,SelectOption:A,StackLayout:se,StackLayoutPage:te,Store:oe,ThemeHandler:le,svg:p},Symbol.toStringTag,{value:"Module"}));async function qt(){J.register(),Y.register(),X.register(),K.register(),Q.register(),B.register(),G.register(),A.register(),F.register(),ee.register(),_.register(),te.register(),se.register(),oe.register(),ne.register(),re.register(),ie.register(),le.register()}async function Ot(){p.BackArrowNavigation.register(),p.ChevronDown.register(),p.DeleteRecycleBin.register(),p.Edit2.register(),p.PDFDocument.register(),p.Settings.register(),p.TodayOutline.register()}const Zt={...Mt,wc:Ut,define:qt,defineSVG:Ot};module.exports=Zt;
