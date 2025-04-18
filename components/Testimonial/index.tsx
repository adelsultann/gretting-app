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
    
    
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          modules={[Autoplay]}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="w-full max-w-2xl p-1"
          
        >
          
          {testimonialData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="p-3 space-y-4 group bg-[#BFAFF2] rounded-xl border border-neutral-800/70 flex flex-col items-center text-center">

              
                <p className="text-black text-base font-bold">
                  {item.desc}</p>
                
                    <img
                      src={ProfileImg.src}
                      alt={item.name}
                      className="w-12 h-12 object-center object-cover rounded-full border"
                    />
                   
                      <p className="text-black text-base font-semibold">{item.name}</p>
                     
                      
                      <div className="flex items-center justify-center gap-1  rounded-full px-1 py-1 mt-1">
                        <FaStar className="text-yellow-600 text-sm" />
                        <p className="text-xs ">{item.rating}</p>
                      </div>
                    </div>
                 
               
             
            </SwiperSlide>
          ))}
        </Swiper>
     
   
  );
};

export default Testimonials;