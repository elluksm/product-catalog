import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  Categories,
  RawCategory,
  Brands,
  RawBrand,
  Products,
  Product,
} from "../../types/productData";
import * as productData from "../../data/responseData.json";
import { loadProductCatalog } from "../../app/localStorage";

const initialState: { categories: Categories } = {
  categories: {},
};

export const getProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const data: Categories = loadProductsFromFile();
    const cachedData: any = loadProductCatalog();

    if (cachedData && Object.keys(cachedData).length) {
      return cachedData;
    }
    return data;
  }
);

const loadProductsFromFile = (): Categories => {
  const response: RawCategory[] = productData.categories;
  const data: Categories = {};

  // normalize data (quick solution)
  // Todo: create even better data schema with use of some additional library
  response.forEach((c: RawCategory) => {
    const newBrands: Brands = {};
    c.brands.forEach((b: RawBrand) => {
      const newProducts: Products = {};
      b.products.forEach((p: Product) => {
        newProducts[p.id] = p;
      });

      newBrands[b.id] = {
        ...b,
        products: newProducts,
      };
    });

    data[c.id] = {
      ...c,
      brands: newBrands,
    };
  });
  return data;
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    addCategory: (state, action: PayloadAction<string>) => {
      // normally you should get unique id from api side
      const randomId: string = Math.random().toString(20).substr(2, 24);
      state.categories[randomId] = {
        id: randomId,
        name: action.payload,
        brands: {},
      };
    },

    addBrand: (
      state,
      action: PayloadAction<{ categoryId: string; brandName: string }>
    ) => {
      // normally you should get unique id from api side
      const randomId: number = Math.floor(Math.random() * 100000) + 1;
      state.categories[action.payload.categoryId].brands[randomId] = {
        id: randomId,
        name: action.payload.brandName,
        products: {},
      };
    },

    addProduct: (
      state,
      action: PayloadAction<{
        categoryId: string;
        brandId: number;
        productName: string;
      }>
    ) => {
      const randomId: number = Math.floor(Math.random() * 100000) + 1;
      state.categories[action.payload.categoryId].brands[action.payload.brandId].products[randomId] = {
        id: randomId,
        name: action.payload.productName,
      };
    },

    deleteCategory: (state, action: PayloadAction<string>) => {
      const { [action.payload]: remove, ...rest } = state.categories;
      state.categories = rest;
    },

    deleteBrand: (state, action: PayloadAction<{ categoryId: string; brandId: number }>) => {
      const data = current(state.categories[action.payload.categoryId].brands);
      const { [action.payload.brandId]: remove, ...rest } = data;
      const newBrands: Brands = rest;
      state.categories[action.payload.categoryId].brands = newBrands;
    },

    deleteProduct: (
      state,
      action: PayloadAction<{
        categoryId: string;
        brandId: number;
        productId: number;
      }>
    ) => {
      const productId = action.payload.productId;
      const brandId = action.payload.brandId;
      const categoryId = action.payload.categoryId;
      const data = current(state.categories[categoryId].brands[brandId].products);
      
      const { [productId]: remove, ...rest } = data;
      const newProducts: Products = rest;
      state.categories[categoryId].brands[brandId].products = newProducts;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {
  addCategory,
  addBrand,
  addProduct,
  deleteCategory,
  deleteBrand,
  deleteProduct,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.categories;

export default productsSlice.reducer;
