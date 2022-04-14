let id = 0;

export const createId = () => id++;

export const list = () => [
  { id: id++, key: 'Text', name: '文本' },
  { id: id++, key: 'Input', name: '输入框' },
  { id: id++, key: 'InputNumber', name: '数字输入框' },
  { id: id++, key: 'Select', name: '选择器' },
  { id: id++, key: 'Radio', name: '单选框' },
  { id: id++, key: 'Checkbox', name: '复选框' },
  { id: id++, key: 'CheckboxGroup', name: '复选框组' },
  { id: id++, key: 'Switch', name: '开关' },
  { id: id++, key: 'TimePicker', name: '时间选择器' },
  { id: id++, key: 'DatePicker', name: '日期选择器' },
  { id: id++, key: 'Rate', name: '评分' },
  { id: id++, key: 'Slider', name: '滑动输入条' },
  { id: id++, key: 'TreeSelect', name: '树选择' },
  { id: id++, key: 'Cascader', name: '级联选择' },
  { id: id++, key: 'Upload', name: '上传' },
];