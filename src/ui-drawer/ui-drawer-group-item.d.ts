export class UIDrawerGroupItem extends HTMLElement {
    static register: () => void;
    css: () => any;
    template: () => any;
    ui: {
        cleanup: CleanUp;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): void;
}
import { CleanUp } from "../js";
