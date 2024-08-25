import { Container, Stack, Typography } from "@mui/material"
import { useGetCategoriesQuery } from "../redux/slices/categoryApiSlice"
import CategoryCard from "../components/categories/CategoryCard";


const CategoriesPage = () => {

  const {data : categories , isLoading , error} = useGetCategoriesQuery();
  console.log(categories);
  
  if (isLoading) {
    return (
      <h2>Loading</h2>
    )
  }

  return (
<Container sx={{mt : 4}}>
  <Typography variant="h5" sx={{mb: 2 }}>Categories : </Typography>
<Stack sx={{flexDirection : "row" , flexWrap : "wrap" , gap : 4 , justifyContent : "center" , alignItems : "center"}}>
{categories?.map(category => 
  <CategoryCard key={category._id} {...category}/>

)}
</Stack>
</Container>

  )
}

export default CategoriesPage