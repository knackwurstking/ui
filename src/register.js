import { UIAlerts, UIAlert } from "./ui-alert";
import { UIButton, UIIconButton } from "./ui-button";
import { UIContainer } from "./ui-container";
import { UIDialog } from "./ui-dialog";
import { UIDrawer, UIDrawerGroup, UIDrawerGroupItem } from "./ui-drawer";
import { UIFlexGrid, UIFlexGridItem, UIFlexGridRow } from "./ui-flex-grid";
import {
    UICheck,
    UIInput,
    UISearch,
    UISelect,
    UISelectOption,
    UITextarea,
} from "./ui-input";
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
    UIAlerts.register();
    UIAlert.register();

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

    UICheck.register();
    UIInput.register();
    UISearch.register();
    UISelectOption.register();
    UISelect.register();
    UITextarea.register();

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
