import { handleActions } from 'redux-actions';
import { change_version, get_version, select_tab } from './../actions/ActionCreator';
import versions from './../data/versions.json';
import { getCurrentTab, getSelectedVersion } from './../lib/chrome';

// pageが移動したときtab情報変わってるか

const tab = async () => {
    console.log('==setting->tab==');
    return await getCurrentTab();
};

console.log('===reducer===', tab, '<<< tab');

const initialSettingState = {
    /* 選択中のドキュメントバージョン */
    current: '5/4',

    /* サポートしているバージョンの一覧 */
    versions: versions,

    /* 選択中のタブのインデックス */
    selectIndex: 0,

    /* 開いているのブラウザタブのインデックス */
    currentTabId: tab.id, // TODO check

    /* 開いているのブラウザタブのURL */
    currentTabUrl: tab.url, // TODO check
};

export const setting = handleActions({
    /* バージョンを読み込む */
    [get_version]: (state, action) => {
        const version = async () => {
            return await getSelectedVersion();
        };
        return { current: version };
    },

    /* バージョンを変更 */
    [change_version]: (state, action) => Object.assign({}, state, {
        current: action.payload
    }),

    /* 選択中のナビゲーションタブのインデックスを変更 */
    [select_tab]: (state, action) => Object.assign({}, state, {
        selectIndex: action.payload
    }),
}, initialSettingState);
