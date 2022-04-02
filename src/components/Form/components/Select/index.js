import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

_Select.propTypes = {
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  options: PropTypes.array,
  onChange: PropTypes.func,
}

_Select.defaultProps = {
  allowClear: true,
  disabled: false,
  readOnly: false,
  value: undefined,
  placeholder: '请选择内容',
  options: [],
}

export default function _Select(props) {

  function onChange(value) {
    props.onChange && props.onChange(value)
  }

  return <div className={`${props.prefix_form_control_name}-select`}>
    <Select 
      {...props}
      value={props.value}
      onChange={onChange}
    >
      {
        props.options.map(option => <Option key={option.value} {...option} />)
      }
    </Select>
  </div>
}
