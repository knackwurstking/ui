export class UIDrawerGroupItem extends HTMLElement {
    static register: () => void;
    shadowCSS: () => any;
    shadowTemplate: () => any;
    ui: {
        cleanup: CleanUp;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    shadowRender(): void;
}
import { CleanUp } from "../js";
