import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Category, Dashboard, PeopleOutlined, PermMedia, Receipt, TabletMac } from "@mui/icons-material";
import DrawerComponent from "../../components/DrawerComponent";
import { useTranslation } from "react-i18next";





const AdminLayout = () => {
const { t , i18n} = useTranslation()
  const AdminDashboardArrayList = [
    { text: t("Dashboard"), icon: <Dashboard />, path: "/admin" },
    { text: t("ProductsTable"), icon: <TabletMac />, path: "/admin/products" },
    {
      text: t("CategoriesTable"),
      icon: <Category />,
      path: "/admin/categories",
    },
    {
      text: t("UsersTable"),
      icon: <PeopleOutlined />,
      path: "/admin/users",
    },
    {
      text: t("OrdersTable"),
      icon: <Receipt />,
      path: "/admin/orders",
    },
    {
      text: t("BannersTable"),
      icon: <PermMedia />,
      path: "/admin/banners",
    },
  ];
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
