import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: 0,
        };
    }

    /**
     * ナビゲーションの切り替え
     * @param e
     */
    onSwitch = (e) => {
        const idx = e.currentTarget.getAttribute('data-idx');
        this.setState({
            selected: parseInt(idx, 10),
        });
    };

    /**
     * タブ情報
     * @returns {[*,*]}
     */
    data = () => {
        return [
            {
                path: '/tabs',
                name: '現在、開いてるドキュメント'
            },
            {
                path: '/favorite',
                name: 'ブックマーク'
            },
        ];
    };

    render() {
        const { selected } = this.state;
        const data = this.data();
        return (
            <div className="tab-group">
                {
                    data.map(function(nav, idx) {
                        const isActive = (idx === selected) ? 'active' : '';
                        return (
                            <div className={'tab-item ' + isActive} key={'nav-' + idx}>
                                <Link to={nav.path} onClick={this.onSwitch} data-idx={idx}>
                                    {nav.name}
                                </Link>
                            </div>
                        );
                    }, this)
                }
            </div>
        );
    }
}

export default NavigationBar;