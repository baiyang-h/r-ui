import React, {useState, useImperativeHandle} from 'react'
import {ReactSortable} from "react-sortablejs";
import _, { uniqueId } from 'lodash';
import './index.scss';
import { Form, Row, Col } from 'antd';
import { Text, Input, InputNumber, Select, TimePicker, DatePicker, Cascader, TreeSelect, Switch, Slider, RadioGroup, Checkbox, CheckboxGroup, Rate } from '@/packages/form/components'
import DraggableWrapper from "./components/DraggableWrapper"
import { widgets } from '@/components/form-designer/widget-panel'

const Widget = {
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

const getParentChildren = (list, field) => {
  let parentList = list
  const loop = (children) => {
    for(let child of children) {
      if(child.id === field) {
        parentList = children
        return true
      }
      if(child.children && child.children.length) {
        const f = loop(child.children)
        if(f) {
          return true
        }
      }
    }
  }
  loop(list)
  return parentList
}

const Drag = {
  /**
   * 添加方法
   * @param list      传入的整个数据
   * @param newField  要添加到的容器的 field， 如果是添加到根部，则不需要field，可以写任何值，可写null
   * @param newIndex  添加到新位置的索引
   * @param dic       添加控件的信息
   * @param root      是否是根部，true是，false不是
   */
  add(list, newField, newIndex, dic, root=false) {
    if(root) { // 根部
      list.splice(newIndex, 0, dic)
    } else { // 嵌套
      const loop = (children) => {
        for(let child of children) {
          if(child.id === newField) {
            return child.children.splice(newIndex, 0, dic)
          }
          if(child.children) {
            loop(child.children)
          }
        }
      }
      loop(list)
    }
  },
  remove(list, oldField) {
    const children = getParentChildren(list, oldField)
    const index = children.findIndex(child => child.id === oldField)
    const row = children.splice(index, 1)
    return row[0]
  }
}

function FormWidget(props, ref) {

  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(undefined)

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    // 清空
    clear: () => {
      setList([])
    }
  }));

  // 添加
  function sortableAdd(evt) {
    console.log('Add', evt)
    const _list = _.cloneDeep(list)
    // 获取控件类型信息
    const type = evt.clone.getAttribute('data-type')
    const row = widgets.find(item => item.type === type)

    // 拖拽时的位置索引
    const newIndex = evt.newIndex
    const oldIndex = evt.oldIndex
    // 添加，1.从表单控件拖拽添加。 2.从已有的嵌套内部拖动添加
    const to = evt.to
    const clone = evt.clone
    const from = evt.from
    const oldLevel = clone.getAttribute('data-level')
    if(to.className === 'widget-draggable') {  // 添加到根
      if(from.id === 'widget-panel-container') { // 左侧控件拖拽而来
        Drag.add(_list, null, newIndex, {...row, id: uniqueId('field_')}, true)
        setList(_list)
      } else { // 已存在的表单移动（先移除再添加）
        const oldField = clone.getAttribute('data-field')
        const oldRow = Drag.remove(_list, oldField)
        Drag.add(_list, null, newIndex, oldRow, true)
        Promise.resolve().then(()=> {
          setList(_list)
        })
      }
    } else if(to.className === 'loop-widget-draggable') { // 添加到嵌套容器
      const wrapperParentNode = to.parentNode
      const newField = wrapperParentNode.getAttribute('data-field')
      // 此处需判断是从左侧控件处拖拽而来，还是从已有的拖拽表单处拖拽而来
      if(from.id === 'widget-panel-container') {  // 左侧控件拖拽而来
        Drag.add(_list, newField, newIndex, {...row, id: uniqueId('field_')})
        setList(_list)
      } else {  // 已存在的表单移动（先移除再添加）
        const oldField = clone.getAttribute('data-field')
        const oldRow = Drag.remove(_list, oldField)
        Drag.add(_list, newField, newIndex, oldRow)
        Promise.resolve().then(()=> {
          setList(_list)
        })
      }
    }
  }

  // 移动
  function sortableUpdate(evt) {
    console.log('Update', evt)
    const _list = _.cloneDeep(list)
    const to = evt.to
    const newIndex = evt.newIndex
    const oldIndex = evt.oldIndex
    if(to.className === 'widget-draggable') { // 如果是在根部移动的
      const oldItem = _list[oldIndex]
      _list.splice(oldIndex, 1)
      _list.splice(newIndex, 0, oldItem)
      setList(_list)
    } else if(to.className === 'loop-widget-draggable') {  // 如果在容器内部移动的

    }
  }

  function onDragWrapperClick(item) {
    setSelected(item.id)
  }

  // 容器拷贝（无关数据）
  function onDragWrapperAdd(item, index) {
    const _list = _.cloneDeep(list)
    const children = getParentChildren(_list, item.id)
    // 因为是要拷贝一份，我们就需要对item进行初始化，回到最初始值，并且像id这种key应该是一个新得唯一值
    const _item = _.cloneDeep(item)
    _item.id = uniqueId('field_')
    if(_item.children) {
      const loop = (children) => {
        children.forEach(child => {
          child.id = uniqueId('field_')
          if(child.children) {
            loop(child.children)
          }
        })
      }
      loop(_item.children)
    }
    children.splice(index+1, 0, _item)
    setList(_list)
  }

  // 容器拷贝（包括数据）
  function onDragWrapperCopy(item, index) {
    const _list = _.cloneDeep(list)
    _list.splice(index+1, 0, {...item, id: uniqueId('field_')})
    setList(_list)
  }

  // 容器删除
  function onDragWrapperDelete(item, index) {
    const _list = _.cloneDeep(list)
    const children = getParentChildren(_list, item.id)
    children.splice(index, 1)
    setList(_list)
  }

  const loop = (arr=[], level='') => arr.map((item, index) => {
    // 层级 例：0-1  1-1-1
    let _level = level==='' ? index + '' : `${level}-${index}`

    let RenderCom
    if(item.type === 'container') {  // 如果类型是容器
      RenderCom = <ReactSortable
        className="loop-widget-draggable"
        animation={150}
        handle=".draggable-wrapper-icon"
        group={{ name: 'form-designer', pull: true, put: true }}
        list={item.children}
        setList={()=>{}}
        onAdd={sortableAdd}
        onUpdate={sortableUpdate}
      >
        {loop(item.children, _level)}
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
      const Com = Widget[item.type.toLowerCase()]
      RenderCom = Com ? <Form.Item
        name={item.id}
        label={item.id}
      >
        <Com {...item.attr} />
      </Form.Item> : <div />
    }

    return <DraggableWrapper
      key={_level}
      level={_level}
      field={item.id}
      selected={selected === item.id}
      onClick={() => onDragWrapperClick(item, index)}
      onAdd={() => onDragWrapperAdd(item, index)}
      onCopy={() => onDragWrapperCopy(item, index)}
      onDelete={() => onDragWrapperDelete(item, index)}
    >
      { RenderCom }
    </DraggableWrapper>
  })

  return <div className="form-widget">
    <Form
      className="form-widget-form"
      form={form}
      name="form-widget-form"
    >
      <ReactSortable
        className="widget-draggable"
        animation={150}
        handle=".draggable-wrapper-icon"
        group={{name: "form-designer"}}
        list={list}
        setList={() => {}}
        onAdd={sortableAdd}
        onUpdate={sortableUpdate}
      >
        {loop(list)}
      </ReactSortable>
    </Form>
  </div>
}

export default React.forwardRef(FormWidget)
