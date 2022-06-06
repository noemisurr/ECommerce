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

export interface Product {
  id: string,
  name: string,
  short_description: string,
  long_description: string,
  price: string,
  created_at: Date,
  id_category: string
}

export interface Category {
  id: string,
  name: string
}