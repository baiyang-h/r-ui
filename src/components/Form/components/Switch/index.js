import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';

_Switch.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    value: PropTypes.bool,
    onChange: PropTypes.func,
}

_Switch.defaultProps = {
    value: false,
}

export default function _Switch(props) {

    function onChange(checked) {
        props.onChange && props.onChange(checked)
    }

    return <div className={`${props.prefix_form_control_name}-switch`}>
        <Switch
            {...props}
            checked={props.value}
            onChange={onChange}
        />
    </div>
}