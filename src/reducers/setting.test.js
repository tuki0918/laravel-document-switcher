import { setting as reducer, initialState } from './setting';
import { not_exist_action, change_version } from './../actions/ActionCreator';

describe('reducer: setting', () => {

    it('initial state', () => {
        // TODO: how to check `initialState`
        const next = reducer(initialState, not_exist_action);
        expect(next).toBe(initialState);
    });

    it('action: change_version', () => {
        const current = 'master';
        const data = {
            current: current,
        };
        const next = reducer(initialState, change_version(current));
        const expected = Object.assign({}, initialState, data);
        expect(next).toEqual(expected);
    });

});
