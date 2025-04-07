import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Redirect from "@/components/redirect";
import UIButton from "@/components/ui/uibutton";
import UIInput from "@/components/ui/uiinput";
import UILoader from "@/components/ui/uiloader";
import { reset } from "@/constants/images";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { errorToast, successToast } from "@/lib/toastify";
import { resetResetpasswordData } from "@/redux/slice/resetpasswordSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { resetPassword } from "@/redux/thunks/resetpasswordThunk";
import {
  resetpasswordSchema,
  TResetpassword,
} from "@/schemas/reset-password.schema";

import { parseInputType, validateSchema } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token, email } = router.query;
  const [state, setState] = useState<{
    [K in keyof Partial<TResetpassword>]: string;
  }>({
    email: "",
    token: "",
  });
  const [error, setError] = useState<{
    [K in keyof Partial<TResetpassword>]: string;
  }>({});

  useEffect(() => {
    if (token && email) {
      setState((prev) => ({
        ...prev,
        email: email as string,
        token: token as string,
      }));
    }
  }, [token, email]);

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

  const handleResetPassword = () => {
    try {
      if (!token && !email) {
        errorToast("Please check your email for verification link");
        return;
      }
      const response = validateSchema(state, resetpasswordSchema);
      if (response.errors?.hasError) {
        errorToast("Please Validate indicated fileds");
        setError(response.errors?.error);
        return;
      }
      dispatch(resetPassword(response?.data));
    } catch (error) {
      errorToast("Something Went Wrong");
    }
  };

  const resetpasswordData = useAppSelector((state) => state.resetpasswordState);
  useEffect(() => {
    if (resetpasswordData?.data) {
      router.push("/login");
      successToast("Password Resetted Successfully");
      dispatch(resetResetpasswordData());
    }
  }, [resetpasswordData?.data, router, dispatch]);
  return (
    <Redirect>
      <Navbar />
      {resetpasswordData?.loading && <UILoader overlay />}
      <main>
        <div className="flex justify-center items-center my-10 ">
          <div className="large:w-content w-full medium:mx-[2.5rem] large:mx-0 mx-[1.5rem] shadow-slider flex max-medium:py-5">
            <div
              className="flex-1 items-center justify-center flex  bg-background max-medium:hidden"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              <Image
                height={1000}
                width={1000}
                src={reset}
                className="h-full w-full object-contain"
                alt="resetpassword"
                unoptimized
              />
            </div>
            <div
              className="flex-1 flex  justify-center flex-col gap-4  px-14 max-medium:px-4 py-5"
              data-aos="fade-left"
              data-aos-duration="1500"
            >
              <h1 className="text-3xl font-bold text-primary">
                Reset Password
              </h1>
              <p className="text-base">
                Reset your password by entering bellow fields.
              </p>
              {/* <UIInput
                type="email"
                placeholder="Enter your email"
                label="Email"
                name="email"
                isRequired
                value={state.otp}
                onChange={handleInputField}
                error={error.otp}
              /> */}
              <UIInput
                type="password"
                placeholder="Password"
                label="Password"
                name="password"
                isRequired
                value={state.password}
                onChange={handleInputField}
                error={error.password}
              />

              <UIInput
                type="password"
                placeholder="Confirm Password"
                label="Confirm Password"
                name="password_confirmation"
                isRequired
                value={state.password_confirmation}
                onChange={handleInputField}
                error={error.password_confirmation}
              />
              <UIButton
                label="Reset Password"
                type="primary"
                className="w-full"
                onClick={handleResetPassword}
              />
              <p className="text-base ">
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
  );
};

export default ResetPassword;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Reset Password | ${SITE_NAME}`,
      url: `${SITE_URL}/reset-password`,
    },
  };
}
