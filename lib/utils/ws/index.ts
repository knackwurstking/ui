import { Events } from "../events";

export class WS<D = any> {
    public serverPathPrefix: string = "";

    public socket: WebSocket | null = null;
    public events = new Events<{
        open: WS;
        close: WS;
        message: D;
    }>();

    public reconnectInterval = 1000;

    protected timeout: NodeJS.Timeout | null = null;
    protected open = false;

    protected onClose = () => {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.open) {
            this.open = false;
            this.events.dispatch("close", this);
        }

        // Reconnect here
        this.timeout = setTimeout(async () => {
            console.debug(`WS: try to reconnect to "${this.getURL()}"`);
            await this.connect();
        }, this.reconnectInterval);
    };

    protected onOpen = () => {
        console.debug(`WS: connected to "${this.getURL()}"`);

        if (!this.open) {
            this.open = true;
            this.events.dispatch("open", this);
        }
    };

    protected onMessage = async (ev: MessageEvent<Blob>) => {
        const data: D = JSON.parse(await ev.data.text());
        console.debug(`WS: Got a message:`, data);
        this.events.dispatch("message", data);
    };

    protected constructor(serverPathPrefix: string) {
        this.serverPathPrefix = serverPathPrefix;
    }

    protected getURL(): string {
        return process.env.SERVER_PATH_PREFIX + `/ws`;
    }

    public isOpen() {
        return this.open;
    }

    public async connect() {
        if (this.socket) this.close();

        const wsAddr = this.getURL(); // origin + path
        console.debug(`Try to connect WebSocket to ${wsAddr}`);

        this.socket = new WebSocket(wsAddr);

        // Reconnect handler
        this.socket.addEventListener("close", this.onClose);
        this.socket.addEventListener("open", this.onOpen);
        this.socket.addEventListener("message", this.onMessage);
    }

    public close() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.socket) {
            this.socket.removeEventListener("close", this.onClose);
            if (this.isOpen()) this.socket.close();
            this.socket = null;
        }
    }
}
