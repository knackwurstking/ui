const defaultOptions = {
    color: "currentColor",
    opacity: 0.2,
    centered: false,
    spreadDuration: ".4s",
    spreadTiming: "linear",
    clearDuration: "1s",
    clearTiming: "ease-in-out",
};

/**
 * @param {PointerEvent & { currentTarget: HTMLElement }} ev
 * @param {import(".").RippleOptions} options 
 * @returns {HTMLElement}
 */
export function rippleStart(
    ev,
    options,
) {
    options = { ...defaultOptions, ...options }
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
    ripple.style.transition = `transform ${options.spreadDuration} ${options.spreadTiming} 0s,` +
        `opacity ${options.clearDuration} ${options.clearTiming} 0s`;

    ev.currentTarget.appendChild(ripple);

    const tR = ev.currentTarget.getBoundingClientRect();
    if (options.centered) {
        ripple.style.top = `${tR.height / 2}px`;
        ripple.style.left = `${tR.width / 2}px`;
    } else {
        ripple.style.top = `${ev.clientY - tR.top}px`;
        ripple.style.left = `${ev.clientX - tR.left}px`
    }

    const scale = Math.max(tR.width, tR.height) * 0.02;
    ripple.style.transform = `scale(${scale}) translate(0, 0)`;

    return ripple;
}
