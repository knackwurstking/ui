// These are the elements for the input handlers (x-axis)
/** @type {[HTMLElement, HTMLElement, HTMLElement]} */
const circles = [
    document.querySelector(`.color-picker .red .circle`),
    document.querySelector(`.color-picker .green .circle`),
    document.querySelector(`.color-picker .blue .circle`),
];

/** @type {[DOMRect, DOMRect, DOMRect]} */
const rectCircles = [
    circles[0].getBoundingClientRect(),
    circles[1].getBoundingClientRect(),
    circles[2].getBoundingClientRect(),
];

/** @type {[HTMLElement, HTMLElement, HTMLElement]} */
const rangeContainers = [
    document.querySelector(`.color-picker .red .range`),
    document.querySelector(`.color-picker .green .range`),
    document.querySelector(`.color-picker .blue .range`),
];

/** @type {[DOMRect, DOMRect, DOMRect]} */
const rectRangeContainers = [
    rangeContainers[0].getBoundingClientRect(),
    rangeContainers[1].getBoundingClientRect(),
    rangeContainers[2].getBoundingClientRect(),
];

/** @type {[HTMLInputElement, HTMLInputElement, HTMLInputElement]} */
const inputs = [
    document.querySelector(`.color-picker .red input`),
    document.querySelector(`.color-picker .green input`),
    document.querySelector(`.color-picker .blue input`),
];

// NOTE: Need to get px for 0.05rem
// NOTE: Right is 255, Left is 0

const xCircleMargins = [
    rectRangeContainers[0].right - rectCircles[0].right,
    rectRangeContainers[1].right - rectCircles[1].right,
    rectRangeContainers[2].right - rectCircles[2].right,
];

// Range Container

// TODO: Move circle to position clientX
//blueRangeContainer.onpointerdown = (ev) => {
//    console.debug("rangeContainer pointerdown", ev.clientX);
//};

// Circles

circles.forEach((circle, circleIndex) => {
    let movementlock = true;

    /**
     * @param {PointerEvent} ev
     */
    const pointerMove = (ev) => {
        if (movementlock) return;
        move(circleIndex, ev.clientX, ev.clientY);
    };

    const pointerEnd = () => {
        movementlock = true;

        if (!noneSelectBackup) {
            document.body.classList.remove("ui-none-select");
        }

        document.body.style.touchAction = touchActionBackup;

        window.removeEventListener("pointermove", pointerMove);
        window.removeEventListener("pointerup", pointerEnd);
    };

    let noneSelectBackup = "";
    let touchActionBackup = "";

    /**
     * @param {PointerEvent} ev
     */
    const pointerStart = () => {
        if (!movementlock) return;
        movementlock = false;

        noneSelectBackup = document.body.classList.contains("ui-none-select");
        document.body.classList.add("ui-none-select");

        touchActionBackup = document.body.style.touchAction;
        document.body.style.touchAction = "none";

        window.addEventListener("pointermove", pointerMove);
        window.addEventListener("pointerup", pointerEnd);
    };

    circle.addEventListener("pointerdown", pointerStart);
});

/**
 * @param {number} circleIndex
 * @param {number} x
 * @param {number} y
 * @returns {void}
 */
function move(circleIndex, x) {
    /** Range Rect */
    const rR = rectRangeContainers[circleIndex];
    /** Circle Rect */
    const cR = rectCircles[circleIndex];
    /** x (Circle) Margin */
    const xM = xCircleMargins[circleIndex];

    const xLeft = rR.left + xM;
    const xRight = rR.right + xM;

    if (cR.left <= xLeft || cR.right >= xRight) {
        // There is nothing to move anymore, you hit the limits
        return;
    }

    const cRadius = (cR.right - cR.left) / 2;
    const circle = circles[circleIndex];

    if (x - cRadius <= xLeft) {
        // Just move to the limit and return (.05rem === x-margin)
        circle.style.right = `calc(100% - 0.1rem)`;
        circle.style.transform = `translateX(+100%)`;
        return;
    }
    if (x + cRadius >= xRight) {
        // Just move to the limit and return (.05rem === x-margin)
        circle.style.right = `calc(0.05rem)`;
        circle.style.transform = "";
        return;
    }

    //circle.style.right = `${x + cR.right - cR.left + cRadius}px`;
    circle.style.transform = `none`;
    circle.style.right = `${cR.right - x - cRadius}px`; // TODO: Calc percentage here
}
