import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { change_version } from './../actions/ActionCreator';

class Button extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        current: PropTypes.string.isRequired,
    };

    /**
     * 選択中のボタンかどうか
     * @returns {boolean}
     */
    isActive = () => {
        const { value, current } = this.props;
        return (value === current);
    };

    render() {
        const { name, value, onChange } = this.props;
        const btnClass = this.isActive() ? 'active' : '';
        return (
            <button className={'btn btn-default ' + btnClass}
                    value={value}
                    onClick={onChange}>
                {name}
            </button>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch(change_version(e.target.value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
