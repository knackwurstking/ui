export { UIInput } from "./ui-input";
export { UISelect } from "./ui-select";
export { UISelectOption } from "./ui-select-option";

/**
 * @typedef {{
 *  input: string | number;
 *  change: string | number;
 * }} UIInputEvents
 *
 * @typedef {(
 *  | "text"
 *  | "number"
 *  | "month"
 *  | "date"
 *  | "email"
 * )} UIInputTypes
 *
 * @typedef {{
 *  text: string;
 *  number: number;
 *  month: string;
 *  date: string;
 *  email: string;
 * }} UIInputTypeValues
 *
 * @typedef {{ "change": import("./ui-select-option").UISelectOption }} UISelectEvents
 */
