const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
            position: absolute;
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

export class StackLayoutPage extends HTMLElement {

    static register = () => customElements.define("ui-stack-layout-page", StackLayoutPage);
    static observedAttributes = ["name"]

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.name = ""
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "name":
                this.name = newValue !== null ? name : ""
                break
        }
    }
}
