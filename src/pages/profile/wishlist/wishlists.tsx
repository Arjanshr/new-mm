import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAccessTokenFromLocalStorage } from "@/utils/local";
import ProductCard from "@/components/product-card";
import { getWishlist } from "@/redux/thunks/wishlistThunk";

const MyWishlists = () => {
  const dispatch = useAppDispatch();
  const token = getAccessTokenFromLocalStorage();
  const wishlist = useAppSelector((state) => state.wishlistState);

  useEffect(() => {
    if (token) {
      dispatch(getWishlist({ token }));
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
          <span>My Wishlists</span>
        </div>
        {wishlist?.data?.length > 0 ? (
          <div className="grid grid-cols-1 min-[600px]:grid-cols-2  gap-4 min-[1050px]:grid-cols-2 min-[1250px]:grid-cols-3">
            {wishlist?.data?.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 text-webblack italic">
            <p>No items in your wishlist.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlists;
