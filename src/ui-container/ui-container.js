import { html } from "../utils";

export class UIContainer extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-container")) {
      customElements.define("ui-container", UIContainer);
    }
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.ui = {};

    this.shadowRender();
  }

  shadowRender() {
    this.shadowRoot.innerHTML = html`
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
          width: 100%;
          max-width: 65rem;
          margin: 0 auto !important;
          padding: var(--ui-spacing);
        }
      </style>

      <slot></slot>
    `;
  }

  connectedCallback() {}
  disconnectedCallback() {}
}
