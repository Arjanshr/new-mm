import { logout } from "@/utils/local";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-col items-center">
        <ul className="mt-4 w-full max-[1050px]:flex overflow-auto gap-4">
          <Link
            href="/profile"
            className={`flex gap-2 items-center py-2 px-4 hover:bg-primary hover:text-white whitespace-nowrap text-webblack rounded-lg mb-2 ${
              location.pathname === "/profile" ? "bg-primary text-white" : ""
            }`}
          >
            <i className="fa-regular fa-user"></i>
            <span>Profile</span>
          </Link>

          <Link
            href="/profile/changepassword"
            className={`flex gap-2 items-center py-2 px-4 hover:bg-primary hover:text-white whitespace-nowrap text-webblack rounded-lg mb-2 ${
              location.pathname === "/profile/changepassword"
                ? "bg-primary text-white"
                : ""
            }`}
          >
            <i className="fa-solid fa-key"></i>
            <span>Change Password</span>
          </Link>
          <Link
            href="/profile/address"
            className={`flex gap-2 items-center py-2 px-4 hover:bg-primary hover:text-white whitespace-nowrap text-webblack rounded-lg mb-2 ${
              location.pathname?.startsWith("/profile/address")
                ? "bg-primary text-white"
                : ""
            }`}
          >
            <i className="fa-regular fa-location"></i>
            <span>Address</span>
          </Link>
          <Link
            href="/profile/orders"
            className={`flex gap-2 items-center py-2 px-4 hover:bg-primary hover:text-white whitespace-nowrap text-webblack rounded-lg mb-2 ${
              location.pathname.startsWith("/profile/orders")
                ? "bg-primary text-white"
                : ""
            }`}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Orders</span>
          </Link>

          <Link
            href="/profile/wishlist"
            className={`flex gap-2 items-center py-2 px-4 hover:bg-primary hover:text-white whitespace-nowrap text-webblack rounded-lg mb-2 ${
              location.pathname.startsWith("/profile/wishlist")
                ? "bg-primary text-white"
                : ""
            }`}
          >
            <i className="fa-solid fa-heart"></i>
            <span>Wishlist</span>
          </Link>
          <Link
            href="/profile/cancellations"
            className={`flex gap-2 items-center py-2 px-4 hover:bg-primary hover:text-white whitespace-nowrap text-webblack rounded-lg mb-2 ${
              location.pathname.startsWith("/profile/cancellations")
                ? "bg-primary text-white"
                : ""
            }`}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Cancellations</span>
          </Link>
          <li
            onClick={() => logout()}
            className="cursor-pointer flex items-center py-2 px-4 gap-2  hover:bg-primary hover:text-white whitespace-nowrap text-webblack rounded-lg"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
