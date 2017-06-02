import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Item from './Item';
import { Type } from './../constants';

class Favorite extends Component {

    static propTypes = {
        favorites: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            favIconUrl: PropTypes.string.isRequired,
        })).isRequired,
    };

    items = () => {
        const { favorites } = this.props;
        if (favorites.length) {
            return favorites.map((tab, idx) => {
                return (
                    <Item key={'tab-' + idx}
                          id={tab.id}
                          url={tab.url}
                          title={tab.title}
                          favIconUrl={tab.favIconUrl}
                          currentId={false}
                          type={Type.Favorite}
                    />
                );
            });
        } else {
            return (
                <li className="list-group-item">
                    <div className="media-body">
                        <p>お気に入りに登録することで一覧に表示されます。</p>
                    </div>
                </li>
            );
        }
    };

    render() {
        const items = this.items();
        return (
            <div className="favorite">
                <ul className="list-group">
                    {items}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
