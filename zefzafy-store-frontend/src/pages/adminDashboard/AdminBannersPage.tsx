import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import swal from "sweetalert";
import toast from "react-hot-toast";
import { useDeleteBannerMutation, useGetBannersQuery } from "../../redux/slices/bannersApiSlice";

const AdminBannersPage = () => {
  const {data , refetch} = useGetBannersQuery();
  const [deleteBanner] = useDeleteBannerMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const deleteBannerHandler = async(bannerId : string) => {
    try {
const willDelete = await swal({
  title: "Are you sure?",
  text: "Are you sure that you want to delete this Category?",
  icon: "warning",
  dangerMode: true,
});
 
if (willDelete) {
try {
  const res = await deleteBanner({bannerId}).unwrap();
  console.log(res);
  toast.success("Banner deleted successfully");
  refetch();
} catch (error) {
  console.log(error);
  
  const errorMessage = (error as { data?: { message?: string } }).data?.message;
  toast.error(errorMessage as string);
}
}


    } catch (error) {
      
    }
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Serial",
      width: isSmallScreen ? 50 : 60,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "text",
      headerName: "Text",
      flex: 1,
      minWidth: isSmallScreen ? 100 : 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 1,
      minWidth: isSmallScreen ? 100 : 150,
      align: "center",
      headerAlign: "center",
    },
   
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<string[]>) => (
        <img
          src={params.value}
          alt="product"
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: isSmallScreen ? 0.8 : 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<string[]>) => (
        <>
          <IconButton onClick={() => deleteBannerHandler(params.value)}>
            <Delete color="error" />
          </IconButton>
          <IconButton onClick={() => navigate(`/admin/editbanner/${params.value}`)}>
            <Edit color="info" />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = data?.map((banner, index) => ({
    id: index + 1,
    text: banner.text,
    discount: banner.discount,
    image: banner.image.url,
    actions: banner._id,
  })) || [];



  return (
    <Box sx={{ height: 600, width: isSmallScreen ? "100%" : "95%", mx: "auto", mt: 2 }}>
     <Stack sx={{flexDirection : "row" , justifyContent : "space-between" , alignItems : "center" , mb : 2 , mr:7}}>
     <Typography variant={isSmallScreen ? "body2" : "body1"} sx={{ my: 1, ml: 1 }}>
     Banners :
      </Typography>
      <Button  variant='contained' sx={{ textTransform : "capitalize"}}
       onClick={()=> navigate('/admin/addbanner')} disabled={data && data?.length >= 5}>Add Banner</Button>
       
     </Stack>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={isSmallScreen}
        sx={{
          fontSize: isSmallScreen ? "12px" : "14px",
          "& .MuiToolbar-root" : {display : "none"}
        }}
      />
    </Box>
  );
};

export default AdminBannersPage;
