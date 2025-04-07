import { TCategory } from "@/schemas/category.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TProduct,
  TProductDetail,
  TProductSpecification,
} from "@/schemas/product.schema";
import {
  getCampaignProduct,
  getFeaturedProduct,
  getNewArrivalProduct,
  getPopularProduct,
  getProductCompareDetail,
  getProductDetail,
  getProductFeature,
  getProductSpecification,
  getRelatedProduct,
  getSearchProducts,
} from "../thunks/productThunk";

interface ProductState {
  specifications: TProductSpecification[];
  features: any[];
  reviews: any[];
  relatedProducts: TProduct[];
  compareProductDetail: TProductDetail | null;
  comaprisions: any | null;
  searchData: TProduct[];
  popularProducts: TProduct[];
  featuredProducts: TProduct[];
  newArrivalsProducts: TProduct[];
  campaignProducts: TProduct[];
  loading: boolean;
  error: string | null;
  expires: number | null;
}

const initialState: ProductState = {
  specifications: [],
  features: [],
  reviews: [],
  relatedProducts: [],
  compareProductDetail: null,
  comaprisions: null,
  searchData: [],
  popularProducts: [],
  featuredProducts: [],
  newArrivalsProducts: [],
  campaignProducts: [],
  loading: false,
  error: null,
  expires: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductPage: (state) => {
      state.specifications = [];
      state.features = [];
      state.reviews = [];
      state.relatedProducts = [];
      state.compareProductDetail = null;
      state.comaprisions = null;
    },
    resetCompareProduct: (state) => {
      state.compareProductDetail = null;
      state.comaprisions = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //!Fetch
      .addCase(getProductSpecification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getProductSpecification.fulfilled, (state, action) => {
        state.loading = false;
        state.specifications = action.payload;
        state.error = null;
      })
      .addCase(getProductSpecification.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product data";
        state.expires = null;
      })
      .addCase(getProductFeature.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getProductFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.features = action.payload;
        state.error = null;
      })
      .addCase(getProductFeature.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product data";
        state.expires = null;
      })
      .addCase(getRelatedProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getRelatedProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload;
        state.error = null;
      })
      .addCase(getRelatedProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product data";
        state.expires = null;
      })
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.compareProductDetail = action.payload;
        state.error = null;
      })
      .addCase(getProductDetail.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product data";
        state.expires = null;
      })
      .addCase(getProductCompareDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getProductCompareDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.comaprisions = action.payload;
        state.error = null;
      })
      .addCase(getProductCompareDetail.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product data";
        state.expires = null;
      })
      .addCase(getSearchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchData = action.payload.data;
        state.error = null;
      })
      .addCase(getSearchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product data";
        state.expires = null;
      })
      .addCase(getFeaturedProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getFeaturedProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload.data;
        state.error = null;
      })
      .addCase(getFeaturedProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product data";
        state.expires = null;
      })
      .addCase(getPopularProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getPopularProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.popularProducts = action.payload.data;
        state.error = null;
      })
      .addCase(getPopularProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product data";
        state.expires = null;
      })
      .addCase(getNewArrivalProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getNewArrivalProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.newArrivalsProducts = action.payload.data;
        state.error = null;
      })
      .addCase(getNewArrivalProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product data";
        state.expires = null;
      })
      .addCase(getCampaignProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expires = null;
      })
      .addCase(getCampaignProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.campaignProducts = action.payload;
        state.error = null;
      })
      .addCase(getCampaignProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product data";
        state.expires = null;
      });
  },
});
export const { resetProductPage, resetCompareProduct } = productSlice.actions;
export default productSlice.reducer;
