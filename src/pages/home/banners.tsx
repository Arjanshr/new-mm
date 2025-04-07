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
import Heading from "@/components/heading";

interface BannerProps {
  bannerList: TSlider[];
}
const BannerSection: React.FC<BannerProps> = ({ bannerList }) => {
  return (
    <div className="bg-white flex justify-center items-center">
      <div className="w-content large:px-0 medium:px-[2.5rem] px-[1.5rem] flex py-10 flex-col gap-10 max-large:w-full">
        {/* <Heading title="Banners" /> */}

        <div className="grid large:grid-cols-2 gap-4 grid-cols-1">
          {bannerList.map((value, i) => (
            <Link
              href={`${value?.link_url ? value?.link_url : "#"}`}
              key={i}
              className="relative w-full rounded-lg overflow-hidden"
            >
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
