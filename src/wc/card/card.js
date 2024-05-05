const innerHTML = `
<style>
    background-color: var(--ui-card-bgColor);
    color: var(--ui-card-color);
    border: 1px solid var(--ui-card-borderColor);
    border-radius: var(--ui-card-radius);
    padding: var(--ui-spacing);
</style>
`;

export class Card extends HTMLElement {

    static register = () => customElements.define("ui-card", Card);

    constructor() {
        super()
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = innerHTML
    }
}
