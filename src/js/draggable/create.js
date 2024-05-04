/**
 * @typedef {import(".").DraggableOptions} DraggableOptions
 */

/** @type {DraggableOptions} */
const defaultOptions = {
    onDragStart: null,
    onDragging: null,
    onDragEnd: null,
}

/**
 * @param {HTMLElement} el
 * @param {DraggableOptions} options
 */
export default function create(el, options = {}) {
    options = {
        ...defaultOptions,
        ...options,
    }

    const setup = () => { // {{{
        const children = [...el.parentNode.children]
        const index = children.indexOf(el)

        el.draggable = true

        el.ondragstart = (ev) => { // {{{
            ev.dataTransfer.effectAllowed = "move"
            ev.dataTransfer.dropEffect = "move"

            ev.dataTransfer.setData(
                "text/plain",
                index.toString(),
            )

            if (!!options.onDragStart) options.onDragStart(index)
        } // }}}

        el.ondragover = (ev) => { // {{{
            ev.preventDefault()
            return false
        } // }}}

        el.ondragenter = (ev) => { // {{{
            ev.preventDefault()
            if (!!options.onDragging) options.onDragging(index)
        } // }}}

        el.ondrop = (ev) => { // {{{
            ev.preventDefault()
            ev.dataTransfer.dropEffect = "move";

            const startIndex = parseInt(
                ev.dataTransfer.getData("text/plain"),
                10,
            )

            if (!!options.onDragEnd) options.onDragEnd(startIndex, index)
        } // }}}
    } // }}}

    const destroy = () => { // {{{
        el.draggable = false

        el.ondragstart = null
        el.ondragover = null
        el.ondragenter = null
        el.ondrop = null
    } // }}}

    setup()

    return {
        /**
         * @param {DraggableOptions} _options
         */
        update(_options) {
            options = {
                ...defaultOptions,
                ..._options,
            };
            destroy()
            setup()
        },
        destroy,
    }
}
