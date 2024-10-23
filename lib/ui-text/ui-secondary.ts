import { customElement } from "lit/decorators.js";
import UIText from "./ui-text";

/**
 * @element ui-secondary
 *
 * @extends {UIText}
 */
@customElement("ui-secondary")
class UISecondary extends UIText {
    size: string = "0.9rem";
    wght: number = 350;
    slnt: number = -15;
}

export default UISecondary;
