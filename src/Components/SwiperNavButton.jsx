import { faAngleRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useSwiper } from 'swiper/react';
import "../Styles/Reviews.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <div >
      <button  onClick={() => swiper.slideNext()}>Next<FontAwesomeIcon  icon={faAngleRight} /></button>
      <button  onClick={() => swiper.slidePrev()}><FontAwesomeIcon icon={faChevronLeft} /> Prev</button>
    </div>
  );
};