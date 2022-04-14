import {useEffect, useState} from 'react'
import { ReactSortable } from "react-sortablejs";
import './index.scss'
import Sortable from "sortablejs";

const list = [
  { key: 'Text', name: '文本' },
  { key: 'Input', name: '输入框' },
  { key: 'InputNumber', name: '数字输入框' },
  { key: 'Select', name: '选择器' },
  { key: 'Radio', name: '单选框' },
  { key: 'Checkbox', name: '复选框' },
  { key: 'CheckboxGroup', name: '复选框组' },
  { key: 'Switch', name: '开关' },
  { key: 'TimePicker', name: '时间选择器' },
  { key: 'DatePicker', name: '日期选择器' },
  { key: 'Rate', name: '评分' },
  { key: 'Slider', name: '滑动输入条' },
  { key: 'TreeSelect', name: '树选择' },
  { key: 'Cascader', name: '级联选择' },
  { key: 'Upload', name: '上传' },
]

function Layout(props) {

  useEffect(() => {
    const el = document.getElementById('aaa');
    Sortable.create(el, {
      group: 'formCreate',
    });
  }, [])

  return <div className="form-create-layout">
    <div id="aaa">
      {list.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
    </div>
  </div>
}

export default Layout