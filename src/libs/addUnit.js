function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
}
// 添加单位，如果有px，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
export default function addUnit(value='auto', unit='px') {
  value = String(value);
  // 验证规则中的number判断是否为数值
  return number(value) ? `${value}${unit}` : value;
}