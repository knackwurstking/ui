export { UIInput } from "./ui-input";
export { UISelect } from "./ui-select";
export { UISelectOption } from "./ui-select-option";
export type UIInputEvents = {
    input: string | number;
    change: string | number;
};
export type UIInputTypes = ("text" | "number" | "month" | "date" | "email");
export type UIInputTypeValues = {
    text: string;
    number: number;
    month: string;
    date: string;
    email: string;
};
export type UISelectEvents = {
    "change": import("./ui-select-option").UISelectOption;
};
