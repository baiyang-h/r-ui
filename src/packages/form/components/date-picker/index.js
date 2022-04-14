import React from 'react'
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import {setDefaultWidth} from "@/packages/form/methods";
import {CONTROL_DEFAULT_WIDTH} from "@/packages/form/config";

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
  width: CONTROL_DEFAULT_WIDTH
}

export default function _DatePicker(props) {

  function onChange(time, timeString) {
    props.onChange && props.onChange(time)
  }

  const Com = props.type !== 'rangepicker' ? DatePicker : RangePicker

  return <div className={`${props.prefix_form_control_name}-date-picker`}>
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
