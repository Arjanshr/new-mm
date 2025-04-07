import UIButton from "@/components/ui/uibutton";
import { successToast } from "@/lib/toastify";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TCart } from "@/schemas/cart.schema";
import Image from "next/image";
import React from "react";

const CartList = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartState.data);

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart({ productId }));
    successToast("Item Removed From Cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    successToast("Cart Cleared");
  };

  const handleDecreaseQuantity = (item: TCart) => {
    dispatch(decreaseQuantity(item));
  };

  const handleIncreaseQuantity = (item: TCart) => {
    dispatch(increaseQuantity(item));
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + parseFloat(item.product.discounted_amount) * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center px-[1.5rem] text-center gap-4">
        <h2 className="text-xl font-semibold text-webblack">
          Your cart is empty
        </h2>
        <p className=" text-webblack">
          Add items to your cart to see them here.
        </p>
        <div className="flex justify-between">
          <UIButton
            label="Continue Shopping"
            href="/new-arrivals"
            type="primary"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center py-10 bg-white">
      <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex items-start  gap-10 max-[1000px]:flex-col max-[1000px]:gap-4 ">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden space-y-4 flex-[2]  max-[1000px]:flex-none w-full">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="border-b last:border-b-0 flex items-center p-5 gap-5 w-full"
            >
              <div className="w-20 h-20 relative">
                <Image
                  src={item.product.image_link}
                  alt={item.product.name}
                  unoptimized
                  fill
                  className="h-full w-full object-contain rounded-lg"
                />
              </div>
              <div className=" flex justify-between gap-5 max-small:flex-col w-full">
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="text-base font-semibold text-webblack">
                    {item.product.name}
                  </h3>
                  <p className="text-primary font-semibold">
                    Rs{" "}
                    {parseFloat(
                      item.product.discounted_amount
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="text-webblack font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-xl p-4 flex flex-col gap-4  w-full">
          <h2 className="text-lg font-semibold text-webblack">Summary</h2>
          <hr />
          <div className="flex justify-between text-webblack">
            <span>Subtotal</span>
            <span className="font-medium">Rs {total.toLocaleString()}</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-semibold text-webblack">
            <span>Total</span>
            <span>Rs {total.toLocaleString()}</span>
          </div>

          <UIButton
            label={
              <span>
                <i className="fa-solid fa-credit-card mr-2"></i>
                Checkout
              </span>
            }
            type="primary"
            href="/checkout"
            className="text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default CartList;
