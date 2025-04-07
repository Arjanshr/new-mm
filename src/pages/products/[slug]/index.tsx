import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  API_BASE_URL,
  SITE_NAME,
  SITE_URL,
  WEBSITE_BASE_URL,
} from "@/lib/config";
import { TProductDetail } from "@/schemas/product.schema";
import axios from "axios";
import React, { useEffect } from "react";
import ProductDetail from "../components/detail";
import Breadcrumb from "../components/breadcrumb";
import ProductTab from "../components/tab";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getProductFeature,
  getProductReview,
  getProductSpecification,
  getRelatedProduct,
} from "@/redux/thunks/productThunk";
import RelatedProductSection from "../components/related-products";
import { resetProductPage } from "@/redux/slice/productSlice";

interface ProductDetailPageProps {
  productDetail: TProductDetail;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productDetail,
}) => {
  console.log(productDetail, "ppp");
  const dispatch = useAppDispatch();
  const productData = useAppSelector((state) => state.productState);
  useEffect(() => {
    if (productDetail) {
      dispatch(getProductSpecification({ id: productDetail.id }));
      dispatch(getProductFeature({ id: productDetail.id }));
      dispatch(getProductReview({ id: productDetail.id }));
      dispatch(getRelatedProduct({ id: productDetail.id }));
    }
    return () => {
      dispatch(resetProductPage());
    };
  }, [productDetail, dispatch]);
  return (
    <>
      <Navbar />
      <main>
        <Breadcrumb title={productDetail?.name} />
        <ProductDetail product={productDetail} />
        <ProductTab product={productDetail} />
        {productData?.relatedProducts?.length > 0 && <RelatedProductSection />}
        <Footer />
      </main>
    </>
  );
};

export default ProductDetailPage;

export async function getServerSideProps(context: any) {
  try {
    const { slug } = context?.query;
    const productDetail = await axios.get(
      `${API_BASE_URL}/product_detail/${slug}`
    );
    return {
      props: {
        productDetail: productDetail.data.data || null,
        title: `${productDetail?.data?.data?.name} | ${SITE_NAME}`,
        url: `${SITE_URL}/products/${slug}`,
        image: `${WEBSITE_BASE_URL}/${productDetail.data?.data?.imageLink}`,
      },
    };
  } catch (error) {
    return {
      props: {
        productDetail: null,
        url: `${SITE_URL}`,
      },
    };
  }
}
