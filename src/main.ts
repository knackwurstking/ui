//import "../dist/style.css";
//import "../dist/ui.min.js";
//import "../lib";
import { html } from "../lib";

function main() {
    const app = document.querySelector<HTMLElement>(`#app`)!;

    app.innerHTML = html`
        <section>
            <ui-theme-handler theme="gruvbox" auto></ui-theme-handler>

            <ui-text>UIText Element</ui-text>

            <br />

            <ui-secondary>UISecondary Element</ui-secondary>

            <br />

            <ui-primary>UIPrimary Element</ui-primary>
        </section>
    `;
}

main();
