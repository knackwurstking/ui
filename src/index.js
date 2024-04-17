import * as js from "./js";
import * as wc from "./web-components";

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

    // Input components
    customElements.define("ui-select", wc.Select);

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
