import { html } from "../../js/utils";

// {{{ innerHTML

const innerHTML = html`
<style>
    :host {
        display: flex;
        position: absolute;
        z-index: 100;
        background-color: var(--ui-app-bar-bgColor);
        backdrop-filter: var(--ui-app-bar-backdropFilter);
        overflow: hidden;
        user-select: none;
    }

    :host([position="top"]) {
        top: 0;
        left: 0;
        width: 100%;
        height: var(--ui-app-bar-height);
        border-bottom: 1px solid var(--ui-app-bar-borderColor);
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

// }}}

class UI {
    /** @type {AppBar} */
    #root

    /** @param {AppBar} root */
    constructor(root) {
        this.#root = root
    }

    getLeftSlot() {
        return [...this.#root.querySelectorAll(`[slot="left"]`)]
    }

    getCenterSlot() {
        return [...this.#root.querySelectorAll(`[slot="center"]`)]
    }

    getRightSlot() {
        return [...this.#root.querySelectorAll(`[slot="right"]`)]
    }
}

/**
 * Special slots to use (no unnamed slots)
 *  - **left**: childrens inside a "ui-flex-grid-row"
 *  - **center**: childrens inside a "ui-flex-grid-row"
 *  - **right**: childrens inside a "ui-flex-grid-row"
 */
export class AppBar extends HTMLElement {

    static register = () => customElements.define("ui-app-bar", AppBar)

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML;

        this.ui = new UI(this);
    }
}
