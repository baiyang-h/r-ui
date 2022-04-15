import { Layout, Button } from 'antd';
import FormControls from './control'
import FormDragLayout from './layout'
import FormSetController from './set'
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
      <Sider width="260"><FormControls /></Sider>
      <Content><FormDragLayout /></Content>
      <Sider width="320"><FormSetController /></Sider>
    </Layout>
  </div>
}

export default FormCreate