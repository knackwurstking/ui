export class UIDrawer extends HTMLElement {
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
     * @param {UIDrawer} root
     */
    constructor(root: UIDrawer);
    /**
     * @private
     */
    private root;
    aside: HTMLElement;
    set open(state: boolean);
    get open(): boolean;
}
export {};
