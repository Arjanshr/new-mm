import UIButton from "@/components/ui/uibutton";
import Link from "next/link";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import UIInput from "@/components/ui/uiinput";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAccessTokenFromLocalStorage } from "@/utils/local";
import {
  profileEditSchema,
  profileSchema,
  TProfile,
  TProfileEditSchema,
} from "@/schemas/profile.schema";
import { parseFormData, validateSchema } from "@/utils/helpers";
import { errorToast, successToast } from "@/lib/toastify";
import { getProfile, updateProfile } from "@/redux/thunks/profileThunk";
import UILoader from "@/components/ui/uiloader";
import UISelect, { UISelectOptionEvent } from "@/components/ui/uiselect";
import UIFileListInput from "@/components/ui/uifilelistinput";
import Image from "next/image";

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profileState);
  const token = getAccessTokenFromLocalStorage();

  const [state, setState] = useState<{
    [K in keyof Partial<TProfileEditSchema>]: string;
  }>({});
  const [error, setError] = useState<{
    [K in keyof Partial<TProfileEditSchema>]: string;
  }>({});
  const [file, setFile] = useState<FileList | null>(null);

  useEffect(() => {
    if (token) {
      dispatch(getProfile({ token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (profile?.data) {
      setState({
        name: profile?.data?.name || "",
        email: profile?.data?.email || "",
        phone: profile?.data?.number || "",
        dob: profile.data.birthday || "",
        gender: profile.data.gender || "",
      });
    }
  }, [profile.data]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | UISelectOptionEvent
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    if (e.target.required) {
      setError((prev) => ({
        ...prev,
        [name]: value ? "" : "Field is required",
      }));
    }
  };

  const handleProfile = (e: MouseEvent<HTMLElement>) => {
    try {
      const response = validateSchema<TProfileEditSchema>(
        state,
        profileEditSchema
      );

      if (response.errors?.hasError) {
        errorToast("Please verify indicated fields");
        setError(response.errors.error);
        return;
      }
      const dataToSent = {
        name: state.name,
        ...(!profile.data?.email && { email: state.email }),
        ...(!profile.data?.number && { email: state.phone }),
        dob: state.dob,
        gender: state.gender,
      };
      const formData = parseFormData(response?.data);
      if (file) {
        formData.append("photo", file[0]);
      }

      if (token) {
        dispatch(
          updateProfile({
            data: formData,
            token: token,
            callback: () => {
              successToast("Profile Updated");
              dispatch(getProfile({ token: token }));
            },
          })
        );
      }
    } catch (error) {
      errorToast("Something went wrong with validation");
    }
  };

  return (
    <>
      {profile?.loading && <UILoader />}
      <div className="flex gap-4 max-[1050px]:flex-col">
        <div className="flex-1">
          <Sidebar />
        </div>
        <div className="flex-[3] bg-white shadow-lg rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-3 text-xl text-primary font-semibold">
            <i className="fa-solid fa-user"></i>
            <span>Profile Details</span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 max-[575px]:grid-cols-1">
              <UIInput
                label="Full Name"
                name="name"
                value={state.name || ""}
                isRequired
                onChange={handleInputChange}
                error={error.name}
              />
              <UIInput
                label="Phone No."
                type="number"
                name="phone"
                value={state.phone || ""}
                // isRequired
                onChange={handleInputChange}
                // error={error.phone}
                // readOnly={state.phone ? true : false}
              />
              <UIInput
                label="Email"
                name="email"
                value={state.email || ""}
                isRequired
                onChange={handleInputChange}
                error={error.email}
                // readOnly={state.email ? true : false}
              />
              <UIInput
                label="Date of Birth"
                name="dob"
                type="date"
                value={state.dob || ""}
                isRequired
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                error={error?.gender}
              />
            </div>
            <h3 className="font-semibold text-webblack text-base">
              Profile Picture
            </h3>
            <div className="flex gap-4 max-[450px]:flex-col-reverse">
              <div className="w-[13rem]">
                <UIFileListInput
                  onChange={(e) => {
                    if (e.target.files instanceof FileList) {
                      setFile(e.target.files);
                    }
                  }}
                  accept="image/*"
                />
              </div>
              {profile?.data?.profile_image_path && !file && (
                <div className="flex justify-center items-center w-[13rem] h-[13rem]">
                  <Image
                    src={profile?.data?.profile_image_path}
                    alt="Profile"
                    className="w-full h-full object-contain"
                    height={1000}
                    width={1000}
                    unoptimized
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <UIButton
                label="Save Changes"
                type="primary"
                onClick={handleProfile}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
