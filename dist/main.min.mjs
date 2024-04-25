var Ht = Object.defineProperty;
var At = (o, e, t) => e in o ? Ht(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var D = (o, e, t) => (At(o, typeof e != "symbol" ? e + "" : e, t), t), j = (o, e, t) => {
  if (!e.has(o))
    throw TypeError("Cannot " + t);
};
var n = (o, e, t) => (j(o, e, "read from private field"), t ? t.call(o) : e.get(o)), r = (o, e, t) => {
  if (e.has(o))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(o) : e.set(o, t);
}, a = (o, e, t, s) => (j(o, e, "write to private field"), s ? s.call(o, t) : e.set(o, t), t);
var l = (o, e, t) => (j(o, e, "access private method"), t);
class $ {
  constructor(e = !1) {
    /** @type {{[key: string]: ((data: any) => void|Promise<void>)[]}} */
    D(this, "listeners");
    this.debug = !!e, this.listeners = {};
  }
  /**
   * @param {string} key
   * @param {any} data
   */
  dispatchWithData(e, t) {
    if (this.debug && console.log(`[events] dispatchWithData: key=${e}`, t), t === void 0)
      throw "data is undefined!";
    if (this.listeners[e])
      for (const s of this.listeners[e])
        s(t);
    return this;
  }
  /**
   * @param {string} key
   * @param {((data: any) => void|Promise<void>) | null} listener
   * @returns {() => void} clean up function
   */
  addListener(e, t) {
    if (this.debug && console.log(`[events] addListener: key=${e}, listener=${t}`), typeof t != "function")
      throw `invalid event listener passed for "${e}" event!`;
    return this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(t), () => {
      this.removeListener(e, t);
    };
  }
  /**
   * @param {string} key
   * @param {((data: any) => void|Promise<void>)} listener
   */
  removeListener(e, t) {
    if (this.debug && console.log(`[events] removeListener: key=${e}, listener=${t}`), !this.listeners[e])
      throw `no listeners found for ${e}, there is nothing to delete`;
    let s = !1, i = 0;
    for (const u of this.listeners[e])
      u === t && (this.listeners[e].splice(i, 1), s = !0), i++;
    if (!s)
      throw `listener not found for ${e}, there is nothing to delete`;
    return this;
  }
}
const $t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Events: $
}, Symbol.toStringTag, { value: "Module" })), Rt = {
  color: "currentColor",
  opacity: 0.2,
  centered: !1,
  spreadDuration: ".4s",
  spreadTiming: "linear",
  clearDuration: "1s",
  clearTiming: "ease-in-out"
};
function B(o, e) {
  e = { ...Rt, ...e };
  const t = document.createElement("div");
  t.classList.add("ripple"), t.style.position = "absolute", t.style.color = "inherit", t.style.borderRadius = "50%", t.style.pointerEvents = "none", t.style.width = "100px", t.style.height = "100px", t.style.marginTop = "-50px", t.style.marginLeft = "-50px", t.style.opacity = `${e.opacity}`, t.style.backgroundColor = e.color, t.style.transform = "scale(0) translate(0, 0)", t.style.transition = `transform ${e.spreadDuration} ${e.spreadTiming} 0s,opacity ${e.clearDuration} ${e.clearTiming} 0s`, o.currentTarget.appendChild(t);
  const s = o.currentTarget.getBoundingClientRect();
  e.centered ? (t.style.top = `${s.height / 2}px`, t.style.left = `${s.width / 2}px`) : (t.style.top = `${o.clientY - s.top}px`, t.style.left = `${o.clientX - s.left}px`);
  const i = Math.max(s.width, s.height) * 0.02;
  return t.style.transform = `scale(${i}) translate(0, 0)`, t;
}
function O(o) {
  o && (o.addEventListener("transitionend", (e) => {
    e.propertyName === "opacity" && o.remove();
  }), o.style.opacity = "0");
}
function R(o, e = {}) {
  let t;
  const s = (u) => {
    t = B(u, e);
  }, i = () => {
    O(t);
  };
  return o.classList.add("ripple-container"), o.style.overflow = "hidden", o.addEventListener("pointerdown", s), o.addEventListener("pointerup", i), o.addEventListener("pointerleave", i), () => {
    o.classList.remove("ripple-container"), o.removeEventListener("pointerdown", s), o.removeEventListener("pointerup", i), o.removeEventListener("pointerleave", i);
  };
}
const jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  create: R,
  start: B,
  stop: O
}, Symbol.toStringTag, { value: "Module" }));
function Nt() {
  return /(android)/i.test(navigator.userAgent);
}
const Pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isAndroid: Nt
}, Symbol.toStringTag, { value: "Module" })), _t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  events: $t,
  ripple: jt,
  utils: Pt
}, Symbol.toStringTag, { value: "Module" })), Z = document.createElement("template");
Z.innerHTML = `
<style>
    :host {
        display: flex;
        position: absolute;
        z-index: 100;
        background-color: hsla(var(--bg), .2);
        backdrop-filter: blur(5px);
        overflow: hidden;
        user-select: none;
    }

    :host([position="top"]) {
        top: 0;
        left: 0;
        width: 100%;
        height: var(--app-bar-height);
        border-bottom: var(--border-width) var(--border-style) hsl(var(--border));
    }

    :host > ui-flex-grid-row {
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: space-between;
    }

    :host > ui-flex-grid-row > * {
        height: 100%;
    }

    :host > ui-flex-grid-row > *:nth-child(1),
    :host > ui-flex-grid-row > *:nth-child(3) {
        width: fit-content;
    }

    :host > ui-flex-grid-row > [slot="left"] {
        margin-left: 0;
    }

    :host > ui-flex-grid-row > [slot="center"] {
        width: 100%;
    }

    :host > ui-flex-grid-row > [slot="right"] {
        margin-right: 0;
        justify-content: flex-end;
    }
</style>

<ui-flex-grid-row gap="0.25rem">
    <ui-flex-grid-row gap="0.25rem">
        <slot name="left"></slot>
    </ui-flex-grid-row>

    <ui-flex-grid-row gap="0.25rem" style="overflow: hidden;">
        <slot name="center"></slot>
    </ui-flex-grid-row>

    <ui-flex-grid-row gap="0.25rem">
        <slot name="right"></slot>
    </ui-flex-grid-row>
</ui-flex-grid-row>
`;
class q extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(Z.content.cloneNode(!0));
  }
}
const I = document.createElement("template");
I.innerHTML = `
<style>
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: var(--spacing) calc(var(--spacing) * 1.5);
        border: var(--border-width) var(--border-style) currentColor;
        border-radius: var(--radius);
        overflow: hidden;
        font-family: var(--font-family);
        font-weight: bold;
        text-transform: capitalize;
        cursor: pointer;
        outline: none;
        user-select: none;
    }

    :host([variant="full"]) {
        border: none;
    }

    :host([variant="full"][color="primary"]) {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-fg));
    }

    :host([variant="full"][color="secondary"]) {
        background-color: hsl(var(--secondary));
        color: hsl(var(--secondary-fg));
    }

    :host([variant="full"][color="destructive"]) {
        background-color: hsl(var(--destructive));
        color: hsl(var(--destructive-fg));
    }

    :host([variant="outline"]) {
        border-color: currentColor;
        background-color: transparent;
    }

    :host([variant="outline"][color="primary"]) {
        color: hsl(var(--primary));
    }

    :host([variant="outline"][color="secondary"]) {
        color: hsl(var(--secondary));
    }

    :host([variant="outline"][color="destructive"]) {
        color: hsl(var(--destructive));
    }

    :host([variant="ghost"]) {
        border-color: transparent;
        background-color: transparent;
    }

    :host([variant="ghost"][color="primary"]) {
        color: hsl(var(--primary));
    }

    :host([variant="ghost"][color="secondary"]) {
        color: hsl(var(--secondary));
    }

    :host([variant="ghost"][color="destructive"]) {
        color: hsl(var(--destructive));
    }

    :host(:disabled),
    :host(:disabled:hover),
    :host(:disabled:active) {
        background-color: transparent;
        opacity: 0.25;
        cursor: default;
    }
</style>

<slot></slot>
`;
class F extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(I.content.cloneNode(!0));
  }
  connectedCallback() {
    this.hasAttribute("no-ripple") || R(this);
  }
}
const W = document.createElement("template");
W.innerHTML = `
<style>
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 2.5em;
        height: 2.5em;
        padding: var(--spacing);
        border: var(--border-width) var(--border-style) hsl(var(--border));
        border-radius: var(--radius);
        outline: none;
        overflow: hidden;
        font-family: var(--font-family);
        cursor: pointer;
        user-select: none;
    }

    :host([ghost]) {
        border-color: transparent !important;
        box-shadow: none;
    }

    :host([color="primary"]) {
        color: hsl(var(--primary));
        border-color: hsl(var(--primary));
    }

    :host([color="secondary"]) {
        color: hsl(var(--secondary));
        border-color: hsl(var(--secondary));
    }

    :host([color="destructive"]) {
        color: hsl(var(--destructive));
        border-color: hsl(var(--destructive));
    }

    /* :disabled */

    :host(:disabled),
    :host(:disabled:hover),
    :host(:disabled:active) {
        opacity: 0.25;
        cursor: default;
    }
</style>

<slot></slot>
`;
class V extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(W.content.cloneNode(!0));
  }
  connectedCallback() {
    this.hasAttribute("no-ripple") || R(this, { centered: !0 });
  }
}
const G = document.createElement("template");
G.innerHTML = `
<style>
    :host {
        display: block;
        width: 100%;
        max-width: 65em;
        margin: 0 auto;
        padding: var(--spacing);
    }
</style>

<slot></slot>
`;
class J extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(G.content.cloneNode(!0));
  }
}
const X = document.createElement("template");
X.innerHTML = `
<style>
    :host {
        flex: 1;
    }
</style>

<slot></slot>
`;
class Y extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(X.content.cloneNode(!0));
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    this.hasAttribute("flex") && this.style.setProperty("flex", this.getAttribute("flex"));
  }
}
const K = document.createElement("template");
K.innerHTML = `
<style>
    :host {
        display: flex;
        flex-flow: row nowrap;
        position: relative;
        width: 100%;
    }

    :host ::slotted(ui-flex-grid-item) {
        margin: 0 var(--row-gap);
    }

    :host ::slotted(ui-flex-grid-item:first-child) {
        margin-left: 0;
    }

    :host ::slotted(ui-flex-grid-item:last-child) {
        margin-right: 0;
    }
</style>

<slot></slot>
`;
class Q extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(K.content.cloneNode(!0));
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    this.hasAttribute("gap") && this.style.setProperty("--row-gap", this.getAttribute("gap"));
  }
}
const U = document.createElement("template");
U.innerHTML = `
<style>
    :host {
        display: flex;
        flex-flow: column nowrap;
        position: relative;
        width: 100%;
        height: fit-content;
    }

    :host ::slotted(ui-flex-grid-row) {
        margin: var(--gap, 0) 0;
    }

    :host ::slotted(ui-flex-grid-row:first-child) {
        margin-top: 0;
    }

    :host ::slotted(ui-flex-grid-row:last-child) {
        margin-bottom: 0;
    }
</style>

<slot></slot>
`;
class tt extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(U.content.cloneNode(!0));
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    this.hasAttribute("gap") && this.style.setProperty("--gap", this.getAttribute("gap"));
  }
}
const et = document.createElement("template");
et.innerHTML = `
<style>
    :host {
        display: none;
        padding: var(--spacing);
        padding-right: 2.5em;
        font-family: var(--font-family);
        transition: background-color 0.25s linear;
    }
</style>

<slot></slot>
`;
class _ extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(et.content.cloneNode(!0)), this.type = "ui-select-option";
  }
  get value() {
    return this.getAttribute("value") || "";
  }
  get selected() {
    return this.hasAttribute("selected");
  }
  set selected(e) {
    e ? this.setAttribute("selected", "") : this.removeAttribute("selected");
  }
}
const ot = document.createElement("template");
ot.innerHTML = `
<style>
    :host {
        --items-length: 0;
        position: relative; 
        display: block;
        width: 100%;
        height: calc(1em * var(--line-height) + var(--spacing) * 2);
        border: var(--border-width) var(--border-style) hsl(var(--border));
        border-radius: var(--radius);
        font-size: 0.95em;
        transition: height 0.25s ease;
        line-height: 1.15;
        box-sizing: content-box !important;
        overflow: hidden;
    }

    .options {
        cursor: pointer;
        display: none;
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        width: 2.5em;
        height: 100%;
        color: hsl(var(--primary));
    }

    ::slotted(ui-select-option) {
        display: block;
    }

    :host(.open) {
        height: calc(
            (var(--spacing) * 2 + (1em * 1.15)) * var(--items-length)
        );
    }

    :host(.open) .options {
        display: block;
    }

    :host(.open) .icon {
        display: none;
    }

    :host(.open) ::slotted(ui-select-option[selected]) {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-fg));
    }

    :host(.open) ::slotted(ui-select-option:not([selected]):hover) {
        background-color: hsl(var(--fg), 0.1);
    }

    :host(:not(.open)) .options:has(> ::slotted(ui-select-option[selected])) {
        display: block;
    }

    :host(:not(.open)) ::slotted(ui-select-option:not([selected])) {
        display: none;
    }
</style>

<div class="options">
    <div class="icon"><ui-icon-chevron-down></ui-icon-chevron-down></div>

    <slot></slot>
</div>
`;
var p, b, m;
class st extends HTMLElement {
  constructor() {
    super();
    r(this, p, !1);
    /** @param {Event} ev */
    r(this, b, (t) => {
      this.classList.toggle("open") ? (t.stopPropagation(), this.addEventListener("click", n(this, m))) : setTimeout(
        () => this.removeEventListener("click", n(this, m))
      );
    });
    /** @param {MouseEvent | PointerEvent} ev */
    r(this, m, (t) => {
      (t.composedPath() || []).forEach((s) => {
        s instanceof _ && ([...this.querySelectorAll("ui-select-option")].forEach(
          (i) => i.removeAttribute("selected")
        ), s.setAttribute("selected", ""), this.dispatchEvent(new CustomEvent("change", { detail: s })));
      });
    });
    this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(ot.content.cloneNode(!0));
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    var t;
    n(this, p) || ((t = this.shadowRoot.querySelector(".options")) == null || t.addEventListener("click", n(this, b)), a(this, p, !0)), this.style.setProperty(
      "--items-length",
      this.querySelectorAll("ui-select-option").length.toString()
    );
  }
  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    var t;
    this.removeEventListener("click", n(this, m)), (t = this.shadowRoot.querySelector(".options")) == null || t.addEventListener("click", n(this, b)), a(this, p, !1);
  }
}
p = new WeakMap(), b = new WeakMap(), m = new WeakMap();
var g, L, z;
let Dt = (z = class {
  constructor() {
    r(this, g, void 0);
    /**
     * @type {{
     *  [key: string]: {
     *      [key: string]: string;
     *  };
     * }}
     */
    r(this, L, void 0);
    a(this, g, new $()), this.langType = null;
  }
  /**
   * @param {import("./lang-type").LangType} langType
   * @param {{
   *  [key: string]: {
   *      [key: string]: string;
   *  };
   * }} data
   */
  new(e, t) {
    this.langType = e, a(this, L, t), n(this, g).dispatchWithData("change", this.langType);
  }
  /**
   * @param {string} group
   * @param {string} key
   */
  get(e, t) {
    var s;
    return (s = n(this, L)) == null ? void 0 : s[e][t];
  }
  /**
   * @param {"change"} key
   * @param {(langType: import("./lang-type").LangType | null) => void|Promise<void>} callback
   * @param {boolean} [trigger] - this will run the callback first
   * @returns {() => void} clean up function
   */
  on(e, t, s = !1) {
    if (typeof t != "function")
      throw "callback is not a function";
    return s && t(this.langType), n(this, g).addListener(e, t);
  }
}, g = new WeakMap(), L = new WeakMap(), z);
var T, it;
class nt extends HTMLElement {
  constructor() {
    super();
    /** @param {string} name */
    r(this, T);
    this.data = new Dt();
  }
  set current(t) {
    this.setAttribute("current", t), l(this, T, it).call(this, t);
  }
  get current() {
    return this.getAttribute("current");
  }
  /** @returns {import("./lang-type").LangType} */
  get fallback() {
    return this.querySelector("ui-lang-type[fallback]");
  }
  connectedCallback() {
    this.current = this.current;
  }
}
T = new WeakSet(), it = async function(t) {
  const s = this.querySelector(`ui-lang-type[name="${t}"]`) || this.fallback;
  if (!s)
    return;
  if (!s.href)
    throw "Missing href attribute!";
  const i = await fetch(s.href);
  this.data.new(s, await i.json());
};
class rt extends HTMLElement {
  constructor() {
    super();
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  get name() {
    return this.getAttribute("name");
  }
  set href(e) {
    this.setAttribute("href", e);
  }
  get href() {
    return this.getAttribute("href");
  }
  set fallback(e) {
    e ? this.setAttribute("fallback", "") : this.removeAttribute("fallback");
  }
  get fallback() {
    return this.hasAttribute("fallback");
  }
}
const lt = document.createElement("template");
lt.innerHTML = `
    <style>
        :host {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            animation: fade-in 0.5s;
            transition: opacity 0.5s ease;
        }

        :host(:last-child) {
            opacity: 1;
        }

        @keyframes fade-in {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    </style>

    <slot></slot>
`;
class at extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(lt.content.cloneNode(!0));
  }
  get name() {
    return this.getAttribute("name") || "";
  }
  get title() {
    return this.getAttribute("title") || "";
  }
  connectedCallback() {
  }
  disconnectedCallback() {
  }
}
const ct = document.createElement("template");
ct.innerHTML = `
    <style>
        :host {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
        }
    </style>

    <slot></slot>
`;
var f, x, N;
class ht extends HTMLElement {
  constructor() {
    super();
    r(this, x);
    /**
     * @type {Pages}
     */
    r(this, f, {});
    this.events = new $(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(ct.content.cloneNode(!0)), this.stack = [];
  }
  /**
   * @param {string} name
   * @param {() => StackLayoutPage} cb
   */
  registerPage(t, s) {
    n(this, f)[t] = s;
  }
  /**
   * @param {string} name
   */
  unregisterPage(t) {
    delete n(this, f)[t];
  }
  goBack() {
    if (!this.stack.length)
      return;
    const t = this.stack.pop();
    t.element.ontransitionend = () => {
      t.element.ontransitionend = null, this.removeChild(t.element);
    }, this.stack.length && this.appendChild(this.stack[this.stack.length - 1].element), l(this, x, N).call(this);
  }
  /**
   * @param {string} name
   */
  setPage(t) {
    if (this.stack.push({
      name: t,
      // @ts-expect-error
      element: this.appendChild(n(this, f)[t]().children[0])
    }), this.stack.length > 1) {
      const s = this.stack[this.stack.length - 2].element;
      s.ontransitionend = () => {
        s.ontransitionend = null, s.parentElement.removeChild(s);
      };
    }
    l(this, x, N).call(this);
  }
}
f = new WeakMap(), x = new WeakSet(), N = async function() {
  var t, s;
  this.events.dispatchWithData(
    "change",
    {
      newPage: ((t = this.stack[this.stack.length - 1]) == null ? void 0 : t.element) || null,
      oldPage: ((s = this.stack[this.stack.length - 2]) == null ? void 0 : s.element) || null
    }
  );
};
var v, h;
class zt {
  /** @param {Store} store */
  constructor(e) {
    r(this, v, void 0);
    r(this, h, void 0);
    a(this, h, e), a(this, v, new $()), this.localStoragePrefix = "", this.enableLocalStorage = !1;
  }
  /**
   * @param {string} key
   */
  get(e) {
    return n(this, h).stores[e];
  }
  /**
   * @param {string} key
   * @param {any} data
   * @param {boolean} [useDataAsFallback] Use data as fallback, if nothing found in the browsers `localStorage`
   * `this.enableLocalStorage` flag needs to be set to `true` for this to work
   */
  set(e, t, s = !1) {
    if (s && this.enableLocalStorage) {
      const i = JSON.parse(localStorage.getItem(this.localStoragePrefix + e) || "null");
      n(this, h).stores[e] = i ?? t;
    } else
      n(this, h).stores[e] = t;
    this.enableLocalStorage && localStorage.setItem(this.localStoragePrefix + e, JSON.stringify(n(this, h).stores[e])), n(this, v).dispatchWithData(e, n(this, h).stores[e]);
  }
  /**
   * @param {string} key
   * @param {(data: any) => any} callback
   */
  update(e, t) {
    if (typeof t != "function")
      throw "callback is not a function";
    this.set(e, t(n(this, h).stores[e]));
  }
  /**
   * @param {string} key
   * @param {(data: any) => void|Promise<void>} callback
   * @param {boolean} [trigger] - this will run the callback first
   * @returns {() => void} clean up function
   */
  on(e, t, s = !1) {
    if (typeof t != "function")
      throw "callback is not a function";
    return s && t(this.get(e)), n(this, v).addListener(e, t);
  }
}
v = new WeakMap(), h = new WeakMap();
class dt extends HTMLElement {
  constructor() {
    super(), this.data = new zt(this), this.stores = {};
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    this.hasAttribute("enable-local-storage") && (this.data.enableLocalStorage = !0), this.hasAttribute("local-storage-prefix") && (this.data.localStoragePrefix = this.getAttribute(
      "local-storage-prefix"
    ));
  }
}
const ut = document.createElement("template");
ut.innerHTML = `
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 52 52"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z"
    />
</svg>
`;
class Bt extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(ut.content.cloneNode(!0));
  }
}
const pt = document.createElement("template");
pt.innerHTML = `
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <rect width="24" height="24" fill="none" />
    <path
        d="M17 9.5L12 14.5L7 9.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
`;
class Ot extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(pt.content.cloneNode(!0));
  }
}
const mt = document.createElement("template");
mt.innerHTML = `
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z"
        fill="currentColor"
    />
    <path
        d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z"
        fill="currentColor"
    />
</svg>
`;
class Zt extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(mt.content.cloneNode(!0));
  }
}
const gt = document.createElement("template");
gt.innerHTML = `
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M21 21H12"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    /></svg
>;
`;
class qt extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(gt.content.cloneNode(!0));
  }
}
const ft = document.createElement("template");
ft.innerHTML = `
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor" transform="translate(85.333333, 42.666667)">
            <path
                d="M75.9466667,285.653333 C63.8764997,278.292415 49.6246897,275.351565 35.6266667,277.333333 L1.42108547e-14,277.333333 L1.42108547e-14,405.333333 L28.3733333,405.333333 L28.3733333,356.48 L40.5333333,356.48 C53.1304778,357.774244 65.7885986,354.68506 76.3733333,347.733333 C85.3576891,340.027178 90.3112817,328.626053 89.8133333,316.8 C90.4784904,304.790173 85.3164923,293.195531 75.9466667,285.653333 L75.9466667,285.653333 Z M53.12,332.373333 C47.7608867,334.732281 41.8687051,335.616108 36.0533333,334.933333 L27.7333333,334.933333 L27.7333333,298.666667 L36.0533333,298.666667 C42.094796,298.02451 48.1897668,299.213772 53.5466667,302.08 C58.5355805,305.554646 61.3626692,311.370371 61.0133333,317.44 C61.6596233,323.558965 58.5400493,329.460862 53.12,332.373333 L53.12,332.373333 Z M150.826667,277.333333 L115.413333,277.333333 L115.413333,405.333333 L149.333333,405.333333 C166.620091,407.02483 184.027709,403.691457 199.466667,395.733333 C216.454713,383.072462 225.530463,362.408923 223.36,341.333333 C224.631644,323.277677 218.198313,305.527884 205.653333,292.48 C190.157107,280.265923 170.395302,274.806436 150.826667,277.333333 L150.826667,277.333333 Z M178.986667,376.32 C170.098963,381.315719 159.922142,383.54422 149.76,382.72 L144.213333,382.72 L144.213333,299.946667 L149.333333,299.946667 C167.253333,299.946667 174.293333,301.653333 181.333333,308.053333 C189.877212,316.948755 194.28973,329.025119 193.493333,341.333333 C194.590843,354.653818 189.18793,367.684372 178.986667,376.32 L178.986667,376.32 Z M254.506667,405.333333 L283.306667,405.333333 L283.306667,351.786667 L341.333333,351.786667 L341.333333,329.173333 L283.306667,329.173333 L283.306667,299.946667 L341.333333,299.946667 L341.333333,277.333333 L254.506667,277.333333 L254.506667,405.333333 L254.506667,405.333333 Z M234.666667,7.10542736e-15 L9.52127266e-13,7.10542736e-15 L9.52127266e-13,234.666667 L42.6666667,234.666667 L42.6666667,192 L42.6666667,169.6 L42.6666667,42.6666667 L216.96,42.6666667 L298.666667,124.373333 L298.666667,169.6 L298.666667,192 L298.666667,234.666667 L341.333333,234.666667 L341.333333,106.666667 L234.666667,7.10542736e-15 L234.666667,7.10542736e-15 Z"
            ></path>
        </g>
    </g></svg
>
`;
class It extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(ft.content.cloneNode(!0));
  }
}
const vt = document.createElement("template");
vt.innerHTML = `
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 -0.5 21 21"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
>
    <defs></defs>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-259.000000, -840.000000)" fill="currentColor">
            <g transform="translate(56.000000, 160.000000)">
                <path
                    d="M211.261065,690.694762 C209.623062,692.25443 206.966811,692.25443 205.328807,690.694762 L203.614251,689.062203 C202.79525,688.282368 202.79525,687.018258 203.614251,686.238424 C204.433253,685.45859 205.761903,685.45859 206.580905,686.238424 C207.721845,687.3248 208.972894,687.224949 209.777214,686.458096 C210.587827,685.686249 210.685352,684.498026 209.541266,683.409653 C208.722264,682.629819 208.722264,681.36471 209.541266,680.584876 C210.361317,679.805041 211.688918,679.805041 212.50792,680.584876 L214.22667,682.221429 C215.864674,683.781098 215.864674,686.310317 214.22667,687.869985 L223.356286,696.563988 C225.318325,698.431197 222.350623,701.253977 220.390682,699.387767 L211.261065,690.694762 Z"
                ></path>
            </g>
        </g>
    </g>
</svg>
`;
class Ft extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(vt.content.cloneNode(!0));
  }
}
const wt = document.createElement("template");
wt.innerHTML = `
<style>
    :host {
        width: 100%;
        height: 100%;
        color: inherit;
    }
</style>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
>
    <rect
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        x="48"
        y="80"
        width="416"
        height="384"
        rx="48"
    />
    <line
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        stroke-linecap="round"
        x1="128"
        y1="48"
        x2="128"
        y2="80"
    />
    <line
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        stroke-linecap="round"
        x1="384"
        y1="48"
        x2="384"
        y2="80"
    />
    <rect
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        stroke-linecap="round"
        x="112"
        y="224"
        width="96"
        height="96"
        rx="13"
    />
    <line
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
        stroke-linecap="round"
        x1="464"
        y1="160"
        x2="48"
        y2="160"
    />
</svg>
`;
class Wt extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(wt.content.cloneNode(!0));
  }
}
const d = {
  BackArrowNavigation: Bt,
  ChevronDown: Ot,
  DeleteRecycleBin: Zt,
  Edit2: qt,
  PDFDocument: It,
  Settings: Ft,
  TodayOutline: Wt
}, yt = document.createElement("template");
yt.innerHTML = `
<style>
    :host {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: calc(var(--spacing) / 4) calc(var(--spacing) / 2);
        border-radius: var(--radius);
    }

    :host > .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: fit-content;
        width: 100%;
        margin-right: var(--spacing);
    }

    :host > .input {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-width: fit-content;
        width: 100%;
    }
</style>

<span class="text">
    <slot name="primary"></slot>
    <slot name="secondary"></slot>
</span>

<span class="input">
    <slot name="input"></slot>
</span>

<slot></slot>
`;
var w, k, C, S, Lt, E, P;
class bt extends HTMLElement {
  constructor() {
    super();
    r(this, S);
    r(this, E);
    r(this, w, !1);
    r(this, k, async () => {
      this.input && this.input.click();
    });
    r(this, C, async (t) => {
      t.stopPropagation();
    });
    this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(yt.content.cloneNode(!0)), this.input = null;
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    this.hasAttribute("ripple") ? (R(this), this.style.cursor = "pointer", l(this, S, Lt).call(this)) : l(this, E, P).call(this);
  }
  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    l(this, E, P).call(this);
  }
}
w = new WeakMap(), k = new WeakMap(), C = new WeakMap(), S = new WeakSet(), Lt = function() {
  n(this, w) || (this.input = this.querySelector("input"), this.input && (this.addEventListener("click", n(this, k)), this.input.addEventListener("click", n(this, C))), a(this, w, !0));
}, E = new WeakSet(), P = function() {
  this.input && (this.removeEventListener("click", n(this, k)), this.input.removeEventListener("click", n(this, C))), a(this, w, !1);
};
const xt = document.createElement("template");
xt.innerHTML = `
<style>
    :host {
        font-size: 1.1em;
        font-weight: normal;
    }
</style>

<slot></slot>
`;
class kt extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(xt.content.cloneNode(!0));
  }
}
const Ct = document.createElement("template");
Ct.innerHTML = `
<style>
    :host {
        font-size: 0.9em;
        font-weight: 300;
        font-style: italic;
    }
</style>

<slot></slot>
`;
class Et extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(Ct.content.cloneNode(!0));
  }
}
var c, H, Tt, A, St, y, M;
class Mt extends HTMLElement {
  constructor() {
    super();
    /**
     * @param {HTMLElement} element
     */
    r(this, H);
    /**
     * @param {string} mode
     * @param {HTMLElement} element
     */
    r(this, A);
    r(this, y);
    /** @type {MediaQueryList | null} */
    r(this, c, null);
    this.currentTheme = null, this.themes = {};
  }
  /** @type {boolean} state */
  set auto(t) {
    if (t) {
      if (this.setAttribute("auto", ""), l(this, H, Tt).call(this), n(this, c)) {
        this.mediaChangeHandler(n(this, c));
        return;
      }
      a(this, c, window.matchMedia("(prefers-color-scheme: dark)")), n(this, c).addEventListener("change", this.mediaChangeHandler), this.mediaChangeHandler(n(this, c));
    } else
      this.removeAttribute("auto"), l(this, y, M).call(this);
  }
  get auto() {
    return this.hasAttribute("auto");
  }
  /** @param {string} mode */
  set mode(t) {
    this.setAttribute("mode", t), l(this, A, St).call(this, t);
  }
  get mode() {
    return this.getAttribute("mode");
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    this.auto ? this.auto = this.auto : (l(this, y, M).call(this), this.mode = this.mode);
  }
  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    l(this, y, M).call(this);
  }
  /**
   * @param {string} name
   * @param {string} href
   */
  addTheme(t, s) {
    this.themes[t] = s;
  }
  /**
   * @param {string} name
   */
  loadTheme(t) {
    var i;
    if (!this.themes[t])
      throw `theme "${t}" is missing in this.themes`;
    if (((i = this.currentTheme) == null ? void 0 : i.name) == t)
      return;
    {
      const u = document.getElementById("theme");
      u && (document.head.removeChild(u), this.currentTheme = null);
    }
    const s = document.createElement("link");
    s.id = "theme", s.rel = "stylesheet", s.href = this.themes[t], document.head.appendChild(s), this.currentTheme = { name: t, href: this.themes[t] };
  }
  /**
   * @param {MediaQueryListEvent | MediaQueryList} ev
   */
  mediaChangeHandler(t) {
    t.matches ? document.body.setAttribute("data-theme", "dark") : document.body.setAttribute("data-theme", "light");
  }
}
c = new WeakMap(), H = new WeakSet(), Tt = function(t = document.body) {
  t.removeAttribute("data-theme");
}, A = new WeakSet(), St = function(t, s = document.body) {
  switch (t) {
    case "dark":
      s.setAttribute("data-theme", t);
      break;
    case "light":
      s.setAttribute("data-theme", t);
      break;
  }
}, y = new WeakSet(), M = function() {
  n(this, c) && (n(this, c).removeEventListener("change", this.mediaChangeHandler), a(this, c, null));
};
const Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AppBar: q,
  Button: F,
  Container: J,
  FlexGrid: tt,
  FlexGridItem: Y,
  FlexGridRow: Q,
  IconButton: V,
  Label: bt,
  Lang: nt,
  LangType: rt,
  Primary: kt,
  Secondary: Et,
  Select: st,
  SelectOption: _,
  StackLayout: ht,
  StackLayoutPage: at,
  Store: dt,
  ThemeHandler: Mt,
  svg: d
}, Symbol.toStringTag, { value: "Module" }));
async function Gt() {
  customElements.define("ui-app-bar", q), customElements.define("ui-icon-button", V), customElements.define("ui-button", F), customElements.define("ui-container", J), customElements.define("ui-flex-grid", tt), customElements.define("ui-flex-grid-row", Q), customElements.define("ui-flex-grid-item", Y), customElements.define("ui-select-option", _), customElements.define("ui-select", st), customElements.define("ui-lang-type", rt), customElements.define("ui-lang", nt), customElements.define("ui-stack-layout-page", at), customElements.define("ui-stack-layout", ht), customElements.define("ui-store", dt), customElements.define(
    "ui-icon-back-arrow-navigation",
    d.BackArrowNavigation
  ), customElements.define("ui-icon-chevron-down", d.ChevronDown), customElements.define(
    "ui-icon-delete-recycle-bin",
    d.DeleteRecycleBin
  ), customElements.define("ui-icon-edit2", d.Edit2), customElements.define("ui-icon-pdf-document", d.PDFDocument), customElements.define("ui-icon-settings", d.Settings), customElements.define("ui-icon-today-outline", d.TodayOutline), customElements.define("ui-secondary", Et), customElements.define("ui-primary", kt), customElements.define("ui-label", bt), customElements.define("ui-theme-handler", Mt);
}
const Yt = {
  ..._t,
  wc: Vt,
  define: Gt
};
export {
  Yt as default
};
