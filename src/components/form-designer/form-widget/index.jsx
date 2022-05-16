import React from 'react'
import { ReactSortable } from "react-sortablejs";
import update from 'immutability-helper';
import _, { uniqueId } from 'lodash';
import './index.scss';
import { Form, Row, Col } from 'antd';
import { Text, Input, InputNumber, Select, TimePicker, DatePicker, Cascader, TreeSelect, Switch, Slider, RadioGroup, Checkbox, CheckboxGroup, Rate } from '@/packages/form/components'
import DraggableWrapper from "./components/DraggableWrapper"
import { widgets } from '@/components/form-designer/widget-panel'
import {
  getCloneItem,
  isPath,
  itemAdd,
  indexToArray,
  itemRemove,
  getParent,
  setInfo,
  getItem
} from '../utils'

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

export default class FormWidget extends React.Component {

  formRef = React.createRef()

  state = {
    list: [],
    selected: undefined
  }

  // 添加
  sortableAdd = (evt) => {
    console.log('Add', evt)
    const list = _.cloneDeep(this.state.list)
    // 两种情况，1. 左侧控件（拖拽新增）， 2. 已经存在的控件移动
    const clone = evt.clone

    // 组件层级, 1. 如果null 则表示左侧控件新增， 2. 有层级就是已经存在的控件进行移动
    const path = evt.clone.getAttribute('data-path');
    // 父节点层级
    const parentPath = evt.path[1].getAttribute('data-path');

    // 拖拽时的位置索引
    const newIndex = evt.newIndex
    // 新路径 为根节点时直接使用index
    const newPath = parentPath ? `${parentPath}-${newIndex}` : newIndex+'';
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
        Promise.resolve().then(() => {
          this.setState({
            list: _list
          })
        })
      } else {
        // 此处是先新增再删除
        // 添加拖拽元素
        let _list = itemAdd(list, newPath, cloneRow)
        // 删除元素 获得新数据
        _list = itemRemove(_list, oldPath);
        // 更新视图
        Promise.resolve().then(() => {
          this.setState({
            list: _list
          })
        })
      }
    } else {
      // 新增流程 创建元素 => 插入元素 => 更新视图
      // 获取控件类型信息
      const type = clone.getAttribute('data-type')
      const row = _.cloneDeep(widgets.find(item => item.type === type))
      row.id = uniqueId('field_')
      // 为容器时增加子元素
      if(row.type === 'container') {
        row.children = []
      }
      const _list = itemAdd(list, newPath, row)
      // 更新视图
      Promise.resolve().then(() => {
        this.setState({
          list: _list
        })
      })
    }
  }

  // 移动
  sortableUpdate = (evt) => {
    console.log('Update', evt)
    const { newIndex, oldIndex } = evt
    // 父节点层级, 如果是根的话则没有父级路径，即null
    const parentPath = evt.path[1].getAttribute('data-path');
    const parentItem = getItem(this.state.list, parentPath)
    // 父元素list
    let parent = parentPath && parentItem ? parentItem.children : this.state.list
    // 当前拖拽元素
    const dragItem = parent[oldIndex];
    // 更新后的父节点
    parent = update(parent, {
      $splice: [
        [oldIndex, 1],
        [newIndex, 0, dragItem],
      ]
    })
    // 最新的数据 根节点时直接调用data
    const _list = parentPath ? setInfo(this.state.list, parentPath, parent) :parent
    this.setState({
      list: _list
    })
  }

  // 选择拖拽容器
  onDragWrapperClick = (item) => {
    this.setState({
      selected: item.id
    })
  }

  // 往上移动
  onDragWrapperUp = (item, index) => {
    if(index === 0) return false
    let _list = _.cloneDeep(this.state.list)
    let parent = getParent(_list, item.id)
    let children = parent ? parent.children : _list
    const row = children[index]
    children = update(children, {
      $splice: [
        [index, 1],
        [index-1, 0, row],
      ]
    })
    if(parent) {
      parent.children = children
    } else {
      _list = children
    }
    this.setState({
      list: _list
    })
  }

  // 往下移动
  onDragWrapperDown = (item, index) => {
    let _list = _.cloneDeep(this.state.list)
    let parent = getParent(_list, item.id)
    let children = parent ? parent.children : _list
    let lastIndex = children.length
    if(index+1>=lastIndex) return
    const row = children[index]
    children = update(children, {
      $splice: [
        [index, 1],
        [index+1, 0, row],
      ]
    })
    if(parent) {
      parent.children = children
    } else {
      _list = children
    }
    this.setState({
      list: _list
    })
  }

  // 容器拷贝（无关数据）
  onDragWrapperAdd = (item, index) => {
    const _list = _.cloneDeep(this.state.list)
    const parentItem = getParent(_list, item.id)
    const children = parentItem ? parentItem.children : _list
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
    this.setState({
      list: _list
    })
  }

  // 容器拷贝（包括数据）
  onDragWrapperCopy = (item, index) => {
    const _list = _.cloneDeep(this.state.list)
    const parentItem = getParent(_list, item.id)
    const children = parentItem ? parentItem.children : _list
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
    this.setState({
      list: _list
    })
  }

  // 容器删除
  onDragWrapperDelete = (item, path) =>{
    // 删除元素 获得新数据
    let _list = itemRemove(this.state.list, path);
    this.setState({
      list: _list
    })
  }

  render() {

    const { selected, list } = this.state

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
          onAdd={this.sortableAdd}
          onUpdate={this.sortableUpdate}
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
        onClick={() => this.onDragWrapperClick(item, index)}
        onUp={() => this.onDragWrapperUp(item, index)}
        onDown={() => this.onDragWrapperDown(item, index)}
        onAdd={() => this.onDragWrapperAdd(item, index)}
        onCopy={() => this.onDragWrapperCopy(item, index)}
        onDelete={() => this.onDragWrapperDelete(item, _path)}
      >
        { RenderCom }
      </DraggableWrapper>
    })

    return (
      <div className="form-widget">
        <Form
          className="form-widget-form"
          ref={this.formRef}
          name="form-widget-form"
        >
          <ReactSortable
            className="widget-draggable"
            animation={150}
            handle=".draggable-wrapper-icon"
            group={{name: "form-designer"}}
            list={list}
            setList={() => {}}
            onAdd={this.sortableAdd}
            onUpdate={this.sortableUpdate}
          >
            {loop(list)}
          </ReactSortable>
        </Form>
      </div>
    );
  }
}

