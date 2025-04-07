import Footer from "@/components/footer";
import Heading from "@/components/heading";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import { LANDING } from "@/constants/images";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import React from "react";

const TermsandConditions = () => {
  return (
    <>
      <Navbar />
      <main>
        <Landing title="Terms and Conditions" image={LANDING} />
        <div className="flex flex-col justify-center items-center py-10 bg-background">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
            {/* <Heading title="Terms and Conditions" /> */}
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <h2 className="text-primary font-semibold text-2xl">
                  1. Introduction
                </h2>
                <p className="pt-1">
                  Welcome to Mobilemandu. By accessing and using mobilemandu.com
                  (the &quot;Site&quot;), you agree to be bound by these Terms
                  and Conditions. If you do not agree, please do not use the
                  Site. We reserve the right to change these terms at any time.
                  Continued use of the Site signifies your acceptance of any
                  updated terms.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-primary font-semibold text-2xl">
                  2. Conditions of Use
                </h2>
                <p className="pt-1">
                  A. Your Account <br />
                  To access certain features, you may need to register an
                  account. You are responsible for maintaining the
                  confidentiality of your account and password. Mobilemandu
                  reserves the right to terminate accounts without prior notice
                  if any suspicious activity is detected.
                </p>
                <p className="pt-3">
                  B. Privacy <br />
                  Your personal information is handled in accordance with our
                  Privacy Policy. By using the Site, you consent to the
                  collection and use of your data.
                </p>
                <p className="pt-3">
                  C. Communication <br />
                  By using this Site, you agree to receive electronic
                  communications from us. These communications may include
                  updates, promotions, and order-related information. Your
                  personal information is handled in accordance with our Privacy
                  Policy. By using the Site, you consent to the collection and
                  use of your data.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-primary font-semibold text-2xl">
                  3. Conditions of Sale
                </h2>
                <p className="pt-1">
                  By placing an order, you agree to purchase the product for
                  personal use only and not for resale. Orders may be canceled
                  if quantities exceed typical household needs.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-primary font-semibold text-2xl">
                  4. Return Policies
                </h2>
                <ul
                  className="pt-3"
                  style={{
                    listStyleType: "disc",
                    paddingLeft: "20px",
                    margin: "0",
                  }}
                >
                  <li>
                    If the delivered product is damaged, incomplete, or
                    incorrect, please request a return within 24 hours of
                    delivery.
                  </li>
                  <li>
                    Returns are accepted for select categories if the product
                    does not match your expectations.
                  </li>
                  <li>
                    If issues arise after use, please refer to the warranty
                    terms provided by the manufacturer.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-primary font-semibold text-2xl">
                  5. Intellectual Property
                </h2>
                <p className="pt-1">
                  All content on the Site, including text, graphics, logos, and
                  software, is protected by copyright and trademark laws.
                  Unauthorized use is strictly prohibited.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-primary font-semibold text-2xl">
                  6. Governing Law{" "}
                </h2>
                <p className="pt-1">
                  These terms are governed by the laws of the Federal Democratic
                  Republic of Nepal. Any disputes will be resolved under the
                  jurisdiction of Nepalese courts.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default TermsandConditions;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Terms & Conditions | ${SITE_NAME}`,
      url: `${SITE_URL}/termsAndConditions`,
    },
  };
}
