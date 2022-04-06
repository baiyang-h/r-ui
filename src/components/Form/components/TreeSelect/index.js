import React from 'react'
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import {setDefaultWidth} from "../../methods";
import {CONTROL_DEFAULT_WIDTH} from "../../config";

_TreeSelect.propTypes = {
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
  treeData: PropTypes.array,
  onChange: PropTypes.func,
}

_TreeSelect.defaultProps = {
  placeholder: '请选择内容',
  treeData: [],
  allowClear: true,
  width: CONTROL_DEFAULT_WIDTH
}

export default function _TreeSelect(props) {

  function onChange(value) {
    props.onChange && props.onChange(value)
  }

  return <div className={`${props.prefix_form_control_name}-tree-select`}>
    <TreeSelect
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={props.treeData}
      treeDefaultExpandAll
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