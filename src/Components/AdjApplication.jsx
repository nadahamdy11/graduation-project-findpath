// eslint-disable-next-line no-unused-vars
import React from 'react'
import style from "../Styles/HomePage.module.css";
import img from "../Assets/mobile.png";
import google from "../Assets/google.png";
import "animate.css";
import {
    AppleOutlined
  } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';

export default function AdjApplication() {
  const { t, i18n } = useTranslation();

  return (
    <div className='container'>
    <div className="row">
        <div className="col-lg-5 col-sm-12 animate__animated animate__shakeY">
                <img src={img} alt="" className={style.mobile}/>
        </div>
        <div className="col-lg-5 col-sm-12">
            <h6 style={{marginTop:"20%"}}>{t('download')}</h6>
            <h1>{t('dow')} <span style={{color:"#FFCD00"}}>{t('app')}</span>{t('now')}</h1>
            <p>{t('search')}</p>
            <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "10px",
                  }}
                >
                  <button
                    style={{
                      width: "40%",
                      backgroundColor: "black",
                      color: "#F9F7F7",
                      borderRadius: "50px",
                      fontSize: "20px",
                      fontWeight: "lighter",
                      margin: 0,
                    }}
                  >
                    {" "}
                    <img
                      src={google}
                      alt=""
                      height="25px"
                      style={{ marginRight: "10px" }}
                    />
                    Google
                  </button>
                  <button
                    style={{
                      width: "40%",
                      backgroundColor: "black",
                      color: "#F9F7F7",
                      borderRadius: "50px",
                      fontSize: "20px",
                      fontWeight: "lighter",
                      margin: 0,
                    }}
                  >
              <AppleOutlined  style={{marginRight:"10px",fontSize:"20px",textAlign:"center"}}/>
                    Apple ID
                  </button>
                </div>
        </div> 
      </div>
    </div>
  )
}
