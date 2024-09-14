/**
 * @typedef DraggableNative_Options
 * @type {{
 *  onDragging?: ((index: number) => void | Promise<void>) | null;
 *  onDragStart?: ((index: number) => void | Promise<void>) | null;
 *  onDragEnd?: ((index: number) => void | Promise<void>) | null;
 * }}
 */

/**
 * @param {HTMLElement} container
 * @param {HTMLElement} el
 * @param {DraggableNative_Options} options
 */
export default function createNative(
    container,
    el,
    { onDragStart = null, onDragging = null, onDragEnd = null } = {},
) {
    const setup = () => {
        const children = [...container.children];
        const childIndex = children.indexOf(el);

        el.draggable = true;

        el.ondragstart = (ev) => {
            ev.dataTransfer.effectAllowed = "move";
            ev.dataTransfer.dropEffect = "move";
            if (!!onDragStart) onDragStart(childIndex);
        };

        el.ondragover = (ev) => {
            ev.preventDefault();
            return false;
        };

        el.ondragenter = (ev) => {
            ev.preventDefault();

            [...container.children].forEach(
                (/** @type {HTMLElement} */ c, ci) => {
                    if (ci === childIndex) {
                        c.style.background = "var(--ui-primary)";
                        c.style.color = "var(--ui-primary-fg)";

                        return;
                    }

                    c.style.background = "inherit";
                    c.style.color = "inherit";
                },
            );

            if (!!onDragging) onDragging(childIndex);
        };

        el.ondrop = (ev) => {
            ev.preventDefault();
            ev.dataTransfer.dropEffect = "move";
            if (!!onDragEnd) onDragEnd(childIndex);

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
         * @param {DraggableNative_Options} options
         */
        update(options) {
            if (Object.hasOwn(options, "onDragStart"))
                onDragStart = options.onDragStart;
            if (Object.hasOwn(options, "onDragging"))
                onDragging = options.onDragStart;
            if (Object.hasOwn(options, "onDragEnd"))
                onDragEnd = options.onDragEnd;
        },

        destroy,
    };
}
