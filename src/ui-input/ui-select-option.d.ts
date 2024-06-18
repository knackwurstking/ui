export class UISelectOption extends HTMLElement {
    static register: () => void;
    ui: {
        /** @private */
        root: this;
        getValue(): string;
        /**
         * @param {string | null} value
         */
        setValue(value: string | null): void;
        getSelected(): boolean;
        /**
         * @param {boolean} state
         */
        setSelected(state: boolean): void;
    };
}
