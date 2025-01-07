import { Route } from "./types";

export function hash(target: Element, routes: { [key: string]: Route }): void {
    function goto(route: Route) {
        if (route.template !== undefined) {
            const template = document.querySelector(route.template);
            if (template === null) {
                throw `${route.template} not found`;
            }

            if (template instanceof HTMLTemplateElement) {
                target.innerHTML = "";
                target.appendChild(template.content.cloneNode(true));
            } else {
                target.innerHTML = template.innerHTML;
            }
        }

        if (route.href === undefined) {
            return;
        }

        fetch(route.href)
            .then((r) => r.text())
            .then((d) => {
                if (route.title !== undefined) {
                    const title = document.querySelector(`head > title`);
                    if (title !== null) {
                        title.innerHTML = route.title;
                    }
                }

                target.innerHTML = d;

                if (route.scripts === undefined) {
                    return;
                }

                route.scripts.forEach((s) => {
                    const script = document.createElement("script");
                    script.setAttribute("data-template", route.href!);
                    script.src = s.src;
                    target.appendChild(script);
                });
            })
            .catch((err) => alert(err));
    }

    window.addEventListener("hashchange", () => {
        const hash = window.location.hash.replace("#", "");

        const match = Object.keys(routes).find((k) => {
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
