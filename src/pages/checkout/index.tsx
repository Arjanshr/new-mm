import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import UIButton from "@/components/ui/uibutton";
import UIInput from "@/components/ui/uiinput";
import UISelect, { UISelectOptionEvent } from "@/components/ui/uiselect";
import { QR } from "@/constants/images";
import { errorToast, successToast } from "@/lib/toastify";
import { resetOrderData } from "@/redux/slice/orderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getAreas,
  getCities,
  getProvinces,
  getShippingPrice,
} from "@/redux/thunks/addressThunk";
import { checkCoupon, makeOrder } from "@/redux/thunks/orderThunk";
import {
  couponCheckSchema,
  makeOrderSchema,
  TCouponCheck,
  TMakeOrder,
} from "@/schemas/order.schema";
import { parseInputType, validateSchema } from "@/utils/helpers";
import { getAccessTokenFromLocalStorage } from "@/utils/local";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import {
  resetAreas,
  resetCities,
  resetShippingPrice,
} from "@/redux/slice/addressSlice";
import UILoader from "@/components/ui/uiloader";
import { getUserAddress } from "@/redux/thunks/useraddressThunk";
import { stat } from "fs";
import { clearCart } from "@/redux/slice/cartSlice";
import { clearBuyNow } from "@/redux/slice/buyNowSlice";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { from } = router.query;
  const token = getAccessTokenFromLocalStorage();
  const profile = useAppSelector((state) => state.profileState);
  const address = useAppSelector((state) => state.useraddressState);

  const { provinces, cities, areas, shippingPrice, loading } = useAppSelector(
    (state) => state.addressState
  );
  const cart = useAppSelector((state) => state.cartState.data);
  const buyNow = useAppSelector((state) => state.buyNowState.data);

  const [state, setState] = useState<TMakeOrder>();
  const [error, setError] = useState<{
    [K in keyof Partial<TMakeOrder>]: string;
  }>({});

  const handleInputField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | UISelectOptionEvent
  ) => {
    const { name, type, required } = e.target;
    const value = parseInputType(type, e);
    const valid = value !== null && value !== undefined && value !== "";

    setState((prev: any) => {
      const newState = { ...prev, [name]: valid ? value : undefined };

      if (name === "province_id" && valid) {
        newState.city_id = undefined;
        newState.area_id = undefined;
        dispatch(resetCities());
        dispatch(resetAreas());
        dispatch(resetShippingPrice());
      }

      if (name === "city_id" && valid) {
        newState.area_id = undefined;
        dispatch(resetAreas());
        dispatch(resetShippingPrice());
      }
      if (name === "area_id" && valid) {
        dispatch(resetShippingPrice());
      }

      return newState;
    });

    if (required && valid) {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserAddress({ token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getProvinces());
  }, [dispatch]);

  useEffect(() => {
    if (state?.province_id) {
      dispatch(getCities({ id: Number(state.province_id) }));
    }
  }, [dispatch, state?.province_id]);

  useEffect(() => {
    if (state?.city_id) {
      dispatch(getAreas({ id: Number(state.city_id) }));
    }
  }, [dispatch, state?.city_id]);

  useEffect(() => {
    if (state?.area_id) {
      dispatch(getShippingPrice({ id: Number(state.area_id) }));
    }
  }, [dispatch, state?.area_id]);

  const calculateSubtotal = () => {
    return (from === "buyNow" ? buyNow : cart).reduce((total, item) => {
      return total + parseFloat(item.product.discounted_amount) * item.quantity;
    }, 0);
  };
  const orderData = useAppSelector((state) => state.orderState);

  const subtotal = calculateSubtotal();
  const shipping = Number(shippingPrice?.shipping_price) || 0;
  const discount = 0;
  const total = orderData?.coupon?.new_total
    ? orderData?.coupon?.new_total
    : subtotal + shipping - discount;
  const couponDiscount = orderData?.coupon?.new_total
    ? subtotal + shipping - discount - orderData?.coupon?.new_total
    : 0;

  const handleApplyCoupon = () => {
    try {
      if (!state?.coupon_code) {
        errorToast("Coupon code is required");
        return;
      }
      const errors = ["province_id", "city_id", "area_id"].reduce(
        (acc, key) => {
          if (!state?.[key as keyof TMakeOrder]) {
            acc[key] = `${
              key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")
            } is required`;
          }
          return acc;
        },
        {} as Record<string, string>
      );

      if (shippingPrice && Number(shippingPrice?.shipping_price) < 0)
        errorToast("Please validate indicated fields");

      if (Object.keys(errors).length) {
        setError((prev) => ({ ...prev, ...errors }));
        return;
      }

      const payload = {
        total_quantity: (from === "buyNow" ? buyNow : cart).reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
        cart_total: (from === "buyNow" ? buyNow : cart).reduce(
          (sum, item) =>
            sum + Number(item.product?.discounted_amount) * item.quantity,
          0
        ),
        items: (from === "buyNow" ? buyNow : cart).map((item) => ({
          id: item.productId,
          name: item.product.name,
          rate: Number(item.product.discounted_amount),
          quantity: item.quantity,
          amount: Number(item.product?.discounted_amount) * item.quantity,
          discount: 0,
          total: Number(item.product.discounted_amount) * item.quantity,
        })),
        coupon_code: state?.coupon_code,
        shipping_price: Number(shippingPrice?.shipping_price),
      };

      dispatch(
        checkCoupon({
          data: payload as TCouponCheck,
          token: token,
        })
      );
    } catch (error) {
      errorToast("Something went wrong. Please try again.");
    }
  };
  const handleMakeOrder = () => {
    try {
      const payload = {
        order_date: new Date().toISOString().split("T")[0],
        address: state?.address,
        ...(token && profile?.data && { customer_id: profile?.data?.id }),
        reciever_name: state?.reciever_name,
        address_type: state?.address_type,
        province_id: state?.province_id,
        city_id: state?.city_id,
        area_id: state?.area_id,
        location: state?.location,
        phone_number: state?.phone_number,
        email: state?.email,
        payment_type: state?.payment_type,
        payment_status: state?.payment_type === "cash" ? "unpaid" : "paid",
        total_quantity: (from === "buyNow" ? buyNow : cart).reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
        total_amount: (from === "buyNow" ? buyNow : cart).reduce(
          (sum, item) =>
            sum + Number(item.product?.discounted_amount) * item.quantity,
          0
        ),
        total_discount: 0,
        shipping_price: shipping || 0,
        grand_total: total,
        items: (from === "buyNow" ? buyNow : cart).map((item) => ({
          id: item.productId,
          name: item.product.name,
          rate: Number(item.product.discounted_amount),
          quantity: item.quantity,
          amount: Number(item.product?.discounted_amount) * item.quantity,
          discount: 0,
          total: Number(item.product.discounted_amount) * item.quantity,
        })),
        ...(state?.coupon_code && { coupon_code: state?.coupon_code }),
        ...(state?.coupon_code && { coupon_discount: couponDiscount || 0 }),
      };

      const response = validateSchema(payload, makeOrderSchema);
      if (response.errors?.hasError) {
        errorToast("Please validate indicated fields");
        setError(response.errors?.error);
        return;
      }

      dispatch(
        makeOrder({
          data: response?.data,
          token: token,
        })
      );
    } catch (error) {
      errorToast("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (orderData?.coupon) {
      successToast("Coupon Applied");
    }
  }, [orderData?.coupon]);

  useEffect(() => {
    if (orderData?.checkout) {
      successToast("Thank you for your order!");
      from === "buyNow" ? dispatch(clearBuyNow()) : dispatch(clearCart());
      dispatch(resetOrderData());

      router.push("/order-success");
    }
  }, [orderData?.checkout, router, dispatch, from]);

  useEffect(() => {
    return () => {
      dispatch(clearBuyNow());
    };
  }, [dispatch]);
  return (
    <>
      {orderData?.loading && <UILoader />}
      <Navbar />
      <main>
        <div className="flex flex-col justify-center items-center py-10 bg-white">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col  gap-4">
            <div className="">
              <h1 className="text-xl font-semibold text-webblack mb-2">
                Checkout
              </h1>
              <p className="text-webblack">
                Complete your purchase by filling in the details below
              </p>
            </div>

            <div className="flex  gap-8 max-[900px]:flex-col w-full">
              <div className="w-[60%] max-[900px]:w-full">
                <div className="bg-white rounded-lg shadow-sm  ">
                  <div className="border-b border-gray-200 bg-gray-50 p-4">
                    <h2 className="text-lg font-medium text-webblack flex items-center">
                      <i className="fas fa-map-marker-alt text-webblack mr-2"></i>
                      Shipping Address
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <div className="flex gap-4 flex-nowrap pb-4 w-full">
                      {address?.data?.map((item) => (
                        <div
                          key={item.id}
                          className={`
                          bg-gray-100 p-6 flex flex-col gap-2 rounded-lg shadow-md text-webblack 
                          ${
                            state?.address === Number(item.id)
                              ? "border-2 border-blue-500"
                              : ""
                          }
                        `}
                        >
                          <div className="flex justify-end">
                            <input
                              type="checkbox"
                              name="address"
                              id={`address-${item.id}`}
                              checked={state?.address === Number(item.id)}
                              onChange={() =>
                                setState((prev: any) => {
                                  if (prev?.address === item.id) {
                                    dispatch(resetCities());
                                    dispatch(resetAreas());
                                    dispatch(resetShippingPrice());
                                    return {
                                      ...prev,
                                      address: undefined,
                                      province_id: undefined,
                                      city_id: undefined,
                                      area_id: undefined,
                                      location: undefined,
                                      address_type: undefined,
                                    };
                                  }

                                  return {
                                    ...prev,
                                    address: item.id,
                                    province_id: item.province.id?.toString(),
                                    city_id: item.city.id?.toString(),
                                    area_id: item.area.id?.toString(),
                                    location: item.location,
                                    address_type: item.type,
                                  };
                                })
                              }
                              className="mr-3 h-5 w-5"
                            />
                          </div>
                          <div className=" flex items-center gap-3 whitespace-nowrap">
                            <i className="fa-solid fa-globe"></i>
                            <span className="font-semibold">Province: </span>
                            {item.province.name}
                          </div>
                          <div className=" flex items-center gap-3 whitespace-nowrap">
                            <i className="fa-solid fa-city"></i>
                            <span className="font-semibold">City: </span>{" "}
                            {item.city.name}
                          </div>
                          <div className="flex items-center gap-3 whitespace-nowrap">
                            <i className="fa-solid fa-location"></i>
                            <span className="font-semibold">Area: </span>{" "}
                            {item.area.name}
                          </div>
                          <div className="flex items-center gap-3">
                            <i className="fa-solid fa-location-dot"></i>
                            <span className="font-semibold">
                              Location:{" "}
                            </span>{" "}
                            {item.location}
                          </div>
                          <div className="flex items-center gap-3">
                            <i className="fa-solid fa-house"></i>
                            <span className="font-semibold">Type: </span>{" "}
                            {item.type}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid max-small:grid-cols-1 grid-cols-2 gap-4">
                      <UISelect
                        label="Province"
                        placeholder="Choose your province"
                        options={[
                          ...(provinces?.map((item) => ({
                            value: item.id?.toString(),
                            displayValue: item.name,
                            search: item.name,
                          })) || []),
                        ]}
                        onChange={handleInputField}
                        showSearch
                        name="province_id"
                        isRequired
                        defaultValue={state?.province_id?.toString()}
                        error={error.province_id}
                        disabled={state?.address ? true : false}
                      />
                      <UISelect
                        label="City"
                        placeholder="Choose your city"
                        options={[
                          ...(cities?.map((item) => ({
                            value: item.id?.toString(),
                            displayValue: item.name,
                            search: item.name,
                          })) || []),
                        ]}
                        onChange={handleInputField}
                        showSearch
                        name="city_id"
                        isRequired
                        defaultValue={state?.city_id?.toString()}
                        error={error.city_id}
                        disabled={state?.address ? true : false}
                      />
                      <UISelect
                        label="Area"
                        placeholder="Choose your area"
                        options={[
                          ...(areas?.map((item) => ({
                            value: item.id?.toString(),
                            displayValue: item.name,
                            search: item.name,
                          })) || []),
                        ]}
                        onChange={handleInputField}
                        showSearch
                        isRequired
                        name="area_id"
                        defaultValue={state?.area_id?.toString()}
                        error={error.area_id}
                        disabled={state?.address ? true : false}
                      />
                      <UIInput
                        label="Location"
                        placeholder="Your detailed address..."
                        isRequired
                        onChange={handleInputField}
                        name="location"
                        value={state?.location}
                        error={error.location}
                        readOnly={state?.address ? true : false}
                      />
                      <UISelect
                        label="Location Type"
                        placeholder="Choose your location type"
                        options={[
                          { value: "home", displayValue: "Home" },
                          { value: "office", displayValue: "Office" },
                          { value: "others", displayValue: "Others" },
                        ]}
                        onChange={handleInputField}
                        showSearch
                        isRequired
                        name="address_type"
                        defaultValue={state?.address_type?.toString()}
                        error={error.address_type}
                        disabled={state?.address ? true : false}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm  ">
                  <div className="border-b border-gray-200 bg-gray-50 p-4">
                    <h2 className="text-lg font-medium text-webblack flex items-center">
                      <i className="fas fa-user text-webblack mr-2"></i>
                      Personal Details
                    </h2>
                  </div>
                  <div className="p-4">
                    <div className="grid max-small:grid-cols-1 grid-cols-2 gap-6">
                      <UIInput
                        label="Receiver Name"
                        placeholder="Full name..."
                        isRequired
                        onChange={handleInputField}
                        name="reciever_name"
                        value={state?.reciever_name}
                        error={error.reciever_name}
                      />
                      <UIInput
                        label="Receiver Email"
                        placeholder="Email address..."
                        isRequired
                        type="email"
                        onChange={handleInputField}
                        name="email"
                        value={state?.email}
                        error={error.email}
                      />
                      <UIInput
                        label="Receiver Phone No."
                        placeholder="Phone number..."
                        isRequired
                        type="number"
                        onChange={handleInputField}
                        name="phone_number"
                        value={state?.phone_number}
                        error={error.phone_number}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm ">
                  <div className="border-b border-gray-200 bg-gray-50 p-4">
                    <h2 className="text-lg font-medium text-webblack flex items-center">
                      <i className="fas fa-credit-card text-webblack mr-2"></i>
                      Payment Method
                    </h2>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <label className="flex items-center p-4 border rounded-lg transition-colors cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment_type"
                          value="cash"
                          onChange={handleInputField}
                          checked={state?.payment_type === "cash"}
                          className="h-5 w-5 text-primary"
                        />
                        <div className="ml-3">
                          <span className="block text-webblack font-medium">
                            Cash on Delivery
                          </span>
                          <span className="block text-webblack text-sm">
                            Pay when you receive your order
                          </span>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border rounded-lg transition-colors cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment_type"
                          value="online"
                          checked={state?.payment_type === "online"}
                          className="h-5 w-5 text-primary"
                          onChange={handleInputField}
                        />
                        <div className="ml-3">
                          <span className="block text-webblack font-medium">
                            QR Payment
                          </span>
                          <span className="block text-webblack text-sm">
                            Pay now using QR code
                          </span>
                        </div>
                      </label>

                      {state?.payment_type === "online" && (
                        <div className="mt-4 flex justify-center p-6 bg-gray-50 rounded-lg">
                          <div className="max-w-xs">
                            <p className="text-center text-webblack mb-4">
                              <i className="fas fa-qrcode text-primary mr-2"></i>
                              Scan the QR code to make payment
                            </p>
                            <div className="bg-white p-4 rounded-lg shadow-sm mx-auto">
                              <Image
                                src={QR}
                                alt="QR Code"
                                className="w-full h-auto"
                                unoptimized
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[40%] max-[900px]:w-full">
                <div className="bg-white rounded-lg shadow-sm ">
                  <div className="border-b border-gray-200 bg-gray-50 p-4">
                    <h2 className="text-lg font-medium text-webblack flex items-center">
                      <i className="fas fa-shopping-cart text-webblack mr-2"></i>
                      Order Summary
                    </h2>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {(from === "buyNow" ? buyNow : cart).length === 0 ? (
                      <div className="p-6 text-center text-webblack">
                        <i className="fas fa-shopping-basket text-gray-300 text-3xl mb-2"></i>
                        <p>Your cart is empty</p>
                      </div>
                    ) : (
                      <div className="large:max-h-80 overflow-y-auto">
                        {(from === "buyNow" ? buyNow : cart).map((item) => (
                          <div
                            key={item.productId}
                            className="flex items-center p-4 gap-4  max-small:justify-center max-small:flex-col"
                          >
                            <div className="w-16 h-16 bg-gray-100 rounded-md relative flex-shrink-0">
                              <Image
                                src={item.product.image_link}
                                alt={item.product.name}
                                unoptimized
                                fill
                                className="h-full w-full object-contain p-2"
                              />
                            </div>

                            <div className="flex-1 flex flex-col gap-2 max-small:text-center">
                              <h3 className="text-base font-medium text-webblack  r">
                                {item.product.name}
                              </h3>
                              <div className="text-base font-semibold text-primary whitespace-nowrap max-small:text-center">
                                Rs{" "}
                                {(
                                  parseFloat(item.product.discounted_amount) *
                                  item.quantity
                                ).toLocaleString()}{" "}
                                <i className="fas fa-times text-xs mr-1"></i>
                                {item.quantity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="bg-white rounded-lg shadow-sm ">
                      <div className="border-b border-gray-200 bg-gray-50 p-4">
                        <h2 className="text-lg font-medium text-webblack flex items-center">
                          <i className="fas fa-tag text-webblack mr-2"></i>
                          Apply Coupon
                        </h2>
                      </div>
                      <div className="p-4">
                        <div className="flex gap-4">
                          <UIInput
                            placeholder="Enter coupon code..."
                            onChange={handleInputField}
                            name="coupon_code"
                            value={state?.coupon_code}
                            error={error.coupon_code}
                          />
                          <UIButton
                            label="Apply"
                            type="secondary"
                            onClick={handleApplyCoupon}
                            className="whitespace-nowrap"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 bg-gray-50">
                      <div className="flex justify-between text-base">
                        <span className="text-webblack">Subtotal</span>
                        <span className="font-medium text-webblack">
                          Rs {subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-base">
                        <span className="text-webblack">Shipping Fee</span>
                        <span className="font-medium text-webblack">
                          Rs {shipping.toLocaleString()}
                        </span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-base">
                          <span className="text-webblack">Discount</span>
                          <span className="font-medium text-green-600">
                            - Rs {discount.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {couponDiscount > 0 && (
                        <div className="flex justify-between text-base">
                          <span className="text-webblack">Coupon Discount</span>
                          <span className="font-medium text-green-600">
                            - Rs {couponDiscount.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="text-base font-medium text-webblack">
                            Total
                          </span>
                          <span className="text-base font-medium text-webblack">
                            Rs {total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <UIButton
                      label={
                        loading ? (
                          <span>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Processing...
                          </span>
                        ) : (
                          <span>
                            <i className="fas fa-check-circle mr-2"></i>Place
                            Order
                          </span>
                        )
                      }
                      type="primary"
                      onClick={handleMakeOrder}
                      disabled={loading}
                      className="w-full py-3"
                    />
                    <p className="mt-4 text-xs text-center text-webblack">
                      <i className="fas fa-shield-alt text-gray-400 mr-1"></i>
                      By placing your order, you agree to our{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Checkout;

export async function getStaticProps(context: any) {
  return {
    props: {
      title: `Checkout | ${SITE_NAME}`,
      url: `${SITE_URL}/checkout`,
    },
  };
}
