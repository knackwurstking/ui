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
 *  - __open__: *boolean*
 *
 * Slots:
 *  - __\*__
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
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
}
export type UIDrawer_Events = {
    open: UIDrawer;
    close: UIDrawer;
};
import { Events } from "../utils";
