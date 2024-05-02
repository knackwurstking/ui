export class StackLayoutPage extends HTMLElement {
    static register: () => void;
    ui: UI;
}
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
