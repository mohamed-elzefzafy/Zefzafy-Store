import CartModel from '../models/cartModel.js';
import OrderModel from '../models/orderModel.js';
import ProductModel from '../models/productModel.js';
import customErrorClass from '../utils/customErrorClass.js';
import asyncHandler from './../middlewares/asyncHandler.js';

 /**---------------------------------------
 * @desc    create Order
 * @route   /api/v1/cart/create-Order
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const createOrder = asyncHandler(async (req, res, next) => {
  const {paymentMethod} = req.body;
  const cart = await CartModel.findOne({user : req.user._id});
  if (!cart) {
    return next(customErrorClass.create(`there's no cart for this user` , 400))
  }
  if (cart.cartItems.length === 0) {
    return next(customErrorClass.create(`there's no items in the cart` , 400))
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
    quantity : qty[index] > product.countInStock ? product.countInStock  : qty[index],
    count : product.countInStock,
  })
      product.save();
    
    })
  });

  newCartItems = newCartItems.filter(item => item.count !== 0);
  if (newCartItems.length === 0) {
    return next(customErrorClass.create(`there's no items in the cart` , 400))
  }

let cartSubtotalClone = 0;

for (let i = 0; i < newCartItems.length; i++) {
  cartSubtotalClone += newCartItems[i].price * newCartItems[i].quantity;
  
}

let   orderTotalClone  = {
    carItemsLength : newCartItems.length,
    cartSubtotal : cartSubtotalClone,
  }

  const order = await OrderModel.create({
    user : req.user._id,
    orderTotal : orderTotalClone,
    cartItems : newCartItems,
    paymentMethod ,

  })

  let ids2  = order.cartItems.map((item) => item.productId )
  let qty2 = order.cartItems.map((item) => Number(item.quantity) )
  
  await ProductModel.find({_id :{$in : ids2}}).then((products) => {
    products.forEach((product , index) =>
     { 
      product.sales += qty2[index] ;
      product.countInStock -= qty2[index] ;
      product.save();
    
    })});

  cart.cartItems = [];
  cart.orderTotal.carItemsLength = 0;
   cart.orderTotal.cartSubtotal = 0; 
  await cart.save();
 res.status(201).json(order);
 })


  /**---------------------------------------
 * @desc    get User Orders
 * @route   /api/v1/orders/get-user-orders
 * @method  GET
 * @access  private  logged in user 
 ----------------------------------------*/
 export const getUserOrders = asyncHandler(async (req , res , next) => {
  const orders = await OrderModel.find({user : req.user._id});
  // .populate("user" , "-_id -email -profilePhoto -password -isAdmin -createdAt");

  if (!orders || orders.length === 0) {
    return next(customErrorClass.create(`There's no orders for this user`, 400));
  }
  res.status(200).json(orders);
 });
 

  /**---------------------------------------
 * @desc    get one Orders
 * @route   /api/v1/orders/get-one-order/:orderId
 * @method  GET  
 * @access  private  logged in user 
 ----------------------------------------*/
 export const getOneOrder = asyncHandler(async (req , res) => {
  const order = await OrderModel.findOne({_id : req.params.orderId})
  .populate("user" , "-isAdmin -password -_id -__v -createdAt -updatedAt");
  if (!order) {
    return  res.status(400).json("order not found");
  }
  res.status(200).json(order);
 })


 
/**---------------------------------------
 * @desc    update Order To Paid
 * @route   /api/v1/paid/:id
 * @method  PUT  
 * @access  private  logged in user 
 ----------------------------------------*/
 export const updateOrderToPaid = asyncHandler(async (req , res) => { 
  const order = await OrderModel.findById(req.params.id);
  
  if (!order) 
  {
    return  res.status(400).json("order not found")
  }
  
  order.isPaid = true;
  order.paidAt =  Date.now();
    const updatedOrder =  await order.save();
  res.status(200).json(updatedOrder);
  
   })
  
  
  
  /**---------------------------------------
   * @desc    update Order To deliverd
   * @route   /api/v1/delivered/:id
   * @method  PUT  
   * @access  private  logged in user 
   ----------------------------------------*/
   export const updateOrderToDeliverd = asyncHandler(async (req , res) => { 
  const order = await OrderModel.findById(req.params.id);
  
  if (!order) 
  {
    return  res.status(400).json("order not found")
  }
  
  order.isDelivered = true;
  order.deliverdAt =  Date.now();
    const updatedOrder =  await order.save();
  res.status(200).json(updatedOrder);
  
   })
  
  
  
  /**---------------------------------------
   * @desc    update Order To deliverd
   * @route   /api/v1/delivered/:id
   * @method  GET  
   * @access  private  admin 
   ----------------------------------------*/
   export const getOrdersByAdmin = asyncHandler(async (req , res) => { 
    const orders = await OrderModel.find({}).populate("user" , "-password").sort({paymentMethod : "asc"});
    
    res.status(200).json(orders);
    
     })