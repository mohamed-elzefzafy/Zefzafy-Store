import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import OrderItem from "../components/oreders/OrderItem";
import { useAppSelector } from "../redux/hooks";
import { useParams } from "react-router-dom";
import { useGetOneOrderQuery, useUpdateOrderToDeliverMutation, useUpdateOrderToPaidMutation } from "../redux/slices/ordersApiSlice";
import { blue, red } from "@mui/material/colors";
import toast from "react-hot-toast";

const OrderDetailsUserPage = () => {
  const { orderid } = useParams();
  const { data: order, isLoading , refetch } = useGetOneOrderQuery(orderid);
  const [updateOrderToDeliver] = useUpdateOrderToDeliverMutation();
  const [updateOrderToPaid] = useUpdateOrderToPaidMutation();

  console.log(order);

  const { userInfo } = useAppSelector((state) => state.auth);

  const UserDetails = [
    {
      key: "Buyer Name :",
      value: userInfo?.lastName + " " + userInfo?.lastName,
    },
    { key: "Country :", value: userInfo?.country },
    { key: "Address :", value: userInfo?.address },
  ];

  const orderDetails = [
    { key: "Payment method :", value: order?.paymentMethod },
    { key: "Order Total Amount :", value: order?.orderTotal.cartSubtotal },
    {
      key: "Order date :",
      value: order?.createdAt && new Date(order.createdAt).toDateString(),
    },
  ];

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const updateOrderPaidHandler = async() => {
    try {
      await updateOrderToPaid(order?._id).unwrap();
      refetch();
    } catch (error) {
      const errorMessage = (error as { data?: { message?: string } }).data?.message;
      toast.error(errorMessage as string);
    }
  }

  const updateOrderDeliverdHandler = async() => {
    try {
      await updateOrderToDeliver(order?._id).unwrap();
      refetch();
    } catch (error) {
      const errorMessage = (error as { data?: { message?: string } }).data?.message;
      toast.error(errorMessage as string);
    }
  }

  return (
    <Container sx={{ mt: 5, maxWidth: { xs: "100%", md: "80%", lg: "70%" } }}>
      <Typography
        variant="h4"
        sx={{ mb: 5, textAlign: { xs: "center", md: "left" } }}
      >
        Orders Details
      </Typography>

      {/* Shipping Data */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "flex-start",
        }}
      >
         {/* User details  */}
        <Stack direction="column" gap={2} sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
            User details :
          </Typography>

          {UserDetails?.map((detail) => (
            <Stack
              direction={"row"}
              alignItems={{ xs: "center", sm: "flex-start" }}
              sx={{
                p: "5px",
                bgcolor: blue[900],
                color: "white",
                borderRadius: "6px",
              }}
              justifyContent="flex-start"
              gap={2}
            >
              <Typography variant="body1" fontWeight="bold">
                {detail.key}
              </Typography>
              <Typography variant="body1">{detail.value}</Typography>
            </Stack>
          ))}
        </Stack>


        {/* Order details  */}
        <Stack direction="column" gap={2} sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
            Order details:
          </Typography>

          {orderDetails?.map((detail) => (
            <Stack
              direction={"row"}
              alignItems={{ xs: "center", sm: "flex-start" }}
              sx={{
                p: "5px",
                bgcolor: blue[900],
                color: "white",
                borderRadius: "6px",
              }}
              justifyContent="flex-start"
              gap={2}
            >
              <Typography variant="body1" fontWeight="bold">
                {detail.key}
              </Typography>
              <Typography variant="body1">{detail.value}</Typography>
            </Stack>
          ))}

          <Stack
            direction={"row"}
            alignItems={{ xs: "center", sm: "flex-start" }}
            sx={{
              p: "5px",
              bgcolor: order?.isPaid ? blue[900] : red[900],
              color: "white",
              borderRadius: "6px",
            }}
            justifyContent="flex-start"
            gap={2}
          >
            <Typography variant="body1" fontWeight="bold">
              paid :
            </Typography>
            <Typography variant="body1">
              {order?.isPaid ? "Paid" : "Not Paid"}{" "}
            </Typography>
          </Stack>

          <Stack
            direction={"row"}
            alignItems={{ xs: "center", sm: "flex-start" }}
            sx={{
              p: "5px",
              bgcolor: order?.isDelivered ? blue[900] : red[800],
              color: "white",
              borderRadius: "6px",
            }}
            justifyContent="flex-start"
            gap={2}
          >
            <Typography variant="body1" fontWeight="bold">
              Deliverd :
            </Typography>
            <Typography variant="body1">
              {order?.isDelivered ? "Deliverd" : "Not Deliverd"}{" "}
            </Typography>
          </Stack>


{/* admin change paid and delivery statu  */}

{userInfo.isAdmin &&  
<>
<Typography>Admin change paid and delivery statu</Typography>
<Stack
            direction={"row"}
            alignItems={{ xs: "center", sm: "flex-start" }}
            justifyContent="flex-start"
            gap={2}
          >
          <Button variant="contained" size="small" sx={{textTransform : "capitalize"}} onClick={updateOrderPaidHandler}>
            {order?.isPaid ? "Make order not paid" : "Make order paid"}</Button>
          <Button variant="contained" size="small" sx={{textTransform : "capitalize"}} onClick={updateOrderDeliverdHandler}>
            {order?.isDelivered ? "Make order not delivered" : "Make order delivered"}</Button>
       
          </Stack>

</>

}


        </Stack>
      </Box>



      {/* Items Card */}
      {order?.cartItems && order?.cartItems.length > 0 ? (
        <Grid container spacing={3} sx={{ mt: 5 }}>
          {order.cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={item._id}>
              <OrderItem {...item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <h3>There's no orders</h3>
      )}
    </Container>
  );
};

export default OrderDetailsUserPage;
