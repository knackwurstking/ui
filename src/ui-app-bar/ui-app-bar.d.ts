/**
 * Special slots:
 *  - **left**: childrens inside a "ui-flex-grid-row"
 *  - **center**: childrens inside a "ui-flex-grid-row"
 *  - **right**: childrens inside a "ui-flex-grid-row"
 */
export class UIAppBar extends HTMLElement {
    static register: () => void;
    css: () => any;
    template: () => any;
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        getLeftItems(): any[];
        getCenterItems(): any[];
        getRightItems(): any[];
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): void;
}
import { CleanUp } from "../js";
