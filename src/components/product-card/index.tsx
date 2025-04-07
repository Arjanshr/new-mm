import { TProduct } from "@/schemas/product.schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UIButton from "../ui/uibutton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { successToast } from "@/lib/toastify";
import { addToCart, removeFromCart } from "@/redux/slice/cartSlice";
import { getAccessTokenFromLocalStorage } from "@/utils/local";
import { TWishlist } from "@/schemas/wishlist.schema";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/thunks/wishlistThunk";

interface ProductCardProps {
  data: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const token = getAccessTokenFromLocalStorage();
  const wishlist = useAppSelector((state) => state.wishlistState.data);
  const cart = useAppSelector((state) => state.cartState.data);
  const isInCart = cart.some((item: any) => item.productId === data.id);
  const handleAddToCart = () => {
    dispatch(addToCart({ productId: data.id, quantity: 1, product: data }));
    successToast("Item Added To Cart");
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ productId: data.id }));
    successToast("Item Removed From Cart");
  };

  const isInWishlist = wishlist.some((item: TProduct) => item.id === data.id);
  const handleAddToWishlist = () => {
    dispatch(
      addToWishlist({
        productId: data.id,
        token: token,
        callback: () => {
          successToast("Item Added To Wishlist");
        },
      })
    );
  };

  const handleRemoveFromWishlist = () => {
    dispatch(
      removeFromWishlist({
        productId: data.id,
        token: token,
        callback: () => {
          successToast("Item Removed From Wishlist");
        },
      })
    );
  };
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-95">
      <Link href={`/products/${data.slug}`} className="block">
        <div className="w-full h-[220px] bg-transparent flex justify-center items-center">
          <Image
            loading="lazy"
            quality={100}
            unoptimized
            src={data.image_link || "/images/noimg.png"}
            width={1000}
            height={1000}
            alt={data.name}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col gap-3">
        <Link href={`/products/${data.slug}`} className="block">
          <h3 className="text-webblack text-base h-[45px] line-clamp-2">
            {data.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            {Array.from({ length: 5 }, (_, index) => (
              <i
                key={index}
                className={`fas ${
                  index < Math.floor(data.rating || 4)
                    ? "fa-star text-yellow"
                    : "fa-star text-gray-300"
                }`}
              ></i>
            ))}
          </div>

          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            In Stock
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-webblack font-medium text-base">
            Rs. {data.discounted_amount}
          </span>
          {data.discounted_amount !== data.original_amount && (
            <>
              <span className="text-webblack line-through text-xs">
                Rs. {data.original_amount}
              </span>
              {/* Discount Badge */}
              <span className=" text-red-800 text-xs font-bold px-2 py-1 rounded-md">
                -{" "}
                {Math.round(
                  ((Number(data.original_amount) -
                    Number(data.discounted_amount)) /
                    Number(data.original_amount)) *
                    100
                )}
                % OFF
              </span>
            </>
          )}
        </div>

        <UIButton
          label={
            <span>
              <i className="fas fa-shopping-cart"></i>{" "}
              {isInCart ? "Remove From Cart" : "Add To Cart"}
            </span>
          }
          type={isInCart ? "error" : "primary"}
          className="w-full"
          onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
        />
      </div>

      {/* Wishlist & Badges */}
      <div className="absolute top-3 right-3 flex flex-col justify-end items-end gap-2">
        {token && (
          <button
            className="p-2 h-[30px] w-[30px] flex justify-center items-center bg-white shadow-md rounded-full hover:bg-gray-100 transition"
            onClick={
              isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist
            }
          >
            <i
              className={`fas fa-heart text-xl ${
                isInWishlist ? "text-red-500" : "text-primary"
              }`}
            ></i>
          </button>
        )}
        {data.tags.new && (
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            New
          </span>
        )}
        {data.tags.popular && (
          <span className="bg-yellow text-white text-xs font-semibold px-2 py-1 rounded-md">
            Popular
          </span>
        )}
        {data.tags.campaign && (
          <span className="bg-rose-900 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Campaign
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
