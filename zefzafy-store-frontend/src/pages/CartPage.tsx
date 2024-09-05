import { Button, Card, Container, Divider, Stack, Typography } from "@mui/material";
import CartItem from "../components/cart/CartItem";
import { useDeleteItemFromCartMutation, useGetUserCartQuery } from "../redux/slices/cartApiSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";




const CartPage = () => {
  const { data: userCartItems , refetch : refetchCartItems} = useGetUserCartQuery();
  const [deleteItemFromCart] = useDeleteItemFromCartMutation();
  useEffect(()=>{
    refetchCartItems();
  },[])


  const removeItemFromCartHandler = async(productId : string) => {
    try {
      await deleteItemFromCart({productId}).unwrap();
      refetchCartItems();
    } catch (error) {
      const errorMessage = (error as { data?: { message?: string } }).data?.message;
      toast.error(errorMessage as string);
    }
    };

  return (
    <Container sx={{ mt: 5, maxWidth: { xs: '100%', md: '80%', lg: '70%' } }}>
      <Typography variant="h4" sx={{ mb: 5, textAlign: { xs: "center", md: "left" } }}>
        Cart Page
      </Typography>
      <Stack
        sx={{
          flexDirection: { xs: "column-reverse", md: "row" },
          gap: { xs: 5, md: 3 },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "flex-start" },
          width: "100%",
        }}
      >
        <Stack gap={2} sx={{ width: { xs: "100%", md: "65%" } }}>
          {userCartItems && userCartItems?.cartItems?.map((product) => (
            <CartItem key={product._id} removeItemFromCartHandler={() => removeItemFromCartHandler(product.productId)} {...product} />
          ))}
        </Stack>
        <Card
          sx={{
            width: { xs: "100%", md: "30%" },
            height: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
            boxShadow: 3,
          }}
        >
          <Typography variant="body1">SubTotal ( {userCartItems?.cartItems?.length}  Items)</Typography>
          <Divider />
        {userCartItems?.orderTotal?.cartSubtotal && userCartItems?.orderTotal?.cartSubtotal   > 0  && <>
          <Typography variant="body1">{userCartItems?.orderTotal?.cartSubtotal} $</Typography>
          <Divider />
      
        </>}
          <Button variant="contained" size="small" sx={{ mb: 1, textTransform: "capitalize" }}>
            Proceed to Checkout
          </Button>
        </Card>
      </Stack>
    </Container>
  );
};

export default CartPage;
