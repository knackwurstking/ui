import { html, LitElement, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import {
    globalStylesToShadowRoot,
    svg,
    UIAppBar,
    UIAppBarPosition,
    UICheck,
    UIDialog,
    UIDrawer,
    UIInput,
    UISearch,
    UISelect,
    UISelectOption,
    UIStore,
    UISvg,
    UITextarea,
} from "../lib";
import { MainStore } from "./types";

@customElement("main-app-bar")
class MainAppBar extends UIAppBar {
    position = "top" as UIAppBarPosition;
    fixed = true;

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        console.debug(`Adding "main-app-bar" items now...`);
        const html = String.raw;
        this.innerHTML = html`
            <ui-app-bar-item slot="center" name="title">
                <h3>App Bar Title</h3>
            </ui-app-bar-item>
        `;
    }
}

@customElement("main-app")
export class MainApp extends LitElement {
    public store: MainStore = new UIStore();
    public appBar: MainAppBar = new MainAppBar();

    protected render() {
        console.debug(`Render main application`);

        this.store.storagePrefix = "ui:";
        this.store.storage = true;

        return html`
            <ui-theme-handler theme="gruvbox" auto></ui-theme-handler>
            <!--ui-store storage-prefix="ui:" storage></ui-store-->
            ${this.store} ${this.renderTextComponentsSection()}
            ${this.renderSvgSection()} ${this.renderStackLayoutSection()}
            ${this.renderInputsSection()} ${this.renderDialogsSection()}
            ${this.appBar} ${this.renderDrawer()} ${this.renderAlerts()}
        `;
    }

    protected renderTextComponentsSection() {
        return html`
            <section
                class="has-border"
                style="margin-top: var(--ui-app-bar-height);"
            >
                <h1><u>Text Components</u></h1>

                <section>
                    <ui-flex-grid gap="0.25rem">
                        <ui-flex-grid-item>
                            <ui-text>UIText Component - "ui-text"</ui-text>
                        </ui-flex-grid-item>

                        <ui-flex-grid-item>
                            <ui-primary>
                                UIPrimary Component - "ui-primary"
                            </ui-primary>
                        </ui-flex-grid-item>

                        <ui-flex-grid-item>
                            <ui-secondary>
                                UISecondary Component - "ui-secondary"
                            </ui-secondary>
                        </ui-flex-grid-item>

                        <ui-flex-grid-item>
                            <ui-label
                                primary="The primary Label text"
                                secondary="Some secondary Label text"
                            >
                                <ui-text>
                                    @TODO: Replace this with an checkbox
                                    component
                                </ui-text>
                            </ui-label>
                        </ui-flex-grid-item>

                        <ui-flex-grid-item>
                            <ui-label
                                primary="Ripple Label"
                                secondary="A Label with ripple attribute set"
                                ripple
                            >
                                <ui-text>
                                    @TODO: Replace this with an checkbox
                                    component
                                </ui-text>
                            </ui-label>
                        </ui-flex-grid-item>
                    </ui-flex-grid>
                </section>
            </section>
        `;
    }

    protected renderSvgSection() {
        const svgs: LitElement[] = [];

        let uiSvg: UISvg;
        for (const [name, value] of Object.entries(svg.smoothieLineIcons)) {
            uiSvg = new UISvg();
            svgs.push(uiSvg);

            uiSvg.setAttribute("name", name);

            uiSvg.style.width = "2.5rem";
            uiSvg.style.height = "2.5rem";

            uiSvg.innerHTML = value.strings[0];
        }

        return html`
            <section
                id="svgs"
                class="has-border"
                style="margin-top: var(--ui-spacing);"
            >
                <h1><u>Svg's</u></h1>

                <section id="smoothieLineIcons">
                    <h2>Smoothie Line Icons</h2>

                    <ui-flex-grid-row wrap="wrap" gap="0.25rem">
                        ${svgs}
                    </ui-flex-grid-row>
                </section>
            </section>
        `;
    }

    protected renderStackLayoutSection() {
        return html`
            <section
                id="stackLayout"
                class="has-border"
                style="margin-top: var(--ui-spacing);"
            >
                <h1><u>Stack Layout</u></h1>

                <section>
                    <ui-flex-grid gap="0.25rem">
                        <ui-flex-grid-row gap="0.25rem">
                            <ui-flex-grid-item>
                                <ui-button
                                    name="add"
                                    color="primary"
                                    variant="full"
                                    ripple
                                >
                                    Add one page
                                </ui-button>
                            </ui-flex-grid-item>

                            <ui-flex-grid-item>
                                <ui-button
                                    name="back"
                                    color="secondary"
                                    variant="full"
                                    ripple
                                >
                                    Go back one page
                                </ui-button>
                            </ui-flex-grid-item>
                        </ui-flex-grid-row>

                        <ui-flex-grid-row gap="0.25rem">
                            <ui-stack-layout
                                class="has-border"
                                style="width: 100%; min-height: 7.5rem;"
                            >
                                <!-- TODO: Fill this pages with content -->
                                <ui-stack-layout-page
                                    name="page 1"
                                ></ui-stack-layout-page>

                                <ui-stack-layout-page
                                    name="page 2"
                                ></ui-stack-layout-page>

                                <ui-stack-layout-page
                                    name="page 3"
                                ></ui-stack-layout-page>

                                <ui-stack-layout-page
                                    name="page 4"
                                ></ui-stack-layout-page>
                            </ui-stack-layout>
                        </ui-flex-grid-row>
                    </ui-flex-grid>
                </section>
            </section>
        `;
    }

    protected renderInputsSection() {
        return html`
            <section
                id="inputs"
                class="has-border"
                style="margin-top: var(--ui-spacing)"
            >
                <h1><u>Inputs</u></h1>

                <ui-flex-grid gap="0.25rem">
                    <ui-flex-grid-item>
                        <ui-label primary="UICheck Example" ripple>
                            <ui-check
                                checked
                                @input=${(ev: Event) => {
                                    console.debug(
                                        "ui-check - event - input:",
                                        ev.currentTarget as UICheck,
                                    );
                                }}
                                @change=${(ev: Event) => {
                                    console.debug(
                                        "ui-check - event - change:",
                                        ev.currentTarget as UICheck,
                                    );
                                }}
                            ></ui-check>
                        </ui-label>
                    </ui-flex-grid-item>

                    <ui-flex-grid-item>
                        <ui-label primary="UIInput Example" ripple>
                            <ui-input
                                title="Input title here..."
                                type="text"
                                value="knackwurstking"
                                placeholder="Enter your name here..."
                                @input=${(ev: Event) => {
                                    const target = ev.currentTarget as UIInput;
                                    console.debug(
                                        "ui-input - event - input:",
                                        target.value,
                                        target,
                                    );
                                }}
                                @change=${(ev: Event) => {
                                    const target = ev.currentTarget as UIInput;
                                    console.debug(
                                        "ui-input - event - change:",
                                        target.value,
                                        target,
                                    );
                                }}
                            ></ui-input>
                        </ui-label>
                    </ui-flex-grid-item>

                    <ui-flex-grid-item>
                        <ui-label primary="UISearch Example" ripple>
                            <ui-search
                                title=""
                                placeholder="Search..."
                                storage
                                storage-prefix="ui:search:"
                                storage-key="test:"
                                @input=${(ev: Event) => {
                                    const target = ev.currentTarget as UISearch;
                                    console.debug(
                                        "ui-search - input:",
                                        target.value,
                                        target,
                                    );
                                }}
                                @change=${(ev: Event) => {
                                    const target = ev.currentTarget as UISearch;
                                    console.debug(
                                        "ui-search - event - change:",
                                        target.value,
                                        target,
                                    );
                                }}
                                @submit=${(ev: Event) => {
                                    const target = ev.currentTarget as UISearch;
                                    console.debug(
                                        "ui-search - event - submit:",
                                        target.value,
                                        target,
                                    );
                                }}
                                @storage=${(ev: Event) => {
                                    const target = ev.currentTarget as UISearch;
                                    console.debug(
                                        "ui-search - event - storage:",
                                        target.value,
                                        target,
                                    );
                                }}
                            ></ui-search>
                        </ui-label>
                    </ui-flex-grid-item>

                    <ui-flex-grid-item>
                        <ui-label
                            primary="UISelect Example"
                            secondary="keep-open flag enabled"
                        >
                            <ui-select keep-open>
                                <ui-select-option value="o1" selected>
                                    Option 1
                                </ui-select-option>

                                <ui-select-option value="o2">
                                    Option 2
                                </ui-select-option>

                                <ui-select-option value="o3">
                                    Option 3
                                </ui-select-option>

                                <ui-select-option value="o4">
                                    Option 4
                                </ui-select-option>
                            </ui-select>
                        </ui-label>
                    </ui-flex-grid-item>

                    <ui-flex-grid-item>
                        <ui-label
                            primary="UISelect Example 2"
                            secondary="Options added via javascript"
                            ripple
                        >
                            <ui-select id="selectExample2"></ui-select>
                        </ui-label>
                    </ui-flex-grid-item>

                    <ui-flex-grid-item>
                        <ui-label primary="UITextarea Example">
                            <ui-textarea
                                title="Textarea title here..."
                                cols="25"
                                rows="4"
                            ></ui-textarea>
                        </ui-label>
                    </ui-flex-grid-item>
                </ui-flex-grid>
            </section>
        `;
    }

    protected renderDialogsSection() {
        return html`
            <section
                id="dialogs"
                class="has-border"
                style="margin-top: var(--ui-spacing)"
            >
                <h1><u>Dialogs</u></h1>

                <ui-flex-grid gap="0.25rem">
                    <ui-flex-grid-item>
                        <ui-button
                            variant="outline"
                            ripple
                            @click=${() => {
                                const dialog =
                                    this.shadowRoot!.querySelector<UIDialog>(
                                        `ui-dialog[name="dialog1"]`,
                                    )!;
                                dialog.open({ modal: true });
                            }}
                            >Dialog (Modal)</ui-button
                        >
                    </ui-flex-grid-item>

                    <ui-flex-grid-item>
                        <ui-button
                            variant="outline"
                            ripple
                            @click=${() => {
                                const dialog =
                                    this.shadowRoot!.querySelector<UIDialog>(
                                        `ui-dialog[name="dialog2"]`,
                                    )!;
                                dialog.open({ modal: true });
                            }}
                            >Fullscreen Dialog (Modal)</ui-button
                        >
                    </ui-flex-grid-item>
                </ui-flex-grid>

                <ui-dialog name="dialog1" title="Dialog Title" no-footer>
                    <div class="flex justify-center align-center">
                        <ui-text>Dialog content here...</ui-text>
                    </div>
                </ui-dialog>

                <ui-dialog
                    name="dialog2"
                    title="Dialog Title"
                    fullscreen
                    no-footer
                >
                    <div class="flex justify-center align-center">
                        <ui-text>Dialog content here...</ui-text>
                    </div>
                </ui-dialog>
            </section>
        `;
    }

    protected renderDrawer() {
        return html`
            <section
                id="drawer"
                class="has-border"
                style="margin-top: var(--ui-spacing)"
            >
                <h1><u>Drawer</u></h1>

                <ui-flex-grid>
                    <ui-flex-grid-item>
                        <ui-button
                            variant="outline"
                            @click=${() => {
                                const drawer =
                                    this.shadowRoot!.querySelector<UIDrawer>(
                                        `ui-drawer`,
                                    )!;

                                drawer.open = true;
                            }}
                        >
                            Open Drawer
                        </ui-button>
                    </ui-flex-grid-item>
                </ui-flex-grid>
            </section>

            <ui-drawer>
                <!-- TODO: Adding some foldable groups with dummy content for testing -->
            </ui-drawer>
        `;
    }

    protected renderAlerts() {
        return html`
            <ui-alerts>
                <!--ui-alert variant="info" message="Info alert message"></ui-alert>

                <ui-alert
                    variant="warning"
                    message="Warning alert message"
                ></ui-alert>

                <ui-alert variant="error" message="Error alert message"></ui-alert-->
            </ui-alerts>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);

        //app.classList.add("is-debug");
        this.classList.add("is-container");
        //app.classList.add("fluid");

        globalStylesToShadowRoot(this.shadowRoot!);

        // Initialize the store
        //this.store = this.shadowRoot!.querySelector(`ui-store`)!;
        {
            this.store.setData("test", 0, true);
            this.store.setData("foo", false, true);
        }

        // Test UISelect "#selectExample2"
        const select =
            this.shadowRoot!.querySelector<UISelect>(`#selectExample2`)!;
        {
            let option = new UISelectOption();
            option.value = "o1";
            option.selected = false;
            option.textContent = "Option 1";
            select.appendChild(option);

            option = new UISelectOption();
            option.value = "o2";
            option.selected = true;
            option.textContent = "Option 2";
            select.appendChild(option);

            option = new UISelectOption();
            option.value = "o3";
            option.selected = false;
            option.textContent = "Option 3";
            select.appendChild(option);

            option = new UISelectOption();
            option.value = "o4";
            option.selected = false;
            option.textContent = "Option 4";
            select.appendChild(option);
        }

        // Set multiline text to ui-textarea
        const textarea =
            this.shadowRoot!.querySelector<UITextarea>(`ui-textarea`)!;
        textarea.value = `Multiline text box\n\n\nHi, whats up!`;

        // Testing AppBar methods
        setTimeout(() => {
            console.debug(
                `Center slot AppBar items:`,
                this.appBar.content("center"),
            );

            const titleItem = this.appBar.contentName("title")!;
            console.debug(`AppBar item with the name "title": `, titleItem);

            const title = titleItem.contentAt<HTMLElement>(0);
            console.debug(`Title AppBar item:`, title);
        });
    }
}
