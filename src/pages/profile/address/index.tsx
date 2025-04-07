import Footer from "@/components/footer";
import LandingPage from "@/components/landing";
import Navbar from "@/components/navbar";
import React from "react";

import { LANDING } from "@/constants/images";
import MyAddress from "./address";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const Address = () => {
  return (
    <>
      <Navbar />
      <main>
        <LandingPage title="Address Book" image={LANDING} />
        <div className=" flex flex-col justify-center items-center py-10 bg-background">
          <div className="w-content medium:px-[2.5rem] large:px-0 px-[1.5rem] max-large:w-full">
            <MyAddress />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Address;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Address | ${SITE_NAME}`,
      url: `${SITE_URL}/profile/address`,
    },
  };
}
