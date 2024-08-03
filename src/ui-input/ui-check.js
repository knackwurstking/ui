import { html } from "../js";

export class UICheck extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-check")) {
      customElements.define("ui-check", UICheck);
    }
  };

  static observedAttributes = ["value", "checked"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.ui = {
      /** @private */
      root: this,

      /** @type {HTMLInputElement | null} */
      input: null,

      get value() {
        return this.input.value;
      },

      set value(value) {
        this.input.value = value;
      },

      get checked() {
        return this.input.checked;
      },

      set checked(value) {
        this.input.checked = value;
      },
    };

    this.shadowRender();
  }

  shadowRender() {
    this.shadowRoot.innerHTML = html`
      <ui-label>
        <input slot="input" type="checkbox"></input>
      </ui-label>
    `;

    this.ui.input = this.shadowRoot.querySelector("input");
  }

  connectedCallback() {}
  disconnectedCallback() {}

  /**
   * @param {string} name
   * @param {string | null} _oV
   * @param {string | null} nV
   */
  attributeChangedCallback(name, _oV, nV) {
    switch (name) {
      case "value":
        this.ui.value = nV;
        break;

      case "checked":
        this.ui.checked = nV !== null;
        break;
    }
  }
}
