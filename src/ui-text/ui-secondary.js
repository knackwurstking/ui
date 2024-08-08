import { html } from "../js";

export class UISecondary extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-secondary")) {
      customElements.define("ui-secondary", UISecondary);
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
        :host {
          font-size: 0.9rem;
          font-family: var(--ui-fontFamily);
          font-variation-settings: var(--ui-text-secondary-fontVariation);
          overflow-wrap: anywhere;
        }
      </style>

      <slot></slot>
    `;
  }

  connectedCallback() {}
  disconnectedCallback() {}
}
