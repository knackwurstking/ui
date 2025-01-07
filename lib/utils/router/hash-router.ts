import { Route } from "./types";

export function hash(target: Element, routes: { [key: string]: Route }): void {
    function goto(route: Route) {
        fetch(route.template)
            .then((r) => r.text())
            .then((d) => {
                const title = document.querySelector(`head > title`);
                if (title !== null) {
                    title.innerHTML = route.title;
                }

                target.innerHTML = d;

                route.scripts.forEach((s) => {
                    const script = document.createElement("script");
                    script.setAttribute("data-template", route.template);
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

        if (match !== undefined) {
            goto(routes[match]);
        } else {
            goto(routes["/"]);
        }
    });

    // Call haschange handler once
    window.dispatchEvent(new Event("hashchange"));
}
