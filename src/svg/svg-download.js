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

    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M5 12V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 3L12 15M12 15L16 11M12 15L8 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
`;

export class SvgDownload extends HTMLElement {

    static register = () => {
        if (!customElements.get("svg-download")) {
            customElements.define("svg-download", SvgDownload);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;
    }
}
