/**
 * HTML: `ui-select-option`
 *
 * Attributes:
 *  - __value__: *string*
 *  - __selected__: *boolean*
 *
 * Slots:
 *  - __\*__
 */
export class UISelectOption extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        value: string;
        selected: boolean;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
}
