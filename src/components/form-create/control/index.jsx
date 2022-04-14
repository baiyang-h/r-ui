import { ReactSortable } from "react-sortablejs";
import Sortable from 'sortablejs';
import './index.scss'
import { useEffect } from "react";

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

function Controls(props) {

  useEffect(() => {
    const el = document.getElementById('items');
    Sortable.create(el, {
      group: {
        name: 'formCreate',
        pull: 'clone',
        put: false
      },
      sort: false
    });
  }, [])

  return <div className="form-create-controls">
    <div id="items">
      {
        list.map((item) => <div key={item.key} className="item">{ item.name }</div>)
      }
    </div>
  </div>
}

export default Controls