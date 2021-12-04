import { Link, Outlet} from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Sider } = Layout;

const AdminLayout = () =>{
    return(
    <Layout>
        <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" style={{justifyContent: "space-between"}}>
           <Menu.Item key="1">
                <Link to="/">về trang chủ</Link>
           </Menu.Item>
        </Menu>
        </Header>
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                >  
                    <Menu.Item key="1">
                       <Link to="Categories">Category</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="product">Product</Link>
                    </Menu.Item>        
                    
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </Layout>
    )
}

export default AdminLayout;