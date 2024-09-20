/**
 * HTML: `ui-alert`
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
    ui: {
        /**
         * @param {object} options
         * @param {string} options.message
         */
        set({ message }: {
            message: string;
        }): void;
        message: any;
        root: UIFlexGridItem;
        flex: string;
    };
    content: UIPrimary;
}
import { UIFlexGridItem } from "../ui-flex-grid";
import { UIPrimary } from "../ui-text";
