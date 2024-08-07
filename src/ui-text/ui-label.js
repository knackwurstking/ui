import { createRipple, html } from "../js";

/**
 * Observed Attributes:
 *  - **primary**   - [type: string]
 *  - **secondary**   - [type: string]
 *  - **ripple**    - [type: flag]
 *
 * Special Slots:
 *  - **input** - click handling if "ripple" flag is set
 */
export class UILabel extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-label")) {
      customElements.define("ui-label", UILabel);
    }
  };

  static observedAttributes = ["ripple", "secondary", "primary"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    /**
     * @type {(() => void|Promise<void>) | null}
     */
    this.removeRipple = null;

    /** @private */
    this.running = false;

    /** @private */
    this.onClick = async () => {
      this.ui.inputSlot.forEach((/**@type {HTMLElement}*/ child) =>
        child.click(),
      );
    };

    /** @private */
    this.onInputClick = async (
      /** @type{MouseEvent & { currentTarget: Element }} */ ev,
    ) => {
      ev.stopPropagation();
    };

    this.ui = {
      root: this,

      get ripple() {
        return this.root.running;
      },

      set ripple(state) {
        if (!state) {
          this.root.disableRipple();
          return;
        }

        this.root.enableRipple();
      },

      get primary() {
        return this.root.shadowRoot.querySelector("ui-primary").innerHTML;
      },

      set primary(value) {
        this.root.shadowRoot.querySelector("ui-primary").innerHTML =
          value || "";
      },

      get secondary() {
        return this.root.shadowRoot.querySelector("ui-secondary").innerHTML;
      },

      set secondary(value) {
        this.root.shadowRoot.querySelector("ui-secondary").innerHTML =
          value || "";
      },

      get inputSlot() {
        return [...this.root.querySelectorAll(`[slot="input"]`)];
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
          position: relative !important;
          display: flex !important;
          flex-direction: row;
          width: 100%;
          padding: var(--ui-spacing);
          border-radius: var(--ui-radius);
        }

        :host > .text {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          margin-right: var(--ui-spacing);
        }

        :host > .input {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      </style>

      <span class="text">
        <ui-primary></ui-primary>
        <ui-secondary></ui-secondary>
      </span>

      <span class="input">
        <slot name="input"></slot>
        <slot></slot>
      </span>
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
      case "ripple":
        this.ui.ripple = newValue !== null;
        break;

      case "primary":
        this.ui.primary = newValue;
        break;

      case "secondary":
        this.ui.secondary = newValue;
        break;
    }
  }

  enableRipple() {
    if (!!this.removeRipple) return;
    this.removeRipple = createRipple(this);
    this.style.cursor = "pointer";

    // Enable input handler
    if (this.running) return;

    this.addEventListener("click", this.onClick);

    const inputSlot = [...this.querySelectorAll(`[slot="input"]`)];
    inputSlot.forEach((el) => {
      el.addEventListener("click", this.onInputClick);
    });

    this.running = true;
  }

  disableRipple() {
    if (!this.running) return;
    if (!!this.removeRipple) this.removeRipple();

    // Disable input handler
    this.removeEventListener("click", this.onClick);

    this.ui.inputSlot.forEach((el) => {
      el.removeEventListener("click", this.onInputClick);
    });

    this.running = false;
  }
}
