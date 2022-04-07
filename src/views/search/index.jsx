import React, {useRef} from 'react';
import {TreeSelect, Input, Form, Select} from 'antd';
import RSearch from '@/components/Search'

const {Option} = Select

const formItemLayout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
}

const prefixSelector = (
  <Form.Item noStyle>
    <Select style={{width: 70}} defaultValue="86">
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);

function MyInput(props) {
  return <Input {...props} />
}

const config = [
  {
    type: 'input',
    label: '文本框',
    key: 'text',
    attrs: {
      reg: /\d/,
      maxLength: 4,
    },
    rules: [
      {
        required: true,
        message: '请输入值'
      }
    ],
  },
  {
    type: 'number',
    label: '数字输入框',
    key: 'inputNumber',
    attrs: {
      defaultValue: 111,   // 优先 defaultValue， value 也可以， 内部做了处理
      value: 2
    }
  },
  {
    type: 'input',
    label: '手机号',
    key: 'phone',
    attrs: {
      addonBefore: prefixSelector
    }
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
    type: 'switch',
    label: 'Switch',
    key: 'switch',
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
    label: 'Checkbox',
    key: 'checkbox',
  },
  {
    type: 'checkboxGroup',
    label: 'CheckboxGroup',
    key: 'checkboxGroup',
    attrs: {
      options: [
        {label: 'Apple', value: 'Apple'},
        {label: 'Pear', value: 'Pear'},
        {label: 'Orange', value: 'Orange'},
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

export default function MySearch() {

  const formRef = useRef();

  function onFinish(values) {
    console.log(values)
  }

  function onValuesChange(changedValues, allValues) {
    console.log(changedValues, allValues)
  }

  return <div>
    <RSearch
      ref={formRef}
      config={config}
      {...formItemLayout}
      showBtn={true}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    />
  </div>
}
