import { html } from "../js";
import chevronDown from "../svg/smoothie-line-icons/chevron-down";

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
      /** @private */
      root: this,

      get title() {
        return this.root.getAttribute("title");
      },

      set title(value) {
        if (!value) {
          this.root.removeAttribute("title");
          return;
        }

        this.root.setAttribute("title", value);
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

        :host([fold]) .icon {
          transform: rotate(-90deg);
        }

        :host([fold]) ::slotted(*) {
          display: none !important;
        }
      </style>

      <ul>
        <ui-drawer-group-item>
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
        this.setGroupTitle(newValue);
        break;
    }
  }

  /**
   * @param {string | null} title
   */
  setGroupTitle(title) {
    let item = this.shadowRoot.querySelector(`.title`);

    if (!title) {
      item.classList.remove("visible");
      return;
    }

    item.classList.add("visible");
    item.innerHTML = `
            <span
                style="
                    font-size: 1.5rem;
                    font-weight: 600;
                    font-variation-settings: var(--ui-heading-fontVariation);
                "
            >
                ${title}
            </span>
        `;
  }
}
