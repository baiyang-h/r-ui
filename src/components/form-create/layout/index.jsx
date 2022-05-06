import React, {useState, useImperativeHandle} from 'react'
import {ReactSortable} from "react-sortablejs";
import _, { uniqueId } from 'lodash';
import './index.scss';
import { Form, Row, Col } from 'antd';
import { Text, Input, InputNumber, Select, TimePicker, DatePicker, Cascader, TreeSelect, Switch, Slider, RadioGroup, Checkbox, CheckboxGroup, Rate } from '@/packages/form/components'
import DragWrapper from "./components/DragWrapper"
import { sourceData } from '../control/index'

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

const Drag = {
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
  remove(list, level, oldIndex) {
    const levelList = level.split('-')
    let len = levelList.length
    if(len>1) { // 嵌套删除
      let index = 0
      let children = list
      while (len-index>1) {
        children = children[levelList[index]].children
        index++
      }
      const removeRow = children[oldIndex]
      // 为了让删除后数组不塌陷，所以补充一个null做支撑，最后全都处理完后，将其过滤
      children.splice(oldIndex, 1)
      return removeRow
    } else { // 根部删除
      const removeRow = list[oldIndex]
      list.splice(oldIndex, 1)
      return removeRow
    }
  }
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

function DragFormLayout(props, ref) {

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
    const row = sourceData.find(item => item.type === type)

    // 拖拽到的位置索引
    const newIndex = evt.newIndex
    const oldIndex = evt.oldIndex
    // 添加，1.从表单控件拖拽添加。 2.从已有的嵌套内部拖动添加
    const to = evt.to
    const clone = evt.clone
    const from = evt.from
    const oldLevel = clone.getAttribute('data-level')
    const wrapperParentNode = to.parentNode
    // 因为在每个 drag-wrapper 上定义了一个data-level属性，level就是相应的层级信息
    const newField = wrapperParentNode.getAttribute('data-field')
    if(to.className === 'drag-items') {  // 添加到根
      if(from.id === 'control-items') { // 左侧控件拖拽而来
        Drag.add(_list, null, newIndex, {...row, id: uniqueId('field_')}, true)
        setList(_list)
      } else { // 已存在的表单移动（先移除再添加）
        const oldRow = Drag.remove(_list, oldLevel, oldIndex)
        Drag.add(_list, null, newIndex, oldRow, true)
        Promise.resolve().then(()=> {
          setList(_list)
        })
      }
    } else if(to.className === 'loop-drag-items') { // 添加到嵌套容器
      // 此处需判断是从左侧控件处拖拽而来，还是从已有的拖拽表单处拖拽而来
      if(from.id === 'control-items') {  // 左侧控件拖拽而来
        Drag.add(_list, newField, newIndex, {...row, id: uniqueId('field_')})
        setList(_list)
      } else {  // 已存在的表单移动（先移除再添加）
        const oldRow = Drag.remove(_list, oldLevel, oldIndex)
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
    if(to.className === 'drag-items') { // 如果是在根部移动的
      const oldItem = _list[oldIndex]
      _list.splice(oldIndex, 1)
      _list.splice(newIndex, 0, oldItem)
      setList(_list)
    } else if(to.className === 'loop-drag-items') {  // 如果在容器内部移动的

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
        className="loop-drag-items"
        animation={150}
        handle=".drag-wrapper--drag-icon"
        group={{ name: 'form-create', pull: true, put: true }}
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
      const Com = Controls[item.type.toLowerCase()]
      RenderCom = Com ? <Form.Item
        name={item.id}
        label={item.id}
      >
        <Com {...item.attr} />
      </Form.Item> : <div />
    }

    return <DragWrapper
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
        handle=".drag-wrapper--drag-icon"
        group={{name: "form-create"}}
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

export default React.forwardRef(DragFormLayout)
