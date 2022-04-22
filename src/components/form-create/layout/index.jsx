import React, {useEffect, useState} from 'react'
import {ReactSortable} from "react-sortablejs";
import _, { uniqueId } from 'lodash';
import './index.scss';
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

  // useEffect(() => {
  //   console.log(list, 'stated');
  // }, [list])

  const loop = (arr=[]) => arr.map((item, index) => {
    if (item.children) {
      return <ReactSortable
        className="loop-drag-items"
        animation={150}
        group={{ name: 'form-create', pull: true, put: true }}
        key={item.id}
        list={item.children}
        setList={(...args) => {
          const _list = _.cloneDeep(args[0])
          _list.forEach(item => {
            if(!item.id) {
              item.id = uniqueId('field_')
            }
          })
          item.children = _list
          setList(_.cloneDeep(list))
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
        group={{name: "form-create"}}
        list={list}
        setList={(...args) => {
          const _list = _.cloneDeep(args[0])
          _list.forEach(item => {
            if(!item.id) {
              item.id = uniqueId('field_')
            }
          })
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
