import React, { useState } from "react";
import Image from "next/image";
import { TCategory } from "@/schemas/category.schema";
import Link from "next/link";

interface CategoryListSectionProps {
  categoryList: TCategory[];
}

const CategoryListSection: React.FC<CategoryListSectionProps> = ({
  categoryList,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <div className="bg-white flex justify-center items-center">
      <div className="w-content large:px-0 medium:px-[2.5rem] px-[1.5rem] flex py-10 flex-col gap-10 max-large:w-full">
        <div className="grid grid-cols-1  gap-4">
          {categoryList.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div
                onClick={() => toggleCategory(category.id)}
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  {category.imageLink && (
                    <Image
                      src={category.imageLink}
                      alt={category.name}
                      width={50}
                      height={50}
                      className="mr-4 rounded-md"
                    />
                  )}
                  <Link
                    href={`categories/${category?.slug}`}
                    className="text-lg font-semibold text-webblack"
                  >
                    {category.name}
                  </Link>
                </div>
                <i
                  className={`fas fa-chevron-right text-webblack transition-transform ${
                    expandedCategory === category.id ? "rotate-90" : ""
                  }`}
                />
              </div>

              {expandedCategory === category.id && category.subcategories && (
                <div className="p-4 bg-gray-50 border-t">
                  <div className="grid max-small:grid-cols-1 grid-cols-2 gap-4">
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="bg-white p-3 rounded-md shadow-sm hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <Link
                          href={`/categories/${subcategory.slug}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          {subcategory.name}
                        </Link>
                        {subcategory.brand && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {subcategory.brand.map((brand) => (
                              <Link
                                href={`/brands/${brand.slug}`}
                                key={brand.id}
                                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                              >
                                {brand.name}
                              </Link>
                            ))}
                            {/* {subcategory.brand.length > 3 && (
                              <span className="text-xs text-webblack ml-1">
                                +{subcategory.brand.length - 3} more
                              </span>
                            )} */}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryListSection;
