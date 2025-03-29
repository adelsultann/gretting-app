"use client"
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay } from 'swiper/modules';
import { FaStar } from 'react-icons/fa6';
import { testimonialData } from './Testimonial';
import ProfileImg from "@/public/user.png"; // Import ProfileImg
const Testimonials = () => {
  return (
    <div className="w-full h-full space-y-5 relative lg:px-24 md:px-16 sm:px-7 px-4 flex items-center justify-center flex-col">
      <div className="w-full py-2 flex justify-center">
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="mySwiper w-full max-w-xl p-1 ![&_.swiper-wrapper]:!ease-in-out ![&_.swiper-wrapper]:!duration-300"
        >
          {testimonialData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="w-full h-auto p-6 space-y-10 group bg-[#BFAFF2] rounded-xl border border-neutral-800/70 flex flex-col items-center text-center">
                <p className="text-black text-base font-normal max-w-xl">{item.desc}</p>
                <div className="w-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={ProfileImg.src}
                      alt={item.name}
                      className="w-12 h-12 object-center object-cover rounded-full border"
                    />
                    <div className="space-y-1 text-center">
                      <p className="text-black text-base font-semibold">{item.name}</p>
                     
                      
                      <div className="flex items-center justify-center gap-1  rounded-full px-2 py-1 mt-2">
                        <FaStar className="text-yellow-600 text-sm" />
                        <p className="text-xs ">{item.rating}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;