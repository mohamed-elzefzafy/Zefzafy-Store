import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, IconButton, Pagination, Stack, Typography, useMediaQuery } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDeleteCategoryMutation, useGetCategoriesForAdminQuery, useGetCategoriesQuery } from '../../redux/slices/categoryApiSlice';
import swal from "sweetalert";
import toast from "react-hot-toast";
import { useState } from "react";

const AdminCategoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {data , refetch} = useGetCategoriesForAdminQuery(currentPage.toString());
  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
console.log(data);

  const deleteCategoryHandler = async(categoryId : string) => {
    try {
const willDelete = await swal({
  title: "Are you sure?",
  text: "Are you sure that you want to delete this Category?",
  icon: "warning",
  dangerMode: true,
});
 
if (willDelete) {
  await deleteCategory({categoryId});
  toast.success("category deleted successfully");
  refetch();
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
      field: "name",
      headerName: "Name",
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
          <IconButton onClick={() => deleteCategoryHandler(params.value)}>
            <Delete color="error" />
          </IconButton>
          <IconButton onClick={() => navigate(`/admin/editcategory/${params.value}`)}>
            <Edit color="info" />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = data?.categories?.map((category, index) => ({
    id: index + 1,
    name: category.name,
    image: category.image.url,
    actions: category._id,
  })) || [];

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    refetch(); // Refetch products for the new page
  };


  return (
    <Box sx={{ height: 600, width: isSmallScreen ? "100%" : "95%", mx: "auto", mt: 2 }}>
     <Stack sx={{flexDirection : "row" , justifyContent : "space-between" , alignItems : "center" , mb : 2 , mr:7}}>
     <Typography variant={isSmallScreen ? "body2" : "body1"} sx={{ my: 1, ml: 1 }}>
     Categories :
      </Typography>
      <Button  variant='contained' sx={{ textTransform : "capitalize"}}
       onClick={()=> navigate('/admin/addcategory')}>Add Category</Button>





       
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

{data?.pagination?.pages && data?.pagination?.pages > 1 && 

<Pagination
count={data?.pagination?.pages} // Total number of pages from API
page={currentPage}
onChange={handlePageChange}
color="primary"
sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
/>
} 

    </Box>
  );
};

export default AdminCategoriesPage;
