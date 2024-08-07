import { css, html } from "../js";

export class UIFlexGridItem extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-flex-grid-item")) {
      customElements.define("ui-flex-grid-item", UIFlexGridItem);
    }
  };

  static observedAttributes = ["flex"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    /** @private */
    this.flex = "1";

    this.ui = {
      root: this,

      get flex() {
        return this.root.flex;
      },

      set flex(value) {
        this.root.flex = value || "1";
        const style = this.root.shadowRoot.querySelector(`style[name="flex"]`);
        style.textContent = css`
          :host {
            flex: ${this.root.flex};
          }
        `;
      },
    };

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
        }
      </style>

      <style name="flex">
        :host {
          flex: 1;
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
      case "flex":
        this.ui.flex = newValue;
        break;
    }
  }
}
