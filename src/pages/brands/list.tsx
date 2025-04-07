import React, { useRef } from "react";
import Heading from "@/components/heading";
import BrandCard from "@/components/brand-card";
import { TBrand } from "@/schemas/brand.schema";

interface BrandProps {
  brandList: TBrand[];
}

const BrandListSection: React.FC<BrandProps> = ({ brandList }) => {
  return (
    <div className="bg-white flex justify-center items-center">
      <div className="w-content large:px-0 medium:px-[2.5rem] px-[1.5rem] flex py-10 flex-col gap-10 max-large:w-full">
        {/* <Heading title="Our Brands" /> */}

        <div className="grid large:grid-cols-6 gap-4  medium:grid-cols-4 small:grid-cols-3 min-[900px]:grid-cols-5 grid-cols-2">
          {brandList.map((brand, i) => (
            <BrandCard data={brand} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandListSection;
