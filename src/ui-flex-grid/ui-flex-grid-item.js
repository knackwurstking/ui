import { html } from "../js";

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

    this.ui = {
      root: this,

      get flex() {
        return this.root.getAttribute("flex");
      },

      set flex(value) {
        if (!value) {
          this.root.removeAttribute("flex");
          return;
        }

        this.root.setAttribute("flex", value);
      },
    };

    this.shadowRender();
  }

  shadowRender() {
    this.shadowRoot.innerHTML = html`
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
        const style = this.shadowRoot.querySelector(`style[name="flex"]`);
        style.textContent = `
                    :host {
                        flex: ${newValue || 1};
                    }
                `;
        break;
    }
  }
}
