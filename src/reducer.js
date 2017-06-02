import { combineReducers } from 'redux';
import { favorites } from './reducers/favorites';
import { setting } from './reducers/setting';
import { versions } from './reducers/versions';
import { tab } from './reducers/tab';

export default combineReducers({
    setting: setting,
    versions: versions,
    favorites: favorites,
    tab: tab,
});
