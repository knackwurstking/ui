"use strict";var Ut=Object.defineProperty;var qt=(o,e,t)=>e in o?Ut(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var r=(o,e,t)=>(qt(o,typeof e!="symbol"?e+"":e,t),t),Ze=(o,e,t)=>{if(!e.has(o))throw TypeError("Cannot "+t)};var s=(o,e,t)=>(Ze(o,e,"read from private field"),t?t.call(o):e.get(o)),n=(o,e,t)=>{if(e.has(o))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(o):e.set(o,t)},a=(o,e,t,i)=>(Ze(o,e,"write to private field"),i?i.call(o,t):e.set(o,t),t);var d=(o,e,t)=>(Ze(o,e,"access private method"),t);var c;class _{constructor(){n(this,c,{})}dispatchWithData(e,t){if(t===void 0)throw"data is undefined!";if(s(this,c)[e])for(const i of s(this,c)[e])i(t);return this}addListener(e,t){if(typeof t!="function")throw`invalid event listener passed for "${e.toString()}" event!`;return s(this,c)[e]||(s(this,c)[e]=[]),s(this,c)[e].push(t),()=>{this.removeListener(e,t)}}removeListener(e,t){if(!s(this,c)[e])throw`no listeners found for ${e.toString()}, there is nothing to delete`;let i=!1,l=0;for(const Oe of s(this,c)[e])Oe===t&&(s(this,c)[e].splice(l,1),i=!0),l++;if(!i)throw`listener not found for ${e.toString()}, there is nothing to delete`;return this}}c=new WeakMap;const Pt=Object.freeze(Object.defineProperty({__proto__:null,Events:_},Symbol.toStringTag,{value:"Module"})),Ot={color:"currentColor",opacity:.2,centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out"};function lt(o,e){e={...Ot,...e};const t=document.createElement("div");t.classList.add("ripple"),t.style.position="absolute",t.style.color="inherit",t.style.borderRadius="50%",t.style.pointerEvents="none",t.style.width="100px",t.style.height="100px",t.style.marginTop="-50px",t.style.marginLeft="-50px",t.style.opacity=`${e.opacity}`,t.style.backgroundColor=e.color,t.style.transform="scale(0) translate(0, 0)",t.style.transition=`transform ${e.spreadDuration} ${e.spreadTiming} 0s,opacity ${e.clearDuration} ${e.clearTiming} 0s`,o.currentTarget.appendChild(t);const i=o.currentTarget.getBoundingClientRect();e.centered?(t.style.top=`${i.height/2}px`,t.style.left=`${i.width/2}px`):(t.style.top=`${o.clientY-i.top}px`,t.style.left=`${o.clientX-i.left}px`);const l=Math.max(i.width,i.height)*.02;return t.style.transform=`scale(${l}) translate(0, 0)`,t}function at(o){o&&(o.addEventListener("transitionend",e=>{e.propertyName==="opacity"&&o.remove()}),o.style.opacity="0")}function Pe(o,e={}){let t;const i=Oe=>{t=lt(Oe,e)},l=()=>{at(t)};return o.classList.add("ripple-container"),o.style.overflow="hidden",o.addEventListener("pointerdown",i),o.addEventListener("pointerup",l),o.addEventListener("pointerleave",l),()=>{o.classList.remove("ripple-container"),o.removeEventListener("pointerdown",i),o.removeEventListener("pointerup",l),o.removeEventListener("pointerleave",l)}}const Zt=Object.freeze(Object.defineProperty({__proto__:null,create:Pe,start:lt,stop:at},Symbol.toStringTag,{value:"Module"}));function Wt(){return/(android)/i.test(navigator.userAgent)}const Dt=Object.freeze(Object.defineProperty({__proto__:null,isAndroid:Wt},Symbol.toStringTag,{value:"Module"})),Vt=Object.freeze(Object.defineProperty({__proto__:null,events:Pt,ripple:Zt,utils:Dt},Symbol.toStringTag,{value:"Module"})),ct=document.createElement("template");ct.innerHTML=`
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
`;var y,Ge;let Jt=(Ge=class{constructor(e){n(this,y,void 0);a(this,y,e)}getLeftSlot(){return[...s(this,y).querySelectorAll('[slot="left"]')]}getCenterSlot(){return[...s(this,y).querySelectorAll('[slot="center"]')]}getRightSlot(){return[...s(this,y).querySelectorAll('[slot="right"]')]}},y=new WeakMap,Ge);const we=class we extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ct.content.cloneNode(!0)),this.ui=new Jt(this)}};r(we,"register",()=>customElements.define("ui-app-bar",we));let ee=we;const ht=document.createElement("template");ht.innerHTML=`
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
`;var P,_e;let Bt=(_e=class{constructor(e){n(this,P,void 0);a(this,P,e),this.removeRipple=null}enableRipple(){this.removeRipple||(this.removeRipple=Pe(s(this,P),{centered:!0}))}disableRipple(){this.removeRipple&&this.removeRipple(),this.removeRipple=null}},P=new WeakMap,_e);const T=class T extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ht.content.cloneNode(!0)),this.ui=new Bt(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(e,t,i){switch(e){case"no-ripple":i!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r(T,"register",()=>customElements.define("ui-button",T)),r(T,"observedAttributes",["no-ripple"]);let te=T;const dt=document.createElement("template");dt.innerHTML=`
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
`;var O,et;let Xt=(et=class{constructor(e){n(this,O,void 0);a(this,O,e),this.removeRipple=null}enableRipple(){this.removeRipple||(this.removeRipple=Pe(s(this,O),{centered:!0}))}disableRipple(){this.removeRipple&&this.removeRipple(),this.removeRipple=null}},O=new WeakMap,et);const S=class S extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(dt.content.cloneNode(!0)),this.ui=new Xt(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(e,t,i){switch(e){case"no-ripple":i!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r(S,"register",()=>customElements.define("ui-icon-button",S)),r(S,"observedAttributes",["no-ripple"]);let se=S;const ut=document.createElement("template");ut.innerHTML=`
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
`;const be=class be extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ut.content.cloneNode(!0))}};r(be,"register",()=>customElements.define("ui-container",be));let ie=be;const pt=document.createElement("template");pt.innerHTML=`
<style>
    :host dialog * {
        box-sizing: border-box;
    }

    dialog {
        --header-height: 3rem;
        --footer-height: 3rem;

        position: fixed;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        max-width: 100%;
        max-height: 100%;

        margin: 0;
        padding: 0;

        border: none;
        outline: none;

        background-color: transparent;

        -ms-overflow-style: none;
        scrollbar-width: none;

        z-index: 999;
    }

    dialog::-webkit-scrollbar {
        display: none;
    }

    dialog::backdrop {
        background-color: hsl(0, 0%, 0%, 0.4);
        backdrop-filter: blur(5px);
    }

    dialog > article {
        background-color: hsl(var(--bg));
        color: hsl(var(--fg));

        border: var(--border-width) var(--border-style) hsl(var(--border));
        border-radius: var(--radius);

        padding: 0;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        position: relative;
    }

    :host([fullscreen]) dialog {
        width: 100%;
        height: 100%;
    }

    :host([fullscreen]) dialog > article {
        width: calc(100% - var(--spacing) * 2);
        height: calc(100% - (env(safe-area-inset-top, 0) + env(safe-area-inset-bottom, 0) + (var(--spacing) * 2)));

        margin: var(--spacing);
        margin-top: calc(env(safe-area-inset-top, 0) + var(--spacing));
        margin-bottom: calc(env(safe-area-inset-bottom, 0) + var(--spacing));
    }

    /*
     * Header Styles
     */
  
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: calc(var(--spacing) / 2);
        padding-left: var(--spacing);

        border-top-right-radius: var(--radius);
        border-top-left-radius: var(--radius);

        width: 100%;
        height: var(--header-height);
    }

    header h4 {
        margin: auto 0;
    }

    :host([fullscreen]) header {
        z-index: 15;
        position: absolute;
        top: 0;
        left: 0;
    }

    /*
     * Content Styles
     */

    .content {
        padding-left: var(--spacing);
        padding-right: var(--spacing);
        height: fit-content;
    }

    :host([fullscreen]) .content {
        z-index: 10;
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: calc(--header-height + var(--spacing));
        padding-bottom: calc(--footer-height + var(--spacing));
    }

    /*
     * Footer Styles
     */

    footer {
        padding: var(--spacing);
        margin-top: var(--spacing);
        border-bottom-right-radius: var(--radius);
        border-bottom-left-radius: var(--radius);

        width: 100%;
        height: var(--footer-height);
    }

    :host([fullscreen]) footer {
        z-index: 15;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    footer ui-flex-grid-row {
        height: 100%;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
    }
</style>

<dialog>
	<article>
        <header>
            <span><slot name="title"></slot></span>

            <ui-icon-button ghost>
                <ui-svg-close></ui-svg-close>
            </ui-icon-button>
        </header>

        <section class="content">
            <slot></slot>
        </section>

        <footer>
            <ui-flex-grid-row gap="calc(var(--spacing) / 2)">
                <slot name="actions"></slot>
            </ui-flex-grid-row>
        </footer>
	</article>
</dialog>
`;var v,w,b,tt;let Yt=(tt=class{constructor(e,t){n(this,v,void 0);n(this,w,void 0);n(this,b,void 0);a(this,v,e),a(this,w,t),this.events=new _,a(this,b,document.createElement("h4")),s(this,b).slot="title",s(this,v).appendChild(s(this,b))}get dialog(){return s(this,w)}open(e=!1){e?s(this,w).showModal():s(this,w).show()}close(){s(this,w).close()}get fullscreen(){return s(this,v).hasAttribute("fullscreen")}set fullscreen(e){e?s(this,v).setAttribute("fullscreen",""):s(this,v).removeAttribute("fullscreen")}get title(){return s(this,b).innerText}set title(e){s(this,b).innerText=e}},v=new WeakMap,w=new WeakMap,b=new WeakMap,tt);var Z,W;const ye=class ye extends HTMLElement{constructor(){super();n(this,Z,()=>this.ui.events.dispatchWithData("close",null));n(this,W,()=>this.ui.close());this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(pt.content.cloneNode(!0)),this.ui=new Yt(this,this.shadowRoot.querySelector("dialog"))}connectedCallback(){const t=this.shadowRoot.querySelector("header ui-icon-button");t.addEventListener("click",s(this,W)),t.addEventListener("click",s(this,Z))}disconnectedCallback(){const t=this.shadowRoot.querySelector("header ui-icon-button");t.removeEventListener("click",s(this,W)),t.removeEventListener("click",s(this,Z))}};Z=new WeakMap,W=new WeakMap,r(ye,"register",()=>customElements.define("ui-dialog",ye));let oe=ye;const gt=document.createElement("template");gt.innerHTML=`
<style></style>
<slot></slot>
`;var D,V,We;const H=class H extends HTMLElement{constructor(){super();n(this,V);n(this,D,"1");this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(gt.content.cloneNode(!0))}connectedCallback(){d(this,V,We).call(this)}attributeChangedCallback(t,i,l){switch(t){case"flex":a(this,D,l!==null?l:"1"),d(this,V,We).call(this);break}}};D=new WeakMap,V=new WeakSet,We=function(){this.shadowRoot.querySelector("style").textContent=`
            :host {
                flex: ${s(this,D)};
            }
        `},r(H,"register",()=>customElements.define("ui-flex-grid-item",H)),r(H,"observedAttributes",["flex"]);let re=H;const mt=document.createElement("template");mt.innerHTML=`
<style></style>
<slot></slot>
`;var J,B,De;const R=class R extends HTMLElement{constructor(){super();n(this,B);n(this,J,"0");this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(mt.content.cloneNode(!0))}connectedCallback(){d(this,B,De).call(this)}attributeChangedCallback(t,i,l){switch(t){case"gap":a(this,J,l!==null?l:"0"),d(this,B,De).call(this);break}}};J=new WeakMap,B=new WeakSet,De=function(){this.shadowRoot.querySelector("style").textContent=`
            :host {
                --row-gap: ${s(this,J)};
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
        `},r(R,"register",()=>customElements.define("ui-flex-grid-row",R)),r(R,"observedAttributes",["gap"]);let ne=R;const ft=document.createElement("template");ft.innerHTML=`
<style></style>
<slot></slot>
`;var X,xe,vt;const $=class $ extends HTMLElement{constructor(){super();n(this,xe);n(this,X,"0");this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ft.content.cloneNode(!0))}connectedCallback(){d(this,xe,vt).call(this)}attributeChangedCallback(t,i,l){switch(t){case"gap":a(this,X,l!==null?l:"0");break}}};X=new WeakMap,xe=new WeakSet,vt=function(){this.shadowRoot.querySelector("style").textContent=`
            :host {
                --gap: ${s(this,X)};
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
        `},r($,"register",()=>customElements.define("ui-flex-grid",$)),r($,"observedAttributes",["gap"]);let le=$;const wt=document.createElement("template");wt.innerHTML=`
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
`;var g,st;let Kt=(st=class{constructor(e){n(this,g,void 0);a(this,g,e)}get value(){return s(this,g).getAttribute("value")}set value(e){s(this,g).setAttribute("value",e)}get selected(){return s(this,g).hasAttribute("selected")}set selected(e){e?s(this,g).setAttribute("selected",""):s(this,g).removeAttribute("selected")}},g=new WeakMap,st);const ke=class ke extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(wt.content.cloneNode(!0)),this.ui=new Kt(this)}};r(ke,"register",()=>customElements.define("ui-select-option",ke));let q=ke;const bt=document.createElement("template");bt.innerHTML=`
<style>
    * {
        box-sizing: border-box;
    }

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
`;var Y,k;const Le=class Le extends HTMLElement{constructor(){super();n(this,Y,t=>{this.classList.toggle("open")?(t.stopPropagation(),this.addEventListener("click",s(this,k))):setTimeout(()=>this.removeEventListener("click",s(this,k)))});n(this,k,t=>{(t.composedPath()||[]).forEach(i=>{i instanceof q&&([...this.querySelectorAll("ui-select-option")].forEach(l=>l.removeAttribute("selected")),i.setAttribute("selected",""),this.dispatchEvent(new CustomEvent("change",{detail:i})))})});this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(bt.content.cloneNode(!0))}connectedCallback(){var t;(t=this.shadowRoot.querySelector(".options"))==null||t.addEventListener("click",s(this,Y)),this.style.setProperty("--items-length",this.querySelectorAll("ui-select-option").length.toString())}disconnectedCallback(){var t;this.removeEventListener("click",s(this,k)),(t=this.shadowRoot.querySelector(".options"))==null||t.addEventListener("click",s(this,Y))}};Y=new WeakMap,k=new WeakMap,r(Le,"register",()=>customElements.define("ui-select",Le));let ae=Le;var K,L,Q,it;let Qt=(it=class{constructor(e){n(this,K,void 0);n(this,L,void 0);n(this,Q,void 0);a(this,K,e),a(this,L,new _),this.langType=null}getFallbackElement(){return s(this,K).querySelector("ui-lang-type[fallback]")}new(e,t){this.langType=e,a(this,Q,t),s(this,L).dispatchWithData("change",this.langType)}get(e,t){var i;return(i=s(this,Q))==null?void 0:i[e][t]}on(e,t,i=!1){if(typeof t!="function")throw"callback is not a function";return i&&t(this.langType),s(this,L).addListener(e,t)}},K=new WeakMap,L=new WeakMap,Q=new WeakMap,it);var Ce,yt;const A=class A extends HTMLElement{constructor(){super();n(this,Ce);this.ui=new Qt(this)}attributeChangedCallback(t,i,l){switch(t){case"current":l!==null&&d(this,Ce,yt).call(this,l);break}}};Ce=new WeakSet,yt=async function(t){const i=this.querySelector(`ui-lang-type[name="${t}"]`)||this.ui.getFallbackElement();if(!i)return;if(!i.ui.href)throw"Missing href attribute!";const l=await fetch(i.ui.href);this.ui.new(i,await l.json())},r(A,"register",()=>customElements.define("ui-lang",A)),r(A,"observedAttributes",["current"]);let ce=A,Ft=class{constructor(){this.name="",this.href="",this.fallback=!1}};const j=class j extends HTMLElement{constructor(){super(),this.ui=new Ft}attributeChangedCallback(e,t,i){switch(e){case"name":this.ui.name=i??"";break;case"href":this.ui.href=i??"";break;case"fallback":this.ui.fallback=i!=null;break}}};r(j,"register",()=>customElements.define("ui-lang-type",j)),r(j,"observedAttributes",["name","href","fallback"]);let he=j;const xt=document.createElement("template");xt.innerHTML=`
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
`;let Gt=class{constructor(){this.name=""}};const N=class N extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(xt.content.cloneNode(!0)),this.ui=new Gt}attributeChangedCallback(e,t,i){switch(e){case"name":this.ui.name=i!==null?i:"";break}}};r(N,"register",()=>customElements.define("ui-stack-layout-page",N)),r(N,"observedAttributes",["name"]);let de=N;const kt=document.createElement("template");kt.innerHTML=`
    <style>
        :host {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
        }
    </style>

    <slot></slot>
`;var x,C,ot;let _t=(ot=class{constructor(e){n(this,x,void 0);n(this,C,{});a(this,x,e),this.events=new _,this.stack=[]}registerPage(e,t){s(this,C)[e]=t}unregisterPage(e){delete s(this,C)[e]}goBack(){if(!this.stack.length)return;const e=this.stack.pop();e.ontransitionend=()=>{e.ontransitionend=null,s(this,x).removeChild(e)},this.stack.length&&s(this,x).appendChild(this.stack[this.stack.length-1]),this.dispatchChangeEvent()}setPage(e){if(this.stack.push(s(this,x).appendChild(s(this,C)[e]().children[0])),this.stack.length>1){const t=this.stack[this.stack.length-2];t.ontransitionend=()=>{t.ontransitionend=null,t.parentElement.removeChild(t)}}this.dispatchChangeEvent()}async dispatchChangeEvent(){this.events.dispatchWithData("change",{newPage:this.stack[this.stack.length-1]||null,oldPage:this.stack[this.stack.length-2]||null})}},x=new WeakMap,C=new WeakMap,ot);const Ee=class Ee extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(kt.content.cloneNode(!0)),this.ui=new _t(this)}};r(Ee,"register",()=>customElements.define("ui-stack-layout",Ee));let ue=Ee;var m,rt;let es=(rt=class{constructor(){n(this,m,{});this.events=new _,this.localStoragePrefix="",this.enableLocalStorage=!1}get(e){return s(this,m)[e]}set(e,t,i=!1){if(i&&this.enableLocalStorage){const l=JSON.parse(localStorage.getItem(this.localStoragePrefix+e.toString())||"null");s(this,m)[e]=l??t}else s(this,m)[e]=t;this.enableLocalStorage&&localStorage.setItem(this.localStoragePrefix+e.toString(),JSON.stringify(s(this,m)[e])),this.events.dispatchWithData(e,s(this,m)[e])}update(e,t){if(typeof t!="function")throw"callback is not a function";this.set(e,t(s(this,m)[e]))}on(e,t,i=!1){if(typeof t!="function")throw"callback is not a function";return i&&t(this.get(e)),this.events.addListener(e,t)}},m=new WeakMap,rt);const z=class z extends HTMLElement{constructor(){super(),this.ui=new es}attributeChangedCallback(e,t,i){switch(e){case"local-storage-prefix":this.ui.localStoragePrefix=i!==null?i:"";break;case"enable-local-storage":this.ui.enableLocalStorage=i!==null;break}}};r(z,"register",()=>customElements.define("ui-store",z)),r(z,"observedAttributes",["local-storage-prefix","enable-local-storage"]);let pe=z;const Lt=document.createElement("template");Lt.innerHTML=`
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
`;const Me=class Me extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Lt.content.cloneNode(!0))}};r(Me,"register",()=>customElements.define("ui-svg-back-arrow-navigation",Me));let Ve=Me;const Ct=document.createElement("template");Ct.innerHTML=`
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
`;const Te=class Te extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Ct.content.cloneNode(!0))}};r(Te,"register",()=>customElements.define("ui-svg-chevron-down",Te));let Je=Te;const Et=document.createElement("template");Et.innerHTML=`
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
    <g clip-path="url(#clip0_429_11083)">
        <path
            d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </g>
    <defs>
        <clipPath id="clip0_429_11083">
            <rect width="24" height="24" fill="none" />
        </clipPath>
    </defs>
</svg>
`;const Se=class Se extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Et.content.cloneNode(!0))}};r(Se,"register",()=>customElements.define("ui-svg-close",Se));let Be=Se;const Mt=document.createElement("template");Mt.innerHTML=`
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
`;const He=class He extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Mt.content.cloneNode(!0))}};r(He,"register",()=>customElements.define("ui-svg-delete-recycle-bin",He));let Xe=He;const Tt=document.createElement("template");Tt.innerHTML=`
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
    />
</svg>;
`;const Re=class Re extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Tt.content.cloneNode(!0))}};r(Re,"register",()=>customElements.define("ui-svg-edit2",Re));let Ye=Re;const St=document.createElement("template");St.innerHTML=`
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
`;const $e=class $e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(St.content.cloneNode(!0))}};r($e,"register",()=>customElements.define("ui-svg-pdf-document",$e));let Ke=$e;const Ht=document.createElement("template");Ht.innerHTML=`
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
`;const Ae=class Ae extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Ht.content.cloneNode(!0))}};r(Ae,"register",()=>customElements.define("ui-svg-settings",Ae));let Qe=Ae;const Rt=document.createElement("template");Rt.innerHTML=`
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
`;const je=class je extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Rt.content.cloneNode(!0))}};r(je,"register",()=>customElements.define("ui-svg-today-outline",je));let Fe=je;const p={BackArrowNavigation:Ve,ChevronDown:Je,Close:Be,DeleteRecycleBin:Xe,Edit2:Ye,PDFDocument:Ke,Settings:Qe,TodayOutline:Fe},$t=document.createElement("template");$t.innerHTML=`
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
`;var f,u,E,F,G,M,Ne,At,ze,jt,nt;let ts=(nt=class{constructor(e){n(this,Ne);n(this,ze);n(this,f,void 0);n(this,u,null);n(this,E,!1);n(this,F,async()=>!!s(this,u)&&s(this,u).click());n(this,G,async e=>e.stopPropagation());n(this,M,void 0);a(this,f,e)}enableRipple(){s(this,M)||(this.removeRipple=Pe(s(this,f)),s(this,f).style.cursor="pointer",d(this,Ne,At).call(this))}disableRipple(){s(this,M)&&s(this,M).call(this),d(this,ze,jt).call(this)}},f=new WeakMap,u=new WeakMap,E=new WeakMap,F=new WeakMap,G=new WeakMap,M=new WeakMap,Ne=new WeakSet,At=function(){s(this,E)||(a(this,u,s(this,f).querySelector("input")),s(this,u)&&(s(this,f).addEventListener("click",s(this,F)),s(this,u).addEventListener("click",s(this,G))),a(this,E,!0))},ze=new WeakSet,jt=function(){s(this,u)&&(s(this,f).removeEventListener("click",s(this,F)),s(this,u).removeEventListener("click",s(this,G))),a(this,E,!1)},nt);const I=class I extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild($t.content.cloneNode(!0)),this.ui=new ts(this)}attributeChangedCallback(e,t,i){switch(e){case"ripple":i!==null?this.ui.enableRipple():this.ui.disableRipple();break}}};r(I,"register",()=>customElements.define("ui-label",I)),r(I,"observedAttributes",["ripple"]);let ge=I;const Nt=document.createElement("template");Nt.innerHTML=`
<style>
    :host {
        font-size: 1.1em;
        font-weight: normal;
    }
</style>

<slot></slot>
`;const Ie=class Ie extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Nt.content.cloneNode(!0))}};r(Ie,"register",()=>customElements.define("ui-primary",Ie));let me=Ie;const zt=document.createElement("template");zt.innerHTML=`
<style>
    :host {
        font-size: 0.9em;
        font-weight: 300;
        font-style: italic;
    }
</style>

<slot></slot>
`;const Ue=class Ue extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(zt.content.cloneNode(!0))}};r(Ue,"register",()=>customElements.define("ui-secondary",Ue));let fe=Ue;var h,qe,It;class ss{constructor(){n(this,qe);n(this,h,null);this.currentTheme=null,this.themes={}}enableAutoMode(){if(this.removeMode(),s(this,h)){this.mediaChangeHandler(s(this,h));return}a(this,h,window.matchMedia("(prefers-color-scheme: dark)")),s(this,h).addEventListener("change",this.mediaChangeHandler),this.mediaChangeHandler(s(this,h))}disableAutoMode(){d(this,qe,It).call(this)}addTheme(e,t){this.themes[e]=t}loadTheme(e){var i;if(!this.themes[e])throw`theme "${e}" is missing in this.themes`;if(((i=this.currentTheme)==null?void 0:i.name)==e)return;{const l=document.getElementById("theme");l&&(document.head.removeChild(l),this.currentTheme=null)}const t=document.createElement("link");t.id="theme",t.rel="stylesheet",t.href=this.themes[e],document.head.appendChild(t),this.currentTheme={name:e,href:this.themes[e]}}mediaChangeHandler(e){e.matches?document.body.setAttribute("data-theme","dark"):document.body.setAttribute("data-theme","light")}removeMode(e=document.body){e.removeAttribute("data-theme")}setMode(e,t=document.body){switch(e){case"dark":t.setAttribute("data-theme",e);break;case"light":t.setAttribute("data-theme",e);break}}}h=new WeakMap,qe=new WeakSet,It=function(){s(this,h)&&(s(this,h).removeEventListener("change",this.mediaChangeHandler),a(this,h,null))};const U=class U extends HTMLElement{constructor(){super(),this.ui=new ss}attributeChangedCallback(e,t,i){switch(e){case"auto":i!==null?this.ui.enableAutoMode():this.ui.disableAutoMode();break;case"mode":i!==null?this.ui.setMode(i):this.ui.removeMode();break}}};r(U,"register",()=>customElements.define("ui-theme-handler",U)),r(U,"observedAttributes",["auto","mode"]);let ve=U;const is=Object.freeze(Object.defineProperty({__proto__:null,AppBar:ee,Button:te,Container:ie,Dialog:oe,FlexGrid:le,FlexGridItem:re,FlexGridRow:ne,IconButton:se,Label:ge,Lang:ce,LangType:he,Primary:me,Secondary:fe,Select:ae,SelectOption:q,StackLayout:ue,StackLayoutPage:de,Store:pe,ThemeHandler:ve,svg:p},Symbol.toStringTag,{value:"Module"}));async function os(){ee.register(),se.register(),te.register(),ie.register(),re.register(),ne.register(),le.register(),q.register(),ae.register(),he.register(),ce.register(),de.register(),ue.register(),pe.register(),fe.register(),me.register(),ge.register(),ve.register(),oe.register()}async function rs(){p.BackArrowNavigation.register(),p.ChevronDown.register(),p.Close.register(),p.DeleteRecycleBin.register(),p.Edit2.register(),p.PDFDocument.register(),p.Settings.register(),p.TodayOutline.register()}const ns={...Vt,wc:is,define:os,defineSVG:rs};module.exports=ns;
