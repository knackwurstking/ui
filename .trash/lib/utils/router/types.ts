export interface Route {
    title?: string;
    onMount?: () => void | Promise<void>;
    onDestroy?: () => void | Promise<void>;
}
