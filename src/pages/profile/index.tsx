import Footer from "@/components/footer";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import { LANDING } from "@/constants/images";
import React from "react";
import MyProfile from "./profile";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const Profile = () => {
  return (
    <>
      <Navbar />
      <main>
        <Landing title="My Profile" image={LANDING} />
        <div className=" flex flex-col justify-center items-center py-10 bg-background">
          <div className="w-content medium:px-[2.5rem] large:px-0 px-[1.5rem] max-large:w-full">
            <MyProfile />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Profile;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Profile | ${SITE_NAME}`,
      url: `${SITE_URL}/profile`,
    },
  };
}
