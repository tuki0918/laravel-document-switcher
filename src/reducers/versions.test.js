import { versions as reducer, initialState } from './versions';
import { not_exist_action } from './../actions/ActionCreator';

describe('reducer: versions', () => {

    it('initial state', () => {
        // TODO: how to check `initialState`
        const next = reducer(initialState, not_exist_action);
        expect(next).toBe(initialState);
    });

});
