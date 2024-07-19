export class UIFlexGridItem extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    static defaultFlex: string;
    /**
     * @param {Object} options
     * @param {string} options.flex
     */
    shadowCSS: ({ flex }: {
        flex: string;
    }) => any;
    shadowTemplate: () => any;
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        shadowAttr: {
            flex: string;
        };
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
     * @param {Object} options
     * @param {string} options.flex
     */
    shadowRender({ flex }: {
        flex: string;
    }): void;
}
import { CleanUp } from "../js";
