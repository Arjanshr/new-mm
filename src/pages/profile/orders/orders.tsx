import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAccessTokenFromLocalStorage } from "@/utils/local";
import { getOrder } from "@/redux/thunks/orderThunk";
import OrderCard from "@/components/order-card";

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.orderState);
  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    if (token) {
      dispatch(getOrder({ token }));
    }
  }, [dispatch, token]);

  return (
    <div className="flex gap-4 max-[1050px]:flex-col">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="flex-[3] bg-white shadow-lg rounded-lg p-4 space-y-4">
        <div className="flex items-center gap-3 text-xl text-primary font-semibold">
          <i className="fas fa-cart-shopping"></i>
          <span>My Orders</span>
        </div>
        <div className="flex flex-col gap-4">
          {order?.loading ? (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : order?.data?.length > 0 ? (
            order?.data
              ?.slice()
              ?.sort((a, b) => b.id - a.id)
              ?.map((item) => <OrderCard key={item.id} order={item} />)
          ) : (
            <div className="text-center text-gray-500 py-8">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
