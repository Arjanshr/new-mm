import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { login } from "@/constants/images";
import UIButton from "@/components/ui/uibutton";
import UIInput from "@/components/ui/uiinput";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { parseInputType, validateSchema } from "@/utils/helpers";
import { errorToast, successToast } from "@/lib/toastify";

import { setUserDataToLocalStorage } from "@/utils/local";
import Redirect from "@/components/redirect";
import { loginSchema, TLogin } from "@/schemas/login.schema";
import { resetLoginData } from "@/redux/slice/loginSlice";
import {
  loginUser,
  loginWithFacebook,
  loginWithGoogle,
} from "@/redux/thunks/loginThunk";
import UILoader from "@/components/ui/uiloader";

import {
  FACEBOOK_APP_ID,
  GOOGLE_CLIENT_ID,
  SITE_NAME,
  SITE_URL,
} from "@/lib/config";
import dynamic from "next/dynamic";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const LoginSocialFacebook: any = dynamic(
  () => import("reactjs-social-login").then((mod) => mod.LoginSocialFacebook),
  { ssr: false }
);

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [state, setState] = useState<{
    [K in keyof Partial<TLogin>]: string;
  }>({});
  const [error, setError] = useState<{
    [K in keyof Partial<TLogin>]: string;
  }>({});

  const handleInputField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, required } = e.target;

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

  const handleLoginUser = () => {
    try {
      const response = validateSchema(state, loginSchema);
      if (response.errors?.hasError) {
        errorToast("Please Validate indicated fileds");
        setError(response.errors?.error);
        return;
      }

      dispatch(loginUser(response?.data));
    } catch (error) {
      errorToast("Something Went Wrong");
    }
  };

  const loginData = useAppSelector((state) => state.loginState);
  useEffect(() => {
    if (loginData?.data) {
      if (window.history.length > 2) {
        router.back();
      } else {
        router.push("/");
      }
      successToast("Logged In  Successfully");
      setUserDataToLocalStorage(loginData?.data);
      dispatch(resetLoginData());
    }
  }, [loginData?.data, router, dispatch]);

  return (
    <>
      {loginData?.loading && <UILoader overlay />}
      <Redirect>
        <Navbar />
        <main>
          <div className=" flex items-center justify-center ">
            <div className="large:w-content w-full medium:mx-[2.5rem] large:mx-0 mx-[1.5rem] flex justify-center items-center my-10 shadow-slider rounded-lg large:py-0 py-5 max-medium:flex-col">
              <div
                className=" flex justify-center items-center flex-col  flex-1 max-medium:w-full max-medium:p-4"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                <div className="w-[80%] max-medium:w-full">
                  <h2 className="text-3xl text-primary font-bold  mt-4 ">
                    Welcome Back!
                  </h2>
                  <p className="text-webblack my-4 text-base">
                    Please enter login details below
                  </p>
                  <div className="flex flex-col gap-4">
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

                    <UIInput
                      type="password"
                      placeholder="*********"
                      name="password"
                      label="Password"
                      isRequired
                      value={state.password}
                      onChange={handleInputField}
                      error={error.password}
                      onKeyPress={(e) => e.key === "Enter" && handleLoginUser()}
                    />
                    <div className="flex items-center justify-end">
                      <Link
                        href="/forgot-password"
                        className="text-primary text-base font-semibold "
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <UIButton
                      label="Login"
                      type="primary"
                      className="w-full"
                      onClick={handleLoginUser}
                    />
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-5">
                    <div className="bg-white text-white h-[40px] w-[40px] rounded-full flex items-center justify-center cursor-pointer border border-gray-300 shadow-sm">
                      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ""}>
                        <GoogleLogin
                          containerProps={{ id: "googleLogin" }}
                          size="large"
                          logo_alignment="center"
                          shape="rectangular"
                          type="icon"
                          text="signin"
                          auto_select={false}
                          itp_support={true}
                          useOneTap={true}
                          onSuccess={(credentialResponse) => {
                            dispatch(
                              loginWithGoogle({
                                data: {
                                  token:
                                    credentialResponse.credential as string,
                                },
                              })
                            );
                          }}
                          onError={() => errorToast("Google login failed")}
                        />
                      </GoogleOAuthProvider>
                    </div>
                    <p className="">or</p>
                    <LoginSocialFacebook
                      isOnlyGetToken
                      appId={FACEBOOK_APP_ID || ""}
                      onResolve={({ data }: any) => {
                        dispatch(
                          loginWithFacebook({
                            data: { token: data.accessToken },
                          })
                        );
                      }}
                      onReject={(err: any) =>
                        errorToast("Facebook login failed")
                      }
                    >
                      <div className="bg-blue-800 text-white h-[35px] w-[35px] rounded-sm flex items-center justify-center cursor-pointer">
                        <i className="fa-brands fa-facebook-f"></i>
                      </div>
                    </LoginSocialFacebook>
                  </div>
                  <div className="text-center mt-4 text-zinc-700  text-base mb-6">
                    Don&apos;t have an account?
                    <Link
                      href="/register"
                      className="text-primary text-base pl-1 underline underline-offset-4 font-semibold"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className="flex-1 max-medium:w-full max-medium:hidden"
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                <Image
                  src={login}
                  alt="register image"
                  className="w-full h-full object-contain"
                  unoptimized
                  height={1000}
                  width={1000}
                />
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </Redirect>
    </>
  );
};

export default Login;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Login | ${SITE_NAME}`,
      url: `${SITE_URL}/login`,
    },
  };
}
