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

    static register = () => customElements.define("ui-select-option", SelectOption);
    static observedAttributes = ["value", "selected"]

    constructor() {
        super();

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.type = "ui-select-option"

        /** @type {any | null} */
        this.value = null
        this.selected = false;
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "value":
                this.value = newValue
                break
            case "selected":
                this.selected = newValue !== null
                break
        }
    }
}
