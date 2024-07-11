/**
 * Special slots:
 *  - **left**: childrens inside a "ui-flex-grid-row"
 *  - **center**: childrens inside a "ui-flex-grid-row"
 *  - **right**: childrens inside a "ui-flex-grid-row"
 */
export class UIAppBar extends HTMLElement {
    static register: () => void;
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        getLeftSlot(): any[];
        getCenterSlot(): any[];
        getRightSlot(): any[];
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../js";
