"use strict";var re=Object.defineProperty;var ne=(s,t,e)=>t in s?re(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var r=(s,t,e)=>(ne(s,typeof t!="symbol"?t+"":t,e),e),Dt=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var i=(s,t,e)=>(Dt(s,t,"read from private field"),e?e.call(s):t.get(s)),n=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},l=(s,t,e,o)=>(Dt(s,t,"write to private field"),o?o.call(s,e):t.set(s,e),e);const Vt={onDragStart:null,onDragging:null,onDragEnd:null};function ae(s,t={}){t={...Vt,...t};const e=()=>{const b=[...s.parentNode.children].indexOf(s);s.draggable=!0,s.ondragstart=h=>{h.dataTransfer.effectAllowed="move",h.dataTransfer.dropEffect="move",h.dataTransfer.setData("text/plain",b.toString()),t.onDragStart&&t.onDragStart(b)},s.ondragover=h=>(h.preventDefault(),!1),s.ondragenter=h=>{h.preventDefault(),t.onDragging&&t.onDragging(b)},s.ondrop=h=>{h.preventDefault(),h.dataTransfer.dropEffect="move";const oe=parseInt(h.dataTransfer.getData("text/plain"),10);t.onDragEnd&&t.onDragEnd(oe,b)}},o=()=>{s.draggable=!1,s.ondragstart=null,s.ondragover=null,s.ondragenter=null,s.ondrop=null};return e(),{update(a){t={...Vt,...a},o(),e()},destroy:o}}const le=Object.freeze(Object.defineProperty({__proto__:null,create:ae},Symbol.toStringTag,{value:"Module"}));var d;class S{constructor(){n(this,d,{})}on(t,e){if(typeof e!="function")throw`invalid event listener passed for "${t.toString()}" event!`;return i(this,d)[t]||(i(this,d)[t]=[]),i(this,d)[t].push(e),()=>{this.off(t,e)}}off(t,e){if(!i(this,d)[t])throw`no listeners found for ${t.toString()}, there is nothing to delete`;let o=!1,a=0;for(const b of i(this,d)[t])b===e&&(i(this,d)[t].splice(a,1),o=!0),a++;if(!o)throw`listener not found for ${t.toString()}, there is nothing to delete`;return this}dispatch(t,e){if(e===void 0)throw"data is undefined!";if(i(this,d)[t])for(const o of i(this,d)[t])o(e);return this}}d=new WeakMap;const ce=Object.freeze(Object.defineProperty({__proto__:null,Events:S},Symbol.toStringTag,{value:"Module"})),he={color:"var(--ui-ripple-color, currentColor)",opacity:"var(--ui-ripple-opacity, 0.2)",centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out"};function ie(s,t){t={...he,...t};const e=document.createElement("div");e.classList.add("ripple"),e.style.position="absolute",e.style.color="inherit",e.style.borderRadius="50%",e.style.pointerEvents="none",e.style.width="100px",e.style.height="100px",e.style.marginTop="-50px",e.style.marginLeft="-50px",e.style.opacity=`${t.opacity}`,e.style.backgroundColor=t.color,e.style.transform="scale(0) translate(0, 0)",e.style.transition=`transform ${t.spreadDuration} ${t.spreadTiming} 0s,opacity ${t.clearDuration} ${t.clearTiming} 0s`,s.currentTarget.appendChild(e);const o=s.currentTarget.getBoundingClientRect();t.centered?(e.style.top=`${o.height/2}px`,e.style.left=`${o.width/2}px`):(e.style.top=`${s.clientY-o.top}px`,e.style.left=`${s.clientX-o.left}px`);const a=Math.max(o.width,o.height)*.02;return e.style.transform=`scale(${a}) translate(0, 0)`,e}function se(s){s&&(s.addEventListener("transitionend",t=>{t.propertyName==="opacity"&&s.remove()}),s.style.opacity="0")}function $t(s,t={}){let e;const o=b=>{e=ie(b,t)},a=()=>{se(e)};return s.classList.add("ripple-container"),s.style.overflow="hidden",s.addEventListener("pointerdown",o),s.addEventListener("pointerup",a),s.addEventListener("pointerleave",a),()=>{s.classList.remove("ripple-container"),s.removeEventListener("pointerdown",o),s.removeEventListener("pointerup",a),s.removeEventListener("pointerleave",a)}}const de=Object.freeze(Object.defineProperty({__proto__:null,create:$t,start:ie,stop:se},Symbol.toStringTag,{value:"Module"}));function ue(){return/(android)/i.test(navigator.userAgent)}const pe=Object.freeze(Object.defineProperty({__proto__:null,isAndroid:ue},Symbol.toStringTag,{value:"Module"})),ge=Object.freeze(Object.defineProperty({__proto__:null,draggable:le,events:ce,ripple:de,utils:pe},Symbol.toStringTag,{value:"Module"})),fe=`
<style>
    :host {
        display: flex;
        position: absolute;
        z-index: 100;
        background-color: var(--ui-app-bar-bgColor);
        backdrop-filter: var(--ui-app-bar-backdropFilter);
        overflow: hidden;
        user-select: none;
    }

    :host([position="top"]) {
        top: 0;
        left: 0;
        width: 100%;
        height: var(--ui-app-bar-height);
        border-bottom: 1px solid var(--ui-app-bar-borderColor);
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
        margin-left: 0 !important;
    }

    :host > ui-flex-grid-row > [slot="center"] {
        width: 100%;
    }

    :host > ui-flex-grid-row > [slot="right"] {
        margin-right: 0 !important;
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
`;var L,Bt;let me=(Bt=class{constructor(t){n(this,L,void 0);l(this,L,t)}getLeftSlot(){return[...i(this,L).querySelectorAll('[slot="left"]')]}getCenterSlot(){return[...i(this,L).querySelectorAll('[slot="center"]')]}getRightSlot(){return[...i(this,L).querySelectorAll('[slot="right"]')]}},L=new WeakMap,Bt);const ut=class ut extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=fe,this.ui=new me(this)}};r(ut,"register",()=>customElements.define("ui-app-bar",ut));let K=ut;const ve=`
<style>
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: var(--ui-spacing) calc(var(--ui-spacing) * 2.5);
        border: 1px solid currentColor;
        border-radius: var(--ui-button-radius);
        overflow: hidden;
        text-transform: capitalize;
        cursor: pointer;
        outline: none;
        user-select: none;
    }

    :host([variant="full"]) {
        border: none;
    }

    :host([variant="full"][color="primary"]) {
        background-color: var(--ui-primary-bgColor);
        color: var(--ui-primary-color);
    }

    :host([variant="full"][color="secondary"]) {
        background-color: var(--ui-secondary-bgColor);
        color: var(--ui-secondary-color);
    }

    :host([variant="full"][color="destructive"]) {
        background-color: var(--ui-destructive-bgColor);
        color: var(--ui-destructive-color);
    }

    :host([variant="outline"]) {
        border-color: currentColor;
        background-color: transparent;
    }

    :host([variant="outline"][color="primary"]) {
        color: var(--ui-primary-bgColor);
    }

    :host([variant="outline"][color="secondary"]) {
        color: var(--ui-secondary-bgColor);
    }

    :host([variant="outline"][color="destructive"]) {
        color: var(--ui-destructive-bgColor);
    }

    :host([variant="ghost"]) {
        border-color: transparent;
        background-color: transparent;
    }

    :host([variant="ghost"][color="primary"]) {
        color: var(--ui-primary-bgColor);
    }

    :host([variant="ghost"][color="secondary"]) {
        color: var(--ui-secondary-bgColor);
    }

    :host([variant="ghost"][color="destructive"]) {
        color: var(--ui-destructive-bgColor);
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
`;var P,Xt;let be=(Xt=class{constructor(t){n(this,P,void 0);l(this,P,t),this.removeRipple=null}enableRipple(){this.removeRipple||(this.removeRipple=$t(i(this,P),{centered:!0}))}disableRipple(){this.removeRipple&&this.removeRipple(),this.removeRipple=null}},P=new WeakMap,Xt);const R=class R extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ve,this.ui=new be(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(t,e,o){switch(t){case"no-ripple":o!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r(R,"register",()=>customElements.define("ui-button",R)),r(R,"observedAttributes",["no-ripple"]);let Q=R;const we=`
<style>
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 2rem;
        height: 2rem;
        padding: calc(var(--ui-spacing) / 2);
        border: 1px solid currentColor;
        border-radius: var(--ui-icon-button-radius);
        outline: none;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
    }

    :host([ghost]) {
        border-color: transparent !important;
        box-shadow: none;
    }

    :host([color="primary"]) {
        color: var(--ui-primary-bgColor);
        border-color: var(--ui-primary-bgColor);
    }

    :host([color="secondary"]) {
        color: var(--ui-secondary-bgColor);
        border-color: var(--ui-secondary-bgColor);
    }

    :host([color="destructive"]) {
        color: var(--ui-destructive-bgColor);
        border-color: var(--ui-destructive-bgColor);
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
`;var D,Yt;let ye=(Yt=class{constructor(t){n(this,D,void 0);l(this,D,t),this.removeRipple=null}enableRipple(){this.removeRipple||(this.removeRipple=$t(i(this,D),{centered:!0}))}disableRipple(){this.removeRipple&&this.removeRipple(),this.removeRipple=null}},D=new WeakMap,Yt);const $=class $ extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=we,this.ui=new ye(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(t,e,o){switch(t){case"no-ripple":o!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r($,"register",()=>customElements.define("ui-icon-button",$)),r($,"observedAttributes",["no-ripple"]);let W=$;const xe=`
<style>
    :host {
        display: block;
        width: 100%;
        max-width: 65rem;
        margin: 0 auto !important;
        padding: var(--ui-spacing);
    }
</style>

<slot></slot>
`,pt=class pt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=xe}};r(pt,"register",()=>customElements.define("ui-container",pt));let F=pt;const Le=`
<style>
    :host dialog * {
        box-sizing: border-box;
    }

    dialog {
        position: fixed;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        max-width: 100%;
        max-height: 100%;

        margin: 0 !important;
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
        background-color: var(--ui-dialog-outside-bgColor);
        backdrop-filter: var(--ui-dialog-outside-backdropFilter);
    }

    dialog > article {
        background-color: var(--ui-dialog-bgColor);
        color: var(--ui-dialog-color);

        border: 1px solid var(--ui-dialog-borderColor);
        border-radius: var(--ui-dialog-radius);

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
        width: calc(100% - var(--ui-spacing) * 2);
        height: calc(100% - (env(safe-area-inset-top, 0) + env(safe-area-inset-bottom, 0) + (var(--ui-spacing) * 2)));

        margin: var(--ui-spacing) !important;
        margin-top: calc(env(safe-area-inset-top, 0) + var(--ui-spacing)) !important;
        margin-bottom: calc(env(safe-area-inset-bottom, 0) + var(--ui-spacing)) !important;
    }

    /*
     * Header Styles
     */
  
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: calc(var(--ui-spacing) / 2);
        padding-left: var(--ui-spacing);

        border-top-right-radius: var(--ui-dialog-radius);
        border-top-left-radius: var(--ui-dialog-radius);

        width: 100%;
        height: var(--ui-dialog-header-height);
    }

    header h4 {
        margin: auto 0 !important;
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
        padding-left: var(--ui-spacing);
        padding-right: var(--ui-spacing);
        height: fit-content;
    }

    :host([fullscreen]) .content {
        z-index: 10;
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: calc(var(--ui-dialog-header-height) + var(--ui-spacing));
        padding-bottom: calc(var(--ui-dialog-footer-height) + var(--ui-spacing));
    }

    /*
     * Footer Styles
     */

    footer {
        padding: var(--ui-spacing);
        margin-top: var(--ui-spacing) !important;
        border-bottom-right-radius: var(--ui-dialog-radius);
        border-bottom-left-radius: var(--ui-dialog-radius);

        width: 100%;
        height: var(--ui-dialog-footer-height);
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
            <ui-flex-grid-row gap="calc(var(--ui-spacing) / 2)">
                <slot name="actions"></slot>
            </ui-flex-grid-row>
        </footer>
	</article>
</dialog>
`;var w,y,x,Kt;let ke=(Kt=class{constructor(t,e){n(this,w,void 0);n(this,y,void 0);n(this,x,void 0);l(this,w,t),l(this,y,e),this.events=new S,l(this,x,document.createElement("h4")),i(this,x).slot="title",i(this,w).appendChild(i(this,x))}get dialog(){return i(this,y)}open(t=!1){t?i(this,y).showModal():i(this,y).show()}close(){i(this,y).close()}get fullscreen(){return i(this,w).hasAttribute("fullscreen")}set fullscreen(t){t?i(this,w).setAttribute("fullscreen",""):i(this,w).removeAttribute("fullscreen")}get title(){return i(this,x).innerText}set title(t){i(this,x).innerText=t}},w=new WeakMap,y=new WeakMap,x=new WeakMap,Kt);var V,Z;const gt=class gt extends HTMLElement{constructor(){super();n(this,V,()=>this.ui.events.dispatch("close",null));n(this,Z,()=>this.ui.close());this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Le,this.ui=new ke(this,this.shadowRoot.querySelector("dialog"))}connectedCallback(){const e=this.shadowRoot.querySelector("header ui-icon-button");e.addEventListener("click",i(this,Z)),e.addEventListener("click",i(this,V))}disconnectedCallback(){const e=this.shadowRoot.querySelector("header ui-icon-button");e.removeEventListener("click",i(this,Z)),e.removeEventListener("click",i(this,V))}};V=new WeakMap,Z=new WeakMap,r(gt,"register",()=>customElements.define("ui-dialog",gt));let G=gt;const Zt="1",Ce=`
<style></style>
<slot></slot>
`,A=class A extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ce,this._updateStyle()}attributeChangedCallback(t,e,o){switch(t){case"flex":this._updateStyle({flex:o||Zt});break}}_updateStyle({flex:t=Zt}={}){this.shadowRoot.querySelector("style").textContent=`
            :host {
                flex: ${t};
            }
        `}};r(A,"register",()=>customElements.define("ui-flex-grid-item",A)),r(A,"observedAttributes",["flex"]);let _=A;const Nt="0",Me=`
<style></style>
<slot></slot>
`,j=class j extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Me,this._updateStyle()}attributeChangedCallback(t,e,o){switch(t){case"gap":this._updateStyle({gap:o||Nt});break}}_updateStyle({gap:t=Nt}={}){this.shadowRoot.querySelector("style").textContent=`
            :host {
                display: flex;
                flex-flow: row nowrap;
                position: relative;
                width: 100%;
            }

            :host ::slotted(ui-flex-grid-item) {
                margin: 0 ${t} !important;
            }

            :host ::slotted(ui-flex-grid-item:first-child) {
                margin-left: 0 !important;
            }

            :host ::slotted(ui-flex-grid-item:last-child) {
                margin-right: 0 !important;
            }
        `}};r(j,"register",()=>customElements.define("ui-flex-grid-row",j)),r(j,"observedAttributes",["gap"]);let tt=j;const Jt="0",Te=`
<style></style>
<slot></slot>
`,I=class I extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Te,this._updateStyle()}attributeChangedCallback(t,e,o){switch(t){case"gap":this._updateStyle({gap:o||Jt});break}}_updateStyle({gap:t=Jt}={}){this.shadowRoot.querySelector("style").textContent=`
            :host {
                display: flex;
                flex-flow: column nowrap;
                position: relative;
                width: 100%;
                height: fit-content;
            }

            :host ::slotted(ui-flex-grid-item),
            :host ::slotted(ui-flex-grid-row) {
                margin: ${t} 0 !important;
            }

            :host ::slotted(ui-flex-grid-row:first-child) {
                margin-top: 0 !important;
            }

            :host ::slotted(ui-flex-grid-row:last-child) {
                margin-bottom: 0 !important;
            }
        `}};r(I,"register",()=>customElements.define("ui-flex-grid",I)),r(I,"observedAttributes",["gap"]);let et=I;const Ee=`
<style>
    :host {
        display: none;
        align-items: center;

        padding: var(--ui-spacing);
        padding-right: 2rem;

        height: calc(1em * var(--ui-line-height) + var(--ui-spacing) * 2);

        white-space: nowrap;
        text-overflow: ellipsis;

        transition: background-color 0.25s linear, color 0.25s linear;

        overflow: hidden;
    }
</style>

<slot></slot>
`;var f,Qt;let He=(Qt=class{constructor(t){n(this,f,void 0);l(this,f,t)}get value(){return i(this,f).getAttribute("value")}set value(t){i(this,f).setAttribute("value",t)}get selected(){return i(this,f).hasAttribute("selected")}set selected(t){t?i(this,f).setAttribute("selected",""):i(this,f).removeAttribute("selected")}},f=new WeakMap,Qt);const ft=class ft extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ee,this.ui=new He(this)}};r(ft,"register",()=>customElements.define("ui-select-option",ft));let O=ft;const Se=`
<style>
    * {
        box-sizing: border-box;
    }

    :host {
        --items-length: 0;
        position: relative; 
        display: block;

        width: 100%;
        height: calc(1em * var(--ui-line-height) + var(--ui-spacing) * 2);
        transition: height 0.25s ease;

        background-color: var(--ui-select-bgColor);
        color: var(--ui-select-color);

        border: 1px solid var(--ui-select-borderColor);
        border-radius: var(--ui-select-radius);

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
        width: 2.5rem;
        height: 100%;
        color: var(--ui-primary-bgColor);
    }

    ::slotted(ui-select-option) {
        display: flex;
    }

    :host(.open) {
        height: calc((1em * var(--ui-line-height) + var(--ui-spacing) * 2) * var(--items-length));
    }

    :host(.open) .options {
        display: block;
    }

    :host(.open) .icon {
        display: none;
    }

    :host(.open) ::slotted(ui-select-option[selected]) {
        background-color: var(--ui-select-selected-bgColor);
        color: var(--ui-select-selected-color);
    }

    :host(.open) ::slotted(ui-select-option:not([selected]):hover) {
        background-color: var(--ui-select-bgColor--hover);
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
`;let Re=class{constructor(){this.events=new S}};var N;const mt=class mt extends HTMLElement{constructor(){super();n(this,N,async e=>{(e.composedPath()||[]).forEach(o=>{o instanceof O&&([...this.querySelectorAll("ui-select-option")].forEach(a=>a.removeAttribute("selected")),o.setAttribute("selected",""),this.ui.events.dispatch("change",o))})});this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Se,this.cleanup=[],this.ui=new Re}connectedCallback(){const e=this.shadowRoot.querySelector(".options"),o=this.onClickOptions.bind(this);e.addEventListener("click",o),this.cleanup.push(()=>{this.removeEventListener("click",o),e.removeEventListener("click",this.onClickOptions)}),this.style.setProperty("--items-length",this.querySelectorAll("ui-select-option").length.toString())}disconnectedCallback(){this.cleanup.forEach(e=>e()),this.cleanup=[]}async onClickOptions(e){this.classList.toggle("open")?(e.stopPropagation(),this.addEventListener("click",i(this,N))):setTimeout(()=>this.removeEventListener("click",i(this,N)))}};N=new WeakMap,r(mt,"register",()=>customElements.define("ui-select",mt));let it=mt;var J,C,B,Wt;let $e=(Wt=class{constructor(t){n(this,J,void 0);n(this,C,void 0);n(this,B,void 0);l(this,J,t),l(this,C,new S),this.langType=null}getFallbackElement(){return i(this,J).querySelector("ui-lang-type[fallback]")}new(t,e){this.langType=t,l(this,B,e),i(this,C).dispatch("change",this.langType)}get(t,e){var o;return(o=i(this,B))==null?void 0:o[t][e]}on(t,e,o=!1){if(typeof e!="function")throw"callback is not a function";return o&&e(this.langType),i(this,C).on(t,e)}},J=new WeakMap,C=new WeakMap,B=new WeakMap,Wt);const U=class U extends HTMLElement{constructor(){super(),this.ui=new $e(this)}attributeChangedCallback(t,e,o){switch(t){case"current":o!==null&&this._loadLanguage(o);break}}async _loadLanguage(t){const e=this.querySelector(`ui-lang-type[name="${t}"]`)||this.ui.getFallbackElement();if(!e)return;if(!e.ui.href)throw"Missing href attribute!";const o=await fetch(e.ui.href);this.ui.new(e,await o.json())}};r(U,"register",()=>customElements.define("ui-lang",U)),r(U,"observedAttributes",["current"]);let st=U;var u,Ft;let Ae=(Ft=class{constructor(t){n(this,u,void 0);l(this,u,t)}get name(){return i(this,u).getAttribute("name")}set name(t){i(this,u).setAttribute("name",t)}get href(){return i(this,u).getAttribute("href")}set href(t){i(this,u).setAttribute("href",t)}get fallback(){return i(this,u).hasAttribute("fallback")}set fallback(t){t?i(this,u).setAttribute("fallback",""):i(this,u).removeAttribute("fallback")}},u=new WeakMap,Ft);const vt=class vt extends HTMLElement{constructor(){super(),this.ui=new Ae(this)}};r(vt,"register",()=>customElements.define("ui-lang-type",vt));let ot=vt;const je=`
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
`;var M,Gt;let Ie=(Gt=class{constructor(t){n(this,M,void 0);l(this,M,t)}get name(){return i(this,M).getAttribute("name")}set name(t){i(this,M).setAttribute("name",t)}},M=new WeakMap,Gt);const bt=class bt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=je,this.ui=new Ie(this)}};r(bt,"register",()=>customElements.define("ui-stack-layout-page",bt));let rt=bt;const Ue=`
    <style>
        :host {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
        }
    </style>

    <slot></slot>
`;var k,T,_t;let ze=(_t=class{constructor(t){n(this,k,void 0);n(this,T,{});l(this,k,t),this.events=new S,this.stack=[]}registerPage(t,e){i(this,T)[t]=e}unregisterPage(t){delete i(this,T)[t]}goBack(){if(!this.stack.length)return;const t=this.stack.pop();t.ontransitionend=()=>{t.ontransitionend=null,i(this,k).removeChild(t)},this.stack.length&&i(this,k).appendChild(this.stack[this.stack.length-1]),this.dispatchChangeEvent()}setPage(t){if(this.stack.push(i(this,k).appendChild(i(this,T)[t]().children[0])),this.stack.length>1){const e=this.stack[this.stack.length-2];e.ontransitionend=()=>{e.ontransitionend=null,e.parentElement.removeChild(e)}}this.dispatchChangeEvent()}async dispatchChangeEvent(){this.events.dispatch("change",{newPage:this.stack[this.stack.length-1]||null,oldPage:this.stack[this.stack.length-2]||null})}},k=new WeakMap,T=new WeakMap,_t);const wt=class wt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ue,this.ui=new ze(this)}};r(wt,"register",()=>customElements.define("ui-stack-layout",wt));let nt=wt;var m,v,te;let qe=(te=class{constructor(t){n(this,m,void 0);n(this,v,{});l(this,m,t),this.events=new S}get localStoragePrefix(){return i(this,m).getAttribute("local-storage-prefix")}set localStoragePrefix(t){i(this,m).setAttribute("local-storage-prefix",t)}get enableLocalStorage(){return i(this,m).hasAttribute("enable-local-storage")}set enableLocalStorage(t){t?i(this,m).setAttribute("enable-local-storage",""):i(this,m).removeAttribute("enable-local-storage")}get(t){return i(this,v)[t]}set(t,e,o=!1){if(o&&this.enableLocalStorage){const a=JSON.parse(localStorage.getItem(this.localStoragePrefix+t.toString())||"null");i(this,v)[t]=a??e}else i(this,v)[t]=e;this.enableLocalStorage&&localStorage.setItem(this.localStoragePrefix+t.toString(),JSON.stringify(i(this,v)[t])),this.events.dispatch(t,i(this,v)[t])}update(t,e){if(typeof e!="function")throw"callback is not a function";this.set(t,e(i(this,v)[t]))}on(t,e,o=!1){if(typeof e!="function")throw"callback is not a function";return o&&e(this.get(t)),this.events.on(t,e)}},m=new WeakMap,v=new WeakMap,te);const yt=class yt extends HTMLElement{constructor(){super(),this.ui=new qe(this)}};r(yt,"register",()=>customElements.define("ui-store",yt));let at=yt;const Oe=`
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
`,xt=class xt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Oe}};r(xt,"register",()=>customElements.define("ui-svg-back-arrow-navigation",xt));let At=xt;const Pe=`
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
`,Lt=class Lt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Pe}};r(Lt,"register",()=>customElements.define("ui-svg-chevron-down",Lt));let jt=Lt;const De=`
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
`,kt=class kt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=De}};r(kt,"register",()=>customElements.define("ui-svg-close",kt));let It=kt;const Ve=`
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
`,Ct=class Ct extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ve}};r(Ct,"register",()=>customElements.define("ui-svg-delete-recycle-bin",Ct));let Ut=Ct;const Ze=`
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
`,Mt=class Mt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ze}};r(Mt,"register",()=>customElements.define("ui-svg-edit2",Mt));let zt=Mt;const Ne=`
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
`,Tt=class Tt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ne}};r(Tt,"register",()=>customElements.define("ui-svg-pdf-document",Tt));let qt=Tt;const Je=`
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
`,Et=class Et extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Je}};r(Et,"register",()=>customElements.define("ui-svg-settings",Et));let Ot=Et;const Be=`
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
`,Ht=class Ht extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Be}};r(Ht,"register",()=>customElements.define("ui-svg-today-outline",Ht));let Pt=Ht;const g={BackArrowNavigation:At,ChevronDown:jt,Close:It,DeleteRecycleBin:Ut,Edit2:zt,PDFDocument:qt,Settings:Ot,TodayOutline:Pt},Xe=`
<style>
    :host {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: var(--ui-spacing);
        border-radius: var(--ui-radius);
    }

    :host > .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: fit-content;
        width: 100%;
        margin-right: var(--ui-spacing);
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
    <ui-primary></ui-primary>
    <ui-secondary></ui-secondary>
</span>

<span class="input">
    <slot name="input"></slot>
    <slot></slot>
</span>
`;var c,E,X,Y,H,ee;let Ye=(ee=class{constructor(t){n(this,c,void 0);n(this,E,!1);n(this,X,async()=>{[...i(this,c).querySelectorAll('[slot="input"]')].forEach(t=>t.click())});n(this,Y,async t=>{t.stopPropagation()});n(this,H,void 0);l(this,c,t)}get primary(){return i(this,c).getAttribute("primary")}set primary(t){i(this,c).setAttribute("primary",t)}get secondary(){return i(this,c).getAttribute("secondary")}set secondary(t){i(this,c).setAttribute("secondary",t)}getInputSlot(){return[...i(this,c).querySelectorAll('[slot="input"]')]}enableRipple(){i(this,H)||(this.removeRipple=$t(i(this,c)),i(this,c).style.cursor="pointer",this._startInputHandling())}disableRipple(){i(this,H)&&i(this,H).call(this),this._stopInputHandling()}_startInputHandling(){i(this,E)||(i(this,c).addEventListener("click",i(this,X)),this.getInputSlot().forEach(t=>{t.addEventListener("click",i(this,Y))}),l(this,E,!0))}_stopInputHandling(){i(this,c).removeEventListener("click",i(this,X)),[...i(this,c).querySelectorAll('[slot="input"]')].forEach(t=>{t.removeEventListener("click",i(this,Y))}),l(this,E,!1)}},c=new WeakMap,E=new WeakMap,X=new WeakMap,Y=new WeakMap,H=new WeakMap,ee);const z=class z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Xe,this.ui=new Ye(this)}attributeChangedCallback(t,e,o){switch(t){case"ripple":o!==null?this.ui.enableRipple():this.ui.disableRipple();break;case"primary":this.shadowRoot.querySelector("ui-primary").innerHTML=o||"";break;case"secondary":this.shadowRoot.querySelector("ui-secondary").innerHTML=o||"";break}}};r(z,"register",()=>customElements.define("ui-label",z)),r(z,"observedAttributes",["ripple","secondary","primary"]);let lt=z;const Ke=`
<style>
    :host {
        font-size: 1.1rem;
        font-family: var(--ui-primary-fontFamily);
        font-variation-settings: var(--ui-primary-fontVariation);
    }
</style>

<slot></slot>
`,St=class St extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ke}};r(St,"register",()=>customElements.define("ui-primary",St));let ct=St;const Qe=`
<style>
    :host {
        font-size: 0.9rem;
        font-family: var(--ui-secondary-fontFamily);
        font-variation-settings: var(--ui-secondary-fontVariation);
    }
</style>

<slot></slot>
`,Rt=class Rt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Qe}};r(Rt,"register",()=>customElements.define("ui-secondary",Rt));let ht=Rt;var p;class We{constructor(){n(this,p,null);this.currentTheme=null,this.themes={}}enableAutoMode(){if(this.removeMode(),i(this,p)){this.mediaChangeHandler(i(this,p));return}l(this,p,window.matchMedia("(prefers-color-scheme: dark)")),i(this,p).addEventListener("change",this.mediaChangeHandler),this.mediaChangeHandler(i(this,p))}disableAutoMode(){this.removeMedia()}addTheme(t,e){this.themes[t]=e}loadTheme(t){var o;if(!this.themes[t])throw`theme "${t}" is missing in this.themes`;if(((o=this.currentTheme)==null?void 0:o.name)==t)return;{const a=document.getElementById("theme");a&&(document.head.removeChild(a),this.currentTheme=null)}const e=document.createElement("link");e.id="theme",e.rel="stylesheet",e.href=this.themes[t],document.head.appendChild(e),this.currentTheme={name:t,href:this.themes[t]}}mediaChangeHandler(t){t.matches?document.body.setAttribute("data-theme","dark"):document.body.setAttribute("data-theme","light")}removeMode(t=document.body){t.removeAttribute("data-theme")}setMode(t,e=document.body){switch(t){case"dark":e.setAttribute("data-theme",t);break;case"light":e.setAttribute("data-theme",t);break}}removeMedia(){i(this,p)&&(i(this,p).removeEventListener("change",this.mediaChangeHandler),l(this,p,null))}}p=new WeakMap;const q=class q extends HTMLElement{constructor(){super(),this.ui=new We}attributeChangedCallback(t,e,o){switch(t){case"auto":o!==null?this.ui.enableAutoMode():this.ui.disableAutoMode();break;case"mode":o!==null?this.ui.setMode(o):this.ui.removeMode();break}}};r(q,"register",()=>customElements.define("ui-theme-handler",q)),r(q,"observedAttributes",["auto","mode"]);let dt=q;const Fe=Object.freeze(Object.defineProperty({__proto__:null,AppBar:K,Button:Q,Container:F,Dialog:G,FlexGrid:et,FlexGridItem:_,FlexGridRow:tt,IconButton:W,Label:lt,Lang:st,LangType:ot,Primary:ct,Secondary:ht,Select:it,SelectOption:O,StackLayout:nt,StackLayoutPage:rt,Store:at,ThemeHandler:dt,svg:g},Symbol.toStringTag,{value:"Module"}));async function Ge(){K.register(),W.register(),Q.register(),F.register(),_.register(),tt.register(),et.register(),O.register(),it.register(),ot.register(),st.register(),rt.register(),nt.register(),at.register(),ht.register(),ct.register(),lt.register(),dt.register(),G.register()}async function _e(){g.BackArrowNavigation.register(),g.ChevronDown.register(),g.Close.register(),g.DeleteRecycleBin.register(),g.Edit2.register(),g.PDFDocument.register(),g.Settings.register(),g.TodayOutline.register()}const ti={js:ge,wc:Fe,define:Ge,defineSVG:_e};module.exports=ti;
