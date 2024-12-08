import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import UIAppBarItem from "./ui-app-bar-item";

export type UIAppBarPosition = "top" | "bottom";
export type UIAppBarSlots = "left" | "center" | "right";

/**
 * @element ui-app-bar
 *
 * @slot left
 * @slot center
 * @slot right
 */
@customElement("ui-app-bar")
class UIAppBar<N extends string> extends LitElement {
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
            }

            :host([position="top"]),
            :host([position="bottom"]) {
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
                border-bottom: 1px solid var(--ui-borderColor);
            }

            :host([position="bottom"]) {
                bottom: 0;
                border-top: 1px solid var(--ui-borderColor);
            }

            :host > ui-flex-grid-row {
                width: 100%;
                height: 100%;
                align-items: center;
                justify-content: space-between;
            }

            :host > ui-flex-grid-row > * {
                height: 100%;
                width: 100%;
            }

            /* TODO: Move this styles to the css file for the ui-appb-bar comp.
                :host > ui-flex-grid-row > *:nth-child(1),
                :host > ui-flex-grid-row > *:nth-child(3) {
                    width: fit-content;
                }
            */
        `;
    }

    protected render() {
        return html`
            <ui-flex-grid-row gap="0.25rem">
                <ui-flex-grid-row gap="0.25rem" align="center">
                    <slot name="left"></slot>
                </ui-flex-grid-row>

                <ui-flex-grid-row gap="0.25rem" style="overflow: hidden;" align="center">
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

    contentName<T extends UIAppBarItem>(name: N): T | null {
        return this.querySelector<T>(`[name="${name}"]`);
    }
}

export default UIAppBar;
