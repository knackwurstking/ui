export class UIPrimary extends HTMLElement {
    static register: () => void;
    shadowCSS: () => string;
    shadowTemplate: () => any;
    ui: {
        cleanup: CleanUp;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    shadowRender(): void;
}
import { CleanUp } from "../js";
