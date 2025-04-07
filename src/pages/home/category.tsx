import React, { useRef, useState } from "react";
import Heading from "@/components/heading";
import CategoryCard from "@/components/category-card";
import { TCategory } from "@/schemas/category.schema";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

interface CategoryProps {
  categoryList: TCategory[];
}

const CategorySection: React.FC<CategoryProps> = ({ categoryList }) => {
  const [hoveredCategory, setHoveredCategory] = useState<TCategory | null>(
    null
  );
  const handleSwiperNavigation = (direction: "prev" | "next") => {
    const swiper = document.querySelector("#categorySwiper") as any;
    if (swiper) {
      swiper.swiper?.[
        `slide${direction.charAt(0).toUpperCase() + direction.slice(1)}`
      ]();
    }
  };

  return (
    <>
      <div className="bg-white flex justify-center items-center">
        <div className="w-content large:px-0 medium:px-[2.5rem] px-[1.5rem] flex py-10 flex-col gap-10 max-large:w-full">
          <Heading title="Our Categories" />

          <div className="relative flex items-center gap-2 w-full ">
            <i
              className="fa-regular fa-chevron-left p-2 rounded-full bg-primary border border-white h-8 w-8 flex justify-center items-center text-sm text-white cursor-pointer absolute top-1/2 left-[-1%] transform -translate-y-1/2 z-10"
              onClick={() => handleSwiperNavigation("prev")}
            />

            <Swiper
              id="categorySwiper"
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
              {categoryList.map((category, index) => (
                <SwiperSlide key={index}>
                  <CategoryCard
                    data={category}
                    setHoveredCategory={setHoveredCategory}
                  />
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
      {/* {hoveredCategory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[999999]"
          onClick={() => setHoveredCategory(null)}
        >
          <div
            className="bg-white shadow-lg rounded-lg p-6 w-[300px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-gray-700 mb-2">
              Subcategories
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              {hoveredCategory.subcategories &&
              hoveredCategory.subcategories.length > 0 ? (
                hoveredCategory.subcategories.map((sub) => (
                  <li key={sub.id} className="hover:text-primary">
                    <Link
                      href={`/categories/${sub.slug}`}
                      className="font-semibold"
                    >
                      {sub.name}
                    </Link>
                    {sub.brand && sub.brand.length > 0 && (
                      <ul className="ml-4 mt-1 text-xs text-gray-500 space-y-1">
                        {sub.brand.map((brand) => (
                          <li key={brand.id} className="hover:text-primary">
                            <Link href={`/brands/${brand.slug}`}>
                              • {brand.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No subcategories</li>
              )}
            </ul>
          </div>
        </div>
      )} */}
    </>
  );
};

export default CategorySection;
