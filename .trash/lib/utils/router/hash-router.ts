import { Route } from "./types";

export function init(routes: { [key: string]: Route }): void {
    let current: Route | null = null;
    async function goto(route: Route) {
        if (current !== null) {
            if (!!current.onDestroy) current.onDestroy();
        }

        current = route;

        if (current.title !== undefined) {
            const title = document.querySelector(`head > title`);
            if (!!title) title.innerHTML = current.title;
        }

        if (!!current.onMount) current.onMount();
    }

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

export function goTo(
    query: { [key: string]: string } | null,
    hash: string,
): void {
    let search: string;
    if (!query) {
        search = "";
    } else {
        search = `?${Object.entries(query)
            .map(
                ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
            )
            .join("&")}`;
    }

    if (!hash && !search) {
        location.hash = "";
        return;
    }

    location.hash =
        `#${encodeURIComponent(hash)}` + (!!search ? `&${search}` : "");
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
