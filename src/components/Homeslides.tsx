import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi';

const Homeslides = () => {
  return (
    <div>
      <Swiper
        className='relative group'
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: '.button-next-slie',
          prevEl: '.button-prev-slie',
        }}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, // Keep autoplay after user interaction
        }}
        loop={true} // Enable loop
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

        <div className='top-[50%] absolute z-10 button-next-slie group-hover:left-0 -left-[23rem] duration-500 text-white w-[40px] h-[40px] bg-black grid place-items-center'>
          <HiArrowSmLeft />
        </div>
        <div className='top-[50%] absolute z-10 button-prev-slie text-white group-hover:right-0 -right-[23rem] duration-500 w-[40px] h-[40px] bg-black grid place-items-center'>
          <HiArrowSmRight />
        </div>
      </Swiper>
    </div>
  );
}

export default Homeslides;
