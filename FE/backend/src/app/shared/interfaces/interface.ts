export interface User {
  id: number,
  name: string,
  surname: string,
  email: string,
  password: string,
  telephone: string
  birth: Date,
  id_user_type: number,
  jwt: string,
}

export interface Contact {
  address: string,
  city: string,
  email: string,
  postal_code: string,
  telephone: string
}

export interface SettingsHome {
  id: number,
  name: string,
  url: string,
  alt: string,
  size: string,
  id_position: number,
  position_name?: string
}

export interface ProductRequest {
  id?: number,
  name: string,
  short_description: string,
  long_description: string,
  price: number,
  created_at?: Date,
  id_category: number,
  variations: VariationRequest[]
}

export interface Category {
  id: number,
  name: string
}

export interface Color {
  name: string,
  hex: string
}

export interface Img {
  url: string,
  description?: string,
  id_variation: number
}

export interface VariationRequest {
  name?: string,
  id_color: number,
  id_discount?: number,
  id_product?: number,
  imgs: string[],
  tags: string[]
}

export interface ProductResponse {
  id: number,
  name: string,
  short_description: string,
  long_description: string,
  price: string,
  created_at?: Date,
  id_category: number,
  deleted: boolean,
  variations?: VariationResponse[]
}

export interface VariationResponse {
  id: number,
  name: string,
  id_product: number,
  id_color: number,
  id_discount?: number,
  media: Media[],
  tag_names: string[],
  price: number[],
  discount?: number
}

export interface Media {
  id: number,
  url: string,
  description?: string,
  id_variation: number
}

export interface IOrder {
  id: number,
  total: number,
  delivery_date: Date, // consegna prevista
  shipping_date: Date, // spedizione 
  shipping_code: string,
  variations: IVariationOrder[],
  address: IAddress,
  user: User
}

export interface IVariationOrder{
  id: number,
  quantity: number,
  variation: VariationResponse
}

export interface IAddress {
  id?: number,
  flat?: string,
  address: string,
  city: string,
  cap: string,
  region: string,
  other?: string,
  default: boolean,
  id_user: number
}

export interface IDiscount {
  id?: number,
  name: string, 
  description: string,
  value: number,
  active: boolean
}

export interface ICategory {
  id: number,
  name: string,
  title: string,
  description: string,
  n_products?: number
  subcategory?: ISubCategory
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