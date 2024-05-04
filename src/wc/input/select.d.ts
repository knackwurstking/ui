export class Select extends HTMLElement {
    static register: () => void;
    /** @type {UI} */
    ui: UI;
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
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
