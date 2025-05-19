import { Events } from "../events";

export class WS<D = any> {
    public url: string = "";
    public socket: WebSocket | null = null;
    public events = new Events<{
        open: WS;
        close: WS;
        error: WS;
        message: D;
    }>();
    public reconnectInterval = 1000;

    protected timeout: NodeJS.Timeout | null = null;
    protected open = false;

    public constructor(url: string) {
        this.url = url;
    }

    protected onClose = () => {};

    public isOpen() {
        return this.open;
    }

    public async connect() {
        if (this.socket) this.close();

        this.socket = new WebSocket(this.url);

        // Reconnect handler
        this.socket.onopen = () => {
            this.open = true;
            this.events.dispatch("open", this);

            this.socket!.onclose = () => {
                if (this.timeout !== null) {
                    clearTimeout(this.timeout);
                    this.timeout = null;
                }

                if (this.open) {
                    this.open = false;
                    this.events.dispatch("close", this);
                }

                // Reconnect here
                this.timeout = setTimeout(
                    async () => await this.connect(),
                    this.reconnectInterval,
                );
            };

            this.socket!.onmessage = async (ev) => {
                if (!(ev.data instanceof Blob)) {
                    console.error(
                        "Expecting message data from type Blob",
                        ev.data,
                    );
                    return;
                }

                this.events.dispatch(
                    "message",
                    JSON.parse(await ev.data.text()),
                );
            };
        };

        this.socket.addEventListener("error", () => {
            if (!this.socket) return;
            this.socket.close();
        });
    }

    public close() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.socket) {
            this.socket.removeEventListener("close", this.onClose);

            try {
                this.socket.close();
            } finally {
                this.socket = null;
            }
        }
    }
}
