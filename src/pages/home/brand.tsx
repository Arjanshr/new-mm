import React, { useRef } from "react";
import Heading from "@/components/heading";
import BrandCard from "@/components/brand-card";
import { TBrand } from "@/schemas/brand.schema";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface BrandProps {
  brandList: TBrand[];
}

const BrandSection: React.FC<BrandProps> = ({ brandList }) => {
  const handleSwiperNavigation = (direction: "prev" | "next") => {
    const swiper = document.querySelector("#brandSwiper") as any;
    if (swiper) {
      swiper.swiper?.[
        `slide${direction.charAt(0).toUpperCase() + direction.slice(1)}`
      ]();
    }
  };

  return (
    <div className="bg-background flex justify-center items-center">
      <div className="w-content large:px-0 medium:px-[2.5rem] px-[1.5rem] flex py-10 flex-col gap-10 max-large:w-full">
        <Heading title="Our Brands" />

        <div className="relative flex items-center gap-2 w-full">
          <i
            className="fa-regular fa-chevron-left p-2 rounded-full bg-primary border border-white h-8 w-8 flex justify-center items-center text-sm text-white cursor-pointer absolute top-1/2 left-[-1%] transform -translate-y-1/2 z-10"
            onClick={() => handleSwiperNavigation("prev")}
          />

          <Swiper
            id="brandSwiper"
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerGroup={1}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 2 },
              650: { slidesPerView: 3 },
              900: { slidesPerView: 4 },
              1100: { slidesPerView: 5 },
              1250: { slidesPerView: 6 },
            }}
            className="w-full"
          >
            {brandList.map((brand, index) => (
              <SwiperSlide key={index}>
                <BrandCard data={brand} />
              </SwiperSlide>
            ))}
          </Swiper>

          <i
            className="fa-regular fa-chevron-right p-2 rounded-full bg-primary border border-white h-8 w-8 flex justify-center items-center text-sm text-white cursor-pointer absolute top-1/2 right-[-1%] transform -translate-y-1/2 z-10"
            onClick={() => handleSwiperNavigation("next")}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
