/**
 * HTML: `ui-text`
 *
 * Attributes:
 *   - __casl__: *number* between __0__ and __1__ [default: 1]
 *   - __mono__: *number* between __0__ and __1__ [default: 0]
 *   - __slnt__: *number* between __0__ and __-15__ [default: 0]
 *   - __size__: *string* [default: var(--ui-fontSize)]
 *   - __family__: *string*  [default: var(--ui-fontFamily)]
 */
export class UIText extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    ui: {
        root: this;
        casl: number;
        mono: number;
        slnt: number;
        size: string;
        family: string;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oldValue
     * @param {string | null} newValue
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    #private;
}
