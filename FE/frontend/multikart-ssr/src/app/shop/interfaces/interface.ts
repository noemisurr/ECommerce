import { User } from "src/app/pages/account/interfaces/auth.interface";

export interface IProduct {
  id: number;
  name: string;
  short_description: string;
  long_description: string;
  price: number;
  created_at?: Date;
  id_category: number;
  deleted: boolean;
  star?: number,
  variations?: IVariation[];
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
  telephone: string
}

export interface IWishList {
  id?: number,
  id_user: number,
  id_variation: number,
  variations?: IVariation,
  product?: IProduct
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

export interface ICart {
  id?: number,
  total: number,
  id_user: number,
  items: ICartItems[]
}

export interface ICartItems {
  id?: number,
  quantity: number,
  id_user?: number,
  variations: IVariation
}
