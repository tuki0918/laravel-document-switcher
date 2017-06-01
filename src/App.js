import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import promiseMiddleware from 'redux-promise';

import Home from './components/Home';
import Tabs from './components/Tabs';
import Favorite from './components/Favorite';

// 本番環境でない＆拡張がインストール済みかどうか
const useDevTools =
    // process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// 他のenhancerと結合する関数
const composeEnhancers = useDevTools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const middlewareEnhancer = applyMiddleware(promiseMiddleware);

// compose関数：複数の関数を結合する
const store = createStore(
    reducer,
    composeEnhancers(middlewareEnhancer)
);

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Home>
                        <Route path='/tabs' component={Tabs} />
                        <Route path='/favorite' component={Favorite} />
                        <Redirect from="*" to="/tabs" />
                    </Home>
                </Router>
            </Provider>
        )
    }

}
