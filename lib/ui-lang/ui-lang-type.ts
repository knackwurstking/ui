import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ui-lang-type")
export class UILangType extends LitElement {
    @property({ type: String, attribute: "name" })
    name: string = "";

    @property({ type: String, attribute: "href" })
    href: string = "";

    @property({ type: Boolean, attribute: "fallback" })
    fallback: boolean = false;
}
