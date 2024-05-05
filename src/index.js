import * as js from "./js";
import * as wc from "./wc";

async function define() {
    // AppBar components
    wc.AppBar.register()

    // Button components
    wc.IconButton.register()
    wc.Button.register()

    // Card components
    wc.Card.register()

    // Container components
    wc.Container.register()

    // FlexGrid components
    wc.FlexGridItem.register()
    wc.FlexGridRow.register()
    wc.FlexGrid.register()

    // Input components
    wc.SelectOption.register()
    wc.Select.register()

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

    // Dialog components
    wc.Dialog.register()
}

async function defineSVG() {
    wc.svg.BackArrowNavigation.register()
    wc.svg.ChevronDown.register()
    wc.svg.Close.register()
    wc.svg.DeleteRecycleBin.register()
    wc.svg.Edit2.register()
    wc.svg.PDFDocument.register()
    wc.svg.Settings.register()
    wc.svg.TodayOutline.register()
}

export default {
    js: js,
    wc: wc,
    define: define,
    defineSVG: defineSVG,
};
