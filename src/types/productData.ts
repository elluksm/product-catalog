export interface Product {
  [id: number]: {
    id: number;
    name: string;
  };
}

export interface RawProduct {
  id: number;
  name: string;
}

export interface Brand {
  [id: number]: {
    id: number;
    name: string;
    products: Product;
  };
}

export interface RawBrand {
  id: number;
  name: string;
  products: RawProduct[];
}

export interface Category {
  [id: string]: {
    id: string;
    name: string;
    brands: Brand;
  };
}

export interface RawCategory {
  id: string;
  name: string;
  brands: RawBrand[];
}
