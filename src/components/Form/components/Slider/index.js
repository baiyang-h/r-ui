import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

_Slider.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    onChange: PropTypes.func,
}

_Slider.defaultProps = {
    value: undefined,
}

export default function _Slider(props) {

    function onChange(value) {
        props.onChange && props.onChange(value)
    }

    return <div className={`${props.prefix_form_control_name}-slider`}>
        <Slider
            {...props}
            value={props.value}
            onChange={onChange}
        />
    </div>
}