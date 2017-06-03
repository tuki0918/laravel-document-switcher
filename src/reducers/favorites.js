import { handleActions } from 'redux-actions';
import { favorite_add, favorite_remove } from './../actions/ActionCreator';

export const initialState = [];

export const favorites = handleActions({
    /* お気に入りを末尾に追加 */
    [favorite_add]: (state, action) =>
        [ ...state, action.payload ]
    ,

    /* 指定したお気に入りの削除 */
    [favorite_remove]: (state, action) =>
        state.filter(function(favorite, idx) {
            return (favorite.url !== action.payload);
        })
    ,
}, initialState);
