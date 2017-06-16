import { createReduxStore } from './store';

describe('Module: store', () => {

    it('createReduxStore: set preLoadedState {}', () => {

        const preLoadedState = {};
        const store = createReduxStore(preLoadedState);
        const state = store.getState();

        expect(state).toEqual({
            setting: { current: '5.4' },
            versions:
                [
                    { name: '5.4', value: '5.4' },
                    { name: '5.3', value: '5.3' },
                    { name: '5.2', value: '5.2' },
                    { name: '5.0', value: '5.0' }
                ],
            favorites: [],
            tab: { id: 0, url: '' } }
        );
    });

});
