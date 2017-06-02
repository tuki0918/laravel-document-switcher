import React, { Component } from 'react';
import ControlBar from './ControlBar';
import NavigationBar from './NavigationBar';

class Home extends Component {

    render() {
        return (
            <div className="window">

                <ControlBar />

                <NavigationBar />

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
