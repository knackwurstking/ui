import { html } from "../js";

export class UIFlexGridRow extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-flex-grid-row")) {
      customElements.define("ui-flex-grid-row", UIFlexGridRow);
    }
  };

  static observedAttributes = ["gap", "justify", "align"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    /** @private */
    this.gap = "0";

    this.ui = {
      root: this,

      get gap() {
        return this.root.gap;
      },

      set gap(value) {
        this.root.gap = value || "0";
        const style = this.root.shadowRoot.querySelector(`style[name="gap"]`);
        style.textContent = `
          :host > ::slotted(*) {
            margin: 0 ${this.root.gap} !important;
          }
        `;
      },

      get justify() {
        return this.root.style.justifyContent;
      },

      set justify(value) {
        this.root.style.justifyContent = value;
      },

      get align() {
        return this.root.style.alignItems;
      },

      set align(value) {
        this.root.style.alignItems = value;
      },
    };

    this.shadowRender();
  }

  shadowRender() {
    this.shadowRoot.innerHTML = html`
      <style>
        :host {
          display: flex !important;
          flex-flow: row nowrap;
          position: relative !important;
          width: 100%;
        }
      </style>

      <style name="gap">
        :host > ::slotted(*) {
          margin: 0 0 !important;
        }
      </style>

      <style>
        :host > ::slotted(*:first-child) {
          margin-left: 0 !important;
        }

        :host > ::slotted(*:last-child) {
          margin-right: 0 !important;
        }
      </style>

      <slot></slot>
    `;
  }

  connectedCallback() {}
  disconnectedCallback() {}

  /**
   * @param {string} name
   * @param {string | null} _oldValue
   * @param {string | null} newValue
   */
  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "gap":
        this.ui.gap = newValue;
        break;

      case "justify":
        this.ui.justify = newValue;
        break;

      case "align":
        this.ui.align = newValue;
        break;
    }
  }
}
