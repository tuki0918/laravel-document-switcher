import { favorites as reducer, initialState } from './favorites';
import { favorite_add, favorite_remove } from './../actions/ActionCreator';

describe('reducer: favorites', () => {

    it('initial state', () => {
        const next = reducer(undefined, {});
        expect(next).toBe(initialState);
    });

    it('action: favorite_add 1', () => {
        const data = {
            id: 10,
            favIconUrl: 'http://example.com/icon.png',
        };
        const next = reducer(initialState, favorite_add(data));
        const expected = [data];
        expect(next).toEqual(expected);
    });

    it('action: favorite_add 2', () => {
        // 1 action
        const data1 = {
            id: 1,
            favIconUrl: 'http://example.com/icon1.png',
        };
        const next1 = reducer(undefined, favorite_add(data1));
        const expected1 = [data1];
        expect(next1).toEqual(expected1);

        // 2 action
        const data2 = {
            id: 2,
            favIconUrl: 'http://example.com/icon2.png',
        };
        const next2 = reducer(next1, favorite_add(data2));
        const expected2 = [data1, data2];
        expect(next2).toEqual(expected2);
    });

    it('action: favorite_remove 1', () => {
        const url = 'http://example.com/page1';
        const next = reducer(undefined, favorite_remove(url));
        const expected = [];
        expect(next).toEqual(expected);
    });

    it('action: favorite_remove 2', () => {
        const state = [
            { url: 'http://example.com/page1' },
            { url: 'http://example.com/page2' },
            { url: 'http://example.com/page3' },
        ];

        const [data1, data2, data3] = state;
        const next = reducer(state, favorite_remove(data2['url']));
        const expected = [data1, data3];
        expect(next).toEqual(expected);
    });

});
