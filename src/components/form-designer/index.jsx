import { useRef } from "react";
import { Layout } from 'antd';
import './index.scss'
import WidgetPanel from './widget-panel'
import ToolbarPanel from './toolbar-panel'
import FormWidget from './form-widget'
import SettingPanel from './setting-panel'

const { Header, Sider, Content } = Layout;

function FormDesigner() {

  const formWidgetRef = useRef()

  // 预览
  const onPreview = () => {}

  // 清空
  const onClear = () => {
    formWidgetRef.current.clear()
  }

  // 导入JSON
  const onImportJson = () => {}

  // 导出JSON
  const onExportJson = () => {}

  // 导出代码
  const onExportCode = () => {}

  return <Layout className="form-designer">
    <Sider width="260">
      <WidgetPanel />
    </Sider>
    <Layout>
      <Header>
        <ToolbarPanel
          onPreview={onPreview}
          onClear={onClear}
          onImportJson={onImportJson}
          onExportJson={onExportJson}
          onExportCode={onExportCode}
        />
      </Header>
      <Content>
        <FormWidget ref={formWidgetRef} />
      </Content>
    </Layout>
    {/*<Sider>*/}
    {/*  <SettingPanel />*/}
    {/*</Sider>*/}
  </Layout>
}

export default FormDesigner
