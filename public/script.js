const routes = {
    404: {},
    "/": {},
    "01": {},
    "02": {},
    "03": {},
    "04": {},
};

function goto(route) {
    // TODO: Fetch and write content to document using open/write/close
}

window.addEventListener("hashchange", () => {
    const location = window.location.hash.replace("#", "");

    let route = routes[location] || null;
    if (route == null) {
        route = routes[404];
    }

    goto(route);
});
