import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { useDeleteProductMutation, useGetProductsForAdminQuery } from "../../redux/slices/productsApiSlice";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const AdminproductsPage = () => {
  const { data, refetch } = useGetProductsForAdminQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
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
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: isSmallScreen ? 100 : 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      minWidth: isSmallScreen ? 70 : 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "count",
      headerName: "Stock",
      flex: 1,
      minWidth: isSmallScreen ? 70 : 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "images",
      headerName: "Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<string[]>) => (
        <img
          src={params.value?.[0] || ""}
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
          <IconButton onClick={() => handleDeleteProduct(params.value)}>
            <Delete color="error" />
          </IconButton>
          <IconButton onClick={() => navigate(`/admin/editproduct/${params.value}`)}>
            <Edit color="info" />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = data?.products.map((product, index) => ({
    id: index + 1,
    name: product.name,
    category: product.category.name,
    price: product.price,
    count: product.countInStock,
    images: product.images?.map((image) => image.url),
    actions: product._id,
  })) || [];

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct({ productId }).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ height: 600, width: isSmallScreen ? "100%" : "95%", mx: "auto", mt: 2 }}>
      <Typography variant={isSmallScreen ? "body2" : "body1"} sx={{ my: 1, ml: 1 }}>
        Products:
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        autoHeight={isSmallScreen} // Adjust height for small screens
        sx={{
          fontSize: isSmallScreen ? "12px" : "14px", // Adjust font size for small screens
        }}
      />
    </Box>
  );
};

export default AdminproductsPage;
