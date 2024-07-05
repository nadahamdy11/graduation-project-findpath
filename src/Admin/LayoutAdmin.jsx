/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Style from "../Styles/Sidebar.module.css";
import "../index.css";
import logo from "../Assets/logo.png";
import { Link, Outlet } from "react-router-dom";
import {
  DashboardOutlined ,
  TruckOutlined,
  UnorderedListOutlined ,
  UsergroupDeleteOutlined ,
  RobotOutlined ,
  LoginOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const {  Content, Footer, Sider } = Layout;

const App = () => {

  const [collapsed, setCollapsed] = useState(false);
  
  const handleLogout = () => {
    // const user = res.data.data.user; 
     //const token = res.data.token;
     localStorage.removeItem('user');
     localStorage.removeItem('token'); // if you store toke  
     window.location.href = '/signin';
   }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/*sidbar*/}

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: "black"  }}
      >
        <div>
          <img src={logo} alt="" className={Style.logo} />
          <h6 className={Style.triple}>TRIPLE S</h6>
        </div>
        <Menu
          style={{ padding: 0, background: "black" }}
          defaultSelectedKeys={["/"]}
          mode="inline"
        >
          <Menu.Item key="/dashboard" className="menuitem">
          <DashboardOutlined  style={{ fontSize: "27px" }} />
            <span className="icons" style={{ fontSize: "19px" }}>Dashboard</span>
            <Link to="/dashboard" />
          </Menu.Item>

          <Menu.Item key="/tracing">
          <TruckOutlined  style={{ fontSize: "27px" }} />
            <span style={{ fontSize: "18px" }}>Tracing</span>
            <Link to="/tracing" />
          </Menu.Item>

          <Menu.Item key="/orders">
          <UnorderedListOutlined  style={{ fontSize: "27px" }} />
            <span style={{ fontSize: "18px" }}>Orders</span>
            <Link to="/orders" />
          </Menu.Item>
         <Menu.Item key="/users">
          <UsergroupDeleteOutlined  style={{ fontSize: "27px" }} />
            <span style={{ fontSize: "18px" }}>Users</span>
            <Link to="/users" />
          </Menu.Item>
          <Menu.Item >
           <button className={Style.logout} onClick={handleLogout}> <LoginOutlined style={{ fontSize: "23px" }} />
            <span>Log out</span>
            </button>
          </Menu.Item>

          <Menu.Item key="/chat" style={{marginTop:"50%"}}>
            <RobotOutlined  style={{ fontSize: "27px"}} />
            <span style={{ fontSize: "18px" }}>chat</span>
            <Link to="/chat" />
          </Menu.Item>
          
        </Menu>

      </Sider>
      <Layout>        
        <Outlet />

        <Content style={{ margin: "16px 16px" }}></Content>
        
      </Layout>
    </Layout>
  );
};
export default App;