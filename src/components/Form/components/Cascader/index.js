import React from 'react'
import PropTypes from 'prop-types';
import { Cascader } from 'antd';

_Cascader.propTypes = {
  placeholder: PropTypes.string,
  allowClear: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  options: PropTypes.array,
  onChange: PropTypes.func,
}

_Cascader.defaultProps = {
  placeholder: '请选择内容',
  options: [],
  allowClear: true
}

export default function _Cascader(props) {

  function onChange(value) {
    props.onChange && props.onChange(value)
  }

  return <div className={`${props.prefix_form_control_name}-cascader`}>
    <Cascader
        {...props}
        options={props.options}
        onChange={onChange}
    />
  </div>
}