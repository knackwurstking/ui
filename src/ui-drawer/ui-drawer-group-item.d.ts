export class UIDrawerGroupItem extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    ui: {
        /** @private */
        root: this;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../js";
