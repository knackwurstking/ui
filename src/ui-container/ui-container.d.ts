/**
 * HTML: `ui-container`
 *
 * Slots:
 *  - __\*__
 */
export class UIContainer extends HTMLElement {
    static register: () => void;
    ui: {};
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
}
