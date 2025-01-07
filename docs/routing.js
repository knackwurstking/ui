window.addEventListener("DOMContentLoaded", function () {
    console.debug("window.ui:", window.ui);

    window.ui.router.hash(document.body, {
        "/": {
            title: "UI | Index",
            href: "",
        },
        "01": {
            title: "UI | 01 Test",
            href: "01-test.template.html",
        },
        "02": {
            title: "UI | HTML5 Test Page",
            href: "02-html5-test-page.template.html",
        },
        "03": {
            title: "UI | SVGs",
            href: "03-svgs.template.html",
        },
        "04": {
            title: "UI | Mobile Layout",
            href: "04-mobile-layout.template.html",
            scripts: [{ src: "04-mobile-layout.js" }],
            onMount: async () => {
                const dialog = document.querySelector(`dialog`);
                dialog.showModal();
            },
        },
    });
});
