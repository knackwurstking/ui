export class UIDrawerGroup extends HTMLElement {
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
    /**
     * @param {string} value
     */
    setTitle(value: string): void;
    removeTitle(): void;
}
export {};
