import Footer from "@/components/footer";
import LandingPage from "@/components/landing";
import Navbar from "@/components/navbar";
import React from "react";
import ChangePasswordPage from "./password";
import { LANDING } from "@/constants/images";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const ChangePassword = () => {
  return (
    <>
      <Navbar />
      <main>
        <LandingPage title="Change Password" image={LANDING} />
        <div className=" flex flex-col justify-center items-center py-10 bg-background">
          <div className="w-content medium:px-[2.5rem] large:px-0 px-[1.5rem] max-large:w-full">
            <ChangePasswordPage />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default ChangePassword;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Change Password | ${SITE_NAME}`,
      url: `${SITE_URL}/profile/changepassword`,
    },
  };
}
