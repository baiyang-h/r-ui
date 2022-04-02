import { Layout, Menu } from 'antd';
import './index.scss'
import { Routes, Route, Link } from "react-router-dom";
import Home from '../views/home'
import Form from '../views/form'
import Table from '../views/table'
import Modal from '../views/modal'

const { Sider, Content } = Layout;

export default function _Layout() {

    const handleClick = (key) => {
        console.log(key)
    }

    return <Layout className="layout">
        <Sider className="sider">
            <Menu
                onClick={handleClick}
                defaultSelectedKeys={['1']}
                mode="inline"
            >
                <Menu.Item key="1"><Link to="/home">Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/form">Form</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/table">Table</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/modal">Modal</Link></Menu.Item>
            </Menu>
        </Sider>
        <Layout className="content">
            <Content>
                <Routes>
                    <Route exact path="/home" element={<Home />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/table" element={<Table />} />
                    <Route path="/modal" element={<Modal />} />
                </Routes>
            </Content>
        </Layout>
    </Layout>
}