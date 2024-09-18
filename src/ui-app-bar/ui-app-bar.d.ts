/**
 * HTML: `ui-app-bar`
 *
 * Attributes:
 *  - **position**: `"top"`
 *
 * Slots:
 *  - **left**
 *  - **center**
 *  - **right**
 */
export class UIAppBar extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        readonly leftSlot: any[];
        readonly centerSlot: any[];
        readonly rightSlot: any[];
        position: string;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
