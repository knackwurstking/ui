import { CleanUp, html, css } from "../js";
import { UIFlexGridRow } from "../ui-flex-grid";

/**
 * Special slots:
 *  - **left**: childrens inside a "ui-flex-grid-row"
 *  - **center**: childrens inside a "ui-flex-grid-row"
 *  - **right**: childrens inside a "ui-flex-grid-row"
 */
export class UIAppBar extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-app-bar")) {
            customElements.define("ui-app-bar", UIAppBar);
        }
    };

    css = () => css`
        * {
            box-sizing: border-box;
        }

        :host {
            display: flex !important;
            position: absolute !important;
            z-index: 100;
            background-color: var(--ui-backdrop-bgColor);
            -webkit-backdrop-filter: var(--ui-backdropFilter);
            backdrop-filter: var(--ui-backdropFilter);
            overflow: hidden;
            user-select: none;
        }

        :host([position="top"]) {
            top: 0;
            left: 0;
            right: 0;
            height: var(--ui-app-bar-height);
            border-bottom: 1px solid var(--ui-borderColor);
        }

        :host > ui-flex-grid-row {
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: space-between;
        }

        :host > ui-flex-grid-row > * {
            height: 100%;
        }

        :host > ui-flex-grid-row > *:nth-child(1),
        :host > ui-flex-grid-row > *:nth-child(3) {
            width: fit-content;
        }

        :host > ui-flex-grid-row > [slot="left"] {
            margin-left: 0 !important;
        }

        :host > ui-flex-grid-row > [slot="center"] {
            width: 100%;
        }

        :host > ui-flex-grid-row > [slot="right"] {
            margin-right: 0 !important;
            justify-content: flex-end;
        }
    `;

    template = () => html`
        <ui-flex-grid-row gap="0.25rem">
            <ui-flex-grid-row gap="0.25rem">
                <slot name="left"></slot>
            </ui-flex-grid-row>

            <ui-flex-grid-row gap="0.25rem" style="overflow: hidden;">
                <slot name="center"></slot>
            </ui-flex-grid-row>

            <ui-flex-grid-row gap="0.25rem">
                <slot name="right"></slot>
            </ui-flex-grid-row>
        </ui-flex-grid-row>
    `;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();

        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

            getLeftItems() {
                return [...this.root.querySelectorAll(`[slot="left"]`)];
            },

            getCenterItems() {
                return [...this.root.querySelectorAll(`[slot="center"]`)];
            },

            getRightItems() {
                return [...this.root.querySelectorAll(`[slot="right"]`)];
            },
        };
    }

    connectedCallback() {}
    disconnectedCallback() {
        this.ui.cleanup.run();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;
    }
}
