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

export interface IGetUser {
  users: IUserInfo[];
  pagination: pagination;
}

export interface IUserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: CloudinaryObject;
  isAdmin: boolean;
  wishList: IWishlist[];
  createdAt?: string;
  updatedAt?: string;
  address?: string;
  country?: string;
  phoneNumber?: string;
}

export interface IUpdatUser {
  firstName : string;
  lastName : string;
  email : string;
  password : string
  country : string,
  address : string;
  phoneNumber : string,
  profilePhoto: CloudinaryObject;
}


export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  category: string;
  images: CloudinaryObject[];
}

export interface ICreateCategory {
  name: string;
  image: CloudinaryObject[];
}
export interface IUpdateCategory {
  name?: string;
  image?: CloudinaryObject[];
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

export interface IGetCategory {
  categories: ICategory[];
  pagination: pagination;
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

export interface ICart {
  user: IUserInfo;
  orderTotal: {
    carItemsLength: number;
    cartSubtotal: number;
  };
  cartItems: TCartItemsObj[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IOrder extends ICart {
  paymentMethod: "Cash" | "Credit";
  isPaid: boolean;
  isDelivered: boolean;
}

export interface IGetOrder {
  orders: IOrder[];
  pagination: pagination;
}

export type TCartItemsObj = {
  name: string;
  productId: string;
  price: number;
  images: [
    {
      url: string;
      public_id: string;
    }
  ];
  quantity: number;
  count: number;
  _id: string;
  removeItemFromCartHandler?: (productId: string) => void;
};
export type TCartItems = {
  name: string;
  productId: string;
  price: number;
  images: [
    {
      url: string;
      public_id: string;
    }
  ];
  quantity: number;
  count: number;
  _id: string;
  removeItemFromCartHandler: (productId: string) => void;
  refetchCartItems: () => void;
};

export interface IGetCounts {
  productsCount: number;
  categoriesCount: number;
  usersCount: number;
  ordersCount: number;
  bannersCount: number;
}


export interface IWishlist {
    _id: string,
    name: string,
  images: CloudinaryObject[]
    category: {
        _id: string,
        name: string
    }
}

export interface IBannersResult {
  _id: string,
  text : string,
  discount : number,
  image : CloudinaryObject,
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICreateBanner {
  text : string,
  discount : number,
  image : File,

}