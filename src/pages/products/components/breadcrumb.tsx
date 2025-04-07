import Link from "next/link";
import React from "react";
interface BreadcrumbProps {
  title: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
  return (
    <div className="bg-white flex justify-center items-center">
      <div className="w-content large:px-0 medium:px-[2.5rem] px-[1.5rem] py-4 max-large:w-full">
        <div className="flex gap-4 items-center text-webblack text-base font-medium">
          <Link href="/">Home</Link>
          <i className="fa-solid fa-greater-than text-xs"></i>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
