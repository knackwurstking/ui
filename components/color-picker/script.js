// These are the elements for the input handlers (x-axis)
/** @type {[HTMLElement, HTMLElement, HTMLElement]} */
const sliders = [
    document.querySelector(`.color-picker .red`),
    document.querySelector(`.color-picker .green`),
    document.querySelector(`.color-picker .blue`),
];

/** @type {[HTMLElement, HTMLElement, HTMLElement]} */
const circles = [
    sliders[0].querySelector(`.circle`),
    sliders[1].querySelector(`.circle`),
    sliders[2].querySelector(`.circle`),
];

/** @type {[HTMLElement, HTMLElement, HTMLElement]} */
const rangeContainers = [
    sliders[0].querySelector(`.range`),
    sliders[1].querySelector(`.range`),
    sliders[2].querySelector(`.range`),
];

/** @type {[HTMLInputElement, HTMLInputElement, HTMLInputElement]} */
const inputs = [
    sliders[0].querySelector(`input`),
    sliders[1].querySelector(`input`),
    sliders[2].querySelector(`input`),
];

// NOTE: Need to get px for 0.05rem
// NOTE: Right is 255, Left is 0

// Circles

circles.forEach((circle, index) => {
    /** @type {DOMRect} */
    let rR;
    /** @type {DOMRect} */
    let cR;
    /** @type {number} */
    let xM = 1;

    /** @type {number | null} */
    let currentPointerID = null;

    let noneSelectBackup = false;
    let touchActionBackup = "";

    function updateRects() {
        rR = rangeContainers[index].getBoundingClientRect();
        cR = circles[index].getBoundingClientRect();
    }

    /**
     * @returns {Record<"trackWidth" | "maxRange" | "minRange" | "circleRadius", number>}
     */
    function basicCalculations() {
        const trackWidth = rR.width - cR.width - xM * 2;
        const maxRange = (trackWidth - cR.width) / (trackWidth / 100); // color: 0, circles border width is 2px
        const minRange = 100 - (trackWidth - xM) / (trackWidth / 100); // color: 255

        const circleRadius = (cR.right - cR.left) / 2;

        return {
            trackWidth,
            maxRange,
            minRange,
            circleRadius,
        };
    }

    /**
     * @param {PointerEvent} ev
     */
    const pointerMove = (ev) => {
        if (currentPointerID === ev.pointerId) {
            const c = basicCalculations();

            let right =
                (c.trackWidth - (ev.clientX - rR.left - xM)) /
                (c.trackWidth / 100);

            if (right >= c.maxRange) {
                right = c.maxRange;
            } else if (right <= c.minRange) {
                right = c.minRange;
            }

            circle.style.right = `${right}%`;

            const min = (100 - c.maxRange) * (c.trackWidth / 100); // 0
            const max = (100 - c.minRange) * (c.trackWidth / 100); // 255
            const current = (100 - right) * (c.trackWidth / 100);
            inputs[index].value =
                `${Math.round(((current - min) / ((max - min) / 100)) * 2.55)}`;
        }
    };

    const pointerEnd = (/** @type {PointerEvent} */ ev) => {
        if (currentPointerID === ev.pointerId) {
            currentPointerID = null;
            window.removeEventListener("pointermove", pointerMove);
            window.removeEventListener("pointerup", pointerEnd);

            if (!noneSelectBackup) {
                document.body.classList.remove("ui-none-select");
            }

            sliders[index].style.touchAction = touchActionBackup;
        }
    };

    const pointerStart = (/** @type {PointerEvent} */ ev) => {
        if (currentPointerID === ev.pointerId) {
            return;
        }
        ev.preventDefault();

        currentPointerID = ev.pointerId;
        noneSelectBackup = document.body.classList.contains("ui-none-select");
        document.body.classList.add("ui-none-select");

        touchActionBackup = document.body.style.touchAction;
        sliders[index].style.touchAction = "none";

        updateRects();

        window.addEventListener("pointerup", pointerEnd);
        window.addEventListener("pointermove", pointerMove);
    };

    circle.addEventListener("pointerdown", pointerStart);

    inputs[index].addEventListener(
        "change",
        (
            /** @type {PointerEvent & { currentTarget: HTMLInputElement }} */ ev,
        ) => {
            updateRects();
            const c = basicCalculations();

            let value = parseInt(ev.currentTarget.value || "0", 10);
            if (value < 0) {
                value = 0;
                ev.currentTarget.value = value.toString();
            } else if (value > 255) {
                value = 255;
                ev.currentTarget.value = value.toString();
            }

            circle.style.right = `${100 - (100 - (100 - c.maxRange) - c.minRange) / (255 / value) - cR.width / (c.trackWidth / 100)}%`;
        },
    );
});
