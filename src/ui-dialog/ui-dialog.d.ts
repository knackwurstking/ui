/**
 * @typedef UIDialog_Events
 * @type {{
 *  open: null;
 *  close: null;
 * }}
 */
/**
 * HTML: `ui-dialog`
 *
 * Attributes:
 *  - __title__: *string*
 *  - __fullscreen__: *boolean*
 *  - __nofooter__: *boolean*
 *
 * Slots:
 *  - __actions__
 *  - __\*__
 *
 * @template {UIDialog_Events} [T=UIDialog_Events]
 */
export class UIDialog<T extends UIDialog_Events = UIDialog_Events> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /**
     * @param {object} options
     * @param {string} [options.variant]
     * @param {string} [options.color]
     * @param {string} [options.flex]
     * @param {(() => void|Promise<void>) | null} [options.onClick]
     */
    static createAction({ variant, color, flex, onClick, }: {
        variant?: string;
        color?: string;
        flex?: string;
        onClick?: (() => void | Promise<void>) | null;
    }): {
        container: UIFlexGridItem;
        action: import("../ui-button").UIButton;
    };
    /**
     * @param {string} title
     */
    constructor(title: string);
    _title: string;
    ui: {
        root: this;
        /** @type {Events<T>} */
        events: Events<T>;
        title: string;
        fullscreen: boolean;
        nofooter: boolean;
        /**
         * @param {boolean} modal
         * @param {boolean} [inert] - This will prevent the autofocus on input elements (default: true)
         */
        open(modal?: boolean, inert?: boolean): void;
        close(): void;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    #private;
}
export type UIDialog_Events = {
    open: null;
    close: null;
};
import { Events } from "../utils";
import { UIFlexGridItem } from "../ui-flex-grid";
