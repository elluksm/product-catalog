import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getProducts,
  selectProducts,
} from "./productSlice";
import "./ProductCatalog.css";

import { ProductList } from "./productList/ProductList";
import { CatalogActions } from "./catalogActions/CatalogActions";

export function ProductCatalog() {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <header className="header">
        <h1>Product Catalog</h1>
      </header>

      <CatalogActions></CatalogActions>
      <ProductList productsByCategory={products}></ProductList>
    </div>
  );
}
