// import { createSlice } from "@reduxjs/toolkit";
// import { updateCart } from "../../utils/cartUtils";
// import state from "sweetalert/typings/modules/state";



// const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : 
// {cartItems : []  , shippingAddress : {} , paymentMethod : "" };
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers : {
//     addToCart : (state , action) => {
//      const item = action.payload;
//      const existItem = state.cartItems.find(x => x._id === item._id);
//      if (existItem) {
//       state.cartItems = state.cartItems.map(x => x._id === item._id ? item : x);
//      } else {
//       state.cartItems = [...state.cartItems , item];
//      }
//    return updateCart(state)
//     },
//     removeFromCart : (state, action) => {
//       state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
//       return updateCart(state)  
//     },
//     saveShippingAddress : (state , action) => {
//       state.shippingAddress = action.payload;
//       return updateCart(state);
//     },
//     savePaymentMethod : (state , action) => {
//       state.paymentMethod = action.payload;
//       return updateCart(state);
//     },
//     clearCart : (state, action) => {
//       state.cartItems = [];
//   localStorage.setItem("cart" , JSON.stringify(state));

//     },
//     restCart : (state) => (state = initialState)
//   }
// })


// export const {addToCart , removeFromCart , saveShippingAddress , 
//   savePaymentMethod , clearCart , restCart } = cartSlice.actions;
// export default cartSlice.reducer;