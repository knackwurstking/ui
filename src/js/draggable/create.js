/**
 * @typedef {import(".").DraggableOptions} DraggableOptions
 */

/** @type {DraggableOptions} */
const defaultOptions = {
  onDragStart: null,
  onDragging: null,
  onDragEnd: null,
};

/**
 * @param {HTMLElement} container
 * @param {HTMLElement} el
 * @param {DraggableOptions} options
 */
export default function create(container, el, options = {}) {
  options = {
    ...defaultOptions,
    ...options,
  };

  const setup = () => {
    const children = [...container.children];
    const childIndex = children.indexOf(el);

    el.draggable = true;

    el.ondragstart = (ev) => {
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.dropEffect = "move";
      if (!!options.onDragStart) options.onDragStart(childIndex);
    };

    el.ondragover = (ev) => {
      ev.preventDefault();
      return false;
    };

    el.ondragenter = (ev) => {
      ev.preventDefault();

      [...container.children].forEach((/** @type {HTMLElement} */ c, ci) => {
        if (ci === childIndex) {
          c.style.background = "var(--ui-primary-bgColor)";
          c.style.color = "var(--ui-primary-color)";

          return;
        }

        c.style.background = "inherit";
        c.style.color = "inherit";
      });

      if (!!options.onDragging) options.onDragging(childIndex);
    };

    el.ondrop = (ev) => {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move";
      if (!!options.onDragEnd) options.onDragEnd(childIndex);

      [...container.children].forEach((/**@type{HTMLElement}*/ c) => {
        c.style.background = "inherit";
        c.style.color = "inherit";
        return;
      });
    };
  };

  const destroy = () => {
    el.draggable = false;

    el.ondragstart = null;
    el.ondragover = null;
    el.ondragenter = null;
    el.ondrop = null;
  };

  setup();

  return {
    /**
     * @param {DraggableOptions} _options
     */
    update(_options) {
      options = {
        ...defaultOptions,
        ..._options,
      };
      destroy();
      setup();
    },
    destroy,
  };
}
