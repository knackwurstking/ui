export class UIAlerts extends HTMLElement {
    static register: () => void;
    ui: {
        root: this;
        /**
         * @param {import("./ui-alert").UIAlert} alert
         */
        add(alert: import("./ui-alert").UIAlert): () => void;
        /**
         * @param {import("./ui-alert").UIAlert} alert
         */
        remove(alert: import("./ui-alert").UIAlert): void;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
