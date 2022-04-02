import React from 'react'
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';

const { RangePicker } = TimePicker;

_TimePicker.propTypes = {
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
  type: PropTypes.string,
  onChange: PropTypes.func,
}

_TimePicker.defaultProps = {
  placeholder: '请选择时间',
}

export default function _TimePicker(props) {

  function onChange(time, timeString) {
    props.onChange && props.onChange(time)
  }

  const Com = props.type !== 'rangepicker' ? TimePicker : RangePicker

  return <div className={`${props.prefix_form_control_name}-time-picker`}>
    <Com
      {...props}
      value={props.value}
      onChange={onChange} 
    />
  </div>
}