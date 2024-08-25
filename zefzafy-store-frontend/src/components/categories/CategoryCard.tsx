import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { ICategory } from "../../types"


const CategoryCard = ({image , name , _id} : ICategory) => {
  return (
    //TODO:make the route to products that belong this category

    <Card component="a" href={`/products?category=${_id}`} sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={image?.url}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}

export default CategoryCard