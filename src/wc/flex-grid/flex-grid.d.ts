export class FlexGrid extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    #private;
}
