import { createSlice } from "@reduxjs/toolkit";



const getCartItemsLength = () : Number =>  {
  const persistedState = localStorage.getItem('persist:root');
let cartItemLength;
if (persistedState) {
  const parsedState = JSON.parse(persistedState);

  const cartState = JSON.parse(parsedState.cart);

   cartItemLength = cartState.cartItemLength;

  console.log('cartItemLength:', cartItemLength);
}

return cartItemLength
}


const initialState  = {cartItemLength : getCartItemsLength() , cartItems : []};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers : {
  setCartItemLength : (state , action) => {
       state.cartItemLength = action.payload;
  }
  }
 
})


export const {setCartItemLength } = cartSlice.actions;
export default cartSlice.reducer;