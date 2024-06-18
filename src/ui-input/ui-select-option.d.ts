export class UISelectOption extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        getValue(): string;
        /**
         * @param {string | null} value
         */
        setValue(value: string | null): void;
        getSelected(): any;
        /**
         * @param {boolean} state
         */
        setSelected(state: boolean): void;
    };
}
