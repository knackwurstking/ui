const routes = {
    "/": {
        title: "UI | Index",
        path: "/",
    },
    "01": {
        title: "UI | 01 Test",
        path: "/01-test.html",
    },
    "02": {
        title: "UI | HTML5 Test Page",
        path: "/02-html5-test-page.html",
    },
    "03": {
        title: "UI | SVGs",
        path: "/03-svgs.html",
    },
    "04": {
        title: "UI | Mobile Layout",
        path: "/04-mobile-layout.html",
    },
};

function goto(route) {
    fetch(route.path)
        .then((r) => r.text())
        .then((d) => {
            document.querySelector(`head > title`).innerText = route.title;
            document.body.innerHTML = d;
        })
        .catch((err) => alert(err));
}

window.addEventListener("hashchange", () => {
    goto(routes[window.location.hash.replace("#", "")] || routes["/"]);
});

// Call haschange handler once
window.dispatchEvent(new Event("hashchange"));
