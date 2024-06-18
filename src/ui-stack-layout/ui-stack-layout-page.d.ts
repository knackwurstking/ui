export class UIStackLayoutPage extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    ui: {
        /** @private */
        root: this;
        getName(): string;
        /**
         * @param {string | null} value
         */
        setName(value: string | null): void;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../js";
