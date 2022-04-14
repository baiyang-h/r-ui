import PropTypes, {any, func} from 'prop-types';

// 控件
import Input from '../input';
import InputNumber from '../input-number'
import Select from '../select';
import TimePicker from '../time-picker';
import DatePicker from '../date-picker';
import Cascader from '../cascader';
import TreeSelect from '../tree-select';
import Switch from '../switch';
import Slider from '../slider';
import Custom from '../custom';
import RadioGroup from '../radio-group';
import Checkbox from '../checkbox'
import CheckboxGroup from '../checkbox/CheckboxGroup'

// 控件
const Control = {
  input: Input,                     // input
  number: InputNumber,              // 数字输入框
  select: Select,                   // select
  time: TimePicker,                 // 时间选择器
  date: DatePicker,                 // 日期选择器
  cascader: Cascader,               // 级联选择器
  treeselect: TreeSelect,           // 树选择器
  switch: Switch,                   // switch 选择
  slider: Slider,                   // 滑块
  radiogroup: RadioGroup,          // 单选框组
  checkbox: Checkbox,               // 复选框
  checkboxgroup: CheckboxGroup,     // 复选框组
  custom: Custom,                   // 自定义选择器
}

function FormControl(props) {

  const { type, render, ..._props } = props

  // 根据 type 传入的类型 判断 什么表单组件
  let Com;
  if(type.toLowerCase() === 'custom' && typeof render === 'function') { // 如果是自定义组件
    Com = render()
  } else { // 其他表单控件
    Com = Control[type.toLowerCase()]
  }

  return <Com {..._props} />
}

FormControl.propTypes = {
  type: PropTypes.string,
  render: PropTypes.func
}

export default FormControl