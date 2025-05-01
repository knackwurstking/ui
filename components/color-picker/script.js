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

circles.forEach((circle) => {
    circle.addEventListener("pointerdown", startMove);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", endMove);
});

/**
 * @param {PointerEvent} ev
 */
function startMove(ev) {
    ev.preventDefault();
}

/**
 * @param {PointerEvent} ev
 */
function move(ev) {
    // TODO: Move the circle around (x-axis)
}

/**
 * @param {PointerEvent} ev
 */
function endMove(ev) {
    ev.preventDefault();
    // ...
}
