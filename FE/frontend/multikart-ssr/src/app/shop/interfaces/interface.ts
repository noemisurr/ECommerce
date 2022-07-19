import { IAddress, User } from "src/app/pages/account/interfaces/auth.interface";

export interface IProduct {
  id: number;
  name: string;
  short_description: string;
  long_description: string;
  price: number;
  brand: string,
  material: string,
  size: string,
  other?: string,
  created_at?: Date;
  id_category: number;
  id_subcategory: number;
  deleted: boolean;
  star?: number,
  variations?: IVariation[];
  category_name?: string,
  subcategory_name?: string
}

export interface IProductResponse {
  products: IProduct[],
  numberItems: number
}

export interface IProductSpecial {
  sale: IProduct[],
  new: IProduct[],
  best: IProduct[]
}

export interface IVariation {
  id: number;
  name?: string,
  id_product: number;
  id_color: number;
  id_discount?: number;
  media?: IMedia[];
  tag?: ITag[];
  price: number,
  discount?: number,
  color_name: string
}

export interface IMedia {
  id: number;
  url: string;
  description?: string;
  id_variation: number;
}
export interface ITag {
  id: number;
  id_tag: number;
  id_variation: number;
}

export interface IColor {
  id: number,
  name: string,
  hex: string
}

export interface IContact {
  id: number,
  email: string,
  address: string,
  city: string,
  postal_code: string,
  telephone: string,
  info: string
}

export interface IWishList {
  id?: number,
  id_user: number,
  id_variation: number,
  variation?: IVariation
}

export interface IReview {
  id?: number,
  title: string,
  text: string,
  star: number,
  created_at?: Date,
  id_user?: number,
  id_product: number,
  user?: User
}

export interface ICartItem {
  id?: number,
  quantity: number,
  id_user?: number,
  variation: IVariation
}

export interface IOrder {
  id: number,
  total: number,
  delivery_date: Date, // consegna prevista
  shipping_date: Date,// spedizione 
  shipping_code: string,
  variations: IVariationOrder[],
  address: IAddress
}

export interface IVariationOrder{
  id: number,
  quantity: number,
  variation: IVariation
}

export interface ICart {
  total: number,
  cartItems: ICartItem[]
}
export interface ICategory {
  id: number,
  name: string,
  title: string,
  description: string,
  n_products?: number
  subcategories?: ISubCategory[]
}

export interface ISubCategory {
  id?: number,
  name: string,
  title: string,
  description: string,
  id_category?: number,
  category_name?: string,
  n_products?: number
  
}
