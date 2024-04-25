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
    customElements.define("ui-lang-type", wc.LangType)
    customElements.define("ui-lang", wc.Lang)

    // StackLayout components
    customElements.define("ui-stack-layout-page", wc.StackLayoutPage);
    customElements.define("ui-stack-layout", wc.StackLayout);

    // Store components
    customElements.define("ui-store", wc.Store);

    // Svg Icons
    customElements.define("ui-icon-back-arrow-navigation", wc.svg.BackArrowNavigation);
    customElements.define("ui-icon-chevron-down", wc.svg.ChevronDown);
    customElements.define("ui-icon-delete-recycle-bin", wc.svg.DeleteRecycleBin);
    customElements.define("ui-icon-edit2", wc.svg.Edit2);
    customElements.define("ui-icon-pdf-document", wc.svg.PDFDocument);
    customElements.define("ui-icon-settings", wc.svg.Settings);
    customElements.define("ui-icon-today-outline", wc.svg.TodayOutline);

    // Text components
    wc.Secondary.register()
    wc.Primary.register()
    wc.Label.register()

    // ThemeHandler components
    wc.ThemeHandler.register()
}

export default {
    ...js,
    wc: wc,
    define: define,
};
