"use strict";var de=Object.defineProperty;var pe=(r,t,e)=>t in r?de(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var o=(r,t,e)=>(pe(r,typeof t!="symbol"?t+"":t,e),e),Qt=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)};var i=(r,t,e)=>(Qt(r,t,"read from private field"),e?e.call(r):t.get(r)),a=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},c=(r,t,e,s)=>(Qt(r,t,"write to private field"),s?s.call(r,e):t.set(r,e),e);const Wt={onDragStart:null,onDragging:null,onDragEnd:null};function ge(r,t={}){t={...Wt,...t};const e=()=>{const g=[...r.parentNode.children].indexOf(r);r.draggable=!0,r.ondragstart=m=>{m.dataTransfer.effectAllowed="move",m.dataTransfer.dropEffect="move",m.dataTransfer.setData("text/plain",g.toString()),t.onDragStart&&t.onDragStart(g)},r.ondragover=m=>(m.preventDefault(),!1),r.ondragenter=m=>{m.preventDefault(),t.onDragging&&t.onDragging(g)},r.ondrop=m=>{m.preventDefault(),m.dataTransfer.dropEffect="move";const ue=parseInt(m.dataTransfer.getData("text/plain"),10);t.onDragEnd&&t.onDragEnd(ue,g)}},s=()=>{r.draggable=!1,r.ondragstart=null,r.ondragover=null,r.ondragenter=null,r.ondrop=null};return e(),{update(n){t={...Wt,...n},s(),e()},destroy:s}}const me=Object.freeze(Object.defineProperty({__proto__:null,create:ge},Symbol.toStringTag,{value:"Module"}));var f;class S{constructor(){a(this,f,{})}on(t,e){if(typeof e!="function")throw`invalid event listener passed for "${t.toString()}" event!`;return i(this,f)[t]||(i(this,f)[t]=[]),i(this,f)[t].push(e),()=>{this.off(t,e)}}off(t,e){if(!i(this,f)[t])throw`no listeners found for ${t.toString()}, there is nothing to delete`;let s=!1,n=0;for(const g of i(this,f)[t])g===e&&(i(this,f)[t].splice(n,1),s=!0),n++;if(!s)throw`listener not found for ${t.toString()}, there is nothing to delete`;return this}dispatch(t,e){if(e===void 0)throw"data is undefined!";if(i(this,f)[t])for(const s of i(this,f)[t])s(e);return this}}f=new WeakMap;const fe=Object.freeze(Object.defineProperty({__proto__:null,Events:S},Symbol.toStringTag,{value:"Module"}));function qt(r,t){const e=document.createElement("div");e.classList.add("ripple"),e.style.position="absolute",e.style.color="inherit",e.style.borderRadius="50%",e.style.pointerEvents="none",e.style.width="100px",e.style.height="100px",e.style.marginTop="-50px",e.style.marginLeft="-50px",e.style.opacity=`${t.opacity}`,e.style.backgroundColor=t.color,e.style.transform="scale(0) translate(0, 0)",e.style.transition=`transform ${t.spreadDuration} ${t.spreadTiming} 0s,opacity ${t.clearDuration} ${t.clearTiming} 0s`,r.currentTarget.appendChild(e);const s=r.currentTarget.getBoundingClientRect();t.centered?(e.style.top=`${s.height/2}px`,e.style.left=`${s.width/2}px`):(e.style.top=`${r.clientY-s.top}px`,e.style.left=`${r.clientX-s.left}px`);const n=Math.max(s.width,s.height)*.02;return e.style.transform=`scale(${n}) translate(0, 0)`,e}function Nt(r){r&&(r.addEventListener("transitionend",t=>{t.propertyName==="opacity"&&r.remove()}),r.style.opacity="0")}const ce={color:"var(--ui-ripple-color, currentColor)",opacity:"var(--ui-ripple-opacity, 0.2)",centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out",useClick:!1};function zt(r,t={}){t={...ce,...t};let e;const s=g=>{e=qt(g,t)},n=()=>{Nt(e)};return r.classList.add("ripple-container"),r.style.overflow="hidden",t.useClick===!0?r.addEventListener("click",g=>{e=qt(g,t),Nt(e)}):(r.addEventListener("pointerdown",s),r.addEventListener("pointerup",n),r.addEventListener("pointerleave",n)),()=>{r.classList.remove("ripple-container"),r.removeEventListener("pointerdown",s),r.removeEventListener("pointerup",n),r.removeEventListener("pointerleave",n)}}const be=Object.freeze(Object.defineProperty({__proto__:null,create:zt,defaultOptions:ce,start:qt,stop:Nt},Symbol.toStringTag,{value:"Module"}));function ve(){return/(android)/i.test(navigator.userAgent)}const l=String.raw,we=String.raw,ye=Object.freeze(Object.defineProperty({__proto__:null,css:we,html:l,isAndroid:ve},Symbol.toStringTag,{value:"Module"}));class h{constructor(){this.callbacks=[]}add(t){this.callbacks.push(t)}async run(){for(let t=0;t<this.callbacks.length;t++)if(this.callbacks[t]!==null)try{await this.callbacks[t](),this.callbacks[t]=null}catch(e){console.error("cleanup error:",e)}this.callbacks=this.callbacks.filter(t=>t!==null)}}const xe=Object.freeze(Object.defineProperty({__proto__:null,CleanUp:h,draggable:me,events:fe,ripple:be,utils:ye},Symbol.toStringTag,{value:"Module"})),ke=l`
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
`;var E,Gt;let Ce=(Gt=class{constructor(t){a(this,E,void 0);c(this,E,t)}getLeftSlot(){return[...i(this,E).querySelectorAll('[slot="left"]')]}getCenterSlot(){return[...i(this,E).querySelectorAll('[slot="center"]')]}getRightSlot(){return[...i(this,E).querySelectorAll('[slot="right"]')]}},E=new WeakMap,Gt);const ft=class ft extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ke,this.cleanup=new h,this.ui=new Ce(this)}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};o(ft,"register",()=>customElements.define("ui-app-bar",ft));let W=ft;const Le=l`
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
`;var p,_t;let Me=(_t=class{constructor(t){a(this,p,void 0);c(this,p,t),this.removeRipple=null}get color(){return i(this,p).getAttribute("color")}set color(t){i(this,p).setAttribute("color",t)}get variant(){return i(this,p).getAttribute("variant")}set variant(t){i(this,p).setAttribute("variant",t)}disable(){i(this,p).setAttribute("disabled","")}enable(){i(this,p).removeAttribute("disabled")}enableRipple(){this.removeRipple||(this.removeRipple=zt(i(this,p),{centered:!0}),i(this,p).removeAttribute("no-ripple"))}disableRipple(){this.removeRipple&&(this.removeRipple(),this.removeRipple=null,i(this,p).setAttribute("no-ripple",""))}},p=new WeakMap,_t);const z=class z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Le,this.setAttribute("role","button"),this.cleanup=new h,this.ui=new Me(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"no-ripple":s!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};o(z,"register",()=>customElements.define("ui-button",z)),o(z,"observedAttributes",["no-ripple"]);let G=z;const Te=l`
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
`;var d,te;let Ee=(te=class{constructor(t){a(this,d,void 0);c(this,d,t),this.removeRipple=null}get color(){return i(this,d).getAttribute("color")}set color(t){i(this,d).setAttribute("color",t)}get ghost(){return i(this,d).hasAttribute("ghost")}set ghost(t){t?i(this,d).setAttribute("ghost",""):i(this,d).removeAttribute("ghost")}disable(){i(this,d).setAttribute("disabled","")}enable(){i(this,d).removeAttribute("disabled")}enableRipple(){this.removeRipple||(this.removeRipple=zt(i(this,d),{centered:!0}),i(this,d).removeAttribute("no-ripple"))}disableRipple(){this.removeRipple&&(this.removeRipple(),this.removeRipple=null,i(this,d).setAttribute("no-ripple",""))}},d=new WeakMap,te);const q=class q extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Te,this.setAttribute("role","button"),this.cleanup=new h,this.ui=new Ee(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"no-ripple":s!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};o(q,"register",()=>customElements.define("ui-icon-button",q)),o(q,"observedAttributes",["no-ripple"]);let _=q;const He=l`
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
`,bt=class bt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=He,this.cleanup=new h}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};o(bt,"register",()=>customElements.define("ui-container",bt));let tt=bt;const Ae=l`
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
`;var L,b,M,ee;let Se=(ee=class{constructor(t,e){a(this,L,void 0);a(this,b,void 0);a(this,M,void 0);c(this,L,t),c(this,b,e),this.events=new S,c(this,M,document.createElement("h4")),i(this,M).slot="title",i(this,L).appendChild(i(this,M))}get fullscreen(){return i(this,L).hasAttribute("fullscreen")}set fullscreen(t){t?i(this,L).setAttribute("fullscreen",""):i(this,L).removeAttribute("fullscreen")}get title(){return i(this,M).innerText}set title(t){i(this,M).innerText=t}getDialogElement(){return i(this,b)}open(t=!1,e=!0){const s=i(this,b).inert;i(this,b).inert=e,t?i(this,b).showModal():i(this,b).show(),this.events.dispatch("open",null),i(this,b).inert=s}close(){i(this,b).close(),this.events.dispatch("close",null)}},L=new WeakMap,b=new WeakMap,M=new WeakMap,ee);const vt=class vt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ae,this.cleanup=new h,this.ui=new Se(this,this.shadowRoot.querySelector("dialog"))}connectedCallback(){const t=this.shadowRoot.querySelector(".header ui-icon-button"),e=()=>{this.ui.close()};t.addEventListener("click",e);const s=this.shadowRoot.querySelector("dialog"),n=g=>{g.preventDefault()};s.addEventListener("cancel",n),this.cleanup.add(()=>{t.removeEventListener("click",e),s.removeEventListener("cancel",n)})}disconnectedCallback(){this.cleanup.run()}};o(vt,"register",()=>customElements.define("ui-dialog",vt));let et=vt;const Ot="1",Re=l`
<style></style>
<slot></slot>
`;let $e=class{constructor(t){this.root=t}get flex(){return this.root.hasAttribute("flex")?this.root.getAttribute("flex"):Ot}set flex(t){t===null?this.root.removeAttribute("flex"):this.root.setAttribute("flex",t)}};const N=class N extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Re,this.cleanup=new h,this.ui=new $e(this),this.updateStyle()}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"flex":this.updateStyle({flex:s||Ot});break}}updateStyle({flex:t=Ot}={}){this.shadowRoot.querySelector("style").textContent=`
            :host {
                flex: ${t};
            }
        `}};o(N,"register",()=>customElements.define("ui-flex-grid-item",N)),o(N,"observedAttributes",["flex"]);let it=N;const Pt="0",Ie=l`
<style></style>
<slot></slot>
`;let je=class{constructor(t){this.root=t}get gap(){return this.root.getAttribute("gap")||Pt}set gap(t){t===null?this.root.removeAttribute("gap"):this.root.setAttribute("gap",t)}};const O=class O extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ie,this.cleanup=new h,this.ui=new je(this),this.updateStyle()}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"gap":this.updateStyle({gap:s||Pt});break}}updateStyle({gap:t=Pt}={}){this.shadowRoot.querySelector("style").textContent=`
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
        `}};o(O,"register",()=>customElements.define("ui-flex-grid-row",O)),o(O,"observedAttributes",["gap"]);let st=O;const Dt="0",Ue=l`
<style></style>
<slot></slot>
`;let ze=class{constructor(t){this.root=t}get gap(){return this.root.getAttribute("gap")||Dt}set gap(t){t===null?this.root.removeAttribute("gap"):this.root.setAttribute("gap",t)}};const P=class P extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ue,this.cleanup=new h,this.ui=new ze(this),this.updateStyle()}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"gap":this.updateStyle({gap:s||Dt});break}}updateStyle({gap:t=Dt}={}){this.shadowRoot.querySelector("style").textContent=`
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
        `}};o(P,"register",()=>customElements.define("ui-flex-grid",P)),o(P,"observedAttributes",["gap"]);let rt=P;const he=document.createElement("template");he.innerHTML=`
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
`;let qe=class{constructor(t){this.root=t,this.events=new S,this.input=this.root.shadowRoot.querySelector("input"),this.input.type=this.root.getAttribute("type")||"text",this.input.oninput=()=>this.events.dispatch("input",this.value),this.input.onchange=()=>this.events.dispatch("change",this.value)}set title(t){let e=this.root.querySelector('[slot="title"]');t===null&&e&&(this.root.removeChild(e),e=null),e||(e=new Y,e.slot="title",this.root.appendChild(e)),e.innerHTML=t||""}get title(){var t;return((t=this.root.querySelector('[slot="title"]'))==null?void 0:t.innerHTML)||null}set type(t){this.input.type=t}get type(){return this.input.type||"text"}set value(t){this.input.value=t}get value(){switch(this.input.type){case"number":return this.input.value?new Number(this.input.value):NaN;default:return this.input.value}}set placeholder(t){this.input.placeholder=t}get placeholder(){return this.input.placeholder}set invalid(t){this.input.ariaInvalid=t?"":null}get invalid(){return this.input.ariaInvalid!==null}set min(t){this.input.min=t}get min(){switch(this.input.type){case"number":return this.input.min?new Number(this.input.min):NaN;default:return this.input.min}}set max(t){this.input.max=t}get max(){switch(this.input.type){case"number":return this.input.max?new Number(this.input.max):NaN;default:return this.input.max}}};const D=class D extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(he.content.cloneNode(!0)),this.cleanup=new h,this.ui=new qe(this)}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"title":this.ui.title=s;break;case"type":s===null?this.ui.type="text":this.ui.type=s;break;case"value":this.ui.value=this.parseNewValue(s);break;case"placeholder":s===null?this.ui.placeholder="":this.ui.placeholder=s;break;case"invalid":this.ui.invalid=s!==null;break;case"min":this.ui.min=this.parseNewValue(s);break;case"max":this.ui.max=this.parseNewValue(s);break}}parseNewValue(t){switch(this.ui.type){case"number":return t?new Number(t):NaN;default:return t||""}}};o(D,"register",()=>customElements.define("ui-input",D)),o(D,"observedAttributes",["title","type","value","placeholder","invalid","min","max"]);let ot=D;const Ne=l`
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
`;var x,ie;let Oe=(ie=class{constructor(t){a(this,x,void 0);c(this,x,t)}get value(){return i(this,x).getAttribute("value")}set value(t){i(this,x).setAttribute("value",t)}get selected(){return i(this,x).hasAttribute("selected")}set selected(t){t?i(this,x).setAttribute("selected",""):i(this,x).removeAttribute("selected")}},x=new WeakMap,ie);const wt=class wt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ne,this.setAttribute("role","button"),this.ui=new Oe(this)}};o(wt,"register",()=>customElements.define("ui-select-option",wt));let J=wt;const Pe=l`
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
`;let De=class{constructor(){this.events=new S}};var X;const yt=class yt extends HTMLElement{constructor(){super();a(this,X,async e=>{(e.composedPath()||[]).forEach(s=>{s instanceof J&&([...this.querySelectorAll("ui-select-option")].forEach(n=>n.removeAttribute("selected")),s.setAttribute("selected",""),this.ui.events.dispatch("change",s))})});this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Pe,this.cleanup=new h,this.ui=new De}connectedCallback(){const e=this.shadowRoot.querySelector(".options"),s=this.onClickOptions.bind(this);e.addEventListener("click",s),this.cleanup.add(()=>{this.removeEventListener("click",s),e.removeEventListener("click",this.onClickOptions)}),this.style.setProperty("--items-length",this.querySelectorAll("ui-select-option").length.toString())}disconnectedCallback(){this.cleanup.run()}async onClickOptions(e){this.classList.toggle("open")?(e.stopPropagation(),this.addEventListener("click",i(this,X))):setTimeout(()=>this.removeEventListener("click",i(this,X)))}};X=new WeakMap,o(yt,"register",()=>customElements.define("ui-select",yt));let nt=yt;var T,R,F,se;let Ve=(se=class{constructor(t){a(this,T,void 0);a(this,R,void 0);a(this,F,void 0);c(this,T,t),c(this,R,new S),this.langType=null}get current(){return i(this,T).getAttribute("current")}set current(t){t===null?i(this,T).removeAttribute("current"):i(this,T).setAttribute("current",t)}getFallbackElement(){return i(this,T).querySelector("ui-lang-type[fallback]")}new(t,e){this.langType=t,c(this,F,e),i(this,R).dispatch("change",this.langType)}get(t,e){var s,n;return((n=(s=i(this,F))==null?void 0:s[t])==null?void 0:n[e])||null}on(t,e,s=!1){if(typeof e!="function")throw"callback is not a function";return s&&e(this.langType),i(this,R).on(t,e)}},T=new WeakMap,R=new WeakMap,F=new WeakMap,se);const V=class V extends HTMLElement{constructor(){super(),this.ui=new Ve(this)}attributeChangedCallback(t,e,s){switch(t){case"current":s!==null&&this.loadLanguage(s);break}}async loadLanguage(t){const e=this.querySelector(`ui-lang-type[name="${t}"]`)||this.ui.getFallbackElement();if(!e)return;if(!e.ui.href)throw"Missing href attribute!";const s=await fetch(e.ui.href);this.ui.new(e,await s.json())}};o(V,"register",()=>customElements.define("ui-lang",V)),o(V,"observedAttributes",["current"]);let at=V;var v,re;let Ze=(re=class{constructor(t){a(this,v,void 0);c(this,v,t)}get name(){return i(this,v).getAttribute("name")}set name(t){i(this,v).setAttribute("name",t)}get href(){return i(this,v).getAttribute("href")}set href(t){i(this,v).setAttribute("href",t)}get fallback(){return i(this,v).hasAttribute("fallback")}set fallback(t){t?i(this,v).setAttribute("fallback",""):i(this,v).removeAttribute("fallback")}},v=new WeakMap,re);const xt=class xt extends HTMLElement{constructor(){super(),this.ui=new Ze(this)}};o(xt,"register",()=>customElements.define("ui-lang-type",xt));let lt=xt;const Be=l`
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
`,kt=class kt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Be,this.cleanup=new h}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};o(kt,"register",()=>customElements.define("ui-spinner",kt));let ct=kt;const Je=l`
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
`;var $,oe;let Ye=(oe=class{constructor(t){a(this,$,void 0);c(this,$,t)}get name(){return i(this,$).getAttribute("name")}set name(t){i(this,$).setAttribute("name",t)}},$=new WeakMap,oe);const Ct=class Ct extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Je,this.cleanup=new h,this.ui=new Ye(this)}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};o(Ct,"register",()=>customElements.define("ui-stack-layout-page",Ct));let ht=Ct;const Xe=l`
    <style>
        :host {
            display: block !important;
            position: relative !important;
            width: 100%;
            height: 100%;
        }
    </style>

    <slot></slot>
`;var H,A,I,ne;let Fe=(ne=class{constructor(t){a(this,H,void 0);a(this,A,!1);a(this,I,{});c(this,H,t),this.events=new S,this.stack=[]}registerPage(t,e){i(this,I)[t]=e}unregisterPage(t){delete i(this,I)[t]}lock(){c(this,A,!0)}unlock(){c(this,A,!1)}goBack(){if(!this.stack.length||i(this,A))return;const t=this.stack.pop();i(this,H).removeChild(t),this.stack.length&&i(this,H).appendChild(this.stack[this.stack.length-1]),this.dispatchChangeEvent()}setPage(t){if(!i(this,A)){if(this.stack.push(i(this,H).appendChild(i(this,I)[t]().children[0])),this.stack.length>1){const e=this.stack[this.stack.length-2];e.parentElement.removeChild(e)}this.dispatchChangeEvent()}}async dispatchChangeEvent(){this.events.dispatch("change",{newPage:this.stack[this.stack.length-1]||null,oldPage:this.stack[this.stack.length-2]||null})}},H=new WeakMap,A=new WeakMap,I=new WeakMap,ne);const Lt=class Lt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Xe,this.cleanup=new h,this.ui=new Fe(this)}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};o(Lt,"register",()=>customElements.define("ui-stack-layout",Lt));let ut=Lt;var k,C,ae;let Ke=(ae=class{constructor(t){a(this,k,void 0);a(this,C,{});c(this,k,t),this.events=new S}get localStoragePrefix(){return i(this,k).getAttribute("local-storage-prefix")}set localStoragePrefix(t){i(this,k).setAttribute("local-storage-prefix",t)}get enableLocalStorage(){return i(this,k).hasAttribute("enable-local-storage")}set enableLocalStorage(t){t?i(this,k).setAttribute("enable-local-storage",""):i(this,k).removeAttribute("enable-local-storage")}get(t){return i(this,C)[t]}set(t,e,s=!1){if(s&&this.enableLocalStorage){const n=JSON.parse(localStorage.getItem(this.localStoragePrefix+t.toString())||"null");i(this,C)[t]=n??e}else i(this,C)[t]=e;this.enableLocalStorage&&localStorage.setItem(this.localStoragePrefix+t.toString(),JSON.stringify(i(this,C)[t])),this.events.dispatch(t,i(this,C)[t])}update(t,e){if(typeof e!="function")throw"callback is not a function";this.set(t,e(i(this,C)[t]))}on(t,e,s=!1){if(typeof e!="function")throw"callback is not a function";return s&&e(this.get(t)),this.events.on(t,e)}},k=new WeakMap,C=new WeakMap,ae);const Mt=class Mt extends HTMLElement{constructor(){super(),this.ui=new Ke(this)}};o(Mt,"register",()=>customElements.define("ui-store",Mt));let dt=Mt;const Qe=l`
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
`,Tt=class Tt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Qe}};o(Tt,"register",()=>customElements.define("ui-svg-back-arrow-navigation",Tt));let Vt=Tt;const We=l`
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
`,Et=class Et extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=We}};o(Et,"register",()=>customElements.define("ui-svg-chevron-down",Et));let Zt=Et;const Ge=l`
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
`,Ht=class Ht extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ge}};o(Ht,"register",()=>customElements.define("ui-svg-close",Ht));let Bt=Ht;const _e=l`
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
`,At=class At extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=_e}};o(At,"register",()=>customElements.define("ui-svg-delete-recycle-bin",At));let Jt=At;const ti=l`
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
`,St=class St extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ti}};o(St,"register",()=>customElements.define("ui-svg-edit2",St));let Yt=St;const ei=l`
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
`,Rt=class Rt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ei}};o(Rt,"register",()=>customElements.define("ui-svg-pdf-document",Rt));let Xt=Rt;const ii=l`
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
`,$t=class $t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ii}};o($t,"register",()=>customElements.define("ui-svg-settings",$t));let Ft=$t;const si=l`
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
`,It=class It extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=si}};o(It,"register",()=>customElements.define("ui-svg-today-outline",It));let Kt=It;const y={BackArrowNavigation:Vt,ChevronDown:Zt,Close:Bt,DeleteRecycleBin:Jt,Edit2:Yt,PDFDocument:Xt,Settings:Ft,TodayOutline:Kt},ri=l`
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
`;var u,j,K,Q,U,le;let oi=(le=class{constructor(t){a(this,u,void 0);a(this,j,!1);a(this,K,async()=>{[...i(this,u).querySelectorAll('[slot="input"]')].forEach(t=>t.click())});a(this,Q,async t=>{t.stopPropagation()});a(this,U,void 0);c(this,u,t)}get primary(){return i(this,u).getAttribute("primary")}set primary(t){i(this,u).setAttribute("primary",t)}get secondary(){return i(this,u).getAttribute("secondary")}set secondary(t){i(this,u).setAttribute("secondary",t)}getInputSlot(){return[...i(this,u).querySelectorAll('[slot="input"]')]}enableRipple(){i(this,U)||(this.removeRipple=zt(i(this,u)),i(this,u).style.cursor="pointer",this.startInputHandling())}disableRipple(){i(this,U)&&i(this,U).call(this),this.stopInputHandling()}startInputHandling(){i(this,j)||(i(this,u).addEventListener("click",i(this,K)),this.getInputSlot().forEach(t=>{t.addEventListener("click",i(this,Q))}),c(this,j,!0))}stopInputHandling(){i(this,u).removeEventListener("click",i(this,K)),[...i(this,u).querySelectorAll('[slot="input"]')].forEach(t=>{t.removeEventListener("click",i(this,Q))}),c(this,j,!1)}},u=new WeakMap,j=new WeakMap,K=new WeakMap,Q=new WeakMap,U=new WeakMap,le);const Z=class Z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ri,this.cleanup=new h,this.ui=new oi(this)}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}attributeChangedCallback(t,e,s){switch(t){case"ripple":s!==null?this.ui.enableRipple():this.ui.disableRipple();break;case"primary":this.shadowRoot.querySelector("ui-primary").innerHTML=s||"";break;case"secondary":this.shadowRoot.querySelector("ui-secondary").innerHTML=s||"";break}}};o(Z,"register",()=>customElements.define("ui-label",Z)),o(Z,"observedAttributes",["ripple","secondary","primary"]);let pt=Z;const ni=l`
<style>
    :host {
        font-size: 1.1rem;
        font-family: var(--ui-fontFamily);
        font-variation-settings: var(--ui-text-primary-fontVariation);
    }
</style>

<slot></slot>
`,jt=class jt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ni,this.cleanup=new h}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};o(jt,"register",()=>customElements.define("ui-primary",jt));let gt=jt;const ai=l`
<style>
    :host {
        font-size: 0.9rem;
        font-family: var(--ui-fontFamily);
        font-variation-settings: var(--ui-text-secondary-fontVariation);
    }
</style>

<slot></slot>
`,Ut=class Ut extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ai,this.cleanup=new h}connectedCallback(){}disconnectedCallback(){this.cleanup.run()}};o(Ut,"register",()=>customElements.define("ui-secondary",Ut));let Y=Ut;var w;class li{constructor(){a(this,w,null);this.currentTheme=null,this.themes={}}enableAutoMode(){if(this.removeMode(),i(this,w)){this.mediaChangeHandler(i(this,w));return}c(this,w,window.matchMedia("(prefers-color-scheme: dark)")),i(this,w).addEventListener("change",this.mediaChangeHandler),this.mediaChangeHandler(i(this,w))}disableAutoMode(){this.removeMedia()}addTheme(t,e){this.themes[t]=e}loadTheme(t){var s;if(!this.themes[t])throw`theme "${t}" is missing in this.themes`;if(((s=this.currentTheme)==null?void 0:s.name)==t)return;{const n=document.getElementById("theme");n&&(document.head.removeChild(n),this.currentTheme=null)}const e=document.createElement("link");e.id="theme",e.rel="stylesheet",e.href=this.themes[t],document.head.appendChild(e),this.currentTheme={name:t,href:this.themes[t]}}mediaChangeHandler(t){t.matches?document.body.setAttribute("data-theme","dark"):document.body.setAttribute("data-theme","light")}removeMode(t=document.body){t.removeAttribute("data-theme")}setMode(t,e=document.body){switch(t){case"dark":e.setAttribute("data-theme",t);break;case"light":e.setAttribute("data-theme",t);break}}removeMedia(){i(this,w)&&(i(this,w).removeEventListener("change",this.mediaChangeHandler),c(this,w,null))}}w=new WeakMap;const B=class B extends HTMLElement{constructor(){super(),this.ui=new li}attributeChangedCallback(t,e,s){switch(t){case"auto":s!==null?this.ui.enableAutoMode():this.ui.disableAutoMode();break;case"mode":s!==null?this.ui.setMode(s):this.ui.removeMode();break}}};o(B,"register",()=>customElements.define("ui-theme-handler",B)),o(B,"observedAttributes",["auto","mode"]);let mt=B;const ci=Object.freeze(Object.defineProperty({__proto__:null,AppBar:W,Button:G,Container:tt,Dialog:et,FlexGrid:rt,FlexGridItem:it,FlexGridRow:st,IconButton:_,Input:ot,Label:pt,Lang:at,LangType:lt,Primary:gt,Secondary:Y,Select:nt,SelectOption:J,Spinner:ct,StackLayout:ut,StackLayoutPage:ht,Store:dt,ThemeHandler:mt,svg:y},Symbol.toStringTag,{value:"Module"}));async function hi(){W.register(),_.register(),G.register(),tt.register(),it.register(),st.register(),rt.register(),ot.register(),J.register(),nt.register(),lt.register(),at.register(),ct.register(),ht.register(),ut.register(),dt.register(),Y.register(),gt.register(),pt.register(),mt.register(),et.register()}async function ui(){y.BackArrowNavigation.register(),y.ChevronDown.register(),y.Close.register(),y.DeleteRecycleBin.register(),y.Edit2.register(),y.PDFDocument.register(),y.Settings.register(),y.TodayOutline.register()}const di={js:xe,wc:ci,define:hi,defineSVG:ui};module.exports=di;
