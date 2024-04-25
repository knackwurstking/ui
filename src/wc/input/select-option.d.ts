export class SelectOption extends HTMLElement {
    type: string;
    get value(): string;
    set selected(state: boolean);
    get selected(): boolean;
}
