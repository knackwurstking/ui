export type CleanUpFunction = () => void | Promise<void>;

export class CleanUp {
    private callbacks: CleanUpFunction[] = [];

    add(...cb: (() => void | Promise<void>)[]): void {
        this.callbacks.push(...cb);
    }

    run(): void {
        this.callbacks.filter((c) => {
            c();
            return false;
        });
    }
}
