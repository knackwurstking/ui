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

class UI {
    constructor() {
        /** @type {any | null} */
        this.value = null
        this.selected = false;
    }
}

export class SelectOption extends HTMLElement {
    static register = () => customElements.define("ui-select-option", SelectOption);
    static observedAttributes = ["value", "selected"]

    constructor() {
        super();

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.ui = new UI()
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "value":
                this.ui.value = newValue
                break
            case "selected":
                this.ui.selected = newValue !== null
                break
        }
    }
}
