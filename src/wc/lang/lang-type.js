export class LangType extends HTMLElement {
    constructor() {
        super();
    }

    set name(name) {
        this.setAttribute("name", name);
    }

    get name() {
        return this.getAttribute("name");
    }

    set href(href) {
        this.setAttribute("href", href);
    }

    get href() {
        return this.getAttribute("href");
    }

    set fallback(state) {
        if (state) {
            this.setAttribute("fallback", "");
        } else {
            this.removeAttribute("fallback");
        }
    }

    get fallback() {
        return this.hasAttribute("fallback");
    }
}
