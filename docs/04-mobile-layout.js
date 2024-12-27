function toggleDrawer() {
    const drawer = document.querySelector(`.ui-drawer`);
    console.debug(`Toggle drawer`, drawer);

    if (drawer.hasAttribute("open")) drawer.removeAttribute("open");
    else drawer.setAttribute("open", "");
}

function closeDrawer() {
    const drawer = document.querySelector(`.ui-drawer`);
    console.debug(`Close drawer`, drawer);

    drawer.removeAttribute("open");
}

(() => {
    const dialog = document.querySelector(`dialog`);
    dialog.showModal();
})();
