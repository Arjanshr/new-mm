import React, { useRef } from "react";
import Heading from "@/components/heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { TProduct } from "@/schemas/product.schema";
import ProductCard from "@/components/product-card";
import UIButton from "@/components/ui/uibutton";

interface NewArrivalProps {
  productList: TProduct[];
}

const NewArrivalSection: React.FC<NewArrivalProps> = ({ productList }) => {
  const handleSwiperNavigation = (direction: "prev" | "next") => {
    const swiper = document.querySelector("#newArrivalSwiper") as any;
    if (swiper) {
      swiper.swiper?.[
        `slide${direction.charAt(0).toUpperCase() + direction.slice(1)}`
      ]();
    }
  };

  return (
    <div className="bg-background flex justify-center items-center">
      <div className="w-content large:px-0 medium:px-[2.5rem] px-[1.5rem] flex py-10 flex-col gap-10 max-large:w-full">
        <Heading title="Our New Arrivals" />

        <div className="relative flex items-center gap-2 w-full">
          <i
            className="fa-regular fa-chevron-left p-2 rounded-full bg-primary border border-white h-8 w-8 flex justify-center items-center text-sm text-white cursor-pointer absolute top-1/2 left-[-1%] transform -translate-y-1/2 z-10"
            onClick={() => handleSwiperNavigation("prev")}
          />

          <Swiper
            id="newArrivalSwiper"
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
              0: { slidesPerView: 1 },
              500: { slidesPerView: 1.5 },
              650: { slidesPerView: 2 },
              768: { slidesPerView: 2.2 },
              850: { slidesPerView: 2.5 },
              1000: { slidesPerView: 3 },
              1200: { slidesPerView: 3.5 },
              1300: { slidesPerView: 4 },
            }}
            className="w-full"
          >
            {productList.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard data={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          <i
            className="fa-regular fa-chevron-right p-2 rounded-full bg-primary border border-white h-8 w-8 flex justify-center items-center text-sm text-white cursor-pointer absolute top-1/2 right-[-1%] transform -translate-y-1/2 z-10"
            onClick={() => handleSwiperNavigation("next")}
          />
        </div>
        <div className="flex justify-center">
          <UIButton label="View All" type="secondary" href="/new-arrivals" />
        </div>
      </div>
    </div>
  );
};

export default NewArrivalSection;
