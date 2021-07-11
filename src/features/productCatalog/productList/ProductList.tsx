import React from "react";

import { useAppDispatch } from "../../../app/hooks";
import { deleteCategory, deleteBrand, deleteProduct } from "../productSlice";
import { Categories, Brands, Products } from "../../../types/productData";
import "./ProductList.css";

export interface ProductListProps {
  productsByCategory: Categories;
}

export interface BrandProps {
  brands: Brands;
  categoryId: string;
}

export interface ProductProps {
  products: Products;
  categoryId: string;
  brandId: number;
}

export function ProductList(props: ProductListProps) {
  const dispatch = useAppDispatch();
  const categories: Categories = props.productsByCategory;

  return (
    <div className="category">
      {categories &&
        Object.keys(categories).map((key) => (
          <div key={categories[key].id}>
            <h2 className="title">{categories[key].name}</h2>
            <button
              onClick={() => dispatch(deleteCategory(categories[key].id))}
            >
              Delete
            </button>
            <BrandsList
              brands={categories[key].brands}
              categoryId={key}
            ></BrandsList>
          </div>
        ))}
    </div>
  );
}

function BrandsList(props: BrandProps) {
  const dispatch = useAppDispatch();
  const brands: Brands = props.brands;

  return (
    <div className="brand">
      {brands &&
        Object.keys(brands).map((key: any) => (
          <div key={brands[key].id}>
            <h3 className="title">......{brands[key].name}</h3>
            <button
              onClick={() =>
                dispatch(
                  deleteBrand({
                    categoryId: props.categoryId,
                    brandId: brands[key].id,
                  })
                )
              }
            >
              Delete
            </button>
            <ProductsList
              products={brands[key].products}
              categoryId={props.categoryId}
              brandId={key}
            ></ProductsList>
          </div>
        ))}
    </div>
  );
}

function ProductsList(props: ProductProps) {
  const dispatch = useAppDispatch();
  const products: Products = props.products;

  return (
    <div className="brand">
      {products &&
        Object.keys(products).map((key: any) => (
          <div key={products[key].id}>
            <p className="title">.............{products[key].name}</p>
            <button
              onClick={() =>
                dispatch(
                  deleteProduct({
                    categoryId: props.categoryId,
                    brandId: props.brandId,
                    productId: products[key].id,
                  })
                )
              }
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
