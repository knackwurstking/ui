import chevronDown from "../svg/smoothie-line-icons/chevron-down";
import { html, ripple } from "../utils";

/**
 * HTML: `ui-drawer-group`
 *
 * Attributes:
 *  - title: string
 *
 * Slots:
 *  - *
 */
export class UIDrawerGroup extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-drawer-group")) {
      customElements.define("ui-drawer-group", UIDrawerGroup);
    }
  };

  static observedAttributes = ["title"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.ui = {
      root: this,

      get title() {
        return this.root.shadowRoot.querySelector(`.title`).innerHTML;
      },

      set title(value) {
        let item = this.root.shadowRoot.querySelector(`.title`);

        if (!value) {
          item.classList.remove("visible");
          return;
        }

        item.classList.add("visible");
        item.innerHTML = html`
          <span
            style="
              font-size: 1.5rem;
              font-weight: 600;
              font-variation-settings: var(--ui-heading-fontVariation);
            "
          >
            ${value}
          </span>
        `;
      },

      get fold() {
        return this.root.hasAttribute("fold");
      },

      set fold(value) {
        if (!value) {
          this.root.removeAttribute("fold");
          return;
        }

        this.root.setAttribute("fold", "");
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

        ul {
          margin: 0;
          list-style: none;
          padding: var(--ui-spacing);
          overflow: hidden;
          border-bottom: 1px solid var(--ui-borderColor);
        }

        ui-drawer-group-item {
          display: flex;
          cursor: pointer;
        }

        .title:not(.visible) {
          display: none;
        }

        .icon {
          transition: transform 0.25s ease;
        }

        :host([fold]) .icon {
          transform: rotate(-90deg);
        }

        :host([fold]) ::slotted(*) {
          display: none !important;
        }
      </style>

      <ul>
        <ui-drawer-group-item
          style="position: relative; border-radius: var(--ui-radius);"
          role="button"
        >
          <ui-flex-grid-row>
            <ui-flex-grid-item class="title"></ui-flex-grid-item>

            <ui-flex-grid-item class="icon" flex="0">
              <ui-svg style="width: 2.5rem; height: 2.5rem;">
                ${chevronDown}
              </ui-svg>
            </ui-flex-grid-item>
          </ui-flex-grid-row>
        </ui-drawer-group-item>

        <slot></slot>
      </ul>
    `;

    // Click handler for fold and unfold a group
    const item = this.shadowRoot.querySelector("ui-drawer-group-item");
    item.addEventListener("click", () => {
      this.ui.fold = !this.ui.fold;
    });
    ripple.create(item);
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
      case "title":
        this.ui.title = newValue;
        break;
    }
  }
}
