import { html } from "../js";

// NOTE: Smoothie Line Icons
const content = html`
    <style>
        :host {
            width: 100%;
            height: 100%;
            color: inherit;
        }
    </style>


    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M12 6V18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 12H18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
`;

export class SvgPlus extends HTMLElement {

    static register = () => {
        if (!customElements.get("svg-plus")) {
            customElements.define("svg-plus", SvgPlus);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;
    }
}
