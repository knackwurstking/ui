import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { UILangType } from "./ui-lang-type";
import { Events } from "../utils";

@customElement("ui-lang")
export class UILang extends LitElement {
    private data: { [key: string]: { [key: string]: string } } = {};

    public events: Events<{ change: UILangType }> = new Events();

    @property({ type: String, attribute: "current" })
    current: string = "";

    attributeChangedCallback(
        name: string,
        _old: string | null,
        value: string | null,
    ): void {
        super.attributeChangedCallback(name, _old, value);

        switch (name) {
            case "current":
                this.setCurrent(value || "");
                break;
        }
    }

    public fallback(): UILangType | null {
        return this.querySelector<UILangType>("ui-lang-type[fallback]");
    }

    public get(group: string, key: string) {
        return this.data?.[group]?.[key] || null;
    }

    private async setCurrent(name: string | null) {
        const langType: UILangType | null =
            (name !== ""
                ? this.querySelector(`ui-lang-type[name="${name}"]`)
                : this.fallback()) || this.fallback();

        if (!langType) return;
        if (!langType.href) throw `Missing href attribute!`;

        try {
            this.data = await (await fetch(langType.href)).json();
        } catch (err) {
            console.error(err);
        }

        this.events.dispatch("change", langType);
    }
}