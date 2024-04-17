var h = Object.defineProperty;
var u = (n, e, t) => e in n ? h(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var c = (n, e, t) => (u(n, typeof e != "symbol" ? e + "" : e, t), t);
class g {
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
      for (const r of this.listeners[e])
        r(t);
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
    let r = !1, o = 0;
    for (const s of this.listeners[e])
      s === t && (this.listeners[e].splice(o, 1), r = !0), o++;
    if (!r)
      throw `listener not found for ${e}, there is nothing to delete`;
    return this;
  }
}
const L = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Events: g
}, Symbol.toStringTag, { value: "Module" })), w = {
  color: "currentColor",
  opacity: 0.2,
  centered: !1,
  spreadDuration: ".4s",
  spreadTiming: "linear",
  clearDuration: "1s",
  clearTiming: "ease-in-out"
};
function d(n, e) {
  e = { ...w, ...e };
  const t = document.createElement("div");
  t.classList.add("ripple"), t.style.position = "absolute", t.style.color = "inherit", t.style.borderRadius = "50%", t.style.pointerEvents = "none", t.style.width = "100px", t.style.height = "100px", t.style.marginTop = "-50px", t.style.marginLeft = "-50px", t.style.opacity = `${e.opacity}`, t.style.backgroundColor = e.color, t.style.transform = "scale(0) translate(0, 0)", t.style.transition = `transform ${e.spreadDuration} ${e.spreadTiming} 0s,opacity ${e.clearDuration} ${e.clearTiming} 0s`, n.currentTarget.appendChild(t);
  const r = n.currentTarget.getBoundingClientRect();
  e.centered ? (t.style.top = `${r.height / 2}px`, t.style.left = `${r.width / 2}px`) : (t.style.top = `${n.clientY - r.top}px`, t.style.left = `${n.clientX - r.left}px`);
  const o = Math.max(r.width, r.height) * 0.02;
  return t.style.transform = `scale(${o}) translate(0, 0)`, t;
}
function p(n) {
  n && (n.addEventListener("transitionend", (e) => {
    e.propertyName === "opacity" && n.remove();
  }), n.style.opacity = "0");
}
function f(n, e = {}) {
  let t, r = !1;
  const o = (i) => {
    t = d(i, { ...e });
  }, s = () => {
    p(t);
  }, l = () => {
    n.classList.add("ripple-container"), n.addEventListener("pointerdown", o), n.addEventListener("pointerup", s), n.addEventListener("pointerleave", s), r = !1;
  }, a = () => {
    n.classList.remove("ripple-container"), n.removeEventListener("pointerdown", o), n.removeEventListener("pointerup", s), n.removeEventListener("pointerleave", s), r = !0;
  };
  return e && l(), {
    /**
     * @param {import(".").RippleOptions} _options
     */
    update(i) {
      e = i, e && r ? l() : e || r || a();
    },
    destroy: a
  };
}
const v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  create: f,
  start: d,
  stop: p
}, Symbol.toStringTag, { value: "Module" })), x = `
<svg
  fill="currentColor"
  width="800px"
  height="800px"
  viewBox="0 0 52 52"
  data-name="Layer 1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z" />
</svg>;
`, C = `
<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" fill="none"/>
<path d="M17 9.5L12 14.5L7 9.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`, m = `
<svg
  width="800px"
  height="800px"
  viewBox="0 0 1024 1024"
  class="icon"
  version="1.1"
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
</svg>;
`, y = `
<svg
  width="800px"
  height="800px"
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
  />
</svg>;
`, k = `
<svg
  width="800px"
  height="800px"
  viewBox="0 0 512 512"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="add" fill="currentColor" transform="translate(85.333333, 42.666667)">
      <path
        d="M75.9466667,285.653333 C63.8764997,278.292415 49.6246897,275.351565 35.6266667,277.333333 L1.42108547e-14,277.333333 L1.42108547e-14,405.333333 L28.3733333,405.333333 L28.3733333,356.48 L40.5333333,356.48 C53.1304778,357.774244 65.7885986,354.68506 76.3733333,347.733333 C85.3576891,340.027178 90.3112817,328.626053 89.8133333,316.8 C90.4784904,304.790173 85.3164923,293.195531 75.9466667,285.653333 L75.9466667,285.653333 Z M53.12,332.373333 C47.7608867,334.732281 41.8687051,335.616108 36.0533333,334.933333 L27.7333333,334.933333 L27.7333333,298.666667 L36.0533333,298.666667 C42.094796,298.02451 48.1897668,299.213772 53.5466667,302.08 C58.5355805,305.554646 61.3626692,311.370371 61.0133333,317.44 C61.6596233,323.558965 58.5400493,329.460862 53.12,332.373333 L53.12,332.373333 Z M150.826667,277.333333 L115.413333,277.333333 L115.413333,405.333333 L149.333333,405.333333 C166.620091,407.02483 184.027709,403.691457 199.466667,395.733333 C216.454713,383.072462 225.530463,362.408923 223.36,341.333333 C224.631644,323.277677 218.198313,305.527884 205.653333,292.48 C190.157107,280.265923 170.395302,274.806436 150.826667,277.333333 L150.826667,277.333333 Z M178.986667,376.32 C170.098963,381.315719 159.922142,383.54422 149.76,382.72 L144.213333,382.72 L144.213333,299.946667 L149.333333,299.946667 C167.253333,299.946667 174.293333,301.653333 181.333333,308.053333 C189.877212,316.948755 194.28973,329.025119 193.493333,341.333333 C194.590843,354.653818 189.18793,367.684372 178.986667,376.32 L178.986667,376.32 Z M254.506667,405.333333 L283.306667,405.333333 L283.306667,351.786667 L341.333333,351.786667 L341.333333,329.173333 L283.306667,329.173333 L283.306667,299.946667 L341.333333,299.946667 L341.333333,277.333333 L254.506667,277.333333 L254.506667,405.333333 L254.506667,405.333333 Z M234.666667,7.10542736e-15 L9.52127266e-13,7.10542736e-15 L9.52127266e-13,234.666667 L42.6666667,234.666667 L42.6666667,192 L42.6666667,169.6 L42.6666667,42.6666667 L216.96,42.6666667 L298.666667,124.373333 L298.666667,169.6 L298.666667,192 L298.666667,234.666667 L341.333333,234.666667 L341.333333,106.666667 L234.666667,7.10542736e-15 L234.666667,7.10542736e-15 Z"
        id="document-pdf"
      ></path>
    </g>
  </g>
</svg>;
`, b = `
<svg
  width="800px"
  height="800px"
  viewBox="0 -0.5 21 21"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs></defs>
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g
      id="Dribbble-Light-Preview"
      transform="translate(-259.000000, -840.000000)"
      fill="currentColor"
    >
      <g id="icons" transform="translate(56.000000, 160.000000)">
        <path
          d="M211.261065,690.694762 C209.623062,692.25443 206.966811,692.25443 205.328807,690.694762 L203.614251,689.062203 C202.79525,688.282368 202.79525,687.018258 203.614251,686.238424 C204.433253,685.45859 205.761903,685.45859 206.580905,686.238424 C207.721845,687.3248 208.972894,687.224949 209.777214,686.458096 C210.587827,685.686249 210.685352,684.498026 209.541266,683.409653 C208.722264,682.629819 208.722264,681.36471 209.541266,680.584876 C210.361317,679.805041 211.688918,679.805041 212.50792,680.584876 L214.22667,682.221429 C215.864674,683.781098 215.864674,686.310317 214.22667,687.869985 L223.356286,696.563988 C225.318325,698.431197 222.350623,701.253977 220.390682,699.387767 L211.261065,690.694762 Z"
          id="settings-[#1365]"
        ></path>
      </g>
    </g>
  </g>
</svg>;
`, M = `
<svg
  width="800px"
  height="800px"
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
</svg>;
`, _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BackArrowNavigation: x,
  ChevronDown: C,
  DeleteRecycleBinTrashCan: m,
  Edit2: y,
  PDFDocument: k,
  Settings: b,
  TodayOutline: M
}, Symbol.toStringTag, { value: "Module" })), T = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  events: L,
  ripple: v,
  svg: _
}, Symbol.toStringTag, { value: "Module" }));
class j extends HTMLElement {
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
class E extends HTMLElement {
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
class S extends HTMLElement {
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
class $ extends HTMLElement {
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
class z extends HTMLElement {
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
class B extends HTMLElement {
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
const O = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: j,
  IconButton: E,
  Label: $,
  Primary: z,
  Secondary: B,
  Select: S
}, Symbol.toStringTag, { value: "Module" })), H = {
  ...T,
  wc: O
};
export {
  H as default
};
