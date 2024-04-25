const template = document.createElement("template");
template.innerHTML = `
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

export class ChevronDown extends HTMLElement {

    static register = () => customElements.define("ui-svg-chevron-down", ChevronDown);

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
