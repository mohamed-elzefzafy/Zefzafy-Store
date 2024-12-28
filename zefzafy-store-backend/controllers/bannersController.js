import asyncHandler from "../middlewares/asyncHandler.js";
import BannersModel from "../models/bannersModel.js";
import { cloudinaryRemoveImage, cloudinaryUploadImage } from "../utils/cloudinary.js";
import customErrorClass from "../utils/customErrorClass.js";


  

  /**---------------------------------------
* @desc    get All Banners
* @route   /api/v1/utils/get-hero-slider-images
* @method  GET
* @access  private admin 
----------------------------------------*/
 export const getAllBanners = asyncHandler(async (req, res, next) => {
  const banners = await BannersModel.find();
  res.status(200).json(banners);
});


/**---------------------------------------
* @desc    create hero slider images
* @route   /api/v1/utils/create-hero-slider-images
* @method  POST
* @access  private admin 
----------------------------------------*/
 export const createBanner = asyncHandler(async (req, res, next) => {
    const { text, discount } = req.body;

    const bannersCount = await BannersModel.countDocuments();
    if (bannersCount >= 5) {
      return next(customErrorClass.create(`maximum 5 hero slider images allowed`, 400));
    }

    const banner = await BannersModel.create({
      text,
      discount,
    });
    console.log(banner);

    if (req.file || req.body.image) {
        let imageResult = {};
  
          const { secure_url , public_id } = await cloudinaryUploadImage(req.file?.path);
          imageResult = {
            url : secure_url,
            public_id
          };
        
    
        banner.image = imageResult;
        await banner.save();
      } else {
        return next(customErrorClass.create(`banner image required`, 400));
      }
    

    res.status(201).json(banner);
  });


  /**---------------------------------------
* @desc    create hero slider images
* @route   /api/v1/utils/delete-hero-slider-images/:bannerid
* @method  POST
* @access  private admin 
----------------------------------------*/
 export const deleteBanner = asyncHandler(async (req, res, next) => {
  const banner = await BannersModel.findById(req.params.bannerid);
  if (!banner) {
    return next(customErrorClass.create(`there is no banner with this id ${req.params.bannerid}`, 400));
  }
  await cloudinaryRemoveImage(banner.image.public_id);
  await banner.deleteOne();
  res.status(200).json("banner has deleted successfully");
});


/**---------------------------------------
* @desc    create hero slider images
* @route   /api/v1/utils/update-hero-slider-images/:bannerid
* @method  POST
* @access  private admin 
----------------------------------------*/
export const updateBanner = asyncHandler(async (req, res, next) => {
  const { text, discount } = req.body;

  const banner = await BannersModel.findById(req.params.bannerid);
  if (!banner) {
    return next(customErrorClass.create(`there is no banners with this is ${req.params.bannerid}`, 400));
  }

  banner.text = text || banner.text;
  banner.discount = discount || banner.discount;

if (req.file) {



      await cloudinaryRemoveImage(banner.image.public_id);

    // upload the photo to cloudinary
    const result = await cloudinaryUploadImage(req.file.path);

    //  Change the profilePhoto field in the DB
    banner.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };

}else {
  banner.image = banner.image
}
await banner.save();
  res.status(201).json(banner);
});



  /**---------------------------------------
* @desc    get one Banner
* @route   /api/v1/banners/get-hero-slider-images/:bannerId
* @method  GET
* @access  private admin 
----------------------------------------*/
export const getOneBanner = asyncHandler(async (req, res, next) => {
  const banner = await BannersModel.findById(req.params.bannerId);
  if (!banner) {
    return next(customErrorClass.create(`there is no banner with this id ${req.params.bannerId}`, 400));
  }

  res.status(200).json(banner);
});
