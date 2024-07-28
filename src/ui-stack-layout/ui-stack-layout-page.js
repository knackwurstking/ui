import { html } from "../js";

export class UIStackLayoutPage extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-stack-layout-page")) {
      customElements.define("ui-stack-layout-page", UIStackLayoutPage);
    }
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.ui = {
      root: this,

      get name() {
        return this.root.getAttribute("name");
      },

      set name(value) {
        if (!value) {
          this.root.removeAttribute("name");
          return;
        }

        this.root.setAttribute("name", value);
      },
    };

    this.shadowRender();
  }

  shadowRender() {
    this.shadowRoot.innerHTML = html`
      <style>
        :host {
          display: block !important;
          position: absolute !important;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          animation: fade-in 0.5s;
          transition: opacity 0.5s ease;
        }

        :host(:last-child) {
          opacity: 1;
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      </style>

      <slot></slot>
    `;
  }

  connectedCallback() {}
  disconnectedCallback() {}
}
