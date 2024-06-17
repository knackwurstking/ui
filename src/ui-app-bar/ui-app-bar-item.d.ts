/**
 * @template {HTMLElement} T
 */
export class UIAppBarItem<T extends HTMLElement> extends HTMLElement {
    static register: () => void;
    constructor();
    ui: {
        enable: () => void;
        disable: () => void;
    };
    cleanup: CleanUp;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @returns {T}
     */
    get item(): T;
}
import { CleanUp } from "../js";
