/**
 * @template {HTMLElement} T
 */
export class UIAppBarItem<T extends HTMLElement> extends HTMLElement {
    static register: () => void;
    constructor();
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        enable(): void;
        disable(): void;
        /**
         * @returns {T}
         */
        getChild(): T;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../js";
