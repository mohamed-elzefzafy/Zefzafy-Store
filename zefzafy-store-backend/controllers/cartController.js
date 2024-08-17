import asyncHandler from "../middlewares/asyncHandler.js";
import CartModel from "../models/cartModel.js";
import customErrorClass from "../utils/customErrorClass.js";
import ProductModel from './../models/productModel.js';


 /**---------------------------------------
 * @desc    addTo Cart
 * @route   /api/v1/cart/add-cart/:productId
 * @method  POST
 * @access  public 
 ----------------------------------------*/
   export const addToCart = asyncHandler(async (req, res, next) => {
    let {quantity} = req.body;
    // 1- check if there's product with this id 
    const product = await ProductModel.findById(req.params.productId);
  if (!product) {
    return next(customErrorClass.create(`there's no product with id (${req.params.productId})` , 400))
  }
    // 2-check the count and update return the method if count 0  or update quantity if more than coun 

    if (product.countInStock === 0) {
      return next(customErrorClass.create(`the product is out of stock` , 400))
    }
    if (quantity > product.countInStock) {
      quantity = product.countInStock
    }

    const cartItem =     {
      name : product.name,
      productId : product._id,
      price : product.price,
      images : product.images[0],
      quantity :quantity,
      count : product.countInStock,
    }

const cartExit = await CartModel.findOne({user : req.user._id});
// case CartExit 
if (cartExit) {
const newCartItems =  cartExit.cartItems.filter(cart => cart.productId !== req.params.productId);

newCartItems.push(cartItem);

let newCartSubtotal = 0;
for (let i = 0; i < newCartItems.length; i++) {
  newCartSubtotal += newCartItems[i].quantity * newCartItems[i].price 
  
}
const NewOrderTotal = {
  carItemsLength : newCartItems.length,
  cartSubtotal : newCartSubtotal,
}
cartExit.orderTotal = NewOrderTotal;
cartExit.cartItems = newCartItems;
await cartExit.save();
res.status(201).json(cartExit)
}
// case not CartExit 
else {
  const newCartItems = [];
  newCartItems.push(cartItem);
  const NewOrderTotal = {
    carItemsLength : 1,
    cartSubtotal : product.price * quantity,
  }
  
  const cartNew = await CartModel.create({user : req.user._id  , cartItems :newCartItems , orderTotal : NewOrderTotal});
  res.status(201).json(cartNew);
}

   });

    /**---------------------------------------
 * @desc    get All user cart
 * @route   /api/v1/cart/get-user-cart
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getUserCart = asyncHandler(async (req , res , next) => {
  const cart = await CartModel.findOne({user : req.user._id});
  if (!cart) {
    return next(customErrorClass.create(`there's no cart for this user` , 400))
  }



  let ids  = cart.cartItems.map((item) => item.productId )
  let qty = cart.cartItems.map((item) => Number(item.quantity) )
  
  let newCartItems = [];
  await ProductModel.find({_id :{$in : ids}}).then((products) => {
    products.forEach((product , index) =>
     { 
  newCartItems.push({
    name : product.name,
    productId : product._id,
    price : product.price,
    images : product.images,
    quantity : qty[index],
    count : product.countInStock,
  })
      product.save();
    
    })
  });

  let newOrderTotal =  {
    carItemsLength : 0,
    cartSubtotal : 0,
  }

  newOrderTotal.cartSubtotal 

    
for (let i = 0; i < newCartItems.length; i++) {
  newOrderTotal.cartSubtotal  += (cart.cartItems[i].price * cart.cartItems[i].quantity);
  }
  
  newOrderTotal.carItemsLength = newCartItems.length;

cart.cartItems = newCartItems;
cart.orderTotal = newOrderTotal;
cart.cartItems = cart.cartItems.filter(item => item.count !== 0);

await cart.save();
if (cart.cartItems.length === 0) {
  res.status(200).json({status : "cart is empty"});
}
  res.status(200).json(cart)
 })


     /**---------------------------------------
 * @desc    remove Product From Cart
 * @route   /api/v1/cart/remove-product/:productId
 * @method  DELETE
 * @access  public 
 ----------------------------------------*/
 export const removeProductFromCart = asyncHandler(async (req , res , next) => {
  const product = await ProductModel.findById(req.params.productId);
  if (!product) {
    return next(customErrorClass.create(`there's no product with id (${req.params.productId})` , 400))
  }

  const cart = await CartModel.findOne({user : req.user._id});
  if (!cart) {
    return next(customErrorClass.create(`there's no cart for this user` , 400))
  }
  cart.cartItems = cart.cartItems.filter(item => item.productId.toString() !== product._id.toString());

cart.orderTotal.carItemsLength = cart.cartItems.length;
cart.orderTotal.cartSubtotal = 0;
  for (let i = 0; i < cart.cartItems.length; i++) {
    cart.orderTotal.cartSubtotal  += (cart.cartItems[i].price * cart.cartItems[i].quantity);
    }
    
  await cart.save();
  res.status(200).json(cart)

 })

      /**---------------------------------------
 * @desc    clear Cart
 * @route   /api/v1/cart/clear-cart/:cartId
 * @method  DELETE
 * @access  public 
 ----------------------------------------*/
 export const clearCart = asyncHandler(async (req , res , next) => {
  const cart = await CartModel.findById(req.params.cartId);
  if (!cart) {
    return next(customErrorClass.create(`there's no cart for this user` , 400))
  }
  cart.cartItems = [];
  cart.orderTotal.carItemsLength = 0;
   cart.orderTotal.cartSubtotal = 0; 
  await cart.save();
  res.status(200).json(cart);
 })