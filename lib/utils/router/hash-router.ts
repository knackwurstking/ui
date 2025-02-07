import { Route } from "./types";

export function init(target: Element, routes: { [key: string]: Route }): void {
    //let pushedState = false;
    let current: Route | null = null;

    async function goto(route: Route) {
        //if (location.hash.match(/.*\?+/)) {
        //    const [hash, search] = location.hash.split("?", 2);
        //    const url = location.origin + location.pathname + `?${search}` + hash;
        //    history.pushState({ path: url, modified: true }, "", url);
        //    pushedState = true;
        //} else {
        //    pushedState = false;
        //}

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

    //window.addEventListener("popstate", () => {
    //    if (!pushedState) {
    //        return;
    //    }

    //    history.back();
    //    pushedState = false;
    //});

    window.addEventListener("hashchange", () => {
        const hash = window.location.hash.replace("#", "");

        let match: string = "";
        for (const key of Object.keys(routes)) {
            if (hash.startsWith(key)) {
                if (key > match) {
                    match = key;
                }
            }
        }

        if (!match) {
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

export function goTo(query: { [key: string]: string } | null, hash: string): void {
    let search: string;
    if (!query) {
        search = "";
    } else {
        search = `?${Object.entries(query)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join("&")}`;
    }

    if (!hash && !search) {
        location.hash = "";
        return;
    }

    location.hash = `#${encodeURIComponent(hash)}` + (!!search ? `&${search}` : "");
}

export function getSearchParam(): { [key: string]: string } {
    const result: { [key: string]: string } = {};

    location.hash
        .replace(/^#.*\?/, "") // Remove the hash and the first question mark
        .split("?") // Split by question mark
        .forEach((searchParam) => {
            // Split by ampersand
            searchParam.split("&").forEach((part) => {
                // Split by equal sign
                const [key, value] = part.split("=");
                result[decodeURIComponent(key)] = decodeURIComponent(value);
            });
        });

    return result;
}
