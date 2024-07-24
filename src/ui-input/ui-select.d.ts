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
        readonly options: UISelectOption[];
        /**
         * @returns {UISelectOption | null}
         */
        selected(): UISelectOption | null;
    };
    shadowRender(): void;
    render(): void;
}
/**
 * UISelectEvents
 */
export type UISelectEvents = {
    "change": UISelectOption;
};
import { Events } from "../js";
import { UISelectOption } from "./ui-select-option";
