/**
 * @type {CSSStyleSheet[] | null}
 */
let _globalStyleSheets = null;

export function globalStyleSheets() {
    if (_globalStyleSheets === null) {
        _globalStyleSheets = Array.from(document.styleSheets).map((x) => {
            const sheet = new CSSStyleSheet();

            const css = Array.from(x.cssRules)
                .map((rule) => rule.cssText)
                .join(" ");

            sheet.replaceSync(css);
            return sheet;
        });
    }

    return _globalStyleSheets;
}

/**
 * @param {ShadowRoot} shadowRoot
 */
export function globalStylesToShadowRoot(shadowRoot) {
    shadowRoot.adoptedStyleSheets.push(...globalStyleSheets());
}
