export class UIStackLayoutPage extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    ui: UI;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../js";
declare class UI {
    /**
    * @param {UIStackLayoutPage} root
    */
    constructor(root: UIStackLayoutPage);
    set name(value: string);
    get name(): string;
    #private;
}
export {};
