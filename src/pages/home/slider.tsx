import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

import { WEBSITE_BASE_URL } from "@/lib/config";
import { TSlider } from "@/schemas/slider.schema";

interface SliderProps {
  sliderList: TSlider[];
}
const Slider: React.FC<SliderProps> = ({ sliderList }) => {
  return (
    Array.isArray(sliderList) &&
    sliderList?.length > 0 && (
      <div className="w-full relative ">
        <Swiper
          // cssMode
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerGroup={1}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          loop
          observer
          observeParents
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="w-full  shadow-slider landingSlider"
        >
          {sliderList.map((value, i) => (
            <SwiperSlide key={i} className="h-full w-full relative">
              <Image
                loading="lazy"
                alt="slider"
                width={1000}
                height={1000}
                quality={100}
                unoptimized
                src={`${value?.imageLink}`}
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
          <i className="swiper-button-prev-custom fa-regular fa-chevron-left rounded-full bg-white border-[1px] border-[#B4BEC8] h-[30px] w-[30px] flex justify-center items-center text-sm text-[#37383a] font-extrabold  cursor-pointer absolute top-[45%] left-[10%] z-10 shadow-shadow"></i>
          <i className="swiper-button-next-custom fa-regular fa-chevron-right rounded-full bg-white border-[1px] border-[#B4BEC8] h-[30px] w-[30px] flex justify-center items-center text-sm text-[#37383a]  font-extrabold  cursor-pointer absolute top-[45%] right-[10%] z-10 shadow-shadow"></i>
        </Swiper>
      </div>
    )
  );
};

export default Slider;
