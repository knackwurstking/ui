/**
 * @param {HTMLElement} container
 * @param {object} options
 * @param {(() => void|Promise<void>) | null} [options.onDragEnd]
 * @param {(() => void|Promise<void>) | null} [options.onDragStart]
 */
export default function createMobile(
  container,
  { onDragEnd = null, onDragStart = null },
) {
  /** @type {HTMLElement} */
  let originTarget = null;
  /** @type {number | null} */
  let start = null;
  /** @type {NodeJS.Timeout | null} */
  let timeout = null;
  /** @type {boolean} */
  let dragRunning = false;
  /** @type {string | null} */
  let backupColor = null;
  /** @type {string | null} */
  let backupBGColor = null;

  /** @param {Event & TouchEvent & MouseEvent & { currentTarget: HTMLElement }} ev */
  const moveStart = (ev) => {
    if (
      !originTarget &&
      Array.from(ev.currentTarget.classList).includes("draggable")
    ) {
      start = new Date().getTime();
      originTarget = ev.currentTarget;

      if (!timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        backupColor = originTarget.style.color;
        backupBGColor = originTarget.style.backgroundColor;
        originTarget.style.color = "var(--ui-primary-color)";
        originTarget.style.backgroundColor = "var(--ui-primary-bgColor)";

        dragRunning = true;
        if (!!onDragStart) onDragStart();
      }, 250);
    }
  };

  /** @param {TouchEvent & MouseEvent & { currentTarget: HTMLElement }} ev */
  const move = (ev) => {
    if (!start || !originTarget) return;

    if (new Date().getTime() - start < 250) {
      moveEnd();
      return;
    }

    ev.preventDefault();
    if (!dragRunning) {
      dragRunning = true;
      if (!!onDragStart) onDragStart();
    }

    const pos = (!!ev.targetTouches && ev.targetTouches[0]) || ev;
    let target = document.elementFromPoint(pos.clientX, pos.clientY);
    while (!target.classList.contains("draggable")) {
      if (!target.parentElement) break;
      target = target.parentElement;
    }

    if (target.classList.contains("draggable")) {
      insertElement(originTarget, target);
    }
  };

  const moveEnd = () => {
    if (!dragRunning) return;
    clearTimeout(timeout);
    timeout = null;

    originTarget.style.color = backupColor;
    originTarget.style.backgroundColor = backupBGColor;

    originTarget = null;
    start = null;
    dragRunning = false;

    if (!!onDragEnd) onDragEnd();
  };

  /**
   * @param {Element} elPlacing
   * @param {Element} target
   */
  function insertElement(elPlacing, target) {
    if (isBefore(elPlacing, target)) {
      container.insertBefore(elPlacing, target);
    } else {
      container.insertBefore(elPlacing, target.nextElementSibling);
    }
  }

  /**
   * @param {Element} el
   * @param {Element} target
   */
  function isBefore(el, target) {
    let sibling = el.previousElementSibling;
    while (!!sibling) {
      if (sibling === target) {
        return true;
      }
      sibling = sibling.previousElementSibling;
    }
    return false;
  }

  const setup = () => {
    Array.from(container.children).forEach(
      (/** @type {HTMLElement} */ child) => {
        child.classList.add("draggable");

        child.onmousedown = moveStart;
        child.ontouchstart = moveStart;

        child.onmousemove = move;
        child.ontouchmove = move;

        child.onmouseup = moveEnd;
        child.ontouchend = moveEnd;
      },
    );
  };

  setup();

  return {
    destroy: () => {
      Array.from(container.children).forEach(
        (/** @type {HTMLElement} */ child) => {
          child.classList.remove("draggable");

          child.onmousedown = null;
          child.ontouchstart = null;

          child.onmousemove = null;
          child.ontouchmove = null;

          child.onmouseup = null;
          child.ontouchend = null;
        },
      );
    },
  };
}
