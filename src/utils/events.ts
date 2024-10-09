import type { CleanUpFunction } from "../global";

export default class Events<T extends { [key: string]: any }> {
    private listeners: {
        [key: string]: ((e: any) => void | Promise<void>)[];
    } = {};

    add<K extends keyof T>(
        key: K,
        listener: (data: T[K]) => void | Promise<void>,
    ): CleanUpFunction {
        if (!this.listeners[key as string]) {
            this.listeners[key as string] = [];
        }

        this.listeners[key as string].push(listener);

        return () => this.remove(key, listener);
    }

    remove<K extends keyof T>(
        key: K,
        listener: (data: T[K]) => void | Promise<void>,
    ): void {
        if (!this.listeners[key as string]) return;

        this.listeners[key as string] = this.listeners[key as string].filter(
            (l) => l !== listener,
        );
    }

    dispatch<K extends keyof T>(key: K, data: T[K]): void {
        if (!this.listeners[key as string]) return;

        this.listeners[key as string].forEach((l) => l(data));
    }
}
