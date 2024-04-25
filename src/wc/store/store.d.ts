export class Store extends HTMLElement {
    data: Data;
    /** @type {{ [key: string]: any }} */
    stores: {
        [key: string]: any;
    };
    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback(): void;
}
declare class Data {
    /** @param {Store} store */
    constructor(store: Store);
    localStoragePrefix: string;
    enableLocalStorage: boolean;
    /**
     * @param {string} key
     */
    get(key: string): any;
    /**
     * @param {string} key
     * @param {any} data
     * @param {boolean} [useDataAsFallback] Use data as fallback, if nothing found in the browsers `localStorage`
     * `this.enableLocalStorage` flag needs to be set to `true` for this to work
     */
    set(key: string, data: any, useDataAsFallback?: boolean): void;
    /**
     * @param {string} key
     * @param {(data: any) => any} callback
     */
    update(key: string, callback: (data: any) => any): void;
    /**
     * @param {string} key
     * @param {(data: any) => void|Promise<void>} callback
     * @param {boolean} [trigger] - this will run the callback first
     * @returns {() => void} clean up function
     */
    on(key: string, callback: (data: any) => void | Promise<void>, trigger?: boolean): () => void;
    #private;
}
export {};
