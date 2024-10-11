import { css, html, LitElement } from "lit";

export class UISvg extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;

                width: 100%;
                height: 100%;

                color: inherit;
            }

            ::slotted(*) {
                width: 100%;
                height: 100%;
            }
        `;
    }

    protected render() {
        return html` <slot></slot> `;
    }
}
