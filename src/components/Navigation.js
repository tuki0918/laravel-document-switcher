import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectIndex: 0,
        };
    }

    onChange = (idx) => {
        console.log('===Navigation===', idx, '<<< onChange');
        // this.setState({
        //     selectIndex: idx
        // });
    };

    data = () => {
        return [
            {
                link: '/tabs',
                name: '開いてるドキュメント'
            },
            {
                link: '/favorite',
                name: 'お気に入り'
            },
        ];
    };

    render() {
        const { selectIndex } = this.state;

        const data = this.data();
        return (
            <div className="tab-group">
                {
                    data.map(function(nav, idx) {
                        const isActive = (idx === selectIndex) ? 'active' : '';
                        return (
                            <div className={'tab-item ' + isActive} key={'nav-' + idx}>
                                <Link to={nav.link} onClick={this.onChange(idx)}>{nav.name}</Link>
                            </div>
                        );
                    }, this)
                }
            </div>
        );
    }
}

export default Navigation;
