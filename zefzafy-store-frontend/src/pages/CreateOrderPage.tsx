import { Box, Button, Card, Container, Divider, Stack, Typography } from "@mui/material";
import OrderItem from "../components/oreders/OrderItem";
import { useEffect, useState } from "react";
import { useGetUserCartQuery } from "../redux/slices/cartApiSlice";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../redux/slices/ordersApiSlice";
import toast from "react-hot-toast";

const CreateOrderPage = () => {
  const navigate  = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Credit">("Cash");
  const { data: userCartItems , refetch : refetchCartItems} = useGetUserCartQuery();
  const [createOrder] = useCreateOrderMutation();
  // const [deleteItemFromCart] = useDeleteItemFromCartMutation();
  const {userInfo} =useAppSelector(state => state.auth);

  useEffect(()=>{
    refetchCartItems();
  },[])


  const createOrderHandler = async() => {
 try {
 const order =  await createOrder({paymentMethod}).unwrap();
  
 toast.success("Order created successfully");
 navigate(`/orders/${order._id}`)
 refetchCartItems(); 

  
 } catch (error) {
  const errorMessage = (error as { data?: { message?: string } }).data?.message;
  toast.error(errorMessage as string);
 }
  }

  
  return (
    <Container sx={{ mt: 5, maxWidth: { xs: '100%', md: '80%', lg: '70%' } }}>
      <Typography variant="h4" sx={{ mb: 5, textAlign: { xs: "center", md: "left" } }}>
        Orders Page
      </Typography>

      {/* Shipping Data */}
      <Box>
        <Stack direction="column" gap={2} sx={{ mb: 3 }}>
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "flex-start" }} justifyContent="flex-start" gap={2}>
            <Typography variant="body1" fontWeight="bold">Buyer Name:</Typography>
            <Typography variant="body1">{userInfo?.lastName + " " + userInfo?.lastName}</Typography>
          </Stack>
          
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "flex-start" }} justifyContent="flex-start" gap={2}>
            <Typography variant="body1" fontWeight="bold">Country:</Typography>
            <Typography variant="body1">{userInfo?.country}</Typography>
          </Stack>
          
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "flex-start" }} justifyContent="flex-start" gap={2}>
            <Typography variant="body1" fontWeight="bold">Address:</Typography>
            <Typography variant="body1">{userInfo?.address}</Typography>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "flex-start" }} justifyContent="flex-start" gap={2}>
    { (!userInfo?.address || !userInfo?.country || !userInfo?.phoneNumber) && 
    <Button  sx={{textTransform :"capitalize"}}
    onClick={()=> navigate('/user?completeUserData')}>Go to your profile page to complete your shipping data</Button>
    }
          </Stack>
        </Stack>
      </Box>

      {/* Items and Total Card */}
{(userCartItems?.cartItems && userCartItems?.cartItems.length > 0 )?
      <Stack direction={{ xs: "column", lg: "row-reverse" }} justifyContent="space-between" alignItems="flex-start" gap={4} sx={{ mt: 5 }}>
        
      <Card sx={{ width: { xs: "100%", lg: "30%" }, height: "auto", p: 3, boxShadow: 3 }}>
        <Typography variant="body1">SubTotal (Items)</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" sx={{textAlign : "center"}}>{(userCartItems?.orderTotal?.cartSubtotal && userCartItems?.orderTotal?.cartSubtotal > 0) ? "$" : 0} {userCartItems?.orderTotal?.cartSubtotal} </Typography>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" size="small" sx={{ textTransform: "capitalize" }}
         disabled={!userInfo?.address || !userInfo?.country || !userInfo?.phoneNumber} 
         onClick={createOrderHandler}>
          Create Order {(!userInfo?.address || !userInfo?.country || !userInfo?.phoneNumber) && "( Complete your shipping Data )"}
        </Button>
      </Card>

      <Stack direction="column" gap={4} sx={{ width: "100%" }}>
        {/* OrderItem Component - Example Items */}
      {userCartItems?.cartItems?.map(item => 

          <OrderItem  key={item._id} {...item}/>
      )}
  
      </Stack>
    </Stack> : <h3>there's no orders </h3>
}
    </Container>
  );
};



export default CreateOrderPage;
