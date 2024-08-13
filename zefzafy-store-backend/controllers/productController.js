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
const {pagination , pageSize , skip} = await paginationFunction(4 , req , ProductModel , productQuery);
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
 export const updateProduct = asyncHandler(async (req , res , next) => {
  const {name , price  , category , description , countInStock}  = req.body;
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(customErrorClass.create(`there's no product with id (${req.params.id})` , 400))
  }

if (category) {
  let categoryExist= await CategoryModel.findOne({_id : category});
  if (!categoryExist) {
    return next(customErrorClass.create(`this category not exist` , 400))
  }
}

  product.name = name || product.name;
  product.price = price || product.price;
  product.category = category || product.category;
  product.description = description || product.description;
  product.countInStock = countInStock || product.countInStock;
  

  // await product.save();

  if (req.files || req.body.images) {
  
if (product.images.length > 0) {
  // Get the public ids from the images
  const public_ids = product.images?.map((image) => image.public_id)
  //  Delete all  images from cloudinary that belong to this product
if (public_ids?.length > 0) {
  await cloudinaryRemoveMultipleImage(public_ids)
}
}



let results = [];

for (let file of req.files) {
  const result =  await cloudinaryUploadImage(file?.path);
  results.push(result);
}

let resultsArrayOfObjects = [];
 results.map(oneResult => {
resultsArrayOfObjects.push( {
  url :  oneResult.url,
  public_id : oneResult.public_id
})
})

product.images = resultsArrayOfObjects 



}

await product.save();
res.status(201).json({message : "success" ,  product});
 })


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















const sortAndSearchOptions = (req) => {
  let queryCondition = false;
  let productQuery = {};

  let nameSearchQuery = {};
  let categorySearchQuery = {};
  let descriptionSearchQuery = {};

  //search by name
  if (req.query.name) {
    queryCondition = true;
    nameSearchQuery = {
      name: { $regex: req.query.name, $options: "i" },
    };
  }

  //search by description
  if (req.query.description) {
    queryCondition = true;
    descriptionSearchQuery = {
      description: { $regex: req.query.description, $options: "i" },
    };
  }

  //filter by category
  if (req.query.category) {
    queryCondition = true;
    categorySearchQuery = {
      category: req.query.category,
    };
  }


  if (queryCondition) {
    productQuery = {
      $and: [categorySearchQuery, nameSearchQuery, descriptionSearchQuery],
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