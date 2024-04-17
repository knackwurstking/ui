const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: flex;
            position: absolute;
            z-index: 100;
            background-color: hsla(var(--bg), .2);
            backdrop-filter: blur(5px);
            overflow: hidden;
        }

        :host([position="top"]) {
            top: 0;
            left: 0;
            width: 100%;
            height: var(--app-bar-height);
            border-bottom: var(--border-width) var(--border-style) hsl(var(--border));
        }

        :host > ui-flex-grid-row {
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: flex-start;
            padding: 0 var(--spacing);
        }

        :host > ui-flex-grid-row > *:nth-child(1),
        :host > ui-flex-grid-row > *:nth-child(3) {
            width: fit-content;
        }

        :host > ui-flex-grid-row > *:nth-child(1) {
            margin-left: 0;
        }

        :host > ui-flex-grid-row > *:nth-child(3) {
            margin-right: 0;
            justify-content: flex-end;
        }
    </style>

    <ui-flex-grid-row gap="0.1em">
        <slot name="left"></slot>

        <slot name="center"></slot>

        <slot name="right"></slot>
    </ui-flex-grid-row>
`;

export class AppBar extends HTMLElement {
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
