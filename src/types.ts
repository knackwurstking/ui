import { UIStore } from "../lib";

export type MainStore = UIStore<{
    test: number;
    foo: boolean;
}>;
