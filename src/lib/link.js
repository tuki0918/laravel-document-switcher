import url from 'url';

/**
 * ドキュメントかどうかを返す
 * @type {{NOT_DOC: number, JPN_DOC: number, ENG_DOC: number}}
 */
const FLAG = {
    NOT_DOC: 0,
    JPN_DOC: 1,
    ENG_DOC: 2,
};

/**
 * ドキュメントURLの正規表現
 * @type {{JPN_DOC_URL: RegExp, ENG_DOC_URL: RegExp}}
 */
const REGEX = {
    JPN_DOC_URL: /^https?:\/\/readouble\.com\/laravel\/.+\/(ja|en)\/.*$/,
    ENG_DOC_URL: /^https?:\/\/laravel\.com\/flags\/.*$/,
};

const KEY_VERSION = '##VERSION##';
const KEY_PATH    = '##PATH##';

const LINK_URL = 'http://readouble.com/laravel/' + KEY_VERSION + '/ja/' + KEY_PATH;


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
    const current = url.parse(str);
    const flag = checkURL(str);

    if (flag === FLAG.NOT_DOC) {
        return '';
    }

    let path = current.path.replace(/^.*\//, '');
    if (flag === FLAG.ENG_DOC) {
        path += '.html';
    }

    let hash = current.hash ? current.hash : '';
    return LINK_URL
        .replace(KEY_VERSION, version)
        .replace(KEY_PATH, path + hash);
};

