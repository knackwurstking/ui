/**
 * @template {HTMLElement} T
 */
export class UIAppBarItem<T extends HTMLElement> extends HTMLElement {
    static register: () => void;
    constructor();
    cleanup: CleanUp;
    ui: {
        enable: () => void;
        disable: () => void;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @returns {T}
     */
    get item(): T;
}
import { CleanUp } from "../js";
