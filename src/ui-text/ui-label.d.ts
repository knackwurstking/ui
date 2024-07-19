/**
 * Observed Attributes:
 *  - **primary**   - [type: string]
 *  - **secondary**   - [type: string]
 *  - **ripple**    - [type: flag]
 *
 * Special Slots:
 *  - **input** - click handling if "ripple" flag is set
 */
export class UILabel extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    shadowCSS: () => any;
    shadowTemplate: () => any;
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        /** @private */
        running: boolean;
        /**
         * @private
         * @type {(() => void|Promise<void>) | null}
         */
        removeRipple: (() => void | Promise<void>) | null;
        /** @private */
        onClick: () => Promise<void>;
        /** @private */
        onInputClick: (ev: MouseEvent & {
            currentTarget: Element;
        }) => Promise<void>;
        getPrimary(): string;
        /**
         * @param {string | null} value
         */
        setPrimary(value: string | null): void;
        getSecondary(): string;
        /**
         * @param {string | null} value
         */
        setSecondary(value: string | null): void;
        /**
         * @returns {HTMLElement[]}
         */
        getInputSlot(): HTMLElement[];
        enableRipple(): void;
        disableRipple(): void;
        /** @private */
        startInputHandling(): void;
        /**
         * @private
         */
        stopInputHandling(): void;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    render(): void;
}
import { CleanUp } from "../js";
