export interface IProduct {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  price: string;
  created_at?: Date;
  id_category: string;
  deleted: boolean;
  variations?: IVariation[];
}

export interface IVariation {
  id: string;
  id_product: string;
  id_color: string;
  id_discount?: string;
  media: IMedia[];
  tag: ITag[];
}

export interface IMedia {
  id: string;
  url: string;
  description?: string;
  id_variation: string;
}
export interface ITag {
  id: string;
  id_tag: string;
  id_variation: string;
}

export interface IColor {
  id: string,
  name: string,
  hex: string
}

export interface IContact {
  id: string,
  email: string,
  address: string,
  city: string,
  postal_code: string,
  telephone: string
}
