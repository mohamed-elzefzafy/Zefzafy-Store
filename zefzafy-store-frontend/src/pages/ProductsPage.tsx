import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Rating,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetProductsQuery } from "../redux/slices/productsApiSlice";
import ProductCard from "../components/products/ProductCard";
import { ChangeEvent, useState } from "react";
import { useGetCategoriesQuery } from "../redux/slices/categoryApiSlice";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { clearSearchKeywordAction } from "../redux/slices/searchSlice";
import PaginationComponent from "../components/products/PaginationComponent";

const ProductsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { searchKeyWord } = useAppSelector((state) => state.search);
  console.log(searchKeyWord);

  const [category, setCategory] = useState<string>(
    location.search.split("=")[1] || ""
  );
  const [rating, setRating] = useState<number | String>("");
  const { data: categories } = useGetCategoriesQuery();
  const [SortPrice, setSortPrice] = useState<"price" | "priceDesc">("price");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetProductsQuery(
    `?sort=${SortPrice}&page=${currentPage}&category=${category}&keyword=${searchKeyWord}&rating=${rating}`
  );

  const handleChange = async (e: SelectChangeEvent) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = async (e: SelectChangeEvent) => {
    setSortPrice(e.target.value as "price" | "priceDesc");
  };

  const handleRatingChange = (event: SelectChangeEvent<number>) => {
    setRating(Number(event.target.value));
  };

  if (isLoading) {
    return <h2>Loading</h2>;
  }
  const resetFilters = () => {
    setCategory("");
    setSortPrice("price");
    setRating(0);
    setCurrentPage(1);
    dispatch(clearSearchKeywordAction());
  };

  const handlePageChange = (
    e: ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* start filters  */}
      {/* 1- category filter */}
      <Stack
        sx={{
          flexDirection: "row",
          mb: 2,
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={handleChange}
            // autoWidth
          >
            {categories?.map((category) => (
              <MenuItem value={category._id} key={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* 2- price filter */}
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel>Price</InputLabel>
          <Select value={SortPrice} onChange={handlePriceChange}>
            <MenuItem value={"priceDesc"}>price high to low</MenuItem>
            <MenuItem value={"price"}>price low to high</MenuItem>
          </Select>
        </FormControl>

        {/* rating filter  */}



        <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-controlled-open-select-label">Rating</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          value={rating as number }
          label="Rating"
          onChange={handleRatingChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={5}>
              {" "}
              <Rating
                name="read-only"
                value={5}
                readOnly
                size="small"
                sx={{ mt: 1 }}
                precision={0.5}
              />{" "}
            </MenuItem>
            <MenuItem value={4}>
              {" "}
              <Rating
                name="read-only"
                value={4}
                readOnly
                size="small"
                sx={{ mt: 1 }}
                precision={0.5}
              />{" "}
            </MenuItem>
            <MenuItem value={3}>
              {" "}
              <Rating
                name="read-only"
                value={3}
                readOnly
                size="small"
                sx={{ mt: 1 }}
                precision={0.5}
              />{" "}
            </MenuItem>
            <MenuItem value={2}>
              {" "}
              <Rating
                name="read-only"
                value={2}
                readOnly
                size="small"
                sx={{ mt: 1 }}
                precision={0.5}
              />{" "}
            </MenuItem>
            <MenuItem value={1}>
              {" "}
              <Rating
                name="read-only"
                value={1}
                readOnly
                size="small"
                sx={{ mt: 1 }}
                precision={0.5}
              />{" "}
            </MenuItem>
        </Select>
      </FormControl>





        {/* reset filter  */}
        <Button variant="contained" onClick={resetFilters} sx={{ py: 1.5  , bgcolor : theme.palette.mainColor?.main , color : "white"}} >
          Reset Filters
        </Button>
      </Stack>
      {/* end filters  */}

      <Typography variant="h5" sx={{ mb: 2 }}>
        Products :{" "}
      </Typography>
      <Stack
        sx={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: {xs : "center" , md : "flex-start"},
          alignItems: "center",
        }}
      >
        {data?.products.length === 0 ? (<h2>No Products</h2>) : (
          data?.products?.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))
        )}
      </Stack>

{data?.pagination.pages && data?.pagination.pages   > 1 ?  
  <PaginationComponent  count={data?.pagination.pages as number} 
  currentPage={currentPage} handlePageChange={handlePageChange}/>
: ""
}
    </Container>
  );
};

export default ProductsPage;
