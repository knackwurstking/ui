/**
 * HTML: `ui-app-bar`
 *
 * Attributes:
 *  - __position__: *"top"*
 *
 * Slots:
 *  - __left__
 *  - __center__
 *  - __right__
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
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
}
