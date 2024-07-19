export class UIFlexGrid extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    static defaultGap: string;
    /**
     * @param {Object} options
     * @param {string} options.gap
     */
    shadowCSS: ({ gap }: {
        gap: string;
    }) => any;
    shadowTemplate: () => any;
    ui: {
        /**
         * @private
         */
        root: this;
        cleanup: CleanUp;
        shadowAttr: {
            gap: string;
        };
        getGap(): string;
        /**
         * @param {string | null} value
         */
        setGap(value: string | null): void;
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
     * @param {Object} options
     * @param {string} options.gap
     */
    shadowRender({ gap }: {
        gap: string;
    }): void;
}
import { CleanUp } from "../js";
