export class AppBar extends HTMLElement {
    static register: () => void;
    get leftSlot(): Element;
    get centerSlot(): Element;
    get rightSlot(): Element;
    #private;
}
