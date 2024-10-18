// TODO: On unfold group, do auto scroll

import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * **Tag**: ui-drawer-group
 *
 * **Attributes**:
 *  - title: `string`
 *  - open: `boolean` - _Will be ignored if "no-fold" is set_
 *  - no-fold: `boolean`
 *
 * **Slots**:
 *  - \*
 */
@customElement("ui-drawer-group")
export class UIDrawerGroup extends LitElement {
    // TODO: Convert to typescript
}

export class _UIDrawerGroup extends HTMLElement {
    static observedAttributes = ["title"];

    constructor() {
        super();

        this.ui = {
            root: this,

            get title() {
                return this.root.shadowRoot.querySelector(`.title`).innerHTML;
            },

            set title(value) {
                let item = this.root.shadowRoot.querySelector(`.title`);

                if (!value) {
                    item.classList.remove("visible");
                    return;
                }

                item.classList.add("visible");
                item.innerHTML = html` <h3>${value}</h3> `;
            },

            get fold() {
                return this.root.hasAttribute("fold");
            },

            set fold(value) {
                if (!value) {
                    this.root.removeAttribute("fold");
                    return;
                }

                this.root.setAttribute("fold", "");
            },

            get nofold() {
                return this.root.hasAttribute("nofold");
            },

            set nofold(value) {
                if (!value) {
                    this.root.removeAttribute("nofold");
                    return;
                }

                this.root.setAttribute("nofold", "");
            },
        };

        this.#renderUIDrawerGroup();
    }

    #renderUIDrawerGroup() {
        this.shadowRoot.innerHTML = html`
            <style>
                * {
                    box-sizing: border-box;
                }

                ul {
                    margin: 0;
                    list-style: none;
                    padding: var(--ui-spacing);
                    overflow: hidden;
                }

                ui-drawer-group-item {
                    display: flex;
                    cursor: pointer;
                }

                .title:not(.visible) {
                    display: none;
                }

                .icon {
                    transition: transform 0.25s ease;
                }

                :host([fold]) .icon {
                    transform: rotate(-90deg);
                }

                :host([fold]):host(:not([nofold])) ::slotted(*) {
                    display: none !important;
                }

                :host([nofold]) ui-drawer-group-item:nth-child(1) {
                    display: none;
                }
            </style>

            <ul>
                <ui-drawer-group-item
                    style="position: relative; border-radius: var(--ui-radius);"
                    role="button"
                >
                    <ui-flex-grid-row>
                        <ui-flex-grid-item class="title"></ui-flex-grid-item>

                        <ui-flex-grid-item class="icon" flex="0">
                            <ui-svg style="width: 2.5rem; height: 2.5rem;">
                                ${chevronDown}
                            </ui-svg>
                        </ui-flex-grid-item>
                    </ui-flex-grid-row>
                </ui-drawer-group-item>

                <slot></slot>
            </ul>
        `;

        // Click handler for fold and unfold a group
        const item = this.shadowRoot.querySelector("ui-drawer-group-item");
        item.addEventListener("click", () => {
            this.ui.fold = !this.ui.fold;
        });
        ripple.create(item);
    }
}
