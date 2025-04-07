import Footer from "@/components/footer";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import { LANDING } from "@/constants/images";
import React from "react";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <main>
        <Landing title="Contact Us" image={LANDING} />
        <div className="bg-white flex justify-center items-center">
          <div className="w-content large:px-0 medium:px-[2.5rem] px-[1.5rem] small:flex py-10 gap-10 max-large:w-full">
            <div className="flex-1 h-[300px] small:min-h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.6154053428645!2d85.33819799999999!3d27.698279300000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19007d05ceb5%3A0xc9d8d488ce8c8534!2sMobilemandu!5e0!3m2!1sen!2snp!4v1742488489297!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="flex-1 bg-white flex flex-col gap-8 max-small:pt-8">
              {/* <Heading title="Get In Touch" /> */}
              <div className="flex flex-col gap-3">
                <h1 className="font-medium text-xl text-primary">
                  Contact Details
                </h1>
                <div className="flex  items-center gap-2">
                  <i className="fa-solid fa-phone"></i>
                  <Link href="tel:+9779801104556">+9779801104556</Link>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-medium text-xl text-primary">Email Us</h2>
                <div className="flex  items-center gap-2">
                  <i className="fa-regular fa-envelope"></i>
                  <Link href="mailto:mobilemandu0@gmail.com">
                    mobilemandu0@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-medium text-xl text-primary">Address</h2>
                <div className="flex  items-center gap-2">
                  <i className="fa-solid fa-location-dot"></i>
                  Mid Baneshwor, Kathmandu, nepal
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-medium text-xl text-primary">Follow Us</h2>
                <div className="flex  items-center gap-5">
                  <Link
                    target="_blank"
                    href="https://facebook.com/themobilemandunepal"
                  >
                    <i className="text-3xl text-primary fa-brands fa-facebook"></i>
                  </Link>
                  <Link
                    target="_blank"
                    href="https://instagram.com/mobilemandunepal"
                  >
                    <i className="text-3xl text-primary fa-brands fa-instagram"></i>
                  </Link>
                  <Link target="_blank" href="https://tiktok.com/@mobilemandu">
                    <i className="text-3xl text-primary fa-brands fa-tiktok"></i>
                  </Link>
                  <Link
                    target="_blank"
                    href="https://www.youtube.com/@Mobilemandu-rp2fy"
                  >
                    <i className="text-3xl text-primary fa-brands fa-youtube"></i>
                  </Link>
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/company/mobilemandu/"
                  >
                    <i className="text-3xl text-primary fa-brands fa-linkedin-in"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default ContactUs;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Contact Us | ${SITE_NAME}`,
      url: `${SITE_URL}/contact`,
    },
  };
}
