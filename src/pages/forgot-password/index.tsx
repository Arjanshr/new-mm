import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Redirect from "@/components/redirect";
import UIButton from "@/components/ui/uibutton";
import UIInput from "@/components/ui/uiinput";
import UILoader from "@/components/ui/uiloader";
import { lock } from "@/constants/images";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { errorToast, successToast } from "@/lib/toastify";
import { resetForgotpasswordData } from "@/redux/slice/forgotpasswordSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { forgotPassword } from "@/redux/thunks/forgotpasswordThunk";
import {
  forgotpasswordSchema,
  TForgotpassword,
} from "@/schemas/forgot-password.schema";

import { parseInputType, validateSchema } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [state, setState] = useState<{
    [K in keyof Partial<TForgotpassword>]: string;
  }>({
    reset_url: "http://mobilemandu.com/reset-password",
  });
  const [error, setError] = useState<{
    [K in keyof Partial<TForgotpassword>]: string;
  }>({});

  const handleInputField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const type = e.target.type;
    const required = e.target.required;
    const value = parseInputType(type, e);
    const valid = value !== null && value !== undefined && value !== "";
    setState((prev: any) => ({ ...prev, [name]: valid ? value : undefined }));
    required &&
      valid &&
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
  };

  const handleForgotPassword = () => {
    try {
      const response = validateSchema(state, forgotpasswordSchema);
      if (response.errors?.hasError) {
        errorToast("Please Validate indicated fileds");
        setError(response.errors?.error);
        return;
      }

      dispatch(forgotPassword(response?.data));
    } catch (error) {
      errorToast("Something Went Wrong");
    }
  };

  const forgotpasswordData = useAppSelector(
    (state) => state.forgotpasswordState
  );
  useEffect(() => {
    if (forgotpasswordData?.data) {
      successToast("We have emailed your password reset link");
      setState({
        email: "",
        reset_url: "http://mobilemandu.com/reset-password",
      });
      // router.push("/reset-password");
      // dispatch(resetForgotpasswordData());
    }
  }, [forgotpasswordData?.data, router, dispatch]);
  return (
    <>
      {forgotpasswordData?.loading && <UILoader overlay />}
      <Redirect>
        <Navbar />
        <main>
          <div className="flex justify-center items-center my-10 bg-white">
            <div className="large:w-content w-full medium:mx-[2.5rem] large:mx-0 mx-[1.5rem] shadow-slider rounded-lg bg-white flex max-medium:py-5">
              <div
                className="flex-1 items-center justify-center flex bg-background max-medium:hidden"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                <Image
                  height={1000}
                  width={1000}
                  src={lock}
                  className="h-full w-full object-contain"
                  alt="forgotpassword"
                  unoptimized
                />
              </div>
              <div
                className="flex-1 flex  justify-center flex-col gap-4 bg-white   px-14 max-medium:px-4"
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                <h2 className="text-3xl font-bold text-primary">
                  Forgot Password
                </h2>
                <p className="text-base">
                  Please enter your email to receive a verification code.
                </p>

                <UIInput
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                  isRequired
                  value={state.email}
                  onChange={handleInputField}
                  error={error.email}
                />
                <UIButton
                  label="Reset Password"
                  type="primary"
                  className="w-full"
                  onClick={handleForgotPassword}
                />
                {forgotpasswordData?.data && (
                  <p className="text-base text-green-600 font-semibold">
                    We have emailed your password reset link
                  </p>
                )}
                <p className="  text-base">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary text-base font-semibold"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </Redirect>
    </>
  );
};

export default ForgotPassword;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Forgot Password | ${SITE_NAME}`,
      url: `${SITE_URL}/forgotPassword`,
    },
  };
}
