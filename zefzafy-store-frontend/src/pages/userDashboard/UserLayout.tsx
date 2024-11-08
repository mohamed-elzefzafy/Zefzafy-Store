import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { AccountBox,Receipt, Shop2 } from "@mui/icons-material";
import DrawerComponent from "../../components/DrawerComponent";


const AdminDashboardArrayList = [
{
    text: "profile",
    icon: <AccountBox />,
    path: "/user",
  },
{
    text: "Wish List",
    icon: <Shop2 />,
    path: "/user/wishlist",
  },
{
    text: "User Orders",
    icon: <Receipt />,
    path: "/user/orders",
  },
];
const UserLayout = () => {
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
