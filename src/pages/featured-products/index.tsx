import Footer from "@/components/footer";
import Heading from "@/components/heading";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";
import { SITE_NAME, SITE_URL } from "@/lib/config";

import { useAppDispatch, useAppSelector } from "@/redux/store";

import { getFeaturedProduct } from "@/redux/thunks/productThunk";
import { TProduct } from "@/schemas/product.schema";

import React, { useEffect } from "react";

const FeaturedProducts = () => {
  const dispatch = useAppDispatch();

  const productData = useAppSelector((state: any) => state.productState);

  useEffect(() => {
    dispatch(getFeaturedProduct({ page: 1, pageSize: 10000 }));
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <main>
        <div className="flex flex-col justify-center items-center py-10 bg-white relative">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
            <Heading title="Featured Products" />
            {productData?.loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : productData?.featuredProducts?.length > 0 ? (
              <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 gap-4">
                {productData?.featuredProducts?.map((product: TProduct) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-webblack text-lg">No products found</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FeaturedProducts;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Featured Products | ${SITE_NAME}`,
      url: `${SITE_URL}/featured-products`,
    },
  };
}
