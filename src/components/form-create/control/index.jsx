import { ReactSortable } from "react-sortablejs";
import './index.scss'
import {useState} from "react";

export const sourceData = [
  { key: 'Text', name: '文本', attr: {} },
  { key: 'Input', name: '输入框', attr: {} },
  { key: 'InputNumber', name: '数字输入框', attr: {} },
  { key: 'Select', name: '选择器', attr: {} },
  { key: 'Radio', name: '单选框', attr: {} },
  { key: 'Checkbox', name: '复选框', attr: {} },
  { key: 'CheckboxGroup', name: '复选框组', attr: {} },
  { key: 'Switch', name: '开关', attr: {} },
  { key: 'TimePicker', name: '时间选择器', attr: {} },
  { key: 'DatePicker', name: '日期选择器', attr: {} },
  { key: 'Rate', name: '评分', attr: {} },
  { key: 'Slider', name: '滑动输入条', attr: {} },
  { key: 'TreeSelect', name: '树选择', attr: {} },
  { key: 'Cascader', name: '级联选择', attr: {} },
  { key: 'Upload', name: '上传', attr: {} },
  { key: 'Container', name: '容器', attr: { border:'1px solid red' } },
]

function FormControls() {

  const [list, setList] = useState(sourceData);

  return <div className="form-create-controls">
    <ReactSortable
      id="control-items"
      list={list}
      setList={setList}
      animation={150}
      group={{ name: "form-create", pull: "clone", put: false }}
      sort={false}
    >
      {list.map(item => (
        <div
          key={item.key}
          className="item"
          data-type={item.key}
        >
          { item.name }
        </div>
      ))}
    </ReactSortable>
  </div>
}

export default FormControls
