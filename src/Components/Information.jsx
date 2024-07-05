/* eslint-disable react/no-unescaped-entities */
import style from "../Styles/information.module.css";
import Container from "react-bootstrap/Container";
import orderimg from "../Assets/order.png";
import trackimg from "../Assets/track.png";
import expressimg from "../Assets/express.png";
import { useTranslation } from 'react-i18next';

function information() {
  const { t, i18n } = useTranslation();

  return (
    <Container className={style.information}>
      <div className={style.Row}>
        <div className={style.order}>
          <img src={orderimg} />
          <h5>{t('order')}</h5>
          <p>
            {t('inform1')}
          </p>
        </div>

        <div className={style.track}>
          <img src={trackimg} />
          <h5>{t('track')}</h5>
          <p>
           {t('inform2')}
          </p>
        </div>

        <div className={style.express}>
          <img src={expressimg} />
          <h5>{t('express')}</h5>
          <p>
          {t('inform3')}

          </p>
        </div>
      </div>
    </Container>
  );
}
export default information;
