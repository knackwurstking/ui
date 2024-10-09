export class UIDropdown extends HTMLDetailsElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: {
        root: this;
        title: string;
        options(): NodeListOf<Element>;
    };
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    #private;
}
