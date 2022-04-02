import React from 'react'
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

_DatePicker.propTypes = {
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  onChange: PropTypes.func,
  type: PropTypes.string
}

_DatePicker.defaultProps = {
  placeholder: '请选择日期'
}

export default function _DatePicker(props) {

  function onChange(time, timeString) {
    props.onChange && props.onChange(time)
  }

  const Com = props.type !== 'rangepicker' ? DatePicker : RangePicker

  return <div className={`${props.prefix_form_control_name}-date-picker`}>
    <Com 
      {...props}
      value={props.value}
      onChange={onChange}
    />
  </div>
}