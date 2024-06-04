// UI Exports
import { UIAppBar } from "./ui-app-bar";
import { UIButton, UIIconButton } from "./ui-button";
import { UIContainer } from "./ui-container";
import { UIDialog } from "./ui-dialog";
import { UIFlexGrid, UIFlexGridRow, UIFlexGridItem } from "./ui-flex-grid";
import { UIInput, UISelect, UISelectOption } from "./ui-input";
import { UILang, UILangType } from "./ui-lang";
import { UISpinner } from "./ui-spinner";
import { UIStackLayout, UIStackLayoutPage } from "./ui-stack-layout";
import { UIStore } from "./ui-store";
import { UILabel, UIPrimary, UISecondary } from "./ui-text";
import { UIThemeHandler } from "./ui-theme-handler";

// Svg Exports
import {
    BackArrowNavigation as SvgBackArrowNavigation,
    ChevronDown as SvgChevronDown,
    Close as SvgClose,
    DeleteRecycleBin as SvgDeleteRecycleBin,
    Edit2 as SvgEdit2,
    PDFDocument as SvgPDFDocument,
    Settings as SvgSettings,
    TodayOutline as SvgTodayOutline,
} from "./svg";


export function registerWebComponents() {
    // AppBar components
    UIAppBar.register()

    // Button components
    UIIconButton.register()
    UIButton.register()

    // Container components
    UIContainer.register()

    // FlexGrid components
    UIFlexGridItem.register()
    UIFlexGridRow.register()
    UIFlexGrid.register()

    // Input components
    UIInput.register();
    UISelectOption.register()
    UISelect.register()

    // Lang components
    UILangType.register()
    UILang.register()

    // Spinner components
    UISpinner.register()

    // StackLayout components
    UIStackLayoutPage.register()
    UIStackLayout.register()

    // Store components
    UIStore.register()

    // Text components
    UISecondary.register()
    UIPrimary.register()
    UILabel.register()

    // ThemeHandler components
    UIThemeHandler.register()

    // Dialog components
    UIDialog.register()
}

export function registerSVGComponents() {
    SvgBackArrowNavigation.register()
    SvgChevronDown.register()
    SvgClose.register()
    SvgDeleteRecycleBin.register()
    SvgEdit2.register()
    SvgPDFDocument.register()
    SvgSettings.register()
    SvgTodayOutline.register()
}
