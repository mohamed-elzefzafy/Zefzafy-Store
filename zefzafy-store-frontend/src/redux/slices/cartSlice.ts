import { createSlice } from "@reduxjs/toolkit";



// Access the 'persist:root' from localStorage
const getCartItemsLength = () : Number =>  {
  const persistedState = localStorage.getItem('persist:root');
let cartItemLength;
if (persistedState) {
  // Parse the persisted state JSON string into an object
  const parsedState = JSON.parse(persistedState);

  // Access the 'cart' slice and parse it
  const cartState = JSON.parse(parsedState.cart);

  // Access the 'cartItemLength'
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