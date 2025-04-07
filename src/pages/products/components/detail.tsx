import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { TProductDetail } from "@/schemas/product.schema";
import UIButton from "@/components/ui/uibutton";
import Link from "next/link";
import { SITE_URL } from "@/lib/config";
import useWindowSize from "@/hooks/useWindowSize";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/slice/cartSlice";
import { infoToast, successToast } from "@/lib/toastify";
import { addToBuyNow } from "@/redux/slice/buyNowSlice";
import { useRouter } from "next/router";

interface ProductDetailProps {
  product: TProductDetail;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const shareUrl = `${SITE_URL}/products/${product.slug}`;
  const windowSize = useWindowSize();
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartState.data);
  const isInCart = cart.some((item: any) => item.productId === product.id);
  const handleBuyNow = () => {
    dispatch(
      addToBuyNow({
        productId: product.id,
        quantity: quantity,
        product: product,
      })
    );
    router.push(`/checkout?from=buyNow`);
  };
  const handleAddToCart = () => {
    dispatch(
      addToCart({ productId: product.id, quantity: quantity, product: product })
    );
    successToast("Item Added To Cart");
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ productId: product.id }));
    successToast("Item Removed From Cart");
  };
  return (
    <div className="bg-white flex justify-center items-center">
      <div className="w-content large:px-0 medium:px-[2.5rem] px-[1.5rem] flex gap-10 max-large:w-full max-[900px]:flex-col">
        <div className="w-[50%] flex flex-col gap-4 max-[900px]:w-full">
          <div
            ref={imageContainerRef}
            className="h-[400px] max-small:h-[300px] rounded-lg shadow-xl p-4 relative overflow-hidden cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
          >
            <div className="w-full h-full relative">
              <Image
                src={currentImage}
                alt={product.name}
                height={1000}
                width={1000}
                className="w-full h-full object-contain"
              />
            </div>

            {isZooming && windowSize > 900 && (
              <div
                className="absolute inset-0 bg-white"
                style={{
                  backgroundImage: `url("${currentImage}")`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "150%",
                  opacity: 1,
                  pointerEvents: "none",
                }}
              ></div>
            )}
          </div>
          <div className="max-w-[600px] relative">
            {product.images?.length > 3 && (
              <>
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-white transition-all"
                  onClick={() => swiperRef.current?.slidePrev()}
                  aria-label="Previous image"
                >
                  <i className="fas fa-chevron-left text-webblack"></i>
                </button>

                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-white transition-all"
                  onClick={() => swiperRef.current?.slideNext()}
                  aria-label="Next image"
                >
                  <i className="fas fa-chevron-right text-webblack"></i>
                </button>
              </>
            )}

            <Swiper
              id="productDetailSwiper"
              spaceBetween={20}
              slidesPerView={4}
              loop={true}
              modules={[Navigation, Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                const realIndex = swiper.realIndex;
                setActiveIndex(realIndex);
                setCurrentImage(product.images[realIndex]);
              }}
              className="px-2"
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 10 },
                640: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`h-[100px] p-1 cursor-pointer shadow-lg rounded-lg overflow-hidden ${
                      index === activeIndex
                        ? "border-2 border-blue-500"
                        : "border border-gray-200"
                    }`}
                    onClick={() => {
                      setCurrentImage(image);
                      setActiveIndex(index);
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      height={1000}
                      width={1000}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="w-[50%] flex flex-col gap-4 max-[900px]:w-full">
          <h1 className="text-xl font-semibold text-webblack">
            {product.name}
          </h1>
          <hr />
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              {Array.from({ length: 5 }, (_, index) => (
                <i
                  key={index}
                  className={`fas ${
                    index < Math.floor(product.average_rating || 4)
                      ? "fa-star text-yellow"
                      : "fa-star text-gray-300"
                  }`}
                ></i>
              ))}
            </div>

            <div className=" flex flex-wrap gap-2">
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                In Stock
              </span>
              {product.tags.new && (
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  New
                </span>
              )}
              {product.tags.popular && (
                <span className="bg-yellow text-white text-xs font-semibold px-2 py-1 rounded-md">
                  Popular
                </span>
              )}
              {product.tags.campaign && (
                <span className="bg-rose-900 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  {product.tags.campaign}
                </span>
              )}
            </div>
          </div>
          <div
            className=" text-base text-webblack"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <div className="flex items-center">
            <span className="text-lg font-semibold text-webblack">
              Rs {product.discounted_amount}
            </span>
            {product.discounted_amount !== product.original_amount && (
              <>
                <span className="text-webblack line-through text-base">
                  Rs {product.original_amount}
                </span>
                {/* Discount Badge */}
                <span className=" text-red-800 text-base font-bold px-2 py-1 rounded-md">
                  -{" "}
                  {Math.round(
                    ((Number(product.original_amount) -
                      Number(product.discounted_amount)) /
                      Number(product.original_amount)) *
                      100
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                } else {
                  infoToast("Quantity can't be less than 1");
                }
              }}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="text-webblack font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="flex gap-4 max-small:flex-wrap">
            <UIButton
              label={
                <span>
                  <i className="fas fa-shopping-cart"></i> Buy Now
                </span>
              }
              type="primary"
              className="w-full"
              onClick={handleBuyNow}
            />
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
          <div className="text-base  flex items-center">
            <i className="fas fa-arrow-turn-down-right mr-2 text-primary"></i>{" "}
            Free return up to 7 days
          </div>
          <div className=" rounded-lg flex gap-2 items-center">
            <h3 className="text-base  flex items-center">
              <i className="fas fa-share-alt mr-2 text-primary"></i>
              Share
            </h3>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3b5998] text-white p-0 rounded-full  flex items-center justify-center w-8 h-8"
                aria-label="Share on Facebook"
              >
                <i className="fa-brands fa-facebook fa-lg"></i>
              </Link>
              <Link
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
                  product.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1da1f2] text-white p-0 rounded-full  flex items-center justify-center w-8 h-8"
                aria-label="Share on Twitter"
              >
                <i className="fa-brands fa-twitter fa-lg"></i>
              </Link>
              <Link
                href={`https://t.me/share/url?url=${shareUrl}&text=${encodeURIComponent(
                  product.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0088cc] text-white p-0 rounded-full  flex items-center justify-center w-8 h-8"
                aria-label="Share on Telegram"
              >
                <i className="fa-brands fa-telegram fa-lg"></i>
              </Link>
              <Link
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  product.name + " " + shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25d366] text-white p-0 rounded-full  flex items-center justify-center w-8 h-8"
                aria-label="Share on WhatsApp"
              >
                <i className="fa-brands fa-whatsapp fa-lg"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
