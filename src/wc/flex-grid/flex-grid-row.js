const template = document.createElement("template");
template.innerHTML = `
<style>
    :host {
        display: flex;
        flex-flow: row nowrap;
        position: relative;
        width: 100%;
    }

    :host ::slotted(ui-flex-grid-item) {
        margin: 0 var(--row-gap);
    }

    :host ::slotted(ui-flex-grid-item:first-child) {
        margin-left: 0;
    }

    :host ::slotted(ui-flex-grid-item:last-child) {
        margin-right: 0;
    }
</style>

<slot></slot>
`;

export class FlexGridRow extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        if (this.hasAttribute("gap")) {
            this.style.setProperty("--row-gap", this.getAttribute("gap"));
        }
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        // ...
    }
}
