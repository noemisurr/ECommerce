export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  telephone: string;
  birth: Date;
  id_user_type: number;
  jwt: string;
  address?: IAddress[]
}

export interface IAddress {
  id: number,
  flat?: string,
  address: string,
  city: string,
  cap: string,
  region: string,
  other?: string,
  default: boolean,
  id_user: number
}
