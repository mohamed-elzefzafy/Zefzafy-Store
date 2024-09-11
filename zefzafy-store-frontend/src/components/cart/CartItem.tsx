import {
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  useTheme,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { useState } from "react";
import { TCartItems } from "../../types";
import { useAddToCartMutation } from "../../redux/slices/cartApiSlice";
import toast from "react-hot-toast";

const CartItem = ({
  count,
  images,
  name,
  price,
  quantity,
  productId,
  removeItemFromCartHandler,
  refetchCartItems,
}: TCartItems) => {
  const [addToCart] = useAddToCartMutation();
  const [Quantity, setQuantity] = useState(quantity);
  const theme = useTheme();

  const handleQuantityChange = async (event: SelectChangeEvent<number>) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
    try {
      await addToCart({ productId, quantity: newQuantity }).unwrap();
      refetchCartItems();
    } catch (error) {
      const errorMessage = (error as { data?: { message?: string } }).data
        ?.message;
      toast.error(errorMessage as string);
    }
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

        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: "center", sm: "flex-start" }}
          gap={15}
        >
          <Typography variant="body1" fontWeight="bold">
            Price:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            $ {price}
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
            onChange={handleQuantityChange}
            value={Quantity?? quantity}
            sx={{ width: "70px", height: "30px" }}
          >
            {Array.from({ length: count }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>

        </Stack>


        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: "center", sm: "flex-start" }}
          gap={17}
        >
          <Typography variant="body2" color="text.secondary">
            In Stock:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {count ? count : "Out of Stock"}
          </Typography>
        </Stack>

        <Box>
          <Button
            onClick={() => removeItemFromCartHandler(productId)}
            size="small"
            variant="contained"
            sx={{ textTransform: "capitalize" }}
          >
            Remove
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CartItem;
