import Footer from "@/components/footer";
import Heading from "@/components/heading";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import { LANDING } from "@/constants/images";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <main>
        <Landing title="Privacy Policy" image={LANDING} />
        <div className="flex flex-col justify-center items-center py-10 bg-background">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
            {/* <Heading title="Terms and Conditions" /> */}
            <div className="flex flex-col gap-7">
              <section>
                <h2 className=" text-2xl text-primary font-semibold mb-4">
                  1. Introduction
                </h2>
                <p>
                  Welcome to mobilemandu.com. We value your privacy and are
                  committed to protecting your personal information. This
                  Privacy Policy outlines how we collect, use, disclose, and
                  protect your information when you visit our website and use
                  our services.
                </p>
              </section>
              <section>
                <h2 className=" text-2xl text-primary font-semibold mb-4">
                  2. Information We Collect
                </h2>
                <h3 className="text-xl font-semibold mb-2">
                  a. Personal Information
                </h3>
                <p>
                  When you create an account, make a purchase, or interact with
                  our site, we may collect the following personal information:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Shipping and billing addresses</li>
                  <li>
                    Payment information (credit/debit card details, PayPal,
                    etc.)
                  </li>
                  <li>Phone number</li>
                  <li>Account username and password</li>
                  <li>
                    Any other information you provide during checkout or account
                    creation
                  </li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 mt-2">
                  b. Non-Personal Information
                </h3>
                <p>We may also collect non-personal information such as:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Pages visited on our site</li>
                  <li>Time and date of visits</li>
                  <li>Referring URL</li>
                </ul>
              </section>
              <section>
                <h2 className=" text-2xl text-primary font-semibold mb-4">
                  3. How We Use Your Information
                </h2>
                <p>We use your information to:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>
                    Send updates, promotions, and newsletters (with your
                    consent)
                  </li>
                  <li>Analyze site usage to enhance user experience</li>
                  <li>Detect and prevent fraud</li>
                </ul>
              </section>
              <section>
                <h2 className=" text-2xl text-primary font-semibold mb-4">
                  4. How We Share Your Information
                </h2>
                <p>
                  We do not sell, trade, or rent your personal information to
                  third parties. However, we may share your information with:
                </p>
                <ul className="list-disc list-inside ml-4 flex flex-col gap-1 pt-1">
                  <li>
                    <strong>Service Providers:</strong> Third-party vendors who
                    assist us in operating our website, processing payments, and
                    delivering products.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> Disclosure as required
                    by law or in response to legal requests such as court orders
                    or subpoenas.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In case of a merger,
                    acquisition, or sale of all or a portion of our assets.
                  </li>
                </ul>
              </section>
              <section>
                <h2 className=" text-2xl text-primary font-semibold mb-4">
                  5. Security of Your Information
                </h2>
                <p>
                  We implement a variety of security measures to protect your
                  personal information, including encryption, firewalls, and
                  secure servers. However, no method of transmission over the
                  internet or electronic storage is 100% secure, so we cannot
                  guarantee absolute security.
                </p>
              </section>
              <section>
                <h2 className=" text-2xl text-primary font-semibold mb-4">
                  6. Cookies and Tracking Technologies
                </h2>
                <p>
                  We use cookies and similar tracking technologies to enhance
                  your experience on our site. Cookies are small data files
                  stored on your device that help us remember your preferences
                  and understand how you use our site.
                </p>
                <p>
                  You can choose to disable cookies through your browser
                  settings, but doing so may affect the functionality of our
                  website.
                </p>
              </section>
              <section>
                <h2 className=" text-2xl text-primary font-semibold mb-4">
                  7. Your Rights and Choices
                </h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Access and review the personal information we hold about you
                  </li>
                  <li>Request corrections to your personal information</li>
                  <li>
                    Request the deletion of your personal information (subject
                    to legal and business retention requirements)
                  </li>
                  <li>Opt-out of receiving marketing communications from us</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at{" "}
                  <a href="tel:+9801104556" className="text-blue-600">
                    9801104556
                  </a>
                  .
                </p>
              </section>
              <section>
                <h2 className=" text-2xl text-primary font-semibold mb-4">
                  8. Third-Party Links
                </h2>
                <p>
                  Our website may contain links to third-party sites. We are not
                  responsible for the privacy practices or content of these
                  external sites. We encourage you to review their privacy
                  policies before providing any personal information.
                </p>
              </section>
              <section>
                <h2 className=" text-2xl text-primary font-semibold mb-4">
                  9. Children&apos;s Privacy
                </h2>
                <p>
                  Our website is not intended for use by individuals under the
                  age of 13. We do not knowingly collect personal information
                  from children under 13. If we become aware that we have
                  inadvertently collected such information, we will take steps
                  to delete it.
                </p>
              </section>
              <section>
                <h2 className=" text-2xl text-primary font-semibold mb-4">
                  10. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or for other operational, legal, or
                  regulatory reasons. We will notify you of any significant
                  changes by posting the new policy on our website with the
                  updated effective date.
                </p>
              </section>
              <section>
                <h2 className=" text-2xl text-primary font-semibold mb-4">
                  11. Contact Us
                </h2>
                <p>
                  If you have any questions or concerns about this Privacy
                  Policy or our data practices, please contact us at:
                </p>
                <address className="not-italic">
                  <strong>Mobilemandu</strong>
                  <br /> Mid Baneshwor, Kathmandu
                  <br />{" "}
                  <a
                    href="mailto:mobilemandu0@gmail.com"
                    className="text-blue-600"
                  >
                    mobilemandu0@gmail.com
                  </a>
                  <br />{" "}
                  <a href="tel:+9801104556" className="text-blue-600">
                    9801104556
                  </a>
                </address>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default PrivacyPolicy;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Privacy Policy | ${SITE_NAME}`,
      url: `${SITE_URL}/privacy-policy`,
    },
  };
}
