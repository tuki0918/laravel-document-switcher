import Raven from 'raven-js';
import React from 'react';
import { render } from 'react-dom';
import { createReduxStore } from './store';
import App from './App';
import { SENTRY_DSN } from './constants';
import { init_setup } from './actions/ActionCreator';
import { getCurrentTab, getState, setState } from './lib/chrome';
import 'photon/dist/css/photon.css'
import './App.css';

/**
 * Logger
 */
Raven.config(SENTRY_DSN).install();

/**
 * Store & render
 */
(async () => {
    // 初期ステート & 初期データ
    const preLoadedState = await getState() || {};
    const tab = await getCurrentTab();

    // ストアの作成
    const store = createReduxStore(preLoadedState);

    // セットアップ処理
    store.dispatch(init_setup(tab));

    // ステートが変更された時の処理
    store.subscribe(async () => {
        const state = store.getState();
        // 現在ステートの一部を永続化する
        await setState({
            setting: state.setting,
            favorites: state.favorites,
        });
    });

    // 描画
    render(
        <App store={store} />,
        document.getElementById('root')
    );
})();
