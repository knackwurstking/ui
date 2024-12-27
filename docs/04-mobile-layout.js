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

function closeDialog() {
    const dialog = document.querySelector(`dialog`);
    dialog.close();
}

(() => {
    const dialog = document.querySelector(`dialog`);
    dialog.showModal();
})();
