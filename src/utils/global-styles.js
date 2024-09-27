// TODO: Use this for web components and export in "./index.js"
// TODO: Rename this crappy functions
let globalSheets = null;

export function getGlobalStyleSheets() {
    if (globalSheets === null) {
        globalSheets = Array.from(document.styleSheets).map((x) => {
            const sheet = new CSSStyleSheet();
            const css = Array.from(x.cssRules)
                .map((rule) => rule.cssText)
                .join(" ");
            sheet.replaceSync(css);
            return sheet;
        });
    }

    return globalSheets;
}

export function addGlobalStylesToShadowRoot(shadowRoot) {
    shadowRoot.adoptedStyleSheets.push(...getGlobalStyleSheets());
}
