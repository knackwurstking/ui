import * as js from "./js";
import * as wc from "./wc";

async function define() {
    // AppBar components
    customElements.define("ui-app-bar", wc.AppBar);

    // Button components
    customElements.define("ui-icon-button", wc.IconButton);
    customElements.define("ui-button", wc.Button);

    // Container components
    customElements.define("ui-container", wc.Container);

    // FlexGrid components
    customElements.define("ui-flex-grid", wc.FlexGrid);
    customElements.define("ui-flex-grid-row", wc.FlexGridRow);
    customElements.define("ui-flex-grid-item", wc.FlexGridItem);

    // Input components
    customElements.define("ui-select-option", wc.SelectOption);
    customElements.define("ui-select", wc.Select);

    // Lang components
    wc.LangType.register()
    wc.Lang.register()

    // StackLayout components
    wc.StackLayoutPage.register()
    wc.StackLayout.register()

    // Store components
    wc.Store.register()

    // Text components
    wc.Secondary.register()
    wc.Primary.register()
    wc.Label.register()

    // ThemeHandler components
    wc.ThemeHandler.register()
}

async function defineSVG() {
    wc.svg.BackArrowNavigation.register()
    wc.svg.ChevronDown.register()
    wc.svg.DeleteRecycleBin.register()
    wc.svg.Edit2.register()
    wc.svg.PDFDocument.register()
    wc.svg.Settings.register()
    wc.svg.TodayOutline.register()
}

export default {
    ...js,
    wc: wc,
    define: define,
    defineSVG: defineSVG,
};
