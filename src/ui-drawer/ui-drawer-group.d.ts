export class UIDrawerGroup extends HTMLUListElement {
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
     * @param {string} value
     */
    private setTitle;
    /**
     * @private
     */
    private removeTitle;
}
import { CleanUp } from "../js";
declare class UI {
    /**
     * @param {UIDrawerGroup} root
     */
    constructor(root: UIDrawerGroup);
    /**
     * @private
     */
    private root;
    outside: Element;
    aside: HTMLElement;
    set title(value: string);
    get title(): string;
}
export {};
