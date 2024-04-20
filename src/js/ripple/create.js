import rippleStart from "./start";
import rippleStop from "./stop";

/**
 * @param {Element | HTMLElement} el
 * @param {import(".").RippleOptions} options will be passed down the the ripple start function
 */
export default function create(el, options = {}) {
    /** @type {HTMLElement} */
    let ripple;

    /** @param {PointerEvent & { currentTarget: HTMLElement }} ev */
    const _rippleStart = (ev) => {
        ripple = rippleStart(ev, options);
    };

    const _rippleStop = () => {
        rippleStop(ripple);
    };

    el.classList.add("ripple-container");
    // @ts-ignore
    el.style.overflow = "hidden";

    el.addEventListener("pointerdown", _rippleStart);
    el.addEventListener("pointerup", _rippleStop);
    el.addEventListener("pointerleave", _rippleStop);

    return () => {
        el.classList.remove("ripple-container");

        el.removeEventListener("pointerdown", _rippleStart);
        el.removeEventListener("pointerup", _rippleStop);
        el.removeEventListener("pointerleave", _rippleStop);
    }
}
