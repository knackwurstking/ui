"use strict";var ae=Object.defineProperty;var le=(s,t,e)=>t in s?ae(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var r=(s,t,e)=>(le(s,typeof t!="symbol"?t+"":t,e),e),Zt=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var i=(s,t,e)=>(Zt(s,t,"read from private field"),e?e.call(s):t.get(s)),n=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},l=(s,t,e,o)=>(Zt(s,t,"write to private field"),o?o.call(s,e):t.set(s,e),e);const Nt={onDragStart:null,onDragging:null,onDragEnd:null};function ce(s,t={}){t={...Nt,...t};const e=()=>{const w=[...s.parentNode.children].indexOf(s);s.draggable=!0,s.ondragstart=d=>{d.dataTransfer.effectAllowed="move",d.dataTransfer.dropEffect="move",d.dataTransfer.setData("text/plain",w.toString()),t.onDragStart&&t.onDragStart(w)},s.ondragover=d=>(d.preventDefault(),!1),s.ondragenter=d=>{d.preventDefault(),t.onDragging&&t.onDragging(w)},s.ondrop=d=>{d.preventDefault(),d.dataTransfer.dropEffect="move";const ne=parseInt(d.dataTransfer.getData("text/plain"),10);t.onDragEnd&&t.onDragEnd(ne,w)}},o=()=>{s.draggable=!1,s.ondragstart=null,s.ondragover=null,s.ondragenter=null,s.ondrop=null};return e(),{update(c){t={...Nt,...c},o(),e()},destroy:o}}const he=Object.freeze(Object.defineProperty({__proto__:null,create:ce},Symbol.toStringTag,{value:"Module"}));var u;class ${constructor(){n(this,u,{})}on(t,e){if(typeof e!="function")throw`invalid event listener passed for "${t.toString()}" event!`;return i(this,u)[t]||(i(this,u)[t]=[]),i(this,u)[t].push(e),()=>{this.off(t,e)}}off(t,e){if(!i(this,u)[t])throw`no listeners found for ${t.toString()}, there is nothing to delete`;let o=!1,c=0;for(const w of i(this,u)[t])w===e&&(i(this,u)[t].splice(c,1),o=!0),c++;if(!o)throw`listener not found for ${t.toString()}, there is nothing to delete`;return this}dispatch(t,e){if(e===void 0)throw"data is undefined!";if(i(this,u)[t])for(const o of i(this,u)[t])o(e);return this}}u=new WeakMap;const de=Object.freeze(Object.defineProperty({__proto__:null,Events:$},Symbol.toStringTag,{value:"Module"})),ue={color:"var(--ui-ripple-color, currentColor)",opacity:"var(--ui-ripple-opacity, 0.2)",centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out"};function oe(s,t){t={...ue,...t};const e=document.createElement("div");e.classList.add("ripple"),e.style.position="absolute",e.style.color="inherit",e.style.borderRadius="50%",e.style.pointerEvents="none",e.style.width="100px",e.style.height="100px",e.style.marginTop="-50px",e.style.marginLeft="-50px",e.style.opacity=`${t.opacity}`,e.style.backgroundColor=t.color,e.style.transform="scale(0) translate(0, 0)",e.style.transition=`transform ${t.spreadDuration} ${t.spreadTiming} 0s,opacity ${t.clearDuration} ${t.clearTiming} 0s`,s.currentTarget.appendChild(e);const o=s.currentTarget.getBoundingClientRect();t.centered?(e.style.top=`${o.height/2}px`,e.style.left=`${o.width/2}px`):(e.style.top=`${s.clientY-o.top}px`,e.style.left=`${s.clientX-o.left}px`);const c=Math.max(o.width,o.height)*.02;return e.style.transform=`scale(${c}) translate(0, 0)`,e}function re(s){s&&(s.addEventListener("transitionend",t=>{t.propertyName==="opacity"&&s.remove()}),s.style.opacity="0")}function jt(s,t={}){let e;const o=w=>{e=oe(w,t)},c=()=>{re(e)};return s.classList.add("ripple-container"),s.style.overflow="hidden",s.addEventListener("pointerdown",o),s.addEventListener("pointerup",c),s.addEventListener("pointerleave",c),()=>{s.classList.remove("ripple-container"),s.removeEventListener("pointerdown",o),s.removeEventListener("pointerup",c),s.removeEventListener("pointerleave",c)}}const pe=Object.freeze(Object.defineProperty({__proto__:null,create:jt,start:oe,stop:re},Symbol.toStringTag,{value:"Module"}));function ge(){return/(android)/i.test(navigator.userAgent)}const a=String.raw,fe=String.raw,me=Object.freeze(Object.defineProperty({__proto__:null,css:fe,html:a,isAndroid:ge},Symbol.toStringTag,{value:"Module"})),ve=Object.freeze(Object.defineProperty({__proto__:null,draggable:he,events:de,ripple:pe,utils:me},Symbol.toStringTag,{value:"Module"})),be=a`
<style>
    :host {
        display: flex !important;
        position: absolute !important;
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
`;var k,Yt;let we=(Yt=class{constructor(t){n(this,k,void 0);l(this,k,t)}getLeftSlot(){return[...i(this,k).querySelectorAll('[slot="left"]')]}getCenterSlot(){return[...i(this,k).querySelectorAll('[slot="center"]')]}getRightSlot(){return[...i(this,k).querySelectorAll('[slot="right"]')]}},k=new WeakMap,Yt);const gt=class gt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=be,this.ui=new we(this)}};r(gt,"register",()=>customElements.define("ui-app-bar",gt));let W=gt;const ye=a`
<style>
    :host {
        display: flex !important;
        align-items: center;
        justify-content: center;
        position: relative !important;
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
`;var V,Kt;let xe=(Kt=class{constructor(t){n(this,V,void 0);l(this,V,t),this.removeRipple=null}enableRipple(){this.removeRipple||(this.removeRipple=jt(i(this,V),{centered:!0}))}disableRipple(){this.removeRipple&&this.removeRipple(),this.removeRipple=null}},V=new WeakMap,Kt);const A=class A extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ye,this.ui=new xe(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(t,e,o){switch(t){case"no-ripple":o!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r(A,"register",()=>customElements.define("ui-button",A)),r(A,"observedAttributes",["no-ripple"]);let F=A;const Le=a`
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
`;var Z,Qt;let ke=(Qt=class{constructor(t){n(this,Z,void 0);l(this,Z,t),this.removeRipple=null}enableRipple(){this.removeRipple||(this.removeRipple=jt(i(this,Z),{centered:!0}))}disableRipple(){this.removeRipple&&this.removeRipple(),this.removeRipple=null}},Z=new WeakMap,Qt);const j=class j extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Le,this.ui=new ke(this)}connectedCallback(){!this.hasAttribute("no-ripple")&&!this.ui.removeRipple&&this.ui.enableRipple()}attributeChangedCallback(t,e,o){switch(t){case"no-ripple":o!==null?this.ui.disableRipple():this.ui.enableRipple();break}}};r(j,"register",()=>customElements.define("ui-icon-button",j)),r(j,"observedAttributes",["no-ripple"]);let G=j;const Ce=a`
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
`,ft=class ft extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ce}};r(ft,"register",()=>customElements.define("ui-container",ft));let _=ft;const Me=a`
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
        background-color: var(--ui-dialog-outside-bgColor);
        backdrop-filter: var(--ui-dialog-outside-backdropFilter);
    }

    dialog > .container {
        background-color: var(--ui-dialog-bgColor);
        color: var(--ui-dialog-color);

        border: 1px solid var(--ui-dialog-borderColor);
        border-radius: var(--ui-dialog-radius);

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

        border-top-right-radius: var(--ui-dialog-radius);
        border-top-left-radius: var(--ui-dialog-radius);

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
        border-bottom-right-radius: var(--ui-dialog-radius);
        border-bottom-left-radius: var(--ui-dialog-radius);

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
`;var y,x,L,Wt;let Te=(Wt=class{constructor(t,e){n(this,y,void 0);n(this,x,void 0);n(this,L,void 0);l(this,y,t),l(this,x,e),this.events=new $,l(this,L,document.createElement("h4")),i(this,L).slot="title",i(this,y).appendChild(i(this,L))}get dialog(){return i(this,x)}get fullscreen(){return i(this,y).hasAttribute("fullscreen")}set fullscreen(t){t?i(this,y).setAttribute("fullscreen",""):i(this,y).removeAttribute("fullscreen")}get title(){return i(this,L).innerText}set title(t){i(this,L).innerText=t}open(t=!1){t?i(this,x).showModal():i(this,x).show()}close(){i(this,x).close()}},y=new WeakMap,x=new WeakMap,L=new WeakMap,Wt);var N,J;const mt=class mt extends HTMLElement{constructor(){super();n(this,N,()=>this.ui.events.dispatch("close",null));n(this,J,()=>this.ui.close());this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Me,this.ui=new Te(this,this.shadowRoot.querySelector("dialog"))}connectedCallback(){const e=this.shadowRoot.querySelector(".header ui-icon-button");e.addEventListener("click",i(this,J)),e.addEventListener("click",i(this,N))}disconnectedCallback(){const e=this.shadowRoot.querySelector(".header ui-icon-button");e.removeEventListener("click",i(this,J)),e.removeEventListener("click",i(this,N))}};N=new WeakMap,J=new WeakMap,r(mt,"register",()=>customElements.define("ui-dialog",mt));let tt=mt;const Jt="1",Ee=a`
<style></style>
<slot></slot>
`,I=class I extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ee,this._updateStyle()}attributeChangedCallback(t,e,o){switch(t){case"flex":this._updateStyle({flex:o||Jt});break}}_updateStyle({flex:t=Jt}={}){this.shadowRoot.querySelector("style").textContent=`
            :host {
                flex: ${t};
            }
        `}};r(I,"register",()=>customElements.define("ui-flex-grid-item",I)),r(I,"observedAttributes",["flex"]);let et=I;const Bt="0",He=a`
<style></style>
<slot></slot>
`,U=class U extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=He,this._updateStyle()}attributeChangedCallback(t,e,o){switch(t){case"gap":this._updateStyle({gap:o||Bt});break}}_updateStyle({gap:t=Bt}={}){this.shadowRoot.querySelector("style").textContent=`
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
        `}};r(U,"register",()=>customElements.define("ui-flex-grid-row",U)),r(U,"observedAttributes",["gap"]);let it=U;const Xt="0",Se=a`
<style></style>
<slot></slot>
`,z=class z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Se,this._updateStyle()}attributeChangedCallback(t,e,o){switch(t){case"gap":this._updateStyle({gap:o||Xt});break}}_updateStyle({gap:t=Xt}={}){this.shadowRoot.querySelector("style").textContent=`
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
        `}};r(z,"register",()=>customElements.define("ui-flex-grid",z)),r(z,"observedAttributes",["gap"]);let st=z;const Re=a`
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
`;var m,Ft;let $e=(Ft=class{constructor(t){n(this,m,void 0);l(this,m,t)}get value(){return i(this,m).getAttribute("value")}set value(t){i(this,m).setAttribute("value",t)}get selected(){return i(this,m).hasAttribute("selected")}set selected(t){t?i(this,m).setAttribute("selected",""):i(this,m).removeAttribute("selected")}},m=new WeakMap,Ft);const vt=class vt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Re,this.ui=new $e(this)}};r(vt,"register",()=>customElements.define("ui-select-option",vt));let D=vt;const Ae=a`
<style>
    * {
        box-sizing: border-box;
    }

    :host {
        --items-length: 0;
        position: relative !important; 
        display: block !important;

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
`;let je=class{constructor(){this.events=new $}};var B;const bt=class bt extends HTMLElement{constructor(){super();n(this,B,async e=>{(e.composedPath()||[]).forEach(o=>{o instanceof D&&([...this.querySelectorAll("ui-select-option")].forEach(c=>c.removeAttribute("selected")),o.setAttribute("selected",""),this.ui.events.dispatch("change",o))})});this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ae,this.cleanup=[],this.ui=new je}connectedCallback(){const e=this.shadowRoot.querySelector(".options"),o=this.onClickOptions.bind(this);e.addEventListener("click",o),this.cleanup.push(()=>{this.removeEventListener("click",o),e.removeEventListener("click",this.onClickOptions)}),this.style.setProperty("--items-length",this.querySelectorAll("ui-select-option").length.toString())}disconnectedCallback(){this.cleanup.forEach(e=>e()),this.cleanup=[]}async onClickOptions(e){this.classList.toggle("open")?(e.stopPropagation(),this.addEventListener("click",i(this,B))):setTimeout(()=>this.removeEventListener("click",i(this,B)))}};B=new WeakMap,r(bt,"register",()=>customElements.define("ui-select",bt));let ot=bt;var X,T,Y,Gt;let Ie=(Gt=class{constructor(t){n(this,X,void 0);n(this,T,void 0);n(this,Y,void 0);l(this,X,t),l(this,T,new $),this.langType=null}getFallbackElement(){return i(this,X).querySelector("ui-lang-type[fallback]")}new(t,e){this.langType=t,l(this,Y,e),i(this,T).dispatch("change",this.langType)}get(t,e){var o;return(o=i(this,Y))==null?void 0:o[t][e]}on(t,e,o=!1){if(typeof e!="function")throw"callback is not a function";return o&&e(this.langType),i(this,T).on(t,e)}},X=new WeakMap,T=new WeakMap,Y=new WeakMap,Gt);const q=class q extends HTMLElement{constructor(){super(),this.ui=new Ie(this)}attributeChangedCallback(t,e,o){switch(t){case"current":o!==null&&this._loadLanguage(o);break}}async _loadLanguage(t){const e=this.querySelector(`ui-lang-type[name="${t}"]`)||this.ui.getFallbackElement();if(!e)return;if(!e.ui.href)throw"Missing href attribute!";const o=await fetch(e.ui.href);this.ui.new(e,await o.json())}};r(q,"register",()=>customElements.define("ui-lang",q)),r(q,"observedAttributes",["current"]);let rt=q;var p,_t;let Ue=(_t=class{constructor(t){n(this,p,void 0);l(this,p,t)}get name(){return i(this,p).getAttribute("name")}set name(t){i(this,p).setAttribute("name",t)}get href(){return i(this,p).getAttribute("href")}set href(t){i(this,p).setAttribute("href",t)}get fallback(){return i(this,p).hasAttribute("fallback")}set fallback(t){t?i(this,p).setAttribute("fallback",""):i(this,p).removeAttribute("fallback")}},p=new WeakMap,_t);const wt=class wt extends HTMLElement{constructor(){super(),this.ui=new Ue(this)}};r(wt,"register",()=>customElements.define("ui-lang-type",wt));let nt=wt;const ze=a`
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
`;var E,te;let qe=(te=class{constructor(t){n(this,E,void 0);l(this,E,t)}get name(){return i(this,E).getAttribute("name")}set name(t){i(this,E).setAttribute("name",t)}},E=new WeakMap,te);const yt=class yt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=ze,this.ui=new qe(this)}};r(yt,"register",()=>customElements.define("ui-stack-layout-page",yt));let at=yt;const Oe=a`
    <style>
        :host {
            display: block !important;
            position: relative !important;
            width: 100%;
            height: 100%;
        }
    </style>

    <slot></slot>
`;var C,M,H,ee;let Pe=(ee=class{constructor(t){n(this,C,void 0);n(this,M,!1);n(this,H,{});l(this,C,t),this.events=new $,this.stack=[]}registerPage(t,e){i(this,H)[t]=e}unregisterPage(t){delete i(this,H)[t]}lock(){l(this,M,!0)}unlock(){l(this,M,!1)}goBack(){if(!this.stack.length||i(this,M))return;const t=this.stack.pop();i(this,C).removeChild(t),this.stack.length&&i(this,C).appendChild(this.stack[this.stack.length-1]),this.dispatchChangeEvent()}setPage(t){if(!i(this,M)){if(this.stack.push(i(this,C).appendChild(i(this,H)[t]().children[0])),this.stack.length>1){const e=this.stack[this.stack.length-2];e.parentElement.removeChild(e)}this.dispatchChangeEvent()}}async dispatchChangeEvent(){this.events.dispatch("change",{newPage:this.stack[this.stack.length-1]||null,oldPage:this.stack[this.stack.length-2]||null})}},C=new WeakMap,M=new WeakMap,H=new WeakMap,ee);const xt=class xt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Oe,this.ui=new Pe(this)}};r(xt,"register",()=>customElements.define("ui-stack-layout",xt));let lt=xt;var v,b,ie;let De=(ie=class{constructor(t){n(this,v,void 0);n(this,b,{});l(this,v,t),this.events=new $}get localStoragePrefix(){return i(this,v).getAttribute("local-storage-prefix")}set localStoragePrefix(t){i(this,v).setAttribute("local-storage-prefix",t)}get enableLocalStorage(){return i(this,v).hasAttribute("enable-local-storage")}set enableLocalStorage(t){t?i(this,v).setAttribute("enable-local-storage",""):i(this,v).removeAttribute("enable-local-storage")}get(t){return i(this,b)[t]}set(t,e,o=!1){if(o&&this.enableLocalStorage){const c=JSON.parse(localStorage.getItem(this.localStoragePrefix+t.toString())||"null");i(this,b)[t]=c??e}else i(this,b)[t]=e;this.enableLocalStorage&&localStorage.setItem(this.localStoragePrefix+t.toString(),JSON.stringify(i(this,b)[t])),this.events.dispatch(t,i(this,b)[t])}update(t,e){if(typeof e!="function")throw"callback is not a function";this.set(t,e(i(this,b)[t]))}on(t,e,o=!1){if(typeof e!="function")throw"callback is not a function";return o&&e(this.get(t)),this.events.on(t,e)}},v=new WeakMap,b=new WeakMap,ie);const Lt=class Lt extends HTMLElement{constructor(){super(),this.ui=new De(this)}};r(Lt,"register",()=>customElements.define("ui-store",Lt));let ct=Lt;const Ve=a`
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
`,kt=class kt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ve}};r(kt,"register",()=>customElements.define("ui-svg-back-arrow-navigation",kt));let It=kt;const Ze=a`
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
`,Ct=class Ct extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ze}};r(Ct,"register",()=>customElements.define("ui-svg-chevron-down",Ct));let Ut=Ct;const Ne=a`
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
`,Mt=class Mt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ne}};r(Mt,"register",()=>customElements.define("ui-svg-close",Mt));let zt=Mt;const Je=a`
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
`,Tt=class Tt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Je}};r(Tt,"register",()=>customElements.define("ui-svg-delete-recycle-bin",Tt));let qt=Tt;const Be=a`
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
`,Et=class Et extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Be}};r(Et,"register",()=>customElements.define("ui-svg-edit2",Et));let Ot=Et;const Xe=a`
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
`,Ht=class Ht extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Xe}};r(Ht,"register",()=>customElements.define("ui-svg-pdf-document",Ht));let Pt=Ht;const Ye=a`
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
`,St=class St extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ye}};r(St,"register",()=>customElements.define("ui-svg-settings",St));let Dt=St;const Ke=a`
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
`,Rt=class Rt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ke}};r(Rt,"register",()=>customElements.define("ui-svg-today-outline",Rt));let Vt=Rt;const f={BackArrowNavigation:It,ChevronDown:Ut,Close:zt,DeleteRecycleBin:qt,Edit2:Ot,PDFDocument:Pt,Settings:Dt,TodayOutline:Vt},Qe=a`
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
`;var h,S,K,Q,R,se;let We=(se=class{constructor(t){n(this,h,void 0);n(this,S,!1);n(this,K,async()=>{[...i(this,h).querySelectorAll('[slot="input"]')].forEach(t=>t.click())});n(this,Q,async t=>{t.stopPropagation()});n(this,R,void 0);l(this,h,t)}get primary(){return i(this,h).getAttribute("primary")}set primary(t){i(this,h).setAttribute("primary",t)}get secondary(){return i(this,h).getAttribute("secondary")}set secondary(t){i(this,h).setAttribute("secondary",t)}getInputSlot(){return[...i(this,h).querySelectorAll('[slot="input"]')]}enableRipple(){i(this,R)||(this.removeRipple=jt(i(this,h)),i(this,h).style.cursor="pointer",this._startInputHandling())}disableRipple(){i(this,R)&&i(this,R).call(this),this._stopInputHandling()}_startInputHandling(){i(this,S)||(i(this,h).addEventListener("click",i(this,K)),this.getInputSlot().forEach(t=>{t.addEventListener("click",i(this,Q))}),l(this,S,!0))}_stopInputHandling(){i(this,h).removeEventListener("click",i(this,K)),[...i(this,h).querySelectorAll('[slot="input"]')].forEach(t=>{t.removeEventListener("click",i(this,Q))}),l(this,S,!1)}},h=new WeakMap,S=new WeakMap,K=new WeakMap,Q=new WeakMap,R=new WeakMap,se);const O=class O extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Qe,this.ui=new We(this)}attributeChangedCallback(t,e,o){switch(t){case"ripple":o!==null?this.ui.enableRipple():this.ui.disableRipple();break;case"primary":this.shadowRoot.querySelector("ui-primary").innerHTML=o||"";break;case"secondary":this.shadowRoot.querySelector("ui-secondary").innerHTML=o||"";break}}};r(O,"register",()=>customElements.define("ui-label",O)),r(O,"observedAttributes",["ripple","secondary","primary"]);let ht=O;const Fe=a`
<style>
    :host {
        font-size: 1.1rem;
        font-family: var(--ui-primary-fontFamily);
        font-variation-settings: var(--ui-primary-fontVariation);
    }
</style>

<slot></slot>
`,$t=class $t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Fe}};r($t,"register",()=>customElements.define("ui-primary",$t));let dt=$t;const Ge=a`
<style>
    :host {
        font-size: 0.9rem;
        font-family: var(--ui-secondary-fontFamily);
        font-variation-settings: var(--ui-secondary-fontVariation);
    }
</style>

<slot></slot>
`,At=class At extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=Ge}};r(At,"register",()=>customElements.define("ui-secondary",At));let ut=At;var g;class _e{constructor(){n(this,g,null);this.currentTheme=null,this.themes={}}enableAutoMode(){if(this.removeMode(),i(this,g)){this.mediaChangeHandler(i(this,g));return}l(this,g,window.matchMedia("(prefers-color-scheme: dark)")),i(this,g).addEventListener("change",this.mediaChangeHandler),this.mediaChangeHandler(i(this,g))}disableAutoMode(){this.removeMedia()}addTheme(t,e){this.themes[t]=e}loadTheme(t){var o;if(!this.themes[t])throw`theme "${t}" is missing in this.themes`;if(((o=this.currentTheme)==null?void 0:o.name)==t)return;{const c=document.getElementById("theme");c&&(document.head.removeChild(c),this.currentTheme=null)}const e=document.createElement("link");e.id="theme",e.rel="stylesheet",e.href=this.themes[t],document.head.appendChild(e),this.currentTheme={name:t,href:this.themes[t]}}mediaChangeHandler(t){t.matches?document.body.setAttribute("data-theme","dark"):document.body.setAttribute("data-theme","light")}removeMode(t=document.body){t.removeAttribute("data-theme")}setMode(t,e=document.body){switch(t){case"dark":e.setAttribute("data-theme",t);break;case"light":e.setAttribute("data-theme",t);break}}removeMedia(){i(this,g)&&(i(this,g).removeEventListener("change",this.mediaChangeHandler),l(this,g,null))}}g=new WeakMap;const P=class P extends HTMLElement{constructor(){super(),this.ui=new _e}attributeChangedCallback(t,e,o){switch(t){case"auto":o!==null?this.ui.enableAutoMode():this.ui.disableAutoMode();break;case"mode":o!==null?this.ui.setMode(o):this.ui.removeMode();break}}};r(P,"register",()=>customElements.define("ui-theme-handler",P)),r(P,"observedAttributes",["auto","mode"]);let pt=P;const ti=Object.freeze(Object.defineProperty({__proto__:null,AppBar:W,Button:F,Container:_,Dialog:tt,FlexGrid:st,FlexGridItem:et,FlexGridRow:it,IconButton:G,Label:ht,Lang:rt,LangType:nt,Primary:dt,Secondary:ut,Select:ot,SelectOption:D,StackLayout:lt,StackLayoutPage:at,Store:ct,ThemeHandler:pt,svg:f},Symbol.toStringTag,{value:"Module"}));async function ei(){W.register(),G.register(),F.register(),_.register(),et.register(),it.register(),st.register(),D.register(),ot.register(),nt.register(),rt.register(),at.register(),lt.register(),ct.register(),ut.register(),dt.register(),ht.register(),pt.register(),tt.register()}async function ii(){f.BackArrowNavigation.register(),f.ChevronDown.register(),f.Close.register(),f.DeleteRecycleBin.register(),f.Edit2.register(),f.PDFDocument.register(),f.Settings.register(),f.TodayOutline.register()}const si={js:ve,wc:ti,define:ei,defineSVG:ii};module.exports=si;
