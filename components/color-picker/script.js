// TODO: First query all elements...
//  - Need to allow multiple touch inputs (or should i use pointerevents?)

// These are the elements for the input handlers (x-axis)
const redCircle = document.querySelector(`.color-picker .red .circle`);
const greenCircle = document.querySelector(`.color-picker .green .circle`);
/** @type {HTMLElement} */
const blueCircle = document.querySelector(`.color-picker .blue .circle`);

const redCircleRect = redCircle.getBoundingClientRect();
const greenCircleRect = greenCircle.getBoundingClientRect();
const blueCircleRect = blueCircle.getBoundingClientRect();

console.debug("circle:", redCircleRect);
console.debug("circle:", greenCircleRect);
console.debug("circle:", blueCircleRect);

// When handling the pointer events, this container are the limits for moving the circles
const redRangeContainer = document.querySelector(`.color-picker .red .range`);
const greenRangeContainer = document.querySelector(
    `.color-picker .green .range`,
);
/** @type {HTMLElement} */
const blueRangeContainer = document.querySelector(`.color-picker .blue .range`);

const redRangeRect = redRangeContainer.getBoundingClientRect();
const greenRangeRect = greenRangeContainer.getBoundingClientRect();
const blueRangeRect = blueRangeContainer.getBoundingClientRect();

console.debug("range:", redRangeRect);
console.debug("range:", greenRangeRect);
console.debug("range:", blueRangeRect);

// Manuel (number) inputs
const redInput = document.querySelector(`.color-picker .red input`);
const greenInput = document.querySelector(`.color-picker .green input`);
const blueInput = document.querySelector(`.color-picker .blue input`);

// NOTE: Need to get px for 0.05rem
// NOTE: Right is 255, Left is 0

const marginX = redRangeRect.right - redCircleRect.right;
console.debug("marginX:", marginX);

// TODO: Input handlers, set circles based on value change

// TODO: Pointer events for "*Circle"(s)
// TODO: And a pointer events for "*CircleRect"(s), for positioning the circle once (pointerdown)

// Range Container

blueRangeContainer.onpointerdown = (ev) => {
    // TODO: Move circle to this position
    console.debug("redRangeContainer pointerdown", ev.clientX, ev.clientY);
};
redRangeContainer.onpointerdown = greenRangeContainer.onpointerdown =
    blueRangeContainer.onpointerdown;

// Circle

redCircle.onpointerdown =
    greenCircle.onpointerdown =
    blueCircle.onpointerdown =
        (ev) => {
            ev.stopPropagation();

            // TODO: start pointer movement handler until pointer up event is called
            console.debug("redCircle: pointerdown", ev.clientX, ev.clientY);
        };
redCircle.onpointerdown = greenCircle.onpointerdown = blueCircle.onpointerdown;

redCircle.onpointermove =
    greenCircle.onpointermove =
    blueCircle.onpointermove =
        (ev) => {
            // TODO: ...
        };
redCircle.onpointermove = greenCircle.onpointermove = blueCircle.onpointermove;

redCircle.onpointerup =
    greenCircle.onpointerup =
    blueCircle.onpointerup =
        (ev) => {
            // TODO: ...
        };
redCircle.onpointerup = greenCircle.onpointerup = blueCircle.onpointerup;
