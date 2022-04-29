import React, {Component} from 'react'
import Sortable from 'react-sortablejs';
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

const sortableOption = {
  animation: 150,
  // fallbackOnBody: true,
  // swapThreshold: 0.65,
  handle: '.drag-wrapper--drag-icon',
  group: {
    name: 'form-create',
    pull: true,
    put: true,
  },
}

class DragFormLayout extends Component {

  formRef = React.createRef()

  state = {
    list: [],
    selected: undefined
  }

  // 添加
  sortableAdd = (evt) => {
    console.log('Add', evt)
  }

  // 更新
  sortableUpdate = (evt) => {
    console.log('Update', evt)
  }

  // 点击移动容器
  onDragWrapperClick = (item) => {
    // setSelected(item.id)
  }

  // 容器拷贝（无关数据）
  onDragWrapperAdd = (item, index) => {
    // const _list = _.cloneDeep(list)
    // _list.splice(index+1, 0, {...item, id: uniqueId('field_')})
    // setList(_list)
  }

  // 容器拷贝（包括数据）
  onDragWrapperCopy = (item, index) => {
    // console.log(formRef.getFieldsValue())
    // const _list = _.cloneDeep(list)
    // _list.splice(index+1, 0, {...item, id: uniqueId('field_')})
    // setList(_list)
  }

  // 容器删除
  onDragWrapperDelete = (item, index) => {
    // setList(list.filter(_item => _item.id !== item.id))
  }

  loop = (arr=[], level='') => arr.map((item, index) => {
    // 层级 例：0-1  1-1-1
    let _level = level==='' ? index + '' : `${level}-${index}`

    let RenderCom
    if(item.type === 'container') {  // 如果类型是容器
      RenderCom = <Sortable
        className="loop-drag-items"
        options={{
          ...sortableOption,
          onAdd: evt => (this.sortableAdd(evt)),
          onUpdate: evt => (this.sortableUpdate(evt)),
        }}
      >
        {this.loop(item.children, _level)}
      </Sortable>
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
      selected={this.state.selected === item.id}
      onClick={() => this.onDragWrapperClick(item, index)}
      onAdd={() => this.onDragWrapperAdd(item, index)}
      onCopy={() => this.onDragWrapperCopy(item, index)}
      onDelete={() => this.onDragWrapperDelete(item, index)}
    >
      { RenderCom }
    </DragWrapper>
  })

  render() {
    return <div className="drag-form-layout">
      <Form
        className="drag-form"
        form={this.formRef}
        name="drag-form"
      >
        <Sortable
          className="drag-items"
          options={{
            ...sortableOption,
            onAdd: evt => (this.sortableAdd(evt)),
            onUpdate: evt => (this.sortableUpdate(evt)),
          }}
        >
          {this.loop(this.state.list)}
        </Sortable>
      </Form>
    </div>
  }
}

export default DragFormLayout
