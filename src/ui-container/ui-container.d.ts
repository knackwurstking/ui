export class UIContainer extends HTMLElement {
    static register: () => void;
    shadowCSS: () => any;
    shadowTemplate: () => any;
    ui: {
        cleanup: CleanUp;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): void;
}
import { CleanUp } from "../js";
