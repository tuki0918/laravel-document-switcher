/* eslint-env browser */

import Raven from 'raven-js';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { SENTRY_DSN } from './constants';
import { createStore, applyMiddleware, compose } from 'redux';
import { getCurrentTab, getState, setState } from './lib/chrome';
import { init_setup } from './actions/ActionCreator';
import reducer from './reducer';
import promiseMiddleware from 'redux-promise';
import 'photon/dist/css/photon.css'
import './App.css';

/**
 * Logger
 */
Raven.config(SENTRY_DSN).install();


/**
 *
 */
const useDevTools =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = useDevTools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const middlewareEnhancer = applyMiddleware(promiseMiddleware);

/**
 *
 */
(async () => {
    // TODO: storeのモジュール化
    // 初期ステート
    const preLoadedState = await getState() || {};

    // compose関数：複数の関数を結合する
    const store = createStore(
        reducer,
        preLoadedState,
        composeEnhancers(middlewareEnhancer)
    );

    // 初期データ
    const tab = await getCurrentTab();
    store.dispatch(init_setup(tab));

    // 初期ステートのログ
    console.error(store.getState());

    // ステートが変更されるたびに実行
    store.subscribe(async () => {
        const state = store.getState();
        // 現在ステートの一部を永続化する
        await setState({
            setting: state.setting,
            favorites: state.favorites,
        });
        console.warn(store.getState());
    });

    // 描画
    render(
        <App store={store} />,
        document.getElementById('root')
    );
})();
