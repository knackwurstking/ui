const template = document.createElement("template");
template.innerHTML = `
<style>
    :host {
        --row-gap: var(--gap, 0);
        margin: var(--gap, 0) 0;
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
    }

    :host(:first-child) {
        margin-top: 0;
    }

    :host(:last-child) {
        margin-bottom: 0;
    }
</style>

<slot></slot>
`;

export class FlexGridRow extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        this.style.setProperty("--row-gap", this.getAttribute("gap") || "0");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        // ...
    }
}
