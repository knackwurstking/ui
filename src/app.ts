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
                <span class="ui-icon-button ui-ripple" ghost slot="left">
                    ${unsafeHTML(ui.svg.smoothieLineIcons.menu)}
                </span>

                <span class="ui-icon-button ui-ripple" ghost slot="left">
                    ${unsafeHTML(ui.svg.smoothieLineIcons.chevronLeft)}
                </span>

                <span class="ui-text-heading-4" slot="center">UI</span>

                <span class="ui-text-heading-4" slot="center">${constants.version}</span>

                <span class="ui-icon-button ui-ripple" ghost slot="right">
                    ${unsafeHTML(ui.svg.misc.cornflakesOpenBox)}
                </span>

                <span class="ui-icon-button ui-ripple" ghost slot="right">
                    ${unsafeHTML(ui.svg.smoothieLineIcons.printer)}
                </span>

                <span class="ui-icon-button ui-ripple" ghost slot="right">
                    ${unsafeHTML(ui.svg.smoothieLineIcons.search)}
                </span>
            </ui-app-bar>

            <section class="ui-flex-grid" style="padding-top: var(--ui-app-bar-height);">
                <details>
                    <summary class="ui-ripple">UI: Button</summary>

                    <div
                        class="ui-flex justify-center"
                        style="width: 100%; margin-bottom: var(--ui-spacing);"
                    >
                        <label class="ui-text-heading-3" for="no-variant-buttons">
                            No Variant Buttons
                        </label>
                    </div>

                    <div class="ui-flex-grid-row" style="--wrap: wrap;" id="no-variant-buttons">
                        <button class="ui-ripple">Raw (HTML)</button>

                        <button class="ui-button ui-ripple">Default</button>

                        <button class="ui-button ui-ripple" color="primary">Primary</button>

                        <button class="ui-button ui-ripple" color="secondary">Secondary</button>

                        <button class="ui-button ui-ripple" color="destructive">Destructive</button>
                    </div>
                </details>

                <details>
                    <summary class="ui-ripple">UI: Text</summary>

                    <!-- TODO: Add all button (colors, variants) here -->
                </details>
            </section>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        if ("ui" in window) {
            console.debug({ ui: window.ui });
        }
    }
}
