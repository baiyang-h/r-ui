import React from 'react'
import PropTypes from 'prop-types';
import { Cascader } from 'antd';
import {setDefaultWidth} from "@/components/Form/methods";
import { CONTROL_DEFAULT_WIDTH } from '@/components/Form/config'

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
  allowClear: true,
  width: CONTROL_DEFAULT_WIDTH
}

export default function _Cascader(props) {

  function onChange(value) {
    props.onChange && props.onChange(value)
  }

  return <div className={`${props.prefix_form_control_name}-cascader`}>
    <Cascader
        {...props}
        style={{
          // 设置默认宽度
          minWidth: setDefaultWidth(props.width)
        }}
        options={props.options}
        onChange={onChange}
    />
  </div>
}
