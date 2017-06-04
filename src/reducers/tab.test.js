import { tab as reducer, initialState } from './tab';
import { init_setup } from './../actions/ActionCreator';

describe('reducer: tab', () => {

    it('initial state', () => {
        const next = reducer(undefined, {});
        expect(next).toBe(initialState);
    });

    it('action: init_setup', () => {
        const data = {
            id: 10,
            favIconUrl: 'http://example.com/icon.png',
        };
        const next = reducer(undefined, init_setup(data));
        const expected = Object.assign({}, initialState, data);
        expect(next).toEqual(expected);
    });

});
