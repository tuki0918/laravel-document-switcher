/* global chrome */

import { checkURL } from './link';
import { logException } from './logException';

/**
 * chrome.storage
 * https://developer.chrome.com/extensions/storage
 */

/**
 * ストレージから任意のオブジェクトを読み込む
 * @param {string|null} key
 * @returns {Promise}
 */
export const getLocalStorage = (key = null) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, (item) => {
            const err = chrome.runtime.lastError;
            if (err) {
                logException(err);
                reject(err);
            }
            key ? resolve(item[key]) : resolve(item);
        });
    });
};

/**
 * 任意のオブジェクトをストレージに保存する
 * @param {Object} obj
 * @returns {Promise}
 */
export const setLocalStorage = (obj) => {
    return new Promise((resolve) => {
        chrome.storage.local.set(obj, () => resolve());
    });
};

/**
 * お気に入りをストレージに保存する
 * @param {Array} favorites
 * @returns {Promise}
 */
export const setFavorites = (favorites) => {
    return setLocalStorage({
        favorites: favorites
    });
};


// console
/**
 * ストレージからお気に入りを読み込む
 * @returns {Promise}
 */
export const getFavorites = () => {
    return getLocalStorage('favorites');
};


/**
 * ストレージから選択中のバージョンを読み込む
 * @returns {Promise}
 */
export const getSelectedVersion = () => {
    return getLocalStorage('current');
};


/**
 * chrome.tabs
 * https://developer.chrome.com/extensions/tabs
 */

/**
 * 指定したURLを新しいタブで開く
 * @param target
 */
export const openTab = (target) => {
    chrome.tabs.create({ url: target });
};

/**
 * 指定したURLを右に新しいタブで開く
 * @param target
 * @param currentTabIndex
 */
export const openTab2Right = (target, currentTabIndex) => {
    chrome.tabs.create({
        url: target,
        index: currentTabIndex + 1,
    });
};

/**
 * すべてのタブ情報を返す
 * @returns {Promise}
 */
export const getTabs = () => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({},
            tabs => { resolve(tabs); }
        );
    });
};

/**
 * 選択中のタブ情報を返す
 * @returns {Promise}
 */
export const getCurrentTab = () => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query(
            {
                active: true,
                windowId: chrome.windows.WINDOW_ID_CURRENT
            },
            tabs => { resolve(tabs[0]); }
        );
    });
};

/**
 * 指定したタブを移動する
 * @param tabIds
 * @param moveProperties
 */
export const moveTabs = (tabIds, moveProperties) => {
    return new Promise((resolve, reject) => {
        chrome.tabs.move(tabIds, moveProperties, tabs => {
            const err = chrome.runtime.lastError;
            if (err) {
                logException(err);
                reject(err);
            }
            resolve(tabs);
        });
    });
};

/**
 * 指定したタブを削除する
 * @param tabIds
 */
export const removeTabs = (tabIds) => {
    return new Promise((resolve, reject) => {
        chrome.tabs.move(tabIds, () => {
            const err = chrome.runtime.lastError;
            if (err) {
                logException(err);
                reject(err);
            }
            resolve(tabIds);
        });
    });
};

/**
 * 指定したタブを更新する
 * @param tabId
 * @param updateProperties
 */
export const updateTab = (tabId, updateProperties) => {
    return new Promise((resolve, reject) => {
        chrome.tabs.update(tabId, updateProperties, tab => {
            const err = chrome.runtime.lastError;
            if (err) {
                logException(err);
                reject(err);
            }
            resolve(tab);
        });
    });
};


// item.js
/**
 * 指定したタブを現在のタブの右に移動する
 * @param tabIds
 */
export const moveTabs2Right = async (tabIds) => {
    const tab = await getCurrentTab();
    await moveTabs(tabIds, {
        windowId: chrome.windows.WINDOW_ID_CURRENT,
        index: tab.index + 1
    });
    await updateTab(tab.id, { selected: true });
    // chrome.tabs.query(
    //     {active: true, windowId: windowId},
    //     tabs => {
    //         let tab = tabs[0];
    //         let moveProperties = {windowId: windowId, index: tab.index + 1};
    //         chrome.tabs.move(tagId, moveProperties, tab => {
    //             let err = chrome.runtime.lastError;
    //             if (err) {
    //                 this.setState({
    //                     err: err.message,
    //                 });
    //                 return;
    //             }
    //             chrome.tabs.update(tab.id, {selected: true}, tab => {
    //                 this.setState({
    //                     err: false,
    //                 });
    //             });
    //         });
    //     }
    // );
};

// root.js
// export const jjj1 = () => {
//     chrome.tabs.query(
//         {active: true, windowId: chrome.windows.WINDOW_ID_CURRENT},
//         tabs => {
//             let tab = tabs[0];
//             let active = url.check(tab.url) ? true : false;
//             this.setState({
//                 url: tab.url,
//                 isActive: active,
//                 tabIndex: tab.index,
//             });
//             FavoriteActions.updated();
//         }
//     );
// };


// tabs
// export const rrr1 = () => {
//     chrome.tabs.query(
//         {active: true, windowId: chrome.windows.WINDOW_ID_CURRENT},
//         tabs => {
//             let tab = tabs[0];
//             this.setState({
//                 currentId: tab.id,
//             });
//         }
//     );
// };

/**
 * 開いているすべてのタブのドキュメント記事を返す
 * @returns {Array}
 */
export const getOpenTabFeeds = async () => {
    const tabs = await getTabs();
    let feeds = [];
    tabs.map(tab => {
        if (!checkURL(tab.url)) {
            return false;
        }
        feeds.push({
            id: tab.id,
            url: tab.url,
            title: tab.title,
            favIconUrl: tab.favIconUrl,
        });
        return true;
    });
    feeds.reverse();
    return feeds;
};
