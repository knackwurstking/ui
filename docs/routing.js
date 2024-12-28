window.addEventListener("DOMContentLoaded", function () {
    console.debug("window.ui:", window.ui);

    window.ui.router.hash({
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
    });
});
