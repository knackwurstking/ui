import * as js from "./js";
import * as wc from "./wc";

async function define() {
    // AppBar components
    customElements.define("ui-app-bar", wc.AppBar);

    // Button components
    customElements.define("ui-button", wc.Button);
    customElements.define("ui-icon-button", wc.IconButton);

    // Container components
    customElements.define("ui-container", wc.Container);

    // FlexGrid components
    customElements.define("ui-flex-grid-item", wc.FlexGridItem);
    customElements.define("ui-flex-grid-row", wc.FlexGridRow);
    customElements.define("ui-flex-grid", wc.FlexGrid);

    // Input components
    customElements.define("ui-select", wc.Select);
    customElements.define("ui-select-option", wc.SelectOption);

    // StackLayout components
    customElements.define("ui-stack-layout", wc.StackLayout);
    customElements.define("ui-stack-layout-page", wc.StackLayoutPage);

    // Svg Icons
    customElements.define(
        "ui-icon-back-arrow-navigation",
        wc.svg.BackArrowNavigation,
    );
    customElements.define("ui-icon-chevron-down", wc.svg.ChevronDown);
    customElements.define("ui-icon-delete-recycle-bin", wc.svg.DeleteRecycleBin);
    customElements.define("ui-icon-edit2", wc.svg.Edit2);
    customElements.define("ui-icon-pdf-document", wc.svg.PDFDocument);
    customElements.define("ui-icon-settings", wc.svg.Settings);
    customElements.define("ui-icon-today-outline", wc.svg.TodayOutline);

    // Text components
    customElements.define("ui-label", wc.Label);
    customElements.define("ui-primary", wc.Primary);
    customElements.define("ui-secondary", wc.Secondary);

    // ThemeHandler components
    customElements.define("ui-theme-handler", wc.ThemeHandler);
}

export default {
    ...js,
    wc: wc,
    define: define,
};
