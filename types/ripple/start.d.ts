/**
 * @param {PointerEvent & { currentTarget: HTMLElement }} ev
 * @param {import(".").RippleOptions} options
 * @returns {HTMLElement}
 */
export default function rippleStart(ev: PointerEvent & {
    currentTarget: HTMLElement;
}, options: import(".").RippleOptions): HTMLElement;
export namespace defaultOptions {
    let color: string;
    let opacity: number;
    let centered: boolean;
    let spreadDuration: string;
    let spreadTiming: string;
    let clearDuration: string;
    let clearTiming: string;
}
