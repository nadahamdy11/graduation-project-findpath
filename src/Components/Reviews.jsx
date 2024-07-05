import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

// Import Swiper styles
import { A11y, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { SwiperNavButtons } from "../Components/SwiperNavButton";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';

import "../Styles/Swiper.css";
export default function App() {
  const { t, i18n } = useTranslation();

  const Cards = [
    {
      img: "https://s3-alpha-sig.figma.com/img/36e5/1eb9/c427849b0511d93927e4fbb819b2ef49?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nxit6zJz7FpQwL10QpD8b4HCB2-pwP4g6jJ5oRAwweYR-rkGm-p~ZWMWKBOzydx-PAdT2oQd26w5hAyJk6mnimdfCLqHGlJvsQdgDRYhxPF6VK4ihGtrVfYaAcNxn5lp~RXs3iD6D0GzlocKUAe5y7TD-W5scZkkh-NmK0ZIY92Q72A6dlxHiPymjTdi86VeEx2~8~EjLDmApkzKxsHvEbliVHMMMuQnSWcQ4AVd0q~8jSahJl25erhpYO7yB7gi03Ub6BQchEMeOat6t5HiKK7Mc3V6WgXKqEtFCKZ51GWB-RUMXUiRNRsOTAUdJVhOt-b12mvGjCcW0dBXUH0KLg__",
      review:
      t('review1')    },
    {
      img: "https://s3-alpha-sig.figma.com/img/0b76/d48d/fc7bf6a75b1c5b0edbdca0cff9914c2f?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2ke4SCIP05TnK4fydW6wb604y4qLEe4SC-pXm0cLNleNV18s52SMrKEWbf02IAtcDhgeRCiv-XfGPUbMiv7~QkcUeMT42KJtnNpSnHQqpEQJ5wMu9dFUTuE2cXEpYr7LoQf8UFvwx2b7Nrs8jGCUCxIchh58In5Yxw75J7zm5mNkwViOqd7wJj9Gn6-AO7sKLnKPXVdB8JgYcWOy060B29SvjrPGTu0wcF1-NsoWmGv5ukqB28PhSjDfMyRE3RuYeVZj5rj~EdkgHfQfcPS4qQGVYa25UBDLuTqQPzxdyJ3-MLPkkv~C7yBxGQMKL0Cmsa~8ZUumyylxyp895s29g__",
      review:
      t('review2')    },
    {
      img: "https://s3-alpha-sig.figma.com/img/71ec/0063/28352849252b83cf32b9d753e53ac6d9?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NJr0-lodCHwK-eb5tNIzRfUI5YRAEbz0w-n9KkktgF9T8GsKdBY0AbVv4gonlru-Oi6NrzXEQ9BPmIrpIsiNvqfFf0Cg~4UwRkYFhUeVpc-60SCWaCMmfkgA2drsbieTXO7-jfpDN9ds5eQUY-5q5rA2T5OMTlbQjRUjB3-AcNQo0-bMQzYFlkrgOiW8frzgU8DGzJrzS0wFeUFByY~AkfPkH7nWjvZkSK-nDrTRsOPuWO6wi0Dq-eGbEOe9pEw2EUNaSAYdhmjcFoFBQfEJcW-vTTTjniZMtIy6ck7wTwO1ZNNvcksVMqDXJaWqf8SVtW4rwxJA~DNAEph~HahdLg__",
      review: t('review3')
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/0258/0d6c/73116cf478233ab6e24106d2d087127a?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XXw9oxaJxU-67S77CdFEgpkorvNA82CGbg~QazMZu4GCuAqFZE3CXORkv5a6ockLNMx1Amw39ZgyvBopjtxT5p8JV8PPB1nKz7YNz8MEZn69lKLLuC4JrKTT50NZ--ugt3KZqFotQVoqvtpumpizoReg4aOvpR~b8AbvCeFoxLhEU4qj5qM96UO1-knJBZwrPwGhn8RN-NJKReqY6OK8hsD50r59DyIU2evzoHVaynDjh5r5jo5qkEqEXMP3Nl41vm-c9nEDNTF5t5PMpgZaI7cDePbJ~8Nvlvn7-wk5PmTXDxdU~7zYTQxDYFAf4qAoScBm6b51MjkEgrfSKHHzIg__",
      review:t('review2')
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/0b76/d48d/fc7bf6a75b1c5b0edbdca0cff9914c2f?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2ke4SCIP05TnK4fydW6wb604y4qLEe4SC-pXm0cLNleNV18s52SMrKEWbf02IAtcDhgeRCiv-XfGPUbMiv7~QkcUeMT42KJtnNpSnHQqpEQJ5wMu9dFUTuE2cXEpYr7LoQf8UFvwx2b7Nrs8jGCUCxIchh58In5Yxw75J7zm5mNkwViOqd7wJj9Gn6-AO7sKLnKPXVdB8JgYcWOy060B29SvjrPGTu0wcF1-NsoWmGv5ukqB28PhSjDfMyRE3RuYeVZj5rj~EdkgHfQfcPS4qQGVYa25UBDLuTqQPzxdyJ3-MLPkkv~C7yBxGQMKL0Cmsa~8ZUumyylxyp895s29g__",
      review:
      t('review3') 
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/71ec/0063/28352849252b83cf32b9d753e53ac6d9?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NJr0-lodCHwK-eb5tNIzRfUI5YRAEbz0w-n9KkktgF9T8GsKdBY0AbVv4gonlru-Oi6NrzXEQ9BPmIrpIsiNvqfFf0Cg~4UwRkYFhUeVpc-60SCWaCMmfkgA2drsbieTXO7-jfpDN9ds5eQUY-5q5rA2T5OMTlbQjRUjB3-AcNQo0-bMQzYFlkrgOiW8frzgU8DGzJrzS0wFeUFByY~AkfPkH7nWjvZkSK-nDrTRsOPuWO6wi0Dq-eGbEOe9pEw2EUNaSAYdhmjcFoFBQfEJcW-vTTTjniZMtIy6ck7wTwO1ZNNvcksVMqDXJaWqf8SVtW4rwxJA~DNAEph~HahdLg__",
      review:t('review4')
    },
  ];
  return (
    <div >
      <h3 className="py-5">{t('review')} </h3>
      <Swiper
        slidesPerView={1}
        slidesPerGroupAuto= {true}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
            
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
        modules={[Navigation, Pagination, A11y]}
        className="mySwiper pt-5 "
      >
        <SwiperSlide className="ms-4">
          {" "}
          <ReviewCard image={Cards[0].img}>{Cards[0].review}</ReviewCard>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <ReviewCard image={Cards[1].img}>{Cards[1].review}</ReviewCard>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <ReviewCard image={Cards[2].img}>{Cards[2].review}</ReviewCard>
        </SwiperSlide>
        <SwiperSlide>
        
          {" "}
          <ReviewCard image={Cards[3].img}>{Cards[3].review}</ReviewCard>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <ReviewCard image={Cards[4].img}>{Cards[4].review}</ReviewCard>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <ReviewCard image={Cards[5].img}>{Cards[5].review}</ReviewCard>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <ReviewCard image={Cards[0].img}>{Cards[0].review}</ReviewCard>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <ReviewCard image={Cards[1].img}>{Cards[1].review}</ReviewCard>
        </SwiperSlide>
        <SwiperNavButtons />
      </Swiper>
    </div>
  );
}
