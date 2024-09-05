import { Box, Stack, Typography, Select, MenuItem, useTheme, SelectChangeEvent, Button } from "@mui/material";
import { useState } from "react";
import { TCartItems } from "../../types";
import { useDeleteItemFromCartMutation } from "../../redux/slices/cartApiSlice";
import toast from "react-hot-toast";

const  CartItem = ({ count, images, name, price, quantity , removeItemFromCartHandler }: TCartItems) => {
  const [Quantity, setQuantity] = useState(1);
  const theme = useTheme();

  const handleQuantityChange = (event: SelectChangeEvent<number>) => {
    setQuantity(Number(event.target.value));
  };



  








  return (
    <Stack
      sx={{
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[1],
        gap: { xs: 2, sm: 4 },
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: 150, sm: 200, md: 250 },
          height: { xs: 150, sm: 200, md: 250 },
          overflow: "hidden",
          borderRadius: 2,
          backgroundColor: theme.palette.grey[200],
        }}
      >
        <img
          src={images[0].url}
          alt="Product"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Box>

      <Stack
        spacing={2}
        sx={{
          width: "100%",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent={{xs : "center" , sm : "flex-start"}} gap={15}>
          <Typography variant="body1" fontWeight="bold">
            Price:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            $ {price}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent={{xs : "center" , sm : "flex-start"}} gap={17}>
          <Typography variant="body2" color="text.secondary">
            In Stock:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {count  ? count : "Out of Stock"}
          </Typography>
        </Stack>

        <Stack
          flexDirection="row"
          alignItems="flex-end"
          justifyContent={{ xs: "center", sm: "flex-start" }}
          gap={11}
        >
          <Typography variant="body1">Quantity:</Typography>
          <Select
            value={quantity}
            onChange={handleQuantityChange}
            sx={{ width: "60px", height: "30px" }}
          >
            {Array.from({ length: count }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Box>
          <Button  size="small" variant="contained" sx={{ textTransform: "capitalize" }} onClick={removeItemFromCartHandler}>
            Remove
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CartItem;
