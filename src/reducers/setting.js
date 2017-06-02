import { handleActions } from 'redux-actions';
import { change_version, select_tab } from './../actions/ActionCreator';

const initialSettingState = {
    /* 選択中のドキュメントバージョン */
    current: '5/4',

    /* 選択中のタブのインデックス */
    selectIndex: 0,
};

export const setting = handleActions({
    /* バージョンを変更 */
    [change_version]: (state, action) => Object.assign({}, state, {
        current: action.payload
    }),

    /* 選択中のナビゲーションタブのインデックスを変更 */
    [select_tab]: (state, action) => Object.assign({}, state, {
        selectIndex: action.payload
    }),
}, initialSettingState);
