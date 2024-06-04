export class UISelect extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    /** @type {UI} */
    ui: UI;
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
declare class UI {
    /** @type {events.Events<UISelectEvents>} */
    events: events.Events<UISelectEvents>;
}
import { events } from "../js";
export {};
