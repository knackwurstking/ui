import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * @public content()
 * @public contentAt(...)
 * @public show()
 * @public hide()
 */
@customElement("ui-app-bar-item")
export class UIAppBarItem extends LitElement {
    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            :host {
                display: var(--_display, content);
                flex: 1;
            }

            ::slotted(*) {
                flex-grow: 1;
            }
        `;
    }

    protected render() {
        return html`<slot></slot>`;
    }

    public content<T extends HTMLElement[]>(): T {
        return [...this.children] as T;
    }

    public contentAt<T extends HTMLElement>(index: number = 0): T {
        return this.children[index] as T;
    }

    public show(): void {
        this.style.removeProperty("--_display");
    }

    public hide(): void {
        this.style.setProperty("--_display", "none");
    }
}
