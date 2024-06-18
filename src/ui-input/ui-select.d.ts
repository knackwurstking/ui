export class UISelect extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    ui: {
        /**
         *  @type {Events<UISelectEvents>}
         */
        events: Events<UISelectEvents>;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @private
     * @param {Event} ev
     */
    private onClickOptions;
    #private;
}
export type UISelectEvents = import(".").UISelectEvents;
import { CleanUp } from "../js";
import { Events } from "../js";
