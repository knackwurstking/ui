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

<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M13 3L16 6L19 9M13 3L5 3L5 21L19 21L19 9M13 3L13 9L19 9" stroke="currentColor" stroke-linejoin="round"></path> </g></svg>
`;

export class SvgDocumentNew extends HTMLElement {

    static register = () => {
        if (!customElements.get("svg-document-new")) {
            customElements.define("svg-document-new", SvgDocumentNew);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;
    }
}
