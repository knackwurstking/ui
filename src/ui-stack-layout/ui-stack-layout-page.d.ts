export class UIStackLayoutPage extends HTMLElement {
    static register: () => void;
    shadowCSS: () => string;
    shadowTemplate: () => any;
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
    shadowRender(): void;
}
import { CleanUp } from "../js";
