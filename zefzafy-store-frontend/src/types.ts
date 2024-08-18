export interface Product {
  _id: string;
  user :string,
  name: string;
  images : CloudinaryObject[],
  category: {
    _id: string,
    name: string
  },
  description : string,
  rating :number,
  price: number;
  countInStock: number;
  sales : number;
  reviews :[],
  createdAt: string,
  updatedAt: string,
}


export type CloudinaryObject = {
  url :  string,
  public_id : string | null,
};

export type pagination = {
  total: number,
  page: number,
  pages: number,
}