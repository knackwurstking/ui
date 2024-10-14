let globalData: CSSStyleSheet[] | null = null;

function globalStyleSheets(): CSSStyleSheet[] {
    if (globalData === null) {
        globalData = Array.from(document.styleSheets).map((x) => {
            const sheet = new CSSStyleSheet();

            const css = Array.from(x.cssRules)
                .map((rule) => rule.cssText)
                .join(" ");

            sheet.replaceSync(css);
            return sheet;
        });
    }

    return globalData;
}

export function globalStylesToShadowRoot(shadowRoot: ShadowRoot): void {
    shadowRoot.adoptedStyleSheets.push(...globalStyleSheets());
}
