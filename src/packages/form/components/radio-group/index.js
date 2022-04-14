import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

_RadioGroup.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
}

_RadioGroup.defaultProps = {
    value: undefined,
    options: []
}

export default function _RadioGroup(props) {

    function onChange(value) {
        props.onChange && props.onChange(value)
    }

    return <div className={`${props.prefix_form_control_name}-radio-group`}>
        <Radio.Group
            {...props}
            onChange={onChange}
            value={props.value}
        >
            {
                props.options.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)
            }
        </Radio.Group>
    </div>
}