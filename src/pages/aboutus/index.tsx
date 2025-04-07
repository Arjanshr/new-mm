import Footer from "@/components/footer";
import Heading from "@/components/heading";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import { LANDING } from "@/constants/images";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import React from "react";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <main>
        <Landing title="About Us" image={LANDING} />
        {/*  1*/}
        <div className="flex flex-col justify-center items-center py-10 bg-white">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
            <Heading title="Welcome to Mobilemandu" />
            <p className="flex justify-center max-small:text-center">
              Looking for the latest gadgets, electronics, and home appliances
              in Nepal?
            </p>
          </div>
        </div>

        {/* 2 */}
        <div className="flex flex-col justify-center items-center py-10 bg-background">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
            <Heading title="Greetings from Mobilemandu" />
            <p className="flex flex-col justify-center gap-5">
              <span>
                The ultimate destination for electronics, home appliances, and
                gadgets. We take great pride in providing a wide selection of
                products, an effortless online shopping experience, excellent
                customer support, and a safe online shopping environment.
              </span>
              <span>
                We&apos;re aware of it. It can be a little challenging to find
                the best online electronics store in Nepal. You must compare
                costs in this crowded shopping environment and expect to find
                the best offer. At Mobilemandu, we&apos;re dedicated to giving
                our clients the greatest possible purchasing experiences at the
                lowest prices.
              </span>
            </p>
          </div>
        </div>

        {/* 3 */}
        <div className="flex flex-col justify-center items-center py-10 bg-white">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
            <Heading title="Why Mobilemandu?" />
            <p className="flex justify-center">
              Since the experience is as vital as the product itself, we at
              Mobilemandu place the utmost importance on quality and
              authenticity. In addition to superior products from trusted
              brands, we offer an easy and effortless shopping experience.
              We&apos;ve partnered with leading brands to provide you authentic
              items, so you can buy with confidence.
            </p>
          </div>
        </div>

        {/* 4 */}
        <div className="flex flex-col justify-center items-center py-10 bg-background">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
            <Heading title="Start Your Shopping Today!" />
            <p className="flex justify-center">
              Shop today and experience the difference. Shop from top brands you
              trust, all in one place.
            </p>
          </div>
        </div>

        {/* 5 */}
        <div className="flex flex-col justify-center items-center py-10 bg-white">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
            <Heading title="Nationwide Delivery" />
            <p className="flex justify-center">
              Enjoy your shopping through Your Trusted Online Electronics Store
              in Nepal, without leaving the comfort of your home. We deliver
              your order directly to your location, no matter where you are in
              Nepal. Simply choose what you want to buy from our website, and
              we&apos;ll deliver it right to your door.
            </p>
          </div>
        </div>

        {/* 6 */}
        <div className="flex flex-col justify-center items-center py-10 bg-background">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
            <Heading title="Excellent Customer Service" />
            <p className="flex justify-center">
              Our dedicated customer support team is always available to answer
              your questions and assist you with your orders.
            </p>
          </div>
        </div>

        {/* 7 */}
        <div className="flex flex-col justify-center items-center py-10 bg-white">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
            <Heading title="Hassle-Free Returns" />
            <p className="flex justify-center">
              Not satisfied with your purchase? We offer an easy return policy
              for your convenience, in the event that the product does not look
              or function as advertised.
            </p>
          </div>
        </div>

        {/* 8 */}
        <div className="flex flex-col justify-center items-center py-10 bg-background">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
            <Heading title="Convenient and Secure Shopping" />
            <p className="flex justify-center">
              You can easily browse items, compare characteristics, and make
              secure online payments with our user-friendly website without
              worrying about any security issues.
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default AboutUs;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `About Us | ${SITE_NAME}`,
      url: `${SITE_URL}/aboutus`,
    },
  };
}
