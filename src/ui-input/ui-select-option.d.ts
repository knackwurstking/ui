/**
 * Observed Attributes:
 *  - **value**    - [type: string]
 *  - **selected** - [type: flag]
 */
export class UISelectOption extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        value: string;
        selected: boolean;
    };
    shadowRender(): void;
    render(): void;
}
