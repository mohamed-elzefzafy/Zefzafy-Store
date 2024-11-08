import { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, IconButton, Pagination, Stack, Typography, useMediaQuery } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useDeleteUserMutation } from '../../redux/slices/usersApiSlice';
import toast from 'react-hot-toast';
import { red } from '@mui/material/colors';
import { useGetOrdersByAdminQuery, useGetOrdersByLoggedUserQuery } from '../../redux/slices/ordersApiSlice';
import { useNavigate } from 'react-router-dom';


const UserOrdersPage = () => {
 const [currentPage, setCurrentPage] = useState(1);
 const {data , refetch} = useGetOrdersByLoggedUserQuery();
 const [deleteUser] = useDeleteUserMutation();
 const navigate = useNavigate();
 console.log(data?.orders);
 

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));



  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Syrial",
      width: isSmallScreen ? 50 : 60,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "userName",
      headerName: "User Name",
      flex: 1,
      minWidth: isSmallScreen ? 100 : 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography sx={{fontSize : {xs : "12px" , md : "13px"} , mt : 2}}> {/* Custom font size */}
          {params.value}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: isSmallScreen ? 90 : 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography sx={{fontSize : {xs : "12px" , md : "13px"} , mt : 2}}> {/* Custom font size */}
          {params.value}
        </Typography>
      ),
    },
    {
      field: "totalAmount",
      headerName: "Order Amount",
      flex: 1,
      minWidth: isSmallScreen ? 100 : 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Paid",
      headerName: "Paid",
      flex: 1,
      align: "center",
      headerAlign: "center",
      
      // renderCell: (params: GridRenderCellParams<any>) => (
      //   <img
      //     src={params.value}
      //     alt="userProfile"
      //     style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }}
      //   />
      // ),
    },
    {
      field: "Deliverd",
      headerName: "Deliverd",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
      
    {
      field: "actions",
      headerName: "Actions",
      flex: isSmallScreen ? 0.8 : 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => (
          <Button variant='contained' onClick={()=> navigate(`/orders/${params.value}`)}>Details</Button>
      ),
    },
  ];
  

  const rows = data?.orders?.map((order, index) => ({
    id: index + 1,
    userName: order.user.firstName + "  " + order.user.lastName,
    date: new Date(order.createdAt).toDateString(),
    totalAmount: order.orderTotal.cartSubtotal,
    Paid: order.isPaid ? "Piad" : "Not-Paid",
    Deliverd: order.isDelivered ? "Delivered" : "Not-Delivered",
    actions: order._id,
  })) || [];

  // const handleDeleteUser = async (userId: string) => {
  //   try {
  //     const willDelete = await swal({
  //       title: "Are you sure?",
  //       text: "Are you sure that you want to delete this user?",
  //       icon: "warning",
  //       dangerMode: true,
  //     });
       
  //     if (willDelete) {
  //       await deleteUser({ userId }).unwrap();
  //       toast.success("user deleted successfully");
  //       refetch();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    refetch(); // Refetch products for the new page
  };

  return (
    <Box sx={{ height: 600, width: isSmallScreen ? "100%" : "95%", mx: "auto", mt: 2 }}>
     <Stack sx={{flexDirection : "row" , justifyContent : "space-between" , alignItems : "center" , mb : 2 , mr:7}}>
     <Typography variant={isSmallScreen ? "body2" : "body1"} sx={{ my: 1, ml: 1 }}>
        Users :
      </Typography>
  
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
 {data?.pagination.pages && data?.pagination.pages > 1 && 

<Pagination
count={data?.pagination.pages} // Total number of pages from API
page={currentPage}
onChange={handlePageChange}
color="primary"
sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
/>
} 
    </Box>
  );
};

export default UserOrdersPage;
