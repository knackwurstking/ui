/**
 * @typedef UISelectEvents
 * @type {{
 *  "change": UISelectOption;
 * }} UISelectEvents
 */
/**
 * HTML: `ui-select`
 *
 * Attributes:
 *  - **open**: `boolean`
 *
 * Slots:
 *  - \* - from type `UISelectOption`
 */
export class UISelect extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    open: boolean;
    ui: {
        root: this;
        /**
         *  @type {Events<UISelectEvents>}
         */
        events: Events<UISelectEvents>;
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
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} n
     * @param {string | null} _oV
     * @param {string | null} nV
     */
    attributeChangedCallback(n: string, _oV: string | null, nV: string | null): void;
}
/**
 * UISelectEvents
 */
export type UISelectEvents = {
    "change": UISelectOption;
};
import { Events } from "../utils";
import { UISelectOption } from "./ui-select-option";
