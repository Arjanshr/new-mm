import { TCategory } from "@/schemas/category.schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryCardProps {
  data: TCategory;
  setHoveredCategory?: (category: TCategory | null) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  data,
  setHoveredCategory,
}) => {
  return (
    <div
      className="relative shadow-lg rounded-lg h-auto cursor-pointer bg-white overflow-hidden"
      // onMouseEnter={() => setHoveredCategory(data)}
      // onMouseLeave={() => setHoveredCategory(null)}
    >
      <Link
        href={`/categories/${data.slug}`}
        className="flex flex-col justify-between items-stretch bg-white shadow-product h-auto w-full p-4 text-center space-y-4 rounded-lg cursor-pointer scale-100 hover:scale-105 ease-in duration-500"
      >
        <div className="w-full h-[100px]">
          <Image
            loading="lazy"
            quality={100}
            unoptimized
            src={data.imageLink || "/images/noimg.png"}
            width={1000}
            height={1000}
            alt="category-image"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="text-webblack text-base capitalize leading-normal h-[45px] font-semibold overflow-hidden">
          {data.name}
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
