import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";
import UIButton from "@/components/ui/uibutton";
import useWindowSize from "@/hooks/useWindowSize";
import {
  API_BASE_URL,
  SITE_NAME,
  SITE_URL,
  WEBSITE_BASE_URL,
} from "@/lib/config";
import { resetCategorysPage } from "@/redux/slice/categorySlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getBrandForCategory,
  getCategoryProducts,
} from "@/redux/thunks/categoryThunk";
import { TBrand } from "@/schemas/brand.schema";

import { TCategory } from "@/schemas/category.schema";
import { TProduct } from "@/schemas/product.schema";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";

interface CategoryProductProps {
  category: TCategory;
}

const CategoryProducts: React.FC<CategoryProductProps> = ({ category }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const windowSize = useWindowSize();
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);

  const categoryData = useAppSelector((state: any) => state.categoryState);
  const { brands, products, loading, total } = categoryData;

  useEffect(() => {
    if (category) {
      dispatch(getBrandForCategory({ id: category.id }));
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (category) {
      dispatch(
        getCategoryProducts({
          slug: category.slug,
          page,
          pageSize,
          min_price: minPrice,
          max_price: maxPrice,
          min_rating: 0,
          max_rating: 5,
          brands: selectedBrands,
        })
      );
    }
  }, [category, dispatch, page, pageSize, selectedBrands, minPrice, maxPrice]);

  const handleBrandChange = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
    setPage(1);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (e.target.id === "minPriceSlider") {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (e.target.id === "minPrice") {
      setPriceRange([value, priceRange[1]]);
      setMinPrice(value);
    } else {
      setPriceRange([priceRange[0], value]);
      setMaxPrice(value);
    }
  };

  const applyPriceFilter = () => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
    setPage(1);
    setShowFilter(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(total / pageSize)) {
      setPage(newPage);
      const productSection = document.getElementById("products-section");
      if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const totalPages = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize]
  );

  const generatePaginationNumbers = () => {
    let pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);
      if (page <= 3) {
        end = Math.min(totalPages - 1, maxPagesToShow - 1);
      }
      if (page >= totalPages - 2) {
        start = Math.max(2, totalPages - maxPagesToShow + 2);
      }
      if (start > 2) {
        pages.push("...");
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 1) {
        pages.push("...");
      }
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 500000]);
    setMinPrice(0);
    setMaxPrice(500000);
    setPage(1);
    setShowFilter(false);
  };
  useEffect(() => {
    return () => {
      dispatch(resetCategorysPage());
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col justify-center items-center py-10 bg-white relative">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex items-start gap-4">
            <div
              className={`large:w-1/4 w-[300px] bg-gray-100 p-4 rounded-lg transition-all duration-300 
    ${
      showFilter && windowSize < 1350
        ? "fixed top-0 right-0 z-[9999] shadow-lg min-h-screen overflow-auto"
        : "max-large:hidden"
    }`}
            >
              <div className="large:hidden flex justify-end">
                <i
                  className="fa-solid fa-times h-10 w-10 bg-primary text-white flex justify-center items-center text-xl"
                  onClick={() => setShowFilter(false)}
                ></i>
              </div>
              <h2 className="font-semibold text-lg mb-4">Filter by Brand</h2>
              <div className="space-y-2">
                {/* {loading ? (
                  <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : ( */}
                {brands?.map((brand: TBrand) => (
                  <div key={brand.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand.id}`}
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => handleBrandChange(brand.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
                  </div>
                ))}
              </div>

              {/* Price Range Filter with Slider */}
              <div className="mt-6">
                <h2 className="font-semibold text-lg mb-4">Price Range</h2>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Min: Rs {priceRange[0].toLocaleString()}</span>
                    <span>Max: Rs {priceRange[1].toLocaleString()}</span>
                  </div>

                  <input
                    type="range"
                    id="minPriceSlider"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={handlePriceChange}
                    className="w-full mb-2"
                  />

                  <input
                    type="range"
                    id="maxPriceSlider"
                    min={priceRange[0]}
                    max="500000"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full mb-4"
                  />
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <label htmlFor="minPrice" className="mr-2 text-sm">
                      Min:
                    </label>
                    <input
                      type="number"
                      id="minPrice"
                      value={priceRange[0]}
                      onChange={handlePriceInputChange}
                      className="p-2 border rounded-md w-24"
                    />
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="maxPrice" className="mr-2 text-sm">
                      Max:
                    </label>
                    <input
                      type="number"
                      id="maxPrice"
                      value={priceRange[1]}
                      onChange={handlePriceInputChange}
                      className="p-2 border rounded-md w-24"
                    />
                  </div>
                </div>

                <UIButton
                  onClick={applyPriceFilter}
                  label="Apply Filter"
                  className="w-full"
                  type="primary"
                />

                {(selectedBrands.length > 0 ||
                  minPrice > 0 ||
                  maxPrice < 500000) && (
                  <UIButton
                    onClick={resetFilters}
                    label="Reset Filters"
                    className="w-full md:hidden mt-3"
                    type="secondary"
                  />
                )}
              </div>
            </div>

            <div id="products-section" className="large:w-3/4 p-4 w-full">
              <div className="flex justify-between items-center mb-2 flex-wrap">
                <h2 className="font-semibold text-lg">
                  {category?.name} Products
                </h2>
                <div className="flex items-end gap-4">
                  {/* {!loading && ( */}
                  <p className="text-webblack">
                    Showing {(page - 1) * pageSize + 1}-
                    {Math.min(page * pageSize, total)} of {total} products
                  </p>
                  {/* )} */}
                  {windowSize < 1350 && (
                    <UIButton
                      label={
                        <span>
                          <i className="fa-solid fa-filter"></i> Filter
                        </span>
                      }
                      type="primary"
                      onClick={() => setShowFilter(true)}
                      className="lg:hidden whitespace-nowrap"
                    />
                  )}
                </div>
              </div>
              <hr className="mb-6" />

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : products?.length > 0 ? (
                <div className="grid large:grid-cols-3  grid-cols-1 min-[600px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 gap-4">
                  {products.map((product: TProduct) => (
                    <ProductCard key={product.id} data={product} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <p className="text-webblack text-lg">No products found</p>
                </div>
              )}

              {totalPages > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {/* First Page Button */}
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={page === 1}
                      className={`px-2 py-1 md:px-3 md:py-2 rounded-md ${
                        page === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-primary hover:bg-blue-100"
                      }`}
                      aria-label="Go to first page"
                    >
                      <i className="fas fa-angle-double-left"></i>
                    </button>

                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className={`px-2 py-1 md:px-3 md:py-2 rounded-md ${
                        page === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-primary hover:bg-blue-100"
                      }`}
                      aria-label="Go to previous page"
                    >
                      <i className="fas fa-angle-left"></i>
                    </button>

                    {/* Page Numbers */}
                    {generatePaginationNumbers().map((pageNum, index) =>
                      pageNum === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 py-1 md:px-3 md:py-2 text-webblack"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={`page-${pageNum}`}
                          onClick={() =>
                            typeof pageNum === "number" &&
                            handlePageChange(pageNum)
                          }
                          className={`px-2 py-1 md:px-3 md:py-2 rounded-md ${
                            page === pageNum
                              ? "bg-primary text-white"
                              : "text-primary hover:bg-blue-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    )}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className={`px-2 py-1 md:px-3 md:py-2 rounded-md ${
                        page === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-primary hover:bg-blue-100"
                      }`}
                      aria-label="Go to next page"
                    >
                      <i className="fas fa-angle-right"></i>
                    </button>

                    {/* Last Page Button */}
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={page === totalPages}
                      className={`px-2 py-1 md:px-3 md:py-2 rounded-md ${
                        page === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-primary hover:bg-blue-100"
                      }`}
                      aria-label="Go to last page"
                    >
                      <i className="fas fa-angle-double-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoryProducts;

export async function getServerSideProps(context: any) {
  try {
    const { slug } = context?.query;
    const category = await axios.get(`${API_BASE_URL}/categories/${slug}`);
    return {
      props: {
        category: category.data.data || null,
        title: `${category?.data?.data?.name} | ${SITE_NAME}`,
        url: `${SITE_URL}/categories/${slug}`,
        image: `${WEBSITE_BASE_URL}/${category.data?.data?.imageLink}`,
      },
    };
  } catch (error) {
    return {
      props: {
        category: null,
        title: `Categories | ${SITE_NAME}`,
        url: `${SITE_URL}/categories`,
      },
    };
  }
}
