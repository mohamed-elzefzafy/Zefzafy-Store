import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ICreateBanner, ICreateCategory, IUpdateCategory } from "../../types";
import {  useUpdateCategoryMutation } from "../../redux/slices/categoryApiSlice";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetOneBannerQuery, useUpdateBannerMutation } from "../../redux/slices/bannersApiSlice";


const EditBannerPage = () => {
    const {bannerId} = useParams();
    console.log(bannerId);
    
    const theme = useTheme();
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm<ICreateBanner>();
  const {data : banner , refetch} = useGetOneBannerQuery(bannerId);
  console.log(banner);
  
    const [updateBanner] = useUpdateBannerMutation();
    const [image, setImage] = useState<File | null>(null);
    

    useEffect(() => {
        if (banner) {
          setValue("text", banner.text);
          setValue("discount", banner.discount);
        }
      }, [banner, setValue]);
    
  
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]);
      }
    };
  
    const onSubmit = async (data: ICreateBanner) => {
      const formData = new FormData();
      formData.append("text", data.text);
      if (data.discount) {
        formData.append("discount", data?.discount.toString());
      }
  
      if (image) {
        formData.append("image", image);
      }
  
      try {
        if (!bannerId) return;
        await updateBanner({data : formData , bannerId}).unwrap();
        toast.success("banner updated successfully");
        refetch();
        setImage(null);
      } catch (error) {
        const errorMessage = (error as { data?: { message?: string } }).data?.message;
        toast.error(errorMessage as string);
      }
    };
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: { xs: "100%", md: "75%", lg: "50%" },
        mx: "auto",
        mt: 4,
        px: 4,
      }}
    >
      <Typography variant="h4">Edit Banner</Typography>

      <TextField
        label="Banner text"
        {...register("text", { required: "text is required" })}
        error={!!errors.text}
        helperText={errors.text && "text is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }} 
      />
      <TextField
        label="Banner discount"
        {...register("discount", { required: "discount is required" })}
        error={!!errors.discount}
        helperText={errors.discount && "discount is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }} 
      />



   
     {image ? 
   (     <img
    src={URL.createObjectURL(image)}
    width={150}
    height={150}
    style={{ objectFit: "contain", borderRadius: "3px", marginLeft: "1px", marginRight: "1px" }}
    alt="product"
  />)
   :
   (     <img
    src={banner?.image.url}
    width={150}
    height={150}
    style={{ objectFit: "contain", borderRadius: "3px", marginLeft: "1px", marginRight: "1px" }}
    alt="product"
  />)
      }


      <TextField
        label="Banner image"
        type="file"
        onChange={handleImageChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }} 
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, textTransform: "capitalize", bgcolor: theme.palette.mainColor?.main, color: "white" }}
      >
        Submit
      </Button>
    </Box>
  )
}

export default EditBannerPage;