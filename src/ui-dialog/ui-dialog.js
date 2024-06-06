import { CleanUp, Events, html } from "../js";
import { UIIconButton } from "../ui-button";
import { UIFlexGridRow } from "../ui-flex-grid";
import { Close as SvgClose } from "../svg";

/**
 * @typedef {import(".").UIDialogEvents} UIDialogEvents
 */

// {{{ HTML Content
const innerHTML = html`
<style>
    :host dialog * {
        box-sizing: border-box;
    }

    dialog {
        position: fixed !important;

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
        background-color: var(--ui-backdrop-bgColor);
        backdrop-filter: var(--ui-backdropFilter);
    }

    dialog > .container {
        background-color: var(--ui-bgColor);
        color: var(--ui-color);

        border: 1px solid var(--ui-borderColor);
        border-radius: var(--ui-radius);

        padding: var(--ui-spacing);

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        position: relative;
    }

    :host([fullscreen]) dialog {
        width: 100%;
        height: 100%;
    }

    :host([fullscreen]) dialog > .container {
        width: calc(100% - var(--ui-spacing) * 2);
        height: calc(100% - (env(safe-area-inset-top, 0) + env(safe-area-inset-bottom, 0) + (var(--ui-spacing) * 2)));

        margin: var(--ui-spacing);
        margin-top: calc(env(safe-area-inset-top, 0) + var(--ui-spacing));
        margin-bottom: calc(env(safe-area-inset-bottom, 0) + var(--ui-spacing));
    }

    /*
     * Header Styles
     */
  
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-top-right-radius: var(--ui-radius);
        border-top-left-radius: var(--ui-radius);

        width: 100%;
        height: var(--ui-dialog-header-height);
    }

    .header h4 {
        margin: auto 0;
    }

    :host([fullscreen]) .header {
        z-index: 15;
        position: absolute;
        top: var(--ui-spacing);
        right: var(--ui-spacing);
        left: var(--ui-spacing);
        width: calc(100% - var(--ui-spacing) * 2);
    }

    /*
     * Content Styles
     */

    .content {
        padding: var(--ui-spacing);
        height: fit-content;
        min-width: fit-content;
        width: 100%;
    }

    :host([fullscreen]) .content {
        z-index: 10;
        position: absolute;
        top: calc(var(--ui-dialog-header-height) + var(--ui-spacing));
        bottom: calc(var(--ui-dialog-footer-height) + var(--ui-spacing));
        right: var(--ui-spacing);
        left: var(--ui-spacing);
        padding: unset;
        height: unset;
        width: unset;
        min-width: unset;
    }

    /*
     * Footer Styles
     */

    .footer {
        margin-top: var(--ui-spacing);
        border-bottom-right-radius: var(--ui-radius);
        border-bottom-left-radius: var(--ui-radius);

        width: 100%;
        height: var(--ui-dialog-footer-height);
    }

    :host([fullscreen]) .footer {
        z-index: 15;
        position: absolute;
        right: var(--ui-spacing);
        bottom: var(--ui-spacing);
        left: var(--ui-spacing);
        width: calc(100% - var(--ui-spacing) * 2);
    }

    .footer ui-flex-grid-row {
        height: 100%;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
    }
</style>

<dialog>
	<div class="container">
        <div class="header">
            <span style="white-space: nowrap;"><slot name="title"></slot></span>

            <ui-icon-button style="width: var(--ui-dialog-header-height); height: 100%;" ghost>
                <svg-close></svg-close>
            </ui-icon-button>
        </div>

        <div class="content">
            <slot></slot>
        </div>

        <div class="footer">
            <ui-flex-grid-row gap="calc(var(--ui-spacing) / 2)">
                <slot name="actions"></slot>
            </ui-flex-grid-row>
        </div>
	</div>
</dialog>
`;
// }}}

/**
 * @template {UIDialogEvents} T
 */
class UI {
    /** @type {UIDialog} */
    #root
    /** @type {HTMLDialogElement} */
    #dialog
    /** @type {HTMLElement} */
    #h4

    /**
     * @param {UIDialog} root
     * @param {HTMLDialogElement} dialog
     */
    constructor(root, dialog) {
        this.#root = root
        this.#dialog = dialog

        /** @type {Events<T>} */
        this.events = new Events()

        this.#h4 = document.createElement("h4")
        this.#h4.slot = "title"
        this.#root.appendChild(this.#h4)
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

    getDialogElement() {
        return this.#dialog
    }

    open(modal = false, inert = true) {
        const inertBackup = this.#dialog.inert;
        this.#dialog.inert = inert;

        if (!!modal) {
            this.#dialog.showModal();
        } else {
            this.#dialog.show();
        }

        this.events.dispatch("open", null);
        this.#dialog.inert = inertBackup;
    }

    close() {
        this.#dialog.close();
        this.events.dispatch("close", null);
    }
}

/**
 * Special slots to use:
 *  - title: all childrens go into "dialog header > span", just use the `Dialog.ui.title` setter/getter
 *  - actions: all childrens go into "dialog footer > ui-flex-grid-row"
 *
 * @template {UIDialogEvents} T
 */
export class UIDialog extends HTMLElement {

    static register = () => {
        if (!customElements.get("ui-icon-button"))
            UIIconButton.register();

        if (!customElements.get("svg-close"))
            SvgClose.register();

        if (!customElements.get("ui-flex-grid-row"))
            UIFlexGridRow.register();

        if (!customElements.get("ui-dialog")) {
            console.debug("register web component: ui-dialog");
            customElements.define("ui-dialog", UIDialog);
        }
    };

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML = innerHTML

        this.cleanup = new CleanUp();
        /** @type {UI<UIDialogEvents & T>} */
        this.ui = new UI(this, this.shadowRoot.querySelector("dialog"));
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector(".header ui-icon-button")
        const onClick = () => {
            this.ui.close();
        };
        button.addEventListener("click", onClick)

        const dialog = this.shadowRoot.querySelector("dialog");
        const onCancel = (/** @type {Event} */ ev) => {
            ev.preventDefault(); // NOTE: Disable escape key action
        };
        dialog.addEventListener("cancel", onCancel);

        this.cleanup.add(() => {
            button.removeEventListener("click", onClick)
            dialog.removeEventListener("cancel", onCancel);
        })
    }

    disconnectedCallback() {
        this.cleanup.run();
    }
}