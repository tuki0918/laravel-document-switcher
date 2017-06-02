import { createAction } from 'redux-actions';

export const INIT_SETUP = ('INIT_SETUP');
export const FAVORITE_ADD = ('FAVORITE_ADD');
export const FAVORITE_REMOVE = ('FAVORITE_REMOVE');
export const CHANGE_VERSION = ('CHANGE_VERSION');

export const init_setup = createAction(INIT_SETUP);
export const favorite_add = createAction(FAVORITE_ADD);
export const favorite_remove = createAction(FAVORITE_REMOVE);
export const change_version = createAction(CHANGE_VERSION);
