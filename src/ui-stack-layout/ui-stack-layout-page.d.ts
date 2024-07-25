export class UIStackLayoutPage extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        name: string;
    };
    shadowRender(): void;
    render(): void;
}
