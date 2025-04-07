import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import axios from "axios";
import { API_BASE_URL, SITE_NAME } from "@/lib/config";
import { TSlider } from "@/schemas/slider.schema";
import ImageSlider from "@/components/image-slider";
import BrandSection from "./home/brand";
import { TBrand } from "@/schemas/brand.schema";
import { TPopup } from "@/schemas/popup.schema";
import UIModal from "@/components/ui/uimodal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TCategory } from "@/schemas/category.schema";
import CategorySection from "./home/category";
import NewArrivalSection from "./home/new-arrival";
import { TProduct } from "@/schemas/product.schema";
import FeaturedSection from "./home/featured";
import PopularSection from "./home/popular";
import { TCampaign } from "@/schemas/campaign.schema";
import CampaignSection from "./home/campaign";
import BannerSection from "./home/banners";

interface HomeProps {
  slider: TSlider[];
  banners: TSlider[];
  brand: TBrand[];
  category: TCategory[];
  newArrivals: TProduct[];
  featuredProducts: TProduct[];
  popularProducts: TProduct[];
  popUp: TPopup | null;
  campaigns: TCampaign[];
}

export default function Home({
  slider,
  brand,
  popUp,
  category,
  newArrivals,
  featuredProducts,
  banners,
  popularProducts,
  campaigns,
}: HomeProps) {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);

  useEffect(() => {
    if (popUp && popUp.is_active) {
      const hasSeenPopup =
        typeof window !== "undefined" &&
        localStorage.getItem("mobilemanduhasSeenPopup");
      if (!hasSeenPopup) {
        setShowPopUpModal(true);
        typeof window !== "undefined" &&
          localStorage.setItem("mobilemanduhasSeenPopup", "true");
      }
    }
  }, [popUp]);

  return (
    <>
      <Navbar />

      <main>
        {slider?.length > 0 && (
          <ImageSlider
            images={slider?.sort((a, b) => a.display_order - b.display_order)}
            autoPlay={true}
            autoPlayInterval={10000}
            showPagination={true}
          />
        )}
        {category?.length > 0 && <CategorySection categoryList={category} />}
        {banners?.length > 0 && <BannerSection bannerList={banners} />}
        {campaigns?.length > 0 &&
          campaigns?.map((value, i) => (
            <CampaignSection productList={value} key={i} />
          ))}
        {featuredProducts?.length > 0 && (
          <FeaturedSection productList={featuredProducts} />
        )}

        {newArrivals?.length > 0 && (
          <NewArrivalSection productList={newArrivals} />
        )}
        {popularProducts?.length > 0 && (
          <PopularSection productList={popularProducts} />
        )}

        {brand?.length > 0 && <BrandSection brandList={brand} />}
        <Footer />
        {showPopUpModal && popUp && (
          <UIModal showAnimation onClose={() => setShowPopUpModal(false)}>
            <div className="h-auto w-[450px]">
              <Image
                loading="eager"
                src={popUp?.image_url}
                alt="popup-image"
                unoptimized
                width={1000}
                height={1000}
                className="h-full w-full object-contain"
              />
            </div>
          </UIModal>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const popUp = await axios.get(`${API_BASE_URL}/popup-banner`);
    const sliders = await axios.get(`${API_BASE_URL}/sliders`);
    const banners = await axios.get(`${API_BASE_URL}/banners`);

    const brands = await axios.get(`${API_BASE_URL}/brands`);
    const categories = await axios.get(`${API_BASE_URL}/categories`);
    const newArrivals = await axios.get(
      `${API_BASE_URL}/content/new-arriavals/20`
    );
    const featuredProducts = await axios.get(
      `${API_BASE_URL}/content/featured-products/20`
    );
    const popularProducts = await axios.get(
      `${API_BASE_URL}/content/popular-products/20`
    );

    const campaignsResponse = await axios.get(
      `${API_BASE_URL}/campaigns/active`
    );

    const campaigns = await Promise.all(
      campaignsResponse.data.data.map(async (campaign: any) => {
        try {
          const productsResponse = await axios.get(
            `${API_BASE_URL}/campaign_products/${campaign.id}`
          );

          return {
            ...campaign,
            products: productsResponse.data.data || [],
          };
        } catch (error) {
          return {
            ...campaign,
            products: [],
          };
        }
      })
    );

    return {
      props: {
        slider: sliders?.data?.data || [],
        banners: banners?.data?.data || [],

        brand: brands?.data?.data || [],
        category: categories?.data?.data || [],
        newArrivals: newArrivals?.data?.data?.data || [],
        featuredProducts: featuredProducts?.data?.data?.data || [],
        popularProducts: popularProducts?.data?.data?.data || [],
        popUp: popUp?.data?.data || null,
        campaigns: campaigns || [],
        title: `Best Online Electronics Store in Nepal | ${SITE_NAME}`,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        slider: [],
        banners: [],
        brand: [],
        category: [],
        newArrivals: [],
        featuredProducts: [],
        popularProducts: [],
        popUp: null,
        campaigns: [],
        title: `Best Online Electronics Store in Nepal | ${SITE_NAME}`,
      },
    };
  }
}
