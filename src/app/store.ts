import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productReducer from "../features/productCatalog/productSlice";
import { saveProductCatalog } from "./localStorage";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

store.subscribe(() => {
  const products = store.getState().products.categories;
  if (Object.keys(products).length) {
    saveProductCatalog(store.getState().products);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
