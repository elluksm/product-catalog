import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { Categories } from "../../../../types/productData";
import {
  addCategory,
  addBrand,
  addProduct,
  selectProducts,
} from "../../productSlice";
import "./InputForm.css";

export enum InputMode {
  "category",
  "brand",
  "product",
}

export interface InputFormProps {
  inputMode: InputMode | undefined;
}

export function InputForm(props: InputFormProps) {
  switch (props.inputMode) {
    case InputMode.category:
      return <AddCategoryForm></AddCategoryForm>;
    case InputMode.brand:
      return <AddBrandForm></AddBrandForm>;
    case InputMode.product:
      return <AddProductForm></AddProductForm>;
    default:
      return null;
  }
}

function AddCategoryForm() {
  const dispatch = useAppDispatch();
  const [categoryName, setcategoryName] = useState("");

  return (
    <div className="form">
      <input
        className="input"
        aria-label="Set category name"
        value={categoryName}
        onChange={(e) => setcategoryName(e.target.value)}
      />
      <button
        className="button"
        onClick={() => dispatch(addCategory(categoryName))}
      >
        Add Category
      </button>
    </div>
  );
}

function AddBrandForm() {
  const dispatch = useAppDispatch();
  const products: Categories = useAppSelector(selectProducts);

  const [categoryId, setCategoryId] = useState("");
  const [brandName, setBrandName] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    if (categoryId && brandName) {
      dispatch(addBrand({ categoryId: categoryId, brandName: brandName }));
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <select
        value={categoryId}
        aria-label="category"
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="" key="">
          Select Category
        </option>
        {Object.keys(products).map((key) => (
          <option value={key} key={key}>
            {products[key].name}
          </option>
        ))}
      </select>

      <input
        className="input"
        aria-label="Set brand name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
      <button className="button" type="submit">
        Add Brand
      </button>
    </form>
  );
}

function AddProductForm() {
  const dispatch = useAppDispatch();
  const products: Categories = useAppSelector(selectProducts);

  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState<number | undefined>();
  const [productName, setProductName] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    if (categoryId && brandId && productName) {
      dispatch(
        addProduct({
          categoryId: categoryId,
          brandId: brandId,
          productName: productName,
        })
      );
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <select
        value={categoryId}
        aria-label="category"
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="" key="">
          Select Category
        </option>
        {Object.keys(products).map((key: any) => (
          <option value={key} key={key}>
            {products[key].name}
          </option>
        ))}
      </select>

      <select
        value={brandId}
        aria-label="brand"
        onChange={(e) => setBrandId(Number(e.target.value))}
      >
        <option value="" key="">
          Select Brand
        </option>
        {categoryId &&
          Object.keys(products[categoryId].brands).map((key: any) => (
            <option value={key} key={key}>
              {products[categoryId].brands[key].name}
            </option>
          ))}
      </select>
      <input
        className="input"
        aria-label="Set product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <button className="button" type="submit">
        Add Product
      </button>
    </form>
  );
}
