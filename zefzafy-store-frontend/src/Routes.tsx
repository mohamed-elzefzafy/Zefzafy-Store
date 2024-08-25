import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import RegisterPage from "./pages/forms/RegisterPage";
import LoginPage from "./pages/forms/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
 <Route index={true} path='/' element={<HomePage/>}/>
  <Route path='/products' element={<ProductsPage/>}/>
  <Route path='/products/:ProductID' element={<ProductDetailsPage/>}/>
  <Route path='/categories' element={<CategoriesPage/>}/>
  <Route path='/register' element={<RegisterPage/>}/>
  <Route path='/login' element={<LoginPage/>}/>
 {/* <Route path='/page/:pageNumber' element={<HomeScreen/>}/>
 <Route path='/search/:keyWord' element={<HomeScreen/>}/>
 <Route path='/search/:keyWord/page/:pageNumber' element={<HomeScreen/>}/>
 <Route path='/products/:productId' element={<ProductScreen/>}/>
 <Route path='/cart' element={<CartScreen/>}/>
 <Route path='/login' element={<LoginScreen/>}/>
 <Route path='/register' element={<RegisterScreen/>}/>  */}

 {/* <Route path='' element={<PrivateRoute/>}>
 <Route path='/shipping' element={<ShippingScreen/>}/> 
 <Route path='/payment' element={<PaymentScreen/>}/> 
 <Route path='/placeorder' element={<PlaceOrderScreen/>}/> 
 <Route path='/order/:id' element={<OrderScreen/>}/> 
 <Route path='/profile' element={<ProfileScreen/>}/> 
 </Route>
 */}

 {/* <Route path='' element={<AdminRoute/>}>
<Route path='/admin/orderlist' element={<OrderListScreen/>}/>
<Route path='/admin/products' element={<ProductsListScreen/>}/>
<Route path='/admin/createproduct' element={<CreateProductScreen/>}/>
<Route path='/admin/createproduct' element={<CreateProductScreen/>}/>
<Route path='/admin/product/:id/edit' element={<EditProductScreen/>}/>
<Route path='/admin/users' element={<UsersListScreen/>}/>
 </Route> */}

</Route>
    
  )
)

export default router;