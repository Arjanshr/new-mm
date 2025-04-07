import Footer from "@/components/footer";
import LandingPage from "@/components/landing";
import Navbar from "@/components/navbar";
import React from "react";

import { LANDING } from "@/constants/images";
import MyWishlists from "./wishlists";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const MyWishlistPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <LandingPage title="My Wishlist" image={LANDING} />
        <div className=" flex flex-col justify-center items-center py-10 bg-background">
          <div className="w-content medium:px-[2.5rem] large:px-0 px-[1.5rem] max-large:w-full">
            <MyWishlists />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default MyWishlistPage;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Wishlist | ${SITE_NAME}`,
      url: `${SITE_URL}/profile/wishlist`,
    },
  };
}
