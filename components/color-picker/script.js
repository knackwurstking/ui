// These are the elements for the input handlers (x-axis)
/** @type {[HTMLElement, HTMLElement, HTMLElement]} */
const circles = [
    document.querySelector(`.color-picker .red .circle`),
    document.querySelector(`.color-picker .green .circle`),
    document.querySelector(`.color-picker .blue .circle`),
];

/** @type {[HTMLElement, HTMLElement, HTMLElement]} */
const rangeContainers = [
    document.querySelector(`.color-picker .red .range`),
    document.querySelector(`.color-picker .green .range`),
    document.querySelector(`.color-picker .blue .range`),
];

/** @type {[HTMLInputElement, HTMLInputElement, HTMLInputElement]} */
const inputs = [
    document.querySelector(`.color-picker .red input`),
    document.querySelector(`.color-picker .green input`),
    document.querySelector(`.color-picker .blue input`),
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

    let noneSelectBackup = "";
    let touchActionBackup = "";

    /**
     * @param {PointerEvent} ev
     */
    const pointerMove = (ev) => {
        const circle = circles[index];

        const circleRadius = (cR.right - cR.left) / 2;
        const rightPosPx = rR.right + xM - (ev.clientX + circleRadius);

        const trackWidth = rR.width - cR.width + xM * 2;

        let right = 100 - (trackWidth - rightPosPx) / (trackWidth / 100);
        const rightMax = (trackWidth - cR.width) / (trackWidth / 100); // color: 0, circles border width is 2px
        const rightMin = 100 - (trackWidth - xM) / (trackWidth / 100); // color: 255

        if (right >= rightMax) {
            right = rightMax;
        } else if (right <= rightMin) {
            right = rightMin;
        }

        circle.style.right = `${right}%`;

        const min = (100 - rightMax) * (trackWidth / 100); // 0
        const max = (100 - rightMin) * (trackWidth / 100); // 255
        const current = (100 - right) * (trackWidth / 100);
        inputs[index].value =
            `${Math.round(((current - min) / ((max - min) / 100)) * 2.55)}`;
    };

    const pointerEnd = (ev) => {
        ev.preventDefault();

        window.removeEventListener("pointermove", pointerMove);
        window.removeEventListener("pointerup", pointerEnd);

        if (!noneSelectBackup) {
            document.body.classList.remove("ui-none-select");
        }

        document.body.style.touchAction = touchActionBackup;
    };

    const pointerStart = (ev) => {
        ev.preventDefault();

        noneSelectBackup = document.body.classList.contains("ui-none-select");
        document.body.classList.add("ui-none-select");

        touchActionBackup = document.body.style.touchAction;
        document.body.style.touchAction = "none";

        rR = rangeContainers[index].getBoundingClientRect();
        cR = circles[index].getBoundingClientRect();

        window.addEventListener("pointerup", pointerEnd);
        window.addEventListener("pointermove", pointerMove);
    };

    //rangeContainers[index].addEventListener("pointerdown", (ev) => {
    //    pointerStart();
    //    move(index, ev.clientX, xM);
    //});

    circle.addEventListener("pointerdown", pointerStart);
});
