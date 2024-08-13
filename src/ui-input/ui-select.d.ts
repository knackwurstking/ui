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
 *  - open
 *
 * Slots:
 *  - * from type `UISelectOption`
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
        options(): UISelectOption[];
        /**
         * @returns {UISelectOption | null}
         */
        selected(): UISelectOption | null;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
/**
 * UISelectEvents
 */
export type UISelectEvents = {
    "change": UISelectOption;
};
import { Events } from "../utils";
import { UISelectOption } from "./ui-select-option";
