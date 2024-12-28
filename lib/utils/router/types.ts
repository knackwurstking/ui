export interface Route {
    title: string;
    template: string;
    scripts: Script[];
}

export interface Script {
    src: string;
}
