import asyncHandler from "../middlewares/asyncHandler.js";
import CategoryModel from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";
import { cloudinaryRemoveImage, cloudinaryRemoveMultipleImage, cloudinaryUploadImage } from "../utils/cloudinary.js";
import customErrorClass from "../utils/customErrorClass.js";
import { paginationFunction } from "./productController.js";


   /**---------------------------------------
   * @desc    create category
   * @route   /api/v1/categories/create-category
   * @method  POST
   * @access  private -- admin 
   ----------------------------------------*/
   export const createCategory = asyncHandler(async (req , res , next) => {
    const {name} = req.body;
const categoryExists = await CategoryModel.findOne({name});
if (categoryExists) {
  return next(customErrorClass.create(`category is exist already` , 404))
}

const category = await CategoryModel.create({name});
if (req.file) {
  const {secure_url , public_id} = await cloudinaryUploadImage(req.file.path);
  category.image = {
    url : secure_url ,
    public_id : public_id ,
  }

  await category.save();
}

res.status(201).json(category);
   });



     /**---------------------------------------
 * @desc    get one Category
 * @route   /api/v1/categories/get-one-category:id
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getOneCategory = asyncHandler(async (req , res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return next(customErrorClass.create(`there's no category with this Id` , 404))
  }
  res.json(category);
 })


      /**---------------------------------------
   * @desc    delete Category
   * @route   /api/v1/categories/delete-category/:id
   * @method  POST
   * @access  private -- admin 
   ----------------------------------------*/
   export const deleteCategory = asyncHandler(async (req , res , next) => {
    let category = await CategoryModel.findById(req.params.id);
    if (!category) {
      res.status(400).json("ther's no category with this Id");
    }
    if (category.image.public_Id) 
    {
       await cloudinaryRemoveImage(category.image.public_Id);
    }
  
    const productsForCategory = await ProductModel.find({category : req.params.id});
  // const publicIds = productsForCategory.map(product => product.images.public_id);
  // let publicIds = [];
  
  let publicIds = productsForCategory.map(product => product.images.map(image => image.public_id))
  
  
  if (publicIds?.length > 0) {
    for(let i = 0; i< publicIds.length ; i++)
    {
      await cloudinaryRemoveMultipleImage(publicIds[i])
    }
    
  }
  
    await ProductModel.deleteMany({category : req.params.id});
  
   category = await CategoryModel.findByIdAndDelete(req.params.id);
 
  res.status(200).json("category deleted succefully");

   });



         /**---------------------------------------
   * @desc    delete Category
   * @route   /api/v1/categories
   * @method  POST
   * @access  private -- admin 
   ----------------------------------------*/
   export const getAllCategories = asyncHandler(async (req , res , next) => {
    const categories = await CategoryModel.find();

  res.status(200).json(categories);

   });


   
         /**---------------------------------------
   * @desc    delete Category
   * @route   /api/v1/categories
   * @method  POST
   * @access  private -- admin 
   ----------------------------------------*/
   export const getAllCategoriesForAdmin = asyncHandler(async (req , res , next) => {
    const {pagination , pageSize , skip} = await paginationFunction(20 , req , CategoryModel );
    const categories = await CategoryModel.find().limit(pageSize).skip(skip);

  res.status(200).json({categories , pagination});

   });


   export const updateCategory = asyncHandler(async (req, res, next) => {
    const { name, existingImages } = req.body;  // Assuming you're sending 'existingImages' if no new images are uploaded
  
    // Find the category by its ID
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return next(customErrorClass.create(`No category found with ID (${req.params.id})`, 404));
    }
  
    // Update the category name if it's provided
    category.name = name || category.name;
  
    // Initialize an empty object for the image
    let categoryImage = category.image;  // Start with the existing image
  
    // If a new file is uploaded, handle the image update
    if (req.file) {
      // Remove the existing image from Cloudinary
      if (category.image && category.image.public_id) {
        await cloudinaryRemoveImage(category.image.public_id);
      }
  
      // Upload the new image to Cloudinary
      const result = await cloudinaryUploadImage(req.file.path);
      categoryImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
  
    // If no new image is uploaded, keep the existing image
    category.image = categoryImage;
  
    // Save the updated category
    await category.save();
  
    // Send the updated category back in the response
    res.status(200).json(category);
  });
  

