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
    css: () => any;
    template: () => any;
    /**
     * @private
     */
    private cleanup;
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
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): void;
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
