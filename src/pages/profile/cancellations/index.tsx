import Footer from "@/components/footer";
import LandingPage from "@/components/landing";
import Navbar from "@/components/navbar";
import React from "react";

import { LANDING } from "@/constants/images";
import MyCancellations from "./cancellations";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const MyCancellationPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <LandingPage title="My Orders" image={LANDING} />
        <div className=" flex flex-col justify-center items-center py-10 bg-background">
          <div className="w-content medium:px-[2.5rem] large:px-0 px-[1.5rem] max-large:w-full">
            <MyCancellations />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default MyCancellationPage;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Cancellations | ${SITE_NAME}`,
      url: `${SITE_URL}/profile/cancellations`,
    },
  };
}
