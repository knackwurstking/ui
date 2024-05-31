export class StackLayoutPage extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    ui: UI;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../../js";
declare class UI {
    /**
    * @param {StackLayoutPage} root
    */
    constructor(root: StackLayoutPage);
    set name(value: string);
    get name(): string;
    #private;
}
export {};
