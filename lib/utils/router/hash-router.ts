import { Route } from "./types";

export function hash(target: Element, routes: { [key: string]: Route }): void {
    let current: Route | null = null;

    async function goto(route: Route) {
        if (current !== null) {
            if (current.template?.onDestroy !== undefined) {
                current.template.onDestroy();
            }

            if (current.onDestroy !== undefined) {
                current.onDestroy();
            }
        }

        current = route;

        if (current.title !== undefined) {
            const title = document.querySelector(`head > title`);
            if (title !== null) {
                title.innerHTML = current.title;
            }
        }

        if (current?.href !== undefined) {
            const resp = await fetch(current.href);
            const data = await resp.text();

            target.innerHTML = data;

            if (current.scripts !== undefined) {
                current.scripts.forEach((s) => {
                    const script = document.createElement("script");
                    script.setAttribute("data-template", current!.href!);
                    script.src = s.src;
                    target.appendChild(script);
                });
            }
        }

        if (current?.onMount !== undefined) {
            current.onMount();
        }

        if (current?.template !== undefined) {
            let templateTarget = target;
            if (current.template.target !== undefined) {
                templateTarget = document.querySelector(current.template.target)!;
            }

            const template = document.querySelector(current.template.selector);
            if (template === null) {
                throw `${current.template.selector} not found`;
            }

            if (template instanceof HTMLTemplateElement) {
                templateTarget.innerHTML = "";
                templateTarget.appendChild(template.content.cloneNode(true));
            } else {
                templateTarget.innerHTML = template.innerHTML;
            }

            if (current.template?.onMount !== undefined) {
                current.template.onMount();
            }
        }
    }

    window.addEventListener("hashchange", () => {
        const hash = window.location.hash.replace("#", "");

        const match = Object.keys(routes)
            .reverse()
            .find((k) => {
                return hash.startsWith(k);
            });
        if (match === undefined) {
            const route = routes["/"];
            if (route === undefined) {
                console.warn(
                    `Window location “${hash}” is missing in routes, and the fallback route “/“ is also missing.`,
                );
                return;
            }

            goto(route);
            return;
        }

        goto(routes[match]);
    });

    // Call haschange handler once
    window.dispatchEvent(new Event("hashchange"));
}
