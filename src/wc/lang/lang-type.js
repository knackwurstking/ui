export class LangType extends HTMLElement {

    static register = () => customElements.define("ui-lang-type", LangType);
    static observedAttributes = ["name", "href", "fallback"]

    constructor() {
        super();

        this.name = ""
        this.href = ""
        this.fallback = false
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "name":
                this.name = newValue != null ? newValue : ""
                break
            case "href":
                this.href = newValue != null ? newValue : ""
                break
            case "fallback":
                this.fallback = newValue != null
                break
        }
    }
}
