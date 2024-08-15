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
 *  - title: string
 *  - fullscreen
 *  - nofooter
 *
 * Slots:
 *  - actions
 *  - *
 *
 * @template {UIDialog_Events} T
 */
export class UIDialog<T extends UIDialog_Events> extends HTMLElement {
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
    shadowRenderCleanUp: CleanUp;
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
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
}
export type UIDialog_Events = {
    open: null;
    close: null;
};
import { CleanUp } from "../utils";
import { Events } from "../utils";
import { UIFlexGridItem } from "../ui-flex-grid";
