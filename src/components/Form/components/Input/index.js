import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import {setDefaultWidth} from "@/components/Form/methods";
import {CONTROL_DEFAULT_WIDTH} from "@/components/Form/config";

_Input.propTypes = {
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
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

_Input.defaultProps = {
  prefix: '',
  allowClear: true,
  disabled: false,
  readOnly: false,
  maxLength: 9999999999999999,
  value: '',
  placeholder: '请输入内容',
  width: CONTROL_DEFAULT_WIDTH
}

export default function _Input(props) {

  function onChange(e) {
    let v = e.target.value
    let reg = props.reg

    // 是否自定义了属性， 对于定义了正则的情况
    if(reg) {

    }

    props.onChange && props.onChange(v)
  }

  return <div className={`${props.prefix_form_control_name}-input`}>
    <Input
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
