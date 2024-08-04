/**
 * @typedef UIDrawerEvents
 * @type {{
 *  open: UIDrawer,
 *  close: UIDrawer,
 * }}
 */
export class UIDrawer extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        /**
         * @type {Events<UIDrawerEvents>}
         */
        events: Events<UIDrawerEvents>;
        open: boolean;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export type UIDrawerEvents = {
    open: UIDrawer;
    close: UIDrawer;
};
import { Events } from "../js";
