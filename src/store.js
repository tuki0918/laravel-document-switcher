import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './reducer';

const useDevTools =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = useDevTools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const middlewareEnhancer = applyMiddleware(promiseMiddleware);

/**
 * ストアを生成する
 * @param preLoadedState
 * @returns {Store}
 */
export const createReduxStore = (preLoadedState) => {
    // compose関数：複数の関数を結合する
    return createStore(
        reducer,
        preLoadedState,
        composeEnhancers(middlewareEnhancer)
    );
};
