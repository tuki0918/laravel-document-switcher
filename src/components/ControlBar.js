import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import { favorite_add, favorite_remove } from './../actions/ActionCreator';
import { checkURL, convertToURL } from './../lib/link';
import { openTab2Right } from './../lib/chrome';

export class ControlBar extends Component {

    static propTypes = {
        current: PropTypes.string.isRequired,
        versions: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })).isRequired,

        favorites: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string.isRequired,
        })).isRequired,

        tab: PropTypes.shape({
            id: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            favIconUrl: PropTypes.string.isRequired,
        }).isRequired,

        addFavorite: PropTypes.func.isRequired,
        removeFavorite: PropTypes.func.isRequired,
    };

    /**
     * お気に入りに登録・解除
     */
    onToggleFavorite = () => {
        const { tab, addFavorite, removeFavorite } = this.props;
        if (!this.isFavorite()) {
            addFavorite(tab);
        } else {
            removeFavorite(tab.url);
        }
    };

    /**
     * 新しいタブでドキュメントを開く
     */
    onOpenDocument = () => {
        if (this.isActive()) {
            const { tab, current } = this.props;
            const newURL = convertToURL(tab.url, current);
            openTab2Right(newURL, tab.id);
        }
    };

    /**
     * このページはドキュメントかどうか
     * @returns {boolean}
     */
    isActive = () => {
        const { tab } = this.props;
        return (checkURL(tab.url) > 0);
    };

    /**
     * このページはお気に入りしているかどうか
     * @returns {boolean}
     */
    isFavorite = () => {
        const { favorites, tab } = this.props;
        const items = favorites.filter(function(favorite, idx) {
            return (favorite.url === tab.url);
        });
        return (items.length > 0);
    };

    /**
     * 一覧のHTMLを生成
     */
    items = () => {
        const { current, versions } = this.props;
        return versions.map((version, idx) => {
            return (
                <Button key={'btn-' + idx}
                        name={version.name} value={version.value} current={current}
                />
            );
        })
    };

    render() {
        const btnClass = classNames('btn', 'btn-default',
            {
                'hidden' : !this.isActive(),
            });
        const iconClass = classNames('icon',
            {
                'icon-star' : this.isFavorite(),
                'icon-star-empty' : !this.isFavorite(),
            });
        const items = this.items();
        return (
            <header className="toolbar toolbar-header">
                <div className="toolbar-actions">
                    <div className="btn-group">
                        {items}
                    </div>

                    <button className={btnClass} onClick={this.onOpenDocument}>
                        <span className="icon icon-book-open icon-text" />
                        日本語ドキュメントを開く
                    </button>

                    <button className="btn btn-default pull-right" onClick={this.onToggleFavorite}>
                        <span className={iconClass} />
                    </button>

                </div>
            </header>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        current: state.setting.current,
        versions: state.versions,
        favorites: state.favorites,
        tab: state.tab,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFavorite: (favorite) => dispatch(favorite_add(favorite)),
        removeFavorite: (url) => dispatch(favorite_remove(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
