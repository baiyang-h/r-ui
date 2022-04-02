import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from 'antd';
import './index.scss';
import { setInitialValues } from './methods'
import { baseControlProps } from './props'
import { processWidthAndHeightProps, isPropsHasWOrH } from '../../libs/util'

// 控件
import Input from './components/Input';
import InputNumber from './components/InputNumber'
import Select from './components/Select';
import TimePicker from './components/TimePicker';
import DatePicker from './components/DatePicker';
import Cascader from './components/Cascader';
import TreeSelect from './components/TreeSelect';
import Switch from './components/Switch';
import Slider from './components/Slider';
import Custom from './components/Custom';
import RadioGroup from './components/RadioGroup';
import Checkbox from './components/Checkbox'
import CheckboxGroup from './components/Checkbox/CheckboxGroup'

// 控件
const Control = {
  input: Input,                     // input
  number: InputNumber,              // 数字输入框
  select: Select,                   // select
  time: TimePicker,                 // 时间选择器
  date: DatePicker,                 // 日期选择器
  cascader: Cascader,               // 级联选择器
  treeselect: TreeSelect,           // 树选择器
  switch: Switch,                   // Switch 选择
  slider: Slider,                   // 滑块
  radiogroup: RadioGroup,                // 单选框组
  checkbox: Checkbox,               // 复选框
  checkboxgroup: CheckboxGroup,     // 复选框组
  custom: Custom,                   // 自定义选择器
}

export default class _Form extends Component {

  static propTypes = {
    name: PropTypes.string,
    config: PropTypes.array,
    showBtn: PropTypes.bool,                 //  是否显示 提交、重置按钮组
    showResetBtn: PropTypes.bool,             //  是否显示 重置按钮
    cancelBtnText: PropTypes.string,          // 取消按钮文字
    okBtnText: PropTypes.string,              // 确定按钮文字
    onFinish: PropTypes.func,
    onValuesChange: PropTypes.func,
  }

  static defaultProps = {
    name: 'form',
    config: [],  // 表单配置项
    showBtn: false,
    showResetBtn: true,
    cancelBtnText: '取消',
    okBtnText: '确定',
  }

  formRef = React.createRef()

  state = {
    initialValues: {}
  }

  // 初始化 state
  static getDerivedStateFromProps(props, state) {
    return {
      //默认值
      initialValues: setInitialValues(props.config),
    }
  }

  // 重置
  onReset = () => {
    this.formRef.current.resetFields();
  }

  // 提交
  onFinish = (values) => {
    if(this.props.onFinish) {
      Object.keys(values).forEach(key => {
        if(Array.isArray(values[key]) && !values[key].length) {
          values[key] = undefined;
        }
      })
      this.props.onFinish(values)
    }
  }

  // 表单变化即触发事件
  onValuesChange = (changedValues, allValues) => {
    this.props.onValuesChange && this.props.onValuesChange(changedValues, allValues)
  }

  render() {

    const {
      name, config, showBtn, showResetBtn, okBtnText, cancelBtnText
    } = this.props

    const { initialValues } = this.state;

    return <Form
      className="advanced-form"
      ref={this.formRef}
      name={name}
      initialValues={initialValues}
      onFinish={this.onFinish}
      onValuesChange={this.onValuesChange}
    >
      {
        config.map(item => {

          let {
            type,
            label,
            key,
            attrs={},
            component,
            ...formItemProps
          } = item

          // 如果有 defaultValue 则去掉，因为在form表单中，用initialValues 来填写默认值，如果使用 defaultValue 则会报警告
          if(attrs.defaultValue) {
            let { defaultValue, ..._attrs } = attrs
            attrs = _attrs
          }

          // 增加 width、height、maxWidth、maxHeight、minWidth、minHeight
          if(isPropsHasWOrH(attrs)) {   // 存在这些属性的时候才做处理
            const widthAndHeightStyles = processWidthAndHeightProps(attrs)
            attrs.style = {...attrs.style, ...widthAndHeightStyles}
          }

          // 根据 type 传入的类型 判断 什么表单组件
          let Com;
          if(type.toLowerCase() === 'custom') { // 如果是自定义组件
            Com = component || Control[type.toLowerCase()]
          } else {
            Com = Control[type.toLowerCase()]
          }

          return <Form.Item
              label={label}
              name={key}
              key={key}
              {...formItemProps}
          >
            <Com {...attrs} {...baseControlProps} />
          </Form.Item>
        })
      }

      {
        showBtn && <Form.Item label=" " className="advanced-form-btns">
          {showResetBtn && <Button onClick={this.onReset}>{ cancelBtnText }</Button>}
          <Button type="primary" htmlType="submit">{ okBtnText }</Button>
        </Form.Item>
      }

    </Form>
  }
}