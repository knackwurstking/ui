/**
 * @typedef {import(".")._Events} _Events
 */

/**
 * @template {_Events} T
 */
export default class Events {
  /**
   * @type {any}
   */
  #listeners = {};

  /**
   * @template {keyof T} K
   * @param {K} key
   * @param {((data: T[K]) => void|Promise<void>) | null} listener
   * @returns {() => void} clean up function
   */
  on(key, listener) {
    if (typeof listener !== "function")
      throw `invalid event listener passed for "${key.toString()}" event!`;

    if (!this.#listeners[key]) {
      this.#listeners[key] = [];
    }

    this.#listeners[key].push(listener);

    return () => {
      this.off(key, listener);
    };
  }

  /**
   * @template {keyof T} K
   * @param {K} key
   * @param {((data: T[K]) => void|Promise<void>)} listener
   */
  off(key, listener) {
    if (!this.#listeners[key])
      throw `no listeners found for ${key.toString()}, there is nothing to delete`;

    let match = false;
    let index = 0;
    for (const l of this.#listeners[key]) {
      if (l === listener) {
        this.#listeners[key].splice(index, 1);
        match = true;
      }
      index++;
    }

    if (!match)
      throw `listener not found for ${key.toString()}, there is nothing to delete`;

    return this;
  }

  /**
   * @template {keyof T} K
   * @param {K} key
   * @param {T[K]} data
   */
  dispatch(key, data) {
    if (data === undefined) throw `data is undefined!`;

    if (!!this.#listeners[key]) {
      for (const listener of this.#listeners[key]) {
        listener(data);
      }
    }

    return this;
  }
}
