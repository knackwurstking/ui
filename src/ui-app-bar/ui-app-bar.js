import { CleanUp, html } from "../js";
import { UIFlexGridRow } from "../ui-flex-grid";

const innerHTML = html`
    <style>
        * { box-sizing: border-box; }

        :host {
            display: flex !important;
            position: absolute !important;
            z-index: 100;
            background-color: var(--ui-backdrop-bgColor);
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
    </style>

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

/**
 * Special slots:
 *  - **left**: childrens inside a "ui-flex-grid-row"
 *  - **center**: childrens inside a "ui-flex-grid-row"
 *  - **right**: childrens inside a "ui-flex-grid-row"
 */
export class UIAppBar extends HTMLElement {

    static register = () => {
        UIFlexGridRow.register();

        if (!customElements.get("ui-app-bar")) {
            customElements.define("ui-app-bar", UIAppBar);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;

        this.cleanup = new CleanUp();
        this.ui = {
            getLeftSlot: () => {
                return [...this.querySelectorAll(`[slot="left"]`)]
            },
            getCenterSlot: () => {
                return [...this.querySelectorAll(`[slot="center"]`)]
            },

            getRightSlot: () => {
                return [...this.querySelectorAll(`[slot="right"]`)]
            }
        };
    }

    connectedCallback() { }
    disconnectedCallback() {
        this.cleanup.run();
    }
}
