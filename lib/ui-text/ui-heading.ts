import { TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import UIText from "./ui-text";

/**
 * **Tag**: `ui-heading`
 *
 * **Attributes**:
 *  - level: `number` - Range between 1 - 6
 *
 * @extends {UIText}
 */
@customElement("ui-heading")
class UIHeading extends UIText {
    @property({ type: Number, attribute: "level", reflect: true })
    level?: number;

    mono = 0.25;
    casl = 1;
    wght = 750;
    slnt = 0;

    protected render(): TemplateResult<1> {
        switch (this.level) {
            case 6:
                this.size = "0.75rem";
                break;
            case 5:
                this.size = "1rem";
                break;
            case 4:
                this.size = "1.25rem";
                break;
            case 3:
                this.size = "1.5rem";
                break;
            case 2:
                this.size = "1.75rem";
                break;
            case 1:
                this.size = "2rem";
                break;
            default:
                break;
        }

        return super.render();
    }
}

export default UIHeading;
