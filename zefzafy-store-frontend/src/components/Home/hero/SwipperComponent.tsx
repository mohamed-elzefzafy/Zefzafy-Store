import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { Pagination } from "swiper/modules";
import { SwiperSlide , Swiper} from "swiper/react";
import "./swiper.css";
import "swiper/css";
import "swiper/css/pagination";
import { blue } from "@mui/material/colors";
import { useGetBannersQuery } from "../../../redux/slices/bannersApiSlice";


// const mySlider = [
//   { text: "MEN"  , discount : "30" , image: "./images/banner-15.jpg" },
//   { text: "WOMEN"  , discount : "20" , image: "./images/banner-25.jpg" },
// ];

const SwipperComponent = () => {
  const {data : mySlider , refetch} = useGetBannersQuery();
  return (
    <Swiper
    loop={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
      {mySlider?.map(slider => 
        <SwiperSlide key={slider._id} >
        <Box sx={{position : "relative"}} >
    <img src={slider.image.url} alt="" style={{width : "100%" , height : "100%"}} />
<Stack sx={{position : "absolute" , top : "50%"  , transform : "translateY(-50%)", left : "30px" , alignItems : "flex-start"}}>

                  <Typography
                    sx={{
                      color: "#222",
                      fontWeight: 500,
                      fontSize : {xs : "16px", sm : "20px" , md : "30px"},
                      my: 1,
                    }}
                    variant="h3"
                  >
                    {slider.text}
                  </Typography>

                  <Stack
                    sx={{
                      justifyContent: { xs: "center", sm: "left" },
                      fontSize : {xs : "16px", sm : "20px" , md : "30px"}
                    }}
                    direction={"row"}
                    alignItems={"center"}
                  >
              {
                slider.discount &&

                <>
                      <Typography color={"#333"} mr={1} variant="inherit">
                      SALE UP TO
                    </Typography>
                    <Typography color={"#D23F57"} variant="inherit">
                     {slider.discount} %
                    </Typography>
                </>
              }
                  </Stack>

                  <Button
                  component={Link}
                  href="/products"
                    sx={{
                      px: 5,
                      py: 1,
                      mt: 2,
                      backgroundColor: (theme) => theme.palette.mode === "dark" ? blue[900] :blue[400],
                      boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                      color: (theme) => theme.palette.mode === "dark" ? "white" :"white",
                      borderRadius: "1px",
                      "&:hover": {
                        bgcolor: "#151515",
                        boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                      },
                    }}
                    variant="contained"
                  >
                    shop now
                  </Button>
</Stack>
    </Box>
        </SwiperSlide>
      )}
      
      </Swiper>
  )
}

export default SwipperComponent;