import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

_Checkbox.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    value: PropTypes.bool,
    onChange: PropTypes.func,
}

_Checkbox.defaultProps = {
    value: false,
}

export default function _Checkbox(props) {

    function onChange(e) {
        props.onChange && props.onChange(e.target.checked);
    }

    return <div className={`${props.prefix_form_control_name}-checkbox`}>
        <Checkbox
            {...props}
            checked={props.value}
            onChange={onChange}
        />
    </div>
}


