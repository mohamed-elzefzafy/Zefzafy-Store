import { Box, Container, Stack, Typography } from "@mui/material"
import { useGetProductsQuery } from "../redux/slices/productsApiSlice"
import ProductCard from "../components/products/ProductCard";



const ProductsPage = () => {
  const {data , isLoading} = useGetProductsQuery();

  if (isLoading) {
    return (
      <h2>Loading</h2>
    )
  }

  return (
<Container sx={{mt : 4}}>
  <Typography variant="h5" sx={{mb: 2 }}>Products : </Typography>
<Stack sx={{flexDirection : "row" , flexWrap : "wrap" , gap : 2}}>
{data?.products?.map(product   => 
<ProductCard key={product._id} {...product}/>
)}
</Stack>
</Container>

  )
}

export default ProductsPage