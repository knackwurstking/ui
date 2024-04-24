import { Events } from "../../js/events";

class Data {
    #events;
    #lang;

    /** @param {Lang} lang */
    constructor(lang) {
        this.#events = new Events();
        this.#lang = lang;
    }
}

export class Lang extends HTMLElement {
    constructor() {
        super();

        this.data = new Data(this);
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }
}
