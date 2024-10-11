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

                <!-- TODO: Add label component example here -->
            </section>
        </section>
    `;
}

main();
