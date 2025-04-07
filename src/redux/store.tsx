import {
  AnyAction,
  Store,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { PERSIST_KEY, PERSIST_VERSION } from "@/lib/config";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";

import brandReducer from "./slice/brandSlice";
import categoryReducer from "./slice/categorySlice";
import productReducer from "./slice/productSlice";
import cartReducer from "./slice/cartSlice";
import buyNowReducer from "./slice/buyNowSlice";
import addressReducer from "./slice/addressSlice";
import orderReducer from "./slice/orderSlice";
import registerReducer from "./slice/registerSlice";
import loginReducer from "./slice/loginSlice";
import forgotpasswordReducer from "./slice/forgotpasswordSlice";
import resetpasswordReducer from "./slice/resetpasswordSlice";
import profileReducer from "./slice/profileSlice";
import changepasswordReducer from "./slice/changepasswordSlice";
import userAddressReducer from "./slice/useraddressSlice";
import wishlistReducer from "./slice/wishlistSlice";
const persistConfig = {
  key: PERSIST_KEY,
  version: PERSIST_VERSION,
  storage,
  whitelist: ["cartState", "buyNowState"],
};

const rootReducer = combineReducers({
  brandState: brandReducer,
  categoryState: categoryReducer,
  productState: productReducer,
  cartState: cartReducer,
  buyNowState: buyNowReducer,
  wishlistState: wishlistReducer,

  addressState: addressReducer,
  orderState: orderReducer,

  registerState: registerReducer,
  loginState: loginReducer,
  forgotpasswordState: forgotpasswordReducer,
  resetpasswordState: resetpasswordReducer,
  profileState: profileReducer,
  useraddressState: userAddressReducer,
  changepasswordState: changepasswordReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: AppStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
