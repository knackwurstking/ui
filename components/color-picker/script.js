// TODO: First query all elements...
//  - Need to allow multiple touch inputs (or should i use pointerevents?)

// These are the elements for the input handlers (x-axis)
const redCircle = document.querySelector(`.color-picker .red .circle`);
const greenCircle = document.querySelector(`.color-picker .green .circle`);
const blueCircle = document.querySelector(`.color-picker .blue .circle`);

// When handling the pointer events, this container are the limits for moving the circles
const rangeContainer = document.querySelector(
    `.color-picker .container .range`,
);

// Manuel (number) inputs
const redInput = document.querySelector(`.color-picker .red input`);
const greenInput = document.querySelector(`.color-picker .green input`);
const blueInput = document.querySelector(`.color-picker .blue input`);
