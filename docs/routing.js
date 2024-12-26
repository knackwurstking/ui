window.addEventListener("DOMContentLoaded", () => {
    const routes = {
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

    function goto(route) {
        fetch(route.template)
            .then((r) => r.text())
            .then((d) => {
                document.querySelector(`head > title`).innerHTML = route.title;
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
        goto(routes[window.location.hash.replace("#", "")] || routes["/"]);
    });

    // Call haschange handler once
    window.dispatchEvent(new Event("hashchange"));
});
