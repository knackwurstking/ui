export class CleanUp {
    private callbacks: (() => void | Promise<void>)[] = [];

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
