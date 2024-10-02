import asyncHandler from "../middlewares/asyncHandler.js";
import ProductModel from "../models/productModel.js";
import customErrorClass from "../utils/customErrorClass.js";


            /**---------------------------------------
 * @desc    create Review
 * @route   /api/v1/reviews/create-review/:productId
 * @method  PUT
 * @access  private  user
 ----------------------------------------*/
 export const createReview = asyncHandler(async (req , res , next) => {
  const {comment , rating} = req.body;

  
  const product = await ProductModel.findById(req.params.productId);
  if (!product) {
    return next(customErrorClass.create(`there's no product with id (${req.params.productId})` , 400))
  }
  
const existUserReview = product.reviews.find(r => r.userId.toString() === (req.user.id).toString());
if (existUserReview) {
  return next(customErrorClass.create(`you already reviewd this product ` , 400))
}

const review = {
  comment,
  rating,
  userId : req.user.id,
  userName : (req.user.firstName + " " + req.user.lastName),
  userImage : req.user.profilePhoto.url,
  createdAt:  Date.now(),
}
product.reviews.push( review);

let totalRating = 0;

product.reviews.forEach(review => {
  totalRating += review.rating
})
product.rating = Number(totalRating / product.reviews.length);
product.reviewsNumber = product.reviews.length;

await product.save();
res.status(200).json({message :"review created successfully" , product});
 });


             /**---------------------------------------
 * @desc    remove Review By LoggedUser
 * @route   /api/v1/reviews/remove-review/:productId
 * @method  PUT
 * @access  private  user
 ----------------------------------------*/
 export const removeReviewByLoggedUser = asyncHandler(async (req , res , next) => {
  let product = await ProductModel.findById(req.params.productId);
  if (!product) {
    return next(customErrorClass.create(`there's no product with id (${req.params.productId})` , 400))
  }

  const review = product.reviews.find(rev => rev.userId.toString() === req.user._id.toString());
  
  if (!review || review._id.toString() !== req.query.reviewId.toString()) {
    return next(customErrorClass.create(`select the right review` , 400))
  }

  product = await ProductModel.findByIdAndUpdate({_id : req.params.productId} ,
     {$pull : {reviews : {_id : req.query.reviewId} }} , 
     {new : true}
    );

    if (product.reviews.length === 0) {
      product.rating =0;
      product.reviewsNumber = 0;
    } else {

      let totalRating = 0;

product.reviews.forEach(review => {
  totalRating += review.rating
})
product.rating = Number(totalRating / product.reviews.length);
product.reviewsNumber = product.reviews.length;
await product.save();
res.status(200).json(product);

    }
 })


              /**---------------------------------------
 * @desc    update Review By LoggedUser
 * @route   /api/v1/reviews/update-review/:productId
 * @method  PUT
 * @access  private  user
 ----------------------------------------*/
 export const updateReviewByLoggedUser = asyncHandler(async (req , res , next) => {
  const {comment , rating} = req.body;
  let product = await ProductModel.findById(req.params.productId);
  if (!product) {
    return next(customErrorClass.create(`there's no product with id (${req.params.productId})` , 400))
  }

  const review = product.reviews.find(rev => rev.userId.toString() === req.user._id.toString());
  
  if (!review || review._id.toString() !== req.query.reviewId.toString()) {
    return next(customErrorClass.create(`select the right review` , 400))
  }

review.comment = comment || review.comment
review.rating = rating || review.rating


let totalRating = 0;

product.reviews.forEach(review => {
  totalRating += review.rating
})
product.rating = Number(totalRating / product.reviews.length);
product.reviewsNumber = product.reviews.length;


await product.save();
res.status(200).json(product);
 });


              /**---------------------------------------
 * @desc    remove Review By LoggedUser
 * @route   /api/v1/reviews/admin-remove-review/:productId
 * @method  PUT
 * @access  private  user
 ----------------------------------------*/
 export const removeReviewByAdmin = asyncHandler(async (req , res , next) => {
  let product = await ProductModel.findById(req.params.productId);
  if (!product) {
    return next(customErrorClass.create(`there's no product with id (${req.params.productId})` , 400))
  }

  const review = product.reviews.find(rev => rev._id.toString() === req.query.reviewId.toString());
  
  if (!review || review._id.toString() !== req.query.reviewId.toString()) {
    return next(customErrorClass.create(`select the right review` , 400))
  }

  product = await ProductModel.findByIdAndUpdate({_id : req.params.productId} ,
     {$pull : {reviews : {_id : req.query.reviewId} }} , 
     {new : true}
    );

    if (product.reviews.length === 0) {
      product.rating =0;
      product.reviewsNumber = 0;
    } else {

      let totalRating = 0;

product.reviews.forEach(review => {
  totalRating += review.rating
})
product.rating = Number(totalRating / product.reviews.length);
product.reviewsNumber = product.reviews.length;


    }

    await product.save();
res.status(200).json(product);
 })