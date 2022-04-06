import { Layout, Menu } from 'antd';
import './index.scss'
import { Routes, Route, Link } from "react-router-dom";

import menu from '../router'

const { Sider, Content } = Layout;

export default function _Layout() {

    const handleClick = (key) => {
        console.log(key)
    }

    return <Layout className="layout">
        {/*<Sider className="sider">*/}
        {/*    <Menu*/}
        {/*        onClick={handleClick}*/}
        {/*        defaultSelectedKeys={['1']}*/}
        {/*        mode="inline"*/}
        {/*    >*/}
        {/*        {*/}
        {/*            menu.map((item, index) => <Menu.Item key={index}><Link to={item.path}>{item.name}</Link></Menu.Item>)*/}
        {/*        }*/}
        {/*    </Menu>*/}
        {/*</Sider>*/}
        <Layout className="content">
            <Content>
                <Routes>
                    {
                        menu.map((item, index) => <Route key={item.path} path={item.path} element={<item.component />} />)
                    }
                </Routes>
            </Content>
        </Layout>
    </Layout>
}