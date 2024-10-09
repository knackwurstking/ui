import type { CleanUpFunction } from "../global";

export interface RippleOptions {
    color?: string;
    opacity?: string;
    centered?: boolean;
    spreadDuration?: string;
    spreadTiming?: string;
    clearDuration?: string;
    clearTiming?: string;
    useClick?: boolean;
}

export const defaultOptions: RippleOptions = {
    color: "var(--ui-ripple-fg, currentColor)",
    opacity: "var(--ui-ripple-opacity, 0.2)",
    centered: false,
    spreadDuration: ".4s",
    spreadTiming: "linear",
    clearDuration: "1s",
    clearTiming: "ease-in-out",
    useClick: false,
};

export function create(
    target: HTMLElement,
    options?: RippleOptions,
): CleanUpFunction {
    options = { ...defaultOptions, ...(options || {}) };

    let ripple: HTMLElement | null = null;

    const handleStart = (ev: PointerEvent & { currentTarget: HTMLElement }) => {
        ripple = start(ev, options);
        target.addEventListener("pointermove", handleMove);
    };

    const handleStop = () => {
        target.removeEventListener("pointermove", handleMove);
        stop(ripple);
        ripple = null;
    };

    const handleMove = () => handleStop();

    const handleClick = (ev: MouseEvent & { currentTarget: HTMLElement }) => {
        ripple = start(ev, options);
        stop(ripple);
        ripple = null;
    };

    // ----- //
    // Setup //
    // ----- //

    target.classList.add("ripple-container");
    target.style.overflow = "hidden";

    if (options.useClick === true) {
        target.addEventListener("click", handleClick);
    } else {
        target.addEventListener("pointerdown", handleStart);
        target.addEventListener("pointerup", handleStop);
        target.addEventListener("pointerleave", handleStop);
    }

    return () => {
        target.classList.remove("ripple-container");

        if (options.useClick === true) {
            target.removeEventListener("click", handleClick);
            return;
        }

        target.removeEventListener("pointerdown", handleStart);
        target.removeEventListener("pointerup", handleStop);
        target.removeEventListener("pointerleave", handleStop);
        target.removeEventListener("pointermove", handleMove);
    };
}

export function start(
    ev: (MouseEvent | PointerEvent) & { currentTarget: HTMLElement },
    options: RippleOptions,
): HTMLElement {
    const ripple = document.createElement("div");
    ev.currentTarget.appendChild(ripple);

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
    ripple.style.backgroundColor = options.color;
    ripple.style.transform = `scale(0) translate(0, 0)`;
    ripple.style.transition =
        `transform ${options.spreadDuration} ${options.spreadTiming} 0s,` +
        `opacity ${options.clearDuration} ${options.clearTiming} 0s`;

    const tR = ev.currentTarget.getBoundingClientRect();
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

export function stop(ripple: HTMLElement | null) {
    if (!ripple) return;

    ripple.addEventListener("transitionend", (ev) => {
        if (ev.propertyName === "opacity") {
            ripple.remove();
        }
    });

    ripple.style.opacity = "0";
}
