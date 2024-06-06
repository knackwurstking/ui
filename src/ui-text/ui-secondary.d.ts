export class UISecondary extends HTMLElement {
    static register: () => void;
    cleanup: CleanUp;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
import { CleanUp } from "../js";