/**
 * @typedef Ripple_Options
 * @type {{
 *  color?: string;
 *  opacity?: string;
 *  centered?: boolean;
 *  spreadDuration?: string;
 *  spreadTiming?: string;
 *  clearDuration?: string;
 *  clearTiming?: string;
 *  useClick?: boolean;
 * }}
 *
 * @typedef {{
 *  update: (options: Ripple_Options) => void;
 *  destroy: () => void;
 * }} Ripple
 */

/** @type {Ripple_Options} */
export const defaultOptions = {
    color: "var(--ui-ripple-fg, currentColor)",
    opacity: "var(--ui-ripple-opacity, 0.2)",
    centered: false,
    spreadDuration: ".4s",
    spreadTiming: "linear",
    clearDuration: "1s",
    clearTiming: "ease-in-out",
    useClick: false,
};

/**
 * @param {Element | HTMLElement} el
 * @param {Ripple_Options} options will be passed down the the ripple start function
 * @returns {Ripple}
 */
export function create(el, options = {}) {
    options = { ...defaultOptions, ...options };

    /** @type {HTMLElement | null} */
    let ripple = null;

    /** @param {PointerEvent & { currentTarget: HTMLElement }} ev */
    const _start = (ev) => {
        ripple = start(ev, options);
    };

    const _stop = () => {
        stop(ripple);
        ripple = null;
    };

    const _move = () => {
        if (!ripple) return;
        _stop();
    };

    /**
     * @param {Event} ev
     */
    const _click = (ev) => {
        // @ts-ignore
        ripple = start(ev, options);
        stop(ripple);
    };

    const setup = () => {
        el.classList.add("ripple-container");
        // @ts-expect-error
        el.style.overflow = "hidden";

        if (options.useClick === true) {
            el.addEventListener("click", _click);
        } else {
            el.addEventListener("pointerdown", _start);
            el.addEventListener("pointerup", _stop);
            el.addEventListener("pointerleave", _stop);
            el.addEventListener("pointermove", _move);
        }
    };

    const destroy = () => {
        el.classList.remove("ripple-container");

        if (options.useClick === true) {
            el.removeEventListener("click", _click);
        } else {
            el.removeEventListener("pointerdown", _start);
            el.removeEventListener("pointerup", _stop);
            el.removeEventListener("pointerleave", _stop);
            el.removeEventListener("pointermove", _move);
        }
    };

    setup();

    return {
        update: (_options) => {
            options = {
                ...options,
                ..._options,
            };
            destroy();
            setup();
        },
        destroy,
    };
}

/**
 * @param {Event & { currentTarget: HTMLElement }} ev
 * @param {Ripple_Options} options
 * @returns {HTMLElement}
 */
export function start(ev, options) {
    const ripple = document.createElement("div");

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

    ev.currentTarget.appendChild(ripple);

    const tR = ev.currentTarget.getBoundingClientRect();
    if (options.centered) {
        ripple.style.top = `${tR.height / 2}px`;
        ripple.style.left = `${tR.width / 2}px`;
    } else {
        // @ts-ignore
        const pos = (!!ev.targetTouches && ev.targetTouches[0]) || ev;
        ripple.style.top = `${pos.clientY - tR.top}px`;
        ripple.style.left = `${pos.clientX - tR.left}px`;
    }

    const scale = Math.max(tR.width, tR.height) * 0.02;
    ripple.style.transform = `scale(${scale}) translate(0, 0)`;

    return ripple;
}

/**
 * @param {HTMLElement} ripple
 */
export function stop(ripple) {
    if (!ripple) return;

    ripple.addEventListener("transitionend", (ev) => {
        if (ev.propertyName === "opacity") {
            ripple.remove();
        }
    });

    ripple.style.opacity = "0";
}
