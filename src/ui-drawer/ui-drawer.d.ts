export class UIDrawer extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    cleanup: CleanUp;
    ui: {
        /** @private */
        root: this;
        aside: HTMLElement;
        /**
         * @type {Events<UIDrawerEvents>}
         */
        events: Events<UIDrawerEvents>;
        getOpen(): boolean;
        /**
         * @param {boolean} state
         */
        setOpen(state: boolean): void;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
export type UIDrawerEvents = {
    open: UIDrawer;
    close: UIDrawer;
};
import { CleanUp } from "../js";
import { Events } from "../js";
