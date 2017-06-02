import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/Home';
import Tabs from './components/Tabs';
import Favorite from './components/Favorite';

export default class App extends Component {

    render() {
        const { store } = this.props;
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
