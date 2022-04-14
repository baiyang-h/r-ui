import React, { useState } from 'react';
import FormModal from '@/packages/modal/form-modal'
import {Button, Input} from "antd";
import './index.scss'

function MyInput(props) {
  return <Input {...props} />
}

const config = [
  {
    type: 'input',
    label: '文本框',
    key: 'text',
    rules: [
      {
        required: true,
        message: '请输入值'
      }
    ],
    attrs: {
      reg: /\d/,
      maxLength: 4,
    }
  },
  {
    type: 'number',
    label: '数字输入框',
    key: 'inputNumber',
  },
  {
    type: 'input',
    label: '手机号',
    key: 'phone',
  },
  {
    type: 'select',
    label: '选择框',
    key: 'select',
    attrs: {
      defaultValue: 1,
      options: [
        {
          label: 'One',
          value: 1
        },
        {
          label: 'Two',
          value: 2
        },
        {
          label: 'Three',
          value: 3
        }
      ]
    },
  },
  {
    type: 'select',
    label: '多选选择框',
    key: 'select2',
    attrs: {
      mode: 'multiple',
      options: [
        {
          label: 'One',
          value: 1
        },
        {
          label: 'Two',
          value: 2
        },
        {
          label: 'Three',
          value: 3
        }
      ]
    },
  },
  {
    type: 'time',
    label: '时间选择框',
    key: 'time',
  },
  {
    type: 'time',
    label: '时间范围选择框',
    key: 'time2',
    attrs: {
      type: 'rangepicker'
    }
  },
  {
    type: 'date',
    label: '日期选择框',
    key: 'date',
  },
  {
    type: 'date',
    label: '日期选择框',
    key: 'date2',
    attrs: {
      type: 'rangepicker'
    }
  },
  {
    type: 'cascader',
    label: '级联选择',
    key: 'cascader',
    attrs: {
      defaultValue: ['zhejiang', 'hangzhou', 'xihu'],
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ]
    }
  },
  {
    type: 'treeselect',
    label: '树形选择器',
    key: 'treeselect',
    attrs: {
      treeData: [
        {
          title: 'Node1',
          value: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
        },
      ]
    }
  },
  {
    type: 'radioGroup',
    label: 'Radio.Group',
    key: 'radioGroup',
    attrs: {
      options: [
        {
          label: 'One',
          value: 1
        },
        {
          label: 'Two',
          value: 2
        },
        {
          label: 'Three',
          value: 3
        }
      ]
    }
  },
  {
    type: 'checkbox',
    label: 'checkbox',
    key: 'checkbox',
  },
  {
    type: 'checkboxGroup',
    label: 'CheckboxGroup',
    key: 'checkboxGroup',
    attrs: {
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
      ]
    }
  },
  {
    type: 'custom',
    label: '自定义',
    key: 'custom',
    attrs: {
      defaultValue: 123,
    },
    component: MyInput
  },
]

const formProps = {
  layout: 'inline',
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

function App() {

  let [visible, setVisible] = useState(false)
  let [confirmLoading, setConfirmLoading] = useState(false)

  function onOk(values) {
    setConfirmLoading(true);
    setTimeout(() => {
      console.log(values)
      setVisible(false);
      setConfirmLoading(false);
    }, 1000)
  }

  function onCancel() {
    setVisible(false);
    setConfirmLoading(false);
  }

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>Open FormModal2</Button>
      <FormModal
        wrapClassName="form-modal2"
        width={850}
        title={'这是FormModal'}
        confirmLoading={confirmLoading}
        visible={visible}
        formProps={formProps}
        config={config}
        onOk={onOk}
        onCancel={onCancel}
      />
    </div>
  );
};

export default App;
