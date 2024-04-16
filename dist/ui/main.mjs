var f = Object.defineProperty;
var u = (r, e, t) => e in r ? f(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var c = (r, e, t) => (u(r, typeof e != "symbol" ? e + "" : e, t), t);
const h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ui() {
    return L;
  }
}, Symbol.toStringTag, { value: "Module" }));
class m {
  constructor() {
    /** @type {{[key: string]: ((data: any) => void|Promise<void>)[]}} */
    c(this, "listeners");
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
    let s = !1, n = 0;
    for (const i of this.listeners[e])
      i === t && (this.listeners[e].splice(n, 1), s = !0), n++;
    if (!s)
      throw `listener not found for ${e}, there is nothing to delete`;
    return this;
  }
}
const y = {
  color: "currentColor",
  opacity: 0.2,
  centered: !1,
  spreadDuration: ".4s",
  spreadTiming: "linear",
  clearDuration: "1s",
  clearTiming: "ease-in-out"
};
function p(r, e) {
  e = { ...y, ...e };
  const t = document.createElement("div");
  t.classList.add("ripple"), t.style.position = "absolute", t.style.color = "inherit", t.style.borderRadius = "50%", t.style.pointerEvents = "none", t.style.width = "100px", t.style.height = "100px", t.style.marginTop = "-50px", t.style.marginLeft = "-50px", t.style.opacity = `${e.opacity}`, t.style.backgroundColor = e.color, t.style.transform = "scale(0) translate(0, 0)", t.style.transition = `transform ${e.spreadDuration} ${e.spreadTiming} 0s,opacity ${e.clearDuration} ${e.clearTiming} 0s`, r.currentTarget.appendChild(t);
  const s = r.currentTarget.getBoundingClientRect();
  e.centered ? (t.style.top = `${s.height / 2}px`, t.style.left = `${s.width / 2}px`) : (t.style.top = `${r.clientY - s.top}px`, t.style.left = `${r.clientX - s.left}px`);
  const n = Math.max(s.width, s.height) * 0.02;
  return t.style.transform = `scale(${n}) translate(0, 0)`, t;
}
function d(r) {
  r && (r.addEventListener("transitionend", (e) => {
    e.propertyName === "opacity" && r.remove();
  }), r.style.opacity = "0");
}
function g(r, e = {}) {
  let t, s = !1;
  const n = (o) => {
    t = p(o, { ...e });
  }, i = () => {
    d(t);
  }, l = () => {
    r.classList.add("ripple-container"), r.addEventListener("pointerdown", n), r.addEventListener("pointerup", i), r.addEventListener("pointerleave", i), s = !1;
  }, a = () => {
    r.classList.remove("ripple-container"), r.removeEventListener("pointerdown", n), r.removeEventListener("pointerup", i), r.removeEventListener("pointerleave", i), s = !0;
  };
  return e && l(), {
    /**
     * @param {import(".").RippleOptions} _options
     */
    update(o) {
      e = o, e && s ? l() : e || s || a();
    },
    destroy: a
  };
}
const v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Events: m,
  create: g,
  start: p,
  stop: d
}, Symbol.toStringTag, { value: "Module" })), L = {
  ...v,
  wc: h
};
export {
  L as ui
};
