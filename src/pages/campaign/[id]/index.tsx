import Footer from "@/components/footer";
import Heading from "@/components/heading";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";
import { useCountdown } from "@/hooks/useCountDown";
import { API_BASE_URL, SITE_NAME, SITE_URL } from "@/lib/config";

import { useAppDispatch, useAppSelector } from "@/redux/store";

import { getCampaignProduct } from "@/redux/thunks/productThunk";
import { TCampaign } from "@/schemas/campaign.schema";
import { TProduct } from "@/schemas/product.schema";
import axios from "axios";

import React, { useEffect, useState } from "react";

interface CampaignProductsProps {
  campaign: TCampaign;
}

const CampaignProducts: React.FC<CampaignProductsProps> = ({ campaign }) => {
  const dispatch = useAppDispatch();
  const productData = useAppSelector((state) => state.productState);

  const countdown = useCountdown(campaign?.end_date || "");

  useEffect(() => {
    campaign && dispatch(getCampaignProduct({ id: campaign?.id }));
  }, [dispatch, campaign]);

  return (
    <>
      <Navbar />

      <main>
        <div className="flex flex-col justify-center items-center py-10 bg-white relative">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-4">
            <Heading title={campaign?.name || "Featured Products"} />

            {campaign?.end_date && (
              <div className="w-full flex justify-center mb-6">
                <div className="bg-gray-100 rounded-lg p-4 text-center flex items-center gap-4">
                  <h3 className="text-sm font-medium">Expires In :</h3>
                  <div className="flex justify-center space-x-4">
                    <span className="text-sm font-bold text-primary">
                      {countdown.days} d
                    </span>

                    <span className="text-sm font-bold text-primary">
                      {countdown.hours} h
                    </span>

                    <span className="text-sm font-bold text-primary">
                      {countdown.minutes} m
                    </span>

                    <span className="text-sm font-bold text-primary">
                      {countdown.seconds} s
                    </span>
                  </div>
                </div>
              </div>
            )}

            {productData?.loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : productData?.campaignProducts?.length > 0 ? (
              <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 gap-4">
                {productData?.campaignProducts?.map((product: TProduct) => (
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

export default CampaignProducts;

export async function getServerSideProps(context: any) {
  try {
    const { id } = context?.query;
    const campaigns = await axios.get(`${API_BASE_URL}/campaigns/active`);
    const campaign = campaigns?.data?.data?.find(
      (campaign: TCampaign) => String(campaign.id) === id
    );

    return {
      props: {
        campaign: campaign || null,
        title: `${campaign?.name} | ${SITE_NAME}`,
        url: `${SITE_URL}/campaign/${id}`,
      },
    };
  } catch (error) {
    return {
      props: {
        campaign: null,
        url: `${SITE_URL}`,
      },
    };
  }
}
