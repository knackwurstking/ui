import { customElement } from "lit/decorators.js";
import UIText from "./ui-text";

/**
 * **Tag**: `ui-primary`
 *
 * @extends {UIText}
 */
@customElement("ui-primary")
class UIPrimary extends UIText {
    size: string = "1.1rem";
    wght: number = 425;
}

export default UIPrimary;
