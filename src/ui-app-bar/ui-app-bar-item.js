import { CleanUp, html, css } from "../js";

/**
 * @template {HTMLElement} T
 */
export class UIAppBarItem extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-app-bar-item"))
            customElements.define("ui-app-bar-item", UIAppBarItem);
    };

    css = () => css`
        * {
            box-sizing: border-box;
        }

        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
        }
    `;

    template = () => html`<slot></slot>`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.ui = {
            /** @private */
            root: this,

            cleanup: new CleanUp(),

            enable() {
                this.root.style.display = "flex";
            },

            disable() {
                this.root.style.display = "none";
            },

            /**
             * @returns {T}
             */
            getChild() {
                return this.root.querySelector("*");
            },
        };

        this.render();
    }

    connectedCallback() {}
    disconnectedCallback() {
        this.ui.cleanup.run();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;
    }
}
