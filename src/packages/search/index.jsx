import {Component} from "react";
import Form from '../form'
import PropTypes from "prop-types";

export default class Search extends Component {

    static propTypes = {
        config: PropTypes.array,
        rules: PropTypes.object,                  // 规则
        showBtn: PropTypes.bool,                  // 是否显示 提交、重置按钮组
        showResetBtn: PropTypes.bool,             // 是否显示 重置按钮
        cancelBtnText: PropTypes.string,          // 取消按钮文字
        okBtnText: PropTypes.string,              // 确定按钮文字
        layout: PropTypes.string,                 // horizontal | vertical | inline
        onFinish: PropTypes.func,
        onValuesChange: PropTypes.func,
    }

    static defaultProps = {
        config: [],  // 表单配置项
        rules: {},  // 表单规则配置项
        showBtn: true,
        showResetBtn: true,
        cancelBtnText: '重置',
        okBtnText: '查询',
        layout: 'inline'
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
        const { config, rules, showBtn, showResetBtn, cancelBtnText, okBtnText, layout } = this.props
        return <Form
            className="advanced-search"
            config={config}
            rules={rules}
            layout={layout}
            showBtn={showBtn}
            showResetBtn={showResetBtn}
            cancelBtnText={cancelBtnText}
            okBtnText={okBtnText}
            onFinish={this.onFinish}
            onValuesChange={this.onValuesChange}
        />
    }
}

