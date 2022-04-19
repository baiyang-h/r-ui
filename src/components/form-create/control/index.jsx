import { ReactSortable } from "react-sortablejs";
import './index.scss'
import {useState} from "react";

export const sourceData = [
  { type: 'text', name: '文本', attr: {} },
  { type: 'input', name: '输入框', attr: {} },
  { type: 'number', name: '数字输入框', attr: {} },
  { type: 'select', name: '选择器', attr: {} },
  { type: 'radiogroup', name: '单选框', attr: {} },
  { type: 'checkbox', name: '复选框', attr: {} },
  { type: 'checkboxgroup', name: '复选框组', attr: {} },
  { type: 'switch', name: '开关', attr: {} },
  { type: 'time', name: '时间选择器', attr: {} },
  { type: 'date', name: '日期选择器', attr: {} },
  { type: 'Rate', name: '评分', attr: {} },
  { type: 'slider', name: '滑动输入条', attr: {} },
  { type: 'treeselect', name: '树选择', attr: {} },
  { type: 'cascader', name: '级联选择', attr: {} },
  { type: 'Upload', name: '上传', attr: {} },
  { type: 'Container', name: '容器', attr: { border:'1px solid red' } },
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
          key={item.type}
          className="item"
          data-type={item.type}
        >
          { item.name }
        </div>
      ))}
    </ReactSortable>
  </div>
}

export default FormControls
