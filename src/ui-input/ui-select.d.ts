/**
 * Observed Attributes:
 *  - **open**    - [type: flag]
 */
export class UISelect extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    ui: {
        /**
         *  @type {Events<UISelectEvents>}
         */
        events: Events<UISelectEvents>;
        /**
         * @private
         */
        root: this;
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
