export class LanguageHandler {
    public data: { [key: string]: string } = {};

    private _lang: string = "";

    get lang(): string {
        return this._lang;
    }

    use(lang: string, href: string): Promise<LanguageHandler> {
        return new Promise((resolve, reject) => {
            fetch(href)
                .then((r) => r.json())
                .then((data) => {
                    this._lang = lang;
                    this.data = data;
                    resolve(this);
                })
                .catch((err) => reject(err));
        });
    }

    get(...keys: string[]): string {
        const key = keys.join(":");
        return this.data[key] || key;
    }
}
