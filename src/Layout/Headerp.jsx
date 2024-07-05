import { Menu, Dropdown, Space, Typography, Button } from "antd";
import {
    GlobalOutlined,
    DownOutlined
} from "@ant-design/icons";
import "../Styles/Header.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


function Headerp() {

 const { t, i18n } = useTranslation();
 const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
};
   


    return (

        <div className="demo-logo w-100 float-sm-start" >
            <Menu
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ flex: 1, minWidth: 0 }}
            >
                <Menu.Item style={{ color: "black", fontSize: "15px" }}>{t('servise')}</Menu.Item>
                <Menu.Item style={{ color: "black" }} >{t('who')}</Menu.Item>
                <Menu.Item style={{ color: "black", marginLeft: "60%",marginTop:"-2%" }}>

                    <button onClick={() => changeLanguage('ar')}>{t('ar')} </button>
                </Menu.Item>
                <Menu.Item style={{ color:"black",marginTop:"-2%" }}>
                    <button onClick={() => changeLanguage('en')}  >{t('en')} </button>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/signup"> <Button style={{ width: "auto" }}>{t('up')}</Button></Link>
                </Menu.Item>

            </Menu>
        </div>
    )
}

export default Headerp;