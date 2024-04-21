const template = document.createElement("template");
template.innerHTML = `
<style>
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
        this.style.setProperty("flex", this.getAttribute("flex") || "1");
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        // ...
    }
}
