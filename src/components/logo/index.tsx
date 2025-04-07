import { LOGO } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex gap-0 items-center">
      <div className="h-[3rem] w-fit">
        <Image
          src={LOGO}
          alt="mobilemandu-log"
          unoptimized
          className="h-full w-full object-contain"
        />
      </div>
      <h1 className="text-xl font-medium">
        <span className="text-primary">mobile</span>mandu
      </h1>
    </Link>
  );
};

export default Logo;
