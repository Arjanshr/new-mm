import UIButton from "@/components/ui/uibutton";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Logo from "../logo";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAccessTokenFromLocalStorage, logout } from "@/utils/local";
import { getProfile } from "@/redux/thunks/profileThunk";
import Image from "next/image";
import { getBrand } from "@/redux/thunks/brandThunk";
import { getCategory } from "@/redux/thunks/categoryThunk";
import { getSearchProducts } from "@/redux/thunks/productThunk";
import UIModal from "../ui/uimodal";
import ProductCard from "../product-card";
import useWindowSize from "@/hooks/useWindowSize";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartState.data);
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const navModalRef = useRef<HTMLDivElement>(null);
  const token = getAccessTokenFromLocalStorage();
  const profile = useAppSelector((state) => state.profileState);
  const brand = useAppSelector((state) => state.brandState);
  const category = useAppSelector((state) => state.categoryState);
  const product = useAppSelector((state) => state.productState);

  useEffect(() => {
    token && dispatch(getProfile({ token }));
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(getBrand());
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getSearchProducts({
        query: searchInput || "",
        page: 1,
        pageSize: 20,
        max_price: 500000,
        min_price: 0,
      })
    );
  }, [dispatch, searchInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navModalRef.current &&
        !navModalRef.current.contains(event.target as Node)
      ) {
        setShowNavModal(false);
      }
    };

    if (showNavModal) {
      document.body.style.overflow = "hidden";

      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";

      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNavModal]);

  const handleBlur = (event: any) => {
    if (
      event &&
      event.currentTarget &&
      !event.currentTarget.contains(event.relatedTarget)
    ) {
      showSearchModal && setShowSearchModal(false);
    }
  };

  const handleSearchClick = () => {
    // if (searchInput.trim() !== "") {
    //   dispatch(resetProductSearch());
    //   if (router.pathname.startsWith("/search")) {
    //     router.push("/search");
    //   }
    //   router.push(`/search?searchText=${searchInput}&page=1`);
    // }
    // setShowSearchModal(false);
  };
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>(
    {}
  );
  const [openAccordion, setOpenAccordion] = useState({
    categories: false,
    brands: false,
    aboutUs: false,
    contact: false,
    blogs: false,
    profile: false,
  });

  const toggleAccordion = (section: any) => {
    setOpenAccordion(
      (prev: {
        categories: boolean;
        brands: boolean;
        aboutUs: boolean;
        contact: boolean;
        blogs: boolean;
        profile: boolean;
      }) => {
        const newState = Object.fromEntries(
          Object.keys(prev).map((key) => [
            key,
            key === section ? !prev[section as keyof typeof prev] : false,
          ])
        ) as typeof prev;

        if (section === "categories" && !newState.categories) {
          setOpenCategories({});
        }

        return newState;
      }
    );
  };

  // Toggle individual category
  const toggleCategory = (categoryId: any) => {
    setOpenCategories((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])),
      [categoryId]: !prev[categoryId],
    }));
  };

  // Close modal and reset states
  const closeNavModal = () => {
    setShowNavModal(false);
    setOpenCategories({});
    setOpenAccordion({
      categories: false,
      brands: false,
      aboutUs: false,
      contact: false,
      blogs: false,
      profile: false,
    });
  };
  const windowSize = useWindowSize();
  return (
    <>
      {/* large Navbar */}
      <div className="sticky top-0 left-0 right-0 z-[999] max-[900px]:hidden">
        <div className="bg-white justify-center items-center flex">
          <div className="w-content  large:px-0 medium:px-[2.5rem] px-[1.5rem]  flex py-3 justify-between items-center max-large:w-full">
            <Logo />
            <div className="relative ">
              <div
                className="flex items-center rounded-md "
                onClick={() => setShowSearchModal(true)}
                tabIndex={1}
              >
                <input
                  type="text"
                  placeholder="Search"
                  value={searchInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchClick();
                      if (e.currentTarget) {
                        handleBlur(e);
                      }
                    }
                  }}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    // setShowSearchModal(true);
                  }}
                  className="h-[42px] w-[300px] large:w-[480px]  rounded-none  p-4 border-[2.23px] border-primary  focus:outline-none rounded-l-md"
                />
                <i
                  className=" fa-solid fa-magnifying-glass p-2 h-[42px] w-[41px] flex justify-center items-center bg-primary text-xl text-white rounded-r-md cursor-pointer"
                  onClick={handleSearchClick}
                ></i>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Link href="/cart" className="flex gap-2 items-center">
                <i className="fa-solid fa-cart-shopping-fast text-primary text-xl " />
                <p
                  className={
                    router.pathname == "/cart"
                      ? "text-base capitalize text-primary font-semibold"
                      : "text-base capitalize "
                  }
                >
                  Cart ({cart?.length})
                </p>
              </Link>
              {token && profile?.data ? (
                <Link href="/profile" className="flex gap-2 items-center">
                  <div className="rounded-full h-10 w-10">
                    <Image
                      src={profile?.data?.profile_image_path as string}
                      alt="profile-img"
                      height={1000}
                      width={1000}
                      className="h-full w-full object-contain rounded-full"
                    />
                  </div>
                  <p
                    className={
                      router.pathname == "/profile"
                        ? "text-base capitalize text-primary font-semibold"
                        : "text-base capitalize "
                    }
                  >
                    Hi, {profile?.data?.name?.split(" ")[0] || ""}
                  </p>
                </Link>
              ) : (
                <Link href="/login" className="flex gap-2 items-center">
                  <i
                    className={`fa-solid fa-right-to-bracket text-primary text-xl `}
                  />
                  <p
                    className={
                      router.pathname == "/login"
                        ? "text-base capitalize text-primary font-semibold"
                        : "text-base capitalize "
                    }
                  >
                    Login
                  </p>
                </Link>
              )}
              <Link href="/aboutus" className="flex gap-2 items-center">
                <i
                  className={`fa-solid fa-circle-question text-primary text-xl`}
                />
                <p
                  className={
                    router.pathname == "/aboutus"
                      ? "text-base capitalize text-primary font-semibold"
                      : "text-base capitalize "
                  }
                >
                  Help
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* navbar */}
        <div className="bg-primary text-white justify-center items-center  flex">
          <div className="w-content  large:px-0 medium:px-[2.5rem] px-[1.5rem]  flex py-3 justify-between items-center max-large:w-full">
            <nav className=" flex gap-8 items-center">
              <Link
                href="/"
                className={`hover:text-yellow hover:font-semibold ${
                  router.pathname === "/" ? "text-yellow font-semibold" : ""
                }`}
              >
                Home
              </Link>

              <div className="relative group">
                <Link
                  href="/categories"
                  className={`hover:text-yellow hover:font-semibold flex items-center gap-1 ${
                    router.pathname === "/categories" ||
                    router.pathname.startsWith("/categories/")
                      ? "text-yellow font-semibold"
                      : ""
                  }`}
                >
                  Categories
                  <i className="fa-solid fa-chevron-down text-xs ml-1"></i>
                </Link>

                <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {category?.data?.map((category) => (
                    <div key={category.id} className="relative group/category">
                      <Link
                        href={`/categories/${category.slug}`}
                        className="block px-4 py-2 text-sm text-webblack hover:bg-gray-100 hover:text-primary"
                      >
                        <div className="flex justify-between items-center ">
                          <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
                            <div className="w-8 h-8 flex-shrink-0">
                              <Image
                                src={category.imageLink}
                                alt={category.name}
                                width={32}
                                height={32}
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {category.name}
                            </span>
                          </div>
                          <i className="fas fa-chevron-right text-xs"></i>
                        </div>
                      </Link>

                      <div className="absolute left-full top-0 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover/category:opacity-100 group-hover/category:visible transition-all duration-200  ">
                        {category.subcategories
                          ?.slice()
                          ?.sort(() => Math.random() - 0.5)
                          ?.slice(0, 15)
                          ?.map((subcategory) => (
                            <div
                              key={subcategory.id}
                              className="relative group/subcategory"
                            >
                              <Link
                                href={`/categories/${subcategory.slug}`}
                                className="block px-4 py-2 text-sm text-webblack hover:bg-gray-100 hover:text-primary"
                              >
                                <div className="flex justify-between items-center">
                                  <span>{subcategory.name}</span>
                                  <i className="fas fa-chevron-right text-xs"></i>
                                </div>
                              </Link>

                              <div className="absolute left-full top-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover/subcategory:opacity-100 group-hover/subcategory:visible transition-all duration-200">
                                {subcategory?.brand
                                  ?.slice()
                                  ?.sort(() => Math.random() - 0.5)
                                  ?.slice(0, 10)
                                  ?.map((brand) => (
                                    <Link
                                      key={brand.id}
                                      href={`/brands/${brand.slug}`}
                                      className="block px-4 py-2 text-sm text-webblack hover:bg-gray-100 hover:text-primary"
                                    >
                                      {brand.name}
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <Link
                  href="/brands"
                  className={`hover:text-yellow hover:font-semibold flex items-center gap-1 ${
                    router.pathname === "/brands" ||
                    router.pathname.startsWith("/brands/")
                      ? "text-yellow font-semibold"
                      : ""
                  }`}
                >
                  Brands
                  <i className="fa-solid fa-chevron-down text-xs ml-1"></i>
                </Link>

                <div className="absolute top-full left-0 bg-white text-black shadow-lg rounded-md w-64 max-h-96 overflow-y-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="grid grid-cols-1 gap-2 p-3">
                    {brand?.data && brand?.data.length > 0 ? (
                      brand?.data.map((brand) => (
                        <Link
                          key={brand.id}
                          href={`/brands/${brand.slug}`}
                          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
                        >
                          <div className="w-8 h-8 flex-shrink-0">
                            <Image
                              src={brand.imageLink}
                              alt={brand.name}
                              width={32}
                              height={32}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {brand.name}
                          </span>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-gray-500">No brands available</p>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200 p-2">
                    <Link
                      href="/brands"
                      className="block text-center text-primary hover:underline text-sm font-medium py-1"
                    >
                      View All Brands
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/aboutus"
                className={`hover:text-yellow hover:font-semibold ${
                  router.pathname === "/aboutus"
                    ? "text-yellow font-semibold"
                    : ""
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className={`hover:text-yellow hover:font-semibold ${
                  router.pathname === "/contact"
                    ? "text-yellow font-semibold"
                    : ""
                }`}
              >
                Contact Us
              </Link>
              <Link
                href="/blogs"
                className={`hover:text-yellow hover:font-semibold ${
                  router.pathname === "/blogs"
                    ? "text-yellow font-semibold"
                    : ""
                }`}
              >
                Blogs
              </Link>
            </nav>
            <UIButton
              label="Inquire Now"
              type="secondary"
              href="tel:9801104556"
            />
          </div>
        </div>
      </div>

      {/* small navbar */}

      <div className="sticky top-0 left-0 right-0 z-[999] min-[900px]:hidden ">
        <div className=" justify-center items-center flex">
          <div className="w-content bg-white  large:px-0 medium:px-[2.5rem] px-[1.5rem]  flex py-3 justify-between items-center max-large:w-full">
            <Logo />

            <div className=" flex items-center">
              <div className="flex gap-6">
                <button
                  onClick={() => setShowNavModal(!showNavModal)}
                  className="text-primary text-2xl"
                >
                  <i className="fa-solid fa-bars-staggered"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary text-white justify-center items-center  flex">
          <div className="w-content   large:px-0 medium:px-[2.5rem] px-[1.5rem]  flex py-3 justify-between items-center max-large:w-full">
            <div className="flex gap-4 items-center w-full">
              <div
                className="flex items-center rounded-md w-full"
                onClick={() => setShowSearchModal(true)}
              >
                <input
                  type="text"
                  placeholder="Search"
                  value={searchInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchClick();
                      if (e.currentTarget) {
                        handleBlur(e);
                      }
                    }
                  }}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setShowSearchModal(true);
                  }}
                  className="h-[42px] w-full  rounded-none  p-4 border-[2.23px] border-white  focus:outline-none rounded-l-md"
                />
                <i
                  className=" fa-solid fa-magnifying-glass p-2 h-[42px] w-[41px] flex justify-center items-center bg-white text-primary border-white border-2 rounded-r-md cursor-pointer"
                  onClick={handleSearchClick}
                ></i>
              </div>
              <div className="relative">
                <span className="absolute top-[-35%] right-[-10%] bg-white h-[20px] w-[20px] text-xs text-primary font-semibold flex justify-center items-center rounded-full z-[99]">
                  {cart?.length}
                </span>
                <i className="fa-regular fa-cart-shopping text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSearchModal && product?.searchData && (
        <div className="fixed z-[999] top-0 right-0 bottom-0 left-0 bg-opacity-30 bg-black flex justify-center">
          <UIModal onClose={() => setShowSearchModal(false)} showAnimation>
            <div className="flex flex-col gap-4  max-h-[90vh] max-small:w-[100vw] w-[90vw] medium:w-[700px] overflow-auto">
              <div className="bg-white sticky top-0  p-4 flex flex-col gap-4 z-[9]">
                <h2 className="text-xl text-primary font-semibold">
                  Search Product here
                </h2>
                <div className="flex items-center rounded-md " tabIndex={0}>
                  <input
                    type="text"
                    placeholder="Search by product name, brand, category here ..."
                    value={searchInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchClick();
                      }
                    }}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setShowSearchModal(true);
                    }}
                    className="h-[42px] w-full rounded-none  p-4 border-[2.23px] border-primary  focus:outline-none rounded-l-md"
                  />
                  <i
                    className=" fa-solid fa-magnifying-glass p-2 h-[42px] w-[41px] flex justify-center items-center bg-primary text-xl text-white rounded-r-md cursor-pointer"
                    onClick={handleSearchClick}
                  ></i>
                </div>
              </div>
              <div className="grid min-[650px]:grid-cols-2 gap-4">
                {product?.searchData?.map((product) =>
                  windowSize > 650 ? (
                    <ProductCard key={product.id} data={product} />
                  ) : (
                    <Link
                      href={`/products/${product.slug}`}
                      key={product.id}
                      className="flex items-center p-4 gap-4 w-full"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                        <Image
                          src={product.image_link || ""}
                          alt={product.name}
                          unoptimized
                          height={1000}
                          width={1000}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="text-base font-medium text-webblack">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="text-base font-semibold text-primary">
                            Rs{" "}
                            {parseFloat(
                              product.discounted_amount
                            ).toLocaleString()}
                          </div>{" "}
                          {product?.discounted_amount !==
                            product?.original_amount && (
                            <>
                              <span className="text-webblack line-through text-xs">
                                Rs. {product?.original_amount}
                              </span>
                              <span className=" text-red-800 text-xs font-bold px-2 py-1 rounded-md">
                                -{" "}
                                {Math.round(
                                  ((Number(product?.original_amount) -
                                    Number(product?.discounted_amount)) /
                                    Number(product?.original_amount)) *
                                    100
                                )}
                                % OFF
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </UIModal>
        </div>
      )}
      {showNavModal && (
        <div
          className="fixed top-0 right-0 flex flex-col bg-white text-webblack max-h-screen h-screen shadow-lg z-[9999] w-[100vw] max-w-md transition-transform duration-300 ease-in-out transform translate-x-0 overflow-auto"
          ref={navModalRef}
        >
          {/* Modal Header */}
          <div className="flex justify-between bg-white h-[5rem] items-center p-4 border-b-2 border-primary">
            <Logo />
            <i
              className="fa-regular fa-times text-2xl text-primary hover:text-gray-900 transition-colors duration-200 cursor-pointer"
              onClick={closeNavModal}
            ></i>
          </div>
          {/* Profile/Auth Section */}
          <div className="border-b">
            <div
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleAccordion("profile")}
            >
              <div className="flex items-center">
                {token && profile?.data ? (
                  <>
                    <div className="w-8 h-8 mr-3 rounded-full overflow-hidden">
                      <Image
                        src={
                          profile?.data?.profile_image_path ||
                          "/default-avatar.png"
                        }
                        alt={profile?.data?.name || "User Profile"}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span>{profile?.data?.name || "Profile"}</span>
                  </>
                ) : (
                  <span>Login / Register</span>
                )}
              </div>
              <i
                className={`fas ${
                  openAccordion.profile ? "fa-chevron-up" : "fa-chevron-down"
                } text-sm`}
              ></i>
            </div>

            {openAccordion.profile && (
              <div className="bg-gray-50">
                {token && profile?.data ? (
                  <>
                    <Link
                      href="/profile"
                      className="block p-4 hover:bg-gray-100 border-b"
                      onClick={closeNavModal}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block p-4 hover:bg-gray-100 border-b"
                      onClick={closeNavModal}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="#"
                      role="button"
                      className="block p-4 hover:bg-gray-100 text-red-600"
                      onClick={() => {
                        logout();
                        closeNavModal();
                      }}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block p-4 hover:bg-gray-100 border-b"
                      onClick={closeNavModal}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block p-4 hover:bg-gray-100"
                      onClick={closeNavModal}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Navigation Content */}
          <div className="flex-grow overflow-y-auto">
            {/* Home */}
            <Link
              href="/"
              className={`block p-4 border-b hover:bg-gray-100 ${
                router.pathname === "/" ? "bg-primary/10 text-primary" : ""
              }`}
              onClick={closeNavModal}
            >
              Home
            </Link>

            {/* Categories Accordion */}
            <div className="border-b">
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => toggleAccordion("categories")}
              >
                <span>Categories</span>
                <i
                  className={`fas ${
                    openAccordion.categories
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                  } text-sm`}
                ></i>
              </div>

              {openAccordion.categories && (
                <div className="bg-gray-50">
                  {category?.data?.map((cat) => (
                    <div key={cat.id} className="border-b">
                      <div
                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleCategory(cat.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 mr-3 flex-shrink-0">
                            <Image
                              src={cat.imageLink}
                              alt={cat.name}
                              width={32}
                              height={32}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <span>{cat.name}</span>
                        </div>
                        <i
                          className={`fas ${
                            openCategories[cat.id]
                              ? "fa-chevron-down"
                              : "fa-chevron-right"
                          } text-sm`}
                        ></i>
                      </div>

                      {/* Subcategories */}
                      {openCategories[cat.id] && (
                        <div className="bg-white">
                          {cat.subcategories?.map((subcat) => (
                            <Link
                              key={subcat.id}
                              href={`/categories/${subcat.slug}`}
                              className="block pl-12 p-3 hover:bg-gray-100 text-sm border-b"
                              onClick={closeNavModal}
                            >
                              {subcat.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Brands Accordion */}
            <div className="border-b">
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => toggleAccordion("brands")}
              >
                <span>Brands</span>
                <i
                  className={`fas ${
                    openAccordion.brands ? "fa-chevron-up" : "fa-chevron-down"
                  } text-sm`}
                ></i>
              </div>

              {openAccordion.brands && (
                <div className="bg-gray-50">
                  {brand?.data?.map((brandItem) => (
                    <Link
                      key={brandItem.id}
                      href={`/brands/${brandItem.slug}`}
                      className="flex items-center p-4 hover:bg-gray-100 border-b"
                      onClick={closeNavModal}
                    >
                      <div className="w-8 h-8 mr-3 flex-shrink-0">
                        <Image
                          src={brandItem.imageLink}
                          alt={brandItem.name}
                          width={32}
                          height={32}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <span>{brandItem.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/brands"
                    className="block p-4 text-center text-primary hover:bg-gray-100"
                    onClick={closeNavModal}
                  >
                    View All Brands
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/aboutus"
              className={`block p-4 border-b hover:bg-gray-100 ${
                router.pathname === "/aboutus"
                  ? "bg-primary/10 text-primary"
                  : ""
              }`}
              onClick={closeNavModal}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className={`block p-4 border-b hover:bg-gray-100 ${
                router.pathname === "/contact"
                  ? "bg-primary/10 text-primary"
                  : ""
              }`}
              onClick={closeNavModal}
            >
              Contact Us
            </Link>

            <Link
              href="/blogs"
              className={`block p-4 border-b hover:bg-gray-100 ${
                router.pathname === "/blogs" ? "bg-primary/10 text-primary" : ""
              }`}
              onClick={closeNavModal}
            >
              Blogs
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
