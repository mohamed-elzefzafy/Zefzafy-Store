import {  Box, Button, capitalize, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useGetOneProductQuery, useUpdateProductMutation } from "../../redux/slices/productsApiSlice";
import { ICreateProduct, IUpdatUser, IUserInfo } from "../../types";
import toast from "react-hot-toast";
import { useGetCategoriesQuery } from "../../redux/slices/categoryApiSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useUpdateUserProfileMutation } from "../../redux/slices/usersApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { KeyboardArrowLeft } from "@mui/icons-material";

const UserProfilePage = () => {
  const location = useLocation();
const {userInfo} = useAppSelector(state => state.auth)
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  
  
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  // } = useForm<IUpdatUser>();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IUpdatUser>({
    defaultValues: {
      password: "",  // Initially empty, user can fill it if they want to update
    },
  });
  
  
const [updateUserProfile] = useUpdateUserProfileMutation();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);




  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePhoto(e.target.files[0]);
    }
  };


  useEffect(() => {
    if (userInfo) {
      setValue("firstName", userInfo.firstName);
      setValue("lastName", userInfo.lastName);
      setValue("email", userInfo.email);
     userInfo.country && setValue("country", userInfo.country);
     userInfo.address && setValue("address", userInfo.address);
     userInfo.phoneNumber && setValue("phoneNumber", userInfo.phoneNumber);
     
    }
  }, [userInfo, setValue]);



  // const onSubmit = async (data: IUpdatUser) => {
  //   const formData = new FormData();
  //   formData.append("firstName", data.firstName);
  //   formData.append("lastName", data.lastName);
  //   formData.append("password", data.password);
  //   formData.append("country", data.country);
  //   formData.append("address", data.address);
  //   formData.append("phoneNumber", data.phoneNumber);
  //   profilePhoto ? formData.append("profilePhoto" , profilePhoto) : false;



  //   try {
  //     // if (!productId) return;
  
  //     const res = await updateUserProfile({ data: formData}).unwrap();
  //     dispatch(setCredentials({...res}));
  //     // toast.success("Product updated successfully");
  //     // navigate("/admin/products")
  //   } catch (error) {
  //     const errorMessage = (error as { data?: { message?: string } }).data?.message;
  //     toast.error(errorMessage as string);
  //   }
  //   console.log(data);
    
  // };


    
  const onSubmit = async (data: IUpdatUser) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
  
    // Only append password if the user entered a new one
    if (data.password) {
      formData.append("password", data.password);
    }
  
    formData.append("country", data.country);
    formData.append("address", data.address);
    formData.append("phoneNumber", data.phoneNumber);
    profilePhoto && formData.append("profilePhoto", profilePhoto);
  
    try {
      const res = await updateUserProfile({ data: formData }).unwrap();
      dispatch(setCredentials({ ...res }));
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
      {location.search === "?completeUserData" &&  
      <Button startIcon={<KeyboardArrowLeft/>} sx={{mb:3 , textTransform : "capitalize"}}
       variant="contained" onClick={()=> navigate(-1)}>
        Back to complete Order
        </Button>
      }
      <Typography variant="h4">Update User Profile</Typography>

      <TextField
        label="First Name"
        {...register("firstName", { required: "Product name is required" })}
        error={!!errors.firstName}
        helperText={errors.firstName && "First name is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      />

<TextField
        label="Last Name"
        {...register("lastName", { required: "Last name is required" })}
        error={!!errors.lastName}
        helperText={errors.lastName && "Last name is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      />

      <TextField
        label="Email"
        {...register("email", { required: "email is required" })}
        error={!!errors.email}
        helperText={errors.email && "email is required"}
        fullWidth
        margin="normal"
        disabled
        InputLabelProps={{ shrink: true }}  
      />


{/* 
<TextField
        label="password"
        type="password"
        {...register("password", { required: "password is required" })}
        error={!!errors.password}
        helperText={errors.password && "password is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      /> */}


<TextField
  label="Password"
  type="password"
  {...register("password")}  // Optional field
  error={!!errors.password}
  helperText="Leave empty if you don't want to change password"
  fullWidth
  margin="normal"
  InputLabelProps={{ shrink: true }}
/>



<TextField
        label="Country"
        {...register("country", { required: "country is required" })}
        error={!!errors.country}
        helperText={errors.country && "country is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      />

<TextField
        label="Address"
        {...register("address", { required: "address is required" })}
        error={!!errors.address}
        helperText={errors.address && "address is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      />


<TextField
        label="Phone Number"
        {...register("phoneNumber", { required: "phone Number is required" })}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber && "phone Number is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      />

{/* 
      <TextField
        label="Description"
        {...register("description", { required: "Description is required" })}
        error={!!errors.description}
        helperText={errors.description && "Description is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      /> */}

      {/* <TextField
        label="Price"
        type="number"
        {...register("price", { required: "Price is required" })}
        error={!!errors.price}
        helperText={errors.price && "Price is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      /> */}
{/* 
      <TextField
        label="Count In Stock"
        type="number"
        {...register("countInStock", { required: "Count in stock is required" })}
        error={!!errors.countInStock}
        helperText={errors.countInStock && "Count in stock is required"}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}  
      /> */}
{/* 
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
      </FormControl> */}

{profilePhoto ? (
    <img
      src={URL.createObjectURL(profilePhoto)}
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
  
) : (
    <img
      src={userInfo.profilePhoto.url}
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
        sx={{ mt: 2, textTransform: "capitalize", bgcolor: theme.palette.mainColor?.main, color: "white" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UserProfilePage;

