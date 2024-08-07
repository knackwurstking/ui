import { Events, html } from "../js";

/**
 * @typedef UIDrawerEvents
 * @type {{
 *  open: UIDrawer,
 *  close: UIDrawer,
 * }}
 */

export class UIDrawer extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-drawer")) {
      customElements.define("ui-drawer", UIDrawer);
    }
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.ui = {
      root: this,

      /**
       * @type {Events<UIDrawerEvents>}
       */
      events: new Events(),

      get open() {
        return this.root.hasAttribute("open");
      },

      set open(state) {
        if (!state) {
          this.root.removeAttribute("open");
          this.events.dispatch("close", this.root);
          return;
        }

        this.root.setAttribute("open", "");
        this.events.dispatch("open", this.root);
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

          position: absolute !important;
          z-index: 150;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;

          overflow: hidden;

          transition: left 0s ease 0.5s;
        }

        :host([open]) {
          background-color: var(--ui-backdrop-bgColor);
          -webkit-backdrop-filter: var(--ui-backdropFilter);
          backdrop-filter: var(--ui-backdropFilter);

          left: 0;

          transition: none;
        }

        aside {
          position: absolute;
          z-index: 150;
          top: 0;
          left: -100%;
          width: var(--ui-drawer-width, fit-content);
          max-width: 100%;
          height: 100%;

          overflow-x: hidden;
          overflow-y: auto;
          scroll-behavior: smooth;

          -ms-overflow-style: none;
          scrollbar-width: none;

          background-color: var(--ui-card-bgColor);
          color: var(--ui-card-color);

          /*
                    background-color: var(--ui-backdrop-bgColor);
                    -webkit-backdrop-filter: var(--ui-backdropFilter);
                    backdrop-filter: var(--ui-backdropFilter);
                    */

          border-right: 1px solid var(--ui-card-borderColor);

          transition: left 0.5s ease;
        }

        aside::-webkit-scrollbar {
          display: none;
        }

        :host([open]) aside {
          left: 0;
        }
      </style>

      <aside>
        <slot></slot>
      </aside>
    `;

    this.shadowRoot
      .querySelector("aside")
      .addEventListener("click", (ev) => ev.stopPropagation());

    this.addEventListener("click", () => (this.ui.open = false));
  }

  connectedCallback() {
    this.setAttribute("role", "button");
  }

  disconnectedCallback() {}
}
