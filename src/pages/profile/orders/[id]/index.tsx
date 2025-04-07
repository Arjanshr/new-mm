import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { useEffect } from "react";

import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getOrder, getOrderItem } from "@/redux/thunks/orderThunk";
import { getAccessTokenFromLocalStorage } from "@/utils/local";
import Sidebar from "@/components/sidebar";
import OrderCard from "@/components/order-card";
import { TOrder } from "@/schemas/order.schema";
import Image from "next/image";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const OrderDetailPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = getAccessTokenFromLocalStorage();
  const { id } = router.query;
  const orderData = useAppSelector((state) => state.orderState);
  useEffect(() => {
    if (id && token) {
      dispatch(getOrderItem({ id: Number(id as string), token }));
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    if (token) {
      dispatch(getOrder({ token }));
    }
  }, [dispatch, token]);

  const order = orderData.data?.find((item) => item.id === Number(id));
  return (
    <>
      <Navbar />
      <main>
        {/* <LandingPage title="Order Detail" image={LANDING} /> */}
        <div className=" flex flex-col justify-center items-center py-10 bg-background">
          <div className="w-content medium:px-[2.5rem] large:px-0 px-[1.5rem] max-large:w-full">
            <div className="flex gap-4 max-[1050px]:flex-col">
              <div className="flex-1">
                <Sidebar />
              </div>
              <div className="flex-[3] bg-white shadow-lg rounded-lg p-4 space-y-4">
                {order && <OrderCard order={order as TOrder} />}
                <h2 className="text-xl text-primary font-semibold">
                  Order Items
                </h2>
                <div>
                  {orderData?.orderItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center p-4 gap-4 max-small:flex-col "
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-md relative flex-shrink-0">
                        <Image
                          src={
                            item.primary_image ||
                            item?.product?.images[0]?.image
                          }
                          alt={item.product.name}
                          unoptimized
                          fill
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-webblack max-small:text-center small:truncate">
                          {item.product.name}
                        </h3>
                      </div>

                      <div className="text-base font-semibold text-primary">
                        Rs{" "}
                        {(
                          parseFloat(item.price) * item.quantity
                        ).toLocaleString()}{" "}
                        <i className="fas fa-times text-xs mr-1"></i>
                        {item.quantity}
                      </div>
                    </div>
                  ))}
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

export default OrderDetailPage;

export async function getServerSideProps(context: any) {
  return {
    props: {
      title: `Order Details | ${SITE_NAME}`,
      url: `${SITE_URL}/profile/orders/${context.params.id}`,
    },
  };
}
