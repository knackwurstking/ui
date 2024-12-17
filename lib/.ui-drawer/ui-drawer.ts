import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import UIDrawerGroup from "./ui-drawer-group";

/**
 * @element ui-drawer
 *
 * @fires open
 * @fires close
 *
 * @slot
 */
@customElement("ui-drawer")
class UIDrawer extends LitElement {
    @property({ type: String, attribute: "width", reflect: true })
    width?: string;

    @property({ type: Boolean, attribute: "open", reflect: true })
    open: boolean = false;

    role = "button";

    private handleUnfold = (ev: Event) => {
        const target: UIDrawerGroup = ev.currentTarget as UIDrawerGroup;
        target.scrollIntoView(true);
    };

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            :host {
                display: block;

                position: fixed !important;
                z-index: 150;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;

                overflow: hidden;

                transition: left 0s ease 0.25s;
            }

            :host([open]) {
                left: 0;
                transition: none;
            }

            :host(:not([open])) {
            }

            aside {
                position: absolute;
                z-index: 150;
                top: 0;
                left: -100%;
                width: var(--_width, fit-content);
                max-width: calc(100% - 2.5rem);
                height: 100%;

                overflow-x: hidden;
                overflow-y: scroll;

                border-right: var(--ui-border-width) var(--ui-border-style) var(--ui-border-color);

                transition: left 0.5s ease;

                /* Remove Scrollbar */
                -ms-overflow-style: none;
                scrollbar-width: none;
                scroll-behavior: smooth;

                /* Backdrop Blur */
                background-color: var(--ui-backdrop-color);
                -webkit-backdrop-filter: var(--ui-backdrop-filter);
                backdrop-filter: var(--ui-backdrop-filter);
            }

            aside::-webkit-scrollbar {
                display: none;
            }

            :host([open]) aside {
                left: 0;
            }
        `;
    }

    protected render() {
        return html`
            <aside
                @click=${(ev: Event) => {
                    ev.stopPropagation();
                }}
            >
                <slot></slot>
            </aside>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        this.classList.add("ui-backdrop-blur");
        this.addEventListener("click", () => {
            this.open = false;
        });
    }

    protected updated(_changedProperties: PropertyValues): void {
        [...this.children].forEach(async (child) => {
            if (child instanceof UIDrawerGroup) {
                child.addEventListener("unfold", this.handleUnfold);
            }
        });
    }

    attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
        super.attributeChangedCallback(name, _old, value);

        switch (name) {
            case "width":
                if (value !== null) {
                    this.style.setProperty("--_width", value);
                } else {
                    this.style.removeProperty("--_width");
                }
                break;

            case "open":
                if (value !== null) {
                    history.pushState(null, "ui-drawer", location.href);
                    this.dispatchEvent(new Event("open"));
                } else {
                    this.dispatchEvent(new Event("close"));
                }
                break;
        }
    }
}

export default UIDrawer;
