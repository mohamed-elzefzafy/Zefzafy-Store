import { Alert, Box, Button, Snackbar, SnackbarCloseReason, TextField, Typography, useTheme } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../redux/slices/usersApiSlice";
import { ICreateProduct, IUserRegister } from "../../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreateProductMutation } from "../../redux/slices/productsApiSlice";

const AddProductPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateProduct>();
const [createProduct] = useCreateProductMutation();

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const onSubmit = async (data: IUserRegister) => {
    console.log(data);

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    try {
  await registerUser(formData).unwrap();
      toast.success("account created succefully");
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      const errorMessage = (error as { data?: { message?: string } }).data?.message;
      toast.error(errorMessage as string);
    }
  };

    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (
      event: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
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
        error={errors.name ? true : false}
        helperText={errors.name && "name is required"}
        fullWidth
        margin="normal"
      />{" "}
  
      <TextField
        label="Description"
        {...register("description", { required: "description is required" })}
        error={errors.description ? true : false}
        helperText={errors.description && "ldescription is required"}
        fullWidth
        margin="normal"
      />{" "}
  
      <TextField
        label="Price"
        type="number"
        {...register("price", { required: "price is required", })}  
        error={errors.price ? true : false}
        helperText={
          errors.price && "price is required"
        }
        fullWidth
        margin="normal"
      />


      <TextField
        label="Count In Stock"
        type="number"
        {...register("countInStock", { required: "Count is required", })}  
        error={errors.countInStock ? true : false}
        helperText={
          errors.countInStock && "Count is required"
        }
        fullWidth
        margin="normal"
      />
{/* TODO : category must be choose list  */}
<TextField
        label="category"
        {...register("category", { required: "description is required" })}
        error={errors.category ? true : false}
        helperText={errors.category && "category is required"}
        fullWidth
        margin="normal"
      />{" "}

      {profilePhoto && (
        <img
          src={URL.createObjectURL(profilePhoto)}
          width={200}
          style={{ objectFit: "contain", borderRadius: "5px" }}
        />
      )}
      <TextField
        label="Profile Image"
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
        sx={{ mt: 2, textTransform: "capitalize" , bgcolor : theme.palette.mainColor?.main , color : "white" }}
        disabled={isLoading}
      >
        Register
      </Button>

    </Box>
  );
};

export default AddProductPage;
