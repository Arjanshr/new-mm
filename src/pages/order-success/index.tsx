import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import UIButton from "@/components/ui/uibutton";
import { success } from "@/constants/images";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import Image from "next/image";
import React from "react";

const OrderSuccess = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex justify-center  bg-background py-10 px-[1.5rem]">
          <div className="flex flex-col gap-4  items-center p-8 bg-white shadow-lg text-center ">
            <div className="w-[5rem] h-[5rem]">
              <Image
                src={success}
                alt="success"
                className="h-full w-full"
                width={1000}
                height={100}
              />
            </div>
            <div className="font-semibold text-xl text-green-600">
              Order Successfull
            </div>
            <div className="text-center text-webblack">
              Thank you for choosing us
            </div>
            <UIButton
              label="Continue Shopping"
              type="primary"
              href="/new-arrivals"
            />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default OrderSuccess;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Order Success | ${SITE_NAME}`,
      url: `${SITE_URL}/order-success`,
    },
  };
}
