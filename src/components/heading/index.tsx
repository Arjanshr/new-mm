import React from "react";

interface HeadingProps {
  title: string;
  color?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, color }) => {
  return (
    <div
      className={`font-medium large:text-3xl text-2xl leading-8 text-center capitalize ${
        color ? "" : "text-webblack"
      }`}
      style={color ? { color } : {}}
    >
      <span className="inline-block pb-3 relative">
        {title}
        {!color && (
          <span className="absolute w-2/5 bottom-0 left-[30%] border-b-[1px] border-primary opacity-55 rounded-3xl"></span>
        )}
      </span>
    </div>
  );
};

export default Heading;
