import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UIText } from "./ui-text";

/**
 * **Tag**: `ui-secondary`
 *
 * @extends {UIText}
 */
@customElement("ui-secondary")
export class UISecondary extends UIText {
    size: string = "0.9rem";
    casl: number = 1;
    mono: number = 0;
    slnt: number = -15;

    protected render() {
        return html`${super.render()}`;
    }
}
