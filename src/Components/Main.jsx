import Col from "react-bootstrap/Col";
import style from "../Styles/HomePage.module.css";
import HomeImage from "../Assets/HomeImage.png";
import img from "../Assets/car.png";
import { Link } from "react-router-dom";
import "animate.css";
import { useTranslation } from 'react-i18next';

function Main() {

  const { t, i18n } = useTranslation();

  return (
    <main className="row m-0 pb-5 bg-white" >
      <div className=" col-md-6 ps-5 pe-5 pt-5 ">
        <img src={img} className="animate__animated animate__backInLeft" alt="" />
        <p
          className={style.title}
          style={{ fontSize: "calc(12px + 1vw)", fontWeight: "bold" }}
        >
          {t('welcome')}
        </p>
        <h1 style={{ fontSize: "calc(12px + 3vw)" }}>
        {t('content')}
        </h1>
        <p
          className={style.subtitle}
          style={{ fontSize: "calc(12px + 0.6vw)" }}
        >
          {t('homepargraph')}
          
        </p>
        <Link to="/startshipment" ><button className={style.btn}>{t('startbutton')}</button></Link>
      </div>
      
      <Col className=" col-md-6">
        <img src={HomeImage}  className="w-100 animate__animated  animate__backInRight" alt="" />
      </Col>

    </main>
  );
}

export default Main;
