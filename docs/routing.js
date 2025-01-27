/**
 * @type {import("../lib")}
 */
const ui = window.ui;

window.addEventListener("DOMContentLoaded", function () {
    console.debug("window.ui:", ui);

    const mobileLayout = {
        title: "UI | Mobile Layout",
        href: "03-mobile-layout.template.html",
        scripts: [{ src: "03-mobile-layout.js" }],
        //onMount: async () => {
        //    if (location.hash === "#03") {
        //        const dialog = document.querySelector(`dialog`);
        //        dialog.showModal();
        //    }
        //},
    };

    ui.router.hash.init(document.body, {
        "/": {
            title: "UI | Index",
            href: "index.template.html",
        },
        "00": {
            title: "UI | Documentation",
            href: "00-doc.template.html",
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
        "03": mobileLayout,
        "03slider": {
            ...mobileLayout,
            template: {
                target: "main",
                selector: "template#slider",
                onMount: async () => {
                    if (location.hash === "#03") {
                        const dialog = document.querySelector(`dialog`);
                        dialog.showModal();
                    }
                },
            },
        },
    });
});
