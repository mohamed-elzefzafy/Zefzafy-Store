import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SwipperComponent from "../components/Home/hero/SwipperComponent";
import { useGetTopProductsQuery } from "../redux/slices/productsApiSlice";
import { useGetTopCategoriesQuery } from "../redux/slices/categoryApiSlice";
import CategoryCard from "../components/categories/CategoryCard";
import ProductCard from "../components/products/ProductCard";

const HomePage = () => {
  const navigate = useNavigate()
  const { data: Categories } = useGetTopCategoriesQuery();
  const { data: products } = useGetTopProductsQuery();

  return (
    <>
      <SwipperComponent />

      <Box sx={{ my: 5, mx: 20 }}>
        <Typography sx={{ mb: 3, ml: 4, fontSize: "24px" }}>
          Categories :
        </Typography>

        <Stack
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 6,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Categories?.map((category) => (
            <CategoryCard key={category._id} {...category} />
          ))}
        </Stack>
        <Button 
        onClick={()=> navigate("/categories")}
          sx={{
            float: "right",
            mr: 5,
            mt: 5,
            fontSize: 17,
            textTransform: "capitalize",
          }}
        >
          More Categories
        </Button>
      </Box>

      <Box sx={{ my: 10, mx: 20 }}>
        <Typography sx={{ mb: 3, ml: 4, fontSize: "24px" }}>
          Products :
        </Typography>

        <Stack
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 6,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {products?.map((product) => (
            <ProductCard key={product._id} productInfo={product} />
          ))}
        </Stack>
        <Button
        onClick={()=> navigate("/products")}
          sx={{
            float: "right",
            mr: 5,
            mt: 5,
            fontSize: 17,
            textTransform: "capitalize",
          }}
        >
          More Products
        </Button>
      </Box>

      {/* <Stack>
    <Link to="/products">product page</Link>
    <Link to="/categories">Category page</Link>
    <Link to="/register">Register page</Link>
    <Link to="/login">Login page</Link>
    <Link to="/cart">cart page</Link>
    <Link to='/create-order'>orders page</Link>
    <Link to='/admin'>admin page</Link>
    </Stack> */}
    </>
  );
};

export default HomePage;
