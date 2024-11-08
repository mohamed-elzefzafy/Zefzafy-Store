import {Box, Button, FormControl, FormHelperText, InputLabel, MenuItem,
   Select, TextField, Typography, useTheme } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "../../redux/slices/productsApiSlice";
import { ICreateProduct } from "../../types";
import toast from "react-hot-toast";
import { useGetCategoriesQuery } from "../../redux/slices/categoryApiSlice";

const AddProductPage = () => {
  const {data : categoriesArray , isLoading , error} = useGetCategoriesQuery();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    setValue,  // To manually set the value for category
    reset,
    formState: { errors },
  } = useForm<ICreateProduct>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      countInStock: 0,
      category: "",  // Initialize category
    },
  });

  const [createProduct] = useCreateProductMutation();
  const [images, setImages] = useState<File[] | null>([]);
  const [Category, setCategory] = useState("");
  
  const categories = categoriesArray;

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
    formData.append("category", Category);
    images?.forEach((image) => formData.append("images", image));
  
    try {
      await createProduct(formData).unwrap();
      toast.success("Product created successfully");
      reset();  
      setImages([]);
      setCategory("");
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
      <Typography variant="h4">Add Product</Typography>

      <TextField
        label="Product name"
        {...register("name", { required: "Product name is required" })}
        error={!!errors.name}
        helperText={errors.name && "Product name is required"}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Description"
        {...register("description", { required: "Description is required" })}
        error={!!errors.description}
        helperText={errors.description && "Description is required"}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Price"
        type="number"
        {...register("price", { required: "Price is required" })}
        error={!!errors.price}
        helperText={errors.price && "Price is required"}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Count In Stock"
        type="number"
        {...register("countInStock", { required: "Count in stock is required" })}
        error={!!errors.countInStock}
        helperText={errors.countInStock && "Count in stock is required"}
        fullWidth
        margin="normal"
      />

<FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register("category", { required: "category is required" })}
          label="Category"
          fullWidth
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoriesArray?.map((category) => (
            <MenuItem value={category._id} key={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {errors.category && <FormHelperText error>{errors.category.message}</FormHelperText>}
      </FormControl>


      {images && images.map((image) => (
        <img
          key={image.name}
          src={URL.createObjectURL(image)}
          width={150}
          height={150}
          style={{ objectFit: "contain", borderRadius: "3px", marginLeft: "1px", marginRight: "1px" }}
          alt="product"
        />
      ))}

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

export default AddProductPage;
