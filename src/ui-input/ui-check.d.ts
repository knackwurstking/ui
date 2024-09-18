/**
 * @typedef UICheck_Events
 * @type {{
 *  change: boolean;
 *  input: boolean;
 * }}
 */
/**
 * HTML: `ui-check`
 *
 * Attributes:
 *  - **checked**: `boolean`
 *
 * @template {UICheck_Events} [E=UICheck_Events]
 */
export class UICheck<E extends UICheck_Events = UICheck_Events> extends HTMLElement {
    static register: () => void;
    static observedAttributes: string[];
    constructor();
    ui: {
        /** @type {Events<E>} */
        events: Events<E>;
        /**
         * @type {HTMLInputElement | null}
         */
        input: HTMLInputElement | null;
        checked: boolean;
    };
    shadowRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @param {string} name
     * @param {string | null} _oV
     * @param {string | null} nV
     */
    attributeChangedCallback(name: string, _oV: string | null, nV: string | null): void;
}
export type UICheck_Events = {
    change: boolean;
    input: boolean;
};
import { Events } from "../utils";
