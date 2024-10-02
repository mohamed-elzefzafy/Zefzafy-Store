import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  Rating,
  Stack,
  Typography,
  Avatar,
  useTheme,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetOneProductQuery, useGetProductsCategoryQuery } from "../redux/slices/productsApiSlice";
import { ChangeEvent, SetStateAction, useState } from "react";
import { BorderColor, Delete, DeleteForever } from "@mui/icons-material";
import { useCreateReviewMutation, useDeleteReviewByAdminMutation, useDeleteReviewMutation, useUpdateReviewMutation } from "../redux/slices/reviewsApiSlice";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IReviewsResult } from "../types";
import ProductCard from "../components/products/ProductCard";
import { setCartItemLength } from "../redux/slices/cartSlice";
import { useAddToCartMutation } from "../redux/slices/cartApiSlice";

const ProductDetailsPage = () => {
  const { ProductID } = useParams();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const {userInfo} = useAppSelector(state => state.auth)
  const { data: product, isLoading, refetch } = useGetOneProductQuery(ProductID);
  const {data : procutsCategory} = useGetProductsCategoryQuery(product?.category._id);
  const [createReview] = useCreateReviewMutation();
  const [updateReview] =  useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [deleteReviewByAdmin] = useDeleteReviewByAdminMutation();
  const [imageIndex, setImageIndex] = useState(0);
  const [rating, setRating] = useState<number | string>("");
  const [comment, setComment] = useState("");


const procutsCategoryRelated = procutsCategory?.filter(prod => prod._id !== product?._id);
console.log(procutsCategory);
console.log(product?.category._id);


const [reviewId, setReviewId] = useState("");

  const [showAddButtonState, setshowAddButtonState] = useState(false);
  const handleAddRating = (event: SelectChangeEvent<number>) => {
    setRating(Number(event.target.value));
  };
  const handleAddComment = (event: { target: { value: SetStateAction<string> } }) => {
    setComment(event.target.value);
  };

  const createReviewHandler = async () => {
    if (!ProductID) {
      toast.error("ProductID is required");
      return;
    }
    if (!rating || rating === 0) {
      toast.error("rating is required");
      return;
    }
    if (!comment) {
      toast.error("comment is required");
      return;
    };

    try {
         await createReview({ comment: comment.toString(), rating: Number(rating), productId: ProductID }).unwrap();
      setComment("");
      setRating(0);
      refetch();
      toast.success("review added successfully");

    } catch (error) {
      const errorMessage = (error as { data?: { message?: string } }).data?.message;
      toast.error(errorMessage as string);
    }
  };

 const updateReviewHandler = async( review : IReviewsResult) => {
   if (review.userId === userInfo._id) {
    setComment(review.comment);
    setRating(review.rating);
   } else  {
    setComment("");
    setRating(0);
   }
   setComment(review.comment);
   setRating(review.rating);
   setReviewId(review._id);
   setshowAddButtonState(true);
  console.log(comment , rating);

  
 }

const updateReviewFunc = async() => {
    if (!ProductID) {
    toast.error("ProductID is required");
    return;
  }
  if (!rating || rating === 0) {
    toast.error("rating is required");
    return;
  }
  if (!comment) {
    toast.error("comment is required");
    return;
  };
  try {
    await updateReview({comment: comment, rating: Number(rating) ,
       productId : ProductID , reviewId : reviewId});
       toast.success("Review updated successfully");
       refetch();
    setshowAddButtonState(false);
    setComment("");
    setRating(0);
    
    }  catch (error) {
      const errorMessage = (error as { data?: { message?: string } }).data?.message;
      toast.error(errorMessage as string);
      setshowAddButtonState(false);
    }
}


const deleteReviewHandler = async(reviewId : string) => {

    try {
    
     await deleteReview({productId : ProductID , reviewId : reviewId}).unwrap();
      toast.success("Review deleted successfully");
         refetch();
    }  catch (error) {
      const errorMessage = (error as { data?: { message?: string } }).data?.message;
      toast.error(errorMessage as string);
    }
}


const deleteReviewByAdminHandler = async(reviewId : string) => {
  try {
    await deleteReviewByAdmin({productId : ProductID , reviewId : reviewId}).unwrap();
    refetch();
  }  catch (error) {
    const errorMessage = (error as { data?: { message?: string } }).data?.message;
    toast.error(errorMessage as string);
  }
}



const [addToCart] = useAddToCartMutation();
const [quantity, setQuantity] = useState(1);


// const handleQuantityChange = (e : ChangeEvent<HTMLSelectElement>) => {
//   setQuantity(Number(e.target.value))

  
// }

console.log(quantity);
 const addToCartHandler = async() => {
  if (!ProductID) {
    return;
  }
  try {
  const res =   await addToCart({productId : ProductID , quantity }).unwrap();
  console.log(res?.cartItems?.length);
  dispatch(setCartItemLength(res?.cartItems?.length))
  
  } catch (error) {
    const errorMessage = (error as { data?: { message?: string } }).data?.message;
    toast.error(errorMessage as string);
  }

}





  if (isLoading) {
    return (<h3>Loading</h3>);
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ my: 5 }}>
        {product?.name} Details:
      </Typography>

      <Stack
        sx={{
          gap: { xs: 3, md: 4 },
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Stack width={{ xs: "100%", md: 600 }}>
          <img
            src={product?.images[imageIndex].url}
            alt={product?.name}
            height={500}
            style={{
              borderRadius: "7px",
              maxWidth: "100%",
              objectFit: "cover",
              padding: "5px",
            }}
          />
          <Stack
            sx={{
              flexDirection: "row",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {product?.images &&
              product?.images.length > 1 &&
              product?.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={product?.name}
                  width={100}
                  height={100}
                  style={{
                    objectFit: "contain",
                    cursor: "pointer",
                    borderRadius: "3px",
                    border: "1px solid #17151624",
                  }}
                  onClick={() => setImageIndex(index)}
                />
              ))}
          </Stack>
        </Stack>

        <Box sx={{ width: { xs: "100%", md: "auto" } }}>
          <List>
            <ListItem sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              <Typography variant="h5">{product?.name}</Typography>
            </ListItem>
            <Divider />
            <ListItem sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              <Typography variant="body1">Description</Typography>
              <Typography variant="body1">{product?.description}</Typography>
            </ListItem>
            <Divider />
            <ListItem sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              <Typography variant="body1">Price</Typography>
              <Typography variant="body1">{product?.price} $</Typography>
            </ListItem>
            <Divider />
            <ListItem sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              <Typography variant="body1">Stock </Typography>
              <Typography variant="body1">{product?.countInStock ? product?.countInStock : "Out of stock"}</Typography>
            </ListItem>
            <Divider />
            <ListItem sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              <Typography variant="body1">Rating</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body1">({product?.rating})</Typography>
                <Rating name="read-only" value={product?.rating} readOnly size="small" sx={{ mt: 1 }} precision={0.5} />
              </Box>
            </ListItem>
            <Divider />
            <ListItem sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              <Typography variant="body1">Category</Typography>
              <Typography variant="body1">{product?.category.name}</Typography>
            </ListItem>
            <Divider />
            <ListItem sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              <Typography variant="body1">Last Update</Typography>
              <Typography variant="body1">{product?.updatedAt.substring(0, 10)}</Typography>
            </ListItem>
            <Divider />
               <ListItem sx={{display : "flex" , alignItems : "center", gap : 5}}>
               <Button size="small" variant='contained' disabled={product?.countInStock === 0}
                sx={{ bgcolor : theme.palette.mainColor?.main , color : "white" , mt : 2}}
                onClick={addToCartHandler}>
                Add To Cart - {product?.countInStock === 0 && ("(Out of stock)")}
                </Button>

      
{(product?.countInStock && product?.countInStock > 0 ) ?
          <Select
          // defaultValue={1}
          value={quantity}
          onChange={( e) => setQuantity(Number(e.target.value))}
          sx={{ width: "70px", height: "30px" , mt : 2}}
      
        >
          {Array.from({ length : Number(product?.countInStock) }, (_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select> :""
}

               </ListItem>

          </List>
        </Box>
      </Stack>

      <Divider />

      <Box mt={5}>
        <Typography variant="h5" mb={2} textAlign={{ xs: "center", md: "left" }}>
          Reviews:
        </Typography>
        <Divider />

        {product?.reviews.map((review) => (
          <Stack mt={2} key={review._id}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar alt={review.userName} src={review.userImage} />
                <Typography variant="body1">{review.userName}</Typography>
              </Box>
              <Box>
                <Rating name="read-only" value={review.rating} readOnly size="small" sx={{ mt: 1 }} precision={0.5} />
              </Box>
            </Stack>

            <Typography variant="body1" color={theme.palette.error.dark} mt={1}>
              {review.createdAt.substring(0, 10)}
            </Typography>

            <Stack mt={1}>
              <Typography variant="body1">{review.comment}</Typography>
            </Stack>

             {(userInfo?.isAdmin || userInfo?._id === review?.userId)    &&  
             <>
                     <Stack mt={2} mb={1} flexDirection="row" gap={2}>
          {    userInfo?._id === review?.userId    &&  
            <>
              <Delete sx={{ color: theme.palette.error.main  , cursor : "pointer"}}
              onClick={() => deleteReviewHandler(review?._id)}/>
             <BorderColor onClick={() => updateReviewHandler(review)} 
             sx={{ color: theme.palette.primary.main , cursor : "pointer" }}/>
            </>
          }
            {userInfo?.isAdmin    &&
              <DeleteForever sx={{ color: theme.palette.error.dark , cursor : "pointer" }} 
              onClick={() => deleteReviewByAdminHandler(review._id)}/>
            }
            </Stack>

            <Divider />
             </>
             }
       
    
          </Stack>
        ))}

    
    { userInfo?.email && !userInfo?.isAdmin  &&
    
        <Stack mt={2} component="form" alignItems="flex-start">
          <Typography variant="h6" mb={1}>
            Write a Review
          </Typography>
          <TextField
            type="text"
            placeholder="Write your review"
            sx={{ width: "100%" }}
            value={comment}
            onChange={handleAddComment}
          />
          <FormControl sx={{ minWidth: 200, width: "100%", mt: 2 }}>
            <InputLabel id="rating-label">Rating</InputLabel>
            <Select
              labelId="rating-label"
              value={rating as number}
              label="Rating"
              onChange={handleAddRating}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {[5, 4, 3, 2, 1].map((value) => (
                <MenuItem key={value} value={value}>
                  <Rating name="read-only" value={value} readOnly size="small" precision={0.5} />{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

    {showAddButtonState ?
      <Button
      variant="contained"
      sx={{ mt: 2, bgcolor: theme.palette.mainColor?.main, color: "white" }}
      onClick={updateReviewFunc}
    >
      Update Review
    </Button>  
  :
  <Button
  variant="contained"
  sx={{ mt: 2, bgcolor: theme.palette.mainColor?.main, color: "white" }}
  onClick={createReviewHandler}
>
  Add Review
</Button>  
  }
        </Stack>
    
    }
      </Box>

<Box sx={{mt :7}}>
<Typography variant="h5" sx={{ mb: 3}}>
        Related Products :{" "}
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
      {procutsCategoryRelated?.map(product =>
             <ProductCard key={product._id} {...product}/>

      )}
    </Stack>
</Box>
    </Container>
  );
};

export default ProductDetailsPage;
