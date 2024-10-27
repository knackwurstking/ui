import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { Events } from "../utils";
import UIStackLayoutPage from "./ui-stack-layout-page";

/**
 * @element ui-stack-layout
 *
 * @slot - Takes `ui-stack-layout-page` components
 */
@customElement("ui-stack-layout")
class UIStackLayout<T extends string> extends LitElement {
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

    public clearStack(): void {
        while (this.stack.length > 0) {
            this.removeChild(this.stack.pop()!);
        }
    }

    public goBack(): void {
        if (this.stack.length === 0 || this.lockNavigation) return;

        history.back();
        return;
    }

    public registerPage(
        name: T,
        cb: () => UIStackLayoutPage | Promise<UIStackLayoutPage>,
    ): void {
        this.pages[name] = cb;
    }

    public unregisterPage(name: T): void {
        delete this.pages[name];
    }

    public async setPage(
        name: T,
        cb: ((page: UIStackLayoutPage) => void | Promise<void>) | null = null,
        keepOldPage: boolean = false,
    ): Promise<void> {
        if (this.lockNavigation) return;

        if (!(name in this.pages)) {
            throw new Error(`page "${name}" not found`);
        }

        const page = await this.pages[name]();
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

export default UIStackLayout;
