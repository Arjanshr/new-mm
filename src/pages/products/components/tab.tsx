import UITab from "@/components/ui/uitab";
import { TProductDetail } from "@/schemas/product.schema";
import React, { useState } from "react";
import Specs from "./specs";
import { useAppSelector } from "@/redux/store";
interface ProductTabProps {
  product: TProductDetail;
}
const ProductTab: React.FC<ProductTabProps> = ({ product }) => {
  const productData = useAppSelector((state) => state.productState);
  const [panel, setPanel] = useState<
    "Description" | "Specifications" | "Features"
  >("Specifications");
  return (
    <div className="flex flex-col justify-center items-center py-10 ">
      <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-4">
        <div className="w-full overflow-auto pb-4">
          <UITab
            items={[
              {
                name: "Specifications",
                action: () => setPanel("Specifications"),
                active: panel === "Specifications",
              },
              {
                name: "Description",
                action: () => setPanel("Description"),
                active: panel === "Description",
              },

              {
                name: "Features",
                action: () => setPanel("Features"),
                active: panel === "Features",
              },
            ]}
          />
        </div>
        {panel === "Description" && (
          <div
            className=" text-base text-webblack"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        )}
        {panel === "Specifications" && <Specs productDetail={product} />}

        {panel === "Features" && (
          <div
            className=" text-base text-webblack"
            dangerouslySetInnerHTML={{
              __html: productData?.features?.[0]?.[0],
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductTab;
