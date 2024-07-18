import { CleanUp, css, Events, html } from "../js";
import svgChevronDown from "../svg/smoothie-line-icons/chevron-down";
import { UISelectOption } from "./ui-select-option";

/**
 * @typedef UISelectEvents
 * @type {{
 *  "change": UISelectOption;
 * }} UISelectEvents
 */

/**
 * Observed Attributes:
 *  - **open**    - [type: flag]
 */
export class UISelect extends HTMLElement {
    static register = () => {
        if (!customElements.get("ui-select")) {
            customElements.define("ui-select", UISelect);
        }
    };

    css = () => css`
        * {
            box-sizing: border-box;
        }

        :host {
            --ui-bgColor: "transparent";
            --items-length: 0;

            position: relative !important;
            display: block !important;

            width: 100%;
            height: calc(1em * var(--ui-lineHeight) + var(--ui-spacing) * 2);
            transition: height 0.25s ease;

            background-color: var(--ui-bgColor);
            color: var(--ui-color);

            border: 1px solid var(--ui-borderColor);
            border-radius: var(--ui-radius);

            line-height: 1.15;

            overflow: hidden;

            font-size: 0.9rem;
            font-family: var(--ui-fontFamily);
            font-variation-settings: var(--ui-select-fontVariation);
        }

        .options {
            cursor: pointer;
            display: none;
            display: flex;
            flex-direction: column;
            min-height: 100%;
        }

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            right: 0;
            width: 2.5rem;
            height: 100%;
            color: var(--ui-primary-bgColor);
        }

        ::slotted(ui-select-option) {
            display: flex;
        }

        :host(.open) {
            height: calc(
                (1em * var(--ui-lineHeight) + var(--ui-spacing) * 2) *
                    var(--items-length)
            );
        }

        :host(.open) .options {
            display: block;
        }

        :host(.open) .icon {
            display: none;
        }

        :host(.open) ::slotted(ui-select-option[selected]) {
            background-color: var(--ui-primary-bgColor);
            color: var(--ui-primary-color);
        }

        :host(.open) ::slotted(ui-select-option:not([selected]):hover) {
            background-color: hsla(var(--ui-color-hsl), 0.1);
        }

        :host(:not(.open))
            .options:has(> ::slotted(ui-select-option[selected])) {
            display: block;
        }

        :host(:not(.open)) ::slotted(ui-select-option:not([selected])) {
            display: none;
        }
    `;

    template = () => html`
        <div class="options">
            <div class="icon"><ui-svg>${svgChevronDown}</ui-svg></div>

            <slot></slot>
        </div>
    `;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        /**
         * @private
         */
        this.cleanup = new CleanUp();

        this.ui = {
            /**
             * @private
             */
            root: this,

            cleanup: new CleanUp(),

            /**
             *  @type {Events<UISelectEvents>}
             */
            events: new Events(),

            isOpen() {
                this.root.hasAttribute("open");
            },

            open() {
                this.root.setAttribute("open", "");
            },

            close() {
                this.root.removeAttribute("open");
            },

            /**
             * @returns {UISelectOption[]}
             */
            getOptions() {
                return [...this.root.children].filter(
                    (child) => child instanceof UISelectOption,
                );
            },

            /**
             * @returns {UISelectOption | null}
             */
            getSelectedOption() {
                try {
                    return (
                        this.getOptions().find(
                            (/** @type {UISelectOption} */ option) =>
                                !!option.ui.getSelected(),
                        ) || null
                    );
                } catch {
                    return null;
                }
            },
        };

        this.render();
    }

    connectedCallback() {
        const options = this.shadowRoot.querySelector(".options");

        /**
         * @param {MouseEvent | PointerEvent} ev
         */
        const onClickOption = async (ev) => {
            (ev.composedPath() || []).forEach((child) => {
                if (child instanceof UISelectOption) {
                    [...this.querySelectorAll("ui-select-option")].forEach(
                        (c) => c.removeAttribute("selected"),
                    );

                    child.setAttribute("selected", "");
                    this.ui.events.dispatch("change", child);
                }
            });
        };

        /**
         * @param {Event} ev
         */
        const onClick = (ev) => {
            if (this.classList.toggle("open")) {
                ev.stopPropagation();
                this.addEventListener("click", onClickOption);
            } else {
                setTimeout(() =>
                    this.removeEventListener("click", onClickOption),
                );
            }
        };

        options.addEventListener("click", onClick);
        this.cleanup.add(() => {
            this.removeEventListener("click", onClick);
            options.removeEventListener("click", onClick);
        });

        this.style.setProperty(
            "--items-length",
            this.querySelectorAll("ui-select-option").length.toString(),
        );
    }

    disconnectedCallback() {
        this.cleanup.run();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;
    }
}
