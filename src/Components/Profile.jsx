import React, { useState, useEffect } from "react";
import { Switch, Card, Avatar, Button, Drawer, Modal } from "antd";
import style from "../Styles/Profile.module.css";
import user from "../Assets/Ellipse 27.png";
import EditProfile from "./Editprofile"; // Updated import
import Changepassword from "./Changepassword";
import ChangeEmail from "./ChangeEmail";
import Rate from "./RateUs";
import {
  EditOutlined,
  ArrowRightOutlined,
  LockOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  NotificationOutlined,
  GlobalOutlined,
  StarOutlined,
  LogoutOutlined,
  MailOutlined,

} from "@ant-design/icons";
const { confirm } = Modal;
import axios from "axios";
import { useTranslation } from 'react-i18next';


const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

const App = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [rate, setRate] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [address, setAddress] = useState(false);
  const [addcard, setAddcard] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      } else {
        setUserData(null); // Or handle as per your application's logic
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleEditProfile = () => {
    setChildrenDrawer(true);
    setEditProfile(true);
    setMessage("Edit Profile");
  };

  const handleChangePassword = () => {
    setChildrenDrawer(true);
    setChangePassword(true);
    setEditProfile(false);
    setMessage("Change Password");
  };

  const handleAddress = () => {
    setChildrenDrawer(true);
    setAddress(true);
    setChangePassword(false);
    setEditProfile(false);
    setMessage("Edit E-mail");
  };

  const handleRate = () => {
    setChildrenDrawer(true);
    setRate(true);
    setAddress(false);
    setChangePassword(false);
    setEditProfile(false);
    setMessage("Rate Us");
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  //log out
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete your account?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteAccount();
      },
    });
  };
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        "https://smart-shipment-system.vercel.app/api/v1/users/deleteMe",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Account deleted successfully:", response.data);
      alert("Your account has been deleted successfully.");

      // Optionally, redirect the user to the signin page
      window.location.href = "/signin";
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error deleting account:", error.response.data);
        alert("Error deleting account: " + error.response.data.message);
      } else {
        // Network error or other issue
        console.error("Network error:", error.message);
        alert("Network error: " + error.message);
      }
    }
  };
  return (
    <>
      <Button
        style={{
          backgroundColor: "transparent",
          height: "50px",
          width: "50%",
          borderRadius: "50%",
          float: "left",
          border: 0,
        }}
        onClick={showDrawer}
      >
        <Avatar size="large">
          <img src={userData?.profileImage} width="100%" />
        </Avatar>
      </Button>

      <Drawer
        style={{ backgroundColor: "#edeceb" }}
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <div style={{ display: "flex" }}>
          <Avatar size="large">
            <img src={userData?.profileImage} width="100%" />
          </Avatar>{" "}
          <div className="ms-2">
            <h5>{userData?.name}</h5>
            <p>{userData?.email}</p>
          </div>
        </div>
        <Card
          title= {t('General')}
          bordered={false}
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          <div style={{ display: "flex", width: "95%", margin: "10px" }}>
            <div>
              <EditOutlined
                style={{
                  border: "0px",
                  background: "rgba(1,1,1,.1)",
                  color: "#FFCD00",
                  borderRadius: "50%",
                  fontSize: "20px",
                  padding: "5px",
                }}
              />
            </div>
            <div style={{ marginLeft: "10px", flexGrow: 4 }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                Edit My Information
              </p>
              <p style={{ margin: 0, color: "rgba(1,1,1,.5)" }}>
                Change Name, phone, address
              </p>
            </div>
            <Button
              style={{
                alignItems: "flex-start",
                margin: 0,
                border: 0,
                boxShadow: "none",
              }}
              onClick={handleEditProfile}
            >
              <ArrowRightOutlined />
            </Button>
          </div>
          <div style={{ display: "flex", width: "95%", margin: "10px" }}>
            <div>
              <MailOutlined
                style={{
                  border: "0px",
                  background: "rgba(1,1,1,.1)",
                  color: "#FFCD00",
                  borderRadius: "50%",
                  fontSize: "20px",
                  padding: "5px",
                }}
              />
            </div>
            <div style={{ marginLeft: "10px", flexGrow: 4 }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>Change Email</p>
              <p style={{ margin: 0, color: "rgba(1,1,1,.5)" }}>
                Update your mail
              </p>
            </div>
            <Button
              style={{
                alignItems: "flex-start",
                margin: 0,
                border: 0,
                boxShadow: "none",
              }}
              onClick={handleAddress}
            >
              <ArrowRightOutlined />
            </Button>
          </div>
          <div style={{ display: "flex", width: "95%", margin: "10px" }}>
            <div>
              <LockOutlined
                style={{
                  border: "0px",
                  background: "rgba(1,1,1,.1)",
                  color: "#FFCD00",
                  borderRadius: "50%",
                  fontSize: "20px",
                  padding: "5px",
                }}
              />
            </div>
            <div style={{ marginLeft: "10px", flexGrow: 4 }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>Change Password</p>
              <p style={{ margin: 0, color: "rgba(1,1,1,.5)" }}>
                Update and strengthen account security
              </p>
            </div>
            <Button
              style={{
                alignItems: "flex-start",
                margin: 0,
                border: 0,
                boxShadow: "none",
              }}
              onClick={handleChangePassword}
            >
              <ArrowRightOutlined />
            </Button>
          </div>
          <div style={{ display: "flex", width: "95%", margin: "10px" }}>
            <div>
              <IdcardOutlined
                style={{
                  border: "0px",
                  background: "rgba(1,1,1,.1)",
                  color: "#FFCD00",
                  borderRadius: "50%",
                  fontSize: "20px",
                  padding: "5px",
                }}
              />
            </div>
            <div style={{ marginLeft: "10px", flexGrow: 4 }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>Delete Account </p>
              <p style={{ margin: 0, color: "rgba(1,1,1,.5)" }}>
                delete your account
              </p>
            </div>
            <Button
              style={{
                alignItems: "flex-start",
                margin: 0,
                border: 0,
                boxShadow: "none",
              }}
              onClick={() => showDeleteConfirm()}
            >
              <ArrowRightOutlined />
            </Button>
          </div>
        </Card>
        <Card
          title="Preferences"
          bordered={false}
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          <div style={{ display: "flex", width: "95%", margin: "10px" }}>
            <div>
              <NotificationOutlined
                style={{
                  border: "0px",
                  background: "rgba(1,1,1,.1)",
                  color: "#FFCD00",
                  borderRadius: "50%",
                  fontSize: "20px",
                  padding: "5px",
                }}
              />
            </div>
            <div style={{ marginLeft: "10px", flexGrow: 4 }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>Notification</p>
              <p style={{ margin: 0, color: "rgba(1,1,1,.5)" }}>
                Customize your notification preferences
              </p>
            </div>
            <Switch defaultChecked onChange={onChange} />{" "}
          </div>
          <div style={{ display: "flex", width: "95%", margin: "10px" }}>
            <div>
              <GlobalOutlined
                style={{
                  border: "0px",
                  background: "rgba(1,1,1,.1)",
                  color: "#FFCD00",
                  borderRadius: "50%",
                  fontSize: "20px",
                  padding: "5px",
                }}
              />
            </div>
            <div style={{ marginLeft: "10px", flexGrow: 2 }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>Language</p>
              <p style={{ margin: 0, color: "rgba(1,1,1,.5)" }}>
                Choose your language
              </p>
            </div>
            <Button
              style={{
                color: "#FFCD00",
                margin: 0,
                borderRadius: "50px",
                boxShadow: "none",
                width: "80px",
              }}
              onClick={() => changeLanguage('ar')}
            >
              {t('ar')}            </Button>
            <Button
              style={{
                backgroundColor: "#FFCD00",
                margin: 0,
                borderRadius: "50px",
                boxShadow: "none",
                width: "80px",
              }}
              onClick={() => changeLanguage('en')}
            >
              {t('en')}
            </Button>
          </div>
          <div style={{ display: "flex", width: "95%", margin: "10px" }}>
            <div>
              <StarOutlined
                style={{
                  border: "0px",
                  background: "rgba(1,1,1,.1)",
                  color: "#FFCD00",
                  borderRadius: "50%",
                  fontSize: "20px",
                  padding: "5px",
                }}
              />
            </div>
            <div style={{ marginLeft: "10px", flexGrow: 4 }}>
              <span style={{ margin: 0, fontWeight: "bold" }}>Rate us</span>
              <Rate />
            </div>
          </div>
          <div style={{ display: "flex", width: "95", margin: "10px" }}>
            <div>
              <LogoutOutlined
                style={{
                  border: "0px",
                  background: "rgba(1,1,1,.1)",
                  color: "#FFCD00",
                  borderRadius: "50%",
                  fontSize: "20px",
                  padding: "5px",
                }}
              />
            </div>
            <div style={{ marginLeft: "10px", flexGrow: 4 }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>Log out</p>
              <p style={{ margin: 0, color: "rgba(1,1,1,.5)" }}>
                Securely log out of Account
              </p>
            </div>
            <Button
              style={{
                alignItems: "flex-start",
                margin: 0,
                border: 0,
                boxShadow: "none",
              }}
              onClick={handleLogout}
            >
              <ArrowRightOutlined />
            </Button>
          </div>
        </Card>
        <Drawer
          title={message}
          width={320}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
          {editProfile ? (
            <EditProfile userData={userData} />
          ) : changePassword ? (
            <Changepassword userData={userData} />
          ) : address ? (
            <ChangeEmail userData={userData} />
          ) : (
            "nothing"
          )}
        </Drawer>
      </Drawer>
    </>
  );
};

export default App;
