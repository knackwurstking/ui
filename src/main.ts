//import "../dist/style.css";
//import "../dist/ui.min.js";
//import "../lib";
import { html } from "../lib";

function main() {
    const app = document.querySelector<HTMLElement>(`#app`)!;

    app.innerHTML = html`
        <ui-theme-handler theme="gruvbox" auto></ui-theme-handler>

        <section class="has-border">
            <h1><u>Text Components</u></h1>

            <section>
                <ui-text>UIText Component - "ui-text"</ui-text>

                <br />

                <ui-primary>UIPrimary Component - "ui-primary"</ui-primary>

                <br />

                <ui-secondary>
                    UISecondary Component - "ui-secondary"
                </ui-secondary>

                <br />

                <ui-label
                    primary="The primary Label text"
                    secondary="Some secondary Label text"
                >
                    <ui-text>
                        @TODO: Replace this with an checkbox component
                    </ui-text>
                </ui-label>

                <ui-label
                    primary="Ripple Label"
                    secondary="A Label with ripple attribute set"
                    ripple
                >
                    <ui-text>
                        @TODO: Replace this with an checkbox component
                    </ui-text>
                </ui-label>
            </section>
        </section>
    `;
}

main();
