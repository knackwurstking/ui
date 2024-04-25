// TODO: The root dialog component here...

export class Dialog extends HTMLDialogElement {

    static register = () => customElements.define("ui-dialog", Dialog, { extends: "dialog" })

    constructor() {
        super()
    }
}
