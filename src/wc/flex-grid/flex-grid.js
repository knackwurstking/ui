const template = document.createElement("template");

template.innerHTML = `
<style>
    :host {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-flow: column nowrap;
    }
</style>

<slot></slot>
`;

export class FlexGrid extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        this.style.setProperty("--gap", this.getAttribute("gap") || "0");
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        // ...
    }
}
