import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge, { BadgeProps } from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ChangeEvent, useEffect, useState } from 'react';
import ToggleDarkLightIcons from '../../muiTheme/ToggleDarkLightIcons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createSearchKeywordAction } from '../../redux/slices/searchSlice';
import { Avatar, Button, useTheme } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useLogoutMutation } from '../../redux/slices/usersApiSlice';
import toast from 'react-hot-toast';
import { logoutAction } from '../../redux/slices/authSlice';
import { setCartItemLength } from '../../redux/slices/cartSlice';
import { useGetUserCartQuery } from '../../redux/slices/cartApiSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: {xs : theme.spacing(3)},
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));






const Header =  () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [mode, setMode] =  useState(localStorage.getItem("mode") || "light");
  const {userInfo} =useAppSelector(state => state.auth);
  const { data: userCartItems } = useGetUserCartQuery();
  const {cartItemLength} = useAppSelector(state => state.cart)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
     useState<null | HTMLElement>(null);

     useEffect(()=>{   
      dispatch(setCartItemLength(userCartItems?.cartItems?.length))
       },[userCartItems])

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

const [logout] = useLogoutMutation();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };



  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );
;
  const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    '& .MuiBadge-badge': {
      top: "4px",
      left: "3px",
      padding: '0',
    },
  }));

  const createSaerchKeywordHandler = (value : string) => {
   dispatch(createSearchKeywordAction(value));
   navigate("/products");
  }


  const [anchorEl, setAnchorEl] =  useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const logoutHandler = async() => {
    try {
      await logout({}).unwrap();
      dispatch(logoutAction())
      navigate("/login")
    } catch (error) {
      const errorMessage = (error as { data?: { message?: string } }).data?.message;
      toast.error(errorMessage as string);
    }
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor : theme.palette.appbarColor?.main }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/" style={{marginRight : 5}}> Zefzafy-Store </Link>
          </Typography>
          <Search sx={{display : "flex" , justifyContent : "flex-start"}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e : ChangeEvent<HTMLInputElement>) => createSaerchKeywordHandler(e.target.value) }
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton size="small" sx={{".MuiButtonBase-root" : {p:1 , width : "5px" , height : "5px"}}} >
              <ToggleDarkLightIcons fontSize='20px'/>
            </IconButton>

              {userInfo.email && !userInfo.isAdmin   &&
              <IconButton  aria-label="cart" sx={{mr : {xs : 2 , md : 1}}}
               onClick={()=> navigate("/user/cart")} >
              <StyledBadge badgeContent={cartItemLength?? 0} color="secondary">
                <ShoppingCart sx={{color : "white" , fontSize : "18px" }}/>
              </StyledBadge>
            </IconButton>
              
              }
      
      

            {userInfo?.email ? (
        <>
          <Button onClick={handleClick} sx={{ color: "white" , textTransform : "capitalize"}} >
            {userInfo?.firstName}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {userInfo.isAdmin ? (
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/admin");
                }}
              >
                Admin-Dashboard
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/user");
                }}
              >
                User-Dashboard
              </MenuItem>
            )}
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
          <Avatar alt={userInfo?.firstName} src={userInfo?.profilePhoto?.url} sx={{ml :1}}/>
        </>
      ) : (
        <>
          <Typography component={Link} color={"red"} sx={{ mr: 1 }} to="/login">
            Login
          </Typography>

          <Typography component={Link} fontSize="15px" to="/register">
            Register
          </Typography>
        </>
      )}
    


        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;