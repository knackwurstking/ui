"use strict";var pe=Object.defineProperty;var ge=(r,t,e)=>t in r?pe(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var o=(r,t,e)=>(ge(r,typeof t!="symbol"?t+"":t,e),e),Ft=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)};var i=(r,t,e)=>(Ft(r,t,"read from private field"),e?e.call(r):t.get(r)),n=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},c=(r,t,e,s)=>(Ft(r,t,"write to private field"),s?s.call(r,e):t.set(r,e),e);const Kt={onDragStart:null,onDragging:null,onDragEnd:null};function me(r,t={}){t={...Kt,...t};const e=()=>{const f=[...r.parentNode.children].indexOf(r);r.draggable=!0,r.ondragstart=d=>{d.dataTransfer.effectAllowed="move",d.dataTransfer.dropEffect="move",d.dataTransfer.setData("text/plain",f.toString()),t.onDragStart&&t.onDragStart(f)},r.ondragover=d=>(d.preventDefault(),!1),r.ondragenter=d=>{d.preventDefault(),t.onDragging&&t.onDragging(f)},r.ondrop=d=>{d.preventDefault(),d.dataTransfer.dropEffect="move";const ue=parseInt(d.dataTransfer.getData("text/plain"),10);t.onDragEnd&&t.onDragEnd(ue,f)}},s=()=>{r.draggable=!1,r.ondragstart=null,r.ondragover=null,r.ondragenter=null,r.ondrop=null};return e(),{update(l){t={...Kt,...l},s(),e()},destroy:s}}const fe=Object.freeze(Object.defineProperty({__proto__:null,create:me},Symbol.toStringTag,{value:"Module"}));var u;class H{constructor(){n(this,u,{})}on(t,e){if(typeof e!="function")throw`invalid event listener passed for "${t.toString()}" event!`;return i(this,u)[t]||(i(this,u)[t]=[]),i(this,u)[t].push(e),()=>{this.off(t,e)}}off(t,e){if(!i(this,u)[t])throw`no listeners found for ${t.toString()}, there is nothing to delete`;let s=!1,l=0;for(const f of i(this,u)[t])f===e&&(i(this,u)[t].splice(l,1),s=!0),l++;if(!s)throw`listener not found for ${t.toString()}, there is nothing to delete`;return this}dispatch(t,e){if(e===void 0)throw"data is undefined!";if(i(this,u)[t])for(const s of i(this,u)[t])s(e);return this}}u=new WeakMap;const ve=Object.freeze(Object.defineProperty({__proto__:null,Events:H},Symbol.toStringTag,{value:"Module"}));function Ot(r,t){const e=document.createElement("div");e.classList.add("ripple"),e.style.position="absolute",e.style.color="inherit",e.style.borderRadius="50%",e.style.pointerEvents="none",e.style.width="100px",e.style.height="100px",e.style.marginTop="-50px",e.style.marginLeft="-50px",e.style.opacity=`${t.opacity}`,e.style.backgroundColor=t.color,e.style.transform="scale(0) translate(0, 0)",e.style.transition=`transform ${t.spreadDuration} ${t.spreadTiming} 0s,opacity ${t.clearDuration} ${t.clearTiming} 0s`,r.currentTarget.appendChild(e);const s=r.currentTarget.getBoundingClientRect();t.centered?(e.style.top=`${s.height/2}px`,e.style.left=`${s.width/2}px`):(e.style.top=`${r.clientY-s.top}px`,e.style.left=`${r.clientX-s.left}px`);const l=Math.max(s.width,s.height)*.02;return e.style.transform=`scale(${l}) translate(0, 0)`,e}function Pt(r){r&&(r.addEventListener("transitionend",t=>{t.propertyName==="opacity"&&r.remove()}),r.style.opacity="0")}const he={color:"var(--ui-ripple-color, currentColor)",opacity:"var(--ui-ripple-opacity, 0.2)",centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out",useClick:!1};function qt(r,t={}){t={...he,...t};let e;const s=f=>{e=Ot(f,t)},l=()=>{Pt(e)};return r.classList.add("ripple-container"),r.style.overflow="hidden",t.useClick===!0?r.addEventListener("click",f=>{e=Ot(f,t),Pt(e)}):(r.addEventListener("pointerdown",s),r.addEventListener("pointerup",l),r.addEventListener("pointerleave",l)),()=>{r.classList.remove("ripple-container"),r.removeEventListener("pointerdown",s),r.removeEventListener("pointerup",l),r.removeEventListener("pointerleave",l)}}const be=Object.freeze(Object.defineProperty({__proto__:null,create:qt,defaultOptions:he,start:Ot,stop:Pt},Symbol.toStringTag,{value:"Module"}));function we(){return/(android)/i.test(navigator.userAgent)}const a=String.raw,ye=String.raw,xe=Object.freeze(Object.defineProperty({__proto__:null,css:ye,html:a,isAndroid:we},Symbol.toStringTag,{value:"Module"})),Le=Object.freeze(Object.defineProperty({__proto__:null,draggable:fe,events:ve,ripple:be,utils:xe},Symbol.toStringTag,{value:"Module"})),ke=a`
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
`;var M,_t;let Ce=(_t=class{constructor(t){n(this,M,void 0);c(this,M,t)}getLeftSlot(){return[...i(this,M).querySelectorAll('[slot="left"]')]}getCenterSlot(){return[...i(this,M).querySelectorAll('[slot="center"]')]}getRightSlot(){return[...i(this,M).querySelectorAll('[slot="right"]')]}},M=new WeakMap,_t);const vt=class vt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ke,this.ui=new Ce(this)}};o(vt,"register",()=>customElements.define("ui-app-bar",vt));let W=vt;const Me=a`
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
`;var b,te;let Te=(te=class{constructor(t){n(this,b,void 0);c(this,b,t),this.removeRipple=null}disable(){i(this,b).setAttribute("disabled","")}enable(){i(this,b).removeAttribute("disabled")}enableRipple(){this.removeRipple||(this.removeRipple=qt(i(this,b),{centered:!0}),i(this,b).removeAttribute("no-ripple"))}disableRipple(){this.removeRipple&&(this.removeRipple(),this.removeRipple=null,i(this,b).setAttribute("no-ripple",""))}},b=new WeakMap,te);const I=class I extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Me,this.setAttribute("role","button"),this.ui=new Te(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(t,e,s){switch(t){case"no-ripple":s!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};o(I,"register",()=>customElements.define("ui-button",I)),o(I,"observedAttributes",["no-ripple"]);let G=I;const Ee=a`
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
`;var w,ee;let He=(ee=class{constructor(t){n(this,w,void 0);c(this,w,t),this.removeRipple=null}disable(){i(this,w).setAttribute("disabled","")}enable(){i(this,w).removeAttribute("disabled")}enableRipple(){this.removeRipple||(this.removeRipple=qt(i(this,w),{centered:!0}),i(this,w).removeAttribute("no-ripple"))}disableRipple(){this.removeRipple&&(this.removeRipple(),this.removeRipple=null,i(this,w).setAttribute("no-ripple",""))}},w=new WeakMap,ee);const z=class z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ee,this.setAttribute("role","button"),this.ui=new He(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(t,e,s){switch(t){case"no-ripple":s!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};o(z,"register",()=>customElements.define("ui-icon-button",z)),o(z,"observedAttributes",["no-ripple"]);let _=z;const Se=a`
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
`,bt=class bt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Se}};o(bt,"register",()=>customElements.define("ui-container",bt));let tt=bt;const Ae=a`
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
`;var k,p,C,ie;let Re=(ie=class{constructor(t,e){n(this,k,void 0);n(this,p,void 0);n(this,C,void 0);c(this,k,t),c(this,p,e),this.events=new H,c(this,C,document.createElement("h4")),i(this,C).slot="title",i(this,k).appendChild(i(this,C))}get dialog(){return i(this,p)}get fullscreen(){return i(this,k).hasAttribute("fullscreen")}set fullscreen(t){t?i(this,k).setAttribute("fullscreen",""):i(this,k).removeAttribute("fullscreen")}get title(){return i(this,C).innerText}set title(t){i(this,C).innerText=t}open(t=!1,e=!0){const s=i(this,p).inert;i(this,p).inert=e,t?i(this,p).showModal():i(this,p).show(),this.events.dispatch("open",null),i(this,p).inert=s}close(){i(this,p).close(),this.events.dispatch("close",null)}},k=new WeakMap,p=new WeakMap,C=new WeakMap,ie);var B,J;const wt=class wt extends HTMLElement{constructor(){super();n(this,B,()=>this.ui.close());n(this,J,()=>this.ui.close());this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ae,this.ui=new Re(this,this.shadowRoot.querySelector("dialog"))}connectedCallback(){const e=this.shadowRoot.querySelector(".header ui-icon-button");e.addEventListener("click",i(this,J)),e.addEventListener("click",i(this,B))}disconnectedCallback(){const e=this.shadowRoot.querySelector(".header ui-icon-button");e.removeEventListener("click",i(this,J)),e.removeEventListener("click",i(this,B))}};B=new WeakMap,J=new WeakMap,o(wt,"register",()=>customElements.define("ui-dialog",wt));let et=wt;const Qt="1",$e=a`
<style></style>
<slot></slot>
`,U=class U extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=$e,this._updateStyle()}attributeChangedCallback(t,e,s){switch(t){case"flex":this._updateStyle({flex:s||Qt});break}}_updateStyle({flex:t=Qt}={}){this.shadowRoot.querySelector("style").textContent=`
            :host {
                flex: ${t};
            }
        `}};o(U,"register",()=>customElements.define("ui-flex-grid-item",U)),o(U,"observedAttributes",["flex"]);let it=U;const Wt="0",je=a`
<style></style>
<slot></slot>
`,q=class q extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=je,this._updateStyle()}attributeChangedCallback(t,e,s){switch(t){case"gap":this._updateStyle({gap:s||Wt});break}}_updateStyle({gap:t=Wt}={}){this.shadowRoot.querySelector("style").textContent=`
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
        `}};o(q,"register",()=>customElements.define("ui-flex-grid-row",q)),o(q,"observedAttributes",["gap"]);let st=q;const Gt="0",Ie=a`
<style></style>
<slot></slot>
`,O=class O extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ie,this._updateStyle()}attributeChangedCallback(t,e,s){switch(t){case"gap":this._updateStyle({gap:s||Gt});break}}_updateStyle({gap:t=Gt}={}){this.shadowRoot.querySelector("style").textContent=`
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
        `}};o(O,"register",()=>customElements.define("ui-flex-grid",O)),o(O,"observedAttributes",["gap"]);let rt=O;const de=document.createElement("template");de.innerHTML=`
    <style>
        :host {
            display: block;
            position: relative;
            width: 100%;
        }

        input {
            width: calc(100% - var(--ui-spacing) * 4);
            display: block;
            margin: 0;
            padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);
            padding-top: calc(var(--ui-spacing) / 2);
            border: none !important;
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
            border-radius: var(--ui-radius);
            transition: border-color 0.25s linear;
        }

        .container:has(input:focus) {
            border-color: var(--ui-primary-bgColor);
        }

        .container:has(input[aria-invalid]) {
            border-color: hsl(var(--ui-destructive-bgColor));
        }

        .title {
            padding: 0 var(--ui-spacing);
            user-select: none;
        }
    </style>

    <div class="container">
        <ui-secondary class="title"></ui-secondary>
        <input>
    </div>
`;let ze=class{constructor(t){this.root=t,this.events=new H,this.input=this.root.shadowRoot.querySelector("input"),this.input.type=this.root.getAttribute("type")||"text",this.input.oninput=()=>this.events.dispatch("input",this.value),this.input.onchange=()=>this.events.dispatch("change",this.value)}set title(t){this.root.shadowRoot.querySelector(".title").innerHTML=t||""}get title(){return this.root.shadowRoot.querySelector(".title").innerHTML}set type(t){this.input.type=t}get type(){return this.input.type||"text"}set value(t){this.input.value=t}get value(){switch(this.input.type){case"number":return new Number(this.input.value);default:return this.input.value}}set placeholder(t){this.input.placeholder=t}get placeholder(){return this.input.placeholder}set invalid(t){this.input.ariaInvalid=t?"":null}get invalid(){return this.input.ariaInvalid!==null}set min(t){this.input.min=t}get min(){switch(this.input.type){case"number":return new Number(this.input.min);default:return this.input.min}}set max(t){this.input.max=t}get max(){switch(this.input.type){case"number":return new Number(this.input.max);default:return this.input.max}}};const P=class P extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(de.content.cloneNode(!0)),this.ui=new ze(this)}attributeChangedCallback(t,e,s){switch(t){case"title":this.ui.title=s;break;case"type":s===null?this.ui.type="text":this.ui.type=s;break;case"value":this.ui.value=this.parseNewValue(s);break;case"placeholder":s===null?this.ui.placeholder="":this.ui.placeholder=s;break;case"invalid":this.ui.invalid=s!==null;break;case"min":this.ui.min=this.parseNewValue(s);break;case"max":this.ui.max=this.parseNewValue(s);break}}parseNewValue(t){switch(this.ui.type){case"number":return new Number(t);default:return t||""}}};o(P,"register",()=>customElements.define("ui-input",P)),o(P,"observedAttributes",["title","type","value","placeholder","invalid","min","max"]);let ot=P;const Ue=a`
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
`;var y,se;let qe=(se=class{constructor(t){n(this,y,void 0);c(this,y,t)}get value(){return i(this,y).getAttribute("value")}set value(t){i(this,y).setAttribute("value",t)}get selected(){return i(this,y).hasAttribute("selected")}set selected(t){t?i(this,y).setAttribute("selected",""):i(this,y).removeAttribute("selected")}},y=new WeakMap,se);const yt=class yt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ue,this.setAttribute("role","button"),this.ui=new qe(this)}};o(yt,"register",()=>customElements.define("ui-select-option",yt));let Z=yt;const Oe=a`
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
`;let Pe=class{constructor(){this.events=new H}};var X;const xt=class xt extends HTMLElement{constructor(){super();n(this,X,async e=>{(e.composedPath()||[]).forEach(s=>{s instanceof Z&&([...this.querySelectorAll("ui-select-option")].forEach(l=>l.removeAttribute("selected")),s.setAttribute("selected",""),this.ui.events.dispatch("change",s))})});this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Oe,this.cleanup=[],this.ui=new Pe}connectedCallback(){const e=this.shadowRoot.querySelector(".options"),s=this.onClickOptions.bind(this);e.addEventListener("click",s),this.cleanup.push(()=>{this.removeEventListener("click",s),e.removeEventListener("click",this.onClickOptions)}),this.style.setProperty("--items-length",this.querySelectorAll("ui-select-option").length.toString())}disconnectedCallback(){this.cleanup.forEach(e=>e()),this.cleanup=[]}async onClickOptions(e){this.classList.toggle("open")?(e.stopPropagation(),this.addEventListener("click",i(this,X))):setTimeout(()=>this.removeEventListener("click",i(this,X)))}};X=new WeakMap,o(xt,"register",()=>customElements.define("ui-select",xt));let nt=xt;var Y,S,F,re;let De=(re=class{constructor(t){n(this,Y,void 0);n(this,S,void 0);n(this,F,void 0);c(this,Y,t),c(this,S,new H),this.langType=null}getFallbackElement(){return i(this,Y).querySelector("ui-lang-type[fallback]")}new(t,e){this.langType=t,c(this,F,e),i(this,S).dispatch("change",this.langType)}get(t,e){var s,l;return((l=(s=i(this,F))==null?void 0:s[t])==null?void 0:l[e])||null}on(t,e,s=!1){if(typeof e!="function")throw"callback is not a function";return s&&e(this.langType),i(this,S).on(t,e)}},Y=new WeakMap,S=new WeakMap,F=new WeakMap,re);const D=class D extends HTMLElement{constructor(){super(),this.ui=new De(this)}attributeChangedCallback(t,e,s){switch(t){case"current":s!==null&&this._loadLanguage(s);break}}async _loadLanguage(t){const e=this.querySelector(`ui-lang-type[name="${t}"]`)||this.ui.getFallbackElement();if(!e)return;if(!e.ui.href)throw"Missing href attribute!";const s=await fetch(e.ui.href);this.ui.new(e,await s.json())}};o(D,"register",()=>customElements.define("ui-lang",D)),o(D,"observedAttributes",["current"]);let at=D;var g,oe;let Ne=(oe=class{constructor(t){n(this,g,void 0);c(this,g,t)}get name(){return i(this,g).getAttribute("name")}set name(t){i(this,g).setAttribute("name",t)}get href(){return i(this,g).getAttribute("href")}set href(t){i(this,g).setAttribute("href",t)}get fallback(){return i(this,g).hasAttribute("fallback")}set fallback(t){t?i(this,g).setAttribute("fallback",""):i(this,g).removeAttribute("fallback")}},g=new WeakMap,oe);const Lt=class Lt extends HTMLElement{constructor(){super(),this.ui=new Ne(this)}};o(Lt,"register",()=>customElements.define("ui-lang-type",Lt));let lt=Lt;const Ve=a`
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
`,kt=class kt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ve}};o(kt,"register",()=>customElements.define("ui-spinner",kt));let ct=kt;const Ze=a`
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
`;var A,ne;let Be=(ne=class{constructor(t){n(this,A,void 0);c(this,A,t)}get name(){return i(this,A).getAttribute("name")}set name(t){i(this,A).setAttribute("name",t)}},A=new WeakMap,ne);const Ct=class Ct extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ze,this.ui=new Be(this)}};o(Ct,"register",()=>customElements.define("ui-stack-layout-page",Ct));let ht=Ct;const Je=a`
    <style>
        :host {
            display: block !important;
            position: relative !important;
            width: 100%;
            height: 100%;
        }
    </style>

    <slot></slot>
`;var T,E,R,ae;let Xe=(ae=class{constructor(t){n(this,T,void 0);n(this,E,!1);n(this,R,{});c(this,T,t),this.events=new H,this.stack=[]}registerPage(t,e){i(this,R)[t]=e}unregisterPage(t){delete i(this,R)[t]}lock(){c(this,E,!0)}unlock(){c(this,E,!1)}goBack(){if(!this.stack.length||i(this,E))return;const t=this.stack.pop();i(this,T).removeChild(t),this.stack.length&&i(this,T).appendChild(this.stack[this.stack.length-1]),this.dispatchChangeEvent()}setPage(t){if(!i(this,E)){if(this.stack.push(i(this,T).appendChild(i(this,R)[t]().children[0])),this.stack.length>1){const e=this.stack[this.stack.length-2];e.parentElement.removeChild(e)}this.dispatchChangeEvent()}}async dispatchChangeEvent(){this.events.dispatch("change",{newPage:this.stack[this.stack.length-1]||null,oldPage:this.stack[this.stack.length-2]||null})}},T=new WeakMap,E=new WeakMap,R=new WeakMap,ae);const Mt=class Mt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Je,this.ui=new Xe(this)}};o(Mt,"register",()=>customElements.define("ui-stack-layout",Mt));let dt=Mt;var x,L,le;let Ye=(le=class{constructor(t){n(this,x,void 0);n(this,L,{});c(this,x,t),this.events=new H}get localStoragePrefix(){return i(this,x).getAttribute("local-storage-prefix")}set localStoragePrefix(t){i(this,x).setAttribute("local-storage-prefix",t)}get enableLocalStorage(){return i(this,x).hasAttribute("enable-local-storage")}set enableLocalStorage(t){t?i(this,x).setAttribute("enable-local-storage",""):i(this,x).removeAttribute("enable-local-storage")}get(t){return i(this,L)[t]}set(t,e,s=!1){if(s&&this.enableLocalStorage){const l=JSON.parse(localStorage.getItem(this.localStoragePrefix+t.toString())||"null");i(this,L)[t]=l??e}else i(this,L)[t]=e;this.enableLocalStorage&&localStorage.setItem(this.localStoragePrefix+t.toString(),JSON.stringify(i(this,L)[t])),this.events.dispatch(t,i(this,L)[t])}update(t,e){if(typeof e!="function")throw"callback is not a function";this.set(t,e(i(this,L)[t]))}on(t,e,s=!1){if(typeof e!="function")throw"callback is not a function";return s&&e(this.get(t)),this.events.on(t,e)}},x=new WeakMap,L=new WeakMap,le);const Tt=class Tt extends HTMLElement{constructor(){super(),this.ui=new Ye(this)}};o(Tt,"register",()=>customElements.define("ui-store",Tt));let ut=Tt;const Fe=a`
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
`,Et=class Et extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Fe}};o(Et,"register",()=>customElements.define("ui-svg-back-arrow-navigation",Et));let Dt=Et;const Ke=a`
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
`,Ht=class Ht extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ke}};o(Ht,"register",()=>customElements.define("ui-svg-chevron-down",Ht));let Nt=Ht;const Qe=a`
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
`,St=class St extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Qe}};o(St,"register",()=>customElements.define("ui-svg-close",St));let Vt=St;const We=a`
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
`,At=class At extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=We}};o(At,"register",()=>customElements.define("ui-svg-delete-recycle-bin",At));let Zt=At;const Ge=a`
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
`,Rt=class Rt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ge}};o(Rt,"register",()=>customElements.define("ui-svg-edit2",Rt));let Bt=Rt;const _e=a`
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
`,$t=class $t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=_e}};o($t,"register",()=>customElements.define("ui-svg-pdf-document",$t));let Jt=$t;const ti=a`
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
`,jt=class jt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ti}};o(jt,"register",()=>customElements.define("ui-svg-settings",jt));let Xt=jt;const ei=a`
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
`,It=class It extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ei}};o(It,"register",()=>customElements.define("ui-svg-today-outline",It));let Yt=It;const v={BackArrowNavigation:Dt,ChevronDown:Nt,Close:Vt,DeleteRecycleBin:Zt,Edit2:Bt,PDFDocument:Jt,Settings:Xt,TodayOutline:Yt},ii=a`
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
`;var h,$,K,Q,j,ce;let si=(ce=class{constructor(t){n(this,h,void 0);n(this,$,!1);n(this,K,async()=>{[...i(this,h).querySelectorAll('[slot="input"]')].forEach(t=>t.click())});n(this,Q,async t=>{t.stopPropagation()});n(this,j,void 0);c(this,h,t)}get primary(){return i(this,h).getAttribute("primary")}set primary(t){i(this,h).setAttribute("primary",t)}get secondary(){return i(this,h).getAttribute("secondary")}set secondary(t){i(this,h).setAttribute("secondary",t)}getInputSlot(){return[...i(this,h).querySelectorAll('[slot="input"]')]}enableRipple(){i(this,j)||(this.removeRipple=qt(i(this,h)),i(this,h).style.cursor="pointer",this._startInputHandling())}disableRipple(){i(this,j)&&i(this,j).call(this),this._stopInputHandling()}_startInputHandling(){i(this,$)||(i(this,h).addEventListener("click",i(this,K)),this.getInputSlot().forEach(t=>{t.addEventListener("click",i(this,Q))}),c(this,$,!0))}_stopInputHandling(){i(this,h).removeEventListener("click",i(this,K)),[...i(this,h).querySelectorAll('[slot="input"]')].forEach(t=>{t.removeEventListener("click",i(this,Q))}),c(this,$,!1)}},h=new WeakMap,$=new WeakMap,K=new WeakMap,Q=new WeakMap,j=new WeakMap,ce);const N=class N extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ii,this.ui=new si(this)}attributeChangedCallback(t,e,s){switch(t){case"ripple":s!==null?this.ui.enableRipple():this.ui.disableRipple();break;case"primary":this.shadowRoot.querySelector("ui-primary").innerHTML=s||"";break;case"secondary":this.shadowRoot.querySelector("ui-secondary").innerHTML=s||"";break}}};o(N,"register",()=>customElements.define("ui-label",N)),o(N,"observedAttributes",["ripple","secondary","primary"]);let pt=N;const ri=a`
<style>
    :host {
        font-size: 1.1rem;
        font-family: var(--ui-fontFamily);
        font-variation-settings: var(--ui-text-primary-fontVariation);
    }
</style>

<slot></slot>
`,zt=class zt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ri}};o(zt,"register",()=>customElements.define("ui-primary",zt));let gt=zt;const oi=a`
<style>
    :host {
        font-size: 0.9rem;
        font-family: var(--ui-fontFamily);
        font-variation-settings: var(--ui-text-secondary-fontVariation);
    }
</style>

<slot></slot>
`,Ut=class Ut extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=oi}};o(Ut,"register",()=>customElements.define("ui-secondary",Ut));let mt=Ut;var m;class ni{constructor(){n(this,m,null);this.currentTheme=null,this.themes={}}enableAutoMode(){if(this.removeMode(),i(this,m)){this.mediaChangeHandler(i(this,m));return}c(this,m,window.matchMedia("(prefers-color-scheme: dark)")),i(this,m).addEventListener("change",this.mediaChangeHandler),this.mediaChangeHandler(i(this,m))}disableAutoMode(){this.removeMedia()}addTheme(t,e){this.themes[t]=e}loadTheme(t){var s;if(!this.themes[t])throw`theme "${t}" is missing in this.themes`;if(((s=this.currentTheme)==null?void 0:s.name)==t)return;{const l=document.getElementById("theme");l&&(document.head.removeChild(l),this.currentTheme=null)}const e=document.createElement("link");e.id="theme",e.rel="stylesheet",e.href=this.themes[t],document.head.appendChild(e),this.currentTheme={name:t,href:this.themes[t]}}mediaChangeHandler(t){t.matches?document.body.setAttribute("data-theme","dark"):document.body.setAttribute("data-theme","light")}removeMode(t=document.body){t.removeAttribute("data-theme")}setMode(t,e=document.body){switch(t){case"dark":e.setAttribute("data-theme",t);break;case"light":e.setAttribute("data-theme",t);break}}removeMedia(){i(this,m)&&(i(this,m).removeEventListener("change",this.mediaChangeHandler),c(this,m,null))}}m=new WeakMap;const V=class V extends HTMLElement{constructor(){super(),this.ui=new ni}attributeChangedCallback(t,e,s){switch(t){case"auto":s!==null?this.ui.enableAutoMode():this.ui.disableAutoMode();break;case"mode":s!==null?this.ui.setMode(s):this.ui.removeMode();break}}};o(V,"register",()=>customElements.define("ui-theme-handler",V)),o(V,"observedAttributes",["auto","mode"]);let ft=V;const ai=Object.freeze(Object.defineProperty({__proto__:null,AppBar:W,Button:G,Container:tt,Dialog:et,FlexGrid:rt,FlexGridItem:it,FlexGridRow:st,IconButton:_,Input:ot,Label:pt,Lang:at,LangType:lt,Primary:gt,Secondary:mt,Select:nt,SelectOption:Z,Spinner:ct,StackLayout:dt,StackLayoutPage:ht,Store:ut,ThemeHandler:ft,svg:v},Symbol.toStringTag,{value:"Module"}));async function li(){W.register(),_.register(),G.register(),tt.register(),it.register(),st.register(),rt.register(),ot.register(),Z.register(),nt.register(),lt.register(),at.register(),ct.register(),ht.register(),dt.register(),ut.register(),mt.register(),gt.register(),pt.register(),ft.register(),et.register()}async function ci(){v.BackArrowNavigation.register(),v.ChevronDown.register(),v.Close.register(),v.DeleteRecycleBin.register(),v.Edit2.register(),v.PDFDocument.register(),v.Settings.register(),v.TodayOutline.register()}const hi={js:Le,wc:ai,define:li,defineSVG:ci};module.exports=hi;
