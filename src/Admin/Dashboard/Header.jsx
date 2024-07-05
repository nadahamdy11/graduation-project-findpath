import style from "../../Styles/SearchInput.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BarChart from "./Analytics";
import Shipments from "./Shipments";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../Styles/Admin/Dashboard.module.css";
import React, { useState,useEffect } from "react";
function Header() {
  const [userData, setUserData] = useState(() => { 
    const storedUser = localStorage.getItem("user"); 
    return storedUser ? JSON.parse(storedUser) : null; 
  });
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
  return (
    <div style={{ width: "95%", margin: "auto", marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
        className={styles.header}
      >
        <h6 style={{ padding: "20px" }} className={styles.h6}>
          Good Morning {userData.name}
        </h6>
        <button className={styles.button} onClick={window.print}>
          Download Report <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
      {/*     <Tabs
        defaultActiveKey="12Month"
        id="uncontrolled-tab-example"
        className="mb-3"
        fill
        style={{ width: "40%" }}
      >
        <Tab eventKey="12Month" title="12Month">
          <Shipments />
          <BarChart />
        </Tab>
        <Tab eventKey="30 DAYS" title="30 DAYS">
          Tab content for Profile
        </Tab>
        <Tab eventKey="7 DAYS" title="7 DAYS">
          Tab content for Profile
        </Tab>
        <Tab eventKey="24 HOURS" title="24 HOURS">
          Tab content for Profile
        </Tab>
      </Tabs> */}
    </div>
  );
}

export default Header;
