import React, { useRef } from "react";
import Heading from "@/components/heading";
import CategoryCard from "@/components/category-card";
import { TCategory } from "@/schemas/category.schema";

interface CategoryProps {
  categoryList: TCategory[];
}

const CategoryListSection: React.FC<CategoryProps> = ({ categoryList }) => {
  return (
    <div className="bg-white flex justify-center items-center">
      <div className="w-content large:px-0 medium:px-[2.5rem] px-[1.5rem] flex py-10 flex-col gap-10 max-large:w-full">
        {/* <Heading title="Our Categorys" /> */}

        <div className="grid grid-cols-6 gap-4">
          {categoryList.map((category, i) => (
            <CategoryCard data={category} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryListSection;
