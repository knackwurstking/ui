// {{{ Content Template

const t = document.createElement("template")

t.innerHTML = `
<style></style>

<dialog class="ui-dialog " class:fullscreen>
	<article>
		<slot name="header" />
		<slot />
		<slot name="footer" />
	</article>
</dialog>
`

// }}}

export class Dialog extends HTMLDialogElement {
    /** @type {HTMLDialogElement} */
    #dialog;

    static register = () => customElements.define("ui-dialog", Dialog, { extends: "dialog" })
    static observedAttributes = ["fullscreen"];

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(t.content.cloneNode(true))
        this.#dialog = this.shadowRoot.querySelector("dialog")

        this.ui = null;
    }

    connectedCallback() {
        this.#setStyle()
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "fullscreen":
                // TODO: make dialog fullscreen
                break
        }
    }

    #setStyle() { // {{{
        this.shadowRoot.querySelector("style").textContent = `
        `
    } // }}}
}
