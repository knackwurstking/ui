export class UILangType extends HTMLElement {
    static register: () => void;
    ui: {
        /** @private */
        root: this;
        getName(): string;
        /**
         * @param {string | null} value
         */
        setName(value: string | null): void;
        getHref(): string;
        /**
         * @param {string | null} value
         */
        setHref(value: string | null): void;
        getFallback(): boolean;
        /**
         * @param {boolean} state
         */
        setFallback(state: boolean): void;
    };
}
