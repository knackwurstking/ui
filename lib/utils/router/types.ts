export interface Route {
    title?: string;
    href?: string;
    template?: string;
    scripts?: Script[];
}

export interface Script {
    src: string;
}
