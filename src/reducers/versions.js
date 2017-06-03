import { handleActions } from 'redux-actions';
import json from './../data/versions.json';

/* サポートしているバージョンの一覧 */
export const initialState = json;

export const versions = handleActions({
    //
}, initialState);
