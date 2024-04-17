import { ripple } from "../../js";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            position: relative;
            padding: var(--spacing) calc(var(--spacing) * 1.5);
            border: var(--border-width) var(--border-style) currentColor;
            border-radius: var(--radius);
            overflow: hidden;
            transition: background-color .2s ease;
            font-weight: bold;
            cursor: pointer;
            outline: none;
        }

        :host([variant="full"]) {
            border: none;
        }

        :host([variant="full"][color="primary"]:not(outline, .none)) {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-fg));
        }

        :host([variant="full"][color="secondary"]:not(.outline, .none)) {
            background-color: hsl(var(--secondary));
            color: hsl(var(--secondary-fg));
        }

        :host([variant="full"][color="destructive"]:not(.outline, .none)) {
            background-color: hsl(var(--destructive));
            color: hsl(var(--destructive-fg));
        }

        :host([variant="outline"]) {
            border-color: currentColor;
            background-color: transparent;
        }

        :host([variant="outline"][color="primary"]) {
            color: hsl(var(--primary));
        }

        :host([variant="outline"][color="secondary"]) {
            color: hsl(var(--secondary));
        }

        :host([variant="outline"][color="destructive"]) {
            color: hsl(var(--destructive));
        }

        :host([variant="ghost"]) {
            box-shadow: none;
            border-color: transparent;
            background-color: transparent;
        }

        :host([variant="ghost"][color="primary"]) {
            color: hsl(var(--primary));
        }

        :host([variant="ghost"][color="secondary"]) {
            color: hsl(var(--secondary));
        }

        :host([variant="ghost"][color="destructive"]) {
            color: hsl(var(--destructive));
        }

        :host(:disabled),
        :host(:disabled:hover),
        :host(:disabled:active) {
            background-color: transparent;
            opacity: 0.25;
            cursor: default;
        }
    </style>

    <slot></slot>
`;

export class Button extends HTMLButtonElement {
    constructor() {
        super();
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        if (!this.hasAttribute("no-ripple")) ripple.create(this);
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        // ...
    }
}
