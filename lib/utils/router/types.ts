export interface Route {
    title?: string;
    href?: string;
    scripts?: Script[];
    onMount?: () => void | Promise<void>;
    onDestroy?: () => void | Promise<void>;

    template?: {
        target?: string;
        selector?: string;
        onMount?: () => void | Promise<void>;
        onDestroy?: () => void | Promise<void>;
    };
}

export interface Script {
    src: string;
}
