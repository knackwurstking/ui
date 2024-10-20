import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UIText } from "./ui-text";

/**
 * **Tag**: `ui-primary`
 *
 * @extends {UIText}
 */
@customElement("ui-primary")
export class UIPrimary extends UIText {
    size: string = "1.1rem";
    casl: number = 1;
    mono: number = 0;
    slnt: number = 0;

    protected render() {
        return html`${super.render()}`;
    }
}
