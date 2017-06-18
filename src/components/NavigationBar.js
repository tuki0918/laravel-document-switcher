import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export class NavigationBar extends Component {

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

    /**
     * 一覧のHTMLを生成
     * @returns {Array}
     */
    items = () => {
        const { selected } = this.state;
        const data = this.data();
        return data.map((nav, idx) => {
            const divClass = classNames('tab-item',
                {
                    'active' : (idx === selected),
                });
            return (
                <div className={divClass} key={'nav-' + idx}>
                    <Link to={nav.path} onClick={this.onSwitch} data-idx={idx}>
                        {nav.name}
                    </Link>
                </div>
            );
        }, this)
    };

    render() {
        const items = this.items();
        return (
            <div className="tab-group">
                {items}
            </div>
        );
    }
}

export default NavigationBar;
