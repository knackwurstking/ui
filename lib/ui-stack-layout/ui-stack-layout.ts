import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { Events } from "../utils";
import { UIStackLayoutPage } from "./ui-stack-layout-page";

@customElement("ui-stack-layout")
export class UIStackLayout<T extends string> extends LitElement {
    public events: Events<{
        change: { old: UIStackLayoutPage; current: UIStackLayoutPage };
    }> = new Events();

    public stack: UIStackLayoutPage[] = [];

    private onpopstate = () => {
        if (this.stack.length === 0) {
            this.dispatchChangeEvent(null);
            return;
        }

        const removedChild = this.removeChild(this.stack.pop()!);

        if (this.stack.length > 0) {
            if (!this.stack[this.stack.length - 1].parentElement) {
                this.appendChild(this.stack[this.stack.length - 1]);
            }
        }

        this.dispatchChangeEvent(removedChild);
    };

    private pages: {
        [key: string]: () => UIStackLayoutPage | Promise<UIStackLayoutPage>;
    } = {};

    private lockNavigation: boolean = false;

    static get styles() {
        return css`
            :host {
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
            }
        `;
    }

    protected render() {
        return html`<slot></slot>`;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("popstate", this.onpopstate);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("popstate", this.onpopstate);
    }

    public stackSize(): number {
        return this.stack.length;
    }

    public async clear(): Promise<void> {
        while (this.stack.length > 0) {
            this.removeChild(this.stack.pop()!);
        }
    }

    public async goBack(): Promise<void> {
        if (this.stack.length === 0 || this.lockNavigation) return;

        history.back();
        return;
    }

    public async register(
        pageName: T,
        cb: () => UIStackLayoutPage | Promise<UIStackLayoutPage>,
    ): Promise<void> {
        this.pages[pageName] = cb;
    }

    public async unregister(pageName: T): Promise<void> {
        delete this.pages[pageName];
    }

    public async set(
        pageName: T,
        cb: ((page: UIStackLayoutPage) => void | Promise<void>) | null = null,
        keepOldPage: boolean = false,
    ): Promise<void> {
        if (this.lockNavigation) return;

        const page = await this.pages[pageName]();
        this.stack.push(this.appendChild(page));
        if (typeof cb === "function") cb(page);

        let pageToRemove = null;
        if (this.stack.length > 1 && !keepOldPage) {
            pageToRemove = this.stack[this.stack.length - 2];
            pageToRemove.parentElement?.removeChild(pageToRemove);
        }

        this.dispatchChangeEvent(pageToRemove);

        if (this.onpopstate !== null) {
            history.pushState(null, document.title, location.href);
        }
    }

    private async dispatchChangeEvent(
        old: UIStackLayoutPage | null,
    ): Promise<void> {
        this.events.dispatch("change", {
            old: old || this.stack[this.stack.length - 2] || null,
            current: this.stack[this.stack.length - 1] || null,
        });
    }
}
