import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Homeslides = () => {
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation]}
        autoplay={{
          delay: 3000, // Chuyển slide sau mỗi 3000 mili giây (3 giây)
        }}
      >
        <SwiperSlide>
          <div className="image">
            <img src="https://res.cloudinary.com/dndyxqosg/image/upload/v1695188550/z4710101523983_6628be7f39ed23ea61f8aa79ba0a08ab_up7x1f.jpg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image">
            <img src="https://res.cloudinary.com/dndyxqosg/image/upload/v1695359501/z4716280626807_a3f2538b67d8595f431405e84fd92d20_c9jsbn.jpg" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Homeslides;
