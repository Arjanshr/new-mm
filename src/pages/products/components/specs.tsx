import UISelect from "@/components/ui/uiselect";
import { resetCompareProduct } from "@/redux/slice/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getProductCompareDetail,
  getProductDetail,
} from "@/redux/thunks/productThunk";
import { TProductDetail } from "@/schemas/product.schema";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";

interface SpecsProps {
  productDetail: TProductDetail;
}

const Specs: React.FC<SpecsProps> = ({ productDetail }) => {
  const dispatch = useAppDispatch();
  const productData = useAppSelector((state) => state.productState);
  const [compareProduct, setCompareProduct] = useState<number | null>(null);

  const fetchComparisonDetails = useCallback(() => {
    if (compareProduct) {
      dispatch(getProductDetail({ id: compareProduct }));
      dispatch(
        getProductCompareDetail({
          products: [productDetail.id, compareProduct],
        })
      );
    }
  }, [compareProduct, dispatch, productDetail.id]);

  useEffect(() => {
    fetchComparisonDetails();
  }, [fetchComparisonDetails]);

  const handleResetComparison = () => {
    dispatch(resetCompareProduct());
    setCompareProduct(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-lg font-semibold text-webblack">
          Product Specifications
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-primary text-base font-medium">Compare With:</h3>
          <UISelect
            placeholder="Choose a product for comparison"
            options={[
              {
                value: "",
                displayValue: "Choose a product for comparison",
              },
              ...(productData?.relatedProducts?.map((item) => ({
                value: item.id,
                displayValue: item.name,
                search: item.name,
              })) || []),
            ]}
            onChange={(e) => {
              if (e.target.value === "") {
                handleResetComparison();
              } else {
                dispatch(resetCompareProduct());
                setCompareProduct(Number(e.target.value));
              }
            }}
            style={{ width: "" }}
            showSearch
            defaultValue={compareProduct ? compareProduct.toString() : ""}
          />
        </div>
      </div>

      {compareProduct && !productData?.comaprisions && (
        <div className="flex justify-center items-center h-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {productData?.comaprisions ? (
        <div className="border rounded-lg overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                  Specification
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                  <div className="flex gap-4 items-center">
                    <div className="h-[50px] w-[50px] rounded-lg flex-shrink-0">
                      <Image
                        src={productDetail?.images[0]}
                        alt=""
                        height={1000}
                        width={1000}
                        unoptimized
                        className="h-full w-full object-contain rounded-lg"
                      />
                    </div>
                    {productDetail.name}
                  </div>
                </th>
                {compareProduct && (
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                    <div className="flex gap-4 items-center">
                      <div className="h-[50px] w-[50px] rounded-lg">
                        <Image
                          src={
                            productData?.compareProductDetail
                              ?.images?.[0] as string
                          }
                          alt=""
                          height={1000}
                          width={1000}
                          unoptimized
                          className="h-full w-full object-contain rounded-lg"
                        />
                      </div>
                      {productData?.compareProductDetail?.name}
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {Object.entries(productData.comaprisions).map(
                ([key, values]: any, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-700 border-b">
                      {key}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 border-b">
                      {values[productDetail.id] || "—"}
                    </td>
                    {compareProduct && (
                      <td className="py-3 px-4 text-sm text-gray-600 border-b">
                        {values[compareProduct] || "—"}
                      </td>
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                  Specification
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {productData?.specifications?.length > 0 ? (
                productData?.specifications?.map((spec, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-700 border-b">
                      {spec.key}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 border-b">
                      {spec.value}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="italic text-sm text-webblack p-4">
                    No Specifications Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Specs;
