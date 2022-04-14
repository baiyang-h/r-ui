import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

_CheckboxGroup.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    options: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func,
}

_CheckboxGroup.defaultProps = {
    value: [],
    options: []
}

export default function _CheckboxGroup(props) {

    function onChange(value) {
        props.onChange && props.onChange(value)
    }

    return <div className={`${props.prefix_form_control_name}-checkbox-group`}>
        <Checkbox.Group
            {...props}
            options={props.options}
            value={props.value}
            onChange={onChange}
        />
    </div>
}