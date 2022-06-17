export interface User {
  id: string,
  name: string,
  surname: string,
  email: string,
  password: string,
  telephone: string
  birth: Date,
  id_user_type: string,
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
  id: string,
  name: string,
  url: string,
  alt: string,
  size: string,
  id_position: string
}

export interface ProductRequest {
  id?: string,
  name: string,
  short_description: string,
  long_description: string,
  price: string,
  created_at?: Date,
  id_category: string,
  variations: VariationRequest[]
}

export interface Category {
  id: string,
  name: string
}

export interface Color {
  name: string,
  hex: string
}

export interface Img {
  url: string,
  description?: string,
  id_variation: string
}

export interface VariationRequest {
  //TODO: cambiare in number
  name?: string,
  id_color: string,
  id_discount?: string,
  id_product?: string,
  imgs: string[],
  tags: string[]
}

export interface ProductResponse {
  id: string,
  name: string,
  short_description: string,
  long_description: string,
  price: string,
  created_at?: Date,
  id_category: string,
  deleted: boolean,
  variations?: VariationResponse[]
}

export interface VariationResponse {
  id: string,
  id_product: string,
  id_color: string,
  id_discount?: string,
  media: Media[],
  tag: Tag[]
}

export interface Media {
  id: string,
  url: string,
  description?: string,
  id_variation: string
}
export interface Tag {
  id: string,
  id_tag: string,
  id_variation: string
}