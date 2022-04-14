import addUnit from '@/libs/addUnit'

// 设置初始化默认值
export const setInitialValues = (config) => {
    let initialValues = {};
    // 对于表单控件中的 attrs 属性中 设置了 defaultValue 或者 value 则取他们的值为默认值
    config.forEach(item => {
        if(item.attrs && (item.attrs.defaultValue || item.attrs.value)) {
            initialValues[item.key] = item.attrs.defaultValue || item.attrs.value
        }
    })
    return initialValues
}

// 设置默认宽度
export const setDefaultWidth = (width) => width ? addUnit(width) : 'auto'
