import React, {useState} from 'react'
import {ReactSortable} from "react-sortablejs";
import _, { uniqueId } from 'lodash';
import './index.scss';
import { sourceData } from '../control';
import { Form } from 'antd';
import { Text, Input, InputNumber, Select, TimePicker, DatePicker, Cascader, TreeSelect, Switch, Slider, RadioGroup, Checkbox, CheckboxGroup, Rate } from '@/packages/form/components'

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
  rate: Rate
}

function DragFormLayout(props) {

  const [list, setList] = useState([]);

  const [form] = Form.useForm();

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

  const loop = (arr=[]) => arr.map((item, index) => {
    if (item.children) {
      return <ReactSortable
        className="loop-drag-items"
        animation={150}
        group={{ name: 'form-create', pull: true, put: true }}
        key={uniqueId('sortable_')}
        list={item.children}
        setList={(...args) => {
          const [_list, _sortable, _dragging] = args
          item.children = _list
        }}
        onAdd={sortableAdd}
        onUpdate={sortableUpdate}
      >
        {loop(item.children)}
      </ReactSortable>
    } else {
      const Com = Controls[item.type.toLowerCase()]
      if(Com) {
        return <Form.Item
          key={index}
          name={item.id}
          label={item.id}
        >
          <Com {...item.attr} />
        </Form.Item>
      } else {
        return <div key={index} />
      }
    }
  })

  const sortableAdd = (evt) => {
    console.log('Add', evt)
    // // 组件名或路径
    // const type = evt.clone.getAttribute('data-type');
    // // 拖拽元素的目标路径
    // const { newIndex } = evt;
    //
    // const newItem = _.cloneDeep(sourceData.find(item => (item.type === type)))
    // // 如果是容器
    // if(newItem.type.toLowerCase() === 'container') {
    //   newItem.children = []
    // }
    // console.log(type, newIndex, newItem )
  }

  const sortableUpdate = (evt) => {
    console.log('Update', evt)
  }

  return <div className="drag-form-layout">
    <Form
      className="drag-form"
      form={form}
      name="drag-form"
    >
      <ReactSortable
        className="drag-items"
        animation={150}
        fallbackOnBody={true}
        group={{name: "form-create"}}
        clone={item => ({ ...item, id: uniqueId('field_') })}
        list={list}
        setList={(...args) => {
          const [_list, _sortable, _dragging] = args
          console.log(11, _list, _sortable, _dragging)
          setList(_list)
        }}
        onAdd={sortableAdd}
        onUpdate={sortableUpdate}
      >
        {loop(list)}
      </ReactSortable>
    </Form>
  </div>
}

export default DragFormLayout
