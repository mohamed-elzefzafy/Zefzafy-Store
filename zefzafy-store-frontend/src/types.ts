export interface IGetProduct {
  products: IProduct[];
  pagination: pagination;
}

export interface IProduct {
  _id: string;
  user: string;
  name: string;
  images: CloudinaryObject[];
  category: {
    _id: string;
    name: string;
  };
  description: string;
  rating: number;
  price: number;
  countInStock: number;
  sales: number;
  reviews: IReviewsResult[];
  createdAt: string;
  updatedAt: string;
}

export interface IReviewsResult {
  _id: string;
  comment: string;
  rating: number;
  userId: string;
  userName: string;
  userImage: string;
  createdAt: string;
}

export type CloudinaryObject = {
  url: string;
  public_id: string | null;
};

export type pagination = {
  total: number;
  page: number;
  pages: number;
};

export interface ICategory {
  _id: string;
  name: string;
  image: CloudinaryObject;
  createdAt: string;
  updatedAt: string;
}

export interface IUserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto?: File;
}
export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: CloudinaryObject;
  isAdmin: boolean;
  wishList: [];
}

export interface ICart {
  
    user: string;
    orderTotal: {
      carItemsLength: number;
      cartSubtotal: number;
    },
    cartItems: TCartItems[];
    _id: string,
    createdAt: string,
    updatedAt: string,
    __v: number
  }

  export type TCartItems =  {
    name: string,
    productId: string,
    price: number,
    images: [
      {
        url: string,
        public_id:string
      },
    ]
    quantity: number,
    count: number,
    _id: string,
    removeItemFromCartHandler?: (productId : string) => void
  }