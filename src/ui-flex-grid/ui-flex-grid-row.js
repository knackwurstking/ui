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

    this.ui = {
      root: this,

      get gap() {
        return this.root.getAttribute("gap");
      },

      set gap(value) {
        if (!value) {
          this.root.removeAttribute("gap");
          return;
        }

        this.root.setAttribute("gap", value);
      },

      get justify() {
        return this.root.getAttribute("justify");
      },

      set justify(value) {
        if (!value) {
          this.root.removeAttribute("justify");
          return;
        }

        this.root.setAttribute("justify", value);
      },

      get align() {
        return this.root.getAttribute("align");
      },

      set align(value) {
        if (!value) {
          this.root.removeAttribute("align");
          return;
        }

        this.root.setAttribute("align", value);
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
        const style = this.shadowRoot.querySelector(`style[name="gap"]`);
        style.textContent = `
                    :host > ::slotted(*) {
                        margin: 0 ${newValue || 0} !important;
                    }
                `;
        break;

      case "justify":
        this.style.justifyContent = newValue;
        break;

      case "align":
        this.style.alignItems = newValue;
        break;
    }
  }
}
