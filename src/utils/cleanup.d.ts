export default class CleanUp {
    /**
     * @type {((() => void|Promise<void>) | null)[]}
     */
    callbacks: ((() => void | Promise<void>) | null)[];
    /**
     * @param {(() => void|Promise<void>)[]} cb
     */
    add(...cb: (() => void | Promise<void>)[]): void;
    run(): void;
}
