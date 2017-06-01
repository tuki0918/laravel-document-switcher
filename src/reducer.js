import { combineReducers } from 'redux';
import { favorites, operationFavorite } from './reducers/favorites';
import { feeds } from './reducers/feeds';
import { setting } from './reducers/setting';

export default combineReducers({
    setting: setting,
    feeds: feeds,
    favorites: favorites,
    isFavorite: operationFavorite,
});
