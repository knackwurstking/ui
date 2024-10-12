import type { CleanUpFunction } from "../../global";

const defaultOptions: DraggableNativeOptions = {
    onDragStart: null,
    onDragging: null,
    onDragEnd: null,
};

export interface DraggableNativeOptions {
    onDragging?: ((index: number) => void | Promise<void>) | null;
    onDragStart?: ((index: number) => void | Promise<void>) | null;
    onDragEnd?: ((index: number) => void | Promise<void>) | null;
}

export function createNative(
    container: HTMLElement,
    child: HTMLElement,
    options?: DraggableNativeOptions,
): CleanUpFunction {
    options = { ...defaultOptions, ...options };

    // ----- //
    // Setup //
    // ----- //

    const childIndex: number = (
        [...container.children] as HTMLElement[]
    ).indexOf(child);

    child.draggable = true;

    child.ondragstart = (ev) => {
        if (!!ev.dataTransfer) {
            ev.dataTransfer.effectAllowed = "move";
            ev.dataTransfer.dropEffect = "move";
        }

        container.classList.add("dragging");
        if (!!options.onDragStart) options.onDragStart(childIndex);
    };

    child.ondragover = (ev) => {
        ev.preventDefault();
        return false;
    };

    child.ondragenter = (ev) => {
        ev.preventDefault();

        ([...container.children] as HTMLElement[]).forEach((c, ci) => {
            if (ci === childIndex) {
                c.style.background = "hsl(var(--ui-hsl-primary))";
                c.style.color = "hsl(var(--ui-hsl-primary-fg))";

                return;
            }

            c.style.background = "inherit";
            c.style.color = "inherit";
        });

        if (!!options.onDragging) options.onDragging(childIndex);
    };

    child.ondrop = (ev) => {
        ev.preventDefault();

        if (!!ev.dataTransfer) {
            ev.dataTransfer.dropEffect = "move";
        }

        container.classList.remove("dragging");
        if (!!options.onDragEnd) options.onDragEnd(childIndex);

        ([...container.children] as HTMLElement[]).forEach((c) => {
            c.style.background = "inherit";
            c.style.color = "inherit";
            return;
        });
    };

    // Return a cleanup function
    return () => {
        child.draggable = false;

        child.ondragstart = null;
        child.ondragover = null;
        child.ondragenter = null;
        child.ondrop = null;
    };
}
