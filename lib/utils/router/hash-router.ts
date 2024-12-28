import { Route } from "./types";

export function router(mode: "url" | "hash") {
    switch (mode) {
        case "url":
            throw `the url mode is under construction, use hash`;

        case "hash":
            hashRouter();
            break;

        default:
            throw `unknown mode: ${mode}`;
    }
}

export function hashRouter() {
    const routes: { [key: string]: Route } = {
        "/": {
            title: "UI | Index",
            template: "",
            scripts: [],
        },
        "01": {
            title: "UI | 01 Test",
            template: "01-test.template.html",
            scripts: [],
        },
        "02": {
            title: "UI | HTML5 Test Page",
            template: "02-html5-test-page.template.html",
            scripts: [],
        },
        "03": {
            title: "UI | SVGs",
            template: "03-svgs.template.html",
            scripts: [],
        },
        "04": {
            title: "UI | Mobile Layout",
            template: "04-mobile-layout.template.html",
            scripts: [{ src: "04-mobile-layout.js" }],
        },
    };

    function goto(route: Route) {
        fetch(route.template)
            .then((r) => r.text())
            .then((d) => {
                const title = document.querySelector(`head > title`);
                if (title !== null) {
                    title.innerHTML = route.title;
                }

                document.body.innerHTML = d;

                route.scripts.forEach((s) => {
                    const script = document.createElement("script");
                    script.setAttribute("data-template", route.template);
                    script.src = s.src;
                    document.body.appendChild(script);
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
