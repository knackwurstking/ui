"use strict";var pe=Object.defineProperty;var ge=(s,t,e)=>t in s?pe(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var r=(s,t,e)=>(ge(s,typeof t!="symbol"?t+"":t,e),e),Kt=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var i=(s,t,e)=>(Kt(s,t,"read from private field"),e?e.call(s):t.get(s)),n=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},c=(s,t,e,o)=>(Kt(s,t,"write to private field"),o?o.call(s,e):t.set(s,e),e);const Qt={onDragStart:null,onDragging:null,onDragEnd:null};function me(s,t={}){t={...Qt,...t};const e=()=>{const f=[...s.parentNode.children].indexOf(s);s.draggable=!0,s.ondragstart=d=>{d.dataTransfer.effectAllowed="move",d.dataTransfer.dropEffect="move",d.dataTransfer.setData("text/plain",f.toString()),t.onDragStart&&t.onDragStart(f)},s.ondragover=d=>(d.preventDefault(),!1),s.ondragenter=d=>{d.preventDefault(),t.onDragging&&t.onDragging(f)},s.ondrop=d=>{d.preventDefault(),d.dataTransfer.dropEffect="move";const ue=parseInt(d.dataTransfer.getData("text/plain"),10);t.onDragEnd&&t.onDragEnd(ue,f)}},o=()=>{s.draggable=!1,s.ondragstart=null,s.ondragover=null,s.ondragenter=null,s.ondrop=null};return e(),{update(l){t={...Qt,...l},o(),e()},destroy:o}}const fe=Object.freeze(Object.defineProperty({__proto__:null,create:me},Symbol.toStringTag,{value:"Module"}));var u;class j{constructor(){n(this,u,{})}on(t,e){if(typeof e!="function")throw`invalid event listener passed for "${t.toString()}" event!`;return i(this,u)[t]||(i(this,u)[t]=[]),i(this,u)[t].push(e),()=>{this.off(t,e)}}off(t,e){if(!i(this,u)[t])throw`no listeners found for ${t.toString()}, there is nothing to delete`;let o=!1,l=0;for(const f of i(this,u)[t])f===e&&(i(this,u)[t].splice(l,1),o=!0),l++;if(!o)throw`listener not found for ${t.toString()}, there is nothing to delete`;return this}dispatch(t,e){if(e===void 0)throw"data is undefined!";if(i(this,u)[t])for(const o of i(this,u)[t])o(e);return this}}u=new WeakMap;const ve=Object.freeze(Object.defineProperty({__proto__:null,Events:j},Symbol.toStringTag,{value:"Module"}));function Ot(s,t){const e=document.createElement("div");e.classList.add("ripple"),e.style.position="absolute",e.style.color="inherit",e.style.borderRadius="50%",e.style.pointerEvents="none",e.style.width="100px",e.style.height="100px",e.style.marginTop="-50px",e.style.marginLeft="-50px",e.style.opacity=`${t.opacity}`,e.style.backgroundColor=t.color,e.style.transform="scale(0) translate(0, 0)",e.style.transition=`transform ${t.spreadDuration} ${t.spreadTiming} 0s,opacity ${t.clearDuration} ${t.clearTiming} 0s`,s.currentTarget.appendChild(e);const o=s.currentTarget.getBoundingClientRect();t.centered?(e.style.top=`${o.height/2}px`,e.style.left=`${o.width/2}px`):(e.style.top=`${s.clientY-o.top}px`,e.style.left=`${s.clientX-o.left}px`);const l=Math.max(o.width,o.height)*.02;return e.style.transform=`scale(${l}) translate(0, 0)`,e}function Pt(s){s&&(s.addEventListener("transitionend",t=>{t.propertyName==="opacity"&&s.remove()}),s.style.opacity="0")}const he={color:"var(--ui-ripple-color, currentColor)",opacity:"var(--ui-ripple-opacity, 0.2)",centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out",useClick:!1};function qt(s,t={}){t={...he,...t};let e;const o=f=>{e=Ot(f,t)},l=()=>{Pt(e)};return s.classList.add("ripple-container"),s.style.overflow="hidden",t.useClick===!0?s.addEventListener("click",f=>{e=Ot(f,t),Pt(e)}):(s.addEventListener("pointerdown",o),s.addEventListener("pointerup",l),s.addEventListener("pointerleave",l)),()=>{s.classList.remove("ripple-container"),s.removeEventListener("pointerdown",o),s.removeEventListener("pointerup",l),s.removeEventListener("pointerleave",l)}}const be=Object.freeze(Object.defineProperty({__proto__:null,create:qt,defaultOptions:he,start:Ot,stop:Pt},Symbol.toStringTag,{value:"Module"}));function we(){return/(android)/i.test(navigator.userAgent)}const a=String.raw,ye=String.raw,xe=Object.freeze(Object.defineProperty({__proto__:null,css:ye,html:a,isAndroid:we},Symbol.toStringTag,{value:"Module"})),Le=Object.freeze(Object.defineProperty({__proto__:null,draggable:fe,events:ve,ripple:be,utils:xe},Symbol.toStringTag,{value:"Module"})),ke=a`
<style>
    :host {
        display: flex !important;
        position: absolute !important;
        z-index: 100;
        background-color: var(--ui-backdrop-bgColor);
        backdrop-filter: var(--ui-backdropFilter);
        overflow: hidden;
        user-select: none;
    }

    :host([position="top"]) {
        top: 0;
        left: 0;
        width: 100%;
        height: var(--ui-app-bar-height);
        border-bottom: 1px solid var(--ui-borderColor);
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
`;var M,_t;let Ce=(_t=class{constructor(t){n(this,M,void 0);c(this,M,t)}getLeftSlot(){return[...i(this,M).querySelectorAll('[slot="left"]')]}getCenterSlot(){return[...i(this,M).querySelectorAll('[slot="center"]')]}getRightSlot(){return[...i(this,M).querySelectorAll('[slot="right"]')]}},M=new WeakMap,_t);const ft=class ft extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ke,this.ui=new Ce(this)}};r(ft,"register",()=>customElements.define("ui-app-bar",ft));let W=ft;const Me=a`
<style>
    :host {
        display: flex !important;
        align-items: center;
        justify-content: center;
        position: relative !important;
        padding: var(--ui-spacing) calc(var(--ui-spacing) * 2.5);
        border: 1px solid currentColor;
        border-radius: var(--ui-radius);
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

    :host([disabled]),
    :host([disabled]:hover),
    :host([disabled]:active) {
        background-color: transparent;
        opacity: 0.25;
        cursor: default;
        pointer-events: none;
    }
</style>

<slot></slot>
`;var b,te;let Te=(te=class{constructor(t){n(this,b,void 0);c(this,b,t),this.removeRipple=null}disable(){i(this,b).setAttribute("disabled","")}enable(){i(this,b).removeAttribute("disabled")}enableRipple(){this.removeRipple||(this.removeRipple=qt(i(this,b),{centered:!0}),i(this,b).removeAttribute("no-ripple"))}disableRipple(){this.removeRipple&&(this.removeRipple(),this.removeRipple=null,i(this,b).setAttribute("no-ripple",""))}},b=new WeakMap,te);const I=class I extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Me,this.setAttribute("role","button"),this.ui=new Te(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(t,e,o){switch(t){case"no-ripple":o!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r(I,"register",()=>customElements.define("ui-button",I)),r(I,"observedAttributes",["no-ripple"]);let F=I;const Ee=a`
<style>
    :host {
        display: flex !important;
        align-items: center;
        justify-content: center;
        position: relative !important;
        width: 2rem;
        height: 2rem;
        padding: calc(var(--ui-spacing) / 2);
        border: 1px solid currentColor;
        border-radius: var(--ui-radius);
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

    :host([disabled]),
    :host([disabled]:hover),
    :host([disabled]:active) {
        opacity: 0.25;
        cursor: default;
        pointer-events: none;
    }
</style>

<slot></slot>
`;var w,ee;let He=(ee=class{constructor(t){n(this,w,void 0);c(this,w,t),this.removeRipple=null}disable(){i(this,w).setAttribute("disabled","")}enable(){i(this,w).removeAttribute("disabled")}enableRipple(){this.removeRipple||(this.removeRipple=qt(i(this,w),{centered:!0}),i(this,w).removeAttribute("no-ripple"))}disableRipple(){this.removeRipple&&(this.removeRipple(),this.removeRipple=null,i(this,w).setAttribute("no-ripple",""))}},w=new WeakMap,ee);const z=class z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ee,this.setAttribute("role","button"),this.ui=new He(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(t,e,o){switch(t){case"no-ripple":o!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r(z,"register",()=>customElements.define("ui-icon-button",z)),r(z,"observedAttributes",["no-ripple"]);let G=z;const Se=a`
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
`,vt=class vt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Se}};r(vt,"register",()=>customElements.define("ui-container",vt));let _=vt;const Ae=a`
<style>
    :host dialog * {
        box-sizing: border-box;
    }

    dialog {
        position: fixed !important;

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
        background-color: var(--ui-backdrop-bgColor);
        backdrop-filter: var(--ui-backdropFilter);
    }

    dialog > .container {
        background-color: var(--ui-bgColor);
        color: var(--ui-color);

        border: 1px solid var(--ui-borderColor);
        border-radius: var(--ui-radius);

        padding: var(--ui-spacing);

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        position: relative;
    }

    :host([fullscreen]) dialog {
        width: 100%;
        height: 100%;
    }

    :host([fullscreen]) dialog > .container {
        width: calc(100% - var(--ui-spacing) * 2);
        height: calc(100% - (env(safe-area-inset-top, 0) + env(safe-area-inset-bottom, 0) + (var(--ui-spacing) * 2)));

        margin: var(--ui-spacing);
        margin-top: calc(env(safe-area-inset-top, 0) + var(--ui-spacing));
        margin-bottom: calc(env(safe-area-inset-bottom, 0) + var(--ui-spacing));
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

    .header h4 {
        margin: auto 0;
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

    .footer ui-flex-grid-row {
        height: 100%;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
    }
</style>

<dialog>
	<div class="container">
        <div class="header">
            <span><slot name="title"></slot></span>

            <ui-icon-button style="width: var(--ui-dialog-header-height); height: 100%;" ghost>
                <ui-svg-close></ui-svg-close>
            </ui-icon-button>
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
`;var k,p,C,ie;let Re=(ie=class{constructor(t,e){n(this,k,void 0);n(this,p,void 0);n(this,C,void 0);c(this,k,t),c(this,p,e),this.events=new j,c(this,C,document.createElement("h4")),i(this,C).slot="title",i(this,k).appendChild(i(this,C))}get dialog(){return i(this,p)}get fullscreen(){return i(this,k).hasAttribute("fullscreen")}set fullscreen(t){t?i(this,k).setAttribute("fullscreen",""):i(this,k).removeAttribute("fullscreen")}get title(){return i(this,C).innerText}set title(t){i(this,C).innerText=t}open(t=!1,e=!0){const o=i(this,p).inert;i(this,p).inert=e,t?i(this,p).showModal():i(this,p).show(),this.events.dispatch("open",null),i(this,p).inert=o}close(){i(this,p).close(),this.events.dispatch("close",null)}},k=new WeakMap,p=new WeakMap,C=new WeakMap,ie);var N,B;const bt=class bt extends HTMLElement{constructor(){super();n(this,N,()=>this.ui.close());n(this,B,()=>this.ui.close());this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ae,this.ui=new Re(this,this.shadowRoot.querySelector("dialog"))}connectedCallback(){const e=this.shadowRoot.querySelector(".header ui-icon-button");e.addEventListener("click",i(this,B)),e.addEventListener("click",i(this,N))}disconnectedCallback(){const e=this.shadowRoot.querySelector(".header ui-icon-button");e.removeEventListener("click",i(this,B)),e.removeEventListener("click",i(this,N))}};N=new WeakMap,B=new WeakMap,r(bt,"register",()=>customElements.define("ui-dialog",bt));let tt=bt;const Wt="1",$e=a`
<style></style>
<slot></slot>
`,U=class U extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=$e,this._updateStyle()}attributeChangedCallback(t,e,o){switch(t){case"flex":this._updateStyle({flex:o||Wt});break}}_updateStyle({flex:t=Wt}={}){this.shadowRoot.querySelector("style").textContent=`
            :host {
                flex: ${t};
            }
        `}};r(U,"register",()=>customElements.define("ui-flex-grid-item",U)),r(U,"observedAttributes",["flex"]);let et=U;const Ft="0",je=a`
<style></style>
<slot></slot>
`,q=class q extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=je,this._updateStyle()}attributeChangedCallback(t,e,o){switch(t){case"gap":this._updateStyle({gap:o||Ft});break}}_updateStyle({gap:t=Ft}={}){this.shadowRoot.querySelector("style").textContent=`
            :host {
                display: flex !important;
                flex-flow: row nowrap;
                position: relative !important;
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
        `}};r(q,"register",()=>customElements.define("ui-flex-grid-row",q)),r(q,"observedAttributes",["gap"]);let it=q;const Gt="0",Ie=a`
<style></style>
<slot></slot>
`,O=class O extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ie,this._updateStyle()}attributeChangedCallback(t,e,o){switch(t){case"gap":this._updateStyle({gap:o||Gt});break}}_updateStyle({gap:t=Gt}={}){this.shadowRoot.querySelector("style").textContent=`
            :host {
                display: flex !important;
                flex-flow: column nowrap;
                position: relative !important;
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
        `}};r(O,"register",()=>customElements.define("ui-flex-grid",O)),r(O,"observedAttributes",["gap"]);let st=O;const de=document.createElement("template");de.innerHTML=`
    <style>
        .container {
        }
    </style>

    <span class="container">
    </span>
`;const wt=class wt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(de.content.cloneNode(!0))}};r(wt,"register",customElements.define("ui-input",wt));let ot=wt;const ze=a`
<style>
    :host {
        display: none;
        align-items: center;

        padding: var(--ui-spacing);
        padding-right: 2rem;

        height: calc(1em * var(--ui-lineHeight) + var(--ui-spacing) * 2);

        white-space: nowrap;
        text-overflow: ellipsis;

        transition: background-color 0.25s linear, color 0.25s linear;

        overflow: hidden;
    }
</style>

<slot></slot>
`;var y,se;let Ue=(se=class{constructor(t){n(this,y,void 0);c(this,y,t)}get value(){return i(this,y).getAttribute("value")}set value(t){i(this,y).setAttribute("value",t)}get selected(){return i(this,y).hasAttribute("selected")}set selected(t){t?i(this,y).setAttribute("selected",""):i(this,y).removeAttribute("selected")}},y=new WeakMap,se);const yt=class yt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ze,this.setAttribute("role","button"),this.ui=new Ue(this)}};r(yt,"register",()=>customElements.define("ui-select-option",yt));let Z=yt;const qe=a`
<style>
    * {
        box-sizing: border-box;
    }

    :host {
        --ui-bgColor: "transparent";
        --items-length: 0;

        position: relative !important; 
        display: block !important;

        width: 100%;
        height: calc(1em * var(--ui-lineHeight) + var(--ui-spacing) * 2);
        transition: height 0.25s ease;

        background-color: var(--ui-bgColor);
        color: var(--ui-color);

        border: 1px solid var(--ui-borderColor);
        border-radius: var(--ui-radius);

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
        height: calc((1em * var(--ui-lineHeight) + var(--ui-spacing) * 2) * var(--items-length));
    }

    :host(.open) .options {
        display: block;
    }

    :host(.open) .icon {
        display: none;
    }

    :host(.open) ::slotted(ui-select-option[selected]) {
        background-color: var(--ui-primary-bgColor);
        color: var(--ui-primary-color);
    }

    :host(.open) ::slotted(ui-select-option:not([selected]):hover) {
        background-color: hsla(var(--ui-color-hsl), 0.1);
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
`;let Oe=class{constructor(){this.events=new j}};var J;const xt=class xt extends HTMLElement{constructor(){super();n(this,J,async e=>{(e.composedPath()||[]).forEach(o=>{o instanceof Z&&([...this.querySelectorAll("ui-select-option")].forEach(l=>l.removeAttribute("selected")),o.setAttribute("selected",""),this.ui.events.dispatch("change",o))})});this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=qe,this.cleanup=[],this.ui=new Oe}connectedCallback(){const e=this.shadowRoot.querySelector(".options"),o=this.onClickOptions.bind(this);e.addEventListener("click",o),this.cleanup.push(()=>{this.removeEventListener("click",o),e.removeEventListener("click",this.onClickOptions)}),this.style.setProperty("--items-length",this.querySelectorAll("ui-select-option").length.toString())}disconnectedCallback(){this.cleanup.forEach(e=>e()),this.cleanup=[]}async onClickOptions(e){this.classList.toggle("open")?(e.stopPropagation(),this.addEventListener("click",i(this,J))):setTimeout(()=>this.removeEventListener("click",i(this,J)))}};J=new WeakMap,r(xt,"register",()=>customElements.define("ui-select",xt));let rt=xt;var X,H,Y,oe;let Pe=(oe=class{constructor(t){n(this,X,void 0);n(this,H,void 0);n(this,Y,void 0);c(this,X,t),c(this,H,new j),this.langType=null}getFallbackElement(){return i(this,X).querySelector("ui-lang-type[fallback]")}new(t,e){this.langType=t,c(this,Y,e),i(this,H).dispatch("change",this.langType)}get(t,e){var o,l;return((l=(o=i(this,Y))==null?void 0:o[t])==null?void 0:l[e])||null}on(t,e,o=!1){if(typeof e!="function")throw"callback is not a function";return o&&e(this.langType),i(this,H).on(t,e)}},X=new WeakMap,H=new WeakMap,Y=new WeakMap,oe);const P=class P extends HTMLElement{constructor(){super(),this.ui=new Pe(this)}attributeChangedCallback(t,e,o){switch(t){case"current":o!==null&&this._loadLanguage(o);break}}async _loadLanguage(t){const e=this.querySelector(`ui-lang-type[name="${t}"]`)||this.ui.getFallbackElement();if(!e)return;if(!e.ui.href)throw"Missing href attribute!";const o=await fetch(e.ui.href);this.ui.new(e,await o.json())}};r(P,"register",()=>customElements.define("ui-lang",P)),r(P,"observedAttributes",["current"]);let nt=P;var g,re;let De=(re=class{constructor(t){n(this,g,void 0);c(this,g,t)}get name(){return i(this,g).getAttribute("name")}set name(t){i(this,g).setAttribute("name",t)}get href(){return i(this,g).getAttribute("href")}set href(t){i(this,g).setAttribute("href",t)}get fallback(){return i(this,g).hasAttribute("fallback")}set fallback(t){t?i(this,g).setAttribute("fallback",""):i(this,g).removeAttribute("fallback")}},g=new WeakMap,re);const Lt=class Lt extends HTMLElement{constructor(){super(),this.ui=new De(this)}};r(Lt,"register",()=>customElements.define("ui-lang-type",Lt));let at=Lt;const Ve=a`
<style>
    .background {
        z-index: 999;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--ui-backdrop-bgColor);
        backdrop-filter: var(--ui-backdropFilter);
    }

    .spinner {
        z-index: 1000;
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2.5rem;
        height: 2.5rem;
        margin-top: -1.25rem;
        margin-left: -1.25rem;
        border-radius: 50%;
        border: 2px solid var(--ui-borderColor);
        border-top-color: var(--ui-primary-bgColor);
        animation: spinner .6s linear infinite;
    }

    @keyframes spinner {
        to {transform: rotate(360deg);}
    }
</style>

<div class="background"></div>
<div class="spinner"></div>
`,kt=class kt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ve}};r(kt,"register",()=>customElements.define("ui-spinner",kt));let lt=kt;const Ze=a`
    <style>
        :host {
            display: block !important;
            position: absolute !important;
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
`;var S,ne;let Ne=(ne=class{constructor(t){n(this,S,void 0);c(this,S,t)}get name(){return i(this,S).getAttribute("name")}set name(t){i(this,S).setAttribute("name",t)}},S=new WeakMap,ne);const Ct=class Ct extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ze,this.ui=new Ne(this)}};r(Ct,"register",()=>customElements.define("ui-stack-layout-page",Ct));let ct=Ct;const Be=a`
    <style>
        :host {
            display: block !important;
            position: relative !important;
            width: 100%;
            height: 100%;
        }
    </style>

    <slot></slot>
`;var T,E,A,ae;let Je=(ae=class{constructor(t){n(this,T,void 0);n(this,E,!1);n(this,A,{});c(this,T,t),this.events=new j,this.stack=[]}registerPage(t,e){i(this,A)[t]=e}unregisterPage(t){delete i(this,A)[t]}lock(){c(this,E,!0)}unlock(){c(this,E,!1)}goBack(){if(!this.stack.length||i(this,E))return;const t=this.stack.pop();i(this,T).removeChild(t),this.stack.length&&i(this,T).appendChild(this.stack[this.stack.length-1]),this.dispatchChangeEvent()}setPage(t){if(!i(this,E)){if(this.stack.push(i(this,T).appendChild(i(this,A)[t]().children[0])),this.stack.length>1){const e=this.stack[this.stack.length-2];e.parentElement.removeChild(e)}this.dispatchChangeEvent()}}async dispatchChangeEvent(){this.events.dispatch("change",{newPage:this.stack[this.stack.length-1]||null,oldPage:this.stack[this.stack.length-2]||null})}},T=new WeakMap,E=new WeakMap,A=new WeakMap,ae);const Mt=class Mt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Be,this.ui=new Je(this)}};r(Mt,"register",()=>customElements.define("ui-stack-layout",Mt));let ht=Mt;var x,L,le;let Xe=(le=class{constructor(t){n(this,x,void 0);n(this,L,{});c(this,x,t),this.events=new j}get localStoragePrefix(){return i(this,x).getAttribute("local-storage-prefix")}set localStoragePrefix(t){i(this,x).setAttribute("local-storage-prefix",t)}get enableLocalStorage(){return i(this,x).hasAttribute("enable-local-storage")}set enableLocalStorage(t){t?i(this,x).setAttribute("enable-local-storage",""):i(this,x).removeAttribute("enable-local-storage")}get(t){return i(this,L)[t]}set(t,e,o=!1){if(o&&this.enableLocalStorage){const l=JSON.parse(localStorage.getItem(this.localStoragePrefix+t.toString())||"null");i(this,L)[t]=l??e}else i(this,L)[t]=e;this.enableLocalStorage&&localStorage.setItem(this.localStoragePrefix+t.toString(),JSON.stringify(i(this,L)[t])),this.events.dispatch(t,i(this,L)[t])}update(t,e){if(typeof e!="function")throw"callback is not a function";this.set(t,e(i(this,L)[t]))}on(t,e,o=!1){if(typeof e!="function")throw"callback is not a function";return o&&e(this.get(t)),this.events.on(t,e)}},x=new WeakMap,L=new WeakMap,le);const Tt=class Tt extends HTMLElement{constructor(){super(),this.ui=new Xe(this)}};r(Tt,"register",()=>customElements.define("ui-store",Tt));let dt=Tt;const Ye=a`
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
`,Et=class Et extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ye}};r(Et,"register",()=>customElements.define("ui-svg-back-arrow-navigation",Et));let Dt=Et;const Ke=a`
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
`,Ht=class Ht extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ke}};r(Ht,"register",()=>customElements.define("ui-svg-chevron-down",Ht));let Vt=Ht;const Qe=a`
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
`,St=class St extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Qe}};r(St,"register",()=>customElements.define("ui-svg-close",St));let Zt=St;const We=a`
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
`,At=class At extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=We}};r(At,"register",()=>customElements.define("ui-svg-delete-recycle-bin",At));let Nt=At;const Fe=a`
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
`,Rt=class Rt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Fe}};r(Rt,"register",()=>customElements.define("ui-svg-edit2",Rt));let Bt=Rt;const Ge=a`
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
`,$t=class $t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ge}};r($t,"register",()=>customElements.define("ui-svg-pdf-document",$t));let Jt=$t;const _e=a`
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
`,jt=class jt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=_e}};r(jt,"register",()=>customElements.define("ui-svg-settings",jt));let Xt=jt;const ti=a`
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
`,It=class It extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ti}};r(It,"register",()=>customElements.define("ui-svg-today-outline",It));let Yt=It;const v={BackArrowNavigation:Dt,ChevronDown:Vt,Close:Zt,DeleteRecycleBin:Nt,Edit2:Bt,PDFDocument:Jt,Settings:Xt,TodayOutline:Yt},ei=a`
<style>
    :host {
        position: relative !important;
        display: flex !important;
        flex-direction: row;
        width: 100%;
        padding: var(--ui-spacing);
        border-radius: var(--ui-radius);
    }

    :host > .text {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        margin-right: var(--ui-spacing);
    }

    :host > .input {
        display: flex;
        align-items: center;
        justify-content: flex-end;
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
`;var h,R,K,Q,$,ce;let ii=(ce=class{constructor(t){n(this,h,void 0);n(this,R,!1);n(this,K,async()=>{[...i(this,h).querySelectorAll('[slot="input"]')].forEach(t=>t.click())});n(this,Q,async t=>{t.stopPropagation()});n(this,$,void 0);c(this,h,t)}get primary(){return i(this,h).getAttribute("primary")}set primary(t){i(this,h).setAttribute("primary",t)}get secondary(){return i(this,h).getAttribute("secondary")}set secondary(t){i(this,h).setAttribute("secondary",t)}getInputSlot(){return[...i(this,h).querySelectorAll('[slot="input"]')]}enableRipple(){i(this,$)||(this.removeRipple=qt(i(this,h)),i(this,h).style.cursor="pointer",this._startInputHandling())}disableRipple(){i(this,$)&&i(this,$).call(this),this._stopInputHandling()}_startInputHandling(){i(this,R)||(i(this,h).addEventListener("click",i(this,K)),this.getInputSlot().forEach(t=>{t.addEventListener("click",i(this,Q))}),c(this,R,!0))}_stopInputHandling(){i(this,h).removeEventListener("click",i(this,K)),[...i(this,h).querySelectorAll('[slot="input"]')].forEach(t=>{t.removeEventListener("click",i(this,Q))}),c(this,R,!1)}},h=new WeakMap,R=new WeakMap,K=new WeakMap,Q=new WeakMap,$=new WeakMap,ce);const D=class D extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ei,this.ui=new ii(this)}attributeChangedCallback(t,e,o){switch(t){case"ripple":o!==null?this.ui.enableRipple():this.ui.disableRipple();break;case"primary":this.shadowRoot.querySelector("ui-primary").innerHTML=o||"";break;case"secondary":this.shadowRoot.querySelector("ui-secondary").innerHTML=o||"";break}}};r(D,"register",()=>customElements.define("ui-label",D)),r(D,"observedAttributes",["ripple","secondary","primary"]);let ut=D;const si=a`
<style>
    :host {
        font-size: 1.1rem;
        font-family: var(--ui-fontFamily);
        font-variation-settings: var(--ui-text-primary-fontVariation);
    }
</style>

<slot></slot>
`,zt=class zt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=si}};r(zt,"register",()=>customElements.define("ui-primary",zt));let pt=zt;const oi=a`
<style>
    :host {
        font-size: 0.9rem;
        font-family: var(--ui-fontFamily);
        font-variation-settings: var(--ui-text-secondary-fontVariation);
    }
</style>

<slot></slot>
`,Ut=class Ut extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=oi}};r(Ut,"register",()=>customElements.define("ui-secondary",Ut));let gt=Ut;var m;class ri{constructor(){n(this,m,null);this.currentTheme=null,this.themes={}}enableAutoMode(){if(this.removeMode(),i(this,m)){this.mediaChangeHandler(i(this,m));return}c(this,m,window.matchMedia("(prefers-color-scheme: dark)")),i(this,m).addEventListener("change",this.mediaChangeHandler),this.mediaChangeHandler(i(this,m))}disableAutoMode(){this.removeMedia()}addTheme(t,e){this.themes[t]=e}loadTheme(t){var o;if(!this.themes[t])throw`theme "${t}" is missing in this.themes`;if(((o=this.currentTheme)==null?void 0:o.name)==t)return;{const l=document.getElementById("theme");l&&(document.head.removeChild(l),this.currentTheme=null)}const e=document.createElement("link");e.id="theme",e.rel="stylesheet",e.href=this.themes[t],document.head.appendChild(e),this.currentTheme={name:t,href:this.themes[t]}}mediaChangeHandler(t){t.matches?document.body.setAttribute("data-theme","dark"):document.body.setAttribute("data-theme","light")}removeMode(t=document.body){t.removeAttribute("data-theme")}setMode(t,e=document.body){switch(t){case"dark":e.setAttribute("data-theme",t);break;case"light":e.setAttribute("data-theme",t);break}}removeMedia(){i(this,m)&&(i(this,m).removeEventListener("change",this.mediaChangeHandler),c(this,m,null))}}m=new WeakMap;const V=class V extends HTMLElement{constructor(){super(),this.ui=new ri}attributeChangedCallback(t,e,o){switch(t){case"auto":o!==null?this.ui.enableAutoMode():this.ui.disableAutoMode();break;case"mode":o!==null?this.ui.setMode(o):this.ui.removeMode();break}}};r(V,"register",()=>customElements.define("ui-theme-handler",V)),r(V,"observedAttributes",["auto","mode"]);let mt=V;const ni=Object.freeze(Object.defineProperty({__proto__:null,AppBar:W,Button:F,Container:_,Dialog:tt,FlexGrid:st,FlexGridItem:et,FlexGridRow:it,IconButton:G,Input:ot,Label:ut,Lang:nt,LangType:at,Primary:pt,Secondary:gt,Select:rt,SelectOption:Z,Spinner:lt,StackLayout:ht,StackLayoutPage:ct,Store:dt,ThemeHandler:mt,svg:v},Symbol.toStringTag,{value:"Module"}));async function ai(){W.register(),G.register(),F.register(),_.register(),et.register(),it.register(),st.register(),ot.register(),Z.register(),rt.register(),at.register(),nt.register(),lt.register(),ct.register(),ht.register(),dt.register(),gt.register(),pt.register(),ut.register(),mt.register(),tt.register()}async function li(){v.BackArrowNavigation.register(),v.ChevronDown.register(),v.Close.register(),v.DeleteRecycleBin.register(),v.Edit2.register(),v.PDFDocument.register(),v.Settings.register(),v.TodayOutline.register()}const ci={js:Le,wc:ni,define:ai,defineSVG:li};module.exports=ci;
