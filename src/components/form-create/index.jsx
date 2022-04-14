import { Layout, Button } from 'antd';
import Controls from './control'
import FormLayout from './layout'
import ControlConfig from './config'
import './index.scss'

const { Sider, Content } = Layout;

function FormCreate(props) {
  return <div className="form-create">
    <div className="header">
      <div className="btns">
        <Button>导入JSON</Button>
        <Button>导入Form Options</Button>
        <Button type="primary">生成JSON</Button>
        <Button type="primary">生成Options</Button>
        <Button type="primary">生成组件</Button>
      </div>
    </div>
    <Layout>
      <Sider width="260"><Controls /></Sider>
      <Content><FormLayout /></Content>
      <Sider width="320"><ControlConfig /></Sider>
    </Layout>
  </div>
}

export default FormCreate