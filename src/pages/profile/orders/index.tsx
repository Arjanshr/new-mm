import Footer from "@/components/footer";
import LandingPage from "@/components/landing";
import Navbar from "@/components/navbar";
import React from "react";

import { LANDING } from "@/constants/images";
import MyOrders from "./orders";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const MyOrderPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <LandingPage title="My Orders" image={LANDING} />
        <div className=" flex flex-col justify-center items-center py-10 bg-background">
          <div className="w-content medium:px-[2.5rem] large:px-0 px-[1.5rem] max-large:w-full">
            <MyOrders />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default MyOrderPage;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Orders | ${SITE_NAME}`,
      url: `${SITE_URL}/profile/orders`,
    },
  };
}
