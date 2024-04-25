const template = document.createElement("template")

template.innerHTML = `
<style>
    :host {
        display: none;
        padding: var(--spacing);
        padding-right: 2.5em;
        font-family: var(--font-family);
        transition: background-color 0.25s linear;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

<slot></slot>
`

export class SelectOption extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.type = "ui-select-option"
    }

    get value() {
        return this.getAttribute("value") || "";
    }

    get selected() {
        return this.hasAttribute("selected");
    }

    set selected(state) {
        if (state) {
            this.setAttribute("selected", "");
        } else {
            this.removeAttribute("selected");
        }
    }
}
