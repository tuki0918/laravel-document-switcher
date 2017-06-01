import { handleActions } from 'redux-actions';
import { get_feeds } from './../actions/ActionCreator';

export const feeds = handleActions({
    /* フィードを読み込む */
    [get_feeds]: (state, action) => action.payload,
}, []);
