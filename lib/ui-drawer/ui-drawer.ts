import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { UIDrawerGroup } from "./ui-drawer-group";

/**
 * **Tag**: ui-drawer
 *
 * **Attributes**:
 *  - open: `boolean`
 *
 * **Events**:
 *  - open
 *  - close
 *
 * **Slots**:
 *  - \*
 */
@customElement("ui-drawer")
export class UIDrawer extends LitElement {
    @property({ type: Boolean, attribute: "open", reflect: true })
    open: boolean = false;

    private handleUnfold = (ev: Event) => {
        const target: UIDrawerGroup = ev.currentTarget as UIDrawerGroup;
        //const container = this.shadowRoot!.querySelector(`aside`)!;

        //container.scrollTop = container.scrollHeight;

        //container.scrollTo({
        //    top: container.scrollHeight,
        //    behavior: "smooth",
        //});

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

                transition: left 0s ease 0.5s;
            }

            :host([open]) {
                left: 0;
                transition: none;
            }

            aside {
                position: absolute;
                z-index: 150;
                top: 0;
                left: -100%;
                width: var(--ui-drawer-width, fit-content);
                max-width: calc(100% - 2.5rem);
                height: 100%;

                overflow-x: hidden;
                overflow-y: scroll;

                border-right: 1px solid hsl(var(--ui-hsl-card-borderColor));

                transition: left 0.5s ease;

                /* Remove Scrollbar */
                -ms-overflow-style: none;
                scrollbar-width: none;
                scroll-behavior: smooth;

                /* Backdrop Blur */
                background-color: hsla(
                    var(--ui-hsl-backdrop),
                    var(--ui-hsl-backdrop-alpha)
                );
                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
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
        this.setAttribute("role", "button");
        this.classList.add("has-backdrop-blur");
        this.addEventListener("click", () => {
            this.open = false;
        });
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (this.open) {
            history.pushState(null, "ui-drawer", location.href);
            this.dispatchEvent(new Event("open"));
        } else {
            this.dispatchEvent(new Event("close"));
        }

        [...this.children].forEach(async (child) => {
            if (child instanceof UIDrawerGroup) {
                child.addEventListener("unfold", this.handleUnfold);
            }
        });
    }
}
