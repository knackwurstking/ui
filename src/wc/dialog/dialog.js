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
    :host dialog * {
        box-sizing: border-box;
    }

    dialog {
        --header-height: 3rem;
        --footer-height: 3rem;

        position: fixed;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        max-width: 100%;
        max-height: 100%;

        margin: 0;
        padding: 0;

        border: none;
        outline: none;

        background-color: transparent;

        -ms-overflow-style: none;
        scrollbar-width: none;

        z-index: 999;
    }

    dialog::-webkit-scrollbar {
        display: none;
    }

    dialog::backdrop {
        background-color: hsl(0, 0%, 0%, 0.4);
        backdrop-filter: blur(5px);
    }

    dialog > article {
        background-color: hsl(var(--bg));
        color: hsl(var(--fg));

        border: var(--border-width) var(--border-style) hsl(var(--border));
        border-radius: var(--radius);

        padding: 0;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        position: relative;
    }

    :host([fullscreen]) dialog {
        width: 100%;
        height: 100%;
    }

    :host([fullscreen]) dialog > article {
        width: calc(100% - var(--spacing) * 2);
        height: calc(100% - (env(safe-area-inset-top, 0) + env(safe-area-inset-bottom, 0) + (var(--spacing) * 2)));

        margin: var(--spacing);
        margin-top: calc(env(safe-area-inset-top, 0) + var(--spacing));
        margin-bottom: calc(env(safe-area-inset-bottom, 0) + var(--spacing));
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

    header h4 {
        margin: auto 0;
    }

    :host([fullscreen]) header {
        z-index: 15;
        position: absolute;
        top: 0;
        left: 0;
    }

    /*
     * Content Styles
     */

    .content {
        padding-left: var(--spacing);
        padding-right: var(--spacing);
        height: fit-content;
    }

    :host([fullscreen]) .content {
        z-index: 10;
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

    :host([fullscreen]) footer {
        z-index: 15;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    footer ui-flex-grid-row {
        height: 100%;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
    }
</style>

<dialog>
	<article>
        <header>
            <span><slot name="title"></slot></span>

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
    /** @type {HTMLElement} */
    #h4

    /**
     * @param {Dialog} root
     * @param {HTMLDialogElement} dialog
     */
    constructor(root, dialog) {
        this.#root = root
        this.#dialog = dialog

        /** @type {events.Events<_Events>} */
        this.events = new events.Events()

        this.#h4 = document.createElement("h4")
        this.#h4.slot = "title"
        this.#root.appendChild(this.#h4)
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

    get title() {
        return this.#h4.innerText
    }

    set title(value) {
        this.#h4.innerText = value
    }
}

/**
 * Special slots to use:
 *  - title: all childrens go into "dialog header > span", just use the `Dialog.ui.title` setter/getter
 *  - actions: all childrens go into "dialog footer > ui-flex-grid-row"
 */
export class Dialog extends HTMLElement {
    #dispatchCloseHandler = () => this.ui.events.dispatchWithData("close", null)
    #closeHandler = () => this.ui.close()

    static register = () => customElements.define("ui-dialog", Dialog)

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(t.content.cloneNode(true))

        this.ui = new UI(this, this.shadowRoot.querySelector("dialog"));
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector("header ui-icon-button")
        button.addEventListener("click", this.#closeHandler)
        button.addEventListener("click", this.#dispatchCloseHandler)
    }

    disconnectedCallback() {
        const button = this.shadowRoot.querySelector("header ui-icon-button")
        button.removeEventListener("click", this.#closeHandler)
        button.removeEventListener("click", this.#dispatchCloseHandler)
    }
}
