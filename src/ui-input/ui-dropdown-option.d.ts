export class UIDropdownOption extends HTMLLIElement {
    static register: () => void;
    ui: {
        root: this;
        value: string;
    };
    #private;
}
