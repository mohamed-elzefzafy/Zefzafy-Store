import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { Button, IconButton, Rating, SelectChangeEvent, Stack, useTheme } from '@mui/material';
import { IProduct } from '../../types';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useToggleWishlistMutation } from '../../redux/slices/wishlistApiSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCredentials } from '../../redux/slices/authSlice';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
import { useAddToCartMutation } from '../../redux/slices/cartApiSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { setCartItemLength } from '../../redux/slices/cartSlice';

interface IProductCardProps {
  productInfo : IProduct,
  refetchWishlist ?: () => QueryActionCreatorResult<QueryDefinition<string | void, any, any, IProduct[], any>>
}
const  ProductCard = ({productInfo : {category , name , description , images , price , rating , _id} , refetchWishlist} : IProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
const [toggleWishlist] = useToggleWishlistMutation();
const {userInfo} = useAppSelector(state => state.auth);


const [addToCart] = useAddToCartMutation();

const addToCartHandler = async () => {
  try {
   const res = await addToCart({ productId : _id, quantity: 1 }).unwrap();
    console.log(res?.cartItems?.length);
    dispatch(setCartItemLength(res?.cartItems?.length))
  
  } catch (error) {
    const errorMessage = (error as { data?: { message?: string } }).data
      ?.message;
    toast.error(errorMessage as string);
  }
};




const onToggleWishlistHandler = async() => {
  try {
    const res = await toggleWishlist({productId: _id}).unwrap();
    dispatch(setCredentials(res));
    if (refetchWishlist) {

      refetchWishlist();
      console.log(res);
    }
  } catch (error) {
    // Handle error
  }
}



  return (
    <Card  sx={{ width: 250 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        width={"100%"}
        image={images[0]?.url}
        sx={{cursor: "pointer"}}
        onClick={() => navigate(`/products/${_id}`)}
      />
      <CardContent sx={{pb:0 , cursor :"pointer"}} onClick={() => navigate(`/products/${_id}`)} >
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
      <CardActions sx={{justifyContent : "space-between"}}>
        <Button  onClick={addToCartHandler} >Add to cart</Button>
     <IconButton onClick={onToggleWishlistHandler}>
     {userInfo.wishList.find(p => p._id === _id) ?   <Favorite color="error"/>  : <FavoriteBorderOutlined/>}
     </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;