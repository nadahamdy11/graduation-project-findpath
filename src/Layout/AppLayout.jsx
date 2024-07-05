import React, { useState } from "react";
import Style from "../Styles/Sidebar.module.css";
import "../index.css";
import logo from "../Assets/logo.png";
import Profile from "../Components/Profile";
import { Link, Outlet } from "react-router-dom";
import {
  HomeOutlined,
  UnorderedListOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Headerp from "./Headerp";
import { useTranslation } from "react-i18next";

const { Header, Content, Sider } = Layout;

const App = () => {
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //log out function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if you store toke
    window.location.href = "/signin";
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/*sidbar*/}

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: "black" }}
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
          <Menu.Item key="/" className="menuitem">
            <HomeOutlined style={{ fontSize: "23px" }} />
            <span className="icons">{t("home")}</span>
            <Link to="/" />
          </Menu.Item>

          <Menu.Item key="/orderList">
            <UnorderedListOutlined style={{ fontSize: "23px" }} />
            <span>{t("list")}</span>
            <Link to="/orderList" />
          </Menu.Item>

          <Menu.Item key="/chatbot">
            <MessageOutlined style={{ fontSize: "23px" }} />
            <span>{t("chat")}</span>
            <Link to="/chatbot" />
          </Menu.Item>

          <Menu.Item>
            <button className={Style.logout} onClick={handleLogout}>
              {" "}
              <LogoutOutlined style={{ fontSize: "23px" }} />
              <span>{t("out")}</span>
            </button>
          </Menu.Item>
        </Menu>
        <Profile />
      </Sider>
      <Layout>
        {/* header */}
        <Header style={{ display: "flex", backgroundColor: colorBgContainer }}>
          <Headerp />
        </Header>
        <Outlet />*
        <footer
          style={{
            textAlign: "center",
            marginTop: "120px",
          }}
        >
          Triple S ©{new Date().getFullYear()} Created Triple S team
        </footer>
      </Layout>
    </Layout>
  );
};
export default App;
