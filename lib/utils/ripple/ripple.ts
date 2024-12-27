import type { CleanUpFunction } from "../";

export interface RippleOptions {
    color?: string;
    opacity?: string;
    centered?: boolean;
    spreadDuration?: string;
    spreadTiming?: string;
    clearDuration?: string;
    clearTiming?: string;
    usePointer?: boolean;
}

export const defaultOptions: RippleOptions = {
    color: "var(--ui-ripple-color, currentColor)",
    opacity: "var(--ui-ripple-opacity, 0.2)",
    centered: false,
    spreadDuration: ".4s",
    spreadTiming: "linear",
    clearDuration: "1s",
    clearTiming: "ease-in-out",
    usePointer: false,
};

export function create(target: HTMLElement, options?: RippleOptions): CleanUpFunction {
    options = { ...defaultOptions, ...(options || {}) };

    let ripple: HTMLElement | null = null;

    const handlePointerStart = (ev: PointerEvent) => {
        ripple = start(ev, options);
        target.addEventListener("pointermove", handlePointerMove);
    };

    const handlePointerStop = () => {
        target.removeEventListener("pointermove", handlePointerMove);
        stop(ripple);
        ripple = null;
    };

    const handlePointerMove = () => handlePointerStop();

    const handleClick = (ev: MouseEvent) => {
        ripple = start(ev, options);
        stop(ripple);
        ripple = null;
    };

    // ----- //
    // Setup //
    // ----- //

    target.classList.add("ripple-container");
    target.style.overflow = "hidden";

    if (options.usePointer) {
        target.addEventListener("pointerdown", handlePointerStart);
        target.addEventListener("pointerup", handlePointerStop);
        target.addEventListener("pointerleave", handlePointerStop);
    } else {
        target.addEventListener("click", handleClick);
    }

    return () => {
        target.classList.remove("ripple-container");

        if (options.usePointer) {
            target.removeEventListener("pointerdown", handlePointerStart);
            target.removeEventListener("pointerup", handlePointerStop);
            target.removeEventListener("pointerleave", handlePointerStop);
            target.removeEventListener("pointermove", handlePointerMove);
            return;
        }

        target.removeEventListener("click", handleClick);
    };
}

export function start(ev: MouseEvent | PointerEvent, options: RippleOptions): HTMLElement {
    const ripple = document.createElement("div");
    const target = ev.currentTarget as HTMLElement;
    target.appendChild(ripple);

    ripple.classList.add("ripple");

    ripple.style.position = "absolute";
    ripple.style.color = "inherit";
    ripple.style.borderRadius = "50%";
    ripple.style.pointerEvents = "none";
    ripple.style.width = "100px";
    ripple.style.height = "100px";
    ripple.style.marginTop = "-50px";
    ripple.style.marginLeft = "-50px";
    ripple.style.opacity = `${options.opacity}`;
    ripple.style.backgroundColor = `${options.color}`;
    ripple.style.transform = `scale(0) translate(0, 0)`;
    ripple.style.transition =
        `transform ${options.spreadDuration} ${options.spreadTiming} 0s,` +
        `opacity ${options.clearDuration} ${options.clearTiming} 0s`;

    const tR = target.getBoundingClientRect();
    if (options.centered) {
        ripple.style.top = `${tR.height / 2}px`;
        ripple.style.left = `${tR.width / 2}px`;
    } else {
        ripple.style.top = `${ev.clientY - tR.top}px`;
        ripple.style.left = `${ev.clientX - tR.left}px`;
    }

    const scale = Math.max(tR.width, tR.height) * 0.02;
    ripple.style.transform = `scale(${scale}) translate(0, 0)`;

    return ripple;
}

export function stop(ripple: HTMLElement | null): void {
    if (!ripple) return;

    ripple.addEventListener("transitionend", (ev) => {
        if (ev.propertyName === "opacity") {
            ripple.remove();
        }
    });

    ripple.style.opacity = "0";
}
