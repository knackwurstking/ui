"use strict";var ae=Object.defineProperty;var le=(o,t,e)=>t in o?ae(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var r=(o,t,e)=>(le(o,typeof t!="symbol"?t+"":t,e),e),Jt=(o,t,e)=>{if(!t.has(o))throw TypeError("Cannot "+e)};var i=(o,t,e)=>(Jt(o,t,"read from private field"),e?e.call(o):t.get(o)),n=(o,t,e)=>{if(t.has(o))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(o):t.set(o,e)},c=(o,t,e,s)=>(Jt(o,t,"write to private field"),s?s.call(o,e):t.set(o,e),e);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var g;class q{constructor(){n(this,g,{})}on(t,e){if(typeof e!="function")throw`invalid event listener passed for "${t.toString()}" event!`;return i(this,g)[t]||(i(this,g)[t]=[]),i(this,g)[t].push(e),()=>{this.off(t,e)}}off(t,e){if(!i(this,g)[t])throw`no listeners found for ${t.toString()}, there is nothing to delete`;let s=!1,a=0;for(const L of i(this,g)[t])L===e&&(i(this,g)[t].splice(a,1),s=!0),a++;if(!s)throw`listener not found for ${t.toString()}, there is nothing to delete`;return this}dispatch(t,e){if(e===void 0)throw"data is undefined!";if(i(this,g)[t])for(const s of i(this,g)[t])s(e);return this}}g=new WeakMap;function Wt(o,t){const e=document.createElement("div");e.classList.add("ripple"),e.style.position="absolute",e.style.color="inherit",e.style.borderRadius="50%",e.style.pointerEvents="none",e.style.width="100px",e.style.height="100px",e.style.marginTop="-50px",e.style.marginLeft="-50px",e.style.opacity=`${t.opacity}`,e.style.backgroundColor=t.color,e.style.transform="scale(0) translate(0, 0)",e.style.transition=`transform ${t.spreadDuration} ${t.spreadTiming} 0s,opacity ${t.clearDuration} ${t.clearTiming} 0s`,o.currentTarget.appendChild(e);const s=o.currentTarget.getBoundingClientRect();t.centered?(e.style.top=`${s.height/2}px`,e.style.left=`${s.width/2}px`):(e.style.top=`${o.clientY-s.top}px`,e.style.left=`${o.clientX-s.left}px`);const a=Math.max(s.width,s.height)*.02;return e.style.transform=`scale(${a}) translate(0, 0)`,e}function Yt(o){o&&(o.addEventListener("transitionend",t=>{t.propertyName==="opacity"&&o.remove()}),o.style.opacity="0")}const ce={color:"var(--ui-ripple-color, currentColor)",opacity:"var(--ui-ripple-opacity, 0.2)",centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out",useClick:!1};function Dt(o,t={}){t={...ce,...t};let e;const s=L=>{e=Wt(L,t)},a=()=>{Yt(e)};return o.classList.add("ripple-container"),o.style.overflow="hidden",t.useClick===!0?o.addEventListener("click",L=>{e=Wt(L,t),Yt(e)}):(o.addEventListener("pointerdown",s),o.addEventListener("pointerup",a),o.addEventListener("pointerleave",a)),()=>{o.classList.remove("ripple-container"),o.removeEventListener("pointerdown",s),o.removeEventListener("pointerup",a),o.removeEventListener("pointerleave",a)}}const l=String.raw;class h{constructor(){this.callbacks=[]}add(t){this.callbacks.push(t)}async run(){for(let t=0;t<this.callbacks.length;t++)if(this.callbacks[t]!==null)try{await this.callbacks[t](),this.callbacks[t]=null}catch(e){console.error("cleanup error:",e)}this.callbacks=this.callbacks.filter(t=>t!==null)}}const he=l`
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
`;var M,Xt;let ue=(Xt=class{constructor(t){n(this,M,void 0);c(this,M,t)}getLeftSlot(){return[...i(this,M).querySelectorAll('[slot="left"]')]}getCenterSlot(){return[...i(this,M).querySelectorAll('[slot="center"]')]}getRightSlot(){return[...i(this,M).querySelectorAll('[slot="right"]')]}},M=new WeakMap,Xt);const xt=class xt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=he,this.cleanup=new h,this.ui=new ue(this)}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};r(xt,"register",()=>{console.debug("register web component: ui-app-bar"),customElements.define("ui-app-bar",xt)});let st=xt;const de=l`
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
`;var p,Kt;let pe=(Kt=class{constructor(t){n(this,p,void 0);c(this,p,t),this.removeRipple=null}get color(){return i(this,p).getAttribute("color")}set color(t){i(this,p).setAttribute("color",t)}get variant(){return i(this,p).getAttribute("variant")}set variant(t){i(this,p).setAttribute("variant",t)}disable(){i(this,p).setAttribute("disabled","")}enable(){i(this,p).removeAttribute("disabled")}enableRipple(){this.removeRipple||(this.removeRipple=Dt(i(this,p),{centered:!0}),i(this,p).removeAttribute("no-ripple"))}disableRipple(){this.removeRipple&&(this.removeRipple(),this.removeRipple=null,i(this,p).setAttribute("no-ripple",""))}},p=new WeakMap,Kt);const j=class j extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=de,this.setAttribute("role","button"),this.cleanup=new h,this.ui=new pe(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"no-ripple":s!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r(j,"register",()=>{console.debug("register web component: ui-button"),customElements.define("ui-button",j)}),r(j,"observedAttributes",["no-ripple"]);let ot=j;const ge=l`
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
`;var d,Qt;let me=(Qt=class{constructor(t){n(this,d,void 0);c(this,d,t),this.removeRipple=null}get color(){return i(this,d).getAttribute("color")}set color(t){i(this,d).setAttribute("color",t)}get ghost(){return i(this,d).hasAttribute("ghost")}set ghost(t){t?i(this,d).setAttribute("ghost",""):i(this,d).removeAttribute("ghost")}disable(){i(this,d).setAttribute("disabled","")}enable(){i(this,d).removeAttribute("disabled")}enableRipple(){this.removeRipple||(this.removeRipple=Dt(i(this,d),{centered:!0}),i(this,d).removeAttribute("no-ripple"))}disableRipple(){this.removeRipple&&(this.removeRipple(),this.removeRipple=null,i(this,d).setAttribute("no-ripple",""))}},d=new WeakMap,Qt);const z=class z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ge,this.setAttribute("role","button"),this.cleanup=new h,this.ui=new me(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"no-ripple":s!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r(z,"register",()=>{console.debug("register web component: ui-icon-button"),customElements.define("ui-icon-button",z)}),r(z,"observedAttributes",["no-ripple"]);let rt=z;const be=l`
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
`,Ct=class Ct extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=be,this.cleanup=new h}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};r(Ct,"register",()=>{console.debug("register web component: ui-container"),customElements.define("ui-container",Ct)});let nt=Ct;const ve=l`
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
`;var k,m,x,Gt;let fe=(Gt=class{constructor(t,e){n(this,k,void 0);n(this,m,void 0);n(this,x,void 0);c(this,k,t),c(this,m,e),this.events=new q,c(this,x,document.createElement("h4")),i(this,x).slot="title",i(this,k).appendChild(i(this,x))}get fullscreen(){return i(this,k).hasAttribute("fullscreen")}set fullscreen(t){t?i(this,k).setAttribute("fullscreen",""):i(this,k).removeAttribute("fullscreen")}get title(){return i(this,x).innerText}set title(t){i(this,x).innerText=t}getDialogElement(){return i(this,m)}open(t=!1,e=!0){const s=i(this,m).inert;i(this,m).inert=e,t?i(this,m).showModal():i(this,m).show(),this.events.dispatch("open",null),i(this,m).inert=s}close(){i(this,m).close(),this.events.dispatch("close",null)}},k=new WeakMap,m=new WeakMap,x=new WeakMap,Gt);const Lt=class Lt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ve,this.cleanup=new h,this.ui=new fe(this,this.shadowRoot.querySelector("dialog"))}connectedCallback(){const t=this.shadowRoot.querySelector(".header ui-icon-button"),e=()=>{this.ui.close()};t.addEventListener("click",e);const s=this.shadowRoot.querySelector("dialog"),a=L=>{L.preventDefault()};s.addEventListener("cancel",a),this.cleanup.add(()=>{t.removeEventListener("click",e),s.removeEventListener("cancel",a)})}disconnectedCallback(){this.cleanup.run()}};r(Lt,"register",()=>{console.debug("register web component: ui-dialog"),customElements.define("ui-dialog",Lt)});let at=Lt;const Ot="1",we=l`
<style></style>
<slot></slot>
`;let ye=class{constructor(t){this.root=t}get flex(){return this.root.hasAttribute("flex")?this.root.getAttribute("flex"):Ot}set flex(t){t===null?this.root.removeAttribute("flex"):this.root.setAttribute("flex",t)}};const N=class N extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=we,this.cleanup=new h,this.ui=new ye(this),this.updateStyle()}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"flex":this.updateStyle({flex:s||Ot});break}}updateStyle({flex:t=Ot}={}){this.shadowRoot.querySelector("style").textContent=`
            :host {
                flex: ${t};
            }
        `}};r(N,"register",()=>{console.debug("register web component: ui-flex-grid-item"),customElements.define("ui-flex-grid-item",N)}),r(N,"observedAttributes",["flex"]);let lt=N;const Ut="0",ke=l`
<style></style>
<slot></slot>
`;let xe=class{constructor(t){this.root=t}get gap(){return this.root.getAttribute("gap")||Ut}set gap(t){t===null?this.root.removeAttribute("gap"):this.root.setAttribute("gap",t)}};const P=class P extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ke,this.cleanup=new h,this.ui=new xe(this),this.updateStyle()}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"gap":this.updateStyle({gap:s||Ut});break}}updateStyle({gap:t=Ut}={}){this.shadowRoot.querySelector("style").textContent=`
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
        `}};r(P,"register",()=>{console.debug("register web component: ui-flex-grid-row"),customElements.define("ui-flex-grid-row",P)}),r(P,"observedAttributes",["gap"]);let ct=P;const Ft="0",Ce=l`
<style></style>
<slot></slot>
`;let Le=class{constructor(t){this.root=t}get gap(){return this.root.getAttribute("gap")||Ft}set gap(t){t===null?this.root.removeAttribute("gap"):this.root.setAttribute("gap",t)}};const I=class I extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ce,this.cleanup=new h,this.ui=new Le(this),this.updateStyle()}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"gap":this.updateStyle({gap:s||Ft});break}}updateStyle({gap:t=Ft}={}){this.shadowRoot.querySelector("style").textContent=`
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
        `}};r(I,"register",()=>{console.debug("register web component: ui-flex-grid"),customElements.define("ui-flex-grid",I)}),r(I,"observedAttributes",["gap"]);let ht=I;const Me=l`
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
`;var u,H,_,tt,A,_t;let Te=(_t=class{constructor(t){n(this,u,void 0);n(this,H,!1);n(this,_,async()=>{[...i(this,u).querySelectorAll('[slot="input"]')].forEach(t=>t.click())});n(this,tt,async t=>{t.stopPropagation()});n(this,A,void 0);c(this,u,t)}get primary(){return i(this,u).getAttribute("primary")}set primary(t){i(this,u).setAttribute("primary",t)}get secondary(){return i(this,u).getAttribute("secondary")}set secondary(t){i(this,u).setAttribute("secondary",t)}getInputSlot(){return[...i(this,u).querySelectorAll('[slot="input"]')]}enableRipple(){i(this,A)||(this.removeRipple=Dt(i(this,u)),i(this,u).style.cursor="pointer",this.startInputHandling())}disableRipple(){i(this,A)&&i(this,A).call(this),this.stopInputHandling()}startInputHandling(){i(this,H)||(i(this,u).addEventListener("click",i(this,_)),this.getInputSlot().forEach(t=>{t.addEventListener("click",i(this,tt))}),c(this,H,!0))}stopInputHandling(){i(this,u).removeEventListener("click",i(this,_)),[...i(this,u).querySelectorAll('[slot="input"]')].forEach(t=>{t.removeEventListener("click",i(this,tt))}),c(this,H,!1)}},u=new WeakMap,H=new WeakMap,_=new WeakMap,tt=new WeakMap,A=new WeakMap,_t);const V=class V extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Me,this.cleanup=new h,this.ui=new Te(this)}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"ripple":s!==null?this.ui.enableRipple():this.ui.disableRipple();break;case"primary":this.shadowRoot.querySelector("ui-primary").innerHTML=s||"";break;case"secondary":this.shadowRoot.querySelector("ui-secondary").innerHTML=s||"";break}}};r(V,"register",()=>{console.debug("register web component: ui-label"),customElements.define("ui-label",V)}),r(V,"observedAttributes",["ripple","secondary","primary"]);let ut=V;const Ee=l`
<style>
    :host {
        font-size: 1.1rem;
        font-family: var(--ui-fontFamily);
        font-variation-settings: var(--ui-text-primary-fontVariation);
    }
</style>

<slot></slot>
`,Mt=class Mt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ee,this.cleanup=new h}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};r(Mt,"register",()=>{console.debug("register web component: ui-primary"),customElements.define("ui-primary",Mt)});let dt=Mt;const He=l`
<style>
    :host {
        font-size: 0.9rem;
        font-family: var(--ui-fontFamily);
        font-variation-settings: var(--ui-text-secondary-fontVariation);
    }
</style>

<slot></slot>
`,Tt=class Tt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=He,this.cleanup=new h}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};r(Tt,"register",()=>{console.debug("register web component: ui-secondary"),customElements.define("ui-secondary",Tt)});let U=Tt;const ne=document.createElement("template");ne.innerHTML=`
    <style>
        :host {
            display: block;
            position: relative;
            width: 100%;
        }
                // @ts-expect-error

        input {
            width: calc(100% - var(--ui-spacing) * 4);
            display: block;
            margin: 0;
            padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);
            border: none !important;
            border-radius: inherit;
            outline: none !important;
            font-size: 0.9rem;
            font-family: var(--ui-fontFamily);
            font-variation-settings: var(--ui-input-fontVariation);
            accent-color: var(--ui-primary-bgColor);
            background-color: transparent !important;
        }

        .container {
            width: 100%;
            border: none;
            border-bottom: 1px solid var(--ui-borderColor);
            border-radius: 0;
            transition: border-color 0.25s linear;
        }

        .container:has(input:focus) {
            border-color: var(--ui-primary-bgColor);
        }

        .container:has(input[aria-invalid]) {
            border-color: hsl(var(--ui-destructive-bgColor));
        }

        ::slotted([slot="title"]) {
            display: block;
            padding: 0 var(--ui-spacing);
            user-select: none;
            transform: translateY(calc(var(--ui-spacing) / 2));
        }
    </style>

    <div class="container">
        <slot name="title"></slot>
        <input>
    </div>
`;let Ae=class{constructor(t){this.root=t,this.events=new q,this.input=this.root.shadowRoot.querySelector("input"),this.input.type=this.root.getAttribute("type")||"text",this.input.oninput=()=>this.events.dispatch("input",this.value),this.input.onchange=()=>this.events.dispatch("change",this.value)}set title(t){let e=this.root.querySelector('[slot="title"]');t===null&&e&&(this.root.removeChild(e),e=null),e||(e=new U,e.slot="title",this.root.appendChild(e)),e.innerHTML=t||""}get title(){var t;return((t=this.root.querySelector('[slot="title"]'))==null?void 0:t.innerHTML)||null}set type(t){this.input.type=t}get type(){return this.input.type||"text"}set value(t){this.input.value=t}get value(){switch(this.input.type){case"number":return this.input.value?new Number(this.input.value):NaN;default:return this.input.value}}set placeholder(t){this.input.placeholder=t}get placeholder(){return this.input.placeholder}set invalid(t){this.input.ariaInvalid=t?"":null}get invalid(){return this.input.ariaInvalid!==null}set min(t){this.input.min=t}get min(){switch(this.input.type){case"number":return this.input.min?new Number(this.input.min):NaN;default:return this.input.min}}set max(t){this.input.max=t}get max(){switch(this.input.type){case"number":return this.input.max?new Number(this.input.max):NaN;default:return this.input.max}}};const Z=class Z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ne.content.cloneNode(!0)),this.cleanup=new h,this.ui=new Ae(this)}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"title":this.ui.title=s;break;case"type":s===null?this.ui.type="text":this.ui.type=s;break;case"value":this.ui.value=this.parseNewValue(s);break;case"placeholder":s===null?this.ui.placeholder="":this.ui.placeholder=s;break;case"invalid":this.ui.invalid=s!==null;break;case"min":this.ui.min=this.parseNewValue(s);break;case"max":this.ui.max=this.parseNewValue(s);break}}parseNewValue(t){switch(this.ui.type){case"number":return t?new Number(t):NaN;default:return t||""}}};r(Z,"register",()=>{console.debug("register web component: ui-input"),customElements.define("ui-input",Z)}),r(Z,"observedAttributes",["title","type","value","placeholder","invalid","min","max"]);let pt=Z;const Se=l`
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
`;var f,te;let Re=(te=class{constructor(t){n(this,f,void 0);c(this,f,t)}get value(){return i(this,f).getAttribute("value")}set value(t){i(this,f).setAttribute("value",t)}get selected(){return i(this,f).hasAttribute("selected")}set selected(t){t?i(this,f).setAttribute("selected",""):i(this,f).removeAttribute("selected")}},f=new WeakMap,te);const Et=class Et extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Se,this.setAttribute("role","button"),this.ui=new Re(this)}};r(Et,"register",()=>{console.debug("register web component: ui-select-option"),customElements.define("ui-select-option",Et)});let F=Et;const $e=l`
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
`;let qe=class{constructor(){this.events=new q}};var et;const Ht=class Ht extends HTMLElement{constructor(){super();n(this,et,async e=>{(e.composedPath()||[]).forEach(s=>{s instanceof F&&([...this.querySelectorAll("ui-select-option")].forEach(a=>a.removeAttribute("selected")),s.setAttribute("selected",""),this.ui.events.dispatch("change",s))})});this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=$e,this.cleanup=new h,this.ui=new qe}connectedCallback(){const e=this.shadowRoot.querySelector(".options"),s=this.onClickOptions.bind(this);e.addEventListener("click",s),this.cleanup.add(()=>{this.removeEventListener("click",s),e.removeEventListener("click",this.onClickOptions)}),this.style.setProperty("--items-length",this.querySelectorAll("ui-select-option").length.toString())}disconnectedCallback(){this.cleanup.run()}async onClickOptions(e){this.classList.toggle("open")?(e.stopPropagation(),this.addEventListener("click",i(this,et))):setTimeout(()=>this.removeEventListener("click",i(this,et)))}};et=new WeakMap,r(Ht,"register",()=>{console.debug("register web component: ui-select"),customElements.define("ui-select",Ht)});let gt=Ht;var C,S,it,ee;let je=(ee=class{constructor(t){n(this,C,void 0);n(this,S,void 0);n(this,it,void 0);c(this,C,t),c(this,S,new q),this.langType=null}get current(){return i(this,C).getAttribute("current")}set current(t){t===null?i(this,C).removeAttribute("current"):i(this,C).setAttribute("current",t)}getFallbackElement(){return i(this,C).querySelector("ui-lang-type[fallback]")}new(t,e){this.langType=t,c(this,it,e),i(this,S).dispatch("change",this.langType)}get(t,e){var s,a;return((a=(s=i(this,it))==null?void 0:s[t])==null?void 0:a[e])||null}on(t,e,s=!1){if(typeof e!="function")throw"callback is not a function";return s&&e(this.langType),i(this,S).on(t,e)}},C=new WeakMap,S=new WeakMap,it=new WeakMap,ee);const B=class B extends HTMLElement{constructor(){super(),this.ui=new je(this)}attributeChangedCallback(t,e,s){switch(t){case"current":s!==null&&this.loadLanguage(s);break}}async loadLanguage(t){const e=this.querySelector(`ui-lang-type[name="${t}"]`)||this.ui.getFallbackElement();if(!e)return;if(!e.ui.href)throw"Missing href attribute!";const s=await fetch(e.ui.href);this.ui.new(e,await s.json())}};r(B,"register",()=>{console.debug("register web component: ui-lang"),customElements.define("ui-lang",B)}),r(B,"observedAttributes",["current"]);let mt=B;var b,ie;let ze=(ie=class{constructor(t){n(this,b,void 0);c(this,b,t)}get name(){return i(this,b).getAttribute("name")}set name(t){i(this,b).setAttribute("name",t)}get href(){return i(this,b).getAttribute("href")}set href(t){i(this,b).setAttribute("href",t)}get fallback(){return i(this,b).hasAttribute("fallback")}set fallback(t){t?i(this,b).setAttribute("fallback",""):i(this,b).removeAttribute("fallback")}},b=new WeakMap,ie);const At=class At extends HTMLElement{constructor(){super(),this.ui=new ze(this)}};r(At,"register",()=>{console.debug("register web component: ui-lang-type"),customElements.define("ui-lang-type",At)});let bt=At;const Ne=l`
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
`,St=class St extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ne,this.cleanup=new h}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};r(St,"register",()=>{console.debug("register web component: ui-spinner"),customElements.define("ui-spinner",St)});let vt=St;const Pe=l`
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
`;var R,se;let Ie=(se=class{constructor(t){n(this,R,void 0);c(this,R,t)}get name(){return i(this,R).getAttribute("name")}set name(t){i(this,R).setAttribute("name",t)}},R=new WeakMap,se);const Rt=class Rt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Pe,this.cleanup=new h,this.ui=new Ie(this)}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};r(Rt,"register",()=>{console.debug("register web component: ui-stack-layout-page"),customElements.define("ui-stack-layout-page",Rt)});let ft=Rt;const Ve=l`
    <style>
        :host {
            display: block !important;
            position: relative !important;
            width: 100%;
            height: 100%;
        }
    </style>

    <slot></slot>
`;var T,E,$,oe;let Ze=(oe=class{constructor(t){n(this,T,void 0);n(this,E,!1);n(this,$,{});c(this,T,t),this.events=new q,this.stack=[]}registerPage(t,e){i(this,$)[t]=e}unregisterPage(t){delete i(this,$)[t]}lock(){c(this,E,!0)}unlock(){c(this,E,!1)}goBack(){if(!this.stack.length||i(this,E))return;const t=this.stack.pop();i(this,T).removeChild(t),this.stack.length&&i(this,T).appendChild(this.stack[this.stack.length-1]),this.dispatchChangeEvent()}setPage(t){if(!i(this,E)){if(this.stack.push(i(this,T).appendChild(i(this,$)[t]().children[0])),this.stack.length>1){const e=this.stack[this.stack.length-2];e.parentElement.removeChild(e)}this.dispatchChangeEvent()}}async dispatchChangeEvent(){this.events.dispatch("change",{newPage:this.stack[this.stack.length-1]||null,oldPage:this.stack[this.stack.length-2]||null})}},T=new WeakMap,E=new WeakMap,$=new WeakMap,oe);const $t=class $t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ve,this.cleanup=new h,this.ui=new Ze(this)}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};r($t,"register",()=>{console.debug("register web component: ui-stack-layout"),customElements.define("ui-stack-layout",$t)});let wt=$t;var w,y,re;let Be=(re=class{constructor(t){n(this,w,void 0);n(this,y,{});c(this,w,t),this.events=new q}get localStoragePrefix(){return i(this,w).getAttribute("local-storage-prefix")}set localStoragePrefix(t){i(this,w).setAttribute("local-storage-prefix",t)}get enableLocalStorage(){return i(this,w).hasAttribute("enable-local-storage")}set enableLocalStorage(t){t?i(this,w).setAttribute("enable-local-storage",""):i(this,w).removeAttribute("enable-local-storage")}get(t){return i(this,y)[t]}set(t,e,s=!1){if(s&&this.enableLocalStorage){const a=JSON.parse(localStorage.getItem(this.localStoragePrefix+t.toString())||"null");i(this,y)[t]=a??e}else i(this,y)[t]=e;this.enableLocalStorage&&localStorage.setItem(this.localStoragePrefix+t.toString(),JSON.stringify(i(this,y)[t])),this.events.dispatch(t,i(this,y)[t])}update(t,e){if(typeof e!="function")throw"callback is not a function";this.set(t,e(i(this,y)[t]))}on(t,e,s=!1){if(typeof e!="function")throw"callback is not a function";return s&&e(this.get(t)),this.events.on(t,e)}},w=new WeakMap,y=new WeakMap,re);const qt=class qt extends HTMLElement{constructor(){super(),this.ui=new Be(this)}};r(qt,"register",()=>{console.debug("register web component: ui-store"),customElements.define("ui-store",qt)});let yt=qt;var v;class Oe{constructor(){n(this,v,null);this.currentTheme=null,this.themes={}}enableAutoMode(){if(this.removeMode(),i(this,v)){this.mediaChangeHandler(i(this,v));return}c(this,v,window.matchMedia("(prefers-color-scheme: dark)")),i(this,v).addEventListener("change",this.mediaChangeHandler),this.mediaChangeHandler(i(this,v))}disableAutoMode(){this.removeMedia()}addTheme(t,e){this.themes[t]=e}loadTheme(t){var s;if(!this.themes[t])throw`theme "${t}" is missing in this.themes`;if(((s=this.currentTheme)==null?void 0:s.name)==t)return;{const a=document.getElementById("theme");a&&(document.head.removeChild(a),this.currentTheme=null)}const e=document.createElement("link");e.id="theme",e.rel="stylesheet",e.href=this.themes[t],document.head.appendChild(e),this.currentTheme={name:t,href:this.themes[t]}}mediaChangeHandler(t){t.matches?document.body.setAttribute("data-theme","dark"):document.body.setAttribute("data-theme","light")}removeMode(t=document.body){t.removeAttribute("data-theme")}setMode(t,e=document.body){switch(t){case"dark":e.setAttribute("data-theme",t);break;case"light":e.setAttribute("data-theme",t);break}}removeMedia(){i(this,v)&&(i(this,v).removeEventListener("change",this.mediaChangeHandler),c(this,v,null))}}v=new WeakMap;const O=class O extends HTMLElement{constructor(){super(),this.ui=new Oe}attributeChangedCallback(t,e,s){switch(t){case"auto":s!==null?this.ui.enableAutoMode():this.ui.disableAutoMode();break;case"mode":s!==null?this.ui.setMode(s):this.ui.removeMode();break}}};r(O,"register",()=>{console.debug("register web component: ui-theme-handler"),customElements.define("ui-theme-handler",O)}),r(O,"observedAttributes",["auto","mode"]);let kt=O;const Ue=l`
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
`,jt=class jt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ue}};r(jt,"register",()=>{console.debug("register svg component: svg-back-arrow-navigation"),customElements.define("svg-back-arrow-navigation",jt)});let D=jt;D.register();const Fe=l`
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
`,zt=class zt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Fe}};r(zt,"register",()=>{console.debug("register svg component: svg-chevron-down"),customElements.define("svg-chevron-down",zt)});let J=zt;J.register();const De=l`
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
`,Nt=class Nt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=De}};r(Nt,"register",()=>{console.debug("register svg component: svg-close"),customElements.define("svg-close",Nt)});let W=Nt;W.register();const Je=l`
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
`,Pt=class Pt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Je}};r(Pt,"register",()=>{console.debug("register svg component: svg-delete-recycle-bin"),customElements.define("svg-delete-recycle-bin",Pt)});let Y=Pt;Y.register();const We=l`
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
`,It=class It extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=We}};r(It,"register",()=>{console.debug("register svg component: svg-edit2"),customElements.define("svg-edit2",It)});let X=It;X.register();const Ye=l`
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
`,Vt=class Vt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ye}};r(Vt,"register",()=>{console.debug("register svg component: svg-pdf-document"),customElements.define("svg-pdf-document",Vt)});let K=Vt;K.register();const Xe=l`
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
`,Zt=class Zt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Xe}};r(Zt,"register",()=>{console.debug("register svg component: svg-settings"),customElements.define("svg-settings",Zt)});let Q=Zt;Q.register();const Ke=l`
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
`,Bt=class Bt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ke}};r(Bt,"register",()=>{console.debug("register svg component: svg-today-outline"),customElements.define("svg-today-outline",Bt)});let G=Bt;G.register();function Qe(){st.register(),rt.register(),ot.register(),nt.register(),lt.register(),ct.register(),ht.register(),pt.register(),F.register(),gt.register(),bt.register(),mt.register(),vt.register(),ft.register(),wt.register(),yt.register(),U.register(),dt.register(),ut.register(),kt.register(),at.register()}function Ge(){D.register(),J.register(),W.register(),Y.register(),X.register(),K.register(),Q.register(),G.register()}exports.SvgBackArrowNavigation=D;exports.SvgChevronDown=J;exports.SvgClose=W;exports.SvgDeleteRecycleBin=Y;exports.SvgEdit2=X;exports.SvgPDFDocument=K;exports.SvgSettings=Q;exports.SvgTodayOutline=G;exports.UIAppBar=st;exports.UIButton=ot;exports.UIContainer=nt;exports.UIDialog=at;exports.UIFlexGrid=ht;exports.UIFlexGridItem=lt;exports.UIFlexGridRow=ct;exports.UIIconButton=rt;exports.UIInput=pt;exports.UILabel=ut;exports.UILang=mt;exports.UILangType=bt;exports.UIPrimary=dt;exports.UISecondary=U;exports.UISelect=gt;exports.UISelectOption=F;exports.UISpinner=vt;exports.UIStackLayout=wt;exports.UIStackLayoutPage=ft;exports.UIStore=yt;exports.UIThemeHandler=kt;exports.registerSVGComponents=Ge;exports.registerWebComponents=Qe;
