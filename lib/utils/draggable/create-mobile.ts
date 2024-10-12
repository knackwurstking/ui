import type { CleanUpFunction } from "../../global";

const defaultOptions: DraggableMobileOptions = {
    onDragStart: null,
    onDragEnd: null,
};

export interface DraggableMobileOptions {
    onDragStart?: (() => void | Promise<void>) | null;
    onDragEnd?: (() => void | Promise<void>) | null;
}

export function createMobile(
    container: HTMLElement,
    options?: DraggableMobileOptions,
): CleanUpFunction {
    options = { ...defaultOptions, ...options };

    let originTarget: HTMLElement | null = null;
    let startTime: number | null = null;
    let startX: number;
    let startY: number;
    let timeout: NodeJS.Timeout | null = null;
    let dragRunning: boolean = false;
    let backupColor: string = "";
    let backupBGColor: string = "";

    const handleStart = (ev: Event & (TouchEvent | MouseEvent)) => {
        const target = ev.currentTarget as HTMLElement;

        if (
            !originTarget &&
            Array.from(target.classList).includes("draggable")
        ) {
            if (ev instanceof TouchEvent) {
                const touch = ev.targetTouches[0];
                startX = touch.clientX;
                startY = touch.clientY;
            } else {
                startX = ev.clientX;
                startY = ev.clientY;
            }

            startTime = new Date().getTime();
            originTarget = target;

            if (!!timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (!originTarget) return;

                backupColor = originTarget.style.color;
                backupBGColor = originTarget.style.backgroundColor;

                originTarget.style.color = "hsl(var(--ui-hsl-primary-fg))";
                originTarget.style.backgroundColor =
                    "hsl(var(--ui-hsl-primary))";

                container.classList.add("dragging");

                dragRunning = true;
                if (!!options?.onDragStart) options.onDragStart();
            }, 200);
        }
    };

    const handleMove = (ev: Event & (TouchEvent | MouseEvent)) => {
        if (!startTime || !originTarget) return;

        if (!dragRunning) {
            if (new Date().getTime() - startTime < 200) {
                let diffX: number;
                let diffY: number;
                if (ev instanceof TouchEvent) {
                    const touch = ev.targetTouches[0];
                    diffX = Math.abs(startX - touch.clientX);
                    diffY = Math.abs(startY - touch.clientY);
                } else {
                    diffX = Math.abs(startX - ev.clientX);
                    diffY = Math.abs(startY - ev.clientY);
                }

                const diff = diffX > diffY ? diffX : diffY;
                if (diff < 24) {
                    return;
                }

                handleEnd();
                return;
            }
        }

        ev.preventDefault();

        if (!dragRunning) {
            dragRunning = true;
            if (!!options?.onDragStart) options.onDragStart();
        }

        let pos: { clientX: number; clientY: number };
        if (ev instanceof TouchEvent) {
            const touch = ev.targetTouches[0];
            pos = {
                clientX: touch.clientX,
                clientY: touch.clientY,
            };
        } else {
            pos = {
                clientX: ev.clientX,
                clientY: ev.clientY,
            };
        }

        let target = document.elementFromPoint(pos.clientX, pos.clientY);
        if (!!target) {
            while (!target.classList.contains("draggable")) {
                if (!target.parentElement) break;
                target = target.parentElement;
            }

            if (target.classList.contains("draggable")) {
                const isBefore = () => {
                    let sibling = originTarget?.previousElementSibling;
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
                    container.insertBefore(
                        originTarget,
                        target.nextElementSibling,
                    );
                }
            }
        }
    };

    const handleEnd = () => {
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
        if (!!options?.onDragEnd) options.onDragEnd();
    };

    // ----- //
    // Setup //
    // ----- //

    ([...container.children] as HTMLElement[]).forEach((child) => {
        child.classList.add("draggable");

        child.onmousedown = handleStart;
        child.ontouchstart = handleStart;

        child.onmousemove = handleMove;
        child.ontouchmove = handleMove;

        child.onmouseup = handleEnd;
        child.ontouchend = handleEnd;
    });

    // Return a cleanup function
    return () => {
        ([...container.children] as HTMLElement[]).forEach(
            (child: HTMLElement) => {
                child.classList.remove("draggable");

                child.onmousedown = null;
                child.ontouchstart = null;

                child.onmousemove = null;
                child.ontouchmove = null;

                child.onmouseup = null;
                child.ontouchend = null;
            },
        );
    };
}
