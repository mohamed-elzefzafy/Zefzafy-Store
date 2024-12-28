import { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, Pagination, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetOrdersByLoggedUserQuery } from '../../redux/slices/ordersApiSlice';
import { useNavigate } from 'react-router-dom';


const UserOrdersPage = () => {
 const [currentPage, setCurrentPage] = useState(1);
 const {data , refetch} = useGetOrdersByLoggedUserQuery();
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
        <Typography sx={{fontSize : {xs : "12px" , md : "13px"} , mt : 2}}> 
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
        <Typography sx={{fontSize : {xs : "12px" , md : "13px"} , mt : 2}}> 
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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    refetch();
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
count={data?.pagination.pages} 
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
