import { handleActions } from 'redux-actions';
import { change_version } from './../actions/ActionCreator';

export const initialState = {
    /* 選択中のドキュメントバージョン */
    current: '5.4',
};

export const setting = handleActions({
    /* バージョンを変更 */
    [change_version]: (state, action) => Object.assign({}, state, {
        current: action.payload
    }),
}, initialState);
