import { handleActions } from 'redux-actions';
import { init_setup } from './../actions/ActionCreator';

export const initialState = {
    /* ブラウザタブのID */
    id: 0,

    /* ブラウザタブのURL */
    url: '',
};

export const tab = handleActions({
    /* 初期設定 */
    [init_setup]: (state, action) =>
        Object.assign({}, state, action.payload)
    ,
}, initialState);
