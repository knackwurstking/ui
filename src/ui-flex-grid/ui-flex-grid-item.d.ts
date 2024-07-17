export class UIFlexGridItem extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    css: ({ flex }: {
        flex?: string;
    }) => any;
    template: () => any;
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        attr: {
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
    render({ flex }?: {
        flex?: string;
    }): void;
}
import { CleanUp } from "../js";
