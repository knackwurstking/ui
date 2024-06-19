/**
 * @template {HTMLElement} T
 */
export class UIAppBarItem<T extends HTMLElement> extends HTMLElement {
    static register: () => void;
    constructor();
    cleanup: CleanUp;
    ui: {
        /** @private */
        root: this;
        enable(): void;
        disable(): void;
        /**
         * @returns {T}
         */
        getItem(): T;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../js";
