/**
 * @typedef UISelect_Events
 * @type {{
 *  "change": UISelectOption;
 * }} UISelect_Events
 */
/**
 * HTML: `ui-select`
 *
 * Attributes:
 *  - __open__: *boolean*
 *
 * Slots:
 *  - __\*__ - from type `UISelectOption`
 */
export class UISelect extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    open: boolean;
    ui: {
        root: this;
        /**
         *  @type {Events<UISelect_Events>}
         */
        events: Events<UISelect_Events>;
        open: boolean;
        /**
         * @returns {UISelectOption[]}
         */
        options(): UISelectOption[];
        /**
         * @returns {UISelectOption | null}
         */
        selected(): UISelectOption | null;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} n
     * @param {string | null} _oV
     * @param {string | null} nV
     */
    attributeChangedCallback(n: string, _oV: string | null, nV: string | null): void;
    #private;
}
/**
 * UISelect_Events
 */
export type UISelect_Events = {
    "change": UISelectOption;
};
import { Events } from "../utils";
import { UISelectOption } from "./ui-select-option";
