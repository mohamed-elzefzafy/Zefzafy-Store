import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Category, Dashboard, PeopleOutlined, Receipt, TabletMac } from "@mui/icons-material";
import DrawerComponent from "../../components/DrawerComponent";


const AdminDashboardArrayList = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
  { text: "Products Table", icon: <TabletMac />, path: "/admin/products" },
  {
    text: "Categories Table",
    icon: <Category />,
    path: "/admin/categories",
  },
  {
    text: "Users Table",
    icon: <PeopleOutlined />,
    path: "/admin/users",
  },
  {
    text: "Orders Table",
    icon: <Receipt />,
    path: "/admin/orders",
  },
];
const AdminLayout = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          "& .MuiDrawer-root": { overflowY: "hidden" },
        }}
      >
        <DrawerComponent drawerOptions={AdminDashboardArrayList}/>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
