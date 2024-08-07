import { CleanUp, Events, html } from "../js";
import svgClose from "../svg/smoothie-line-icons/close";

/**
 * @typedef UIDialogEvents
 * @type {{
 *  open: null;
 *  close: null;
 * }}
 */

/**
 * Special slots to use:
 *  - **title**: all childrens go into _"dialog header > span"_, just use the `Dialog.ui.title` setter/getter
 *  - **actions**: all childrens go into _"dialog footer > ui-flex-grid-row"_
 *
 * @template {UIDialogEvents} T
 */
export class UIDialog extends HTMLElement {
  static register = () => {
    if (!customElements.get("ui-dialog")) {
      customElements.define("ui-dialog", UIDialog);
    }
  };

  static observedAttributes = ["title"];

  /**
   * @param {string} title
   */
  constructor(title) {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRenderCleanUp = new CleanUp();

    this._title = title || "";

    this.ui = {
      root: this,

      /** @type {Events<T>} */
      events: new Events(),

      get title() {
        return this.root.shadowRoot.querySelector(`[name="title"]`).innerHTML;
      },

      set title(value) {
        const title = this.root.shadowRoot.querySelector(`[name="title"]`);
        this.root._title = title.innerHTML = value || "";
      },

      get fullscreen() {
        return this.root.hasAttribute("fullscreen");
      },

      set fullscreen(state) {
        if (!state) {
          this.root.removeAttribute("fullscreen");
          return;
        }

        this.root.setAttribute("fullscreen", "");
      },

      /**
       * @param {boolean} modal
       * @param {boolean} [inert] - This will prevent the autofocus on input elements (default: true)
       */
      open(modal = false, inert = true) {
        const dialog = this.root.shadowRoot.querySelector("dialog");

        const inertBackup = dialog.inert;
        dialog.inert = inert;

        if (!!modal) {
          dialog.showModal();
        } else {
          dialog.show();
        }

        this.events.dispatch("open", null);
        dialog.inert = inertBackup;
      },

      close() {
        this.events.dispatch("close", null);

        const dialog = this.root.shadowRoot.querySelector("dialog");
        dialog.close();
      },
    };

    this.shadowRender();
  }

  shadowRender() {
    this.shadowRenderCleanUp.run();

    this.shadowRoot.innerHTML = html`
      <style>
        * {
          box-sizing: border-box;
        }

        :host dialog * {
          box-sizing: border-box;
        }

        dialog {
          position: fixed !important;

          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          max-width: 100%;
          max-height: 100%;

          margin: 0;
          padding: 0;

          border: none;
          outline: none;

          background-color: transparent;

          -ms-overflow-style: none;
          scrollbar-width: none;

          z-index: 999;
        }

        dialog::-webkit-scrollbar {
          display: none;
        }

        dialog::backdrop {
          background-color: var(--ui-backdrop-bgColor);
          backdrop-filter: var(--ui-backdropFilter);
        }

        dialog > .container {
          background-color: var(--ui-bgColor);
          color: var(--ui-color);

          border: 1px solid var(--ui-borderColor);
          border-radius: var(--ui-radius);

          padding: var(--ui-spacing);

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          position: relative;
        }

        :host([fullscreen]) dialog {
          width: 100%;
          height: 100%;
        }

        :host([fullscreen]) dialog > .container {
          width: calc(100% - var(--ui-spacing) * 2);
          height: calc(
            100% -
              (
                env(safe-area-inset-top, 0) + env(safe-area-inset-bottom, 0) +
                  (var(--ui-spacing) * 2)
              )
          );

          margin: var(--ui-spacing);
          margin-top: calc(env(safe-area-inset-top, 0) + var(--ui-spacing));
          margin-bottom: calc(
            env(safe-area-inset-bottom, 0) + var(--ui-spacing)
          );
        }

        /*
         * Header Styles
         */

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          border-top-right-radius: var(--ui-radius);
          border-top-left-radius: var(--ui-radius);

          width: 100%;
          height: var(--ui-dialog-header-height);
        }

        .header h4 {
          margin: auto 0;
        }

        :host([fullscreen]) .header {
          z-index: 15;
          position: absolute;
          top: var(--ui-spacing);
          right: var(--ui-spacing);
          left: var(--ui-spacing);
          width: calc(100% - var(--ui-spacing) * 2);
        }

        /*
         * Content Styles
         */

        .content {
          padding: var(--ui-spacing);
          height: fit-content;
          min-width: fit-content;
          width: 100%;
        }

        :host([fullscreen]) .content {
          z-index: 10;
          position: absolute;
          top: calc(var(--ui-dialog-header-height) + var(--ui-spacing));
          bottom: calc(var(--ui-dialog-footer-height) + var(--ui-spacing));
          right: var(--ui-spacing);
          left: var(--ui-spacing);
          padding: unset;
          height: unset;
          width: unset;
          min-width: unset;
        }

        /*
         * Footer Styles
         */

        .footer {
          margin-top: var(--ui-spacing);
          border-bottom-right-radius: var(--ui-radius);
          border-bottom-left-radius: var(--ui-radius);

          width: 100%;
          height: var(--ui-dialog-footer-height);
        }

        :host([fullscreen]) .footer {
          z-index: 15;
          position: absolute;
          right: var(--ui-spacing);
          bottom: var(--ui-spacing);
          left: var(--ui-spacing);
          width: calc(100% - var(--ui-spacing) * 2);
        }

        .footer ui-flex-grid-row {
          height: 100%;
          flex-wrap: nowrap;
          justify-content: flex-end;
          align-items: center;
        }
      </style>

      <dialog>
        <div class="container">
          <div class="header">
            <span style="white-space: nowrap;">
              <h3 name="title"></h3>
            </span>

            <ui-icon-button
              style="width: var(--ui-dialog-header-height); height: 100%;"
              ghost
            >
              ${svgClose}
            </ui-icon-button>
          </div>

          <div class="content">
            <slot></slot>
          </div>

          <div class="footer">
            <ui-flex-grid-row gap="calc(var(--ui-spacing) / 2)">
              <slot name="actions"></slot>
            </ui-flex-grid-row>
          </div>
        </div>
      </dialog>
    `;

    this.ui.title = this._title;

    // Close button
    const button = this.shadowRoot.querySelector(".header ui-icon-button");
    const onClick = () => this.ui.close();
    button.addEventListener("click", onClick);

    // Dialog - Disable escape key action
    const dialog = this.shadowRoot.querySelector("dialog");
    const onCancel = (/** @type {Event} */ ev) => ev.preventDefault();
    dialog.addEventListener("cancel", onCancel);

    this.shadowRenderCleanUp.add(() => {
      button.removeEventListener("click", onClick);
      dialog.removeEventListener("cancel", onCancel);
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
        this.ui.title = newValue;
        break;
    }
  }
}
