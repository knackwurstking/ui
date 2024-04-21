import { ripple } from "../../js";

const template = document.createElement("template");
template.innerHTML = `
<style>
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: var(--spacing) calc(var(--spacing) * 1.5);
        border: var(--border-width) var(--border-style) currentColor;
        border-radius: var(--radius);
        overflow: hidden;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        user-select: none;
    }

    :host([variant="full"]) {
        border: none;
    }

    :host([variant="full"][color="primary"]) {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-fg));
        box-shadow: inset 0 0 .25rem .05rem hsla(var(--primary-fg), .35);
    }

    :host([variant="full"][color="secondary"]) {
        background-color: hsl(var(--secondary));
        color: hsl(var(--secondary-fg));
        box-shadow: inset 0 0 .25rem .05rem hsla(var(--secondary-fg), .35);
    }

    :host([variant="full"][color="destructive"]) {
        background-color: hsl(var(--destructive));
        color: hsl(var(--destructive-fg));
        box-shadow: inset 0 0 .25rem .05rem hsla(var(--destructive-fg), .35);
    }

    :host([variant="outline"]) {
        border-color: currentColor;
        background-color: transparent;
    }

    :host([variant="outline"][color="primary"]) {
        color: hsl(var(--primary));
        box-shadow: inset 0 0 .25rem .05rem hsla(var(--primary), .35);
        text-shadow: 0em 0em .1em hsla(var(--primary), .75);
    }

    :host([variant="outline"][color="secondary"]) {
        color: hsl(var(--secondary));
        box-shadow: inset 0 0 .25rem .05rem hsla(var(--secondary), .35);
        text-shadow: 0em 0em .1em hsla(var(--secondary), .75);
    }

    :host([variant="outline"][color="destructive"]) {
        color: hsl(var(--destructive));
        box-shadow: inset 0 0 .25rem .05rem hsla(var(--destructive), .35);
        text-shadow: 0em 0em .1em hsla(var(--destructive), .75);
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

export class Button extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        if (!this.hasAttribute("no-ripple")) ripple.create(this);
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        // ...
    }
}
