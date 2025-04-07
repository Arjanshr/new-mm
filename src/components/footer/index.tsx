import Link from "next/link";
import React from "react";
import Logo from "../logo";

const Footer = () => {
  return (
    <>
      <div className="flex justify-center items-center bg-white border-t-4 border-secondary  ">
        <footer className="w-content large:px-0 medium:px-[2.5rem] px-[1.5rem] max-large:w-full py-5 border-b-4 border-secondary">
          <div className="flex gap-10  large:gap-12 justify-between text-webblack py-7 flex-wrap max-[1200px]:flex-col max-[900px]:items-center ">
            <div className="flex flex-col flex-[1.3] gap-4 max-[1200px]:items-center justify-center">
              <Logo />
              <p className="text-base leading-6 text-justify">
                Mobilemandu serves as the premier destination for the best
                online electronics store in Nepal. Offering a vast array of
                electronic products, accessories, home appliances, and kids
                gadgets, we provide our clients with access to top-notch deals
                and an extensive catalogue. Explore our website to discover
                excellent products and unparalleled convenience for your online
                shopping needs
              </p>
            </div>
            <div className="flex flex-[3] gap-4 max-[900px]:items-center max-[900px]:flex-col max-large:gap-10">
              <div className="flex-1 flex flex-col w-full gap-4 max-[900px]:items-center ">
                <div className="text-xl font-semibold whitespace-nowrap">
                  Quick Links
                </div>
                <div className="text-base flex flex-col gap-2 whitespace-nowrap max-[900px]:text-center">
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                  <Link href="/contact" className="hover:text-primary">
                    Contact
                  </Link>
                  <Link href="/aboutus" className="hover:text-primary">
                    About Us
                  </Link>
                  <Link
                    href="/termsAndConditions"
                    className="hover:text-primary"
                  >
                    Terms and Conditions
                  </Link>
                  <Link href="/privacy-policy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4 max-[900px]:items-center">
                <div className="text-xl font-semibold whitespace-nowrap">
                  Contact Us
                </div>

                <div className="text-base leading-6 max-[900px]:text-center space-y-2">
                  <div className="flex gap-2 items-center max-[900px]:justify-center">
                    <i className="fa-regular fa-phone "></i>
                    <Link href="tel:9801104556">+977-9801104556 </Link>
                  </div>

                  <div className="flex gap-2 items-center max-[900px]:justify-center">
                    <i className="fa-regular fa-envelope"></i>
                    <Link href="mailto:mobilemandu0@gmail.com">
                      mobilemandu0@gmail.com
                    </Link>
                  </div>
                  <div className="flex gap-2 items-center max-[900px]:justify-center">
                    <i className="fa-regular fa-location-dot"></i>
                    <span>Mid Baneshwor</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col w-full gap-4 max-[900px]:items-center">
                <div className="text-xl font-semibold whitespace-nowrap">
                  Customer Service
                </div>
                <div className="text-base leading-6 max-[900px]:text-center space-y-2">
                  <div className="flex gap-2 items-center max-medium:justify-center">
                    <i className="fa-regular fa-phone "></i>
                    <Link href="tel:9801104556">+977-9801104556 </Link>
                  </div>
                </div>
                <div className=" flex gap-5 text-2xl text-primary ">
                  <Link
                    target="_blank"
                    href="https://facebook.com/themobilemandunepal"
                  >
                    <i className=" text-primary fa-brands fa-facebook"></i>
                  </Link>
                  <Link
                    target="_blank"
                    href="https://instagram.com/mobilemandunepal"
                  >
                    <i className=" text-primary fa-brands fa-instagram"></i>
                  </Link>
                  <Link target="_blank" href="https://tiktok.com/@mobilemandu">
                    <i className=" text-primary fa-brands fa-tiktok"></i>
                  </Link>
                  <Link
                    target="_blank"
                    href="https://www.youtube.com/@Mobilemandu-rp2fy"
                  >
                    <i className=" text-primary fa-brands fa-youtube"></i>
                  </Link>
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/company/mobilemandu/"
                  >
                    <i className=" text-primary fa-brands fa-linkedin-in"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div className="bg-white flex justify-center gap-2 items-center py-3 text-webblack border-t text-center max-[700px]:flex-col">
        <span>Copyright © 2024 Mobilemandu, All Rights Reserved.</span>
        <div>
          Designed By{" "}
          <Link href={"#"} className="text-primary italic">
            Anil Shrestha
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
