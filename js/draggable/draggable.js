
/**
 * @param {HTMLElement} el
 * @param {import("./index.js").DraggableOptions} options
 */
export function draggable(el, { ondragging = null, ondragend = null }) {
    const children = [...el.parentNode.children]
    const index = children.indexOf(el)

    el.draggable = true

    el.ondragstart = (ev) => {
        ev.dataTransfer.effectAllowed = "move"
        ev.dataTransfer.dropEffect = "move"

        ev.dataTransfer.setData(
            "text/plain",
            index.toString(),
        )
    }

    el.ondragover = (ev) => {
        ev.preventDefault()
        return false
    }

    el.ondragenter = (ev) => {
        ev.preventDefault()
        if (!!ondragging) ondragging(index)
    }

    el.ondrop = (ev) => {
        ev.preventDefault()
        ev.dataTransfer.dropEffect = "move";

        const startIndex = parseInt(
            ev.dataTransfer.getData("text/plain"),
            10,
        )

        if (!!ondragend) ondragend(startIndex, index)
    }
}
