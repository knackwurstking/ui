(function(l,A){typeof exports=="object"&&typeof module<"u"?A(exports):typeof define=="function"&&define.amd?define(["exports"],A):(l=typeof globalThis<"u"?globalThis:l||self,A(l.ui={}))})(this,function(l){"use strict";var Mt;let A=null;function jt(){return A===null&&(A=Array.from(document.styleSheets).map(i=>{const e=new CSSStyleSheet,t=Array.from(i.cssRules).map(o=>o.cssText).join(" ");return e.replaceSync(t),e})),A}function Ut(i){i.adoptedStyleSheets.push(...jt())}class ve{constructor(){this.listeners={}}addListener(e,t){return this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t),()=>this.removeListener(e,t)}removeListener(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(o=>o!==t))}dispatch(e,t){this.listeners[e]&&this.listeners[e].forEach(o=>o(t))}}class At{constructor(){this.callbacks=[]}add(...e){this.callbacks.push(...e)}run(){this.callbacks.filter(e=>(e(),!1))}}const Et={onDragStart:null,onDragging:null,onDragEnd:null};function It(i,e,t){t={...Et,...t};const o=[...i.children].indexOf(e);return e.draggable=!0,e.ondragstart=r=>{r.dataTransfer&&(r.dataTransfer.effectAllowed="move",r.dataTransfer.dropEffect="move"),i.classList.add("ui-dragging"),t.onDragStart&&t.onDragStart(o)},e.ondragover=r=>(r.preventDefault(),!1),e.ondragenter=r=>{r.preventDefault(),[...i.children].forEach((s,n)=>{if(n===o){s.style.background="var(--ui-primary)",s.style.color="var(--ui-primary-text)";return}s.style.background="inherit",s.style.color="inherit"}),t.onDragging&&t.onDragging(o)},e.ondrop=r=>{r.preventDefault(),r.dataTransfer&&(r.dataTransfer.dropEffect="move"),i.classList.remove("ui-dragging"),t.onDragEnd&&t.onDragEnd(o),[...i.children].forEach(s=>{s.style.background="inherit",s.style.color="inherit"})},()=>{e.draggable=!1,e.ondragstart=null,e.ondragover=null,e.ondragenter=null,e.ondrop=null}}const Rt={onDragStart:null,onDragEnd:null};function Dt(i,e){e={...Rt,...e};let t=null,o=null,r=null,s=!1,n="",u="";const p=c=>{const w=c.currentTarget;!t&&Array.from(w.classList).includes("draggable")&&(o=new Date().getTime(),t=w,r&&clearTimeout(r),r=setTimeout(()=>{t&&(n=t.style.color,u=t.style.backgroundColor,t.style.color="var(--ui-primary-text)",t.style.backgroundColor="var(--ui-primary)",i.classList.add("ui-dragging"),s=!0,e!=null&&e.onDragStart&&e.onDragStart())},200))},y=c=>{if(!o||!t)return;if(!s&&new Date().getTime()-o<200){b();return}c.preventDefault(),s||(s=!0,e!=null&&e.onDragStart&&e.onDragStart());let w;if(c instanceof TouchEvent){const U=c.targetTouches[0];w={clientX:U.clientX,clientY:U.clientY}}else w={clientX:c.clientX,clientY:c.clientY};let _=document.elementFromPoint(w.clientX,w.clientY);if(_){for(;!_.classList.contains("draggable")&&_.parentElement;)_=_.parentElement;_.classList.contains("draggable")&&((()=>{let Me=t==null?void 0:t.previousElementSibling;for(;Me;){if(Me===_)return!0;Me=Me.previousElementSibling}return!1})()?i.insertBefore(t,_):i.insertBefore(t,_.nextElementSibling))}},b=()=>{r!==null&&(clearTimeout(r),r=null),t&&(t.style.color=n,t.style.backgroundColor=u,t=null),o=null,i.classList.remove("ui-dragging"),s&&(s=!1,e!=null&&e.onDragEnd&&e.onDragEnd())};return[...i.children].forEach(c=>{c.classList.add("draggable"),c.onmousedown=p,c.ontouchstart=p,c.onmousemove=y,c.ontouchmove=y,i.onmouseleave=c.onmouseup=b,c.ontouchend=b}),()=>{[...i.children].forEach(c=>{c.classList.remove("draggable"),c.onmousedown=null,c.ontouchstart=null,c.onmousemove=null,c.ontouchmove=null,i.onmouseleave=c.onmouseup=null,c.ontouchend=null})}}const Bt=Object.freeze(Object.defineProperty({__proto__:null,createMobile:Dt,createNative:It},Symbol.toStringTag,{value:"Module"})),rt={color:"var(--ui-ripple, currentColor)",opacity:"var(--ui-ripple-opacity, 0.2)",centered:!1,spreadDuration:".4s",spreadTiming:"linear",clearDuration:"1s",clearTiming:"ease-in-out",usePointer:!1};function ye(i,e){e={...rt,...e||{}};let t=null;const o=u=>{t=je(u,e),i.addEventListener("pointermove",s)},r=()=>{i.removeEventListener("pointermove",s),Ue(t),t=null},s=()=>r(),n=u=>{t=je(u,e),Ue(t),t=null};return i.classList.add("ripple-container"),i.style.overflow="hidden",e.usePointer?(i.addEventListener("pointerdown",o),i.addEventListener("pointerup",r),i.addEventListener("pointerleave",r)):i.addEventListener("click",n),()=>{if(i.classList.remove("ripple-container"),e.usePointer){i.removeEventListener("pointerdown",o),i.removeEventListener("pointerup",r),i.removeEventListener("pointerleave",r),i.removeEventListener("pointermove",s);return}i.removeEventListener("click",n)}}function je(i,e){const t=document.createElement("div"),o=i.currentTarget;o.appendChild(t),t.classList.add("ripple"),t.style.position="absolute",t.style.color="inherit",t.style.borderRadius="50%",t.style.pointerEvents="none",t.style.width="100px",t.style.height="100px",t.style.marginTop="-50px",t.style.marginLeft="-50px",t.style.opacity=`${e.opacity}`,t.style.backgroundColor=`${e.color}`,t.style.transform="scale(0) translate(0, 0)",t.style.transition=`transform ${e.spreadDuration} ${e.spreadTiming} 0s,opacity ${e.clearDuration} ${e.clearTiming} 0s`;const r=o.getBoundingClientRect();e.centered?(t.style.top=`${r.height/2}px`,t.style.left=`${r.width/2}px`):(t.style.top=`${i.clientY-r.top}px`,t.style.left=`${i.clientX-r.left}px`);const s=Math.max(r.width,r.height)*.02;return t.style.transform=`scale(${s}) translate(0, 0)`,t}function Ue(i){i&&(i.addEventListener("transitionend",e=>{e.propertyName==="opacity"&&i.remove()}),i.style.opacity="0")}const Vt=Object.freeze(Object.defineProperty({__proto__:null,create:ye,defaultOptions:rt,start:je,stop:Ue},Symbol.toStringTag,{value:"Module"})),v=String.raw,Ht=String.raw;function Gt(){return/(android)/i.test(navigator.userAgent)}function Tt(i){return Object.entries(i).map(([e,t])=>`${e.replace(/[A-Z]/g,o=>`-${o.toLowerCase()}`)}:${t}`).join(";")+";"}const zt=v`
    <svg fill="currentColor" viewBox="0 0 407.032 407.032" xml:space="preserve">
        <path
            d="M406.21,38.256c-1.346-2.736-4.13-4.47-7.179-4.47H42.368c-2.481,0-4.821,1.151-6.336,3.115L1.664,81.48
	c-1.862,2.415-2.189,5.678-0.844,8.415c1.346,2.737,4.13,4.47,7.179,4.47h65.262v270.88c0,4.418,3.582,8,8,8h210.089
	c0.017,0,0.033,0,0.05,0c0.081,0,0.162-0.001,0.243-0.004c1.106-0.032,2.156-0.29,3.106-0.727c0.003-0.001,0.006-0.003,0.009-0.004
	c0.002-0.001,0.003-0.001,0.005-0.002c0.955-0.441,1.838-1.078,2.583-1.907c0.062-0.067,0.121-0.136,0.18-0.206l34.333-40.284
	c1.233-1.448,1.911-3.287,1.911-5.189V94.365h30.895c2.48,0,4.821-1.151,6.336-3.116l34.366-44.579
	C407.229,44.256,407.556,40.992,406.21,38.256z M77.328,78.365H24.269l22.033-28.579H99.36L77.328,78.365z M283.405,357.245H89.262
	V94.365h194.143V357.245z M287.471,78.365H97.531l22.033-28.579h189.939L287.471,78.365z M317.771,321.976l-18.366,21.55V94.365
	h18.366V321.976z M360.732,78.365h-53.059l22.031-28.579h53.059L360.732,78.365z M169.993,287.391
	c-12.722,0-23.071,10.35-23.071,23.072c0,12.722,10.35,23.071,23.071,23.071c12.721,0,23.071-10.35,23.071-23.071
	C193.064,297.741,182.714,287.391,169.993,287.391z M169.993,317.534c-3.899,0-7.071-3.172-7.071-7.071
	c0-3.899,3.172-7.072,7.071-7.072s7.071,3.173,7.071,7.072C177.064,314.362,173.892,317.534,169.993,317.534z M169.993,217.467
	c12.721,0,23.071-10.35,23.071-23.072c0-12.721-10.35-23.071-23.071-23.071c-12.722,0-23.071,10.35-23.071,23.071
	C146.922,207.117,157.271,217.467,169.993,217.467z M169.993,187.324c3.899,0,7.071,3.172,7.071,7.071
	c0,3.9-3.172,7.072-7.071,7.072s-7.071-3.173-7.071-7.072C162.922,190.496,166.094,187.324,169.993,187.324z M181.615,252.429
	c0,12.722,10.35,23.071,23.071,23.071c12.722,0,23.071-10.35,23.071-23.071c0-12.722-10.35-23.073-23.071-23.073
	C191.965,229.356,181.615,239.707,181.615,252.429z M204.686,245.356c3.899,0,7.071,3.173,7.071,7.073
	c0,3.899-3.172,7.071-7.071,7.071c-3.899,0-7.071-3.172-7.071-7.071C197.615,248.529,200.787,245.356,204.686,245.356z
	 M234.829,287.391c-12.722,0-23.071,10.35-23.071,23.072c0,12.722,10.35,23.071,23.071,23.071s23.071-10.35,23.071-23.071
	C257.9,297.741,247.55,287.391,234.829,287.391z M234.829,317.534c-3.899,0-7.071-3.172-7.071-7.071
	c0-3.899,3.172-7.072,7.071-7.072s7.071,3.173,7.071,7.072C241.9,314.362,238.728,317.534,234.829,317.534z M234.829,217.467
	c12.722,0,23.071-10.35,23.071-23.072c0-12.721-10.35-23.071-23.071-23.071s-23.071,10.35-23.071,23.071
	C211.757,207.117,222.107,217.467,234.829,217.467z M234.829,187.324c3.899,0,7.071,3.172,7.071,7.071
	c0,3.9-3.172,7.072-7.071,7.072s-7.071-3.173-7.071-7.072C227.757,190.496,230.929,187.324,234.829,187.324z M139.851,275.501
	c12.723,0,23.073-10.35,23.073-23.071c0-12.722-10.351-23.073-23.073-23.073c-12.722,0-23.071,10.351-23.071,23.073
	C116.779,265.151,127.129,275.501,139.851,275.501z M139.851,245.356c3.9,0,7.073,3.173,7.073,7.073
	c0,3.899-3.173,7.071-7.073,7.071c-3.899,0-7.071-3.172-7.071-7.071C132.779,248.529,135.952,245.356,139.851,245.356z"
        />
    </svg>
`,Zt=Object.freeze(Object.defineProperty({__proto__:null,cornflakesOpenBox:zt},Symbol.toStringTag,{value:"Module"})),Nt=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M5 19.6693V4C5 3.44772 5.44772 3 6 3H18C18.5523 3 19 3.44772 19 4V19.6693C19 20.131 18.4277 20.346 18.1237 19.9985L12 13L5.87629 19.9985C5.57227 20.346 5 20.131 5 19.6693Z"
                stroke="currentColor"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,Ft=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,Ae=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M17 9.5L12 14.5L7 9.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,qt=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M14.5 17L9.5 12L14.5 7"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,it=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M7 17L16.8995 7.10051"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M7 7.00001L16.8995 16.8995"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,Wt=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M13 3L16 6L19 9M13 3L5 3L5 21L19 21L19 9M13 3L13 9L19 9"
                stroke="currentColor"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,Yt=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M5 12V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V12"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M12 3L12 15M12 15L16 11M12 15L8 11"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,Kt=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <circle
                cx="9.5"
                cy="6"
                r="0.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></circle>
            <circle
                cx="9.5"
                cy="10"
                r="0.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></circle>
            <circle
                cx="9.5"
                cy="14"
                r="0.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></circle>
            <circle
                cx="9.5"
                cy="18"
                r="0.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></circle>
            <circle
                cx="14.5"
                cy="6"
                r="0.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></circle>
            <circle
                cx="14.5"
                cy="10"
                r="0.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></circle>
            <circle
                cx="14.5"
                cy="14"
                r="0.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></circle>
            <circle
                cx="14.5"
                cy="18"
                r="0.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></circle>
        </g>
    </svg>
`,Xt=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M6 12H18"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M6 15.5H18"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M6 8.5H18"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,Jt=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="transparent"></rect>
            <circle
                cx="12"
                cy="7"
                r="0.5"
                transform="rotate(90 12 7)"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></circle>
            <circle
                cx="12"
                cy="12"
                r="0.5"
                transform="rotate(90 12 12)"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></circle>
            <circle
                cx="12"
                cy="17"
                r="0.5"
                transform="rotate(90 12 17)"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></circle>
        </g>
    </svg>
`,Qt=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M15.6287 5.12132L4.31497 16.435M15.6287 5.12132L19.1642 8.65685M15.6287 5.12132L17.0429 3.70711C17.4334 3.31658 18.0666 3.31658 18.4571 3.70711L20.5784 5.82843C20.969 6.21895 20.969 6.85212 20.5784 7.24264L19.1642 8.65685M7.85051 19.9706L4.31497 16.435M7.85051 19.9706L19.1642 8.65685M7.85051 19.9706L3.25431 21.0312L4.31497 16.435"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,er=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M12 6V18"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M6 12H18"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,tr=v`
    <svg
        style="color: inherit;"
        viewBox="0 0 64 64"
        fill="transparent"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <style type="text/css">
                .st0 {
                    fill: var(--ui-svg-bg, red);
                    transition: fill 0.25s linear;
                }
                .st1 {
                    opacity: 0.2;
                }
                .st2 {
                    fill: var(--ui-svg-bg, red);
                    transition: fill 0.25s linear;
                }
                .st3 {
                    fill: none;
                    stroke: var(--ui-svg-fg, currentColor);
                    stroke-width: 4;
                    stroke-linecap: round;
                    stroke-miterlimit: 10;
                    transition: fill 0.25s linear;
                }
            </style>
            <circle class="st0" cx="32" cy="32" r="32"></circle>
            <g class="st1">
                <path
                    class="st2"
                    d="M32,52c-9.9,0-18-8.1-18-18c0-6.4,3.4-12.3,8.9-15.5c1-0.6,2.2-0.2,2.7,0.7c0.6,1,0.2,2.2-0.7,2.7 C20.7,24.4,18,29.1,18,34c0,7.7,6.3,14,14,14c7.7,0,14-6.3,14-14c0-5.1-2.7-9.7-7.2-12.2c-1-0.5-1.3-1.8-0.8-2.7 c0.5-1,1.8-1.3,2.7-0.8C46.5,21.5,50,27.5,50,34C50,43.9,41.9,52,32,52z"
                ></path>
            </g>
            <g class="st1">
                <path
                    class="st2"
                    d="M32,36c-1.1,0-2-0.9-2-2V14c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2v20C34,35.1,33.1,36,32,36z"
                ></path>
            </g>
            <path
                class="st3"
                d="M39.8,18c4.9,2.7,8.2,8,8.2,14c0,8.8-7.2,16-16,16c-8.8,0-16-7.2-16-16c0-5.9,3.2-11,7.9-13.8"
            ></path>
            <line class="st3" x1="32" y1="32" x2="32" y2="12"></line>
        </g>
    </svg>
`,rr=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M18.75 17H20C20.5523 17 21 16.5523 21 16V8C21 7.44772 20.5523 7 20 7H4C3.44772 7 3 7.44772 3 8V16C3 16.5523 3.44772 17 4 17H5.25"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12V20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20V12Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M6 4C6 3.44772 6.44772 3 7 3H17C17.5523 3 18 3.44772 18 4V7H6V4Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M8.5 13.5H15.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M8.5 18.5H15.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M8.5 16H15.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,ir=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill=""></rect>
            <path
                d="M21.3687 13.5827C21.4144 13.3104 21.2306 13.0526 20.9583 13.0069C20.686 12.9612 20.4281 13.1449 20.3825 13.4173L21.3687 13.5827ZM12 20.5C7.30558 20.5 3.5 16.6944 3.5 12H2.5C2.5 17.2467 6.75329 21.5 12 21.5V20.5ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5V2.5C6.75329 2.5 2.5 6.75329 2.5 12H3.5ZM12 3.5C15.3367 3.5 18.2252 5.4225 19.6167 8.22252L20.5122 7.77748C18.9583 4.65062 15.7308 2.5 12 2.5V3.5ZM20.3825 13.4173C19.7081 17.437 16.2112 20.5 12 20.5V21.5C16.7077 21.5 20.6148 18.0762 21.3687 13.5827L20.3825 13.4173Z"
                fill="currentColor"
            ></path>
            <path
                d="M20.4716 2.42157V8.07843H14.8147"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,ot=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <g clip-path="url(#clip0_15_152)">
                <rect width="24" height="24" fill="none"></rect>
                <circle
                    cx="10.5"
                    cy="10.5"
                    r="6.5"
                    stroke="currentColor"
                    stroke-linejoin="round"
                ></circle>
                <path
                    d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
                    fill="currentColor"
                ></path>
            </g>
            <defs>
                <clipPath id="clip0_15_152">
                    <rect width="24" height="24" fill="none"></rect>
                </clipPath>
            </defs>
        </g>
    </svg>
`,or=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M13.5 2L13.9961 1.93798C13.9649 1.68777 13.7522 1.5 13.5 1.5V2ZM10.5 2V1.5C10.2478 1.5 10.0351 1.68777 10.0039 1.93798L10.5 2ZM13.7747 4.19754L13.2786 4.25955C13.3047 4.46849 13.4589 4.63867 13.6642 4.68519L13.7747 4.19754ZM16.2617 5.22838L15.995 5.6513C16.1731 5.76362 16.4024 5.75233 16.5687 5.62306L16.2617 5.22838ZM18.0104 3.86826L18.364 3.51471C18.1857 3.3364 17.9025 3.31877 17.7034 3.47359L18.0104 3.86826ZM20.1317 5.98958L20.5264 6.29655C20.6812 6.09751 20.6636 5.81434 20.4853 5.63603L20.1317 5.98958ZM18.7716 7.73831L18.3769 7.43134C18.2477 7.59754 18.2364 7.82693 18.3487 8.00503L18.7716 7.73831ZM19.8025 10.2253L19.3148 10.3358C19.3613 10.5411 19.5315 10.6953 19.7404 10.7214L19.8025 10.2253ZM22 10.5H22.5C22.5 10.2478 22.3122 10.0351 22.062 10.0039L22 10.5ZM22 13.5L22.062 13.9961C22.3122 13.9649 22.5 13.7522 22.5 13.5H22ZM19.8025 13.7747L19.7404 13.2786C19.5315 13.3047 19.3613 13.4589 19.3148 13.6642L19.8025 13.7747ZM18.7716 16.2617L18.3487 15.995C18.2364 16.1731 18.2477 16.4025 18.3769 16.5687L18.7716 16.2617ZM20.1317 18.0104L20.4853 18.364C20.6636 18.1857 20.6812 17.9025 20.5264 17.7034L20.1317 18.0104ZM18.0104 20.1317L17.7034 20.5264C17.9025 20.6812 18.1857 20.6636 18.364 20.4853L18.0104 20.1317ZM16.2617 18.7716L16.5687 18.3769C16.4024 18.2477 16.1731 18.2364 15.995 18.3487L16.2617 18.7716ZM13.7747 19.8025L13.6642 19.3148C13.4589 19.3613 13.3047 19.5315 13.2786 19.7404L13.7747 19.8025ZM13.5 22V22.5C13.7522 22.5 13.9649 22.3122 13.9961 22.062L13.5 22ZM10.5 22L10.0039 22.062C10.0351 22.3122 10.2478 22.5 10.5 22.5V22ZM10.2253 19.8025L10.7214 19.7404C10.6953 19.5315 10.5411 19.3613 10.3358 19.3148L10.2253 19.8025ZM7.73832 18.7716L8.00504 18.3487C7.82694 18.2364 7.59756 18.2477 7.43135 18.3769L7.73832 18.7716ZM5.98959 20.1317L5.63604 20.4853C5.81435 20.6636 6.09752 20.6812 6.29656 20.5264L5.98959 20.1317ZM3.86827 18.0104L3.4736 17.7034C3.31878 17.9025 3.33641 18.1857 3.51472 18.364L3.86827 18.0104ZM5.22839 16.2617L5.62307 16.5687C5.75234 16.4025 5.76363 16.1731 5.65131 15.995L5.22839 16.2617ZM4.19754 13.7747L4.68519 13.6642C4.63867 13.4589 4.46849 13.3047 4.25955 13.2786L4.19754 13.7747ZM2 13.5H1.5C1.5 13.7522 1.68777 13.9649 1.93798 13.9961L2 13.5ZM2 10.5L1.93798 10.0039C1.68777 10.0351 1.5 10.2478 1.5 10.5H2ZM4.19754 10.2253L4.25955 10.7214C4.46849 10.6953 4.63867 10.5411 4.68519 10.3358L4.19754 10.2253ZM5.22839 7.73831L5.65131 8.00503C5.76363 7.82693 5.75234 7.59755 5.62307 7.43134L5.22839 7.73831ZM3.86827 5.98959L3.51472 5.63603C3.33641 5.81434 3.31878 6.09751 3.47359 6.29656L3.86827 5.98959ZM5.98959 3.86827L6.29656 3.47359C6.09752 3.31878 5.81434 3.33641 5.63604 3.51471L5.98959 3.86827ZM7.73832 5.22839L7.43135 5.62306C7.59755 5.75233 7.82694 5.76363 8.00504 5.6513L7.73832 5.22839ZM10.2253 4.19754L10.3358 4.68519C10.5411 4.63867 10.6953 4.46849 10.7214 4.25955L10.2253 4.19754ZM13.5 1.5H10.5V2.5H13.5V1.5ZM14.2708 4.13552L13.9961 1.93798L13.0039 2.06202L13.2786 4.25955L14.2708 4.13552ZM16.5284 4.80547C15.7279 4.30059 14.8369 3.92545 13.8851 3.70989L13.6642 4.68519C14.503 4.87517 15.2886 5.20583 15.995 5.6513L16.5284 4.80547ZM16.5687 5.62306L18.3174 4.26294L17.7034 3.47359L15.9547 4.83371L16.5687 5.62306ZM17.6569 4.22182L19.7782 6.34314L20.4853 5.63603L18.364 3.51471L17.6569 4.22182ZM19.7371 5.68261L18.3769 7.43134L19.1663 8.04528L20.5264 6.29655L19.7371 5.68261ZM20.2901 10.1149C20.0746 9.16313 19.6994 8.27213 19.1945 7.47158L18.3487 8.00503C18.7942 8.71138 19.1248 9.49695 19.3148 10.3358L20.2901 10.1149ZM22.062 10.0039L19.8645 9.72917L19.7404 10.7214L21.938 10.9961L22.062 10.0039ZM22.5 13.5V10.5H21.5V13.5H22.5ZM19.8645 14.2708L22.062 13.9961L21.938 13.0039L19.7404 13.2786L19.8645 14.2708ZM19.1945 16.5284C19.6994 15.7279 20.0746 14.8369 20.2901 13.8851L19.3148 13.6642C19.1248 14.503 18.7942 15.2886 18.3487 15.995L19.1945 16.5284ZM20.5264 17.7034L19.1663 15.9547L18.3769 16.5687L19.7371 18.3174L20.5264 17.7034ZM18.364 20.4853L20.4853 18.364L19.7782 17.6569L17.6569 19.7782L18.364 20.4853ZM15.9547 19.1663L17.7034 20.5264L18.3174 19.7371L16.5687 18.3769L15.9547 19.1663ZM13.8851 20.2901C14.8369 20.0746 15.7279 19.6994 16.5284 19.1945L15.995 18.3487C15.2886 18.7942 14.503 19.1248 13.6642 19.3148L13.8851 20.2901ZM13.9961 22.062L14.2708 19.8645L13.2786 19.7404L13.0039 21.938L13.9961 22.062ZM10.5 22.5H13.5V21.5H10.5V22.5ZM9.72917 19.8645L10.0039 22.062L10.9961 21.938L10.7214 19.7404L9.72917 19.8645ZM7.4716 19.1945C8.27214 19.6994 9.16314 20.0746 10.1149 20.2901L10.3358 19.3148C9.49696 19.1248 8.71139 18.7942 8.00504 18.3487L7.4716 19.1945ZM6.29656 20.5264L8.04529 19.1663L7.43135 18.3769L5.68262 19.7371L6.29656 20.5264ZM3.51472 18.364L5.63604 20.4853L6.34315 19.7782L4.22183 17.6569L3.51472 18.364ZM4.83372 15.9547L3.4736 17.7034L4.26295 18.3174L5.62307 16.5687L4.83372 15.9547ZM3.70989 13.8851C3.92545 14.8369 4.30059 15.7279 4.80547 16.5284L5.65131 15.995C5.20584 15.2886 4.87517 14.503 4.68519 13.6642L3.70989 13.8851ZM1.93798 13.9961L4.13552 14.2708L4.25955 13.2786L2.06202 13.0039L1.93798 13.9961ZM1.5 10.5V13.5H2.5V10.5H1.5ZM4.13552 9.72917L1.93798 10.0039L2.06202 10.9961L4.25955 10.7214L4.13552 9.72917ZM4.80547 7.47159C4.30059 8.27213 3.92545 9.16313 3.70989 10.1149L4.68519 10.3358C4.87517 9.49696 5.20583 8.71138 5.65131 8.00503L4.80547 7.47159ZM3.47359 6.29656L4.83371 8.04528L5.62307 7.43134L4.26295 5.68262L3.47359 6.29656ZM5.63604 3.51471L3.51472 5.63603L4.22182 6.34314L6.34314 4.22182L5.63604 3.51471ZM8.04529 4.83371L6.29656 3.47359L5.68262 4.26294L7.43135 5.62306L8.04529 4.83371ZM10.1149 3.70989C9.16313 3.92545 8.27214 4.30059 7.4716 4.80547L8.00504 5.6513C8.71139 5.20583 9.49696 4.87517 10.3358 4.68519L10.1149 3.70989ZM10.0039 1.93798L9.72917 4.13552L10.7214 4.25955L10.9961 2.06202L10.0039 1.93798Z"
                fill="currentColor"
            ></path>
            <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                stroke-linejoin="round"
            ></circle>
        </g>
    </svg>
`,sr=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <g clip-path="url(#clip0_15_72)">
                <rect width="24" height="24" fill="none"></rect>
                <circle
                    cx="7"
                    cy="12"
                    r="2"
                    stroke="currentColor"
                    stroke-linejoin="round"
                ></circle>
                <circle
                    cx="17"
                    cy="6"
                    r="2"
                    stroke="currentColor"
                    stroke-linejoin="round"
                ></circle>
                <path d="M15 7L8.5 11" stroke="currentColor"></path>
                <circle
                    cx="17"
                    cy="18"
                    r="2"
                    stroke="currentColor"
                    stroke-linejoin="round"
                ></circle>
                <path d="M8.5 13.5L15 17" stroke="currentColor"></path>
            </g>
            <defs>
                <clipPath id="clip0_15_72">
                    <rect width="24" height="24" fill="none"></rect>
                </clipPath>
            </defs>
        </g>
    </svg>
`,nr=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <g filter="url(#filter0_d_15_286)">
                <path
                    d="M3 8.26667V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V8.26667M3 8.26667V5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V8.26667M3 8.26667H21"
                    stroke="currentColor"
                    stroke-linejoin="round"
                ></path>
            </g>
            <g filter="url(#filter1_d_15_286)">
                <circle
                    cx="12"
                    cy="14"
                    r="2"
                    stroke="currentColor"
                    stroke-linejoin="round"
                ></circle>
            </g>
            <g filter="url(#filter2_d_15_286)">
                <path
                    d="M7 2V5"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </g>
            <g filter="url(#filter3_d_15_286)">
                <path
                    d="M17 2V5"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </g>
            <defs>
                <filter
                    id="filter0_d_15_286"
                    x="1.5"
                    y="3.5"
                    width="21"
                    height="19"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dy="1"></feOffset>
                    <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    ></feColorMatrix>
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_15_286"
                    ></feBlend>
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_15_286"
                        result="shape"
                    ></feBlend>
                </filter>
                <filter
                    id="filter1_d_15_286"
                    x="8.5"
                    y="11.5"
                    width="7"
                    height="7"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dy="1"></feOffset>
                    <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    ></feColorMatrix>
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_15_286"
                    ></feBlend>
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_15_286"
                        result="shape"
                    ></feBlend>
                </filter>
                <filter
                    id="filter2_d_15_286"
                    x="5.5"
                    y="1.5"
                    width="3"
                    height="6"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dy="1"></feOffset>
                    <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    ></feColorMatrix>
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_15_286"
                    ></feBlend>
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_15_286"
                        result="shape"
                    ></feBlend>
                </filter>
                <filter
                    id="filter3_d_15_286"
                    x="15.5"
                    y="1.5"
                    width="3"
                    height="6"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dy="1"></feOffset>
                    <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    ></feColorMatrix>
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_15_286"
                    ></feBlend>
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_15_286"
                        result="shape"
                    ></feBlend>
                </filter>
            </defs>
        </g>
    </svg>
`,ar=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M5 7.5H19L18 21H6L5 7.5Z"
                stroke="currentColor"
                stroke-linejoin="round"
            ></path>
            <path
                d="M15.5 9.5L15 19"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M12 9.5V19"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M8.5 9.5L9 19"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M16 5H19C20.1046 5 21 5.89543 21 7V7.5H3V7C3 5.89543 3.89543 5 5 5H8M16 5L15 3H9L8 5M16 5H8"
                stroke="currentColor"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,lr=v`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            <rect width="24" height="24" fill="none"></rect>
            <path
                d="M5 12V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V12"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M12 15L12 3M12 3L8 7M12 3L16 7"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </g>
    </svg>
`,cr=Object.freeze(Object.defineProperty({__proto__:null,misc:Zt,smoothieLineIcons:Object.freeze(Object.defineProperty({__proto__:null,bookmark:Nt,checkmark:Ft,chevronDown:Ae,chevronLeft:qt,close:it,documentNew:Wt,download:Yt,drag:Kt,menu:Xt,moreVertical:Jt,pen:Qt,plus:er,power:tr,printer:rr,refresh:ir,search:ot,settings:or,share:sr,today:nr,trash:ar,upload:lr},Symbol.toStringTag,{value:"Module"}))},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const be=globalThis,Ee=be.ShadowRoot&&(be.ShadyCSS===void 0||be.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ie=Symbol(),st=new WeakMap;let nt=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==Ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ee&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=st.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&st.set(t,e))}return e}toString(){return this.cssText}};const pr=i=>new nt(typeof i=="string"?i:i+"",void 0,Ie),f=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((o,r,s)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[s+1],i[0]);return new nt(t,i,Ie)},ur=(i,e)=>{if(Ee)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),r=be.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=t.cssText,i.appendChild(o)}},at=Ee?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return pr(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:hr,defineProperty:dr,getOwnPropertyDescriptor:gr,getOwnPropertyNames:fr,getOwnPropertySymbols:vr,getPrototypeOf:yr}=Object,P=globalThis,lt=P.trustedTypes,br=lt?lt.emptyScript:"",Re=P.reactiveElementPolyfillSupport,K=(i,e)=>i,me={toAttribute(i,e){switch(e){case Boolean:i=i?br:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},De=(i,e)=>!hr(i,e),ct={attribute:!0,type:String,converter:me,reflect:!1,hasChanged:De};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),P.litPropertyMetadata??(P.litPropertyMetadata=new WeakMap);class N extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ct){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,t);r!==void 0&&dr(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){const{get:r,set:s}=gr(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get(){return r==null?void 0:r.call(this)},set(n){const u=r==null?void 0:r.call(this);s.call(this,n),this.requestUpdate(e,u,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ct}static _$Ei(){if(this.hasOwnProperty(K("elementProperties")))return;const e=yr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(K("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(K("properties"))){const t=this.properties,o=[...fr(t),...vr(t)];for(const r of o)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,r]of t)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const r=this._$Eu(t,o);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)t.unshift(at(r))}else e!==void 0&&t.push(at(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ur(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EC(e,t){var s;const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===!0){const n=(((s=o.converter)==null?void 0:s.toAttribute)!==void 0?o.converter:me).toAttribute(t,o.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var s;const o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const n=o.getPropertyOptions(r),u=typeof n.converter=="function"?{fromAttribute:n.converter}:((s=n.converter)==null?void 0:s.fromAttribute)!==void 0?n.converter:me;this._$Em=r,this[r]=u.fromAttribute(t,n.type),this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){if(o??(o=this.constructor.getPropertyOptions(e)),!(o.hasChanged??De)(this[e],t))return;this.P(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,o){this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,n]of r)n.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],n)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(t)):this._$EU()}catch(r){throw e=!1,this._$EU(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var r;return(r=o.hostUpdated)==null?void 0:r.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[K("elementProperties")]=new Map,N[K("finalized")]=new Map,Re==null||Re({ReactiveElement:N}),(P.reactiveElementVersions??(P.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=globalThis,_e=X.trustedTypes,pt=_e?_e.createPolicy("lit-html",{createHTML:i=>i}):void 0,ut="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,ht="?"+O,mr=`<${ht}>`,E=document,J=()=>E.createComment(""),Q=i=>i===null||typeof i!="object"&&typeof i!="function",Be=Array.isArray,_r=i=>Be(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Ve=`[ 	
\f\r]`,ee=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,gt=/>/g,I=RegExp(`>|${Ve}(?:([^\\s"'>=/]+)(${Ve}*=${Ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,vt=/"/g,yt=/^(?:script|style|textarea|title)$/i,wr=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),g=wr(1),F=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),bt=new WeakMap,R=E.createTreeWalker(E,129);function mt(i,e){if(!Be(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(e):e}const Cr=(i,e)=>{const t=i.length-1,o=[];let r,s=e===2?"<svg>":e===3?"<math>":"",n=ee;for(let u=0;u<t;u++){const p=i[u];let y,b,c=-1,w=0;for(;w<p.length&&(n.lastIndex=w,b=n.exec(p),b!==null);)w=n.lastIndex,n===ee?b[1]==="!--"?n=dt:b[1]!==void 0?n=gt:b[2]!==void 0?(yt.test(b[2])&&(r=RegExp("</"+b[2],"g")),n=I):b[3]!==void 0&&(n=I):n===I?b[0]===">"?(n=r??ee,c=-1):b[1]===void 0?c=-2:(c=n.lastIndex-b[2].length,y=b[1],n=b[3]===void 0?I:b[3]==='"'?vt:ft):n===vt||n===ft?n=I:n===dt||n===gt?n=ee:(n=I,r=void 0);const _=n===I&&i[u+1].startsWith("/>")?" ":"";s+=n===ee?p+mr:c>=0?(o.push(y),p.slice(0,c)+ut+p.slice(c)+O+_):p+O+(c===-2?u:_)}return[mt(i,s+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class te{constructor({strings:e,_$litType$:t},o){let r;this.parts=[];let s=0,n=0;const u=e.length-1,p=this.parts,[y,b]=Cr(e,t);if(this.el=te.createElement(y,o),R.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=R.nextNode())!==null&&p.length<u;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(ut)){const w=b[n++],_=r.getAttribute(c).split(O),U=/([.?@])?(.*)/.exec(w);p.push({type:1,index:s,name:U[2],strings:_,ctor:U[1]==="."?xr:U[1]==="?"?Sr:U[1]==="@"?kr:we}),r.removeAttribute(c)}else c.startsWith(O)&&(p.push({type:6,index:s}),r.removeAttribute(c));if(yt.test(r.tagName)){const c=r.textContent.split(O),w=c.length-1;if(w>0){r.textContent=_e?_e.emptyScript:"";for(let _=0;_<w;_++)r.append(c[_],J()),R.nextNode(),p.push({type:2,index:++s});r.append(c[w],J())}}}else if(r.nodeType===8)if(r.data===ht)p.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(O,c+1))!==-1;)p.push({type:7,index:s}),c+=O.length-1}s++}}static createElement(e,t){const o=E.createElement("template");return o.innerHTML=e,o}}function q(i,e,t=i,o){var n,u;if(e===F)return e;let r=o!==void 0?(n=t._$Co)==null?void 0:n[o]:t._$Cl;const s=Q(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((u=r==null?void 0:r._$AO)==null||u.call(r,!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=r:t._$Cl=r),r!==void 0&&(e=q(i,r._$AS(i,e.values),r,o)),e}class $r{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,r=((e==null?void 0:e.creationScope)??E).importNode(t,!0);R.currentNode=r;let s=R.nextNode(),n=0,u=0,p=o[0];for(;p!==void 0;){if(n===p.index){let y;p.type===2?y=new re(s,s.nextSibling,this,e):p.type===1?y=new p.ctor(s,p.name,p.strings,this,e):p.type===6&&(y=new Lr(s,this,e)),this._$AV.push(y),p=o[++u]}n!==(p==null?void 0:p.index)&&(s=R.nextNode(),n++)}return R.currentNode=E,r}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class re{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,o,r){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=q(this,e,t),Q(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==F&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):_r(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&Q(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=te.createElement(mt(o.h,o.h[0]),this.options)),o);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(t);else{const n=new $r(r,this),u=n.u(this.options);n.p(t),this.T(u),this._$AH=n}}_$AC(e){let t=bt.get(e.strings);return t===void 0&&bt.set(e.strings,t=new te(e)),t}k(e){Be(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,r=0;for(const s of e)r===t.length?t.push(o=new re(this.O(J()),this.O(J()),this,this.options)):o=t[r],o._$AI(s),r++;r<t.length&&(this._$AR(o&&o._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class we{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,r,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=m}_$AI(e,t=this,o,r){const s=this.strings;let n=!1;if(s===void 0)e=q(this,e,t,0),n=!Q(e)||e!==this._$AH&&e!==F,n&&(this._$AH=e);else{const u=e;let p,y;for(e=s[0],p=0;p<s.length-1;p++)y=q(this,u[o+p],t,p),y===F&&(y=this._$AH[p]),n||(n=!Q(y)||y!==this._$AH[p]),y===m?e=m:e!==m&&(e+=(y??"")+s[p+1]),this._$AH[p]=y}n&&!r&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class xr extends we{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class Sr extends we{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class kr extends we{constructor(e,t,o,r,s){super(e,t,o,r,s),this.type=5}_$AI(e,t=this){if((e=q(this,e,t,0)??m)===F)return;const o=this._$AH,r=e===m&&o!==m||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==m&&(o===m||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Lr{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){q(this,e)}}const He=X.litHtmlPolyfillSupport;He==null||He(te,re),(X.litHtmlVersions??(X.litHtmlVersions=[])).push("3.2.1");const Pr=(i,e,t)=>{const o=(t==null?void 0:t.renderBefore)??e;let r=o._$litPart$;if(r===void 0){const s=(t==null?void 0:t.renderBefore)??null;o._$litPart$=r=new re(e.insertBefore(J(),s),s,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let h=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pr(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return F}};h._$litElement$=!0,h.finalized=!0,(Mt=globalThis.litElementHydrateSupport)==null||Mt.call(globalThis,{LitElement:h});const Ge=globalThis.litElementPolyfillSupport;Ge==null||Ge({LitElement:h}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const d=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Or={attribute:!0,type:String,converter:me,reflect:!1,hasChanged:De},Mr=(i=Or,e,t)=>{const{kind:o,metadata:r}=t;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),s.set(t.name,i),o==="accessor"){const{name:n}=t;return{set(u){const p=e.get.call(this);e.set.call(this,u),this.requestUpdate(n,p,i)},init(u){return u!==void 0&&this.P(n,void 0,i),u}}}if(o==="setter"){const{name:n}=t;return function(u){const p=this[n];e.call(this,u),this.requestUpdate(n,p,i)}}throw Error("Unsupported decorator location: "+o)};function a(i){return(e,t)=>typeof t=="object"?Mr(i,e,t):((o,r,s)=>{const n=r.hasOwnProperty(s);return r.constructor.createProperty(s,n?{...o,wrapped:!0}:o),n?Object.getOwnPropertyDescriptor(r,s):void 0})(i,e,t)}var jr=Object.defineProperty,Ur=Object.getOwnPropertyDescriptor,Te=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ur(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&jr(e,t,r),r};let ie=class extends h{constructor(){super(...arguments),this.variant="info",this.message="",this.role="button"}static get styles(){return f`
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
        `}render(){return g` <ui-text style="font-size: 0.9rem;">${this.message}</ui-text> `}firstUpdated(i){super.firstUpdated(i),this.addEventListener("click",()=>{this.parentElement&&this.parentElement.removeChild(this)})}};Te([a({type:String,attribute:"variant",reflect:!0})],ie.prototype,"variant",2),Te([a({type:String,attribute:"message"})],ie.prototype,"message",2),ie=Te([d("ui-alert")],ie);const Ar=ie;var Er=Object.defineProperty,Ir=Object.getOwnPropertyDescriptor,Rr=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ir(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Er(e,t,r),r};let ze=class extends h{static get styles(){return f`
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
        `}render(){return g`
            <ui-flex-grid class="container" gap="0.25rem">
                <slot></slot>
            </ui-flex-grid>
        `}addAlert(i){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".container");return e&&e.append(i),()=>this.removeAlert(i)}removeAlert(i){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".container");e&&e.removeChild(i)}};ze=Rr([d("ui-alerts")],ze);const Dr=ze;var Br=Object.defineProperty,Vr=Object.getOwnPropertyDescriptor,Ze=(i,e,t,o)=>{for(var r=o>1?void 0:o?Vr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Br(e,t,r),r};let oe=class extends h{constructor(){super(...arguments),this.position="top",this.fixed=!1}static get styles(){return f`
            * {
                box-sizing: border-box;
            }

            :host {
                display: flex;
                flex-direction: row;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-between;

                width: 100%;

                overflow: hidden;

                padding: calc(var(--ui-spacing) / 2);
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
        `}render(){return g`
            <ui-flex-grid-row part="container left" gap="0.25rem" align="center">
                <slot name="left"></slot>
            </ui-flex-grid-row>

            <ui-flex-grid-row
                part="container center"
                gap="0.25rem"
                style="overflow: hidden;"
                align="center"
            >
                <slot name="center"></slot>
            </ui-flex-grid-row>

            <ui-flex-grid-row part="container right" gap="0.25rem" align="center">
                <slot name="right"></slot>
            </ui-flex-grid-row>
        `}content(i){return[...this.querySelectorAll(`[slot="${i}"]`)]}contentName(i){return this.querySelector(`[name="${i}"]`)}};Ze([a({type:String,attribute:"position",reflect:!0})],oe.prototype,"position",2),Ze([a({type:Boolean,attribute:"fixed",reflect:!0})],oe.prototype,"fixed",2),oe=Ze([d("ui-app-bar")],oe);const Hr=oe;var Gr=Object.defineProperty,Tr=Object.getOwnPropertyDescriptor,Ne=(i,e,t,o)=>{for(var r=o>1?void 0:o?Tr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Gr(e,t,r),r};let se=class extends h{constructor(){super(...arguments),this.name="",this.hidden=!1}static get styles(){return f`
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
        `}render(){return g`<slot></slot>`}content(){return[...this.children]}contentAt(i=0){return this.children[i]}show(){this.hidden=!1}hide(){this.hidden=!0}};Ne([a({type:String,attribute:"name",reflect:!0})],se.prototype,"name",2),Ne([a({type:Boolean,attribute:"hidden",reflect:!0})],se.prototype,"hidden",2),se=Ne([d("ui-app-bar-item")],se);const zr=se;var Zr=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,ne=(i,e,t,o)=>{for(var r=o>1?void 0:o?Nr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Zr(e,t,r),r};let D=class extends h{constructor(){super(...arguments),this.disabled=!1,this.ripple=!1,this.role="button",this.rippleCleanUp=null}render(){return g`<slot></slot>`}attributeChangedCallback(i,e,t){switch(super.attributeChangedCallback(i,e,t),i){case"ripple":this.rippleCleanUp!==null&&(this.rippleCleanUp(),this.rippleCleanUp=null),t!==null&&(this.rippleCleanUp=ye(this));break}}};ne([a({type:String,attribute:"color",reflect:!0})],D.prototype,"color",2),ne([a({type:String,attribute:"variant",reflect:!0})],D.prototype,"variant",2),ne([a({type:Boolean,attribute:"disabled"})],D.prototype,"disabled",2),ne([a({type:Boolean,attribute:"ripple"})],D.prototype,"ripple",2),D=ne([d("ui-button")],D);const _t=D;var Fr=Object.defineProperty,qr=Object.getOwnPropertyDescriptor,ae=(i,e,t,o)=>{for(var r=o>1?void 0:o?qr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Fr(e,t,r),r};let B=class extends h{constructor(){super(...arguments),this.ghost=!1,this.disabled=!1,this.ripple=!1,this.role="button",this.rippleCleanUp=null}render(){return g`<slot></slot>`}attributeChangedCallback(i,e,t){switch(super.attributeChangedCallback(i,e,t),i){case"ripple":this.rippleCleanUp!==null&&(this.rippleCleanUp(),this.rippleCleanUp=null),t!==null&&(this.rippleCleanUp=ye(this));break}}};ae([a({type:String,attribute:"color",reflect:!0})],B.prototype,"color",2),ae([a({type:Boolean,attribute:"ghost"})],B.prototype,"ghost",2),ae([a({type:Boolean,attribute:"disabled"})],B.prototype,"disabled",2),ae([a({type:Boolean,attribute:"ripple"})],B.prototype,"ripple",2),B=ae([d("ui-icon-button")],B);const Wr=B;var Yr=Object.defineProperty,Kr=Object.getOwnPropertyDescriptor,V=(i,e,t,o)=>{for(var r=o>1?void 0:o?Kr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Yr(e,t,r),r};let S=class extends h{constructor(){super(...arguments),this.title="",this.fullscreen="",this.noFooter="",this.open=!1,this.modal=!1,this.inert=!1}static get styles(){return f`
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
                background-color: var(--ui-backdrop);
                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
            }

            :host([fullscreen]) dialog {
                width: 100%;
                height: 100%;
            }

            dialog > .container {
                background-color: var(--ui-bg);
                color: var(--ui-text);

                border: 1px solid var(--ui-borderColor);
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
        `}render(){return g`
            <dialog
                @cancel=${i=>{i.preventDefault()}}
            >
                <div class="container">
                    <div class="header">
                        <ui-heading level="4">${this.title}</ui-heading>

                        <ui-icon-button
                            style="width: var(--ui-dialog-header-height); height: 100%;"
                            ghost
                            @click=${()=>{this.close()}}
                        >
                            ${it}
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
        `}updated(i){this.open?this.show():this.close()}show(){this.open||(this.open=!0);const i=this.shadowRoot.querySelector("dialog");if(i===null)return;const e=i.inert;i.inert=this.inert,this.modal?i.showModal():i.show(),i.inert=e,this.dispatchEvent(new Event("open"))}close(){this.dispatchEvent(new Event("close")),this.shadowRoot.querySelector("dialog").close()}addDialogActionButton(i,e){const t=new l.UIFlexGridItem;t.flex=(e==null?void 0:e.flex)||1,t.slot="actions",this.appendChild(t);let o=new _t;return o.innerHTML=i,o.variant=e==null?void 0:e.variant,o.color=e==null?void 0:e.color,o.onclick=(e==null?void 0:e.onClick)||null,t.appendChild(o),o}};V([a({type:String,attribute:"title",reflect:!0})],S.prototype,"title",2),V([a({type:Boolean,attribute:"fullscreen",reflect:!0})],S.prototype,"fullscreen",2),V([a({type:Boolean,attribute:"no-footer",reflect:!0})],S.prototype,"noFooter",2),V([a({type:Boolean,attribute:"open",reflect:!0})],S.prototype,"open",2),V([a({type:Boolean,attribute:"modal",reflect:!0})],S.prototype,"modal",2),V([a({type:Boolean,attribute:"inert",reflect:!0})],S.prototype,"inert",2),S=V([d("ui-dialog")],S);const Xr=S;var Jr=Object.defineProperty,Qr=Object.getOwnPropertyDescriptor,le=(i,e,t,o)=>{for(var r=o>1?void 0:o?Qr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Jr(e,t,r),r};const ei="0";let H=class extends h{constructor(){super(...arguments),this.title="",this.gap=ei,this.open=!1,this.noFold=!1}static get styles(){return f`
            * {
                box-sizing: border-box;
            }

            ::selection {
                background-color: var(--ui-primary);
                color: var(--ui-primary-text);
            }

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
        `}render(){return g`
            <ui-flex-grid gap="${this.gap}">
                <ui-drawer-group-item
                    class="fold"
                    role="button"
                    @click=${async()=>{this.open=!this.open,setTimeout(()=>{this.open?this.dispatchEvent(new Event("unfold")):this.dispatchEvent(new Event("fold"))})}}
                >
                    <ui-flex-grid-row>
                        <ui-flex-grid-item align="center" style="padding-right: var(--ui-spacing);">
                            <ui-heading level="4">${this.title}</ui-heading>
                        </ui-flex-grid-item>

                        <ui-flex-grid-item class="icon" align="center" flex="0">
                            <ui-svg style="width: 2.5rem; height: 2.5rem;">
                                ${Ae}
                            </ui-svg>
                        </ui-flex-grid-item>
                    </ui-flex-grid-row>
                </ui-drawer-group-item>

                <slot></slot>
            </ui-flex-grid>
        `}};le([a({type:String,attribute:"title",reflect:!0})],H.prototype,"title",2),le([a({type:String,attribute:"gap"})],H.prototype,"gap",2),le([a({type:Boolean,attribute:"open",reflect:!0})],H.prototype,"open",2),le([a({type:Boolean,attribute:"no-fold",reflect:!0})],H.prototype,"noFold",2),H=le([d("ui-drawer-group")],H);const wt=H;var ti=Object.defineProperty,ri=Object.getOwnPropertyDescriptor,Fe=(i,e,t,o)=>{for(var r=o>1?void 0:o?ri(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&ti(e,t,r),r};let ce=class extends h{constructor(){super(...arguments),this.open=!1,this.role="button",this.handleUnfold=i=>{i.currentTarget.scrollIntoView(!0)}}static get styles(){return f`
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
        `}render(){return g`
            <aside
                @click=${i=>{i.stopPropagation()}}
            >
                <slot></slot>
            </aside>
        `}firstUpdated(i){this.classList.add("ui-backdrop-blur"),this.addEventListener("click",()=>{this.open=!1})}updated(i){[...this.children].forEach(async e=>{e instanceof wt&&e.addEventListener("unfold",this.handleUnfold)})}attributeChangedCallback(i,e,t){switch(super.attributeChangedCallback(i,e,t),i){case"width":t!==null?this.style.setProperty("--_width",t):this.style.removeProperty("--_width");break;case"open":t!==null?(history.pushState(null,"ui-drawer",location.href),this.dispatchEvent(new Event("open"))):this.dispatchEvent(new Event("close"));break}}};Fe([a({type:String,attribute:"width",reflect:!0})],ce.prototype,"width",2),Fe([a({type:Boolean,attribute:"open",reflect:!0})],ce.prototype,"open",2),ce=Fe([d("ui-drawer")],ce);const ii=ce;var oi=Object.defineProperty,si=Object.getOwnPropertyDescriptor,ni=(i,e,t,o)=>{for(var r=o>1?void 0:o?si(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&oi(e,t,r),r};let qe=class extends h{static get styles(){return f`
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
        `}render(){return g`<slot></slot>`}};qe=ni([d("ui-drawer-group-item")],qe);const ai=qe;var li=Object.defineProperty,ci=Object.getOwnPropertyDescriptor,pe=(i,e,t,o)=>{for(var r=o>1?void 0:o?ci(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&li(e,t,r),r};const Ct="0";let G=class extends h{constructor(){super(...arguments),this.gap=Ct}static get styles(){return f`
            :host {
                display: flex;
                flex-direction: column !important;
                flex-flow: column var(--_wrap, nowrap);
                justify-content: var(--_justify);
                align-items: var(--_align);

                position: relative;
                width: 100%;
                height: fit-content;
            }

            :host > ::slotted(*) {
                margin: var(--_gap, 0) 0 !important;
            }

            :host > ::slotted(*:first-child) {
                margin-top: 0 !important;
            }

            :host > ::slotted(*:last-child) {
                margin-bottom: 0 !important;
            }
        `}render(){return g`<slot></slot>`}attributeChangedCallback(i,e,t){switch(super.attributeChangedCallback(i,e,t),i){case"gap":t?this.style.setProperty("--_gap",t||Ct):this.style.removeProperty("--_gap");break;case"justify":t?this.style.setProperty("--_justify",t||""):this.style.removeProperty("--_justify");break;case"align":t?this.style.setProperty("--_align",t||""):this.style.removeProperty("--_align");break;case"wrap":t?this.style.setProperty("--_wrap",t||""):this.style.removeProperty("--_wrap");break}}};pe([a({type:String,attribute:"gap"})],G.prototype,"gap",2),pe([a({type:String,attribute:"justify"})],G.prototype,"justify",2),pe([a({type:String,attribute:"align"})],G.prototype,"align",2),pe([a({type:String,attribute:"wrap"})],G.prototype,"wrap",2),G=pe([d("ui-flex-grid")],G);const pi=G;var ui=Object.defineProperty,hi=Object.getOwnPropertyDescriptor,ue=(i,e,t,o)=>{for(var r=o>1?void 0:o?hi(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&ui(e,t,r),r};const We=1;l.UIFlexGridItem=class extends h{constructor(){super(...arguments),this.flex=We}static get styles(){return f`
            :host {
                flex: var(--_flex, ${We});
                display: flex;
                flex-direction: var(--_direction, row);
                justify-content: var(--_justify);
                align-items: var(--_align);
            }

            ::slotted(*) {
                flex-grow: 1;
            }
        `}render(){return g`<slot></slot>`}attributeChangedCallback(e,t,o){switch(super.attributeChangedCallback(e,t,o),e){case"flex":this.style.setProperty("--_flex",o||We.toString());break;case"direction":o?this.style.setProperty("--_direction",o):this.style.removeProperty("--_direction");break;case"justify":o?this.style.setProperty("--_justify",o):this.style.removeProperty("--_justify");break;case"align":o?this.style.setProperty("--_align",o):this.style.removeProperty("--_align");break}}},ue([a({type:Number,attribute:"flex"})],l.UIFlexGridItem.prototype,"flex",2),ue([a({type:String,attribute:"direction",reflect:!0})],l.UIFlexGridItem.prototype,"direction",2),ue([a({type:String,attribute:"justify"})],l.UIFlexGridItem.prototype,"justify",2),ue([a({type:String,attribute:"align"})],l.UIFlexGridItem.prototype,"align",2),l.UIFlexGridItem=ue([d("ui-flex-grid-item")],l.UIFlexGridItem);var di=Object.defineProperty,gi=Object.getOwnPropertyDescriptor,he=(i,e,t,o)=>{for(var r=o>1?void 0:o?gi(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&di(e,t,r),r};const $t="0";let T=class extends h{constructor(){super(...arguments),this.gap=$t}static get styles(){return f`
            :host {
                display: flex;
                flex-direction: row !important;
                flex-flow: row var(--_wrap, nowrap);
                justify-content: var(--_justify);
                align-items: var(--_align);

                width: 100%;
            }

            :host > ::slotted(*) {
                margin: 0 var(--_gap, 0) !important;
            }

            :host > ::slotted(*:first-child) {
                margin-left: 0 !important;
            }

            :host > ::slotted(*:last-child) {
                margin-right: 0 !important;
            }
        `}render(){return g`<slot></slot>`}attributeChangedCallback(i,e,t){switch(super.attributeChangedCallback(i,e,t),i){case"gap":t?this.style.setProperty("--_gap",t||$t):this.style.removeProperty("--_gap");break;case"justify":t?this.style.setProperty("--_justify",t||""):this.style.removeProperty("--_justify");break;case"align":t?this.style.setProperty("--_align",t||""):this.style.removeProperty("--_align");break;case"wrap":t?this.style.setProperty("--_wrap",t||""):this.style.removeProperty("--_wrap");break}}};he([a({type:String,attribute:"gap"})],T.prototype,"gap",2),he([a({type:String,attribute:"justify"})],T.prototype,"justify",2),he([a({type:String,attribute:"align"})],T.prototype,"align",2),he([a({type:String,attribute:"wrap"})],T.prototype,"wrap",2),T=he([d("ui-flex-grid-row")],T);const fi=T;var vi=Object.defineProperty,yi=Object.getOwnPropertyDescriptor,xt=(i,e,t,o)=>{for(var r=o>1?void 0:o?yi(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&vi(e,t,r),r};let Ce=class extends h{constructor(){super(...arguments),this.checked=!1,this.role="checkbox"}static get styles(){return f`
            :host {
                border-radius: var(--ui-radius);
            }

            input {
                display: inline-block;

                height: 1.5rem;
                width: 1.5rem;

                padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);

                border: 1px solid var(--ui-primary);
                border-radius: var(--ui-radius);

                accent-color: var(--ui-primary);
                color: var(--ui-text);
                background-color: transparent;

                box-shadow: none;
                outline: none;
                cursor: pointer;

                transition: border-color 0.25s linear;
            }

            input:disabled {
                cursor: default;
                user-select: none;
            }
        `}render(){return g`
            <input
                type="checkbox"
                ?checked=${this.checked}

                @input=${()=>{this.checked=!this.checked}}

                @change=${()=>{this.dispatchEvent(new Event("change",{}))}}
            ></input>
        `}click(){super.click(),this.shadowRoot.querySelector("input").checked=this.checked=!this.checked}};xt([a({type:Boolean,attribute:"checked",reflect:!0})],Ce.prototype,"checked",2),Ce=xt([d("ui-check")],Ce);const bi=Ce;var mi=Object.defineProperty,_i=Object.getOwnPropertyDescriptor,M=(i,e,t,o)=>{for(var r=o>1?void 0:o?_i(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&mi(e,t,r),r};let $=class extends h{constructor(){super(...arguments),this.title="",this.type="",this.value="",this.placeholder="",this.invalid=!1,this.min="",this.max="",this.role="input"}static get styles(){return f`
            * {
                box-sizing: border-box;
            }

            ::selection {
                background-color: var(--ui-primary);
                color: var(--ui-primary-text);
            }

            :host {
                display: block;

                position: relative;
                width: 100%;
                height: fit-content;

                border-radius: var(--ui-radius);
            }

            .container {
                width: 100%;

                border: 1px solid var(--ui-borderColor);
                border-radius: var(--ui-radius);

                transition: border-color 0.25s linear;
            }

            .container:has(input:focus) {
                border-color: var(--ui-primary);
            }

            :host([invalid]) .container {
                border-color: var(--ui-destructive);
            }

            ui-secondary.title {
                display: block;
                padding: 0 var(--ui-spacing);
                font-size: 0.85rem;
            }

            input {
                display: block;

                width: 100%;

                margin: 0;
                padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);

                accent-color: var(--ui-primary);
                background-color: transparent;
                color: var(--ui-input-text);

                outline: none;
                border: none;
                border-radius: inherit;

                font-size: 0.95rem;
                font-family: var(--ui-fontFamily);
                font-variation-settings:
                    "MONO" 1,
                    "CASL" var(--ui-casl),
                    "wght" 375,
                    "slnt" var(--ui-slnt),
                    "CRSV" var(--ui-crsv);
            }

            ui-secondary.title ~ input {
                padding-top: 0;
            }
        `}render(){return g`
            <div class="container">
                ${this.title?g` <ui-secondary class="title"> ${this.title} </ui-secondary> `:""}
                <input
                    type="${this.type}"
                    value="${this.value}"
                    placeholder="${this.placeholder}"
                    min="${this.min}"
                    max="${this.max}"
                    @input=${i=>{this.value=i.currentTarget.value}}
                    @change=${()=>{this.dispatchEvent(new Event("change"))}}
                />
            </div>
        `}focus(i){super.focus(i),this.shadowRoot.querySelector("input").focus(i)}blur(){super.blur(),this.shadowRoot.querySelector("input").blur()}click(){super.click(),this.focus()}};M([a({type:String,attribute:"title",reflect:!0})],$.prototype,"title",2),M([a({type:String,attribute:"type",reflect:!0})],$.prototype,"type",2),M([a({type:String,attribute:"value"})],$.prototype,"value",2),M([a({type:String,attribute:"placeholder",reflect:!0})],$.prototype,"placeholder",2),M([a({type:Boolean,attribute:"invalid",reflect:!0})],$.prototype,"invalid",2),M([a({type:String,attribute:"min",reflect:!0})],$.prototype,"min",2),M([a({type:String,attribute:"max",reflect:!0})],$.prototype,"max",2),$=M([d("ui-input")],$);const wi=$;var Ci=Object.defineProperty,$i=Object.getOwnPropertyDescriptor,k=(i,e,t,o)=>{for(var r=o>1?void 0:o?$i(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Ci(e,t,r),r};let C=class extends h{constructor(){super(...arguments),this.title="",this.value="",this.placeholder="",this.invalid=!1,this.noSubmit=!1,this.storage=!1,this.storagePrefix="",this.storageKey="",this.role="search"}static get styles(){return f`
            * {
                box-sizing: border-box;
            }

            ::selection {
                background-color: var(--ui-primary));
                color: var(--ui-primary-text);
            }

            :host {
                display: block;

                position: relative;
                width: 100%;
                height: fit-content;
            }

            .container {
                position: relative;
                width: 100%;

                border: none;
                border: 1px solid var(--ui-borderColor);
                border-radius: var(--ui-radius);

                transition: border-color 0.25s linear;

                background-color: var(--ui-backdrop);
                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
            }

            .container:has(input:focus) {
                border-color: var(--ui-primary);
            }

            :host([invalid]) .container {
                border-color: var(--ui-destructive);
            }

            ui-secondary.title {
                display: block;
                margin-right: 2.5rem;
                padding: 0 var(--ui-spacing);
                font-size: 0.85rem;
            }

            input {
                display: block;

                width: 100%;

                margin: 0;
                padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);

                accent-color: var(--ui-primary);
                background-color: transparent;
                color: var(--ui-input-text);

                outline: none;
                border: none;
                border-radius: inherit;

                font-size: 0.9rem;
                font-family: var(--ui-fontFamily);
                font-variation-settings:
                    "MONO" 1,
                    "CASL" var(--ui-casl),
                    "wght" 375,
                    "slnt" var(--ui-slnt),
                    "CRSV" var(--ui-crsv);
            }

            ui-secondary.title ~ input {
                padding-top: 0;
            }

            :host(:not([no-submit])) input {
                width: calc(100% - 2rem);
            }

            ui-icon-button {
                position: absolute;
                top: 0;
                right: 0;
                height: 100%;

                display: flex;
                justify-content: center;
                align-items: center;

                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            :host([no-submit]) ui-icon-button {
                display: none;
            }
        `}render(){return g`
            <div class="container">
                ${this.title?g`<ui-secondary class="title"> ${this.title} </ui-secondary>`:""}

                <input
                    name="search"
                    type="search"
                    value="${this.value}"
                    @keydown=${i=>{var e,t;this.noSubmit||i.key!=="Enter"||(t=(e=this.shadowRoot)==null?void 0:e.querySelector('ui-icon-button[name="submit"]'))==null||t.click()}}
                    @input=${i=>{this.value=i.currentTarget.value,this.storage&&localStorage.setItem(this.storagePrefix+this.storageKey,this.value),this.noSubmit&&this.dispatchEvent(new Event("change"))}}
                />

                <ui-icon-button
                    name="submit"
                    for="search"
                    ghost
                    ripple
                    @click=${()=>{this.dispatchEvent(new Event("change"))}}
                >
                    ${ot}
                </ui-icon-button>
            </div>
        `}firstUpdated(i){if(super.firstUpdated(i),this.storage){const e=localStorage.getItem(this.storagePrefix+this.storageKey)||this.value;this.value=e,this.dispatchEvent(new Event("storage"))}}focus(i){super.focus(i),this.shadowRoot.querySelector("input").focus(i)}blur(){super.blur(),this.shadowRoot.querySelector("input").blur()}click(){super.click(),this.focus()}};k([a({type:String,attribute:"title",reflect:!0})],C.prototype,"title",2),k([a({type:String,attribute:"value"})],C.prototype,"value",2),k([a({type:String,attribute:"placeholder",reflect:!0})],C.prototype,"placeholder",2),k([a({type:Boolean,attribute:"invalid",reflect:!0})],C.prototype,"invalid",2),k([a({type:Boolean,attribute:"no-submit",reflect:!0})],C.prototype,"noSubmit",2),k([a({type:Boolean,attribute:"storage",reflect:!0})],C.prototype,"storage",2),k([a({type:String,attribute:"storage-prefix",reflect:!0})],C.prototype,"storagePrefix",2),k([a({type:String,attribute:"storage-key",reflect:!0})],C.prototype,"storageKey",2),C=k([d("ui-search")],C);const xi=C;var Si=Object.defineProperty,ki=Object.getOwnPropertyDescriptor,Ye=(i,e,t,o)=>{for(var r=o>1?void 0:o?ki(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Si(e,t,r),r};let de=class extends h{constructor(){super(...arguments),this.open=!1,this.keepOpen=!1}static get styles(){return f`
            * {
                box-sizing: border-box;
            }

            :host {
                --_lineHeight: 1.25;
                line-height: var(--_lineHeight) !important;

                position: relative;
                display: block;

                width: 100%;
                height: calc(1em * var(--_lineHeight) + var(--ui-spacing) * 2);
                transition: height 0.25s ease;

                background-color: transparent;

                border: 1px solid var(--ui-borderColor);
                border-radius: var(--ui-radius);

                overflow: hidden;

                font-size: 0.9rem;
                font-family: var(--ui-fontFamily);
                font-variation-settings:
                    "MONO" 1,
                    "CASL" var(--ui-casl),
                    "wght" 375,
                    "slnt" var(--ui-slnt),
                    "CRSV" var(--ui-crsv);
            }

            :host([open]),
            :host([keep-open]) {
                height: calc((1em * var(--_lineHeight) + var(--ui-spacing) * 2) * var(--_items));
            }

            :host(:not([open])) .options:has(> ::slotted(ui-select-option[selected])),
            :host(:not([keep-open])) .options:has(> ::slotted(ui-select-option[selected])) {
                display: block;
            }

            .options {
                cursor: pointer;
                display: none;
                display: flex;
                flex-direction: column;
                min-height: 100%;
            }

            :host([open]) .options,
            :host([keep-open]) .options {
                display: block;
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
                padding: 0.25rem;
                color: var(--ui-primary);
            }

            .icon > * {
                width: 2rem;
                height: 2rem;
            }

            :host([open]) .icon,
            :host([keep-open]) .icon {
                display: none;
            }

            ::slotted(ui-select-option) {
                display: flex;
            }

            :host([open]) ::slotted(ui-select-option[selected]),
            :host([keep-open]) ::slotted(ui-select-option[selected]) {
                background-color: var(--ui-primary);
                color: var(--ui-primary-text);
            }

            /* NOTE: Removed hover bg color in v2.0.0
            :host([open]) ::slotted(ui-select-option:not([selected]):hover),
            :host([keep-open]) ::slotted(ui-select-option:not([selected]):hover) {
                background-color: hsla(var(--ui-hsl-text), 0.1);
            }
            */

            :host(:not([open], [keep-open])) ::slotted(ui-select-option:not([selected])) {
                display: none;
            }
        `}render(){!this.open&&!this.keepOpen?this.role="button":this.role=null;const i=this.optionsClickHandler.bind(this);return g`
            <div
                class="options"
                @click=${async e=>{if(this.keepOpen)return await i(e);this.open=!this.open,this.open?(e.stopPropagation(),this.addEventListener("click",i)):this.removeEventListener("click",i)}}
            >
                <div class="icon">
                    <ui-svg>${Ae}</ui-svg>
                </div>

                <slot></slot>
            </div>
        `}updated(i){this.style.setProperty("--_items",`${this.children.length}`)}async optionsClickHandler(i){i.composedPath().forEach(e=>{e instanceof l.UISelectOption&&([...this.querySelectorAll("ui-select-option")].forEach(t=>t.removeAttribute("selected")),e.setAttribute("selected",""),this.dispatchEvent(new Event("change")))})}options(){return[...this.children].filter(i=>i instanceof l.UISelectOption)}selected(){return this.options().find(i=>i.selected)||null}click(){super.click(),this.shadowRoot.querySelector("div.options").click()}};Ye([a({type:Boolean,attribute:"open",reflect:!0})],de.prototype,"open",2),Ye([a({type:Boolean,attribute:"keep-open",reflect:!0})],de.prototype,"keepOpen",2),de=Ye([d("ui-select")],de);const Li=de;var Pi=Object.defineProperty,Oi=Object.getOwnPropertyDescriptor,Ke=(i,e,t,o)=>{for(var r=o>1?void 0:o?Oi(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Pi(e,t,r),r};l.UISelectOption=class extends h{constructor(){super(...arguments),this.value="",this.selected=!1,this.role="button"}static get styles(){return f`
            :host {
                --_lineHeight: var(--_lineHeight, 1.25);
                line-height: var(--_lineHeight) !important;

                display: none;
                align-items: center;

                padding: var(--ui-spacing);
                padding-right: 2.5rem;

                height: calc(1em * var(--_lineHeight) + var(--ui-spacing) * 2);

                color: var(--ui-input-text);

                font-variation-settings:
                    "MONO" 1,
                    "CASL" var(--ui-casl),
                    "wght" 375,
                    "slnt" var(--ui-slnt),
                    "CRSV" var(--ui-crsv);

                white-space: nowrap;
                text-overflow: ellipsis;

                overflow: hidden;

                transition:
                    background-color 0.25s linear,
                    color 0.25s linear;
            }
        `}render(){return g`<slot></slot>`}},Ke([a({type:String,attribute:"value",reflect:!0})],l.UISelectOption.prototype,"value",2),Ke([a({type:Boolean,attribute:"selected",reflect:!0})],l.UISelectOption.prototype,"selected",2),l.UISelectOption=Ke([d("ui-select-option")],l.UISelectOption);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St=i=>i??m;var Mi=Object.defineProperty,ji=Object.getOwnPropertyDescriptor,z=(i,e,t,o)=>{for(var r=o>1?void 0:o?ji(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Mi(e,t,r),r};let L=class extends h{constructor(){super(...arguments),this.title="",this.value="",this.placeholder="",this.invalid=!1,this.role="textbox"}static get styles(){return f`
            * {
                box-sizing: border-box;
            }

            ::selection {
                background-color: var(--ui-primary);
                color: var(--ui-primary-text);
            }

            :host {
                display: block;
                position: relative;
                width: 100%;
                height: fit-content;
            }

            .container {
                width: 100%;
                height: 100%;
                border: none;
                border: 1px solid var(--ui-borderColor);
                border-radius: var(--ui-radius);
                transition: border-color 0.25s linear;
            }

            .container:has(textarea:focus) {
                border-color: var(--ui-primary);
            }

            :host([invalid]) .container {
                border-color: var(--ui-destructive);
            }

            ui-secondary.title {
                display: block;
                padding: 0 var(--ui-spacing);
                user-select: none;
                transform: translateY(calc(var(--ui-spacing) / 2));
            }

            textarea {
                resize: none;
                width: 100%;
                display: block;
                margin: 0;
                padding: var(--ui-spacing) calc(var(--ui-spacing) * 2);
                border: none;
                border-radius: inherit;
                outline: none;

                font-size: 0.9rem;
                font-family: var(--ui-fontFamily);
                font-variation-settings:
                    "MONO" 1,
                    "CASL" var(--ui-casl),
                    "wght" 375,
                    "slnt" var(--ui-slnt),
                    "CRSV" var(--ui-crsv);

                accent-color: var(--ui-primary);
                background-color: transparent;
                color: var(--ui-input-text);
            }
        `}render(){return g`
            <div class="container">
                ${this.title?g` <ui-secondary class="title"> ${this.title} </ui-secondary> `:""}

                <textarea
                    placeholder=${this.placeholder}
                    .value=${this.value}
                    rows=${St(this.rows)}
                    cols=${St(this.cols)}
                    @input=${i=>{this.value=i.currentTarget.value}}
                    @change=${()=>{this.dispatchEvent(new Event("change"))}}
                ></textarea>
            </div>
        `}focus(i){super.focus(i),this.shadowRoot.querySelector("textarea").focus(i)}blur(){super.blur(),this.shadowRoot.querySelector("textarea").blur()}click(){super.click(),this.focus()}};z([a({type:String,attribute:"title",reflect:!0})],L.prototype,"title",2),z([a({type:String,attribute:"value"})],L.prototype,"value",2),z([a({type:String,attribute:"placeholder",reflect:!0})],L.prototype,"placeholder",2),z([a({type:Boolean,attribute:"invalid",reflect:!0})],L.prototype,"invalid",2),z([a({type:Number,attribute:"rows",reflect:!0})],L.prototype,"rows",2),z([a({type:Number,attribute:"cols",reflect:!0})],L.prototype,"cols",2),L=z([d("ui-textarea")],L);const Ui=L;var Ai=Object.defineProperty,Ei=Object.getOwnPropertyDescriptor,$e=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ei(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Ai(e,t,r),r};let W=class extends h{constructor(){super(...arguments),this.name="",this.href="",this.fallback=!1}static get styles(){return f`
            :host {
                display: none;
            }
        `}};$e([a({type:String,attribute:"name",reflect:!0})],W.prototype,"name",2),$e([a({type:String,attribute:"href",reflect:!0})],W.prototype,"href",2),$e([a({type:Boolean,attribute:"fallback",reflect:!0})],W.prototype,"fallback",2),W=$e([d("ui-lang-type")],W);const Ii=W;var Ri=Object.defineProperty,Di=Object.getOwnPropertyDescriptor,kt=(i,e,t,o)=>{for(var r=o>1?void 0:o?Di(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Ri(e,t,r),r};let xe=class extends h{constructor(){super(...arguments),this.data={},this.events=new ve,this.current=""}static get styles(){return f`
            :host {
                display: none;
            }
        `}render(){return g`<slot></slot>`}attributeChangedCallback(i,e,t){switch(super.attributeChangedCallback(i,e,t),i){case"current":this.setCurrent(t||"");break}}fallback(){return this.querySelector("ui-lang-type[fallback]")}get(i,e){var t,o;return((o=(t=this.data)==null?void 0:t[i])==null?void 0:o[e])||null}async setCurrent(i){const e=(i!==""?this.querySelector(`ui-lang-type[name="${i}"]`):this.fallback())||this.fallback();if(e){if(!e.href)throw"Missing href attribute!";try{this.data=await(await fetch(e.href)).json()}catch(t){console.error(t)}this.events.dispatch("change",e)}}};kt([a({type:String,attribute:"current",reflect:!0})],xe.prototype,"current",2),xe=kt([d("ui-lang")],xe);const Bi=xe;var Vi=Object.defineProperty,Hi=Object.getOwnPropertyDescriptor,Lt=(i,e,t,o)=>{for(var r=o>1?void 0:o?Hi(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Vi(e,t,r),r};let Se=class extends h{constructor(){super(...arguments),this.nobg=!1}static get styles(){return f`
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
        `}render(){return g`
            <div class="background"></div>
            <div class="spinner"></div>
        `}};Lt([a({type:Boolean,attribute:"nobg",reflect:!0})],Se.prototype,"nobg",2),Se=Lt([d("ui-spinner")],Se);const Gi=Se;var Ti=Object.defineProperty,zi=Object.getOwnPropertyDescriptor,Zi=(i,e,t,o)=>{for(var r=o>1?void 0:o?zi(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Ti(e,t,r),r};let Xe=class extends h{constructor(){super(...arguments),this.events=new ve,this.stack=[],this.onpopstate=()=>{if(this.stack.length===0){this.dispatchChangeEvent(null);return}const i=this.removeChild(this.stack.pop());this.stack.length>0&&(this.stack[this.stack.length-1].parentElement||this.appendChild(this.stack[this.stack.length-1])),this.dispatchChangeEvent(i)},this.pages={},this.lockNavigation=!1}static get styles(){return f`
            :host {
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
            }
        `}render(){return g`<slot></slot>`}connectedCallback(){super.connectedCallback(),window.addEventListener("popstate",this.onpopstate)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.onpopstate)}stackSize(){return this.stack.length}clearStack(){for(;this.stack.length>0;)this.removeChild(this.stack.pop());this.dispatchChangeEvent(null)}goBack(){this.stack.length===0||this.lockNavigation||history.back()}registerPage(i,e){this.pages[i]=e}unregisterPage(i){delete this.pages[i]}async setPage(i,e=null,t=!1){var s;if(this.lockNavigation)return;if(!(i in this.pages))throw new Error(`page "${i}" not found`);const o=await this.pages[i]();this.stack.push(this.appendChild(o)),typeof e=="function"&&e(o);let r=null;this.stack.length>1&&!t&&(r=this.stack[this.stack.length-2],(s=r.parentElement)==null||s.removeChild(r)),this.dispatchChangeEvent(r),this.onpopstate!==null&&history.pushState(null,document.title,location.href)}async dispatchChangeEvent(i){this.events.dispatch("change",{old:i||this.stack[this.stack.length-2]||null,current:this.stack[this.stack.length-1]||null})}};Xe=Zi([d("ui-stack-layout")],Xe);const Ni=Xe;var Fi=Object.defineProperty,qi=Object.getOwnPropertyDescriptor,Pt=(i,e,t,o)=>{for(var r=o>1?void 0:o?qi(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Fi(e,t,r),r};let ke=class extends h{constructor(){super(...arguments),this.name=""}static get styles(){return f`
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
        `}render(){return g`<slot></slot>`}};Pt([a({type:String,attribute:"name",reflect:!0})],ke.prototype,"name",2),ke=Pt([d("ui-stack-layout-page")],ke);const Wi=ke;var Yi=Object.defineProperty,Ki=Object.getOwnPropertyDescriptor,Je=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ki(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Yi(e,t,r),r};let ge=class extends h{constructor(){super(...arguments),this.data={},this.events=new ve,this.storage=!1,this.storagePrefix=""}static get styles(){return f`
            :host {
                display: none;
            }
        `}getData(i){if(this.storage){const e=localStorage.getItem(`${this.storagePrefix}${i}`);if(e!==null)return JSON.parse(e)}if(this.data.hasOwnProperty(i))return this.data[i]}setData(i,e,t=!1){if(t&&this.storage){const o=localStorage.getItem(`${this.storagePrefix}${i}`);o!==null?this.data[i]=JSON.parse(o):this.data.hasOwnProperty(i)||(this.data[i]=e)}else this.data[i]=e;this.storage&&localStorage.setItem(`${this.storagePrefix}${i}`,JSON.stringify(this.data[i])),this.events.dispatch(i,this.data[i])}updateData(i,e){const t=this.getData(i);if(t===void 0)throw new Error(`"${i}" not found, use \`setData\``);this.setData(i,e(t))}addListener(i,e,t=!1){if(t){const o=this.getData(i);o!==void 0&&setTimeout(()=>e(o))}return this.events.addListener(i,e)}};Je([a({type:Boolean,attribute:"storage",reflect:!0})],ge.prototype,"storage",2),Je([a({type:String,attribute:"storage-prefix",reflect:!0})],ge.prototype,"storagePrefix",2),ge=Je([d("ui-store")],ge);const Xi=ge;var Ji=Object.defineProperty,Qi=Object.getOwnPropertyDescriptor,eo=(i,e,t,o)=>{for(var r=o>1?void 0:o?Qi(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Ji(e,t,r),r};let Qe=class extends h{static get styles(){return f`
            :host {
                display: inline-block;
                color: inherit;
            }

            ::slotted(*) {
                width: 100%;
                height: 100%;
            }
        `}render(){return g` <slot></slot> `}};Qe=eo([d("ui-svg")],Qe);const to=Qe;var ro=Object.defineProperty,io=Object.getOwnPropertyDescriptor,j=(i,e,t,o)=>{for(var r=o>1?void 0:o?io(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&ro(e,t,r),r};let x=class extends h{constructor(){super(...arguments),this.family="var(--ui-fontFamily)",this.size="var(--ui-fontSize)",this.mono=0,this.casl=1,this.wght=400,this.slnt=0,this.crsv=.5}static get styles(){return f`
            :host {
                display: inline-block;

                width: fit-content;
                max-width: 100%;
                overflow-wrap: break-word;

                font-family: var(--_family) !important;
                font-size: var(--_size) !important;
                font-variation-settings:
                    "MONO" var(--_mono),
                    "CASL" var(--_casl),
                    "wght" var(--_wght),
                    "slnt" var(--_slnt),
                    "CRSV" var(--_crsv) !important;
            }
        `}render(){return this.style.setProperty("--_family",this.family),this.style.setProperty("--_size",this.size),this.style.setProperty("--_mono",this.mono.toString()),this.style.setProperty("--_casl",this.casl.toString()),this.style.setProperty("--_wght",this.wght.toString()),this.style.setProperty("--_slnt",this.slnt.toString()),this.style.setProperty("--_crsv",this.crsv.toString()),g`<slot></slot>`}};j([a({type:String,attribute:"family",reflect:!0})],x.prototype,"family",2),j([a({type:String,attribute:"size",reflect:!0})],x.prototype,"size",2),j([a({type:Number,attribute:"mono",reflect:!0})],x.prototype,"mono",2),j([a({type:Number,attribute:"casl",reflect:!0})],x.prototype,"casl",2),j([a({type:Number,attribute:"wght",reflect:!0})],x.prototype,"wght",2),j([a({type:Number,attribute:"slnt",reflect:!0})],x.prototype,"slnt",2),j([a({type:Number,attribute:"crsv",reflect:!0})],x.prototype,"crsv",2),x=j([d("ui-text")],x);const Le=x;var oo=Object.defineProperty,so=Object.getOwnPropertyDescriptor,Ot=(i,e,t,o)=>{for(var r=o>1?void 0:o?so(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&oo(e,t,r),r};let Pe=class extends Le{constructor(){super(...arguments),this.mono=.25,this.casl=1,this.wght=750,this.slnt=0}render(){switch(this.level){case 6:this.size="0.75rem";break;case 5:this.size="1rem";break;case 4:this.size="1.25rem";break;case 3:this.size="1.5rem";break;case 2:this.size="1.75rem";break;case 1:this.size="2rem";break}return super.render()}};Ot([a({type:Number,attribute:"level",reflect:!0})],Pe.prototype,"level",2),Pe=Ot([d("ui-heading")],Pe);const no=Pe;var ao=Object.defineProperty,lo=Object.getOwnPropertyDescriptor,Oe=(i,e,t,o)=>{for(var r=o>1?void 0:o?lo(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&ao(e,t,r),r};let Y=class extends h{constructor(){super(...arguments),this.rippleCleanUp=null,this.clickHandler=async i=>{if(!i.currentTarget)return;[...i.currentTarget.children].forEach(t=>{t.click()})},this.childClickHandler=async i=>{i.stopPropagation()},this.ripple=!1}static get styles(){return f`
            * {
                box-sizing: border-box;
            }

            ::selection {
                background-color: var(--ui-primary);
                color: var(--ui-primary-text);
            }

            :host {
                display: block;
            }

            :host > div {
                display: flex;
                flex-direction: row;

                position: relative;
                width: 100%;

                padding: var(--ui-spacing);

                border-radius: var(--ui-radius);
            }

            :host > div > span:nth-child(1) {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;

                margin-right: var(--ui-spacing);
            }

            :host > div > span:nth-child(2) {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
            }
        `}render(){return g`
            <div>
                <span>
                    ${this.primary?g`<ui-primary>${this.primary}</ui-primary>`:""}
                    ${this.secondary?g`<ui-secondary>${this.secondary}</ui-secondary>`:""}
                </span>

                <span>
                    <slot></slot>
                </span>
            </div>
        `}firstUpdated(i){super.firstUpdated(i),this.ripple?this.enableRipple():this.disableRipple()}attributeChangedCallback(i,e,t){switch(super.attributeChangedCallback(i,e,t),i){case"ripple":this.ripple?this.enableRipple():this.disableRipple()}}async enableRipple(){var e;if(this.rippleCleanUp)return;const i=(e=this.shadowRoot)==null?void 0:e.querySelector("div");i&&(this.rippleCleanUp=ye(i),this.role="button",this.style.cursor="pointer",this.addEventListener("click",this.clickHandler),[...this.children].forEach(t=>{t.addEventListener("click",this.childClickHandler)}))}async disableRipple(){this.rippleCleanUp&&(this.style.cursor="default",this.role=null,this.rippleCleanUp(),this.rippleCleanUp=null,this.removeEventListener("click",this.clickHandler),[...this.children].forEach(i=>{i.removeEventListener("click",this.childClickHandler)}))}};Oe([a({type:String,attribute:"primary",reflect:!0})],Y.prototype,"primary",2),Oe([a({type:String,attribute:"secondary",reflect:!0})],Y.prototype,"secondary",2),Oe([a({type:Boolean,attribute:"ripple",reflect:!0})],Y.prototype,"ripple",2),Y=Oe([d("ui-label")],Y);const co=Y;var po=Object.defineProperty,uo=Object.getOwnPropertyDescriptor,ho=(i,e,t,o)=>{for(var r=o>1?void 0:o?uo(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&po(e,t,r),r};let et=class extends Le{constructor(){super(...arguments),this.size="1.1rem",this.wght=425}};et=ho([d("ui-primary")],et);const go=et;var fo=Object.defineProperty,vo=Object.getOwnPropertyDescriptor,yo=(i,e,t,o)=>{for(var r=o>1?void 0:o?vo(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&fo(e,t,r),r};let tt=class extends Le{constructor(){super(...arguments),this.size="0.9rem",this.wght=350,this.slnt=-15}};tt=yo([d("ui-secondary")],tt);const bo=tt;var mo=Object.defineProperty,_o=Object.getOwnPropertyDescriptor,fe=(i,e,t,o)=>{for(var r=o>1?void 0:o?_o(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&mo(e,t,r),r};let Z=class extends h{constructor(){super(...arguments),this.themesPath="themes",this.media=null}get target(){return document.body}get mediaHandler(){return i=>{i.matches?this.target.setAttribute("data-theme","dark"):this.target.setAttribute("data-theme","light")}}static get styles(){return f`
            :host {
                display: none;
            }
        `}attributeChangedCallback(i,e,t){switch(super.attributeChangedCallback(i,e,t),i){case"auto":this.handleAuto();break;case"mode":this.handleMode();break;case"theme":this.handleTheme();break}}handleAuto(){if(!this.auto){if(console.debug("[ui][ui-theme-handler] Disable auto mode"),!this.media)return;this.media.removeEventListener("change",this.mediaHandler),this.media=null;return}if(this.mode=null,console.debug("[ui][ui-theme-handler] Enable auto mode"),this.media){this.mediaHandler(this.media);return}this.media=window.matchMedia("(prefers-color-scheme: dark)"),this.media.addEventListener("change",this.mediaHandler),this.mediaHandler(this.media)}handleMode(){console.debug(`[ui][ui-theme-handler] Set mode ${this.mode}`),this.mode?this.target.setAttribute("data-theme",this.mode):this.target.removeAttribute("data-theme")}handleTheme(){const i=document.head;console.debug(`[ui][ui-theme-handler] Load theme from "${this.themesPath}/${this.theme}"`),i.querySelectorAll("link.theme").forEach(t=>{i.removeChild(t)});const e=document.createElement("link");e.classList.add("theme"),e.rel="stylesheet",e.href=`${this.themesPath}/${this.theme}.css`,i.appendChild(e)}};fe([a({type:Boolean,attribute:"auto",reflect:!0})],Z.prototype,"auto",2),fe([a({type:String,attribute:"mode",reflect:!0})],Z.prototype,"mode",2),fe([a({type:String,attribute:"theme",reflect:!0})],Z.prototype,"theme",2),fe([a({type:String,attribute:"themes-path",reflect:!0})],Z.prototype,"themesPath",2),Z=fe([d("ui-theme-handler")],Z);const wo=Z;l.CleanUp=At,l.Events=ve,l.UIAlert=Ar,l.UIAlerts=Dr,l.UIAppBar=Hr,l.UIAppBarItem=zr,l.UIButton=_t,l.UICheck=bi,l.UIDialog=Xr,l.UIDrawer=ii,l.UIDrawerGroup=wt,l.UIDrawerGroupItem=ai,l.UIFlexGrid=pi,l.UIFlexGridRow=fi,l.UIHeading=no,l.UIIconButton=Wr,l.UIInput=wi,l.UILabel=co,l.UILang=Bi,l.UILangType=Ii,l.UIPrimary=go,l.UISearch=xi,l.UISecondary=bo,l.UISelect=Li,l.UISpinner=Gi,l.UIStackLayout=Ni,l.UIStackLayoutPage=Wi,l.UIStore=Xi,l.UISvg=to,l.UIText=Le,l.UITextarea=Ui,l.UIThemeHandler=wo,l.css=Ht,l.draggable=Bt,l.globalStylesToShadowRoot=Ut,l.html=v,l.isAndroid=Gt,l.ripple=Vt,l.styles=Tt,l.svg=cr,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
