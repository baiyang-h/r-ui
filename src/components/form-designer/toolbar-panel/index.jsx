import { Button } from 'antd';
import PropTypes from "prop-types";
import './index.scss'

ToolbarPanel.propTypes = {
  onPreview: PropTypes.func,
  onClear: PropTypes.func,
  onImportJson: PropTypes.func,
  onExportJson: PropTypes.func,
  onExportCode: PropTypes.func,
}

function ToolbarPanel(props) {

  // 预览
  const onPreview = () => {
    props.onPreview && props.onPreview()
  }

  // 清空
  const onClear = () => {
    props.onClear && props.onClear()
  }

  // 导入JSON
  const onImportJson = () => {
    props.onImportJson && props.onImportJson()
  }

  // 导出JSON
  const onExportJson = () => {
    props.onExportJson && props.onExportJson()
  }

  // 导出代码
  const onExportCode = () => {
    props.onExportCode && props.onExportCode()
  }

  return <div className="toolbar-panel">
    <Button type="primary" danger onClick={onClear}>清空</Button>
    <Button type="primary" onClick={onPreview}>预览</Button>
    <Button type="primary" onClick={onImportJson}>导入JSON</Button>
    <Button type="primary" onClick={onExportJson}>导出JSON</Button>
    <Button type="primary" onClick={onExportCode}>导出代码</Button>
  </div>
}

export default ToolbarPanel