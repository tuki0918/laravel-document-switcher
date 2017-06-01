import { createAction } from 'redux-actions';

export const INIT_SETUP = ('INIT_SETUP');
export const UPDATE_EVENT = ('UPDATE_EVENT');
export const DATA_SETUP = ('DATA_SETUP');
export const FAVORITE_ADD = ('FAVORITE_ADD');
export const FAVORITE_REMOVE = ('FAVORITE_REMOVE');

export const INIT_EVENT = ('INIT_EVENT');
export const CHANGE_FAVORITE = ('CHANGE_FAVORITE');

export const GET_FEEDS = ('GET_FEEDS');
export const GET_VERSION = ('GET_VERSION');

export const CHANGE_VERSION = ('CHANGE_VERSION');


export const SELECT_TAB = ('SELECT_TAB');

export const init_setup = createAction(INIT_SETUP);
export const update_event = createAction(UPDATE_EVENT);
export const data_setup = createAction(DATA_SETUP);
export const favorite_add = createAction(FAVORITE_ADD);
export const favorite_remove = createAction(FAVORITE_REMOVE);

export const init_event = createAction(INIT_EVENT);
export const change_favorite = createAction(CHANGE_FAVORITE);

export const get_feeds = createAction(GET_FEEDS);
export const get_version = createAction(GET_VERSION);

export const change_version = createAction(CHANGE_VERSION);

export const select_tab = createAction(SELECT_TAB);


