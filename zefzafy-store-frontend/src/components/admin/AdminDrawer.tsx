import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { ContactsOutlined, HomeOutlined, PeopleOutlined, ReceiptLongOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const AdminDashboardArrayList = [
  { text: "Dashboard", icon: <HomeOutlined/>, path: "/admin" },
  { text: "Products Table", icon: <PeopleOutlined />, path: "/admin/products" },
  {
    text: "Add Product",
    icon: <ContactsOutlined />,
    path: "/contacts",
  },
  {
    text: "Edit Product",
    icon: <ReceiptLongOutlined />,
    path: "/invoices",
  },
  {
    text: "User Table",
    icon: <ReceiptLongOutlined />,
    path: "/invoices",
  },
  {
    text: "Orders Table",
    icon: <ReceiptLongOutlined />,
    path: "/admin/orders",
  },
];
const AdminDrawer = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(isLargeScreen);

  useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          height: "calc(100vh - 66px)",
          position: 'relative',
        },
      }}
    >
      <Divider />
      <List sx={{mt :0, pt : 0}}>
        {AdminDashboardArrayList.map((item) => (
          <ListItem key={item.path} disablePadding component={Link} to={item.path}>
            <ListItemButton 
            sx={{bgcolor : location.pathname === item.path ? theme.palette.mode === "dark"? grey[800] : grey[300] : null,}}>
              <ListItemIcon>
                   {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminDrawer;
