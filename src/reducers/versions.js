import { handleActions } from 'redux-actions';
import json from './../data/versions.json';

/* サポートしているバージョンの一覧 */
const initialSettingState = json;

export const versions = handleActions({
    //
}, initialSettingState);
