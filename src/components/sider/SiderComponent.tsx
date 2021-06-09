import { Layout, Menu } from 'antd';

export const SiderComponent = () => {
    const { Sider } = Layout;
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="1">Option1</Menu.Item>
                <Menu.Item key="2">Option2</Menu.Item>
            </Menu>
        </Sider>
    )
};
