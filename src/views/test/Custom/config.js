
import { Rate, Input, Divider, DatePicker, InputNumber, Switch, Slider, Checkbox, Radio, Select } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const options = [];
for (let i = 0; i < 3; i++) {
  options.push({
    key: i.toString(),
    label: `选项 ${i}`,
    value: i.toString()
  });
}
const GlobalComponent = {
  Divider,
  DatePicker,
  RangePicker,
  MonthPicker,
  WeekPicker,
  Input,
  TextArea,
  InputNumber,
  Switch,
  Slider,
  CheckboxGroup,
  RadioGroup,
  Select,
  Rate,
};

const formItemData = [
  {
    name: 'Containers',
    attr: {
      style: {
        border: '1px solid #40a9ff'
      }
    },
    label: '容器'
  },
  {
    name: 'RangePicker',
    attr: {
      style: {
        width: '100%'
      },
      defaultValue: undefined
    },
    label: '区间选择框'
  },
  {
    name: 'DatePicker',
    attr: {
      style: {
        width: '100%'
      },
      defaultValue: undefined
    },
    label: '日选择框'
  },
  {
    name: 'MonthPicker',
    attr: {
      style: {
        width: '100%'
      },
      defaultValue: undefined,
      placeholder: '请选择月份'
    },
    label: '月选择框'
  },
  {
    name: 'WeekPicker',
    attr: {
      style: {
        width: '100%',
      },
      defaultValue: undefined,
      placeholder: '请选择周期'
    },
    label: '周选择框'
  },
  {
    name: 'Input',
    attr: {
      defaultValue: '',
      placeholder: '请输入'
    },
    label: '文本框'
  },
  {
    name: 'TextArea',
    attr: {
      defaultValue: '',
      placeholder: '请输入'
    },
    label: '文本域'
  },
  {
    name: 'InputNumber',
    attr: {
      defaultValue: undefined,
    },
    label: '数字框'
  },
  {
    name: 'Switch',
    attr: {
      style: {
        width: 44,
      },
      defaultValue: false,
    },
    label: '开关'
  },
  {
    name: 'Slider',
    attr: {
      style: {
        width: '100%',
        padding: '0'
      },
      defaultValue: 10
    },
    label: '滑动条'
  },
  {
    name: 'Rate',
    attr: {
      style: {
        width: '100%',
        color: '#47FECF'
      },
      defaultValue: 0
    },
    label: '评分'
  },
  {
    name: 'Divider',
    attr: {},
    label: '分割线'
  },
  {
    name: 'CheckboxGroup',
    attr: {
      options: options,
      defaultValue: []
    },
    label: '多选框'
  },
  {
    name: 'RadioGroup',
    attr: {
      options: options,
      defaultValue: options[0].value
    },
    label: '单选框'
  },
  {
    name: 'Select',
    attr: {
      options: options,
      defaultValue: options[0].value
    },
    label: '下拉框'
  },
];

export { formItemData, GlobalComponent, options }