import { customElement } from "lit/decorators.js";
import { UIText } from "./ui-text";
import type { PropertyValues } from "lit";

@customElement("ui-secondary")
export class UISecondary extends UIText {
    update(changedProperties: PropertyValues): void {
        super.update(changedProperties);

        this.size = "0.9rem";
        this.casl = 1;
        this.mono = 0;
        this.slnt = -15;
    }
}
