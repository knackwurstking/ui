/**
 * @template {HTMLElement} T
 */
export class UIAppBarItem<T extends HTMLElement> extends HTMLElement {
    static register: () => void;
    constructor();
    shadowCSS: () => any;
    shadowTemplate: () => any;
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
    render(): void;
}
import { CleanUp } from "../js";
