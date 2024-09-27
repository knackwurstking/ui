/**
 * @typedef UIDrawer_Events
 * @type {{
 *  open: null,
 *  close: null,
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
    open: null;
    close: null;
};
import { Events } from "../utils";
