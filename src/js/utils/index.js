/**
 * @returns {boolean}
 */
export function isAndroid() {
    return /(android)/i.test(navigator.userAgent);
}

export const html = String.raw
