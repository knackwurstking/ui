/**
 * @typedef UIDrawer_Events
 * @type {{
 *  open: UIDrawer,
 *  close: UIDrawer,
 * }}
 */
/**
 * HTML: `ui-drawer`
 *
 * Attributes:
 *  - open
 *
 * Slots:
 *  - *
 */
export class UIDrawer extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        /**
         * @type {Events<UIDrawer_Events>}
         */
        events: Events<UIDrawer_Events>;
        open: boolean;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export type UIDrawer_Events = {
    open: UIDrawer;
    close: UIDrawer;
};
import { Events } from "../utils";
