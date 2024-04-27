import { events } from "../../js"

/**
 * @typedef {{
 *  close: null;
 * }} _Events
 */

// {{{ Content Template

const t = document.createElement("template")

t.innerHTML = `
<style>
    /* TODO: Debugging here, remove later */
    * {
        border: 1px solid red;
    }

    :host {
        --header-height: 3rem;
        --footer-height: 3rem;

        position: fixed;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        max-width: 100%;
        max-height: 100%;

        margin: 0;
        padding: var(--spacing);

        /* Padding for ios devices */
        padding-top: calc(env(safe-area-inset-top, 0) + var(--spacing));
        padding-bottom: calc(env(safe-area-inset-bottom, 0) + var(--spacing));

        border: none;
        border-radius: var(--radius);

        background-color: transparent;

        -ms-overflow-style: none;
        scrollbar-width: none;

        z-index: 999;
    }

    :host(::-webkit-scrollbar) {
        display: none;
    }

    :host(::backdrop) {
        background-color: hsl(0, 0%, 0%, 0.4);
        backdrop-filter: blur(5px);
    }

    :host > article {
        background-color: hsl(var(--bg));
        color: hsl(var(--fg));

        border: var(--border-width, .1em) var(--border-style) hsl(var(--border));
        border-radius: var(--radius);

        padding: 0;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        position: relative;
    }

    :host([fullscreen]),
    :host([fullscreen]) > article {
        width: 100%;
        height: 100%;
    }

    /*
     * Header Styles
     */
  
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: calc(var(--spacing) / 2);
        padding-left: var(--spacing);

        border-top-right-radius: var(--radius);
        border-top-left-radius: var(--radius);

        width: 100%;
        height: var(--header-height);
    }

    :host([fullscreen]) article header {
        position: absolute;
    }

    /*
     * Content Styles
     */

    .content {
        padding-left: var(--spacing);
        padding-right: var(--spacing);
        height: fit-content;
    }

    :host([fullscreen]) article .content {
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: calc(--header-height + var(--spacing));
        padding-bottom: calc(--footer-height + var(--spacing));
    }

    /*
     * Footer Styles
     */

    footer {
        padding: var(--spacing);
        margin-top: var(--spacing);
        border-bottom-right-radius: var(--radius);
        border-bottom-left-radius: var(--radius);

        width: 100%;
        height: var(--footer-height);
    }

    :host([fullscreen]) article footer {
        position: absolute;
    }

    footer ui-flex-grid-row {
        height: 100%;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
    }
</style>

<dialog class="ui-dialog">
	<article>
        <header>
            <h4><slot name="title"></slot></h4>

            <ui-icon-button ghost>
                <ui-svg-close></ui-svg-close>
            </ui-icon-button>
        </header>

        <section class="content">
            <slot></slot>
        </section>

        <footer>
            <ui-flex-grid-row gap="calc(var(--spacing) / 2)">
                <slot name="actions"></slot>
            </ui-flex-grid-row>
        </footer>
	</article>
</dialog>
`

// }}}

class UI {
    /** @type {Dialog} */
    #root
    /** @type {HTMLDialogElement} */
    #dialog

    /**
     * @param {Dialog} root
     * @param {HTMLDialogElement} dialog
     */
    constructor(root, dialog) {
        this.#root = root
        this.#dialog = dialog

        /** @type {events.Events<_Events>} */
        this.events = new events.Events()
    }

    get dialog() {
        return this.#dialog
    }

    open(modal = false) {
        if (!!modal) {
            this.#dialog.showModal()
        } else {
            this.#dialog.show()
        }
    }

    close() {
        this.#dialog.close()
    }

    get fullscreen() {
        return this.#root.hasAttribute("fullscreen")
    }

    set fullscreen(state) {
        if (!!state) this.#root.setAttribute("fullscreen", "")
        else this.#root.removeAttribute("fullscreen")
    }
}

/**
 * Special slots to use:
 *  - title: all childrens go into "header > h4"
 *  - actions: all childrens go into "footer > ui-flex-grid-row" (shadowRoot)
 */
export class Dialog extends HTMLDialogElement {
    #dispatchCloseHandler = () => this.ui.events.dispatchWithData("close", null)
    #closeHandler = () => this.ui.close()

    static register = () => customElements.define("ui-dialog", Dialog, { extends: "dialog" })
    //static observedAttributes = [];

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(t.content.cloneNode(true))

        this.ui = new UI(this, this.shadowRoot.querySelector("dialog"));
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector("header ui-icon-button")
        button.addEventListener("close", this.#dispatchCloseHandler)
        button.addEventListener("close", this.#closeHandler)
    }

    disconnectedCallback() {
        const button = this.shadowRoot.querySelector("header ui-icon-button")
        button.removeEventListener("close", this.#dispatchCloseHandler)
        button.removeEventListener("close", this.#closeHandler)
    }

    /*
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
        }
    }
    */
}
