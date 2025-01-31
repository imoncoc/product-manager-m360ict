import { Layout, Menu } from "antd";
import { ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuProps = {
  key: string;
  label: ReactNode;
};

const items: MenuProps[] = [
  {
    key: "Products",
    label: <NavLink to={"/products"}>Products</NavLink>,
  },
];

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3 style={{}}>Product Management</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <div className=" h-full">
          <Content style={{ margin: "24px 16px 0", flex: 1 }}>
            <Outlet />
          </Content>
        </div>
        <Footer style={{ textAlign: "center" }}>
          Product Management ©{new Date().getFullYear()} Created by Md Imon
          Hossian
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
