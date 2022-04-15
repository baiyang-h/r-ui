import React, { useState } from 'react';
import { Form, Input, Switch, Radio } from 'antd';

function FormConfig() {

  const [form] = Form.useForm();

  function onValuesChange(values) {
    console.log(values)
  }

  return <div>
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        layout: 'horizontal',
        size: 'middle',
        labelAlign: 'right',
        labelWrap: false,
        colon: true,
      }}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="表单布局" name="layout">
        <Radio.Group>
          <Radio value="horizontal">horizontal</Radio>
          <Radio value="vertical">vertical</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="表单大小" name="size">
        <Radio.Group>
          <Radio value="small">small</Radio>
          <Radio value="middle">middle</Radio>
          <Radio value="large">large</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="label 标签的文本对齐方式" name="labelAlign">
        <Radio.Group>
          <Radio value="left">left</Radio>
          <Radio value="right">right</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="label 标签的文本换行方式" name="labelWrap" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="是否显示 label 后的冒号" name="colon" valuePropName="checked">
        <Switch />
      </Form.Item>
      {/*<Form.Item label="Field A">*/}
      {/*  <Input placeholder="input placeholder" />*/}
      {/*</Form.Item>*/}
    </Form>
  </div>
}

export default FormConfig