export { default as start } from "./start";
export { default as stop } from "./stop";
export type RippleOptions = {
    color?: string;
    opacity?: string;
    centered?: boolean;
    spreadDuration?: string;
    spreadTiming?: string;
    clearDuration?: string;
    clearTiming?: string;
    useClick?: boolean;
};
export { default as create, defaultOptions } from "./create";
