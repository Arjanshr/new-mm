import UIButton from "@/components/ui/uibutton";
import React, { ChangeEvent, useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import UIInput from "@/components/ui/uiinput";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import {
  changepasswordSchema,
  TChangepassword,
} from "@/schemas/change-password.schema";
import { parseInputType, validateSchema } from "@/utils/helpers";
import { errorToast } from "@/lib/toastify";
import { changePassword } from "@/redux/thunks/changepasswordThunk";
import { resetChangepasswordData } from "@/redux/slice/changepasswordSlice";
import { getAccessTokenFromLocalStorage, logout } from "@/utils/local";
import UILoader from "@/components/ui/uiloader";

const ChangePasswordPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = getAccessTokenFromLocalStorage();
  const [state, setState] = useState<{
    [K in keyof Partial<TChangepassword>]: string;
  }>({});
  const [error, setError] = useState<{
    [K in keyof Partial<TChangepassword>]: string;
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

  const handleChangePassword = () => {
    try {
      const response = validateSchema(state, changepasswordSchema);
      if (response.errors?.hasError) {
        errorToast("Please Validate indicated fileds");
        setError(response.errors?.error);
        return;
      }
      const dataToSent = {
        new_password: response?.data?.new_password,
        password: response?.data?.password,
        new_password_confirmation: response?.data.new_password_confirmation,
      };
      token && dispatch(changePassword({ data: dataToSent, token: token }));
    } catch (error) {
      errorToast("Something Went Wrong");
    }
  };

  const changepasswordData = useAppSelector(
    (state) => state.changepasswordState
  );
  useEffect(() => {
    if (changepasswordData?.data) {
      logout();
      dispatch(resetChangepasswordData());
    }
  }, [changepasswordData?.data, router, dispatch]);
  return (
    <>
      {changepasswordData?.loading && <UILoader overlay />}
      <div className=" flex  gap-4 max-[1050px]:flex-col ">
        <div className="flex-1 ">
          <Sidebar />
        </div>
        <div className="flex-[3] bg-white  shadow-lg rounded-lg p-4 space-y-4 ">
          <div className="flex items-center gap-3 text-xl text-primary font-semibold">
            <i className="fa-solid fa-lock"></i>
            <span>Change Password</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4">
              <UIInput
                label="Old Password"
                type="password"
                name="password"
                isRequired
                value={state.password}
                onChange={handleInputField}
                error={error.password}
                placeholder="eg. ********"
              />

              <UIInput
                label="New Password"
                type="password"
                isRequired
                name="new_password"
                value={state.new_password}
                onChange={handleInputField}
                error={error.new_password}
                placeholder="eg. ********"
              />

              <UIInput
                label="Confirm Password"
                type="password"
                name="new_password_confirmation"
                isRequired
                value={state.new_password_confirmation}
                onChange={handleInputField}
                error={error.new_password_confirmation}
                placeholder="eg. ********"
              />
            </div>
            <div className="flex justify-end">
              <UIButton
                type="primary"
                label=" Change Password"
                onClick={handleChangePassword}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
