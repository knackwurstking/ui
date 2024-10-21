import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * **Tag**: `ui-app-bar-item`
 *
 * **Attributes**:
 *  - name: `string`
 *  - hidden: `boolean`
 *
 * **Slots**:
 *  - ""
 */
@customElement("ui-app-bar-item")
export class UIAppBarItem extends LitElement {
    @property({ type: String, attribute: "name", reflect: true })
    name: string = "";

    @property({ type: Boolean, attribute: "hidden", reflect: true })
    hidden: boolean = false;

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            :host {
                display: block;
                flex: 1;
            }

            :host([hidden]) {
                display: none;
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
        this.hidden = false;
    }

    public hide(): void {
        this.hidden = true;
    }
}
