export class UIFlexGridItem extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    cleanup: CleanUp;
    ui: {
        root: this;
        getFlex(): string;
        /**
         * @param {string | null} value
         */
        setFlex(value: string | null): void;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    /**
     * @private
     * @param {Object} attributes
     * @param {string} [attributes.flex]
     */
    private updateStyle;
}
import { CleanUp } from "../js";
