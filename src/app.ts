import "../lib/css/main.css";
//import "../dist/ui.min.umd.cjs";
import "../lib/index";

import { html, LitElement, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("main-app")
export class MainApp extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        this.style.height = "100vh";
        this.style.width = "100vw";

        this.classList.add("ui-container");
        this.classList.add("ui-auto-scroll");
        //this.classList.add("ui-debug");

        return this;
    }

    protected render() {
        return html`
            <ui-theme-handler themes-path="/themes" theme="original" auto></ui-theme-handler>

            <ui-app-bar class="ui-debug" position="top" fixed>
                <span class="ui-icon-button ui-ripple" slot="left">1</span>
                <span class="ui-icon-button ui-ripple" slot="left">2</span>
                <span class="ui-icon-button ui-ripple" slot="left">3</span>

                <span class="ui-text-heading-4" slot="center">App Bar Title</span>
                <span class="ui-text-heading-4" slot="center">Another Title</span>

                <span class="ui-icon-button ui-ripple" slot="right">1</span>
                <span class="ui-icon-button ui-ripple" slot="right">2</span>
                <span class="ui-icon-button ui-ripple" slot="right">3</span>
            </ui-app-bar>

            <section class="ui-flex-grid" style="padding-top: var(--ui-app-bar-height);">
                <details>
                    <summary class="ui-ripple">UI: Button</summary>

                    <!-- TODO: Add all button (colors, variants) here -->
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
