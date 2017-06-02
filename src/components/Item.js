import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { favorite_remove } from './../actions/ActionCreator';
import { Type } from './../constants';
import { openTab, moveTabs2Right, removeTabs } from './../lib/chrome';
import noImage from './../images/noimage.png';

class Item extends Component {

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

        const { id, currentId } = this.props;
        this.state = {
            // アクティブ状態フラグ（開いているドキュメントのみ対応）
            isActive: (id === currentId),
            // 削除処理フラグ
            isDelete: false,
        }
    }

    onOpenFeed = () => {
        const { url } = this.props;
        if (url) {
            openTab(url);
        }
    };

    onMoveFeed = () => {
        const { id } = this.props;
        if (id) {
            moveTabs2Right(id);
        }
    };

    onCloseFeed = () => {
        const { id } = this.props;
        if (id) {
            removeTabs(id);
            this.setState({
                isDelete: true,
            });
        }
    };

    onDeleteFeed = () => {
        const { url, removeFavorite } = this.props;
        removeFavorite(url);
    };

    render() {
        const { url, title, favIconUrl, type } = this.props;
        const { isActive, isDelete } = this.state;
        const image = favIconUrl ? favIconUrl : noImage;
        const listActiveClass = (isActive) ? 'active' : '';
        const listHiddenClass = (isDelete) ? 'hidden' : '';
        const isFeedList = (type === Type.Tab);

        return (
            <li className={'list-group-item ' + listActiveClass + ' ' + listHiddenClass}>
                <span className="icon icon-cancel-circled pull-right close"
                      onClick={(isFeedList) ? this.onCloseFeed : this.onDeleteFeed} />
                <div onClick={(isFeedList) ? this.onMoveFeed : this.onOpenFeed}>
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
