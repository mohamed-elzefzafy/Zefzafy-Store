import { Container, Stack, Typography } from "@mui/material";
import { useGetLoggedUserWishlistQuery } from "../../redux/slices/wishlistApiSlice";
import ProductCard from "../../components/products/ProductCard";
import { useEffect } from "react";


const WishlistPage = () => {
  const {data : wishlistProducts ,refetch : refetchWishlist} = useGetLoggedUserWishlistQuery();
console.log(wishlistProducts);

useEffect(()=>{
  refetchWishlist();
},[])

  return (

<Container sx={{mt: 4}}>
<Typography variant="h4" component="h1">Wish List</Typography>

<Stack sx={{flexDirection : "row" , flexWrap : "wrap" , gap : 2 , mt : 3}}>
  {wishlistProducts?.map(product =>   <ProductCard key={product._id} 
  productInfo={product} refetchWishlist={refetchWishlist} />)}
</Stack>

</Container>
  );
};

export default WishlistPage;
