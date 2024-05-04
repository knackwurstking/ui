export class Select extends HTMLElement {
    static register: () => void;
    /** @type {UI} */
    ui: UI;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @private
     * @param {Event} ev
     */
    private onClickOptions;
    /**
     * @private
     * @param {MouseEvent | PointerEvent} ev
     */
    private onClick;
}
export type SelectEvents = {
    "change": SelectOption;
};
declare class UI {
    /** @type {Events<SelectEvents>} */
    events: Events<SelectEvents>;
}
import { SelectOption } from "./select-option";
import { Events } from "../../js/events";
export {};
