import { Alert, Box, Button, Snackbar, SnackbarCloseReason, TextField, Typography, useTheme } from "@mui/material";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/slices/usersApiSlice";
import { IUserLogin } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import { setCredentials } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>();
  const [registerUser, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: IUserLogin) => {
    try {
    const res =  await registerUser(data).unwrap();
      dispatch(setCredentials({...res}));
      toast.success("you have logged succefully");
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (error) {
      const errorMessage = (error as { data?: { message?: string } }).data?.message;
      toast.error(errorMessage as string);
    }
  };
  const regExpEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  
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
      <Typography variant="h4">Login</Typography>
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, textTransform: "capitalize" , bgcolor : theme.palette.mainColor?.main , color : "white" }}
        disabled={isLoading}
      >
        Login
      </Button>
      

    </Box>
  );
};

export default LoginPage;
