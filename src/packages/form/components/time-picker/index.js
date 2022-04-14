import React from 'react'
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';
import {setDefaultWidth} from "@/packages/form/methods";
import {CONTROL_DEFAULT_WIDTH} from "@/packages/form/config";

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
  width: CONTROL_DEFAULT_WIDTH
}

export default function _TimePicker(props) {

  function onChange(time, timeString) {
    props.onChange && props.onChange(time)
  }

  const Com = props.type !== 'rangepicker' ? TimePicker : RangePicker

  return <div className={`${props.prefix_form_control_name}-time-picker`}>
    <Com
      {...props}
      style={{
        // 设置默认宽度
        minWidth: setDefaultWidth(props.width)
      }}
      value={props.value}
      onChange={onChange}
    />
  </div>
}
