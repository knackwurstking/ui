export class UISvg extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-svg")) {
            customElements.define("ui-svg", UISvg);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {};

        this.shadowRender();
    }

    shadowRender() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    width: 100%;
                    height: 100%;
                    color: inherit;
                }

                svg {
                    width: 100%;
                    height: 100%;
                }
            </style>

            <slot></slot>
        `;
    }

    connectedCallback() { }
    disconnectedCallback() { }
}
