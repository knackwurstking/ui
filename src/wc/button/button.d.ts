export class Button extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    attributeChangedCallback(name: any, _oldValue: any, newValue: any): void;
    set noRipple(value: boolean);
    get noRipple(): boolean;
    enableRipple(): void;
    disableRipple(): void;
    #private;
}
