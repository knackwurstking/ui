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
import { UISvg } from "./ui-svg";
import { UILabel } from "./ui-text";
import { UIPrimary } from "./ui-text/ui-primary";
import { UISecondary } from "./ui-text/ui-secondary";
import { UIThemeHandler } from "./ui-theme-handler";

export function register() {
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

    UISvg.register();

    UILabel.register();
    UIPrimary.register();
    UISecondary.register();

    UIThemeHandler.register();
}
