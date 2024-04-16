var d = Object.defineProperty;
var p = (n, e, t) => e in n ? d(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var o = (n, e, t) => (p(n, typeof e != "symbol" ? e + "" : e, t), t);
class C {
  constructor() {
    /** @type {{[key: string]: ((data: any) => void|Promise<void>)[]}} */
    o(this, "listeners");
    this.listeners = {};
  }
  /**
   * @param {string} key
   * @param {any} data
   */
  dispatchWithData(e, t) {
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
    if (typeof t != "function")
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
    if (!this.listeners[e])
      throw `no listeners found for ${e}, there is nothing to delete`;
    let s = !1, r = 0;
    for (const i of this.listeners[e])
      i === t && (this.listeners[e].splice(r, 1), s = !0), r++;
    if (!s)
      throw `listener not found for ${e}, there is nothing to delete`;
    return this;
  }
}
const u = {
  color: "currentColor",
  opacity: 0.2,
  centered: !1,
  spreadDuration: ".4s",
  spreadTiming: "linear",
  clearDuration: "1s",
  clearTiming: "ease-in-out"
};
function f(n, e) {
  e = { ...u, ...e };
  const t = document.createElement("div");
  t.classList.add("ripple"), t.style.position = "absolute", t.style.color = "inherit", t.style.borderRadius = "50%", t.style.pointerEvents = "none", t.style.width = "100px", t.style.height = "100px", t.style.marginTop = "-50px", t.style.marginLeft = "-50px", t.style.opacity = `${e.opacity}`, t.style.backgroundColor = e.color, t.style.transform = "scale(0) translate(0, 0)", t.style.transition = `transform ${e.spreadDuration} ${e.spreadTiming} 0s,opacity ${e.clearDuration} ${e.clearTiming} 0s`, n.currentTarget.appendChild(t);
  const s = n.currentTarget.getBoundingClientRect();
  e.centered ? (t.style.top = `${s.height / 2}px`, t.style.left = `${s.width / 2}px`) : (t.style.top = `${n.clientY - s.top}px`, t.style.left = `${n.clientX - s.left}px`);
  const r = Math.max(s.width, s.height) * 0.02;
  return t.style.transform = `scale(${r}) translate(0, 0)`, t;
}
function h(n) {
  n && (n.addEventListener("transitionend", (e) => {
    e.propertyName === "opacity" && n.remove();
  }), n.style.opacity = "0");
}
function E(n, e = {}) {
  let t, s = !1;
  const r = (l) => {
    t = f(l, { ...e });
  }, i = () => {
    h(t);
  }, c = () => {
    n.classList.add("ripple-container"), n.addEventListener("pointerdown", r), n.addEventListener("pointerup", i), n.addEventListener("pointerleave", i), s = !1;
  }, a = () => {
    n.classList.remove("ripple-container"), n.removeEventListener("pointerdown", r), n.removeEventListener("pointerup", i), n.removeEventListener("pointerleave", i), s = !0;
  };
  return e && c(), {
    /**
     * @param {import(".").RippleOptions} _options
     */
    update(l) {
      e = l, e && s ? c() : e || s || a();
    },
    destroy: a
  };
}
class m extends HTMLElement {
  constructor() {
    super();
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
  }
  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
  }
}
class y extends HTMLElement {
  constructor() {
    super();
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
  }
  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
  }
}
class L extends HTMLElement {
  constructor() {
    super();
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
  }
  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
  }
}
class b extends HTMLElement {
  constructor() {
    super();
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
  }
  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
  }
}
class v extends HTMLElement {
  constructor() {
    super();
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
  }
  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
  }
}
class g extends HTMLElement {
  constructor() {
    super();
  }
  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
  }
  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
  }
}
const T = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: m,
  IconButton: y,
  Label: b,
  Primary: v,
  Secondary: g,
  Select: L
}, Symbol.toStringTag, { value: "Module" }));
console.log("unimplemented (lib)");
export {
  C as Events,
  E as create,
  f as start,
  h as stop,
  T as wc
};
