import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { ICreateCategory } from "../../types";
import toast from "react-hot-toast";
import { useCreateCategoryMutation } from "../../redux/slices/categoryApiSlice";

const AddCategoryPage = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateCategory>();

  const [createCategory] = useCreateCategoryMutation();
  const [image, setImage] = useState<File | null>(null);
  

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
      await createCategory(formData).unwrap();
      toast.success("category created successfully");
      reset();
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
      <Typography variant="h4">Add Category</Typography>

      <TextField
        label="Category name"
        {...register("name", { required: "category name is required" })}
        error={!!errors.name}
        helperText={errors.name && "category name is required"}
        fullWidth
        margin="normal"
      />



   
     {image && 
        <img
        src={URL.createObjectURL(image)}
        width={150}
        height={150}
        style={{ objectFit: "contain", borderRadius: "3px", marginLeft: "1px", marginRight: "1px" }}
        alt="product"
      />}


      <TextField
        label="Category image"
        type="file"
        onChange={handleImageChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        margin="normal"
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

export default AddCategoryPage;
