import "../lib/css/main.css";
import "../dist/ui.min.umd.cjs";

import { html, LitElement, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("main-app")
export class MainApp extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        this.style.height = "100vh";

        this.classList.add("ui-container");
        //this.classList.add("ui-debug");

        return this;
    }

    protected render() {
        return html`
            <ui-theme-handler themes-path="/themes" theme="gruvbox" auto></ui-theme-handler>

            <section class="ui-flex-grid has-padding">
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
