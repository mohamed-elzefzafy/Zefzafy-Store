import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"
import AdminDrawer from "../../components/admin/AdminDrawer"

const AdminLayout = () => {
  return (
    <Box>
<Box sx={{display : "flex" , flexDirection : "row" , "& .MuiDrawer-root" : {overflowY: 'hidden'}}}>
<AdminDrawer/>
<Outlet/>
</Box>
      </Box>
  )
}

export default AdminLayout