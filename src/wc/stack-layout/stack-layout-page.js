import { StackLayout } from "./stack-layout";

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
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

    get name() {
        return this.getAttribute("name") || ""
    }

    get title() {
        return this.getAttribute("title") || ""
    }

    connectedCallback() {
        if (this.parentElement instanceof StackLayout) {
            if (this.parentElement.debug)
                console.log(`[StackLayoutPage] connectedCallback: name=${this.name} title=${this.title}`);
        }
    }

    disconnectedCallback() {
        if (this.parentElement instanceof StackLayout) {
            if (this.parentElement.debug)
                console.log(`[StackLayoutPage] disconnectedCallback: title=${this.getAttribute("title")}`);
        }
    }
}
