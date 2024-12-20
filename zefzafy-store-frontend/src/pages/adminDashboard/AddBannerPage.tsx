import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { ICreateBanner, ICreateCategory } from "../../types";
import toast from "react-hot-toast";
import { useCreateCategoryMutation } from "../../redux/slices/categoryApiSlice";
import { useCreateBannerMutation } from "../../redux/slices/bannersApiSlice";

const AddBannerPage = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateBanner>();

  const [createBanner] = useCreateBannerMutation();
  const [image, setImage] = useState<File | null>(null);
  

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
      await createBanner(formData).unwrap();
      toast.success("Banner created successfully");
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
      <Typography variant="h4">Add Banner</Typography>

      <TextField
        label="Banner text"
        {...register("text", { required: "text is required" })}
        error={!!errors.text}
        helperText={errors.text && "text is required"}
        fullWidth
        margin="normal"
      />

      <TextField
        label="discount"
        {...register("discount")}
        error={!!errors.discount}
        // helperText={errors.text && "text is required"}
        fullWidth
        margin="normal"
        type="number"
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
        label="banner"
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

export default AddBannerPage;
