// TODO: Create a store package, this replaces the lit ui-store component

import { Events } from "../events";

export class Store<T extends { [key: string]: any }> {
    public prefix: string = "";
    public events: Events<T> = new Events();

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    get() {}

    set() {}

    update() {}

    listen() {}
}
