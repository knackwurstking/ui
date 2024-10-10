import type { CleanUpFunction } from "../../global";

const defaultOptions: DraggableMobileOptions = {
    onDragStart: null,
    onDragEnd: null,
};

export interface DraggableMobileOptions {
    onDragStart?: () => void | Promise<void>;
    onDragEnd?: () => void | Promise<void>;
}

/**
 * @param {HTMLElement} container
 * @param {DraggableMobile_Options} options
 */
export function createMobile(
    container: HTMLElement,
    options?: DraggableMobileOptions,
): CleanUpFunction {
    options = { ...defaultOptions, ...options };

    let originTarget: HTMLElement | null = null;
    let startTime: number | null = null;
    let startX: number | null = null;
    let startY: number | null = null;
    let timeout: NodeJS.Timeout | null = null;
    let dragRunning: boolean = false;
    let backupColor: string | null = null;
    let backupBGColor: string | null = null;

    const moveStart = (
        ev: Event & TouchEvent & MouseEvent & { currentTarget: HTMLElement },
    ) => {
        if (
            !originTarget &&
            Array.from(ev.currentTarget.classList).includes("draggable")
        ) {
            startX = ev.clientX;
            startY = ev.clientY;
            startTime = new Date().getTime();
            originTarget = ev.currentTarget;

            if (!timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                backupColor = originTarget.style.color;
                backupBGColor = originTarget.style.backgroundColor;

                originTarget.style.color = "var(--ui-primary-fg)";
                originTarget.style.backgroundColor = "var(--ui-primary)";

                container.classList.add("dragging");

                dragRunning = true;
                if (!!options.onDragStart) options.onDragStart();
            }, 200);
        }
    };

    const move = (
        ev: TouchEvent & MouseEvent & { currentTarget: HTMLElement },
    ) => {
        if (!startTime || !originTarget) return;

        if (!dragRunning) {
            if (new Date().getTime() - startTime < 200) {
                const diffX = Math.abs(startX - ev.clientX);
                const diffY = Math.abs(startY - ev.clientY);
                const diff = diffX > diffY ? diffX : diffY;
                if (diff < 24) {
                    return;
                }

                moveEnd();
                return;
            }
        }

        ev.preventDefault();

        if (!dragRunning) {
            dragRunning = true;
            if (!!options.onDragStart) options.onDragStart();
        }

        const pos = (!!ev.targetTouches && ev.targetTouches[0]) || ev;
        let target = document.elementFromPoint(pos.clientX, pos.clientY);
        while (!target.classList.contains("draggable")) {
            if (!target.parentElement) break;
            target = target.parentElement;
        }

        if (target.classList.contains("draggable")) {
            const isBefore = () => {
                let sibling = originTarget.previousElementSibling;
                while (!!sibling) {
                    if (sibling === target) {
                        return true;
                    }
                    sibling = sibling.previousElementSibling;
                }
                return false;
            };

            if (isBefore()) {
                container.insertBefore(originTarget, target);
            } else {
                container.insertBefore(originTarget, target.nextElementSibling);
            }
        }
    };

    const moveEnd = () => {
        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
        }

        if (!!originTarget) {
            originTarget.style.color = backupColor;
            originTarget.style.backgroundColor = backupBGColor;
            originTarget = null;
        }

        startTime = null;
        container.classList.remove("dragging");

        if (!dragRunning) return;

        dragRunning = false;
        if (!!options.onDragEnd) options.onDragEnd();
    };

    // ----- //
    // Setup //
    // ----- //

    Array.from(container.children).forEach((child: HTMLElement) => {
        child.classList.add("draggable");

        child.onmousedown = moveStart;
        child.ontouchstart = moveStart;

        child.onmousemove = move;
        child.ontouchmove = move;

        child.onmouseup = moveEnd;
        child.ontouchend = moveEnd;
    });

    // Return a cleanup function
    return () => {
        Array.from(container.children).forEach((child: HTMLElement) => {
            child.classList.remove("draggable");

            child.onmousedown = null;
            child.ontouchstart = null;

            child.onmousemove = null;
            child.ontouchmove = null;

            child.onmouseup = null;
            child.ontouchend = null;
        });
    };
}
