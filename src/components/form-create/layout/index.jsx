import React, {useState} from 'react'
import {ReactSortable} from "react-sortablejs";
import _, { uniqueId } from 'lodash';
import './index.scss';
import { Form, Row, Col } from 'antd';
import { Text, Input, InputNumber, Select, TimePicker, DatePicker, Cascader, TreeSelect, Switch, Slider, RadioGroup, Checkbox, CheckboxGroup, Rate } from '@/packages/form/components'
import DragWrapper from "./components/DragWrapper"

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
  const [selected, setSelected] = useState(undefined)

  const [form] = Form.useForm();

  const sortableAdd = (evt) => {
    console.log('Add', evt)
  }

  const sortableUpdate = (evt) => {
    console.log('Update', evt)
  }

  const onDragWrapperClick = (item) => {
    setSelected(item.id)
  }

  // 容器拷贝
  const onDragWrapperCopy = (item, index) => {
    const _list = _.cloneDeep(list)
    _list.splice(index+1, 0, {...item, id: uniqueId('field_')})
    setList(_list)
  }

  // 容器删除
  const onDragWrapperDelete = (item, index) => {
    setList(list.filter(_item => _item.id !== item.id))
  }

  const loop = (arr=[], level='') => arr.map((item, index) => {
    // 层级 例：0-1  1-1-1
    level = level ? index : `${level}-${index}`

    let RenderCom
    if(item.type === 'container') {  // 如果类型是容器
      RenderCom = <ReactSortable
        className="loop-drag-items"
        animation={150}
        handle=".wrap-form-item--drag-icon"
        group={{ name: 'form-create', pull: true, put: true }}
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
    } else if(item.type === 'grid') {  // 如果类型是栅格
      RenderCom = <Row
        className="grid-form-item-row"
      >
        {
          item.children.map((col, _index) => <Col
            key={_index}
            className="grid-form-item-col"
            span={24/item.children.length}
          >
            1111
          </Col>)
        }
      </Row>
    } else { // 其他类型
      const Com = Controls[item.type.toLowerCase()]
      RenderCom = Com ? <Form.Item
        name={item.id}
        label={item.id}
      >
        <Com {...item.attr} />
      </Form.Item> : <div />
    }



    return <DragWrapper
      key={level}
      data-level={level}
      selected={selected === item.id}
      onClick={() => onDragWrapperClick(item, index)}
      onCopy={() => onDragWrapperCopy(item, index)}
      onDelete={() => onDragWrapperDelete(item, index)}
    >
      { RenderCom }
    </DragWrapper>
  })

  return <div className="drag-form-layout">
    <Form
      className="drag-form"
      form={form}
      name="drag-form"
    >
      <ReactSortable
        className="drag-items"
        animation={150}
        handle=".wrap-form-item--drag-icon"
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
