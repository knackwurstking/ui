export class LangType extends HTMLElement {
    set name(name: string);
    get name(): string;
    set href(href: string);
    get href(): string;
    set fallback(state: boolean);
    get fallback(): boolean;
}
