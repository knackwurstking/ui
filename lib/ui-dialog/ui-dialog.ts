import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
    svg,
    UIButton,
    UIButtonColor,
    UIButtonVariant,
    UIFlexGridItem,
} from "..";

export interface UIDialogOpenOptions {
    modal?: boolean;
    inert?: boolean;
}

/**
 * **Tag**: `ui-dialog`
 *
 * **Attributes**:
 *  - title: `string`
 *  - fullscreen: `boolean`
 *  - no-footer: `boolean`
 *  - open: `boolean`
 *  - modal: `boolean`
 *  - inert: `boolean` - Disables the auto focus on an input element if set
 *
 * **Events**:
 *  - "open"
 *  - "close"
 *
 * **Slots**:
 *  - "actions"
 *  - "": Will be added as ".content"
 */
@customElement("ui-dialog")
export class UIDialog extends LitElement {
    @property({ type: String, attribute: "title", reflect: true })
    title: string = "";

    @property({ type: Boolean, attribute: "fullscreen", reflect: true })
    fullscreen: string = "";

    @property({ type: Boolean, attribute: "no-footer", reflect: true })
    noFooter: string = "";

    @property({ type: Boolean, attribute: "open", reflect: true })
    open: boolean = false;

    @property({ type: Boolean, attribute: "modal", reflect: true })
    modal: boolean = false;

    @property({ type: Boolean, attribute: "inert", reflect: true })
    inert: boolean = false;

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

            :host([fullscreen]) dialog {
                width: 100%;
                height: 100%;
            }

            dialog > .container {
                background-color: hsl(var(--ui-hsl-bg));
                color: hsl(var(--ui-hsl-text));

                border: 1px solid hsl(var(--ui-hsl-borderColor));
                border-radius: var(--ui-radius);

                padding: var(--ui-spacing);

                display: flex;
                flex-direction: column;
                justify-content: space-between;

                position: relative;
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
                white-space: nowrap;
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

            :host([no-footer]) .content {
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

            :host([no-footer]) .footer {
                display: none;
            }

            .footer ui-flex-grid-row {
                height: 100%;
                flex-wrap: nowrap;
                justify-content: flex-end;
                align-items: center;
            }
        `;
    }

    protected render() {
        return html`
            <dialog
                @cancel=${(ev: Event) => {
                    // Disallow closing the dialog via Esc key
                    ev.preventDefault();
                }}
            >
                <div class="container">
                    <div class="header">
                        <h3 name="title">${this.title}</h3>

                        <ui-icon-button
                            style="width: var(--ui-dialog-header-height); height: 100%;"
                            ghost
                            @click=${() => {
                                this.close();
                            }}
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

    protected updated(_changedProperties: PropertyValues): void {
        if (this.open) this.show();
        else this.close();
    }

    public show() {
        if (!this.open) this.open = true;

        const dialog = this.shadowRoot!.querySelector(`dialog`);
        if (dialog === null) return;

        const inertBackup = dialog.inert;
        dialog.inert = this.inert;

        if (this.modal) {
            dialog.showModal();
        } else {
            dialog.show();
        }

        dialog.inert = inertBackup;

        this.dispatchEvent(new Event("open"));
    }

    public close() {
        this.dispatchEvent(new Event("close"));
        this.shadowRoot!.querySelector(`dialog`)!.close();
    }

    public addDialogActionButton(
        content: string,
        options?: {
            onClick?: ((ev: MouseEvent) => Promise<void> | void) | null;
            variant?: UIButtonVariant;
            color?: UIButtonColor;
            flex?: number;
        } | null,
    ): UIButton {
        const item = new UIFlexGridItem();

        item.flex = options?.flex || 1;
        item.slot = "actions";
        this.appendChild(item);

        let button = new UIButton();
        button.innerHTML = content;
        button.variant = options?.variant;
        button.color = options?.color;
        button.onclick = options?.onClick || null;
        item.appendChild(button);

        return button;
    }
}
