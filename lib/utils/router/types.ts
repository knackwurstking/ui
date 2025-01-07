export interface Route {
    title?: string;
    href?: string;
    template?: string;
    scripts?: Script[];
    onMount?: () => void | Promise<void>;
    onDestroy?: () => void | Promise<void>;
}

export interface Script {
    src: string;
}
