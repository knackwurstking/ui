/**
 * Special slots:
 *  - **left**: childrens inside a "ui-flex-grid-row"
 *  - **center**: childrens inside a "ui-flex-grid-row"
 *  - **right**: childrens inside a "ui-flex-grid-row"
 */
export class UIAppBar extends HTMLElement {
    static register: () => void;
    static defaultAttributes: {
        /** @type {string | null} */
        position: string | null;
    };
    ui: {
        root: this;
        readonly leftSlot: any[];
        readonly centerSlot: any[];
        readonly rightSlot: any[];
        position: string;
    };
    shadowRender(): void;
    render(): void;
}
