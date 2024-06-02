export class Select extends HTMLElement {
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
export type SelectEvents = {
    "change": SelectOption;
};
import { CleanUp } from "../../js";
declare class UI {
    /** @type {Events<SelectEvents>} */
    events: Events<SelectEvents>;
}
import { SelectOption } from "./select-option";
import { Events } from "../../js/events";
export {};
