import { Space} from 'antd';
import FormModalExample1 from './FormModal1'
import FormModalExample2 from './FormModal2'

export default function Modal() {
    return <div>
        <Space>
            <FormModalExample1 />
            <FormModalExample2 />
        </Space>
    </div>
}