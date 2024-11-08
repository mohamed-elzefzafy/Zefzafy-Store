import { Box, Typography, useTheme } from "@mui/material";
import { CloudinaryObject } from "../../types";

interface IOrderItemProp {
  images: CloudinaryObject[];
  name: string;
  price: number;
  quantity: number;
  productId: string;
  count: number;
}


import {  Grid, Paper } from '@mui/material';

const OrderItem = ({ images, name, price, quantity }: IOrderItemProp) => {
  const theme = useTheme();
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {/* Product Image */}
          <Box
            component="img"
            src={images[0].url}
            alt={name}
            sx={{ width: '100%', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          {/* Product Name and Description */}
          <Typography variant="h6">{name}</Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {description}
          </Typography> */}
        </Grid>
        <Grid item xs={3}>
          {/* Price and Quantity */}
          <Typography variant="body1">Price : $ {price}</Typography>
          <Typography variant="body1">Quantity : {quantity}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OrderItem;

