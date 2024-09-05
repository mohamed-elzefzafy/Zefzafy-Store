import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material"
import OrderItem from "../components/oreders/OrderItem"


const OrdersPage = () => {
  return (
    <Box>
     {/* shipping data  */}
     <Box>
      
     </Box>


     {/* items and total card  */}
     <Stack>
     

     <Stack>
      {/* <OrderItem/> */}
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
          <Typography variant="body1">SubTotal (  Items)</Typography>
          <Divider />

          <Typography variant="body1">55 $</Typography>
          <Divider />
      
        
          <Button variant="contained" size="small" sx={{ mb: 1, textTransform: "capitalize" }}>
            Proceed to Checkout
          </Button>
        </Card>



     </Stack>


    </Box>
  )
}

export default OrdersPage