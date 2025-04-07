import Footer from "@/components/footer";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import { LANDING } from "@/constants/images";
import { API_BASE_URL, SITE_NAME, SITE_URL } from "@/lib/config";
import { TBrand } from "@/schemas/brand.schema";
import axios from "axios";
import React from "react";
import BrandListSection from "./list";
interface BrandsProps {
  brand: TBrand[];
}
const Brands: React.FC<BrandsProps> = ({ brand }) => {
  return (
    <>
      <Navbar />
      <main>
        <Landing title="Brands" image={LANDING} />
        {brand?.length > 0 && <BrandListSection brandList={brand} />}
        <Footer />
      </main>
    </>
  );
};

export default Brands;

export async function getServerSideProps() {
  try {
    const brands = await axios.get(`${API_BASE_URL}/brands`);
    return {
      props: {
        brand: brands?.data?.data || [],
        title: `Brands | ${SITE_NAME}`,
        url: `${SITE_URL}/brands`,
      },
    };
  } catch (error) {
    return {
      props: {
        brand: [],
        title: `Brands | ${SITE_NAME}`,
        url: `${SITE_URL}/brands`,
      },
    };
  }
}
