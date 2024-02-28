import { rippleStart } from "./start";
import { rippleStop } from "./stop";

/**
 * @typedef RippleOptions
 * @type {import(".").RippleOptions}
 */

/**
 * @param {Element | HTMLElement | Node} el
 * @param {RippleOptions} options 
 */
export function ripple(el, options = {}) {
    /** @type {HTMLElement} */
    let ripple;
    let destroyed = false;

    /** @param {PointerEvent & { currentTarget: HTMLElement }} ev */
    const _rippleStart = (ev) => {
        ripple = rippleStart(ev, { ...options });
    };

    const _rippleStop = () => {
        rippleStop(ripple);
    };

    // Setup ...
    const setup = () => {
        el.classList.add("ripple-container");

        el.addEventListener("pointerdown", _rippleStart);
        el.addEventListener("pointerup", _rippleStop);
        el.addEventListener("pointerleave", _rippleStop);

        destroyed = false;
    }

    const destroy = () => {
        el.classList.remove("ripple-container");

        el.removeEventListener("pointerdown", _rippleStart);
        el.removeEventListener("pointerup", _rippleStop);
        el.removeEventListener("pointerleave", _rippleStop);

        destroyed = true;
    }

    if (options) setup()

    return {
        /**
         * @param {RippleOptions} _options
         */
        update(_options) {
            options = _options;
            if (options && destroyed) setup();
            else if (!(options || destroyed)) destroy();
        },
        destroy,
    }
}
