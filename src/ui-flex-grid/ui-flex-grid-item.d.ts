export class UIFlexGridItem extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    cleanup: CleanUp;
    ui: UI;
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
declare class UI {
    /**
     * @param {UIFlexGridItem} root
     */
    constructor(root: UIFlexGridItem);
    /**
     * @private
     * @type {UIFlexGridItem}
     */
    private root;
    set flex(v: string);
    get flex(): string;
}
export {};