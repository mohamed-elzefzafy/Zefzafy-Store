import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import RegisterPage from "./pages/forms/RegisterPage";
import LoginPage from "./pages/forms/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import AdminLayout from "./pages/adminDashboard/AdminLayout";
import AdminOrdersPage from "./pages/adminDashboard/AdminOrdersPage";
import AdminDasboardPage from "./pages/adminDashboard/AdminDasboardPage";
import AdminproductsPage from "./pages/adminDashboard/AdminProductsPage";
import EditProductPage from "./pages/adminDashboard/EditProductPage";
import AddProductPage from "./pages/adminDashboard/AddProductPage";
import AdminCategoriesPage from "./pages/adminDashboard/AdminCategoriesPage";
import AddCategoryPage from "./pages/adminDashboard/AddCategoryPage";
import EditCategoryPage from "./pages/adminDashboard/EditCategoryPage";
import AdminUsersPage from "./pages/adminDashboard/AdminUsersPage";
import UserLayout from "./pages/userDashboard/UserLayout";
import CreateOrderPage from "./pages/CreateOrderPage";
import OrderDetailsUserPage from "./pages/OrderDetailsUserPage";
import UserProfilePage from "./pages/userDashboard/UserProfilePage";
import WishlistPage from "./pages/userDashboard/WishlistPage";
import UserOrdersPage from "./pages/userDashboard/UserOrdersPage";
import AdminRoute from "./components/protectedRoutesComp/AdminRoute";
import PrivateRoute from "./components/protectedRoutesComp/PrivateRoute";
import LoggedUserRoute from "./components/protectedRoutesComp/LoggedUserRoute";
import AdminBannersPage from "./pages/adminDashboard/AdminBannersPage";
import EditBannerPage from "./pages/adminDashboard/EditBannerPage";
import AddBannerPage from "./pages/adminDashboard/AddBannerPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
  <Route index={true} path='/' element={<HomePage/>}/>
  <Route path='/products' element={<ProductsPage/>}/>
  <Route path='/products/:ProductID' element={<ProductDetailsPage/>}/>
  <Route path='/categories' element={<CategoriesPage/>}/>
  <Route path='/cart' element={<CartPage/>}/>
  <Route path='/create-order' element={<CreateOrderPage/>}/>
  <Route path='/orders/:orderid' element={<OrderDetailsUserPage/>}/>

<Route path="" element={<LoggedUserRoute/>}>
<Route path='/register' element={<RegisterPage/>}/>
<Route path='/login' element={<LoginPage/>}/>
</Route>

  <Route path="" element={<AdminRoute/>}>
  <Route path="/admin" element={<AdminLayout/>}>
  <Route index={true} element={<AdminDasboardPage/>}/>
  <Route path='order' element={<AdminOrdersPage/>}/>
  <Route path='products' element={<AdminproductsPage/>}/>
  <Route path='addproduct' element={<AddProductPage/>}/>
  <Route path='editproduct/:productId' element={<EditProductPage/>}/>
  <Route path='categories' element={<AdminCategoriesPage/>}/>
  <Route path='categories' element={<AdminCategoriesPage/>}/>
  <Route path='addcategory' element={<AddCategoryPage/>}/>
  <Route path='editcategory/:categorytId' element={<EditCategoryPage/>}/>
  <Route path='users' element={<AdminUsersPage/>}/>
  <Route path='orders' element={<AdminOrdersPage/>}/>
  <Route path='banners' element={<AdminBannersPage/>}/>
  <Route path='addbanner' element={<AddBannerPage/>}/>
  <Route path='editbanner/:bannerId' element={<EditBannerPage/>}/>
  </Route>
  </Route>

<Route path="" element={<PrivateRoute/>}>
<Route path="/user" element={<UserLayout/>}>
  <Route index={true} element={<UserProfilePage/>}/>
  <Route path='wishlist' element={<WishlistPage/>}/>
  <Route path='orders' element={<UserOrdersPage/>}/>
  </Route>
</Route>

</Route>
    
  )
)

export default router;