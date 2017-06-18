import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { change_version } from './../actions/ActionCreator';

export class Button extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        current: PropTypes.string.isRequired,

        onChange: PropTypes.func.isRequired,
    };

    /**
     * 選択中のボタンかどうか
     * @returns {boolean}
     */
    isActive = () => {
        const { value, current } = this.props;
        return (value === current);
    };

    /**
     * 変更通知を投げる
     * @param e
     */
    onClick = (e) => {
        const version = e.target.value;
        this.props.onChange(version);
    };

    render() {
        const { name, value } = this.props;
        const btnClass = classNames('btn', 'btn-default',
            {
                'active' : this.isActive(),
            });
        return (
            <button className={btnClass}
                    value={value}
                    onClick={this.onClick}>
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
        onChange: (version) => dispatch(change_version(version)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
