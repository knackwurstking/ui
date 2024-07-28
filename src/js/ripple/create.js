import rippleStart from "./start";
import rippleStop from "./stop";

/**
 * @typedef {import(".").RippleOptions} RippleOptions
 */

/** @type {RippleOptions} */
export const defaultOptions = {
  color: "var(--ui-ripple-color, currentColor)",
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
 * @param {import(".").RippleOptions} options will be passed down the the ripple start function
 */
export default function create(el, options = {}) {
  options = { ...defaultOptions, ...options };

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
  // @ts-expect-error
  el.style.overflow = "hidden";

  if (options.useClick === true) {
    el.addEventListener("click", (ev) => {
      // @ts-ignore
      ripple = rippleStart(ev, options);
      rippleStop(ripple);
    });
  } else {
    el.addEventListener("pointerdown", _rippleStart);
    el.addEventListener("pointerup", _rippleStop);
    el.addEventListener("pointerleave", _rippleStop);
  }

  return () => {
    el.classList.remove("ripple-container");

    el.removeEventListener("pointerdown", _rippleStart);
    el.removeEventListener("pointerup", _rippleStop);
    el.removeEventListener("pointerleave", _rippleStop);
  };
}
