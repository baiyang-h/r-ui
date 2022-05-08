import { useRef } from "react";
import { Layout } from 'antd';
import './index.scss'
import WidgetPanel from './widget-panel'
import ToolbarPanel from './toolbar-panel'
import FormWidget from './form-widget'
import SettingPanel from './setting-panel'

const { Header, Sider, Content } = Layout;

function FormDesigner() {

  const formDragLayoutRef = useRef()

  return <Layout className="form-designer">
    <Sider width="260">
      <WidgetPanel />
    </Sider>
    <Layout>
      <Header>
        <ToolbarPanel />
      </Header>
      <Content>
        <FormWidget />
      </Content>
    </Layout>
    {/*<Sider>*/}
    {/*  <SettingPanel />*/}
    {/*</Sider>*/}
  </Layout>
}

export default FormDesigner
