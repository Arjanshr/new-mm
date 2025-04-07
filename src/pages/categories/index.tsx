import Footer from "@/components/footer";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import { LANDING } from "@/constants/images";
import { API_BASE_URL, SITE_NAME, SITE_URL } from "@/lib/config";
import { TCategory } from "@/schemas/category.schema";
import axios from "axios";
import React from "react";
import CategoryListSection from "./list";
interface CategoriesProps {
  category: TCategory[];
}
const Categories: React.FC<CategoriesProps> = ({ category }) => {
  return (
    <>
      <Navbar />
      <main>
        <Landing title="Categories" image={LANDING} />
        {category?.length > 0 && (
          <CategoryListSection categoryList={category} />
        )}
        <Footer />
      </main>
    </>
  );
};

export default Categories;

export async function getServerSideProps() {
  try {
    const categories = await axios.get(`${API_BASE_URL}/categories`);
    return {
      props: {
        category: categories?.data?.data || [],
        title: `Categories | ${SITE_NAME}`,
        url: `${SITE_URL}/categories`,
      },
    };
  } catch (error) {
    return {
      props: {
        category: [],
        title: `Categories | ${SITE_NAME}`,
        url: `${SITE_URL}/categories`,
      },
    };
  }
}
