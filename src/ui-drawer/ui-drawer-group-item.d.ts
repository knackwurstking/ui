export class UIDrawerGroupItem extends HTMLElement {
    static register: () => void;
    ui: {
        cleanup: CleanUp;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../js";
