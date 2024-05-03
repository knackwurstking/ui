declare namespace _default {
    export { js };
    export { wc };
    export { define };
    export { defineSVG };
}
export default _default;
import * as js from "./js";
import * as wc from "./wc";
declare function define(): Promise<void>;
declare function defineSVG(): Promise<void>;
