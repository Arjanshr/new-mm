import Footer from "@/components/footer";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import { LANDING } from "@/constants/images";
import React from "react";
import CartList from "./cart";
import Heading from "@/components/heading";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const Cart = () => {
  return (
    <>
      <Navbar />
      <main>
        <Landing title="Cart" image={LANDING} />
        {/* <Heading title="My Cart" /> */}
        <CartList />
        <Footer />
      </main>
    </>
  );
};

export default Cart;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Cart | ${SITE_NAME}`,
      url: `${SITE_URL}/cart`,
    },
  };
}
