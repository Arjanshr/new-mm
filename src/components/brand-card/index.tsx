import { TBrand } from "@/schemas/brand.schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface BrandCardProps {
  data: TBrand;
}
const BrandCard: React.FC<BrandCardProps> = ({ data }) => {
  return (
    <div className="shadow-lg rounded-lg h-auto cursor-pointer bg-white overflow-hidden">
      <Link
        href={`/brands/${data.slug}`}
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
            alt="caimg"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="text-webblack text-base capitalize leading-normal font-semibold overflow-hidden">
          {data.name}
        </div>
      </Link>
    </div>
  );
};

export default BrandCard;
