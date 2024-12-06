import "../dist/style.css";
import "../dist/ui.min.js";

import { html, LitElement, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("main-app")
export class MainApp extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        this.style.height = "100vh";

        this.setAttribute("is-container", "");
        this.setAttribute("is-debug", "");

        return this;
    }

    protected render() {
        return html`
            <ui-theme-handler themes-path="/themes" theme="gruvbox" auto></ui-theme-handler>

            <ui-flex-grid gap="calc(var(--ui-spacing) / 2)" has-padding>
                <details>
                    <summary>UI: Button</summary>

                    <!-- TODO: Add all button (colors, variants) here -->
                </details>

                <details>
                    <summary>UI: Text</summary>

                    <!-- TODO: Add all button (colors, variants) here -->
                </details>
            </ui-flex-grid>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        if ("ui" in window) {
            console.debug(window.ui);
        }
    }
}
