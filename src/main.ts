import "../css/main.css";
import "../lib";
import { html } from "../lib/utils";

function main() {
    const app = document.querySelector<HTMLElement>(`#app`)!;

    app.innerHTML = html`
        <ui-theme-handler auto></ui-theme-handler>

        <ui-text>UIText Element</ui-text>
        <br />
        <ui-secondary>UISecondary Element</ui-secondary>
    `;
}

main();
