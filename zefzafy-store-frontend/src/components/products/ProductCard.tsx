import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Rating, Stack, useTheme } from '@mui/material';
import { IProduct } from '../../types';

const  ProductCard = ({category , name , description , images , price , rating , _id} : IProduct) => {
  const theme = useTheme();
  return (
    <Card component="a" href={`/products/${_id}`} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={images[0]?.url}
      />
      <CardContent sx={{pb:0}}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {description}
        </Typography>
        <Stack sx={{flexDirection : "row" , justifyContent : "space-between" , alignItems : "center" , mt : 1}}>
          <Typography variant="body1" >Price</Typography>
          <Typography variant="body1" >{price} $</Typography>
        </Stack>
      <Stack  direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
      <Rating name="read-only" value={rating} readOnly size='small' sx={{mt : 1}} precision={0.5}/>
      <Typography variant="body1" fontSize={"13px"}> {category.name}</Typography>
      </Stack>
      </CardContent>
      <CardActions >
        <Button size="small" variant='contained' sx={{ bgcolor : theme.palette.mainColor?.main , color : "white"}}>Add To Cart</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;