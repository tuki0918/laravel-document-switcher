/**
 * ドキュメントかどうかを返す
 * @type {{NOT_DOC: number, JPN_DOC: number, ENG_DOC: number}}
 */
export const FLAG = {
    NOT_DOC: 0,
    JPN_DOC: 1,
    ENG_DOC: 2,
};

/**
 * ドキュメントURLの正規表現
 * @type {{JPN_DOC_URL: RegExp, ENG_DOC_URL: RegExp}}
 */
const REGEX = {
    JPN_DOC_URL: /^https?:\/\/readouble\.com\/laravel\/(master|\d\.\d)?\/?(ja|en)?\/?/,
    ENG_DOC_URL: /^https?:\/\/laravel\.com\/docs\/(master|\d\.\d)?\/?/,
};

const KEY_VERSION = '##VERSION##';
const KEY_PATH    = '##PATH##';

const LINK_URL = 'https://readouble.com/laravel/' + KEY_VERSION + '/ja/' + KEY_PATH;


/**
 * 指定したURLのドキュメントタイプを返す
 * @param str
 * @returns {number}
 */
export const checkURL = (str) => {
    if (REGEX.ENG_DOC_URL.test(str)) return FLAG.ENG_DOC;
    if (REGEX.JPN_DOC_URL.test(str)) return FLAG.JPN_DOC;
    return FLAG.NOT_DOC;
};

/**
 * 指定したURLとVersionを反映したURLを返す
 * @param str
 * @param version
 * @returns {string}
 */
export const convertToURL = (str, version) => {
    const flag = checkURL(str);
    let path = '';

    if (flag === FLAG.NOT_DOC) {
        return path;
    } else if (flag === FLAG.ENG_DOC) {
        path = str.replace(REGEX.ENG_DOC_URL, '');
    } else if (flag === FLAG.JPN_DOC) {
        path = str.replace(REGEX.JPN_DOC_URL, '');
    }

    return LINK_URL
        .replace(KEY_VERSION, version)
        .replace(KEY_PATH, path);
};

