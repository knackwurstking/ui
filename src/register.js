import { SvgChevronDown } from "./svg";
import { SvgChevronLeft } from "./svg/svg-chevron-left";
import { SvgClose } from "./svg/svg-close";
import { SvgDocumentNew } from "./svg/svg-document-new";
import { SvgDownload } from "./svg/svg-download";
import { SvgMenu } from "./svg/svg-menu";
import { SvgPen } from "./svg/svg-pen";
import { SvgPlus } from "./svg/svg-plus";
import { SvgSearch } from "./svg/svg-search";
import { SvgSettings } from "./svg/svg-settings";
import { SvgShare } from "./svg/svg-share";
import { SvgToday } from "./svg/svg-today";
import { SvgTrash } from "./svg/svg-trash";
import { UIAppBar, UIAppBarItem } from "./ui-app-bar";
import { UIButton, UIIconButton } from "./ui-button";
import { UIContainer } from "./ui-container";
import { UIDialog } from "./ui-dialog";
import { UIDrawer, UIDrawerGroup, UIDrawerGroupItem } from "./ui-drawer";
import { UIFlexGrid, UIFlexGridItem, UIFlexGridRow } from "./ui-flex-grid";
import { UIInput, UISelect } from "./ui-input";
import { UISearch } from "./ui-input/ui-search";
import { UISelectOption } from "./ui-input/ui-select-option";
import { UILang } from "./ui-lang";
import { UILangType } from "./ui-lang/ui-lang-type";
import { UISpinner } from "./ui-spinner";
import { UIStackLayout, UIStackLayoutPage } from "./ui-stack-layout";
import { UIStore } from "./ui-store";
import { UILabel } from "./ui-text";
import { UIPrimary } from "./ui-text/ui-primary";
import { UISecondary } from "./ui-text/ui-secondary";
import { UIThemeHandler } from "./ui-theme-handler";

export function registerComponents() {
    UIAppBarItem.register();
    UIAppBar.register();

    UIButton.register();
    UIIconButton.register();

    UIContainer.register();

    UIDialog.register();

    UIDrawerGroupItem.register();
    UIDrawerGroup.register();
    UIDrawer.register();

    UIFlexGridItem.register();
    UIFlexGridRow.register();
    UIFlexGrid.register();

    UIInput.register();
    UISearch.register();
    UISelectOption.register();
    UISelect.register();

    UILangType.register();
    UILang.register();

    UISpinner.register();

    UIStackLayout.register();
    UIStackLayoutPage.register();

    UIStore.register();

    UILabel.register();
    UIPrimary.register();
    UISecondary.register();

    UIThemeHandler.register();
}

export function registerSVGs() {
    SvgChevronDown.register();
    SvgChevronLeft.register();
    SvgClose.register();
    SvgDocumentNew.register();
    SvgDownload.register();
    SvgMenu.register();
    SvgPen.register();
    SvgPlus.register();
    SvgSearch.register();
    SvgSettings.register();
    SvgShare.register();
    SvgToday.register();
    SvgTrash.register();
}
