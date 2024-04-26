export class StackLayout extends HTMLElement {
    static register: () => void;
}
export type Pages = {
    [key: string]: () => (StackLayoutPage | DocumentFragment);
};
import { StackLayoutPage } from "./stack-layout-page";
