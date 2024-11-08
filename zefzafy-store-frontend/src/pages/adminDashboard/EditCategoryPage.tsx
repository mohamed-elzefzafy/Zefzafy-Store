import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ICreateCategory, IUpdateCategory } from "../../types";
import { useGetOneCategoryQuery, useUpdateCategoryMutation } from "../../redux/slices/categoryApiSlice";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";


const EditCategoryPage = () => {
    const {categorytId} = useParams();
    const theme = useTheme();
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm<ICreateCategory>();
  const {data : category , refetch} = useGetOneCategoryQuery(categorytId)
    const [updateCategory] = useUpdateCategoryMutation();
    const [image, setImage] = useState<File | null>(null);
    

    useEffect(() => {
        if (category) {
          setValue("name", category.name);
        }
      }, [category, setValue]);
    
  
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]);
      }
    };
  
    const onSubmit = async (data: ICreateCategory) => {
      const formData = new FormData();
      formData.append("name", data.name);
      if (image) {
        formData.append("image", image);
      }
  
      try {
        if (!categorytId) return;
        await updateCategory({data : formData , categorytId}).unwrap();
        toast.success("category updated successfully");
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
      <Typography variant="h4">Edit Category</Typography>

      <TextField
        label="Category name"
        {...register("name", { required: "category name is required" })}
        error={!!errors.name}
        helperText={errors.name && "category name is required"}
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
    src={category?.image.url}
    width={150}
    height={150}
    style={{ objectFit: "contain", borderRadius: "3px", marginLeft: "1px", marginRight: "1px" }}
    alt="product"
  />)
      }


      <TextField
        label="Category image"
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

export default EditCategoryPage;