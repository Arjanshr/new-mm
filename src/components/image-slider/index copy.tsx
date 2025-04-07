import React from "react";
import Image from "next/image";
import useImageSlider from "@/hooks/useImageSlider";
import { TSlider } from "@/schemas/slider.schema";

interface ImageSliderProps {
  images: TSlider[];
  autoPlay?: boolean; // Add an optional autoplay flag
  autoPlayInterval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoPlay,
  autoPlayInterval,
}) => {
  const { currentSlide, handleNext, handlePrev } = useImageSlider({
    length: images.length,
    autoPlay,
    autoPlayInterval,
  });

  return (
    <div className="relative w-full">
      <div className="overflow-hidden ">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images.map((image, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <Image
                src={`${image?.imageLink}`}
                width={1000}
                height={1000}
                alt={"Slide Image"}
                className="object-contain w-full"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
      <i
        onClick={handlePrev}
        className="fa-regular fa-chevron-left rounded-full bg-white border-[1px] border-[#B4BEC8] h-[30px] w-[30px] flex justify-center items-center text-sm text-[#37383a] font-extrabold  cursor-pointer absolute top-[30.5%] left-[1%] z-10 shadow-shadow"
      ></i>
      <i
        onClick={handleNext}
        className="fa-regular fa-chevron-right rounded-full bg-white border-[1px] border-[#B4BEC8] h-[30px] w-[30px] flex justify-center items-center text-sm text-[#37383a]  font-extrabold  cursor-pointer absolute top-[30.5%] right-[1%] z-10 shadow-shadow"
      ></i>
    </div>
  );
};

export default ImageSlider;
