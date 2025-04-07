import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAccessTokenFromLocalStorage } from "@/utils/local";
import { getUserAddress } from "@/redux/thunks/useraddressThunk";
import { TAddressData } from "@/schemas/useraddress.schema";

const MyAddress = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.useraddressState);
  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    if (token) {
      dispatch(getUserAddress({ token }));
    }
  }, [dispatch, token]);

  return (
    <div className="flex gap-4 max-[1050px]:flex-col">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="flex-[3] bg-white shadow-lg rounded-lg p-4 space-y-4">
        <div className="flex items-center gap-3 text-xl text-primary font-semibold">
          <i className="fa-solid fa-location"></i>
          <span>Address</span>
        </div>
        <div className="flex flex-col gap-4">
          {address?.loading ? (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            address?.data?.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 p-6 flex flex-col gap-2 rounded-lg shadow-md text-webblack"
              >
                <div className=" flex items-center gap-3">
                  <i className="fa-solid fa-globe"></i>
                  <span className="font-semibold">Province: </span>
                  {item.province.name}
                </div>
                <div className=" flex items-center gap-3">
                  <i className="fa-solid fa-city"></i>
                  <span className="font-semibold">City: </span> {item.city.name}
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-location"></i>
                  <span className="font-semibold">Area: </span> {item.area.name}
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="font-semibold">Location: </span>{" "}
                  {item.location}
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-house"></i>
                  <span className="font-semibold">Type: </span> {item.type}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAddress;
