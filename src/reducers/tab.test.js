import { tab as reducer, initialState } from './tab';
import { not_exist_action, init_setup } from './../actions/ActionCreator';

describe('reducer: tab', () => {

    it('initial state', () => {
        // TODO: how to check `initialState`
        const next = reducer(initialState, not_exist_action);
        expect(next).toBe(initialState);
    });

    it('action: init_setup', () => {
        const data = {
            id: 10,
            favIconUrl: 'http://example.com/icon.png',
        };
        const next = reducer(initialState, init_setup(data));
        const expected = Object.assign({}, initialState, data);
        expect(next).toEqual(expected);
    });

});
