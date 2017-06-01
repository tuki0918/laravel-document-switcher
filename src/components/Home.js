import React, { Component } from 'react';
import Control from './Control';
import Navigation from './Navigation';

class Home extends Component {

    render() {
        return (
            <div className="window">

                <Control />

                <Navigation />

                <div className="window-content">
                    <div className="pane-group">
                        <div className="pane">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
