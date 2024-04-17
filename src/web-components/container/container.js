const template = document.createElement("template");
template.innerHTML = `
    <style>
        div {
            width: 100%;
            max-width: 65em;
            margin: 0 auto;
            padding: var(--spacing);
        }
    </style>

    <div>
        <slot></slot>
    </div>
`;

export class Container extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
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
