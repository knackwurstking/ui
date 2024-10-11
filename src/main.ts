//import "../dist/style.css";
//import "../dist/ui.min.js";
//import "../lib";
import { html, svg, UISvg } from "../lib";

function main() {
    const app = document.querySelector<HTMLElement>(`#app`)!;

    app.style.padding = "var(--ui-spacing)";

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

        <section
            id="svgs"
            class="has-border"
            style="margin-top: var(--ui-spacing);"
        >
            <h1><u>Svg's</u></h1>

            <section id="smoothieLineIcons">
                <h2><u>Smoothie Line Icons</u></h2>
            </section>
        </section>
    `;

    renderSvgs(app.querySelector(`section#svgs > section#smoothieLineIcons`)!);
}

function renderSvgs(container: HTMLElement) {
    let uiSvg: UISvg;
    for (const [name, value] of Object.entries(svg.smoothieLineIcons)) {
        uiSvg = new UISvg();
        container.appendChild(uiSvg);

        uiSvg.setAttribute("name", name);

        uiSvg.style.width = "2.5rem";
        uiSvg.style.height = "2.5rem";

        uiSvg.innerHTML = value;
    }
}

main();
