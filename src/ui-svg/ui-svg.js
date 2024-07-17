import { css, html } from "../js";

export class UISvg extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-svg")) {
            customElements.define("ui-svg", UISvg);
        }
    };

    css = () => css`
        :host {
            width: 100%;
            height: 100%;
            color: inherit;
        }

        svg {
            width: 100%;
            height: 100%;
        }
    `;

    template = () => html`<slot></slot>`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;
    }
}
