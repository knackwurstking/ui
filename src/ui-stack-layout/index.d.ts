export { UIStackLayout } from "./ui-stack-layout";
export { UIStackLayoutPage } from "./ui-stack-layout-page";
export type UIPages = {
    [key: string]: () => (import("./ui-stack-layout-page").UIStackLayoutPage | DocumentFragment | Node);
};
