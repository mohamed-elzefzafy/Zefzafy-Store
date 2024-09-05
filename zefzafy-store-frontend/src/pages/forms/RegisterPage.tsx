import { Alert, Box, Button, Snackbar, SnackbarCloseReason, TextField, Typography, useTheme } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../redux/slices/usersApiSlice";
import { IUserRegister } from "../../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
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
  const regExpEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
      <Typography variant="h4">Register</Typography>
      <TextField
        label="firstName"
        {...register("firstName", { required: "first name is required" })}
        error={errors.firstName ? true : false}
        helperText={errors.firstName && "first name is required"}
        fullWidth
        margin="normal"
      />{" "}
  
      <TextField
        label="lastName"
        {...register("lastName", { required: "last name is required" })}
        error={errors.lastName ? true : false}
        helperText={errors.lastName && "last name is required"}
        fullWidth
        margin="normal"
      />{" "}
  
      <TextField
        label="Email"
        {...register("email", {
          required: "Email is required",
          pattern: regExpEmail,
        })}
        error={errors.email ? true : false}
        helperText={
          errors.email && "email is required && must be a valid email address"
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: 6,
        })}
        error={errors.password ? true : false}
        helperText={
          errors.password && "password is required && minimum length 3"
        }
        fullWidth
        margin="normal"
      />
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

export default RegisterPage;
