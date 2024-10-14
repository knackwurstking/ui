import { svg } from "..";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @attribute {string} title
 * @attribute {boolean} fullscreen
 * @attribute {boolean} no-footer
 * @slot actions
 * @slot * - Will be added as ".content"
 */
@customElement("ui-dialog")
export class UIDialog extends LitElement {
    @property({ type: String, attribute: "title", reflect: true })
    title: string = "";

    @property({ type: Boolean, attribute: "fullscreen", reflect: true })
    fullscreen: string = "";

    @property({ type: Boolean, attribute: "no-footer", reflect: true })
    noFooter: string = "";

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            dialog {
                z-index: 998; /* UIAlerts z-index is 999 */

                position: fixed !important;
                top: 50%;
                left: 50%;

                max-width: 100%;
                max-height: 100%;

                margin: 0;
                padding: 0;

                border: none;
                outline: none;

                background-color: transparent;

                transform: translate(-50%, -50%);

                /* Remove Scrollbar */
                -ms-overflow-style: none;
                scrollbar-width: none;
                scroll-behavior: smooth;
            }

            /* Remove Scrollbar */
            dialog::-webkit-scrollbar {
                display: none;
            }

            dialog::backdrop {
                background-color: hsla(
                    var(--ui-hsl-backdrop),
                    var(--ui-hsl-backdrop-alpha)
                );
                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
            }

            dialog > .container {
                background-color: hsl(var(--ui-hsl-bg));
                color: hsl(var(--ui-hsl-fg));

                border: 1px solid hsl(var(--ui-hsl-borderColor));
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
                height: calc(100% - var(--ui-spacing) * 2);

                margin: var(--ui-spacing);
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

            .header [name="title"] {
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
                bottom: calc(
                    var(--ui-dialog-footer-height) + var(--ui-spacing)
                );
                right: var(--ui-spacing);
                left: var(--ui-spacing);
                padding: unset;
                height: unset;
                width: unset;
                min-width: unset;
            }

            :host([nofooter]) .content {
                bottom: var(--ui-spacing);
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

            :host([nofooter]) .footer {
                display: none;
            }
        `;
    }

    protected render() {
        return html`
            <dialog>
                <div class="container">
                    <div class="header">
                        <span style="white-space: nowrap;">
                            <h3>${this.title}</h3>
                        </span>

                        <ui-icon-button
                            style="width: var(--ui-dialog-header-height); height: 100%;"
                            ghost
                        >
                            ${svg.smoothieLineIcons.close}
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
    }
}

/**
 * @typedef UIDialog_Events
 * @type {{
 *  open: null;
 *  close: null;
 * }}
 */

/**
 * Slots:
 *  - __actions__
 *  - __\*__
 *
 * @template {UIDialog_Events} [T=UIDialog_Events]
 */
export class _UIDialog extends HTMLElement {
    constructor() {
        this.ui = {
            /**
             * @param {boolean} modal
             * @param {boolean} [inert] - This will prevent the autofocus on input elements (default: true)
             */
            open(modal = false, inert = true) {
                const dialog = this.root.shadowRoot.querySelector("dialog");

                const inertBackup = dialog.inert;
                dialog.inert = inert;

                if (!!modal) {
                    dialog.showModal();
                } else {
                    dialog.show();
                }

                this.events.dispatch("open", null);
                dialog.inert = inertBackup;
            },

            close() {
                this.events.dispatch("close", null);

                const dialog = this.root.shadowRoot.querySelector("dialog");
                dialog.close();
            },
        };
    }

    #renderUIDialog() {
        // Close button
        const button = this.shadowRoot.querySelector(".header ui-icon-button");
        const onClick = () => this.ui.close();
        button.addEventListener("click", onClick);

        // Dialog - Disable escape key action
        const dialog = this.shadowRoot.querySelector("dialog");
        const onCancel = (/** @type {Event} */ ev) => ev.preventDefault();
        dialog.addEventListener("cancel", onCancel);
    }

    /**
     * @param {object} options
     * @param {string} [options.variant]
     * @param {string} [options.color]
     * @param {string} [options.flex]
     * @param {(() => void|Promise<void>) | null} [options.onClick]
     */
    static createAction({
        variant = "full",
        color = "primary",
        flex = "0",
        onClick = null,
    }) {
        const item = new UIFlexGridItem();

        item.ui.flex = flex;
        item.slot = "actions";

        item.innerHTML = html`
            <ui-button variant="${variant}" color="${color}"></ui-button>
        `;

        /** @type {import("../ui-button").UIButton} */
        let button;
        if (!!onClick) {
            button = item.querySelector("ui-button");
            button.ui.events.on("click", onClick);
        }

        return {
            container: item,
            action: button,
        };
    }
}
