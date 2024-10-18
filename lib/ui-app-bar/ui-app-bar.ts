import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { UIAppBarItem } from "./ui-app-bar-item";

export type UIAppBarPosition = "top" | "bottom";
export type UIAppBarSlots = "left" | "center" | "right";

/**
 * **Tag**: ui-app-bar
 *
 * **Attributes**:
 *  - position: `"top" | "bottom"`
 *  - fixed: `boolean`
 *
 * **Public Methods**:
 *  - `content(...)`
 *  - `contentName(...)`
 *
 * **Slots**:
 *  - left
 *  - center
 *  - right
 */
@customElement("ui-app-bar")
export class UIAppBar extends LitElement {
    @property({ type: String, attribute: "position", reflect: true })
    position: UIAppBarPosition = "top";

    @property({ type: Boolean, attribute: "fixed", reflect: true })
    fixed: boolean = false;

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }

            :host {
                display: block;
                width: 100%;
                overflow: hidden;
                padding: calc(var(--ui-spacing) / 2);

                background-color: hsla(
                    var(--ui-hsl-backdrop),
                    var(--ui-hsl-backdrop-alpha)
                );
                -webkit-backdrop-filter: var(--ui-backdropFilter);
                backdrop-filter: var(--ui-backdropFilter);
            }

            :host([position="top"]),
            :host([position="bottom"]) {
                z-index: 100;
                position: absolute !important;
                left: 0;
                right: 0;
                height: var(--ui-app-bar-height);
            }

            :host([position="top"]):host([fixed]),
            :host([position="bottom"]):host([fixed]) {
                position: fixed !important;
            }

            :host([position="top"]) {
                top: 0;
                border-bottom: 1px solid hsl(var(--ui-hsl-borderColor));
            }

            :host([position="bottom"]) {
                bottom: 0;
                border-top: 1px solid hsl(var(--ui-hsl-borderColor));
            }

            :host > ui-flex-grid-row {
                width: 100%;
                height: 100%;
                align-items: center;
                justify-content: space-between;
            }

            :host > ui-flex-grid-row > * {
                height: 100%;
            }

            :host > ui-flex-grid-row > *:nth-child(1),
            :host > ui-flex-grid-row > *:nth-child(3) {
                width: fit-content;
            }

            :host > ui-flex-grid-row > [slot="left"] {
                margin-left: 0 !important;
            }

            :host > ui-flex-grid-row > [slot="center"] {
                width: 100%;
            }

            :host > ui-flex-grid-row > [slot="right"] {
                margin-right: 0 !important;
                justify-content: flex-end;
            }
        `;
    }

    protected render() {
        return html`
            <ui-flex-grid-row gap="0.25rem">
                <ui-flex-grid-row gap="0.25rem" align="center">
                    <slot name="left"></slot>
                </ui-flex-grid-row>

                <ui-flex-grid-row
                    gap="0.25rem"
                    style="overflow: hidden;"
                    align="center"
                >
                    <slot name="center"></slot>
                </ui-flex-grid-row>

                <ui-flex-grid-row gap="0.25rem" align="center">
                    <slot name="right"></slot>
                </ui-flex-grid-row>
            </ui-flex-grid-row>
        `;
    }

    content<T extends UIAppBarItem>(slot: UIAppBarSlots): T[] {
        return [...this.querySelectorAll<T>(`[slot="${slot}"]`)];
    }

    contentName<T extends UIAppBarItem>(name: string): T | null {
        return this.querySelector<T>(`[name="${name}"]`);
    }
}
