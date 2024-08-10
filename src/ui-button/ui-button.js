import { Events, html, ripple } from "../utils";

/**
 * @typedef UIButton_Color
 * @type {(
 *  | "primary"
 *  | "secondary"
 *  | "destructive"
 * )}
 *
 * @typedef UIButton_Variant
 * @type {(
 *  | "full"
 *  | "outline"
 *  | "ghost"
 * )}
 *
 * @typedef UIButton_Events
 * @type {{
 *  click: UIButton;
 * }}
 */

export class UIButton extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-button")) {
      customElements.define("ui-button", UIButton);
    }
  };

  static observedAttributes = ["noripple"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    /** @type {import("../utils").Ripple | null} */
    this.ripple = null;

    this.ui = {
      root: this,

      /**
       * @type {Events<UIButton_Events>}
       */
      events: new Events(),

      get noripple() {
        return !this.root.removeRippleCallback;
      },

      set noripple(state) {
        if (!state) {
          if (!!this.root.removeRippleCallback) return;

          this.root.removeRippleCallback = ripple.create(this.root);
        }

        if (!this.root.removeRippleCallback) return;

        this.root.ripple.destroy();
        this.root.removeRippleCallback = null;
      },

      get color() {
        return this.root.getAttribute("color");
      },

      set color(value) {
        if (!value) {
          this.root.removeAttribute("color");
          return;
        }

        this.root.setAttribute("color", value);
      },

      get variant() {
        return this.root.getAttribute("variant");
      },

      set variant(value) {
        if (!value) {
          this.root.removeAttribute("variant");
          return;
        }

        this.root.setAttribute("variant", value);
      },

      get disabled() {
        return this.root.hasAttribute("disabled");
      },

      set disabled(state) {
        if (!state) {
          this.root.removeAttribute("disabled");
          return;
        }

        this.root.setAttribute("disabled", "");
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
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative !important;
          padding: var(--ui-spacing) calc(var(--ui-spacing) * 2.5);
          border: 1px solid currentColor;
          border-radius: var(--ui-radius);
          overflow: hidden;
          text-transform: capitalize;
          cursor: pointer;
          outline: none;
          user-select: none;
          font-size: 1.1rem;
          font-weight: 450;
          font-family: var(--ui-fontFamily);
          font-variation-settings: var(--ui-button-fontVariation);
        }

        :host([variant="full"]) {
          border: none;
        }

        :host([variant="full"][color="primary"]) {
          background-color: var(--ui-primary-bgColor);
          color: var(--ui-primary-color);
        }

        :host([variant="full"][color="secondary"]) {
          background-color: var(--ui-secondary-bgColor);
          color: var(--ui-secondary-color);
        }

        :host([variant="full"][color="destructive"]) {
          background-color: var(--ui-destructive-bgColor);
          color: var(--ui-destructive-color);
        }

        :host([variant="outline"]) {
          border-color: currentColor;
          background-color: transparent;
        }

        :host([variant="outline"][color="primary"]) {
          color: var(--ui-primary-bgColor);
        }

        :host([variant="outline"][color="secondary"]) {
          color: var(--ui-secondary-bgColor);
        }

        :host([variant="outline"][color="destructive"]) {
          color: var(--ui-destructive-bgColor);
        }

        :host([variant="ghost"]) {
          border-color: transparent;
          background-color: transparent;
          font-weight: 900;
        }

        :host([variant="ghost"][color="primary"]) {
          color: var(--ui-primary-bgColor);
        }

        :host([variant="ghost"][color="secondary"]) {
          color: var(--ui-secondary-bgColor);
        }

        :host([variant="ghost"][color="destructive"]) {
          color: var(--ui-destructive-bgColor);
        }

        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
          background-color: transparent;
          opacity: 0.25;
          cursor: default;
          pointer-events: none;
        }
      </style>

      <slot></slot>
    `;

    if (typeof this.removeRippleCallback !== "function") {
      this.removeRippleCallback = ripple.create(this);
    }

    this.addEventListener("click", () => {
      this.ui.events.dispatch("click", this);
    });
  }

  connectedCallback() {
    this.setAttribute("role", "button");
  }

  disconnectedCallback() {}

  /**
   * @param {string} name
   * @param {string | null} _oldValue
   * @param {string | null} newValue
   */
  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "noripple":
        this.ui.noripple = newValue !== null;
        break;
    }
  }
}
