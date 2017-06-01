import { handleAction, handleActions, combineActions } from 'redux-actions';
import { data_setup, favorite_add, favorite_remove } from './../actions/ActionCreator';
import { getCurrentTab, getFavorites } from './../lib/chrome';

// TODO: chromeの依存をなくす

export const favorites = handleActions({
    /* お気に入りを設定 */
    [data_setup]: (state, action) => {
        return async () => {
            return await getFavorites();
        };
    },

    /* お気に入りを末尾に追加 */
    [favorite_add]: (state, action) => {
        return async () => {
            const tab = await getCurrentTab();
            return [ ...state.favorites, tab ];
        };
    },

    /* 指定したお気に入りの削除 */
    [favorite_remove]: (state, action) =>
        state.favorites.filter(function(favorite, idx) {
            return (favorite.url !== action.payload);
        })
    ,
}, []);

/**
 * 開いているのページのお気に入りの状態
 */
export const operationFavorite = handleAction(combineActions(
    data_setup, favorite_add, favorite_remove
), {
    next: state => {
        return async () => {
            const tab = await getCurrentTab();
            const favorites = await getFavorites();
            const items = favorites.filter(function(favorite, idx) {
                return (favorite.url !== tab.url);
            });
            return (items.length > 0);
        };
    },
    throw: () => false,
}, false);
