const template = document.createElement("template");

template.innerHTML = `
<style>
    :host {
        display: flex;
        flex-flow: column nowrap;
        position: relative;
        width: 100%;
        height: fit-content;
    }

    :host ::slotted(ui-flex-grid-row) {
        margin: var(--gap, 0) 0;
    }

    :host ::slotted(ui-flex-grid-row:first-child) {
        margin-top: 0;
    }

    :host ::slotted(ui-flex-grid-row:last-child) {
        margin-bottom: 0;
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
        if (this.hasAttribute("gap")) {
            this.style.setProperty("--gap", this.getAttribute("gap"));
        }
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        // ...
    }
}
