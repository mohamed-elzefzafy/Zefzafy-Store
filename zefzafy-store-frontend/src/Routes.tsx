import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import RegisterPage from "./pages/forms/RegisterPage";
import LoginPage from "./pages/forms/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import AdminLayout from "./pages/adminDashboard/AdminLayout";
import AdminOrdersPage from "./pages/adminDashboard/AdminOrdersPage";
import AdminDasboardPage from "./pages/adminDashboard/AdminDasboardPage";
import AdminproductsPage from "./pages/adminDashboard/AdminProductsPage";
import EditProductPage from "./pages/adminDashboard/EditProductPage";
import AddProductPage from "./pages/adminDashboard/AddProductPage";
import AdminCategoriesPage from "./pages/adminDashboard/AdminCategoriesPage";
import AddCategoryPage from "./pages/adminDashboard/AddCategoryPage";
import EditCategoryPage from "./pages/adminDashboard/EditCategoryPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
  <Route index={true} path='/' element={<HomePage/>}/>
  <Route path='/products' element={<ProductsPage/>}/>
  <Route path='/products/:ProductID' element={<ProductDetailsPage/>}/>
  <Route path='/categories' element={<CategoriesPage/>}/>
  <Route path='/user/cart' element={<CartPage/>}/>
  <Route path='/user/orders' element={<OrdersPage/>}/>
  <Route path='/register' element={<RegisterPage/>}/>
  <Route path='/login' element={<LoginPage/>}/>

  <Route path="/admin" element={<AdminLayout/>}>
  <Route index={true} element={<AdminDasboardPage/>}/>
  <Route path='orders' element={<AdminOrdersPage/>}/>
  <Route path='products' element={<AdminproductsPage/>}/>
  <Route path='addproduct' element={<AddProductPage/>}/>
  <Route path='editproduct/:productId' element={<EditProductPage/>}/>
  <Route path='categories' element={<AdminCategoriesPage/>}/>
  <Route path='categories' element={<AdminCategoriesPage/>}/>
  <Route path='addcategory' element={<AddCategoryPage/>}/>
  <Route path='editcategory/:categorytId' element={<EditCategoryPage/>}/>
  </Route>

  

</Route>
    
  )
)

export default router;