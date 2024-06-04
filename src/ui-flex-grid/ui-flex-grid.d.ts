export class UIFlexGrid extends HTMLElement {
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
     * @param {string} [attributes.gap]
     */
    private updateStyle;
}
import { CleanUp } from "../js";
declare class UI {
    /**
     * @param {UIFlexGrid} root
     */
    constructor(root: UIFlexGrid);
    /**
     * @private
     * @type {UIFlexGrid}
     */
    private root;
    set gap(v: string);
    get gap(): string;
}
export {};
