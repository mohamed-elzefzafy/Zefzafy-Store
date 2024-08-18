import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import HomePage from './pages/HomePage.tsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
 <Route index={true} path='/' element={<HomePage/>}/>
  <Route path='/products' element={<ProductsPage/>}/>
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
