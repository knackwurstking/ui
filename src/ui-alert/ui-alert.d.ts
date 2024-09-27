/**
 * @typedef {"info" | "error"} UIAlert_Variants
 *
 * @typedef {{
 *  message: string;
 *  variant: UIAlert_Variants;
 * }} UIAlert_Options
 */
/**
 * HTML: `ui-alert`
 *
 * Attributes:
 *  - __message__: *string*
 *  - __variant__: *info | error*
 */
export class UIAlert extends UIFlexGridItem {
    static get observedAttributes(): string[];
    /**
     * @param {UIAlert_Options} [options]
     */
    constructor(options?: UIAlert_Options);
    /**
     * @type {{
     *  info: string;
     *  error: string;
     * }}
     */
    styleVariants: {
        info: string;
        error: string;
    };
    ui: {
        root: this;
        /**
         * @param {UIAlert_Options | null} options
         */
        set(options: UIAlert_Options | null): void;
        message: string;
        variant: UIAlert_Variants;
        flex: string;
    };
    #private;
}
export type UIAlert_Variants = "info" | "error";
export type UIAlert_Options = {
    message: string;
    variant: UIAlert_Variants;
};
import { UIFlexGridItem } from "../ui-flex-grid";
