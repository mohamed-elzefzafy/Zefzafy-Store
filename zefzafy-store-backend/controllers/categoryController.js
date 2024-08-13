import asyncHandler from "../middlewares/asyncHandler.js";
import CategoryModel from "../models/categoryModel.js";
import { cloudinaryRemoveImage, cloudinaryUploadImage } from "../utils/cloudinary.js";
import customErrorClass from "../utils/customErrorClass.js";


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
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return next(customErrorClass.create(`there's no category with this Id` , 404))
    }
    if (category.image.public_id) {
      await cloudinaryRemoveImage(category.image.public_id)
    }

    await category.deleteOne();



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
 * @desc    update user profile
 * @route   /api/v1/categories/update-category/:id
 * @method  PUT
 * @access  private - admin
 ----------------------------------------*/
 export const updateCategory = asyncHandler(async (req , res) => {
  const {name} = req.body;
  const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return next(customErrorClass.create(`there's no category with this Id` , 404))
    }

  category.name = name || category.name;

  if (req.file) {

      await cloudinaryRemoveImage(category.image.public_id)

  // upload the photo to cloudinary
  const result = await cloudinaryUploadImage(req.file.path);

  //  Change the profilePhoto field in the DB
  category.image = {
    url : result.secure_url,
    public_id : result.public_id
  }


  }


  await category.save();

  res.status(200).json(category);
   })
   