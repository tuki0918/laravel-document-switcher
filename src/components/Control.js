import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { data_setup, favorite_add, favorite_remove } from './../actions/ActionCreator';
import { checkURL, convertToURL } from './../lib/link';
import { openTab2Right } from './../lib/chrome';
import Button from './Button';

class Control extends Component {

    static propTypes = {
        current: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        currentTabId: PropTypes.number.isRequired,
        currentTabUrl: PropTypes.string.isRequired,
        versions: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })).isRequired,

        setup: PropTypes.func.isRequired,
        addFavorite: PropTypes.func.isRequired,
        removeFavorite: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        const { currentTabUrl } = this.props;
        this.state = {
            isActive: (checkURL(currentTabUrl) > 0)
        }
    }

    componentDidMount() {
        this.props.setup();
    }

    onToggleFavorite = () => {
        const { isFavorite, currentTabUrl } = this.props;
        const { addFavorite, removeFavorite } = this.props;
        if (isFavorite) {
            addFavorite();
        } else {
            removeFavorite(currentTabUrl);
        }
    };

    onOpenDocument = () => {
        const { current, currentTabId, currentTabUrl } = this.props;
        if (this.state.isActive) {
            const newURL = convertToURL(currentTabUrl, current);
            openTab2Right(newURL, currentTabId);
        }
    };

    render() {
        const { current, versions, isFavorite } = this.props;
        const btnClass = (this.state.isActive) ? 'active' : '';
        const iconClass = (isFavorite) ? 'icon-star' : 'icon-star-empty';
        return (
            <header className="toolbar toolbar-header">
                <div className="toolbar-actions">
                    <div className="btn-group">
                        {
                            versions.map(function(version, idx) {
                                return (
                                    <Button key={'btn-' + idx}
                                            name={version.name} value={version.value} current={current}
                                    />
                                );
                            })
                        }
                    </div>

                    <button className={'btn btn-default ' + btnClass} onClick={this.onOpenDocument}>
                        <span className="icon icon-book-open icon-text" />
                        日本語ドキュメントへ
                    </button>

                    <button className="btn btn-default pull-right" onClick={this.onToggleFavorite}>
                        <span className={'icon ' + iconClass} />
                    </button>

                </div>
            </header>
        );
    }
}


const mapStateToProps = (state) => {
    console.log('===Console===', state, '<<< redux');
    return {
        current: state.setting.current,
        isFavorite: state.isFavorite || false,
        currentTabId: state.setting.currentTabId || 0,
        currentTabUrl: state.setting.currentTabUrl || '',
        versions: state.setting.versions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setup: () => dispatch(data_setup()),
        addFavorite: () => dispatch(favorite_add()),
        removeFavorite: (url) => dispatch(favorite_remove(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Control);
