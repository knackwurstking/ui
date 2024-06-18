export class UIDrawerGroupItem extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    ui: {
        /**
         * @returns {boolean}
         */
        getOpen(): boolean;
        /**
         * @param {boolean} state
         */
        setOpen(state: boolean): void;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../js";
