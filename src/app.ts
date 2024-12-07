import "../lib/css/main.css";
import "../dist/ui.min.js";

import { html, LitElement, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("main-app")
export class MainApp extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        this.style.height = "100vh";

        this.classList.add("is-container");
        //this.classList.add("is-debug");

        return this;
    }

    protected render() {
        return html`
            <ui-theme-handler themes-path="/themes" theme="gruvbox" auto></ui-theme-handler>

            <section --padding="0.25rem">
                <details>
                    <summary>UI: Button</summary>

                    <!-- TODO: Add all button (colors, variants) here -->
                    <hr />
                    <pre>
Test Code

Multiline...</pre
                    >
                </details>

                <details>
                    <summary>UI: Text</summary>

                    <!-- TODO: Add all button (colors, variants) here -->
                </details>
            </section>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        if ("ui" in window) {
            console.debug(window.ui);
        }
    }
}
