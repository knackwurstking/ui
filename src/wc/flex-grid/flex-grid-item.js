const template = document.createElement("template");
template.innerHTML = `
<style>
    :host {
        flex: 1;
    }
</style>

<slot></slot>
`;

export class FlexGridItem extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        if (this.hasAttribute("flex")) {
            this.style.setProperty("flex", this.getAttribute("flex"));
        }
    }

}
