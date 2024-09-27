import { UIText } from "./ui-text";

/**
 * HTML: `ui-secondary`
 *
 * Slots:
 *  - __\*__
 */
export class UISecondary extends UIText {
    static register = () => {
        if (!customElements.get("ui-secondary")) {
            customElements.define("ui-secondary", UISecondary);
        }
    };

    constructor() {
        super();
        this.#renderUISecondary();
    }

    #renderUISecondary() {
        this.ui.size = "0.9rem";
        this.ui.casl = 1;
        this.ui.mono = 0;
        this.ui.slnt = -15;
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
