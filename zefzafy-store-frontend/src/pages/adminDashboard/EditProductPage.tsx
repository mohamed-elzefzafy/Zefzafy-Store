import {  Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useGetOneProductQuery, useUpdateProductMutation } from "../../redux/slices/productsApiSlice";
import { ICreateProduct } from "../../types";
import toast from "react-hot-toast";
import { useGetCategoriesQuery } from "../../redux/slices/categoryApiSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
  const { productId } = useParams();
  const { data: product } = useGetOneProductQuery(productId);
  const { data: categoriesArray } = useGetCategoriesQuery();
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateProduct>();

  const [updateProduct] = useUpdateProductMutation();
  const [images, setImages] = useState<File[] | null>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("countInStock", product.countInStock);
      setValue("category", product.category._id);
      setSelectedCategory(product.category._id);  // Set the category state
    }
  }, [product, setValue]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };

  const onSubmit = async (data: ICreateProduct) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("countInStock", data.countInStock.toString());
    formData.append("category", selectedCategory);
  
    if (images?.length as number > 0) {
      // Append new images if they are selected
      images?.forEach((image) => formData.append("images", image));
    } else if (product?.images) {
      // Retain existing images if no new images are selected
      product.images.forEach((image) => {
        formData.append("images", image.url);  // Handle this on the backend
      });
    }
  
    try {
      if (!productId) return;
  
      await updateProduct({ data: formData, productId }).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/products")
    } catch (error) {
      const errorMessage = (error as { data?: { message?: string } }).data?.message;
      toast.error(errorMessage as string);
    }
  };
  
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
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
      <Typography variant="h4">Edit Product</Typography>

      <TextField
        label="Product name"
        {...register("name", { required: "Product name is required" })}
        error={!!errors.name}
        helperText={errors.name && "Product name is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      />

      <TextField
        label="Description"
        {...register("description", { required: "Description is required" })}
        error={!!errors.description}
        helperText={errors.description && "Description is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      />

      <TextField
        label="Price"
        type="number"
        {...register("price", { required: "Price is required" })}
        error={!!errors.price}
        helperText={errors.price && "Price is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      />

      <TextField
        label="Count In Stock"
        type="number"
        {...register("countInStock", { required: "Count in stock is required" })}
        error={!!errors.countInStock}
        helperText={errors.countInStock && "Count in stock is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      />

<FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}  // Controlled category value
          label="Category"
          onChange={handleCategoryChange}  // Handle change
          fullWidth
        >
          {categoriesArray?.map((category) => (
            <MenuItem value={category._id} key={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {errors.category && <FormHelperText error>{errors.category.message}</FormHelperText>}
      </FormControl>

{images && images.length > 0 ? (
  images.map((image) => (
    <img
      key={image.name}
      src={URL.createObjectURL(image)}
      width={150}
      height={150}
      style={{
        objectFit: "contain",
        borderRadius: "3px",
        marginLeft: "1px",
        marginRight: "1px",
      }}
      alt="uploaded product"
    />
  ))
) : (
  product?.images &&
  product.images.map((image) => (
    <img
      key={image.public_id}
      src={image.url}
      width={150}
      height={150}
      style={{
        objectFit: "contain",
        borderRadius: "3px",
        marginLeft: "1px",
        marginRight: "1px",
      }}
      alt="product"
    />
  ))
)}


      <TextField
        label="Profile Image"
        type="file"
        onChange={handleImageChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }} 
        inputProps={{ multiple: true }}  // Enable multiple file selection
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
  );
};

export default EditProductPage;

