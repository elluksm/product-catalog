export interface Products {
  [id: number]: Product;
}

export interface Product {
  id: number;
  name: string;
}

export interface Brands {
  [id: number]: Brand;
}

export interface Brand {
  id: number;
  name: string;
  products: Products;
}

export interface RawBrand {
  id: number;
  name: string;
  products: Product[];
}

export interface Categories {
  [id: string]: Category;
}

export interface Category {
  id: string;
  name: string;
  brands: Brands;
}

export interface RawCategory {
  id: string;
  name: string;
  brands: RawBrand[];
}
