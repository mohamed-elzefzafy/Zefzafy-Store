import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { AccountBox,Receipt, Shop2 } from "@mui/icons-material";
import DrawerComponent from "../../components/DrawerComponent";
import { useTranslation } from "react-i18next";


const UserLayout = () => {
  const {t , i18n} = useTranslation();

  const AdminDashboardArrayList = [
    {
        text: t("profile"),
        icon: <AccountBox />,
        path: "/user",
      },
    {
        text: t("WishList"),
        icon: <Shop2 />,
        path: "/user/wishlist",
      },
    {
        text: t("UserOrders"),
        icon: <Receipt />,
        path: "/user/orders",
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

export default UserLayout;
