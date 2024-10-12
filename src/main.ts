//import "../dist/style.css";
//import "../dist/ui.min.js";
//import "../lib";
import { html, svg, UISvg } from "../lib";

function main() {
    const app = document.querySelector<HTMLElement>(`#app`)!;

    app.classList.add("is-container");
    //app.classList.add("fluid");

    app.innerHTML = html`
        <ui-theme-handler theme="gruvbox" auto></ui-theme-handler>
        <ui-store storage-prefix storage></ui-store>

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

        <section class="has-border" style="margin-top: var(--ui-spacing);">
            <h1><u>Stack Layout</u></h1>

            <ui-flex-grid gap="0.25rem">
                <ui-flex-grid-row gap="0.25rem">
                    <ui-flex-grid-item>
                        <ui-button name="add" class="primary">
                            Add one page
                        </ui-button>
                    </ui-flex-grid-item>

                    <ui-flex-grid-item>
                        <ui-button name="back" color="secondary">
                            Go back one page
                        </ui-button>
                    </ui-flex-grid-item>
                </ui-flex-grid-row>

                <ui-flex-grid-row gap="0.25rem">
                    <ui-stack-layout
                        class="has-border"
                        style="width: 100%; min-height: 7.5rem;"
                    >
                        <ui-stack-layout-page
                            name="page 1"
                        ></ui-stack-layout-page>
                        <ui-stack-layout-page
                            name="page 2"
                        ></ui-stack-layout-page>
                        <ui-stack-layout-page
                            name="page 3"
                        ></ui-stack-layout-page>
                        <ui-stack-layout-page
                            name="page 4"
                        ></ui-stack-layout-page>
                    </ui-stack-layout>
                </ui-flex-grid-row>
            </ui-flex-grid>
        </section>
    `;

    // TODO: Adding buttons to the stack layout section and testing property
    //       changes (ex.: Changing color attribute inside an intervall
    //       of 1 or 2 seconds)

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
