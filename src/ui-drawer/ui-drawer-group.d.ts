export class UIDrawerGroup extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        getTitle(): string;
        /**
         * @param {string} value
         */
        setTitle(value: string): void;
        removeTitle(): void;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
import { CleanUp } from "../js";
