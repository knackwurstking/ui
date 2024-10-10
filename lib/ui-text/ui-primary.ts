// TODO: Convert to typescript
import { UIText } from "./ui-text";

/**
 * HTML: `ui-primary`
 *
 * Slots:
 *  - __\*__
 */
export class UIPrimary extends UIText {
    static register = () => {
        if (!customElements.get("ui-primary")) {
            console.debug(`[ui] Register "ui-primary" component`);
            customElements.define("ui-primary", UIPrimary);
        }
    };

    constructor() {
        super();
        this.#renderUIPrimary();
    }

    #renderUIPrimary() {
        this.ui.size = "1.1rem";
        this.ui.casl = 1;
        this.ui.mono = 0;
        this.ui.slnt = 0;
    }

    connectedCallback() {}
    disconnectedCallback() {}
}

UIPrimary.register();
