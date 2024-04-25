declare const _default: {
    wc: typeof wc;
    define: typeof define;
    defineSVG: typeof defineSVG;
    events: typeof js.events;
    ripple: typeof js.ripple;
    utils: typeof js.utils;
};
export default _default;
import * as wc from "./wc";
declare function define(): Promise<void>;
declare function defineSVG(): Promise<void>;
import * as js from "./js";
