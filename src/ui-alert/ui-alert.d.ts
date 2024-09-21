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
     * @param {object} [options]
     * @param {string} options.message
     */
    constructor(options?: {
        message: string;
    });
    /**
     * @type {HTMLElement}
     */
    messageContainer: HTMLElement;
    styleVariants: {
        info: any;
        error: any;
    };
    ui: {
        /**
         * @param {object} options
         * @param {string} options.message
         */
        set({ message }: {
            message: string;
        }): void;
        message: string;
        variant: "error" | "info";
        root: UIFlexGridItem;
        flex: string;
    };
    #private;
}
import { UIFlexGridItem } from "../ui-flex-grid";
