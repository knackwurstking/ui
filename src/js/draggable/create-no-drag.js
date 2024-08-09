/**
 * @param {HTMLElement} container
 */
export default function createNoDrag(container) {
  /** @type {HTMLElement} */
  let elPlacing = null;
  /** @type {HTMLElement} */
  let elMoving = null;

  /** @param {Event & TouchEvent & MouseEvent & { target: HTMLElement }} ev */
  const moveStart = (ev) => {
    if (
      !elMoving &&
      !elPlacing &&
      Array.from(ev.target.classList).includes("draggable")
    ) {
      const pos = (!!ev.targetTouches && ev.targetTouches[0]) || ev;

      elPlacing = ev.target;

      // @ts-ignore
      container.append((elMoving = ev.target.cloneNode(true)));
      elMoving.className = "dragging";

      const x = pos.pageX - elMoving.offsetWidth / 2 + "px";
      const y = pos.pageY - elMoving.offsetHeight / 2 + "px";
      elMoving.style.willChange = "transform";
      elMoving.style.transform = `translate(${x}, ${y})`;
    }
  };

  /** @param {Event & TouchEvent & MouseEvent & { target: HTMLElement }} ev */
  const move = (ev) => {
    if (!!elMoving && !!elPlacing) {
      const pos = (!!ev.targetTouches && ev.targetTouches[0]) || ev;

      const x = pos.pageX - elMoving.offsetWidth / 2 + "px";
      const y = pos.pageY - elMoving.offsetHeight / 2 + "px";
      elMoving.style.transform = `translate(${x}, ${y})`;

      /** @type {Element | null} */
      const target =
        Array.from(
          document.elementFromPoint(pos.clientX, pos.clientY).children,
        ).find((child) => {
          return child.classList.contains("draggable");
        }) || null;

      if (!!target) {
        insertElement(elPlacing, target);
      }
    }
  };

  /** @param {Event & TouchEvent & MouseEvent & { target: HTMLElement }} ev */
  const moveEnd = (ev) => {
    // TODO: ...
  };

  /**
   * @param {Element} elPlacing
   * @param {Element} target
   */
  function insertElement(elPlacing, target) {
    throw new Error("Function not implemented."); // TODO: ...
  }

  Array.from(container.children).forEach((/** @type {HTMLElement} */ child) => {
    child.classList.add("draggable");

    child.onmousedown = moveStart;
    child.ontouchstart = moveStart;

    child.onmousemove = move;
    child.ontouchmove = move;

    child.onmouseup = moveEnd;
    child.ontouchend = moveEnd;
  });
}
