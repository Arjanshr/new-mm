import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import UIInput from "@/components/ui/uiinput";
import { register } from "@/constants/images";
import UIButton from "@/components/ui/uibutton";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { parseFormData, parseInputType, validateSchema } from "@/utils/helpers";
import { errorToast, successToast } from "@/lib/toastify";
import { useRouter } from "next/router";

import { registerSchema, TRegister } from "@/schemas/register.schema";
import UISelect, { UISelectOptionEvent } from "@/components/ui/uiselect";
import UIFileListInput from "@/components/ui/uifilelistinput";
import Redirect from "@/components/redirect";
import { resetRegisterData } from "@/redux/slice/registerSlice";
import { registerUser } from "@/redux/thunks/registerThunk";
import UILoader from "@/components/ui/uiloader";
import { setUserDataToLocalStorage } from "@/utils/local";
import { resetLoginData } from "@/redux/slice/loginSlice";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [state, setState] = useState<{
    [K in keyof Partial<TRegister>]: string;
  }>({});
  const [error, setError] = useState<{
    [K in keyof Partial<TRegister>]: string;
  }>({});
  const [file, setFile] = useState<FileList | null>(null);
  const handleInputField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | UISelectOptionEvent
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
  const handleRegisterUser = () => {
    try {
      const response = validateSchema(state, registerSchema);
      if (response.errors?.hasError) {
        errorToast("Please Validate indicated fileds");
        setError(response.errors?.error);
        return;
      }
      const checkbox = document.getElementById("checkbox") as HTMLInputElement;
      if (!checkbox.checked) {
        errorToast("Please agree to the Terms of Service and Privacy Policy");
        return;
      }
      const formData = parseFormData(response?.data);
      file && formData.append("photo", file[0]);
      dispatch(
        registerUser({
          data: formData,
        })
      );
    } catch (error) {
      errorToast("Something Went Wrong");
    }
  };

  const registerData = useAppSelector((state) => state.registerState);
  useEffect(() => {
    if (registerData?.data) {
      router.push("/");
      successToast("Logged In  Successfully");
      setUserDataToLocalStorage(registerData?.data);
      dispatch(resetLoginData());
      dispatch(resetRegisterData());
    }
  }, [registerData?.data, router, dispatch]);

  return (
    <Redirect>
      <Navbar />
      {registerData?.loading && <UILoader overlay />}
      <main>
        <div className="  flex items-center justify-center my-10">
          <div className="shadow-slider rounded-lg large:w-content w-full medium:mx-[2.5rem] large:mx-0 mx-[1.5rem] flex large:gap-10 gap-4 max-[900px]:flex-col-reverse">
            <div
              className="flex-1 max-[900px]:hidden "
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              <Image
                src={register}
                alt="register image"
                className="w-full h-full object-cover"
                unoptimized
                quality={100}
                height={1000}
                width={1000}
              />
            </div>
            <div
              className="flex flex-col flex-[1] p-8 max-small:p-4 gap-4"
              data-aos="fade-left"
              data-aos-duration="1500"
            >
              <h2 className="text-2xl font-bold text-primary">
                Sign Up To Mobilemandu
              </h2>

              <div className="space-y-4">
                <h2 className="text-lg text-primary font-semibold">
                  Basic Details
                </h2>
                <div className="grid grid-cols-2 max-small:grid-cols-1 gap-4">
                  <UIInput
                    type="text"
                    label="Full Name"
                    placeholder="Full Name"
                    name="name"
                    isRequired
                    value={state.name}
                    onChange={handleInputField}
                    error={error.name}
                  />

                  <UIInput
                    type="email"
                    label="Email"
                    placeholder="Email Address"
                    name="email"
                    isRequired
                    value={state.email}
                    onChange={handleInputField}
                    error={error.email}
                  />

                  <UIInput
                    type="date"
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    name="dob"
                    isRequired
                    value={state.dob}
                    onChange={handleInputField}
                    error={error.dob}
                  />
                  <UISelect
                    label="Gender"
                    isRequired
                    placeholder="Select your gender"
                    name="gender"
                    options={[
                      { value: "male", displayValue: "Male" },
                      { value: "female", displayValue: "Female" },
                      // { value: "Others" },
                    ]}
                    defaultValue={state.gender}
                    onChange={handleInputField}
                    error={error?.gender}
                  />
                  <UIInput
                    type="number"
                    label="Phone No."
                    placeholder="Phone Number"
                    name="phone"
                    // isRequired
                    value={state.phone}
                    onChange={handleInputField}
                    // error={error.phone}
                  />
                </div>
                <h2 className="text-lg text-primary font-semibold">
                  Upload Your Picture
                </h2>
                <UIFileListInput
                  onChange={(e) => {
                    if (e.target.files instanceof FileList) {
                      setFile(e.target.files);
                    }
                  }}
                  accept="image/*"
                />
                <h2 className="text-lg text-primary font-semibold">
                  Create Password
                </h2>
                <div className="grid grid-cols-2 max-small:grid-cols-1 gap-4">
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
                </div>
                <div className="flex items-center mb-4">
                  <input type="checkbox" className="mr-2" id="checkbox" />
                  <label className="text-zinc-700  text-base">
                    I agree to Terms of Service & Privacy Policy
                  </label>
                </div>
                <UIButton
                  label="Register"
                  type="primary"
                  className="w-full"
                  onClick={handleRegisterUser}
                />

                <p className="text-center text-zinc-600 text-base">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-semibold">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Redirect>
  );
};

export default Register;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Register | ${SITE_NAME}`,
      url: `${SITE_URL}/register`,
    },
  };
}
