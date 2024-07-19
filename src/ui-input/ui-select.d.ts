/**
 * @typedef UISelectEvents
 * @type {{
 *  "change": UISelectOption;
 * }} UISelectEvents
 */
/**
 * Observed Attributes:
 *  - **open**    - [type: flag]
 */
export class UISelect extends HTMLElement {
    static register: () => void;
    shadowCSS: () => any;
    shadowTemplate: () => any;
    ui: {
        /**
         * @private
         */
        root: this;
        cleanup: CleanUp;
        /**
         *  @type {Events<UISelectEvents>}
         */
        events: Events<UISelectEvents>;
        isOpen(): void;
        open(): void;
        close(): void;
        /**
         * @returns {UISelectOption[]}
         */
        getOptions(): UISelectOption[];
        /**
         * @returns {UISelectOption | null}
         */
        getSelectedOption(): UISelectOption | null;
    };
    /**
     * @private
     */
    private cleanup;
    connectedCallback(): void;
    disconnectedCallback(): void;
    shadowRender(): void;
}
/**
 * UISelectEvents
 */
export type UISelectEvents = {
    "change": UISelectOption;
};
import { CleanUp } from "../js";
import { Events } from "../js";
import { UISelectOption } from "./ui-select-option";
