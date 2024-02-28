/**
 * @param {HTMLElement} ripple
 */
export function rippleStop(ripple) {
    if (ripple) {
        ripple.addEventListener("transitionend", (ev) => {
            if (ev.propertyName === "opacity") {
                ripple.remove();
            }
        });

        ripple.style.opacity = "0";
    }
}
