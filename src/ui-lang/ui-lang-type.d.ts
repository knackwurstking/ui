/**
 * HTML: `ui-lang-type`
 *
 * Attributes:
 *  - __name__: *string*
 *  - __href__: *string*
 *  - __fallback__: *boolean*
 */
export class UILangType extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        name: string;
        href: string;
        fallback: boolean;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
}
