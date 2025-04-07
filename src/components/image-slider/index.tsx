import React from "react";
import Image from "next/image";
import Link from "next/link";
import useImageSlider from "@/hooks/useImageSlider";
import { TSlider } from "@/schemas/slider.schema";

interface ImageSliderProps {
  images: TSlider[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showPagination?: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  showPagination = true,
}) => {
  const { currentSlide, handleNext, handlePrev, goToSlide } = useImageSlider({
    length: images.length,
    autoPlay,
    autoPlayInterval,
  });

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images?.map((value, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <Link href={value?.link_url || "#"} className="h-full w-full">
                <Image
                  loading="eager"
                  src={`${value?.imageLink}`}
                  width={1000}
                  height={1000}
                  alt={"Slide Image"}
                  className="object-contain w-full"
                  unoptimized
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <i
        onClick={handlePrev}
        className="fa-regular fa-chevron-left rounded-full bg-white border-[1px] border-[#B4BEC8] h-[30px] w-[30px] flex justify-center items-center text-sm text-[#37383a] font-extrabold  cursor-pointer absolute large:left-[8%] small:left-[4%] left-[3%]  top-[43%] z-10 shadow-shadow"
      ></i>
      <i
        onClick={handleNext}
        className="fa-regular fa-chevron-right rounded-full bg-white border-[1px] border-[#B4BEC8] h-[30px] w-[30px] flex justify-center items-center text-sm text-[#37383a]  font-extrabold  cursor-pointer absolute large:right-[8%] small:right-[4%] right-[3%]  top-[43%] z-10 shadow-shadow"
      ></i>

      {/* Pagination */}
      {showPagination && (
        <div className="flex justify-center mt-4 space-x-2 absolute bottom-[2%] w-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full ${
                currentSlide === index ? "bg-primary" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
