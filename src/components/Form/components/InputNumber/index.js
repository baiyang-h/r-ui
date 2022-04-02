import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

_InputNumber.propTypes = {
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

_InputNumber.defaultProps = {
    value: undefined,
}

export default function _InputNumber(props) {

    function onChange(value) {
        props.onChange && props.onChange(value)
    }

    return <div className={`${props.prefix_form_control_name}-input-number`}>
        <InputNumber
            {...props}
            onChange={onChange}
            value={props.value}
        />
    </div>
}


