import { Box, Button, Card, Container, Divider, Stack, Typography } from "@mui/material";
import OrderItem from "../components/oreders/OrderItem";

const OrdersPage = () => {
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
            <Typography variant="body1">Mohamed Elzefzafy</Typography>
          </Stack>
          
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "flex-start" }} justifyContent="flex-start" gap={2}>
            <Typography variant="body1" fontWeight="bold">Country:</Typography>
            <Typography variant="body1">Egypt</Typography>
          </Stack>
          
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "flex-start" }} justifyContent="flex-start" gap={2}>
            <Typography variant="body1" fontWeight="bold">Address:</Typography>
            <Typography variant="body1">Shobra - Bahtim - Mazraa</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Items and Total Card */}
      <Stack direction={{ xs: "column", lg: "row-reverse" }} justifyContent="space-between" alignItems="flex-start" gap={4} sx={{ mt: 5 }}>
        
        <Card sx={{ width: { xs: "100%", lg: "30%" }, height: "auto", p: 3, boxShadow: 3 }}>
          <Typography variant="body1">SubTotal (Items)</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">55 $</Typography>
          <Divider sx={{ my: 2 }} />
          <Button variant="contained" size="small" sx={{ textTransform: "capitalize" }}>
            Proceed to Checkout
          </Button>
        </Card>

        <Stack direction="column" gap={4} sx={{ width: "100%" }}>
          {/* OrderItem Component - Example Items */}
          <OrderItem />
          <OrderItem />
        </Stack>
      </Stack>
    </Container>
  );
};



export default OrdersPage;
