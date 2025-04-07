import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface Landingprops {
  title: string;
  image: string | StaticImageData;
}
const Landing: React.FC<Landingprops> = ({ title, image }) => {
  return (
    <div className="relative">
      <div className="w-full h-[300px]  bg-black">
        <Image
          className="w-full h-full object-cover absolute opacity-30 bg-black"
          src={image}
          alt="AboutusLanding"
          unoptimized
        />
      </div>
      <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center text-center">
        <h2
          className="text-4xl max-small:text-[3xl] text-white font-semibold flex justify-center items-center"
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          {title}
        </h2>
        <div className="flex gap-4 items-center text-secondary font-semibold text-base">
          <Link href="/">Home</Link>
          <i className="fa-solid fa-greater-than text-xs"></i>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
