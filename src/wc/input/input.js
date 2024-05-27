const t = document.createElement("template");
t.innerHTML = `
    <style>
        .container {
        }
    </style>

    <span class="container">
    </span>
`;

export class Input extends HTMLElement {

    static register = customElements.define("ui-input", Input);

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(t.content.cloneNode(true));
    }
}
