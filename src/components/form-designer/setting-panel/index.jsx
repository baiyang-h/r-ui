import { Tabs } from 'antd';
import ComponentConfig from './component-c'
import FormConfig from './form-c'
import './index.scss'

const { TabPane } = Tabs;

function FormSetController(props) {

  function onChange(key) {
    console.log(key)
  }

  return <div className="form-create-config">
    <Tabs defaultActiveKey="1" onChange={onChange} centered>
      <TabPane tab="组件配置" key="1">
        <ComponentConfig />
      </TabPane>
      <TabPane tab="表单配置" key="2">
        <FormConfig />
      </TabPane>
    </Tabs>
  </div>
}

export default FormSetController