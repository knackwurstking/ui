export default class Events {
  /** @type {{[key: string]: ((data: any) => void|Promise<void>)[]}} */
  listeners;

  constructor() {
    this.listeners = {}
  }

  /**
   * @param {string} key
   * @param {any} data
   */
  dispatchWithData(key, data) {
    if (!!this.listeners[key]) {
      for (const listener of this.listeners[key]) {
        console.log(`storage: "${key}":`, data)
        listener(data)
      }
    }

    return this
  }

  /**
   * @param {string} key
   * @param {((data: any) => void|Promise<void>) | null} listener
   * @returns {() => void} clean up function
   */
  addListener(key, listener) {
    if (!this.listeners[key]) {
      this.listeners[key] = []
    }

    this.listeners[key].push(listener);

    return (() => {
      this.removeListener(key, listener)
    })
  }

  /**
   * @param {string} key
   * @param {((data: any) => void|Promise<void>)} listener
   * @returns {((data: any) => void|Promise<void>) | null}
   */
  removeListener(key, listener) {
    if (!this.listeners[key]) return

    let index = 0
    for (const l of this.listeners[key]) {
      if (l === listener) {
        this.listeners[key].splice(index, 1)
      }
      index++
    }

    return listener
  }
}
