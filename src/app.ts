import "../lib/css/main.css";
//import "../dist/ui.min.umd.cjs";

import { html, LitElement, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import * as ui from "../lib/index";
import * as constants from "./constants";

@customElement("main-app")
export class MainApp extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        this.style.height = "100vh";
        this.style.width = "100vw";

        this.classList.add("ui-container");
        this.classList.add("ui-auto-scroll");

        return this;
    }

    protected render() {
        return html`
            <ui-theme-handler themes-path="/themes" theme="original" auto></ui-theme-handler>

            <ui-app-bar position="top" fixed>
                <ui-icon-button ghost ripple slot="left">
                    ${unsafeHTML(ui.svg.smoothieLineIcons.menu)}
                </ui-icon-button>

                <ui-icon-button ghost ripple slot="left">
                    ${unsafeHTML(ui.svg.smoothieLineIcons.chevronLeft)}
                </ui-icon-button>

                <span class="ui-text-heading-4" slot="center">UI</span>
                <span class="ui-text-heading-4" slot="center">${constants.version}</span>

                <ui-icon-button ghost ripple slot="right">
                    ${unsafeHTML(ui.svg.misc.cornflakesOpenBox)}
                </ui-icon-button>

                <ui-icon-button ghost ripple slot="right">
                    ${unsafeHTML(ui.svg.smoothieLineIcons.printer)}
                </ui-icon-button>

                <ui-icon-button ghost ripple slot="right">
                    ${unsafeHTML(ui.svg.smoothieLineIcons.search)}
                </ui-icon-button>
            </ui-app-bar>

            <section class="ui-flex-grid" style="padding-top: var(--ui-app-bar-height);">
                <details>
                    <summary>UI: Button</summary>

                    <div
                        class="ui-flex justify-center"
                        style="width: 100%; margin-bottom: var(--ui-spacing);"
                    >
                        <label class="ui-text-heading-3" for="no-variant-buttons">
                            No Variant Buttons
                        </label>
                    </div>

                    <ui-flex-grid-row id="no-variant-buttons" gap="0.5rem" wrap>
                        <button>Raw (HTML)</button>

                        <ui-button ripple>Default</ui-button>

                        <ui-button color="primary" ripple>Primary</ui-button>

                        <ui-button color="secondary" ripple>Secondary</ui-button>

                        <ui-button color="destructive" ripple>Destructive</ui-button>
                    </ui-flex-grid-row>
                </details>

                <details>
                    <summary>UI: Text</summary>

                    <!-- TODO: Add all button (colors, variants) here -->
                </details>
            </section>
        `;
    }

    protected updated(_changedProperties: PropertyValues): void {
        for (const summary of this.querySelectorAll<HTMLElement>(`details > summary`)) {
            ui.ripple.create(summary);
        }
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        if ("ui" in window) {
            console.debug({ ui: window.ui });
        }
    }
}
