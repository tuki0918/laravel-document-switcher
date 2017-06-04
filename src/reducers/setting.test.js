import { setting as reducer, initialState } from './setting';
import { change_version } from './../actions/ActionCreator';

describe('reducer: setting', () => {

    it('initial state', () => {
        const next = reducer(undefined, {});
        expect(next).toBe(initialState);
    });

    it('action: change_version', () => {
        const current = 'master';
        const data = {
            current: current,
        };
        const next = reducer(undefined, change_version(current));
        const expected = Object.assign({}, initialState, data);
        expect(next).toEqual(expected);
    });

});
