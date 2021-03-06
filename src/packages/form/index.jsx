import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from 'antd';
import './index.scss';
import { setInitialValues } from './methods'
import { baseControlProps } from './config'
import { processWidthAndHeightProps, isPropsHasWOrH } from '@/libs/util'
import classNames from 'classnames'
import FormControl from './components/control'

export default class _Form extends Component {

  static propTypes = {
    name: PropTypes.string,
    config: PropTypes.array.isRequired,
    rules: PropTypes.object,                  // 规则
    showBtn: PropTypes.bool,                  //  是否显示 提交、重置按钮组
    showResetBtn: PropTypes.bool,             //  是否显示 重置按钮
    cancelBtnText: PropTypes.string,          // 取消按钮文字
    okBtnText: PropTypes.string,              // 确定按钮文字
    onFinish: PropTypes.func,
    onValuesChange: PropTypes.func,
  }

  static defaultProps = {
    name: 'form',
    config: [],  // 表单配置项
    rules: {},  // 表单规则配置项
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

  // 得到 form 表单 实例对象，可暴露给外部
  getFormRef = () => {
    return this.formRef.current
  }

  // 当传入 rules 属性的时候，通过key得到相应的 rules 规则
  getRule = (key) => this.props.rules[key]

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
      name,
      config,
      showBtn,
      showResetBtn,
      okBtnText,
      cancelBtnText,
      rules,
      ...formProps // 其他在 form 上的属性
    } = this.props

    const { initialValues } = this.state;

    return <Form
      {...formProps}
      className={classNames('advanced-form', formProps.className)}
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
            rules=[],
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

          const typeLowerCase = type.toLowerCase()

          return <Form.Item
              label={label}
              name={key}
              key={key}
              rules={this.getRule(key) || rules}
              {...formItemProps}
          >
            <FormControl
              {...attrs}
              {...baseControlProps}
              type={typeLowerCase}
              render={typeLowerCase === 'custom' ? () => component : null}
            />
          </Form.Item>
        })
      }

      {
        showBtn && <Form.Item label=" " className="advanced-form-btns">
          {showResetBtn && <Button onClick={this.onReset} className="advanced-form-cancel-btn">{ cancelBtnText }</Button>}
          <Button type="primary" htmlType="submit" className="advanced-form-submit-btn">{ okBtnText }</Button>
        </Form.Item>
      }

    </Form>
  }
}
