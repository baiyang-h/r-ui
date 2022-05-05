import { useRef } from "react";
import { Layout, Button } from 'antd';
import FormControls from './control'
import FormDragLayout from './layout'
import FormSetController from './set'
import './index.scss'

const { Sider, Content } = Layout;

function FormCreate(props) {

  const formDragLayoutRef = useRef()

  // 清空
  const onClear = () => {
    formDragLayoutRef.current.clear()
  }

  return <div className="form-create">
    <div className="header">
      <div className="btns">
        <Button type="primary">预览</Button>
        <Button type="primary" danger onClick={onClear}>清空</Button>
        <Button type="primary">导入JSON</Button>
        <Button type="primary">导入Form Options</Button>
        <Button type="primary">生成JSON</Button>
        <Button type="primary">生成Options</Button>
        <Button type="primary">生成组件</Button>
      </div>
    </div>
    <Layout>
      <Sider width="260"><FormControls /></Sider>
      <Content><FormDragLayout ref={formDragLayoutRef} /></Content>
      {/*<Sider width="320"><FormSetController /></Sider>*/}
    </Layout>
  </div>
}

export default FormCreate
