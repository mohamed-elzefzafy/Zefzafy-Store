import { Paper, Typography, Grid, Box, Link } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import { PermMedia, Receipt, TabletMac } from '@mui/icons-material';
import { useGetAllCountsQuery } from '../../redux/slices/utilsApiSlice';



const AdminDashboardPaper = () => { 
 const {data : counts} = useGetAllCountsQuery();
 console.log(counts);
 
    const data = [
        {
          label: 'Products',
          value: counts?.productsCount,
          icon: <TabletMac fontSize="large" color="primary" />,
          path : "/admin/products"
        },
        {
          label: 'Users',
          value: counts?.usersCount,
          icon: <PeopleIcon fontSize="large" color="primary" />,
          path : "/admin/users"
        },
        {
          label: 'Categories',
          value: counts?.categoriesCount,
          icon: <CategoryIcon fontSize="large" color="primary" />,
          path : "/admin/categories"
        },
        {
            label: 'Orders',
            value: counts?.ordersCount,
            icon: <Receipt fontSize="large" color="primary" />, 
            path : "/admin/orders"
          },
          {
            label: 'Banners Sliders',
            value: counts?.bannersCount,
            icon: <PermMedia fontSize="large" color="primary" />,  
            path : "/admin/banners"
          },
      ];

  return (
<>
<Typography variant="h4" sx={{mb:4}}>Admin Dashboard : </Typography>
<Grid container spacing={3}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} lg={4} key={index} flexWrap="wrap">
          <Paper elevation={3} sx={{ p: 7, display: 'flex', alignItems: 'center'}} component={Link} href={item.path}>
            <Box sx={{ marginRight: 2 }}>{item.icon}</Box>
            <Box>
              <Typography variant="h6" component="div">
                {item.label}
              </Typography>
              <Typography variant="h4" component="div">
                {item.value}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
</>
  );
};

export default AdminDashboardPaper;
