/**
 * Observed Attributes:
 *  - **value**    - [type: string]
 *  - **selected** - [type: flag]
 */
export class UISelectOption extends HTMLElement {
    static register: () => void;
    shadowCSS: () => any;
    shadowTemplate: () => any;
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
    shadowRender(): void;
}
