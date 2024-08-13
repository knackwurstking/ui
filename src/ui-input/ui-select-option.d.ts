/**
 * HTML: `ui-select-option`
 *
 * Attributes:
 *  - value: string
 *  - selected
 *
 * Slots:
 *  - *
 */
export class UISelectOption extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        value: string;
        selected: boolean;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
