import {useState} from 'react'
import {ReactSortable} from "react-sortablejs";
import _, { uniqueId } from 'lodash';
import './index.scss'
import { sourceData } from '../control'
import { Text, Input, InputNumber, Select, TimePicker, DatePicker, Cascader, TreeSelect, Switch, Slider, RadioGroup, Checkbox, CheckboxGroup } from '@/packages/form/components'

const Controls = {
  text: Text,
  input: Input,
  number: InputNumber,
  select: Select,
  time: TimePicker,
  date: DatePicker,
  cascader: Cascader,
  treeselect: TreeSelect,
  switch: Switch,
  slider: Slider,
  radiogroup: RadioGroup,
  checkbox: Checkbox,
  checkboxgroup: CheckboxGroup,
}

function FormDragLayout(props) {

  const [list, setList] = useState([]);

  // const sortableOption = {
  //   animation: 150,
  //   fallbackOnBody: true,
  //   swapThreshold: 0.65,
  //   group: {
  //     name: 'form-create',
  //     pull: true,
  //     put: true,
  //   },
  // }

  const loop = (arr) => arr.map((item, index) => {

    if (item.children) {
      return <ReactSortable
        style={{
          minHeight: 100,
          margin: 10,
        }}
        animation={150}
        group={{name: "form-create"}}
        list={item.children}
        setList={setList}
        onAdd={sortableAdd}
        onUpdate={sortableUpdate}
      >
        {loop(item.children)}
      </ReactSortable>
    } else {
      console.log(11, item)
      const Com = Controls[item.type.toLowerCase()]
      return <div key={index}><Com {...item.attr} /></div>
    }
  })

  const sortableAdd = (evt) => {
    console.log('Add', evt)
    // 组件名或路径
    const type = evt.clone.getAttribute('data-type');
    // 拖拽元素的目标路径
    const { newIndex } = evt;

    const newItem = _.cloneDeep(sourceData.find(item => (item.type === type)))

    // 如果是容器
    if(newItem.type === 'Container') {
      newItem.children = []
    }
    console.log(type, newIndex, newItem )
  }

  const sortableUpdate = (evt) => {
    console.log('Update', evt)
  }

  return <div className="form-create-layout">
    <ReactSortable
      className="drag-items"
      animation={150}
      group={{name: "form-create"}}
      clone={item => ({ ...item, id: uniqueId() })}
      list={list}
      setList={setList}
      onAdd={sortableAdd}
      onUpdate={sortableUpdate}
    >
      {loop(list)}
    </ReactSortable>
  </div>
}

export default FormDragLayout
