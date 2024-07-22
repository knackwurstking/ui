export class UIDrawerGroup extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: {
        /** @private */
        root: this;
        cleanup: CleanUp;
        title: string;
    };
    shadowRender(): void;
    render(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    /**
     * @param {string | null} title
     */
    setGroupTitle(title: string | null): void;
}
import { CleanUp } from "../js";
