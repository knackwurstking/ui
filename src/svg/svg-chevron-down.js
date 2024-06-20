import { html } from "../js";

const content = html`
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
`;

export class SvgChevronDown extends HTMLElement {

    static register = () => {
        if (!customElements.get("svg-chevron-down")) {
            customElements.define("svg-chevron-down", SvgChevronDown);
        }
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = content;
    }
}
