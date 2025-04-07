import React, { use, useEffect, useState } from "react";
import { TOrder } from "@/schemas/order.schema";
import UIButton from "../ui/uibutton";
import UIDialogBox from "../ui/uidialogbox";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { cancelOrder, getOrder } from "@/redux/thunks/orderThunk";
import { getAccessTokenFromLocalStorage } from "@/utils/local";
import { successToast } from "@/lib/toastify";
import { reset } from "../constants/images";
import { resetCancelOrderData } from "@/redux/slice/orderSlice";
import { usePathname, useRouter } from "next/navigation";

interface OrderCardProps {
  order: TOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = getAccessTokenFromLocalStorage();
  const pathname = usePathname();
  const orderData = useAppSelector((state) => state.orderState);
  const [showCancelOrderModal, setShowCancelOrderModal] =
    useState<boolean>(false);
  const parseShippingAddress = (shippingAddress: string) => {
    const nameMatch = shippingAddress?.match(/Name:\s*([^<]+)/);
    const phoneMatch = shippingAddress?.match(/Phone:\s*([^<]+)/);
    const emailMatch = shippingAddress?.match(/Email:\s*([^<\s]+@[^\s<]+)/);

    const rawEmail = emailMatch ? emailMatch[1] : "N/A";
    const cleanedEmail = rawEmail.split(/\s/)[0];

    const cleanedAddress = shippingAddress
      ?.replace(/<[^>]*>/g, " ")
      ?.replace(/Name:[^<]+/i, "")
      ?.replace(/Phone:[^<]+/i, "")
      ?.replace(/Email:[^<]+/i, "")
      ?.replace(/\s+/g, " ")
      ?.trim();

    return {
      name: nameMatch ? nameMatch[1].trim() : "N/A",
      phone: phoneMatch ? phoneMatch[1].trim() : "N/A",
      email: cleanedEmail,
      fullAddress: cleanedAddress,
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cancelled":
        return "bg-red-100 text-red-600";
      case "pending":
        return "bg-secondary text-white";
      case "completed":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-webblack";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "unpaid":
        return "bg-red-100 text-red-600";
      case "partially_paid":
        return "bg-yellow-100 text-yellow-600";
      case "paid":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-webblack";
    }
  };

  const contactInfo = parseShippingAddress(order?.shipping_address);

  const couponDiscount =
    Number(order?.total_price) +
    Number(order?.shipping_price) -
    Number(order?.grand_total);

  const handleCancelOrder = () => {
    try {
      token && dispatch(cancelOrder({ id: order.id, token }));
    } catch (error) {}
  };

  useEffect(() => {
    if (orderData?.cancelOrderData) {
      setShowCancelOrderModal(false);
      dispatch(resetCancelOrderData());
      successToast("Order Cancelled Successfully");
      dispatch(getOrder({ token }));
    }
  }, [dispatch, token, orderData?.cancelOrderData]);

  return (
    <>
      <div className="bg-white shadow-lg p-3 border-2 border-gray-100  space-y-4">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center space-x-2">
            <i className="fas fa-package text-primary"></i>
            <h2 className="text-xl font-semibold text-webblack">
              Order #{order?.id}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {pathname === `/profile/orders/${order?.id}` ? (
              <UIButton
                type="primary"
                label="Back to Orders"
                onClick={() => router.back()}
              />
            ) : (
              <UIButton
                type="primary"
                label="View Detail"
                href={`/profile/orders/${order?.id}`}
              />
            )}
            {order?.cancellable && (
              <UIButton
                type="error"
                label="Cancel Order"
                onClick={() => setShowCancelOrderModal(true)}
              />
            )}
          </div>
        </div>

        <div className="grid medium:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <i className="fas fa-calendar text-webblack"></i>
              <span className="font-medium text-webblack">
                Order Date: {formatDate(order?.order_date)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-map-pin text-webblack"></i>
              <span className="font-medium text-webblack">
                {order?.area?.name}, {order?.city?.name},{" "}
                {order?.province?.name}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <i className="fas fa-credit-card text-webblack"></i>
              <span className="font-medium text-webblack">
                Payment Type:{" "}
                {order?.payment_type?.charAt(0)?.toUpperCase() +
                  order?.payment_type?.slice(1)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-money-check-alt text-webblack"></i>
              <span className="font-medium text-webblack flex items-center">
                Payment Status:{" "}
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(
                    order?.payment_status
                  )}`}
                >
                  {order?.payment_status
                    ?.replace("_", " ")
                    ?.charAt(0)
                    ?.toUpperCase() +
                    order?.payment_status?.replace("_", " ").slice(1)}
                </span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-bag-shopping text-webblack"></i>
              <span className="font-medium text-webblack flex items-center">
                Order Status:{" "}
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(
                    order?.status
                  )}`}
                >
                  {order?.status?.replace("_", " ")?.charAt(0)?.toUpperCase() +
                    order?.status?.replace("_", " ")?.slice(1)}
                </span>
              </span>
            </div>
            {/* <div className="flex items-center space-x-2">
            <i className="fas fa-times-circle text-webblack"></i>
            <span className="font-medium text-webblack">
              Cancellable: {order.cancellable ? "Yes" : "No"}
            </span>
          </div> */}
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-700 mb-2">
              Shipping Details
            </h3>
            <div className="space-y-2">
              <p className="text-base text-webblack">
                <span className="font-medium">Name:</span> {contactInfo?.name}
              </p>
              <p className="text-base text-webblack">
                <span className="font-medium">Phone:</span> {contactInfo?.phone}
              </p>
              <p className="text-base text-webblack">
                <span className="font-medium">Email:</span> {contactInfo?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-2 max-small:grid-cols-1 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-base text-webblack">Total Items</p>
              <p className="font-bold text-webblack">{order?.total_items}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-base text-webblack">Subtotal</p>
              <p className="font-bold text-webblack">Rs {order?.total_price}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-base text-webblack">Shipping</p>
              <p className="font-bold text-webblack">
                Rs {order?.shipping_price}
              </p>
            </div>
            {couponDiscount > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-base text-webblack">Coupon Code</p>
                <p className="font-bold text-primary">
                  {order?.coupon_code || "N/A"}
                </p>
              </div>
            )}
            {couponDiscount > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-base text-webblack">Coupon Discount</p>
                <p className="font-bold text-red-600">-Rs {couponDiscount}</p>
              </div>
            )}
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-base text-webblack">Grand Total</p>
              <p className="font-bold text-primary">Rs {order?.grand_total}</p>
            </div>
          </div>
        </div>
      </div>
      {showCancelOrderModal && (
        <UIDialogBox
          cancel={() => setShowCancelOrderModal(false)}
          confirm={handleCancelOrder}
          message="Are you sure want to cancel this order ?"
          title="Cancel Order"
        />
      )}
    </>
  );
};

export default OrderCard;
