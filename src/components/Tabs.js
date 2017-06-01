import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Item from './Item';
import { Type } from './../constants';
import { getTabs } from './../lib/chrome';

class Tabs extends Component {

    static propTypes = {
        currentTabId: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            tabs: [],
        }
    }

    componentDidMount() {
        this.getTabList();
    }

    getTabList = () => {
        const tabs = getTabs();
        console.log('===TAB===', tabs, '<<< getTabList');
        this.setState({
            tabs: tabs,
        });
    };

    feeds = () => {
        const { currentTabId } = this.props;
        const { tabs } = this.state;
        if (tabs.length) {
            return tabs.map((tab, idx) => {
                return (
                    <Item key={'tab-' + idx}
                          id={tab.id}
                          url={tab.url}
                          title={tab.title}
                          favIconUrl={tab.favIconUrl}
                          currentId={currentTabId}
                          type={Type.Tab}
                    />
                );
            });
        } else {
            return (
                <li className="list-group-item">
                    <div className="media-body">
                        <p>現在、開いているドキュメントが表示されます。</p>
                    </div>
                </li>
            );
        }
    };

    render() {
        const items = this.feeds();
        return (
            <div className="tabs">
                <ul className="list-group">
                    {items}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentTabId: state.setting.currentTabId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
