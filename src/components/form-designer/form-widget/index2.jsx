import React, {useState, useImperativeHandle} from 'react'
import {ReactSortable} from "react-sortablejs";
import _, { uniqueId } from 'lodash';
import './index.scss';
import { Form, Row, Col } from 'antd';
import { Text, Input, InputNumber, Select, TimePicker, DatePicker, Cascader, TreeSelect, Switch, Slider, RadioGroup, Checkbox, CheckboxGroup, Rate } from '@/packages/form/components'
import DraggableWrapper from "./components/DraggableWrapper"
import { widgets } from '@/components/form-designer/widget-panel'
import {getCloneItem, isPath, itemAdd, indexToArray, itemRemove} from '../utils'

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
    // 两种情况，1. 左侧控件（拖拽新增）， 2. 已经存在的控件移动
    const clone = evt.clone

    // 组件层级, 1. 如果null 则表示左侧控件新增， 2. 有层级就是已经存在的控件进行移动
    const path = evt.clone.getAttribute('data-path');
    // 父节点层级
    const parentPath = evt.path[1].getAttribute('data-path');

    // 拖拽时的位置索引
    const newIndex = evt.newIndex
    // 新路径 为根节点时直接使用index
    const newPath = parentPath ? `${parentPath}-${newIndex}` : newIndex;
    // 判断是否为路径 true表示已有控件执行移动，false表示左侧拖拽新增
    if(isPath(path)) {
      // 旧的路径index
      const oldPath = path;
      // 获取克隆要移动的元素的信息
      const cloneRow = getCloneItem(list, oldPath)
      // 比较路径的上下位置 先执行靠下的数据 再执行考上数据, 这里两个数组做对比，他会根据数组的第一个索引值进行大小比较  [1, 2]  [4, 2, 1]   后者4>1 表示后者在下
      if(indexToArray(oldPath) > indexToArray(newPath)) {
        // 先删除再新增
        // 删除元素 获得新数据
        let _list = itemRemove(list, oldPath);
        // 添加拖拽元素
        _list = itemAdd(_list, newPath, cloneRow)
        // 更新视图
        return Promise.resolve().then(() =>{
          setList(_.cloneDeep(_list))
        })
      } else {
        // 此处是先新增再删除
        // 添加拖拽元素
        let _list = itemAdd(list, newPath, cloneRow)
        // 删除元素 获得新数据
        _list = itemRemove(_list, oldPath);
        // 更新视图
        return Promise.resolve().then(() =>{
          setList(_.cloneDeep(_list))
        })
      }
    } else {
      // 新增流程 创建元素 => 插入元素 => 更新视图
      // 获取控件类型信息
      const type = clone.getAttribute('data-type')
      const row = _.cloneDeep(widgets.find(item => item.type === type))
      // 为容器时增加子元素
      if(row.type === 'container') {
        row.children = []
      }
      const _list = itemAdd(list, newPath, row)
      Promise.resolve().then(() =>{
        setList(_.cloneDeep(_list))
      })
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

  const loop = (arr=[], path='') => arr.map((item, index) => {
    // 层级 例：0-1  1-1-1
    let _path = path==='' ? index + '' : `${path}-${index}`

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
        {loop(item.children, _path)}
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
      key={_path}
      path={_path}
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
