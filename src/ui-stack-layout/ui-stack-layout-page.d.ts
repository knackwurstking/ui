export class UIStackLayoutPage extends HTMLElement {
    static register: () => void;
    css: () => any;
    template: () => any;
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        getName(): string;
        /**
         * @param {string | null} value
         */
        setName(value: string | null): void;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): void;
}
import { CleanUp } from "../js";
