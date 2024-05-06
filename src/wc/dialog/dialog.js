import { events } from "../../js"

/**
 * @typedef {{
 *  close: null;
 * }} _Events
 */

// {{{ innerHTML

const innerHTML = `
<style>
    :host dialog * {
        box-sizing: border-box;
    }

    dialog {
        position: fixed;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        max-width: 100%;
        max-height: 100%;

        margin: 0 !important;
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
        background-color: var(--ui-dialog-outside-bgColor);
        backdrop-filter: var(--ui-dialog-outside-backdropFilter);
    }

    dialog > article {
        background-color: var(--ui-dialog-bgColor);
        color: var(--ui-dialog-color);

        border: 1px solid var(--ui-dialog-borderColor);
        border-radius: var(--ui-dialog-radius);

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
        width: calc(100% - var(--ui-spacing) * 2);
        height: calc(100% - (env(safe-area-inset-top, 0) + env(safe-area-inset-bottom, 0) + (var(--ui-spacing) * 2)));

        margin: var(--ui-spacing) !important;
        margin-top: calc(env(safe-area-inset-top, 0) + var(--ui-spacing)) !important;
        margin-bottom: calc(env(safe-area-inset-bottom, 0) + var(--ui-spacing)) !important;

        padding: 0 !important;
    }

    /*
     * Header Styles
     */
  
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 0 var(--ui-spacing);
        padding-left: var(--ui-spacing);

        border-top-right-radius: var(--ui-dialog-radius);
        border-top-left-radius: var(--ui-dialog-radius);

        width: 100%;
        height: var(--ui-dialog-header-height);
    }

    header h4 {
        margin: auto 0 !important;
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
        padding: var(--ui-spacing);
        height: fit-content;
    }

    :host([fullscreen]) .content {
        z-index: 10;
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: calc(var(--ui-dialog-header-height) + var(--ui-spacing));
        padding-bottom: calc(var(--ui-dialog-footer-height) + var(--ui-spacing));
    }

    /*
     * Footer Styles
     */

    footer {
        padding: 0 var(--ui-spacing);
        margin-top: var(--ui-spacing) !important;
        border-bottom-right-radius: var(--ui-dialog-radius);
        border-bottom-left-radius: var(--ui-dialog-radius);

        width: 100%;
        height: var(--ui-dialog-footer-height);
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
            <ui-flex-grid-row gap="calc(var(--ui-spacing) / 2)">
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
    #dispatchCloseHandler = () => this.ui.events.dispatch("close", null)
    #closeHandler = () => this.ui.close()

    static register = () => customElements.define("ui-dialog", Dialog)

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML = innerHTML

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
