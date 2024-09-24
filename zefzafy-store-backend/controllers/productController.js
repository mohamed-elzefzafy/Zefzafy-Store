import customErrorClass from "../utils/customErrorClass.js";
import ProductModel from "./../models/productModel.js";
import CategoryModel from "./../models/categoryModel.js";
import asyncHandler from "./../middlewares/asyncHandler.js";
import { cloudinaryRemoveImage, cloudinaryRemoveMultipleImage, cloudinaryUploadImage } from "./../utils/cloudinary.js";

/**---------------------------------------
   * @desc    create Product
   * @route   /api/v1/products/create-product
   * @method  POST
   * @access  private -- admin 
   ----------------------------------------*/
export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, price, category, description, countInStock } = req.body;

  const productName = await ProductModel.findOne({ name });
  if (productName) {
    return next(
      customErrorClass.create(
        `product with this name (${name}) already exist`,
        400
      )
    );
  }

  let categoryExist = await CategoryModel.findOne({ _id: category });
  if (!categoryExist) {
    return next(customErrorClass.create(`this category not exist`, 400));
  }

  const product = await ProductModel.create({
    name,
    price,
    category,
    description,
    countInStock,
    user: req.user._id,
  });

  if (req.files || req.body.images) {
    const imagesResult = [];
    for (let file of req.files) {
      const { secure_url , public_id } = await cloudinaryUploadImage(file?.path);
      imagesResult.push( {
        url : secure_url,
        public_id
      });
    }

    product.images = imagesResult;
    await product.save();
  } else {
    return next(customErrorClass.create(`one image at least is required`, 400));
  }

  res.status(201).json(product);
});

/**---------------------------------------
   * @desc    get All Products
   * @route   /api/v1/products/get-products
   * @method  GET
   * @access  private
   ----------------------------------------*/
export const getAllProducts = asyncHandler(async (req, res, next) => {
const {productQuery , sortOptions} = sortAndSearchOptions(req);
const {pagination , pageSize , skip} = await paginationFunction(6 , req , ProductModel , productQuery);
  const products = await ProductModel.find(productQuery).sort(sortOptions)
  .populate("category").limit(pageSize).skip(skip);

  res.status(200).json({products , pagination});
});


 /**---------------------------------------
 * @desc    update product
 * @route   /api/v1/products/update-product/:id
 * @method  PUT
 * @access  private  admin 
 ----------------------------------------*/
 export const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, price, category, description, countInStock, existingImages } = req.body;
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(customErrorClass.create(`No product found with id (${req.params.id})`, 400));
  }

  // Check if category exists
  if (category) {
    let categoryExist = await CategoryModel.findOne({ _id: category });
    if (!categoryExist) {
      return next(customErrorClass.create(`This category does not exist`, 400));
    }
  }

  // Update basic product information
  product.name = name || product.name;
  product.price = price || product.price;
  product.category = category || product.category;
  product.description = description || product.description;
  product.countInStock = countInStock || product.countInStock;

  // Handle images
  if (req.files?.length > 0) {
    // If new images were uploaded, delete old images and add new ones
    if (product.images.length > 0) {
      const public_ids = product.images.map((image) => image.public_id);
      if (public_ids.length > 0) {
        await cloudinaryRemoveMultipleImage(public_ids); // Remove old images from Cloudinary
      }
    }

    // Upload new images
    const results = await Promise.all(req.files.map((file) => cloudinaryUploadImage(file.path)));

    // Update the product with the new images
    product.images = results.map(result => ({
      url: result.url,
      public_id: result.public_id,
    }));
  } else if (existingImages && existingImages.length > 0) {
    // If no new images were uploaded, retain the existing images sent from the frontend
    product.images = existingImages.map((url) => ({ url }));  // Retain the image URLs
  }

  // Save the updated product
  await product.save();
  res.status(200).json({ message: "Product updated successfully", product });
});


  /**---------------------------------------
 * @desc    delete Product
 * @route   /api/v1/products/get-one-product/:id
 * @method  PUT
 * @access  private  admin 
 ----------------------------------------*/
 export const getOneProduct = asyncHandler(async (req , res , next) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(customErrorClass.create(`there's no product with id (${req.params.id})` , 400))
  }
  res.status(200).json(product);
 })


 /**---------------------------------------
 * @desc    delete Product
 * @route   /api/v1/products/delete-product/:id
 * @method  PUT
 * @access  private  admin 
 ----------------------------------------*/
 export const deleteOneProduct = asyncHandler(async (req , res , next) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(customErrorClass.create(`there's no product with id (${req.params.id})` , 400))
  }

  product.images = product.images.forEach(image => {
    cloudinaryRemoveImage(image.public_id);
  })
    await product.deleteOne();
    res.status(200).json("product deleted succefully");
 });



         /**---------------------------------------
 * @desc    get Top Category Products
 * @route   /api/v1/products/category-products/:categoryId
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getTopCategoryProducts = asyncHandler(async (req , res , next) => {
  const category = await CategoryModel.findById(req.params.categoryId);
  if (!category) {
    return next(customErrorClass.create(`there's no category with id (${req.params.categoryId})` , 400))
  }
const products = await ProductModel.find({category : req.params.categoryId}).sort({rating : -1 , sales : -1}).limit(5);

res.status(200).json(products);
 })












const sortAndSearchOptions = (req) => {
  let queryCondition = false;
  let productQuery = {};

  let keywordSearchQuery = {};
  let ratingSearchQuery = {};
  let categorySearchQuery = {};


  //search by name and description
  if (req.query.keyword) {
    queryCondition = true;
    keywordSearchQuery = {
    $or : [
      {name: { $regex: req.query.keyword, $options: "i" }},
      {description: { $regex: req.query.keyword, $options: "i" }},
    ]
    };
  }

  //filter by category
  if (req.query.category) {
    queryCondition = true;
    categorySearchQuery = {
      category: req.query.category,
    };
  }

    //filter by rating
    if (req.query.rating) {
      queryCondition = true;
      ratingSearchQuery = {
        rating: {$gte :req.query.rating},
      };
    }
  


  if (queryCondition) {
    productQuery = {
      $and: [categorySearchQuery, keywordSearchQuery  , ratingSearchQuery],
    };
  }

  // sort options
  let sortOptions = {};
  switch (req.query.sort) {
    case "rating":
      sortOptions = { rating: -1 };
      break;
    case "price":
      sortOptions = { price: 1 };
      break;
    case "priceDesc":
      sortOptions = { price: -1 };
      break;
  }

  return {productQuery , sortOptions}
}



const paginationFunction = async(PageSize , req , model , queryConditions) => {
  const pageSize = PageSize;
const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1 ");
const skip = (pageNumber - 1)  * pageSize;  

const total = await model.countDocuments(queryConditions);
const  pagination =  {
    total , 
    page : pageNumber ,
     pages : Math.ceil(total / pageSize)
    }

    return {pagination , pageSize , skip}
}






