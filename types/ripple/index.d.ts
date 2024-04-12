export { default as create } from "./create";
export { default as start } from "./start";
export { default as stop } from "./stop";
export type RippleOptions = {
    color?: string;
    opacity?: number;
    centered?: boolean;
    spreadDuration?: string;
    spreadTiming?: string;
    clearDuration?: string;
    clearTiming?: string;
};
