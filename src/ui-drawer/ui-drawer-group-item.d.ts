export class UIDrawerGroupItem extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    ui: UI;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../js";
declare class UI {
    /**
     * @param {UIDrawerGroupItem} root
     */
    constructor(root: UIDrawerGroupItem);
    /**
     * @private
     */
    private root;
    outside: Element;
    aside: HTMLElement;
    set open(state: boolean);
    get open(): boolean;
}
export {};
