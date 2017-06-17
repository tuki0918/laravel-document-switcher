import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { favorite_remove } from './../actions/ActionCreator';
import { Type } from './../constants';
import { openTab, moveTabs2Right, removeTabs } from './../lib/chrome';
import noImage from './../images/noimage.png';

export class Item extends Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        favIconUrl: PropTypes.string.isRequired,
        currentId: PropTypes.any.isRequired,
        type: PropTypes.number.isRequired,

        removeFavorite: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            // 削除処理フラグ
            isDelete: false,
        }
    }

    /**
     * タブフィードフラグ
     * @returns {boolean}
     */
    isTabFeedList = () => {
        const { type } = this.props;
        return (type === Type.Tab);
    };

    /**
     * アクティブ状態フラグ（開いているドキュメントのみ対応）
     * @returns {boolean}
     */
    isActive = () => {
        const { id, currentId } = this.props;
        return (id === currentId);
    };

    /**
     * 記事を新しいタブで開く
     */
    openFeed = () => {
        const { url } = this.props;
        if (url) {
            openTab(url);
        }
    };

    /**
     * 開いているタブを現在のタブの右に移動してアクティブにする
     */
    moveFeed = () => {
        const { id } = this.props;
        if (id) {
            moveTabs2Right(id);
        }
    };

    /**
     * 記事をブラウザから閉じる
     */
    closeFeed = () => {
        const { id } = this.props;
        if (id) {
            removeTabs(id);
            this.setState({
                isDelete: true,
            });
        }
    };

    /**
     * 記事をお気に入りから削除する
     */
    deleteFeed = () => {
        const { url, removeFavorite } = this.props;
        removeFavorite(url);
    };

    /**
     * クローズボタンのアクション
     * @returns {function()}
     */
    onClickButton = () => {
        return this.isTabFeedList() ? this.closeFeed : this.deleteFeed;
    };

    /**
     * フィードのアクション
     * @returns {function()}
     */
    onClickFeed = () => {
        return this.isTabFeedList() ? this.moveFeed : this.openFeed;
    };

    render() {
        const { url, title, favIconUrl } = this.props;
        const { isDelete } = this.state;
        const listActiveClass = (this.isActive()) ? 'active' : '';
        const listHiddenClass = (isDelete) ? 'hidden' : '';
        const image = favIconUrl ? favIconUrl : noImage;

        return (
            <li className={'list-group-item ' + listActiveClass + ' ' + listHiddenClass}>
                <span className="icon icon-cancel-circled pull-right close"
                      onClick={this.onClickButton} />
                <div onClick={this.onClickFeed}>
                    <img className="img-circle media-object pull-left"
                         src={image} alt="thumbnail" width="32" height="32" />
                    <div className="media-body">
                        <strong>{title}</strong>
                        <p className="url">{url}</p>
                    </div>
                </div>
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeFavorite: (url) => dispatch(favorite_remove(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
