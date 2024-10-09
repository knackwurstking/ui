// TODO: Continue here...
import { css, globalStylesToShadowRoot, html } from "../utils";

/**
 * HTML: `ui-text`
 *
 * Attributes:
 *   - __casl__: *number* between __0__ and __1__ [default: 1]
 *   - __mono__: *number* between __0__ and __1__ [default: 0]
 *   - __slnt__: *number* between __0__ and __-15__ [default: 0]
 *   - __size__: *string* [default: var(--ui-fontSize)]
 *   - __family__: *string*  [default: var(--ui-fontFamily)]
 */
export class UIText extends HTMLElement {
    #defaultCASL = 1;
    #casl = this.#defaultCASL;

    #defaultMONO = 0;
    #mono = this.#defaultMONO;

    #defaultSLNT = 0;
    #slnt = this.#defaultSLNT;

    #defaultSize = "var(--ui-fontSize)";
    #size = this.#defaultSize;

    #defaultFamily = "var(--ui-fontFamily)";
    #family = this.#defaultFamily;

    static register = () => {
        if (!customElements.get("ui-text")) {
            console.debug(`[ui] Register "ui-text" component`);
            customElements.define("ui-text", UIText);
        }
    };

    static observedAttributes = ["casl", "mono", "slnt", "size", "family"];

    constructor() {
        super();

        this.ui = {
            root: this,

            get casl() {
                return this.root.#casl;
            },

            set casl(value) {
                if (value === null) value = this.root.#defaultCASL;
                this.root.#casl = value;
                this.root.#renderCSS();
            },

            get mono() {
                return this.root.#mono;
            },

            set mono(value) {
                if (value === null) value = this.root.#defaultMONO;
                this.root.#mono = value;
                this.root.#renderCSS();
            },

            get slnt() {
                return this.root.#slnt;
            },

            set slnt(value) {
                if (value === null) value = this.root.#defaultSLNT;
                this.root.#slnt = value;
                this.root.#renderCSS();
            },

            get size() {
                return this.root.#size;
            },

            set size(value) {
                if (value === null) value = this.root.#defaultSize;
                this.root.#size = value;
                this.root.#renderCSS();
            },

            get family() {
                return this.root.#family;
            },

            set family(value) {
                if (value === null) value = this.root.#defaultFamily;
                this.root.#family = value;
                this.root.#renderCSS();
            },
        };

        this.#renderUIText();
    }

    #renderUIText() {
        this.attachShadow({ mode: "open" });
        globalStylesToShadowRoot(this.shadowRoot);

        this.shadowRoot.innerHTML = html`
            <style>
                :host {
                    display: inline-block;
                    overflow-wrap: anywhere;
                }
            </style>

            <style class="custom"></style>

            <slot></slot>
        `;

        this.#renderCSS();
    }

    #renderCSS() {
        const style = this.shadowRoot.querySelector(`style.custom`);
        style.innerHTML = css`
            :host {
                font-size: ${this.ui.size};
                font-family: ${this.ui.family};
                font-variation-settings:
                    "CASL" ${this.ui.casl},
                    "MONO" ${this.ui.mono},
                    "slnt" ${this.ui.slnt};
            }
        `;
    }

    connectedCallback() {}
    disconnectedCallback() {}

    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "casl":
                this.ui.casl = parseInt(newValue, 10);
                break;

            case "mono":
                this.ui.mono = parseInt(newValue, 10);
                break;

            case "slnt":
                this.ui.slnt = parseInt(newValue, 10);
                break;

            case "size":
                this.ui.size = newValue;
                break;

            case "family":
                this.ui.family = newValue;
                break;
        }
    }
}

UIText.register();
