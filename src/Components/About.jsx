import { Link } from "react-router-dom";
import style from "../Styles/About.module.css";
{/*images*/ }
import easy from "../Assets/easy.png";
import speed from "../Assets/speed.png";
import work from "../Assets/work.png";
import {
    PlusOutlined
} from "@ant-design/icons";
import { useTranslation } from 'react-i18next';


function About() {
    const { t, i18n } = useTranslation();

    return (
        <div className="container">
            <h4>          {t('servise')}            </h4>
            <div className={style.cards}>
                <div className={style.card1}>
                    <Link><img src={speed} className={style.workimg}/></Link>
                    <p className={style.easyp}>{t('shipment')} </p>
                </div>

                <div className={style.card1}>
                    <Link><img src={work} className={style.workimg} /></Link>
                    <p className={style.easyp}>{t('work')}</p>
                </div>

            </div>


            <div className="row justify-content-md-center">
                <div className="col-6 " style={{ fontSize: "20px", }}>
                    <div className={style.flex}>
                        <h1>150</h1>
                        <PlusOutlined className={style.plus} />
                    </div>
                    <h6>{t('happy')}</h6>
                </div>
                <div className="col-6" style={{ fontSize: "20px", }}>
                    <div className={style.flex}>
                        <h1>10</h1>
                        <PlusOutlined className={style.plus} />
                    </div>
                    <h6>{t('years')}</h6>
                </div>
            </div>
        </div>
    )
}
export default About;