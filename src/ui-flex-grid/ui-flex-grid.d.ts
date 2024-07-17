export class UIFlexGrid extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    css: ({ gap }: {
        gap?: string;
    }) => any;
    template: () => any;
    ui: {
        /**
         * @private
         */
        root: this;
        cleanup: CleanUp;
        attr: {
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
    render({ gap }?: {
        gap?: string;
    }): void;
}
import { CleanUp } from "../js";
