class UI {
    constructor() {
        this.name = ""
        this.href = ""
        this.fallback = false
    }
}

export class LangType extends HTMLElement {

    static register = () => customElements.define("ui-lang-type", LangType);
    static observedAttributes = ["name", "href", "fallback"]

    constructor() {
        super();

        this.ui = new UI()
    }

    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case "name":
                this.ui.name = newValue != null ? newValue : ""
                break
            case "href":
                this.ui.href = newValue != null ? newValue : ""
                break
            case "fallback":
                this.ui.fallback = newValue != null
                break
        }
    }
}
