import { versions as reducer, initialState } from './versions';

describe('reducer: versions', () => {

    it('initial state', () => {
        const next = reducer(undefined, {});
        expect(next).toBe(initialState);
    });

});
