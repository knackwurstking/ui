import svg from "../svg"

const template = document.createElement("template")

template.innerHTML = `
<style>
    :host {
        --items-length: 0;
        position: relative; 
        display: block;
        width: 100%;
        height: calc(1em * var(--line-height) + var(--spacing) * 2);
        border: var(--border-width) var(--border-style) hsl(var(--border));
        border-radius: var(--radius);
        font-size: 0.95em;
        overflow: hidden;
        transition: height 0.25s ease;
    }

    :host(.open) {
        height: calc(
            (1em * var(--line-height) + var(--spacing) * 2) * var(--items-length)
        );
    }

    :host .options {
        cursor: pointer;
        display: none;
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }

    :host .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        width: 2.5em;
        height: 100%;
        color: hsl(var(--primary));
    }

    :host(.open) .icon {
        display: none;
    }

    :host(.open) .options,
    :host(:not(.open)) .options:has(> .selected) {
        display: block
    }

    :host .options ::slotted(.option) {
        padding: var(--spacing);
        padding-right: 2.5em;
        transition: background-color 0.25s linear;
    }

    :host .options ::slotted(.option.selected) {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-fg));
    }

    :host(.open) .options ::slotted(.option:not(.selected):hover) {
        background-color: hsl(var(--fg), 0.1);
    }

    :host(:not(.open)) .options ::slotted(.option:not(.selected)) {
        display: none;
    }
</style>

<div
    class="options"
    onclick='event.currentTarget.parentElement.classList.toggle("open")'
>
    <div class="icon">${svg.ChevronDown}</div>

    <slot></slot>
</div>
`

export class Select extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        // TODO: How to do select handling for all children
        console.warn(this.children)
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        // ...
    }
}
